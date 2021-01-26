"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNuspec = void 0;
const JSZip = require("jszip");
const fs = require("fs");
const path = require("path");
const parseXML = require("xml2js");
const _ = require("lodash");
const debugModule = require("debug");
const debug = debugModule('snyk');
const targetFrameworkRegex = /([.a-zA-Z]+)([.0-9]+)/;
async function parseNuspec(dep, targetFramework) {
    return Promise.resolve()
        .then(() => {
        const nupkgPath = path.resolve(dep.path, dep.name + '.' + dep.version + '.nupkg');
        const nupkgData = fs.readFileSync(nupkgPath);
        return JSZip.loadAsync(nupkgData);
    })
        .then((nuspecZipData) => {
        const nuspecFiles = Object.keys(nuspecZipData.files).filter((file) => {
            return (path.extname(file) === '.nuspec');
        });
        return nuspecZipData.files[nuspecFiles[0]].async('text');
    })
        .then((nuspecContent) => {
        return new Promise((resolve, reject) => {
            parseXML.parseString(nuspecContent, (err, result) => {
                if (err) {
                    return reject(err);
                }
                let ownDeps = [];
                // We are only going to check the first targetFramework we encounter
                // in the future we may want to support multiple, but only once
                // we have dependency version conflict resolution implemented
                _(result.package.metadata).forEach((metadata) => {
                    _(metadata.dependencies).forEach((rawDependency) => {
                        // Find and add target framework version specific dependencies
                        const depsForTargetFramework = extractDepsForTargetFramework(rawDependency, targetFramework);
                        if (depsForTargetFramework && depsForTargetFramework.group) {
                            ownDeps = _.concat(ownDeps, extractDepsFromRaw(depsForTargetFramework.group.dependency));
                        }
                        // Find all groups with no targetFramework attribute
                        // add their deps
                        const depsFromPlainGroups = extractDepsForPlainGroups(rawDependency);
                        if (depsFromPlainGroups) {
                            depsFromPlainGroups.forEach((depGroup) => {
                                ownDeps = _.concat(ownDeps, extractDepsFromRaw(depGroup.dependency));
                            });
                        }
                        // Add the default dependencies
                        ownDeps = _.concat(ownDeps, extractDepsFromRaw(rawDependency.dependency));
                    });
                });
                return resolve({
                    children: ownDeps,
                    name: dep.name,
                });
            });
        });
    })
        .catch((err) => {
        // parsing problems are coerced into an empty nuspec
        debug('Error parsing dependency', JSON.stringify(dep), err);
        return null;
    });
}
exports.parseNuspec = parseNuspec;
function extractDepsForPlainGroups(rawDependency) {
    return _(rawDependency.group)
        .filter((group) => {
        // valid group with no attributes or no `targetFramework` attribute
        return group && !(group.$ && group.$.targetFramework);
    });
}
function extractDepsForTargetFramework(rawDependency, targetFramework) {
    return rawDependency && _(rawDependency.group)
        .filter((group) => {
        return group && group.$ && group.$.targetFramework &&
            targetFrameworkRegex.test(group.$.targetFramework);
    })
        .map((group) => {
        const parts = _.split(group.$.targetFramework, targetFrameworkRegex);
        return {
            framework: parts[1],
            group,
            version: parts[2],
        };
    })
        .orderBy(['framework', 'version'], ['asc', 'desc'])
        .find((group) => {
        return targetFramework.framework === group.framework &&
            targetFramework.version >= group.version;
    });
}
function extractDepsFromRaw(rawDependencies) {
    const deps = [];
    _.forEach(rawDependencies, (dep) => {
        if (dep && dep.$) {
            deps.push({
                dependencies: {},
                name: dep.$.id,
                version: dep.$.version,
            });
        }
    });
    return deps;
}
//# sourceMappingURL=nuspec-parser.js.map