"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingApiTokenError = void 0;
const custom_error_1 = require("./custom-error");
class MissingApiTokenError extends custom_error_1.CustomError {
    constructor() {
        super(MissingApiTokenError.ERROR_MESSAGE);
        this.code = MissingApiTokenError.ERROR_CODE;
        this.strCode = MissingApiTokenError.ERROR_STRING_CODE;
        this.userMessage = MissingApiTokenError.ERROR_MESSAGE;
    }
}
exports.MissingApiTokenError = MissingApiTokenError;
MissingApiTokenError.ERROR_CODE = 401;
MissingApiTokenError.ERROR_STRING_CODE = 'NO_API_TOKEN';
MissingApiTokenError.ERROR_MESSAGE = '`snyk` requires an authenticated account. Please run `snyk auth` and try again.';
//# sourceMappingURL=missing-api-token.js.map