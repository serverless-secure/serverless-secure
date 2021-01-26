"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedFeatureFlagError = void 0;
const custom_error_1 = require("./custom-error");
class UnsupportedFeatureFlagError extends custom_error_1.CustomError {
    constructor(featureFlag, userMessage = `Feature flag '${featureFlag}' is not currently enabled for your org, to enable please contact snyk support`) {
        super(userMessage);
        this.userMessage = userMessage;
        this.code = UnsupportedFeatureFlagError.ERROR_CODE;
    }
}
exports.UnsupportedFeatureFlagError = UnsupportedFeatureFlagError;
UnsupportedFeatureFlagError.ERROR_CODE = 403;
//# sourceMappingURL=unsupported-feature-flag-error.js.map