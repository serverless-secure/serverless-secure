"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockerPull = void 0;
const registryClient = require("@snyk/docker-registry-v2-client");
const fs = require("fs");
const os = require("os");
const path = require("path");
const tmp = require("tmp");
const subProcess = require("./sub-process");
const tar = require("tar-stream");
const util_1 = require("util");
const readFile = util_1.promisify(fs.readFile);
const link = util_1.promisify(fs.link);
const stat = util_1.promisify(fs.stat);
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
class DockerPull {
    static async findDockerBinary() {
        return subProcess
            .execute("which", ["docker"], undefined, undefined, true)
            .then(cmdOutput => cmdOutput.stdout.trim())
            .catch(cmdOutput => {
            throw new Error(cmdOutput.stderr);
        });
    }
    async pull(registryBase, repo, tag, opt) {
        const loadImage = (opt === null || opt === void 0 ? void 0 : opt.loadImage) === undefined ? true : opt.loadImage;
        const manifest = await registryClient.getManifest(registryBase, repo, tag, opt === null || opt === void 0 ? void 0 : opt.username, opt === null || opt === void 0 ? void 0 : opt.password, opt === null || opt === void 0 ? void 0 : opt.reqOptions);
        const imageConfigMetadata = manifest.config;
        const imageConfig = await registryClient.getImageConfig(registryBase, repo, imageConfigMetadata.digest, opt === null || opt === void 0 ? void 0 : opt.username, opt === null || opt === void 0 ? void 0 : opt.password, opt === null || opt === void 0 ? void 0 : opt.reqOptions);
        const t0 = Date.now();
        const layersConfigs = manifest.layers;
        const missingLayers = await this.getLayers(layersConfigs, registryBase, repo, opt === null || opt === void 0 ? void 0 : opt.username, opt === null || opt === void 0 ? void 0 : opt.password, opt === null || opt === void 0 ? void 0 : opt.reqOptions);
        const pullDuration = Date.now() - t0;
        let imageDigest;
        const stagingDir = this.createDownloadedImageDestination(opt === null || opt === void 0 ? void 0 : opt.imageSavePath);
        try {
            await this.buildImage(imageConfigMetadata.digest, imageConfig, layersConfigs, missingLayers, stagingDir);
            if (loadImage) {
                imageDigest = await this.loadImage(registryBase, repo, tag, stagingDir);
            }
        }
        catch (err) {
            throw new Error(err.stderr);
        }
        finally {
            try {
                // Check is the image should be saved for debugging
                const saveMatcher = Object.assign(Object.assign({}, opt), { registryBase,
                    repo,
                    tag });
                for (const [name, requestMatcher] of Object.entries(await this.saveRequests())) {
                    if (Object.keys(requestMatcher).every(key => requestMatcher[key] === saveMatcher[key])) {
                        await link(path.join(stagingDir.name, "image.tar"), tmp.tmpNameSync({ prefix: `${name}-`, postfix: ".tar" }));
                        break;
                    }
                }
            }
            catch (err) {
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
    async getLayers(layersConfigs, registryBase, repo, username, password, 
    // weak typing on the client
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reqOptions = {}) {
        return await Promise.all(layersConfigs.map(async (config) => {
            const blob = await registryClient.getLayer(registryBase, repo, config.digest, username, password, reqOptions);
            return { config, blob };
        }));
    }
    async saveRequests() {
        const saveRequestsPath = path.join(os.tmpdir(), "pullSaveRequest.json");
        try {
            if (await stat(saveRequestsPath)) {
                return JSON.parse((await readFile(saveRequestsPath)).toString("utf-8"));
            }
        }
        catch (err) {
            return {};
        }
    }
    async buildImage(imageDigest, imageConfig, layersConfigs, layers, stagingDir) {
        const pack = tar.pack();
        // write layers
        let parentDigest;
        for (const layerConfig of layersConfigs) {
            const digest = layerConfig.digest.replace("sha256:", "");
            // write layer.tar
            let blob;
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
            let json = Object.assign({}, { id: digest }, DEFAULT_LAYER_JSON);
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
                Layers: layersConfigs.map(config => `${config.digest.replace("sha256:", "")}/layer.tar`)
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
    async loadImage(registryBase, repo, tag, stagingDir) {
        const dockerBinary = await DockerPull.findDockerBinary();
        const stdout = (await subProcess.execute(dockerBinary, ["load", "-i", "image.tar"], stagingDir.name)).stdout;
        // Loaded image ID: sha256:36456e9e9cb7c4b17d97461a5aeb062a481401e3d2b559285c7083d8e7f8efa6
        const imgDigest = stdout.split("sha256:")[1].trim();
        await subProcess.execute(dockerBinary, [
            "tag",
            `${imgDigest}`,
            `${registryBase}/${repo}:${tag}`
        ]);
        return imgDigest;
    }
    createDownloadedImageDestination(imageSavePath) {
        if (!imageSavePath) {
            return tmp.dirSync({ unsafeCleanup: true });
        }
        const dirResult = {
            name: imageSavePath,
            removeCallback: () => {
                /* do nothing */
            }
        };
        return dirResult;
    }
}
exports.DockerPull = DockerPull;
//# sourceMappingURL=docker-pull.js.map