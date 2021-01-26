"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMultiPluginResult = void 0;
const _ = require("lodash");
const path = require("path");
const cliInterface = require("@snyk/cli-interface");
const chalk_1 = require("chalk");
const debugModule = require("debug");
const detect_1 = require("../detect");
const get_single_plugin_result_1 = require("./get-single-plugin-result");
const convert_single_splugin_res_to_multi_custom_1 = require("./convert-single-splugin-res-to-multi-custom");
const convert_multi_plugin_res_to_multi_custom_1 = require("./convert-multi-plugin-res-to-multi-custom");
const errors_1 = require("../errors");
const debug = debugModule('snyk-test');
async function getMultiPluginResult(root, options, targetFiles) {
    const allResults = [];
    const failedResults = [];
    for (const targetFile of targetFiles) {
        const optionsClone = _.cloneDeep(options);
        optionsClone.file = path.relative(root, targetFile);
        optionsClone.packageManager = detect_1.detectPackageManagerFromFile(path.basename(targetFile));
        try {
            const inspectRes = await get_single_plugin_result_1.getSinglePluginResult(root, optionsClone, optionsClone.file);
            let resultWithScannedProjects;
            if (!cliInterface.legacyPlugin.isMultiResult(inspectRes)) {
                resultWithScannedProjects = convert_single_splugin_res_to_multi_custom_1.convertSingleResultToMultiCustom(inspectRes, optionsClone.packageManager);
            }
            else {
                resultWithScannedProjects = inspectRes;
            }
            const pluginResultWithCustomScannedProjects = convert_multi_plugin_res_to_multi_custom_1.convertMultiResultToMultiCustom(resultWithScannedProjects, optionsClone.packageManager, optionsClone.file);
            // annotate the package manager, project name & targetFile to be used
            // for test & monitor
            // TODO: refactor how we display meta to not have to do this
            options.projectNames = resultWithScannedProjects.scannedProjects.map((scannedProject) => { var _a; return (_a = scannedProject === null || scannedProject === void 0 ? void 0 : scannedProject.depTree) === null || _a === void 0 ? void 0 : _a.name; });
            allResults.push(...pluginResultWithCustomScannedProjects.scannedProjects);
        }
        catch (err) {
            // TODO: propagate this all the way back and include in --json output
            failedResults.push({
                targetFile,
                error: err,
                errMessage: err.message || 'Something went wrong getting dependencies',
            });
            debug(chalk_1.default.bold.red(`\n✗ Failed to get dependencies for ${targetFile}\nERROR: ${err.message}\n`));
        }
    }
    if (!allResults.length) {
        throw new errors_1.FailedToRunTestError(`Failed to get dependencies for all ${targetFiles.length} potential projects. Run with \`-d\` for debug output and contact support@snyk.io`);
    }
    return {
        plugin: {
            name: 'custom-auto-detect',
        },
        scannedProjects: allResults,
        failedResults,
    };
}
exports.getMultiPluginResult = getMultiPluginResult;
//# sourceMappingURL=get-multi-plugin-result.js.map