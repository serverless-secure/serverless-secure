"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MisconfiguredAuthInCI = void 0;
const custom_error_1 = require("./custom-error");
function MisconfiguredAuthInCI() {
    const errorMsg = 'Snyk is missing auth token in order to run inside CI. You must include ' +
        'your API token as an environment value: `SNYK_TOKEN=12345678`';
    const error = new custom_error_1.CustomError(errorMsg);
    error.code = 401;
    error.strCode = 'noAuthInCI';
    error.userMessage = errorMsg;
    return error;
}
exports.MisconfiguredAuthInCI = MisconfiguredAuthInCI;
//# sourceMappingURL=misconfigured-auth-in-ci-error.js.map