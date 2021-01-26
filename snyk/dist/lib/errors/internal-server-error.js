"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const custom_error_1 = require("./custom-error");
class InternalServerError extends custom_error_1.CustomError {
    constructor(userMessage) {
        super(InternalServerError.ERROR_MESSAGE);
        this.code = InternalServerError.ERROR_CODE;
        this.strCode = InternalServerError.ERROR_STRING_CODE;
        this.userMessage = userMessage || InternalServerError.ERROR_MESSAGE;
    }
}
exports.InternalServerError = InternalServerError;
InternalServerError.ERROR_CODE = 500;
InternalServerError.ERROR_STRING_CODE = 'INTERNAL_SERVER_ERROR';
InternalServerError.ERROR_MESSAGE = 'Internal server error';
//# sourceMappingURL=internal-server-error.js.map