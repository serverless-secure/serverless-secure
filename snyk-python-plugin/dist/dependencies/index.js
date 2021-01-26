"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDependencies = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const subProcess = require("./sub-process");
const inspect_implementation_1 = require("./inspect-implementation");
// Given a path to a manifest file and assuming that all the packages (transitively required by the
// manifest) were installed (e.g. using `pip install`), produce a tree of dependencies.
function getDependencies(root, targetFile, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (!options) {
            options = {};
        }
        let command = options.command || 'python';
        const includeDevDeps = !!(options.dev || false);
        let baseargs = [];
        if (path.basename(targetFile) === 'Pipfile') {
            // Check that pipenv is available by running it.
            const pipenvCheckProc = subProcess.executeSync('pipenv', ['--version']);
            if (pipenvCheckProc.status !== 0) {
                throw new Error('Failed to run `pipenv`; please make sure it is installed.');
            }
            command = 'pipenv';
            baseargs = ['run', 'python'];
        }
        const [plugin, pkg] = yield Promise.all([
            inspect_implementation_1.getMetaData(command, baseargs, root, targetFile),
            inspect_implementation_1.inspectInstalledDeps(command, baseargs, root, targetFile, options.allowMissing || false, includeDevDeps, options.args),
        ]);
        return { plugin, package: pkg };
    });
}
exports.getDependencies = getDependencies;
//# sourceMappingURL=index.js.map