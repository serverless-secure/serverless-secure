"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAndLoadPolicy = void 0;
const snykPolicyLib = require("snyk-policy");
const debugModule = require("debug");
const _1 = require(".");
const analytics = require("../analytics");
const debug = debugModule('snyk');
async function findAndLoadPolicy(root, scanType, options, pkg, scannedProjectFolder) {
    const isDocker = scanType === 'docker';
    const isNodeProject = ['npm', 'yarn'].includes(scanType);
    // monitor
    let policyLocations = [
        options['policy-path'] || scannedProjectFolder || root,
    ];
    if (isDocker) {
        policyLocations = policyLocations.filter((loc) => loc !== root);
    }
    else if (isNodeProject) {
        // TODO: pluckPolicies expects a package.json object to
        // find and apply policies in node_modules
        policyLocations = policyLocations.concat(_1.pluckPolicies(pkg));
    }
    debug('Potential policy locations found:', policyLocations);
    analytics.add('policies', policyLocations.length);
    analytics.add('policyLocations', policyLocations);
    if (policyLocations.length === 0) {
        return;
    }
    let policy;
    try {
        policy = await snykPolicyLib.load(policyLocations, options);
    }
    catch (err) {
        // note: inline catch, to handle error from .load
        // if the .snyk file wasn't found, it is fine
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
    return policy;
}
exports.findAndLoadPolicy = findAndLoadPolicy;
//# sourceMappingURL=find-and-load-policy.js.map