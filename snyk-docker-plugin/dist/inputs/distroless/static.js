"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const stream_utils_1 = require("../../stream-utils");
exports.getDpkgPackageFileContentAction = {
    actionName: "dpkg",
    filePathMatches: (filePath) => filePath.startsWith(path_1.normalize("/var/lib/dpkg/status.d/")),
    callback: stream_utils_1.streamToString,
};
function getAptFiles(extractedLayers) {
    const files = [];
    for (const fileName of Object.keys(extractedLayers)) {
        if (!("dpkg" in extractedLayers[fileName])) {
            continue;
        }
        files.push(extractedLayers[fileName].dpkg.toString("utf8"));
    }
    return files;
}
exports.getAptFiles = getAptFiles;
//# sourceMappingURL=static.js.map