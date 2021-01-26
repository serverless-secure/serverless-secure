"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rpm_parser_1 = require("@snyk/rpm-parser");
const Debug = require("debug");
const path_1 = require("path");
const extractor_1 = require("../../extractor");
const stream_utils_1 = require("../../stream-utils");
const debug = Debug("snyk");
exports.getRpmDbFileContentAction = {
    actionName: "rpm-db",
    filePathMatches: (filePath) => filePath === path_1.normalize("/var/lib/rpm/Packages"),
    callback: stream_utils_1.streamToBuffer,
};
async function getRpmDbFileContent(extractedLayers) {
    const rpmDb = extractor_1.getContentAsBuffer(extractedLayers, exports.getRpmDbFileContentAction);
    if (!rpmDb) {
        return "";
    }
    try {
        const parserResponse = await rpm_parser_1.getPackages(rpmDb);
        if (parserResponse.error !== undefined) {
            throw parserResponse.error;
        }
        return parserResponse.response;
    }
    catch (error) {
        debug("An error occurred while analysing RPM packages");
        debug(error);
        return "";
    }
}
exports.getRpmDbFileContent = getRpmDbFileContent;
//# sourceMappingURL=static.js.map