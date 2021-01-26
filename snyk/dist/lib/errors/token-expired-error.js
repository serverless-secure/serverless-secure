"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenExpiredError = void 0;
const custom_error_1 = require("./custom-error");
function TokenExpiredError() {
    const errorMsg = 'Sorry, but your authentication token has now' +
        ' expired.\nPlease try to authenticate again.';
    const error = new custom_error_1.CustomError(errorMsg);
    error.code = 401;
    error.strCode = 'AUTH_TIMEOUT';
    error.userMessage = errorMsg;
    return error;
}
exports.TokenExpiredError = TokenExpiredError;
//# sourceMappingURL=token-expired-error.js.map