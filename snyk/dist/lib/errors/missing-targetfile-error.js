"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingTargetFileError = void 0;
const custom_error_1 = require("./custom-error");
function MissingTargetFileError(path) {
    const errorMsg = `Not a recognised option did you mean --file=${path}? ` +
        'Check other options by running snyk --help';
    const error = new custom_error_1.CustomError(errorMsg);
    error.code = 422;
    error.userMessage = errorMsg;
    return error;
}
exports.MissingTargetFileError = MissingTargetFileError;
//# sourceMappingURL=missing-targetfile-error.js.map