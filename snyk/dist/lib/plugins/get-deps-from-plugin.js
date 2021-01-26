"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warnSomeGradleManifestsNotScanned = exports.getDepsFromPlugin = void 0;
const debugModule = require("debug");
const pathLib = require("path");
const chalk_1 = require("chalk");
const cli_interface_1 = require("@snyk/cli-interface");
const find_files_1 = require("../find-files");
const errors_1 = require("../errors");
const get_multi_plugin_result_1 = require("./get-multi-plugin-result");
const get_single_plugin_result_1 = require("./get-single-plugin-result");
const detect_1 = require("../detect");
const analytics = require("../analytics");
const convert_single_splugin_res_to_multi_custom_1 = require("./convert-single-splugin-res-to-multi-custom");
const convert_multi_plugin_res_to_multi_custom_1 = require("./convert-multi-plugin-res-to-multi-custom");
const yarn_workspaces_parser_1 = require("./nodejs-plugin/yarn-workspaces-parser");
const debug = debugModule('snyk-test');
const multiProjectProcessors = {
    yarnWorkspaces: {
        handler: yarn_workspaces_parser_1.processYarnWorkspaces,
        files: ['package.json'],
    },
    allProjects: {
        handler: get_multi_plugin_result_1.getMultiPluginResult,
        files: detect_1.AUTO_DETECTABLE_FILES,
    },
};
// Force getDepsFromPlugin to return scannedProjects for processing
async function getDepsFromPlugin(root, options) {
    let inspectRes;
    if (Object.keys(multiProjectProcessors).some((key) => options[key])) {
        const scanType = options.yarnWorkspaces ? 'yarnWorkspaces' : 'allProjects';
        const levelsDeep = options.detectionDepth;
        const ignore = options.exclude ? options.exclude.split(',') : [];
        const { files: targetFiles, allFilesFound } = await find_files_1.find(root, ignore, multiProjectProcessors[scanType].files, levelsDeep);
        debug(`auto detect manifest files, found ${targetFiles.length}`, targetFiles);
        if (targetFiles.length === 0) {
            throw errors_1.NoSupportedManifestsFoundError([root]);
        }
        // enable full sub-project scan for gradle
        options.allSubProjects = true;
        inspectRes = await multiProjectProcessors[scanType].handler(root, options, targetFiles);
        const scannedProjects = inspectRes.scannedProjects;
        const analyticData = {
            scannedProjects: scannedProjects.length,
            targetFiles,
            packageManagers: targetFiles.map((file) => detect_1.detectPackageManagerFromFile(file)),
            levelsDeep,
            ignore,
        };
        analytics.add(scanType, analyticData);
        debug(`Found ${scannedProjects.length} projects from ${allFilesFound.length} detected manifests`);
        const userWarningMessage = warnSomeGradleManifestsNotScanned(scannedProjects, allFilesFound, root);
        if (!options.json && userWarningMessage) {
            console.warn(chalk_1.default.bold.red(userWarningMessage));
        }
        return inspectRes;
    }
    // TODO: is this needed for the auto detect handling above?
    // don't override options.file if scanning multiple files at once
    if (!options.scanAllUnmanaged) {
        options.file = options.file || detect_1.detectPackageFile(root);
    }
    if (!options.docker && !(options.file || options.packageManager)) {
        throw errors_1.NoSupportedManifestsFoundError([...root]);
    }
    inspectRes = await get_single_plugin_result_1.getSinglePluginResult(root, options);
    if (!cli_interface_1.legacyPlugin.isMultiResult(inspectRes)) {
        if (!inspectRes.package && !inspectRes.dependencyGraph) {
            // something went wrong if both are not present...
            throw Error(`error getting dependencies from ${options.docker ? 'docker' : options.packageManager} ` + "plugin: neither 'package' nor 'scannedProjects' were found");
        }
        return convert_single_splugin_res_to_multi_custom_1.convertSingleResultToMultiCustom(inspectRes, options.packageManager);
    }
    // We are using "options" to store some information returned from plugin that we need to use later,
    // but don't want to send to Registry in the Payload.
    // TODO(kyegupov): decouple inspect and payload so that we don't need this hack
    options.projectNames = inspectRes.scannedProjects.map((scannedProject) => { var _a; return (_a = scannedProject === null || scannedProject === void 0 ? void 0 : scannedProject.depTree) === null || _a === void 0 ? void 0 : _a.name; });
    return convert_multi_plugin_res_to_multi_custom_1.convertMultiResultToMultiCustom(inspectRes, options.packageManager);
}
exports.getDepsFromPlugin = getDepsFromPlugin;
function warnSomeGradleManifestsNotScanned(scannedProjects, allFilesFound, root) {
    const gradleTargetFilesFilter = (targetFile) => targetFile &&
        (targetFile.endsWith('build.gradle') ||
            targetFile.endsWith('build.gradle.kts'));
    const scannedGradleFiles = scannedProjects
        .map((p) => {
        var _a;
        const targetFile = ((_a = p.meta) === null || _a === void 0 ? void 0 : _a.targetFile) || p.targetFile;
        return targetFile ? pathLib.resolve(root, targetFile) : null;
    })
        .filter(gradleTargetFilesFilter);
    const detectedGradleFiles = allFilesFound.filter(gradleTargetFilesFilter);
    const diff = detectedGradleFiles.filter((file) => !scannedGradleFiles.includes(file));
    debug(`These Gradle manifests did not return any dependency results:\n${diff.join(',\n')}`);
    if (diff.length > 0) {
        return `✗ ${diff.length}/${detectedGradleFiles.length} detected Gradle manifests did not return dependencies. They may have errored or were not included as part of a multi-project build. You may need to scan them individually with --file=path/to/file. Run with \`-d\` for more info.`;
    }
    return null;
}
exports.warnSomeGradleManifestsNotScanned = warnSomeGradleManifestsNotScanned;
//# sourceMappingURL=get-deps-from-plugin.js.map