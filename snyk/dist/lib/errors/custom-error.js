"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = undefined;
        this.innerError = undefined;
        this.userMessage = undefined;
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=custom-error.js.map