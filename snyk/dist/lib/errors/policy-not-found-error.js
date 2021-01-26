"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolicyNotFoundError = void 0;
const custom_error_1 = require("./custom-error");
class PolicyNotFoundError extends custom_error_1.CustomError {
    constructor() {
        super(PolicyNotFoundError.ERROR_MESSAGE);
        this.code = PolicyNotFoundError.ERROR_CODE;
        this.strCode = PolicyNotFoundError.ERROR_STRING_CODE;
        this.userMessage = PolicyNotFoundError.ERROR_MESSAGE;
    }
}
exports.PolicyNotFoundError = PolicyNotFoundError;
PolicyNotFoundError.ERROR_CODE = 404;
PolicyNotFoundError.ERROR_STRING_CODE = 'MISSING_DOTFILE';
PolicyNotFoundError.ERROR_MESSAGE = 'Could not load policy. Try running `snyk wizard` to define a Snyk protect policy';
//# sourceMappingURL=policy-not-found-error.js.map