"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromPackagesConfigEntry = exports.fromFolderName = exports.cloneShallow = void 0;
const debugModule = require("debug");
const debug = debugModule('snyk');
function cloneShallow(dep) {
    // clone, without the dependencies
    return {
        dependencies: {},
        name: dep.name,
        version: dep.version,
    };
}
exports.cloneShallow = cloneShallow;
function extractFromDotVersionNotation(expression) {
    const versionRef = /(?=\S+)(?=\.{1})((\.\d+)+((-?\w+\.?\d*)|(\+?[0-9a-f]{5,40}))?)/
        .exec(expression)[0];
    const name = expression.split(versionRef)[0];
    return {
        name,
        version: versionRef.slice(1),
    };
}
function fromFolderName(folderName) {
    debug('Extracting by folder name ' + folderName);
    const info = extractFromDotVersionNotation(folderName);
    return {
        dependencies: {},
        name: info.name,
        version: info.version,
    };
}
exports.fromFolderName = fromFolderName;
function fromPackagesConfigEntry(manifest) {
    debug('Extracting by packages.config entry:' +
        ' name = ' + manifest.$.id +
        ' version = ' + manifest.$.version);
    return {
        dependencies: {},
        name: manifest.$.id,
        version: manifest.$.version,
    };
}
exports.fromPackagesConfigEntry = fromPackagesConfigEntry;
//# sourceMappingURL=dependency.js.map