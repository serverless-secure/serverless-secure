"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateArgs = exports.parsePathsFromSln = void 0;
const fs = require("fs");
const path = require("path");
const detect = require("../detect");
const no_supported_manifests_found_1 = require("../errors/no-supported-manifests-found");
const Debug = require("debug");
const errors_1 = require("../errors");
const debug = Debug('snyk');
// slnFile should exist.
// returns array of project paths (path/to/manifest.file)
exports.parsePathsFromSln = (slnFile) => {
    // read project scopes from solution file
    // [\s\S] is like ., but with newlines!
    // *? means grab the shortest match
    const projectScopes = loadFile(path.resolve(slnFile)).match(/Project[\s\S]*?EndProject/g) || [];
    const paths = projectScopes
        .map((projectScope) => {
        const secondArg = projectScope.split(',')[1];
        // expected ` "path/to/manifest.file"`, clean it up
        return secondArg && secondArg.trim().replace(/"/g, '');
    })
        // drop falsey values
        .filter(Boolean)
        // convert path separators
        .map((projectPath) => {
        return path.dirname(projectPath.replace(/\\/g, path.sep));
    });
    debug('extracted paths from solution file: ', paths);
    return paths;
};
exports.updateArgs = (args) => {
    if (!args.options.file || typeof args.options.file !== 'string') {
        throw new errors_1.FileFlagBadInputError();
    }
    // save the path if --file=path/file.sln
    const slnFilePath = path.dirname(args.options.file);
    // extract all referenced projects from solution
    // keep only those that contain relevant manifest files
    const projectFolders = exports.parsePathsFromSln(args.options.file);
    const foldersWithSupportedProjects = projectFolders
        .map((projectPath) => {
        const projectFolder = path.resolve(slnFilePath, projectPath);
        const manifestFile = detect.detectPackageFile(projectFolder);
        return manifestFile ? projectFolder : undefined;
    })
        .filter(Boolean);
    debug('valid project folders in solution: ', projectFolders);
    if (foldersWithSupportedProjects.length === 0) {
        throw no_supported_manifests_found_1.NoSupportedManifestsFoundError([...projectFolders]);
    }
    // delete the file option as the solution has now been parsed
    delete args.options.file;
    // mutates args!
    addProjectFoldersToArgs(args, foldersWithSupportedProjects);
};
function addProjectFoldersToArgs(args, projectFolders) {
    // keep the last arg (options) aside for later use
    const lastArg = args.options._.pop();
    // add relevant project paths as if they were given as a runtime path args
    args.options._ = args.options._.concat(projectFolders);
    // bring back the last (options) arg
    args.options._.push(lastArg);
}
function loadFile(filePath) {
    // fs.existsSync doesn't throw an exception; no need for try
    if (!fs.existsSync(filePath)) {
        throw new Error('File not found: ' + filePath);
    }
    return fs.readFileSync(filePath, 'utf8');
}
//# sourceMappingURL=index.js.map