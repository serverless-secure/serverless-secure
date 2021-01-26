"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const dockerExtractor = require("./docker-archive");
const ociExtractor = require("./oci-archive");
/**
 * Given a path on the file system to a image archive, open it up to inspect the layers
 * and look for specific files. File content can be transformed with a custom callback function if needed.
 * @param fileSystemPath Path to an existing archive.
 * @param extractActions This denotes a file pattern to look for and how to transform the file if it is found.
 * By default the file is returned raw if no processing is desired.
 */
async function extractImageContent(imageType, fileSystemPath, extractActions) {
    switch (imageType) {
        case types_1.ImageType.OciArchive:
            const ociArchive = await ociExtractor.extractArchive(fileSystemPath, extractActions);
            return {
                imageId: ociExtractor.getImageIdFromManifest(ociArchive.manifest),
                manifestLayers: ociExtractor.getManifestLayers(ociArchive.manifest),
                extractedLayers: layersWithLatestFileModifications(ociArchive.layers),
            };
        default:
            const dockerArchive = await dockerExtractor.extractArchive(fileSystemPath, extractActions);
            return {
                imageId: dockerExtractor.getImageIdFromManifest(dockerArchive.manifest),
                manifestLayers: dockerExtractor.getManifestLayers(dockerArchive.manifest),
                extractedLayers: layersWithLatestFileModifications(dockerArchive.layers),
                rootFsLayers: dockerExtractor.getRootFsLayersFromConfig(dockerArchive.imageConfig),
                platform: dockerExtractor.getPlatformFromConfig(dockerArchive.imageConfig),
            };
    }
}
exports.extractImageContent = extractImageContent;
function layersWithLatestFileModifications(layers) {
    const extractedLayers = {};
    // TODO: This removes the information about the layer name, maybe we would need it in the future?
    for (const layer of layers) {
        // go over extracted files products found in this layer
        for (const filename of Object.keys(layer)) {
            // file was not found
            if (!Reflect.has(extractedLayers, filename)) {
                extractedLayers[filename] = layer[filename];
            }
        }
    }
    return extractedLayers;
}
function isBufferType(type) {
    return type.buffer !== undefined;
}
function isStringType(type) {
    return type.substring !== undefined;
}
function getContentAsBuffer(extractedLayers, extractAction) {
    const content = getContent(extractedLayers, extractAction);
    return content !== undefined && isBufferType(content) ? content : undefined;
}
exports.getContentAsBuffer = getContentAsBuffer;
function getContentAsString(extractedLayers, extractAction) {
    const content = getContent(extractedLayers, extractAction);
    return content !== undefined && isStringType(content) ? content : undefined;
}
exports.getContentAsString = getContentAsString;
function getContent(extractedLayers, extractAction) {
    const fileNames = Object.keys(extractedLayers);
    const fileNamesProducedByTheExtractAction = fileNames.filter((name) => extractAction.actionName in extractedLayers[name]);
    const firstFileNameMatch = fileNamesProducedByTheExtractAction.find((match) => extractAction.filePathMatches(match));
    return firstFileNameMatch !== undefined
        ? extractedLayers[firstFileNameMatch][extractAction.actionName]
        : undefined;
}
//# sourceMappingURL=index.js.map