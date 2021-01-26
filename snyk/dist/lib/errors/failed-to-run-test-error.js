"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedToRunTestError = void 0;
const custom_error_1 = require("./custom-error");
class FailedToRunTestError extends custom_error_1.CustomError {
    constructor(userMessage, errorCode) {
        const code = errorCode || 500;
        super(userMessage || FailedToRunTestError.ERROR_MESSAGE);
        this.code = errorCode || code;
        this.userMessage = userMessage || FailedToRunTestError.ERROR_MESSAGE;
    }
}
exports.FailedToRunTestError = FailedToRunTestError;
FailedToRunTestError.ERROR_MESSAGE = 'Failed to run a test';
//# sourceMappingURL=failed-to-run-test-error.js.map