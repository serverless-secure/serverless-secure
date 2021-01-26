"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const extractor_1 = require("../../extractor");
const stream_utils_1 = require("../../stream-utils");
exports.getDpkgFileContentAction = {
    actionName: "dpkg",
    filePathMatches: (filePath) => filePath === path_1.normalize("/var/lib/dpkg/status"),
    callback: stream_utils_1.streamToString,
};
exports.getExtFileContentAction = {
    actionName: "ext",
    filePathMatches: (filePath) => filePath === path_1.normalize("/var/lib/apt/extended_states"),
    callback: stream_utils_1.streamToString,
};
function getAptDbFileContent(extractedLayers) {
    const dpkgContent = extractor_1.getContentAsString(extractedLayers, exports.getDpkgFileContentAction);
    const dpkgFile = dpkgContent || "";
    const extContent = extractor_1.getContentAsString(extractedLayers, exports.getExtFileContentAction);
    const extFile = extContent || "";
    return {
        dpkgFile,
        extFile,
    };
}
exports.getAptDbFileContent = getAptDbFileContent;
//# sourceMappingURL=static.js.map