"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedToLoadPolicyError = void 0;
const custom_error_1 = require("./custom-error");
class FailedToLoadPolicyError extends custom_error_1.CustomError {
    constructor() {
        super(FailedToLoadPolicyError.ERROR_MESSAGE);
        this.code = FailedToLoadPolicyError.ERROR_CODE;
        this.strCode = FailedToLoadPolicyError.ERROR_STRING_CODE;
        this.userMessage = FailedToLoadPolicyError.ERROR_MESSAGE;
    }
}
exports.FailedToLoadPolicyError = FailedToLoadPolicyError;
FailedToLoadPolicyError.ERROR_CODE = 422;
FailedToLoadPolicyError.ERROR_STRING_CODE = 'POLICY_LOAD_FAILED';
FailedToLoadPolicyError.ERROR_MESSAGE = 'Could not load policy file.';
//# sourceMappingURL=failed-to-load-policy-error.js.map