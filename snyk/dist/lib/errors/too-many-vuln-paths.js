"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooManyVulnPaths = void 0;
const custom_error_1 = require("./custom-error");
class TooManyVulnPaths extends custom_error_1.CustomError {
    constructor() {
        super(TooManyVulnPaths.ERROR_MESSAGE);
        this.code = TooManyVulnPaths.ERROR_CODE;
        this.strCode = TooManyVulnPaths.ERROR_STRING_CODE;
        this.userMessage = TooManyVulnPaths.ERROR_MESSAGE;
    }
}
exports.TooManyVulnPaths = TooManyVulnPaths;
TooManyVulnPaths.ERROR_CODE = 413;
TooManyVulnPaths.ERROR_STRING_CODE = 'TOO_MANY_VULN_PATHS';
TooManyVulnPaths.ERROR_MESSAGE = 'Too many vulnerable paths to process the project';
//# sourceMappingURL=too-many-vuln-paths.js.map