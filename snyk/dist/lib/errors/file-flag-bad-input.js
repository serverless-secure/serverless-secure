"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFlagBadInputError = void 0;
const custom_error_1 = require("./custom-error");
class FileFlagBadInputError extends custom_error_1.CustomError {
    constructor() {
        super(FileFlagBadInputError.ERROR_MESSAGE);
        this.code = FileFlagBadInputError.ERROR_CODE;
        this.userMessage = FileFlagBadInputError.ERROR_MESSAGE;
    }
}
exports.FileFlagBadInputError = FileFlagBadInputError;
FileFlagBadInputError.ERROR_CODE = 422;
FileFlagBadInputError.ERROR_MESSAGE = 'Empty --file argument. Did you mean --file=path/to/file ?';
//# sourceMappingURL=file-flag-bad-input.js.map