"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_utils_1 = require("../../../stream-utils");
exports.getOpenJDKBinariesFileContentAction = {
    actionName: "java",
    filePathMatches: (filePath) => filePath.endsWith("java"),
    callback: stream_utils_1.streamToHash,
};
exports.getNodeBinariesFileContentAction = {
    actionName: "node",
    filePathMatches: (filePath) => filePath.endsWith("node"),
    callback: stream_utils_1.streamToHash,
};
const binariesExtractActions = [
    exports.getNodeBinariesFileContentAction,
    exports.getOpenJDKBinariesFileContentAction,
];
function getBinariesHashes(extractedLayers) {
    const hashes = new Set();
    for (const fileName of Object.keys(extractedLayers)) {
        for (const actionName of Object.keys(extractedLayers[fileName])) {
            for (const action of binariesExtractActions) {
                if (actionName !== action.actionName) {
                    continue;
                }
                if (!(typeof extractedLayers[fileName][actionName] === "string")) {
                    throw new Error("expected string");
                }
                hashes.add(extractedLayers[fileName][actionName]);
            }
        }
    }
    return [...hashes];
}
exports.getBinariesHashes = getBinariesHashes;
//# sourceMappingURL=index.js.map