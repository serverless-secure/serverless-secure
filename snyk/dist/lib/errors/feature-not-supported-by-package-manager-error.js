"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureNotSupportedByPackageManagerError = void 0;
const custom_error_1 = require("./custom-error");
class FeatureNotSupportedByPackageManagerError extends custom_error_1.CustomError {
    constructor(feature, packageManager) {
        super(`Unsupported package manager ${packageManager} for ${feature}.`);
        this.code = 422;
        this.userMessage = `'${feature}' is not supported for package manager '${packageManager}'.`;
    }
}
exports.FeatureNotSupportedByPackageManagerError = FeatureNotSupportedByPackageManagerError;
//# sourceMappingURL=feature-not-supported-by-package-manager-error.js.map