import { types } from "@snyk/docker-registry-v2-client";
import * as registryClient from "@snyk/docker-registry-v2-client";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import * as tmp from "tmp";
import { Layer } from "./common";
import * as subProcess from "./sub-process";
import * as tar from "tar-stream";
import { promisify } from "util";

import {
  DockerPullOptions,
  DockerPullResult,
  SaveRequests,
  DirResult
} from "./types";

const readFile = promisify(fs.readFile);
const link = promisify(fs.link);
const stat = promisify(fs.stat);

const DEFAULT_LAYER_JSON = {
  created: "0001-01-01T00:00:00Z",
  // eslint-disable-next-line @typescript-eslint/camelcase
  container_config: {
    Hostname: "",
    Domainname: "",
    User: "",
    AttachStdin: false,
    AttachStdout: false,
    AttachStderr: false,
    Tty: false,
    OpenStdin: false,
    StdinOnce: false,
    Env: null,
    Cmd: null,
    Image: "",
    Volumes: null,
    WorkingDir: "",
    Entrypoint: null,
    OnBuild: null,
    Labels: null
  }
};

export class DockerPull {
  private static async findDockerBinary(): Promise<string> {
    return subProcess
      .execute("which", ["docker"], undefined, undefined, true)
      .then(cmdOutput => cmdOutput.stdout.trim())
      .catch(cmdOutput => {
        throw new Error(cmdOutput.stderr);
      });
  }

  public async pull(
    registryBase: string,
    repo: string,
    tag: string,
    opt?: DockerPullOptions
  ): Promise<DockerPullResult> {
    const loadImage = opt?.loadImage === undefined ? true : opt.loadImage;
    const manifest: types.ImageManifest = await registryClient.getManifest(
      registryBase,
      repo,
      tag,
      opt?.username,
      opt?.password,
      opt?.reqOptions
    );

    const imageConfigMetadata: types.LayerConfig = manifest.config;
    const imageConfig = await registryClient.getImageConfig(
      registryBase,
      repo,
      imageConfigMetadata.digest,
      opt?.username,
      opt?.password,
      opt?.reqOptions
    );
    const t0 = Date.now();
    const layersConfigs: types.LayerConfig[] = manifest.layers;
    const missingLayers = await this.getLayers(
      layersConfigs,
      registryBase,
      repo,
      opt?.username,
      opt?.password,
      opt?.reqOptions
    );
    const pullDuration = Date.now() - t0;

    let imageDigest: string;
    const stagingDir: DirResult = this.createDownloadedImageDestination(
      opt?.imageSavePath
    );

    try {
      await this.buildImage(
        imageConfigMetadata.digest,
        imageConfig,
        layersConfigs,
        missingLayers,
        stagingDir
      );

      if (loadImage) {
        imageDigest = await this.loadImage(registryBase, repo, tag, stagingDir);
      }
    } catch (err) {
      throw new Error(err.stderr);
    } finally {
      try {
        // Check is the image should be saved for debugging
        const saveMatcher = {
          ...opt,
          registryBase,
          repo,
          tag
        };
        for (const [name, requestMatcher] of Object.entries(
          await this.saveRequests()
        )) {
          if (
            Object.keys(requestMatcher).every(
              key => requestMatcher[key] === saveMatcher[key]
            )
          ) {
            await link(
              path.join(stagingDir.name, "image.tar"),
              tmp.tmpNameSync({ prefix: `${name}-`, postfix: ".tar" })
            );
            break;
          }
        }
      } catch (err) {
        console.error("pullSaveRequest error: ", err);
      }

      if (loadImage) {
        stagingDir.removeCallback();
      }
    }

    return {
      imageDigest,
      stagingDir: loadImage ? null : stagingDir,
      cachedLayersDigests: [],
      missingLayersDigests: missingLayers.map(layer => layer.config.digest),
      pullDuration
    };
  }

  private async getLayers(
    layersConfigs: types.LayerConfig[],
    registryBase,
    repo: string,
    username?: string,
    password?: string,
    // weak typing on the client
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reqOptions = {} as any
  ): Promise<Layer[]> {
    return await Promise.all(
      layersConfigs.map(async (config: types.LayerConfig) => {
        const blob: Buffer = await registryClient.getLayer(
          registryBase,
          repo,
          config.digest,
          username,
          password,
          reqOptions
        );
        return { config, blob };
      })
    );
  }

  private async saveRequests(): Promise<SaveRequests> {
    const saveRequestsPath = path.join(os.tmpdir(), "pullSaveRequest.json");
    try {
      if (await stat(saveRequestsPath)) {
        return JSON.parse((await readFile(saveRequestsPath)).toString("utf-8"));
      }
    } catch (err) {
      return {};
    }
  }

  private async buildImage(
    imageDigest: string,
    imageConfig: object,
    layersConfigs: types.LayerConfig[],
    layers: Layer[],
    stagingDir: DirResult
  ): Promise<string> {
    const pack = tar.pack();

    // write layers
    let parentDigest: string | undefined;
    for (const layerConfig of layersConfigs) {
      const digest = layerConfig.digest.replace("sha256:", "");

      // write layer.tar
      let blob: Buffer;
      for (const layer of layers) {
        if (layerConfig.digest === layer.config.digest) {
          blob = layer.blob;
          break;
        }
      }
      if (!blob) {
        throw new Error(`missing blob during build: ${digest}`);
      }
      pack.entry({ name: path.join(digest, "layer.tar") }, blob);

      // write json
      let json: object = Object.assign({}, { id: digest }, DEFAULT_LAYER_JSON);
      if (parentDigest) {
        json = Object.assign({ parent: parentDigest });
      }
      pack.entry({ name: path.join(digest, "json") }, JSON.stringify(json));
      parentDigest = digest;

      // write version
      pack.entry({ name: path.join(digest, "VERSION") }, "1.0");
    }

    imageDigest = imageDigest.replace("sha256:", "");
    // write image json
    pack.entry({ name: `${imageDigest}.json` }, JSON.stringify(imageConfig));

    // write manifest.json
    const manifestJson = [
      {
        Config: `${imageDigest}.json`,
        RepoTags: null,
        Layers: layersConfigs.map(
          config => `${config.digest.replace("sha256:", "")}/layer.tar`
        )
      }
    ];
    pack.entry({ name: "manifest.json" }, JSON.stringify(manifestJson), () => {
      pack.finalize();
    });

    const imagePath = path.join(stagingDir.name, "image.tar");
    const file = fs.createWriteStream(imagePath);
    pack.pipe(file);

    return path.join(imagePath);
  }

  private async loadImage(
    registryBase: string,
    repo: string,
    tag: string,
    stagingDir: DirResult
  ): Promise<string> {
    const dockerBinary: string = await DockerPull.findDockerBinary();
    const stdout = (
      await subProcess.execute(
        dockerBinary,
        ["load", "-i", "image.tar"],
        stagingDir.name
      )
    ).stdout;
    // Loaded image ID: sha256:36456e9e9cb7c4b17d97461a5aeb062a481401e3d2b559285c7083d8e7f8efa6
    const imgDigest: string = stdout.split("sha256:")[1].trim();
    await subProcess.execute(dockerBinary, [
      "tag",
      `${imgDigest}`,
      `${registryBase}/${repo}:${tag}`
    ]);

    return imgDigest;
  }

  private createDownloadedImageDestination(imageSavePath?: string): DirResult {
    if (!imageSavePath) {
      return tmp.dirSync({ unsafeCleanup: true });
    }

    const dirResult: DirResult = {
      name: imageSavePath,
      removeCallback: () => {
        /* do nothing */
      }
    };

    return dirResult;
  }
}
