"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const path = require("path");
const fs = require("fs");
const resolveNodeDeps = require("snyk-resolve-deps");
const baseDebug = require("debug");
const _ = require("lodash");
const spinner = require("../../spinner");
const analytics = require("../../analytics");
const get_file_contents_1 = require("../../get-file-contents");
const debug = baseDebug('snyk-nodejs-plugin');
async function parse(root, targetFile, options) {
    if (targetFile.endsWith('yarn.lock')) {
        options.file =
            options.file && options.file.replace('yarn.lock', 'package.json');
    }
    // package-lock.json falls back to package.json (used in wizard code)
    if (targetFile.endsWith('package-lock.json')) {
        options.file =
            options.file && options.file.replace('package-lock.json', 'package.json');
    }
    // check if there any dependencies
    const packageJsonFileName = path.resolve(root, options.file);
    const packageManager = options.packageManager || 'npm';
    try {
        const packageJson = JSON.parse(get_file_contents_1.getFileContents(root, packageJsonFileName).content);
        let dependencies = packageJson.dependencies;
        if (options.dev) {
            dependencies = Object.assign(Object.assign({}, dependencies), packageJson.devDependencies);
        }
        if (_.isEmpty(dependencies)) {
            return new Promise((resolve) => resolve({
                name: packageJson.name,
                dependencies: {},
                version: packageJson.version,
            }));
        }
    }
    catch (e) {
        debug(`Failed to read ${packageJsonFileName}: Error: ${e}`);
        throw new Error(`Failed to read ${packageJsonFileName}. Error: ${e.message}`);
    }
    const nodeModulesPath = path.join(path.dirname(path.resolve(root, targetFile)), 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
        // throw a custom error
        throw new Error("Missing node_modules folder: we can't test " +
            `without dependencies.\nPlease run '${packageManager} install' first.`);
    }
    analytics.add('local', true);
    analytics.add('generating-node-dependency-tree', {
        lockFile: false,
        targetFile,
    });
    const resolveModuleSpinnerLabel = 'Analyzing npm dependencies for ' +
        path.dirname(path.resolve(root, targetFile));
    try {
        await spinner.clear(resolveModuleSpinnerLabel)();
        await spinner(resolveModuleSpinnerLabel);
        return resolveNodeDeps(root, Object.assign({}, options, { noFromArrays: true }));
    }
    finally {
        await spinner.clear(resolveModuleSpinnerLabel)();
    }
}
exports.parse = parse;
//# sourceMappingURL=npm-modules-parser.js.map