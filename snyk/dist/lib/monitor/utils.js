"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetFile = exports.getProjectName = exports.getNameDepGraph = exports.getNameDepTree = void 0;
const container_1 = require("../container");
function getNameDepTree(scannedProject, depTree, meta) {
    if (container_1.isContainer(scannedProject)) {
        return container_1.getContainerName(scannedProject, meta);
    }
    return depTree.name;
}
exports.getNameDepTree = getNameDepTree;
function getNameDepGraph(scannedProject, depGraph, meta) {
    var _a;
    if (container_1.isContainer(scannedProject)) {
        return container_1.getContainerName(scannedProject, meta);
    }
    return (_a = depGraph.rootPkg) === null || _a === void 0 ? void 0 : _a.name;
}
exports.getNameDepGraph = getNameDepGraph;
function getProjectName(scannedProject, meta) {
    if (container_1.isContainer(scannedProject)) {
        return container_1.getContainerProjectName(scannedProject, meta);
    }
    return meta['project-name'];
}
exports.getProjectName = getProjectName;
function getTargetFile(scannedProject, pluginMeta) {
    if (container_1.isContainer(scannedProject)) {
        return container_1.getContainerTargetFile(scannedProject);
    }
    return pluginMeta.targetFile;
}
exports.getTargetFile = getTargetFile;
//# sourceMappingURL=utils.js.map