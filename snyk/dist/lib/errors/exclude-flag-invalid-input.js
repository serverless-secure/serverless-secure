"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcludeFlagInvalidInputError = void 0;
const custom_error_1 = require("./custom-error");
class ExcludeFlagInvalidInputError extends custom_error_1.CustomError {
    constructor() {
        super(ExcludeFlagInvalidInputError.ERROR_MESSAGE);
        this.code = ExcludeFlagInvalidInputError.ERROR_CODE;
        this.userMessage = ExcludeFlagInvalidInputError.ERROR_MESSAGE;
    }
}
exports.ExcludeFlagInvalidInputError = ExcludeFlagInvalidInputError;
ExcludeFlagInvalidInputError.ERROR_CODE = 422;
ExcludeFlagInvalidInputError.ERROR_MESSAGE = 'The --exclude argument must be a comma separated list of directory names and cannot contain a path.';
//# sourceMappingURL=exclude-flag-invalid-input.js.map