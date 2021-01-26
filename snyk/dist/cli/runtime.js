"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupported = exports.supportedRange = void 0;
const semver_1 = require("semver");
const MIN_RUNTIME = '8.0.0';
exports.supportedRange = `>= ${MIN_RUNTIME}`;
function isSupported(runtimeVersion) {
    return semver_1.gte(runtimeVersion, MIN_RUNTIME);
}
exports.isSupported = isSupported;
//# sourceMappingURL=runtime.js.map