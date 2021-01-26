"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSupportedManifestsFoundError = void 0;
const chalk_1 = require("chalk");
const custom_error_1 = require("./custom-error");
function NoSupportedManifestsFoundError(atLocations) {
    const locationsStr = atLocations.join(', ');
    const errorMsg = 'Could not detect supported target files in ' +
        locationsStr +
        '.\nPlease see our documentation for supported languages and ' +
        'target files: ' +
        chalk_1.default.underline('https://support.snyk.io/hc/en-us/articles/360000911957-Language-support') +
        ' and make sure you are in the right directory.';
    const error = new custom_error_1.CustomError(errorMsg);
    error.code = 422;
    error.userMessage = errorMsg;
    return error;
}
exports.NoSupportedManifestsFoundError = NoSupportedManifestsFoundError;
//# sourceMappingURL=no-supported-manifests-found.js.map