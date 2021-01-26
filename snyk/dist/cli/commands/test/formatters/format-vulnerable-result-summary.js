"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summariseVulnerableResults = void 0;
function summariseVulnerableResults(vulnerableResults, options) {
    const vulnsLength = vulnerableResults.length;
    if (vulnsLength) {
        if (options.showVulnPaths) {
            return `, ${vulnsLength} contained vulnerable paths.`;
        }
        return `, ${vulnsLength} had issues.`;
    }
    if (options.showVulnPaths) {
        return ', no vulnerable paths were found.';
    }
    return ', no issues were found.';
}
exports.summariseVulnerableResults = summariseVulnerableResults;
//# sourceMappingURL=format-vulnerable-result-summary.js.map