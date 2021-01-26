"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitorError = void 0;
const custom_error_1 = require("./custom-error");
class MonitorError extends custom_error_1.CustomError {
    constructor(errorCode, message) {
        const errorMessage = message ? `, response: ${message}` : '';
        const code = errorCode || 500;
        super(MonitorError.ERROR_MESSAGE + `Status code: ${code}${errorMessage}`);
        this.code = errorCode;
        this.userMessage = message;
    }
}
exports.MonitorError = MonitorError;
MonitorError.ERROR_MESSAGE = 'Server returned unexpected error for the monitor request. ';
//# sourceMappingURL=monitor-error.js.map