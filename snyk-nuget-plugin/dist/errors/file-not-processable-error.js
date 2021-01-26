"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNotProcessableError = void 0;
class FileNotProcessableError extends Error {
    constructor(...args) {
        super(...args);
        this.code = 422;
        this.name = 'FileNotProcessableError';
        Error.captureStackTrace(this, FileNotProcessableError);
    }
}
exports.FileNotProcessableError = FileNotProcessableError;
//# sourceMappingURL=file-not-processable-error.js.map