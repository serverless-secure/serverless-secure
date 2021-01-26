"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedToGetVulnerabilitiesError = void 0;
const custom_error_1 = require("./custom-error");
class FailedToGetVulnerabilitiesError extends custom_error_1.CustomError {
    constructor(userMessage, statusCode) {
        super(FailedToGetVulnerabilitiesError.ERROR_MESSAGE);
        this.code = statusCode || FailedToGetVulnerabilitiesError.ERROR_CODE;
        this.strCode = FailedToGetVulnerabilitiesError.ERROR_STRING_CODE;
        this.userMessage =
            userMessage || FailedToGetVulnerabilitiesError.ERROR_MESSAGE;
    }
}
exports.FailedToGetVulnerabilitiesError = FailedToGetVulnerabilitiesError;
FailedToGetVulnerabilitiesError.ERROR_CODE = 500;
FailedToGetVulnerabilitiesError.ERROR_STRING_CODE = 'INTERNAL_SERVER_ERROR';
FailedToGetVulnerabilitiesError.ERROR_MESSAGE = 'Failed to get vulns';
//# sourceMappingURL=failed-to-get-vulnerabilities-error.js.map