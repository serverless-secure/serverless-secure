"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Debug = require("debug");
const fs_1 = require("fs");
const gunzip = require("gunzip-maybe");
const path_1 = require("path");
const tar_stream_1 = require("tar-stream");
const stream_utils_1 = require("../../stream-utils");
const layer_1 = require("../layer");
const debug = Debug("snyk");
/**
 * Retrieve the products of files content from the specified docker-archive.
 * @param dockerArchiveFilesystemPath Path to image file saved in docker-archive format.
 * @param extractActions Array of pattern-callbacks pairs.
 * @returns Array of extracted files products sorted by the reverse order of the layers from last to first.
 */
async function extractArchive(dockerArchiveFilesystemPath, extractActions) {
    return new Promise((resolve, reject) => {
        const tarExtractor = tar_stream_1.extract();
        const layers = {};
        let manifest;
        let imageConfig;
        tarExtractor.on("entry", async (header, stream, next) => {
            if (header.type === "file") {
                const normalizedName = path_1.normalize(header.name);
                if (isTarFile(normalizedName)) {
                    try {
                        layers[normalizedName] = await layer_1.extractImageLayer(stream, extractActions);
                    }
                    catch (error) {
                        debug(`Error extracting layer content from: '${error}'`);
                        reject(new Error("Error reading tar archive"));
                    }
                }
                else if (isManifestFile(normalizedName)) {
                    const manifestArray = await getManifestFile(stream);
                    manifest = manifestArray[0];
                }
                else if (isImageConfigFile(normalizedName)) {
                    imageConfig = await getManifestFile(stream);
                }
            }
            stream.resume(); // auto drain the stream
            next(); // ready for next entry
        });
        tarExtractor.on("finish", () => {
            try {
                resolve(getLayersContentAndArchiveManifest(manifest, imageConfig, layers));
            }
            catch (error) {
                debug(`Error getting layers and manifest content from docker archive: '${error}'`);
                reject(new Error("Invalid Docker archive"));
            }
        });
        tarExtractor.on("error", (error) => reject(error));
        fs_1.createReadStream(dockerArchiveFilesystemPath)
            .pipe(gunzip())
            .pipe(tarExtractor);
    });
}
exports.extractArchive = extractArchive;
function getLayersContentAndArchiveManifest(manifest, imageConfig, layers) {
    // skip (ignore) non-existent layers
    // get the layers content without the name
    // reverse layers order from last to first
    const layersWithNormalizedNames = manifest.Layers.map((layersName) => path_1.normalize(layersName));
    const filteredLayers = layersWithNormalizedNames
        .filter((layersName) => layers[layersName])
        .map((layerName) => layers[layerName])
        .reverse();
    if (filteredLayers.length === 0) {
        throw new Error("We found no layers in the provided image");
    }
    return {
        layers: filteredLayers,
        manifest,
        imageConfig,
    };
}
/**
 * Note: consumes the stream.
 */
async function getManifestFile(stream) {
    return stream_utils_1.streamToJson(stream);
}
function isManifestFile(name) {
    return name === "manifest.json";
}
function isImageConfigFile(name) {
    const configRegex = new RegExp("[A-Fa-f0-9]{64}\\.json");
    return configRegex.test(name);
}
function isTarFile(name) {
    // For both "docker save" and "skopeo copy" style archives the
    // layers are represented as tar archives whose names end in .tar.
    // For Docker this is "layer.tar", for Skopeo - "<sha256ofLayer>.tar".
    return path_1.basename(name).endsWith(".tar");
}
//# sourceMappingURL=layer.js.map