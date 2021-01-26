"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Debug = require("debug");
const fs_1 = require("fs");
const gunzip = require("gunzip-maybe");
const path_1 = require("path");
const stream_1 = require("stream");
const tar_stream_1 = require("tar-stream");
const stream_utils_1 = require("../../stream-utils");
const layer_1 = require("../layer");
const debug = Debug("snyk");
/**
 * Retrieve the products of files content from the specified oci-archive.
 * @param ociArchiveFilesystemPath Path to image file saved in oci-archive format.
 * @param extractActions Array of pattern-callbacks pairs.
 * @returns Array of extracted files products sorted by the reverse order of the layers from last to first.
 */
async function extractArchive(ociArchiveFilesystemPath, extractActions) {
    return new Promise((resolve, reject) => {
        const tarExtractor = tar_stream_1.extract();
        const layers = {};
        const manifests = {};
        let imageIndex;
        tarExtractor.on("entry", async (header, stream, next) => {
            if (header.type === "file") {
                const normalizedHeaderName = path_1.normalize(header.name);
                if (isImageIndexFile(normalizedHeaderName)) {
                    imageIndex = await stream_utils_1.streamToJson(stream);
                }
                else {
                    const jsonStream = new stream_1.PassThrough();
                    const layerStream = new stream_1.PassThrough();
                    stream.pipe(jsonStream);
                    stream.pipe(layerStream);
                    const promises = [
                        stream_utils_1.streamToJson(jsonStream).catch(() => undefined),
                        layer_1.extractImageLayer(layerStream, extractActions).catch(() => undefined),
                    ];
                    const [manifest, layer] = await Promise.all(promises);
                    // header format is /blobs/hash_name/hash_value
                    // we're extracting hash_name:hash_value format to match manifest digest
                    const headerParts = normalizedHeaderName.split(path_1.sep);
                    const hashName = headerParts[1];
                    const hashValue = headerParts[headerParts.length - 1];
                    const digest = `${hashName}:${hashValue}`;
                    if (isArchiveManifest(manifest)) {
                        manifests[digest] = manifest;
                    }
                    if (layer !== undefined) {
                        layers[digest] = layer;
                    }
                }
            }
            stream.resume(); // auto drain the stream
            next(); // ready for next entry
        });
        tarExtractor.on("finish", () => {
            try {
                resolve(getLayersContentAndArchiveManifest(imageIndex, manifests, layers));
            }
            catch (error) {
                debug(`Error getting layers and manifest content from oci archive: '${error}'`);
                reject(new Error("Invalid OCI archive"));
            }
        });
        tarExtractor.on("error", (error) => {
            reject(error);
        });
        fs_1.createReadStream(ociArchiveFilesystemPath)
            .pipe(gunzip())
            .pipe(tarExtractor);
    });
}
exports.extractArchive = extractArchive;
function getLayersContentAndArchiveManifest(imageIndex, manifestCollection, layers) {
    // filter empty layers
    // get the layers content without the name
    // reverse layers order from last to first
    // get manifest file first
    const manifest = getManifest(imageIndex, manifestCollection);
    const filteredLayers = manifest.layers
        .filter((layer) => Object.keys(layers[layer.digest]).length !== 0)
        .map((layer) => layers[layer.digest])
        .reverse();
    if (filteredLayers.length === 0) {
        throw new Error("We found no layers in the provided image");
    }
    return {
        layers: filteredLayers,
        manifest,
    };
}
function getManifest(imageIndex, manifestCollection) {
    if (!imageIndex) {
        return manifestCollection[Object.keys(manifestCollection)[0]];
    }
    const manifestInfo = imageIndex.manifests.find((item) => item.platform
        ? item.platform.architecture === "amd64" && item.platform.os === "linux"
        : item);
    if (manifestInfo === undefined) {
        throw new Error("Unsupported type of CPU architecture or operating system");
    }
    return manifestCollection[manifestInfo.digest];
}
function isArchiveManifest(manifest) {
    return (manifest !== undefined && manifest.layers && manifest.layers.length >= 0);
}
function isImageIndexFile(name) {
    return name === "index.json";
}
//# sourceMappingURL=layer.js.map