"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionTimeoutError = void 0;
const custom_error_1 = require("./custom-error");
class ConnectionTimeoutError extends custom_error_1.CustomError {
    constructor() {
        super(ConnectionTimeoutError.ERROR_MESSAGE);
        this.code = 504;
        this.userMessage = ConnectionTimeoutError.ERROR_MESSAGE;
    }
}
exports.ConnectionTimeoutError = ConnectionTimeoutError;
ConnectionTimeoutError.ERROR_MESSAGE = 'Connection timeout.';
//# sourceMappingURL=connection-timeout-error.js.map