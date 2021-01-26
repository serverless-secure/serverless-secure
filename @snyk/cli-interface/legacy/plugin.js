"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMultiResult = exports.isMultiSubProject = exports.adaptSingleProjectPlugin = void 0;
function adaptSingleProjectPlugin(plugin) {
    return { inspect: (root, targetFile, options) => {
            if (options && isMultiSubProject(options)) {
                const name = plugin.pluginName ? plugin.pluginName() : '[unknown]';
                throw new Error(`Plugin ${name} does not support scanning multiple sub-projects`);
            }
            else {
                return plugin.inspect(root, targetFile, options);
            }
        } };
}
exports.adaptSingleProjectPlugin = adaptSingleProjectPlugin;
function isMultiSubProject(options) {
    return options.allSubProjects;
}
exports.isMultiSubProject = isMultiSubProject;
function isMultiResult(res) {
    return !!res.scannedProjects;
}
exports.isMultiResult = isMultiResult;
//# sourceMappingURL=plugin.js.map