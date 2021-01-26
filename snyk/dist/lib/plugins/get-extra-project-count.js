"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtraProjectCount = void 0;
const find_files_1 = require("../find-files");
const detect_1 = require("../detect");
async function getExtraProjectCount(root, options, inspectResult) {
    if (options.docker) {
        return undefined;
    }
    if (inspectResult.plugin.meta &&
        inspectResult.plugin.meta.allSubProjectNames &&
        inspectResult.plugin.meta.allSubProjectNames.length > 1) {
        return inspectResult.plugin.meta.allSubProjectNames.length;
    }
    try {
        const { files: extraTargetFiles } = await find_files_1.find(root, [], detect_1.AUTO_DETECTABLE_FILES);
        const foundProjectsCount = extraTargetFiles.length > 1 ? extraTargetFiles.length - 1 : undefined;
        return foundProjectsCount;
    }
    catch (e) {
        return undefined;
    }
}
exports.getExtraProjectCount = getExtraProjectCount;
//# sourceMappingURL=get-extra-project-count.js.map