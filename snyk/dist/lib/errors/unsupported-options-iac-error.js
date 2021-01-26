"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedOptionFileIacError = exports.SupportLocalFileOnlyIacError = void 0;
function SupportLocalFileOnlyIacError() {
    return 'iac test option currently supports only a single local file';
}
exports.SupportLocalFileOnlyIacError = SupportLocalFileOnlyIacError;
function UnsupportedOptionFileIacError(path) {
    return (`Not a recognised option, did you mean "snyk iac test ${path}"? ` +
        'Check other options by running snyk iac --help');
}
exports.UnsupportedOptionFileIacError = UnsupportedOptionFileIacError;
//# sourceMappingURL=unsupported-options-iac-error.js.map