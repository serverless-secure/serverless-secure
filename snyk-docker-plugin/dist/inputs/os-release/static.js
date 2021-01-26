"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const extractor_1 = require("../../extractor");
const stream_utils_1 = require("../../stream-utils");
const types_1 = require("../../types");
const getOsReleaseAction = {
    actionName: "os-release",
    filePathMatches: (filePath) => filePath === path_1.normalize(types_1.OsReleaseFilePath.Linux),
    callback: stream_utils_1.streamToString,
};
const getFallbackOsReleaseAction = {
    actionName: "os-release-fallback",
    filePathMatches: (filePath) => filePath === path_1.normalize(types_1.OsReleaseFilePath.LinuxFallback),
    callback: stream_utils_1.streamToString,
};
const getLsbReleaseAction = {
    actionName: "lsb-release",
    filePathMatches: (filePath) => filePath === path_1.normalize(types_1.OsReleaseFilePath.Lsb),
    callback: stream_utils_1.streamToString,
};
const getDebianVersionAction = {
    actionName: "debian-version",
    filePathMatches: (filePath) => filePath === path_1.normalize(types_1.OsReleaseFilePath.Debian),
    callback: stream_utils_1.streamToString,
};
const getAlpineReleaseAction = {
    actionName: "alpine-release",
    filePathMatches: (filePath) => filePath === path_1.normalize(types_1.OsReleaseFilePath.Alpine),
    callback: stream_utils_1.streamToString,
};
const getRedHatReleaseAction = {
    actionName: "redhat-release",
    filePathMatches: (filePath) => filePath === path_1.normalize(types_1.OsReleaseFilePath.RedHat),
    callback: stream_utils_1.streamToString,
};
const getCentosReleaseAction = {
    actionName: "centos-release",
    filePathMatches: (filePath) => filePath === path_1.normalize(types_1.OsReleaseFilePath.Centos),
    callback: stream_utils_1.streamToString,
};
const getOracleReleaseAction = {
    actionName: "oracle-release",
    filePathMatches: (filePath) => filePath === path_1.normalize(types_1.OsReleaseFilePath.Oracle),
    callback: stream_utils_1.streamToString,
};
const osReleaseActionMap = {
    [types_1.OsReleaseFilePath.Linux]: getOsReleaseAction,
    [types_1.OsReleaseFilePath.LinuxFallback]: getFallbackOsReleaseAction,
    [types_1.OsReleaseFilePath.Lsb]: getLsbReleaseAction,
    [types_1.OsReleaseFilePath.Debian]: getDebianVersionAction,
    [types_1.OsReleaseFilePath.Alpine]: getAlpineReleaseAction,
    [types_1.OsReleaseFilePath.RedHat]: getRedHatReleaseAction,
    [types_1.OsReleaseFilePath.Centos]: getCentosReleaseAction,
    [types_1.OsReleaseFilePath.Oracle]: getOracleReleaseAction,
};
exports.getOsReleaseActions = [
    getOsReleaseAction,
    getFallbackOsReleaseAction,
    getLsbReleaseAction,
    getDebianVersionAction,
    getAlpineReleaseAction,
    getRedHatReleaseAction,
    getCentosReleaseAction,
    getOracleReleaseAction,
];
function getOsRelease(extractedLayers, releasePath) {
    const osRelease = extractor_1.getContentAsString(extractedLayers, osReleaseActionMap[releasePath]);
    return osRelease || "";
}
exports.getOsRelease = getOsRelease;
//# sourceMappingURL=static.js.map