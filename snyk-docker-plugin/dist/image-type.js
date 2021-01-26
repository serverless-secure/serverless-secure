"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const types_1 = require("./types");
function getImageType(targetImage) {
    const imageIdentifier = targetImage.split(":")[0];
    switch (imageIdentifier) {
        case "docker-archive":
            return types_1.ImageType.DockerArchive;
        case "oci-archive":
            return types_1.ImageType.OciArchive;
        default:
            return types_1.ImageType.Identifier;
    }
}
exports.getImageType = getImageType;
function getArchivePath(targetImage) {
    if (!targetImage.startsWith("docker-archive:") &&
        !targetImage.startsWith("oci-archive:")) {
        throw new Error('The provided archive path is missing image specific prefix, eg."docker-archive:" or "oci-archive:"');
    }
    return targetImage.indexOf("docker-archive:") !== -1
        ? path_1.normalize(targetImage.substring("docker-archive:".length))
        : path_1.normalize(targetImage.substring("oci-archive:".length));
}
exports.getArchivePath = getArchivePath;
//# sourceMappingURL=image-type.js.map