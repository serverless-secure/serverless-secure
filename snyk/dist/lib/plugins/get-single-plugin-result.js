"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSinglePluginResult = void 0;
const plugins = require(".");
const module_info_1 = require("../module-info");
async function getSinglePluginResult(root, options, targetFile) {
    const plugin = plugins.loadPlugin(options.packageManager, options);
    const moduleInfo = module_info_1.ModuleInfo(plugin, options.policy);
    const inspectRes = await moduleInfo.inspect(root, targetFile || options.file, Object.assign({}, options));
    return inspectRes;
}
exports.getSinglePluginResult = getSinglePluginResult;
//# sourceMappingURL=get-single-plugin-result.js.map