"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const parseXML = require("xml2js");
const debugModule = require("debug");
const debug = debugModule('snyk');
const dependency_1 = require("./dependency");
function parse(fileContent) {
    const installedPackages = [];
    debug('Trying to parse packages.config manifest');
    parseXML.parseString(fileContent, (err, result) => {
        if (err) {
            throw err;
        }
        else {
            const packages = result.packages.package || [];
            packages.forEach(function scanPackagesConfigNode(node) {
                const installedDependency = dependency_1.fromPackagesConfigEntry(node);
                installedPackages.push(installedDependency);
            });
        }
    });
    return installedPackages;
}
exports.parse = parse;
//# sourceMappingURL=packages-config-parser.js.map