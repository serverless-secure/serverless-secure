"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTestMeta = void 0;
const chalk_1 = require("chalk");
const right_pad_1 = require("../../../../lib/right-pad");
const iac_output_1 = require("../iac-output");
function formatTestMeta(res, options) {
    const padToLength = 19; // chars to align
    const packageManager = res.packageManager || options.packageManager;
    const targetFile = res.targetFile || res.displayTargetFile || options.file;
    const openSource = res.isPrivate ? 'no' : 'yes';
    const meta = [
        chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Organization: ', padToLength)) + res.org,
    ];
    if (options.iac) {
        meta.push(chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Type: ', padToLength)) +
            iac_output_1.capitalizePackageManager(packageManager));
    }
    else {
        meta.push(chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Package manager: ', padToLength)) +
            packageManager);
    }
    if (targetFile) {
        meta.push(chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Target file: ', padToLength)) + targetFile);
    }
    if (res.projectName) {
        meta.push(chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Project name: ', padToLength)) +
            res.projectName);
    }
    if (options.docker) {
        meta.push(chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Docker image: ', padToLength)) +
            options.path);
    }
    else {
        meta.push(chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Open source: ', padToLength)) + openSource);
        meta.push(chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Project path: ', padToLength)) +
            options.path);
    }
    if (res.payloadType !== 'k8sconfig') {
        const legacyRes = res;
        if (legacyRes.docker && legacyRes.docker.baseImage) {
            meta.push(chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Base image: ', padToLength)) +
                legacyRes.docker.baseImage);
        }
        if (legacyRes.filesystemPolicy) {
            meta.push(chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Local Snyk policy: ', padToLength)) +
                chalk_1.default.green('found'));
            if (legacyRes.ignoreSettings &&
                legacyRes.ignoreSettings.disregardFilesystemIgnores) {
                meta.push(chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Local Snyk policy ignored: ', padToLength)) + chalk_1.default.red('yes'));
            }
        }
        if (legacyRes.licensesPolicy) {
            meta.push(chalk_1.default.bold(right_pad_1.rightPadWithSpaces('Licenses: ', padToLength)) +
                chalk_1.default.green('enabled'));
        }
    }
    return meta.join('\n');
}
exports.formatTestMeta = formatTestMeta;
//# sourceMappingURL=format-test-meta.js.map