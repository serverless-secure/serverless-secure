"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedPackageManagerError = void 0;
const custom_error_1 = require("./custom-error");
const pms = require("../package-managers");
class UnsupportedPackageManagerError extends custom_error_1.CustomError {
    constructor(packageManager) {
        super(`Unsupported package manager ${packageManager}.` +
            UnsupportedPackageManagerError.ERROR_MESSAGE);
        this.code = 422;
        this.userMessage =
            `Unsupported package manager '${packageManager}''. ` +
                UnsupportedPackageManagerError.ERROR_MESSAGE;
    }
}
exports.UnsupportedPackageManagerError = UnsupportedPackageManagerError;
UnsupportedPackageManagerError.ERROR_MESSAGE = 'Here are our supported package managers:' +
    `${Object.keys(pms.SUPPORTED_PACKAGE_MANAGER_NAME).map((i) => '\n  - ' + i + ' (' + pms.SUPPORTED_PACKAGE_MANAGER_NAME[i] + ')')}
        `;
//# sourceMappingURL=unsupported-package-manager-error.js.map