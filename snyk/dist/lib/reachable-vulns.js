"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePayload = exports.serializeCallGraphWithMetrics = void 0;
const graphlib = require("graphlib");
const package_managers_1 = require("./package-managers");
const feature_flags_1 = require("./feature-flags");
const errors_1 = require("./errors");
const is_multi_project_scan_1 = require("./is-multi-project-scan");
const featureFlag = 'reachableVulns';
function serializeCallGraphWithMetrics(callGraph) {
    return {
        callGraph: graphlib.json.write(callGraph),
        nodeCount: callGraph.nodeCount(),
        edgeCount: callGraph.edgeCount(),
    };
}
exports.serializeCallGraphWithMetrics = serializeCallGraphWithMetrics;
async function validatePayload(org, options, packageManager) {
    if (packageManager &&
        !is_multi_project_scan_1.isMultiProjectScan(options) &&
        !package_managers_1.REACHABLE_VULNS_SUPPORTED_PACKAGE_MANAGERS.includes(packageManager)) {
        throw new errors_1.FeatureNotSupportedByPackageManagerError('Reachable vulns', packageManager);
    }
    const reachableVulnsSupportedRes = await feature_flags_1.isFeatureFlagSupportedForOrg(featureFlag, org);
    if (reachableVulnsSupportedRes.code === 401) {
        throw errors_1.AuthFailedError(reachableVulnsSupportedRes.error, reachableVulnsSupportedRes.code);
    }
    if (reachableVulnsSupportedRes.userMessage) {
        throw new errors_1.UnsupportedFeatureFlagError(featureFlag, reachableVulnsSupportedRes.userMessage);
    }
    return true;
}
exports.validatePayload = validatePayload;
//# sourceMappingURL=reachable-vulns.js.map