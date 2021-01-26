"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTargetFrameworksFromProjFile = void 0;
const errors_1 = require("../errors");
const fs = require("fs");
const path = require("path");
const parseXML = require("xml2js");
const _ = require("lodash");
const debugModule = require("debug");
const framework_1 = require("./framework");
const debug = debugModule('snyk');
async function getTargetFrameworksFromProjFile(rootDir) {
    return new Promise((resolve, reject) => {
        debug('Looking for your .csproj file in ' + rootDir);
        const csprojPath = findFile(rootDir, /.*\.csproj$/);
        if (csprojPath) {
            debug('Checking .net framework version in .csproj file ' + csprojPath);
            const csprojContents = fs.readFileSync(csprojPath);
            let frameworks = [];
            parseXML.parseString(csprojContents, (err, parsedCsprojContents) => {
                if (err) {
                    reject(new errors_1.FileNotProcessableError(err));
                }
                const versionLoc = _.get(parsedCsprojContents, 'Project.PropertyGroup[0]');
                const versions = _.compact(_.concat([], _.get(versionLoc, 'TargetFrameworkVersion[0]') ||
                    _.get(versionLoc, 'TargetFramework[0]') ||
                    _.get(versionLoc, 'TargetFrameworks[0]', '').split(';')));
                if (versions.length < 1) {
                    debug('Could not find TargetFrameworkVersion/TargetFramework' +
                        '/TargetFrameworks defined in the Project.PropertyGroup field of ' +
                        'your .csproj file');
                }
                frameworks = _.compact(_.map(versions, framework_1.toReadableFramework));
                if (versions.length > 1 && frameworks.length < 1) {
                    debug('Could not find valid/supported .NET version in csproj file located at' + csprojPath);
                }
                resolve(frameworks[0]);
            });
        }
        debug('.csproj file not found in ' + rootDir + '.');
        resolve();
    });
}
exports.getTargetFrameworksFromProjFile = getTargetFrameworksFromProjFile;
function findFile(rootDir, filter) {
    if (!fs.existsSync(rootDir)) {
        throw new errors_1.FileNotFoundError('No such path: ' + rootDir);
    }
    const files = fs.readdirSync(rootDir);
    for (const file of files) {
        const filename = path.resolve(rootDir, file);
        if (filter.test(filename)) {
            return filename;
        }
    }
}
//# sourceMappingURL=csproj-parser.js.map