"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspect = void 0;
const inspectors_1 = require("./inspectors");
const missing_targetfile_error_1 = require("../../errors/missing-targetfile-error");
const gemfileLockToDependencies = require("./gemfile-lock-to-dependencies");
const _ = require("lodash");
async function inspect(root, targetFile) {
    if (!targetFile) {
        throw missing_targetfile_error_1.MissingTargetFileError(root);
    }
    const specs = await gatherSpecs(root, targetFile);
    return {
        plugin: {
            name: 'bundled:rubygems',
            runtime: 'unknown',
        },
        scannedProjects: [
            {
                depTree: {
                    name: specs.packageName,
                    targetFile: specs.targetFile,
                    dependencies: getDependenciesFromSpecs(specs),
                },
            },
        ],
    };
}
exports.inspect = inspect;
function getDependenciesFromSpecs(specs) {
    const gemfileLockBase64 = _.get(specs, 'files.gemfileLock.contents');
    const gemspecBase64 = _.get(specs, 'files.gemspec.contents');
    const contents = Buffer.from(gemfileLockBase64 || gemspecBase64, 'base64').toString();
    const dependencies = gemfileLockToDependencies(contents);
    return dependencies;
}
async function gatherSpecs(root, targetFile) {
    for (const inspector of inspectors_1.inspectors) {
        if (inspector.canHandle(targetFile)) {
            return await inspector.gatherSpecs(root, targetFile);
        }
    }
    throw new Error(`Could not handle rubygems file: ${targetFile}`);
}
//# sourceMappingURL=index.js.map