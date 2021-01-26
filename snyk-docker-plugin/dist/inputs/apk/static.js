"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const extractor_1 = require("../../extractor");
const stream_utils_1 = require("../../stream-utils");
exports.getApkDbFileContentAction = {
    actionName: "apk-db",
    filePathMatches: (filePath) => filePath === path_1.normalize("/lib/apk/db/installed"),
    callback: stream_utils_1.streamToString,
};
function getApkDbFileContent(extractedLayers) {
    const apkDb = extractor_1.getContentAsString(extractedLayers, exports.getApkDbFileContentAction);
    return apkDb || "";
}
exports.getApkDbFileContent = getApkDbFileContent;
//# sourceMappingURL=static.js.map