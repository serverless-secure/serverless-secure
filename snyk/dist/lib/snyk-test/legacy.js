"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTestDepGraphResultToLegacy = exports.REACHABILITY = exports.SEVERITY = void 0;
const _ = require("lodash");
const common_1 = require("./common");
var SEVERITY;
(function (SEVERITY) {
    SEVERITY["LOW"] = "low";
    SEVERITY["MEDIUM"] = "medium";
    SEVERITY["HIGH"] = "high";
})(SEVERITY = exports.SEVERITY || (exports.SEVERITY = {}));
var REACHABILITY;
(function (REACHABILITY) {
    REACHABILITY["FUNCTION"] = "function";
    REACHABILITY["PACKAGE"] = "package";
    REACHABILITY["NOT_REACHABLE"] = "not-reachable";
    REACHABILITY["NO_INFO"] = "no-info";
})(REACHABILITY = exports.REACHABILITY || (exports.REACHABILITY = {}));
function convertTestDepGraphResultToLegacy(res, depGraph, packageManager, severityThreshold) {
    const result = res.result;
    const upgradePathsMap = new Map();
    for (const pkgInfo of _.values(result.affectedPkgs)) {
        for (const pkgIssue of _.values(pkgInfo.issues)) {
            if (pkgIssue.fixInfo && pkgIssue.fixInfo.upgradePaths) {
                for (const upgradePath of pkgIssue.fixInfo.upgradePaths) {
                    const legacyFromPath = pkgPathToLegacyPath(upgradePath.path);
                    const vulnPathString = getVulnPathString(pkgIssue.issueId, legacyFromPath);
                    upgradePathsMap[vulnPathString] = toLegacyUpgradePath(upgradePath.path);
                }
            }
        }
    }
    // generate the legacy vulns array (vuln-data + metada per vulnerable path).
    //   use the upgradePathsMap to find available upgrade-paths
    const vulns = [];
    for (const pkgInfo of _.values(result.affectedPkgs)) {
        for (const vulnPkgPath of depGraph.pkgPathsToRoot(pkgInfo.pkg)) {
            const legacyFromPath = pkgPathToLegacyPath(vulnPkgPath.reverse());
            for (const pkgIssue of _.values(pkgInfo.issues)) {
                const vulnPathString = getVulnPathString(pkgIssue.issueId, legacyFromPath);
                const upgradePath = upgradePathsMap[vulnPathString] || [];
                // TODO: we need the full issue-data for every path only for the --json output,
                //   consider picking only the required fields,
                //   and append the full data only for --json, to minimize chance of out-of-memory
                const annotatedIssue = Object.assign({}, result.issuesData[pkgIssue.issueId], {
                    from: legacyFromPath,
                    upgradePath,
                    isUpgradable: !!upgradePath[0] || !!upgradePath[1],
                    isPatchable: pkgIssue.fixInfo.isPatchable,
                    name: pkgInfo.pkg.name,
                    version: pkgInfo.pkg.version,
                    nearestFixedInVersion: pkgIssue.fixInfo.nearestFixedInVersion,
                }); // TODO(kyegupov): get rid of type assertion
                vulns.push(annotatedIssue);
            }
        }
    }
    const dockerRes = result.docker;
    if (dockerRes && dockerRes.binariesVulns) {
        const binariesVulns = dockerRes.binariesVulns;
        for (const pkgInfo of _.values(binariesVulns.affectedPkgs)) {
            for (const pkgIssue of _.values(pkgInfo.issues)) {
                const pkgAndVersion = (pkgInfo.pkg.name +
                    '@' +
                    pkgInfo.pkg.version);
                const annotatedIssue = Object.assign({}, binariesVulns.issuesData[pkgIssue.issueId], {
                    from: ['Upstream', pkgAndVersion],
                    upgradePath: [],
                    isUpgradable: false,
                    isPatchable: false,
                    name: pkgInfo.pkg.name,
                    version: pkgInfo.pkg.version,
                    nearestFixedInVersion: pkgIssue.fixInfo.nearestFixedInVersion,
                }); // TODO(kyegupov): get rid of forced type assertion
                vulns.push(annotatedIssue);
            }
        }
    }
    const meta = res.meta || {};
    severityThreshold =
        severityThreshold === SEVERITY.LOW ? undefined : severityThreshold;
    const legacyRes = {
        vulnerabilities: vulns,
        ok: vulns.length === 0,
        dependencyCount: depGraph.getPkgs().length - 1,
        org: meta.org,
        policy: meta.policy,
        isPrivate: !meta.isPublic,
        licensesPolicy: meta.licensesPolicy || null,
        packageManager,
        projectId: meta.projectId,
        ignoreSettings: meta.ignoreSettings || null,
        docker: result.docker,
        summary: getSummary(vulns, severityThreshold),
        severityThreshold,
        remediation: result.remediation,
    };
    return legacyRes;
}
exports.convertTestDepGraphResultToLegacy = convertTestDepGraphResultToLegacy;
function getVulnPathString(issueId, vulnPath) {
    return issueId + '|' + JSON.stringify(vulnPath);
}
function pkgPathToLegacyPath(pkgPath) {
    return pkgPath.map(toLegacyPkgId);
}
function toLegacyUpgradePath(upgradePath) {
    return upgradePath
        .filter((item) => !item.isDropped)
        .map((item) => {
        if (!item.newVersion) {
            return false;
        }
        return `${item.name}@${item.newVersion}`;
    });
}
function toLegacyPkgId(pkg) {
    return `${pkg.name}@${pkg.version || '*'}`;
}
function getSummary(vulns, severityThreshold) {
    const count = vulns.length;
    let countText = '' + count;
    const severityFilters = [];
    const severitiesArray = common_1.SEVERITIES.map((s) => s.verboseName);
    if (severityThreshold) {
        severitiesArray
            .slice(severitiesArray.indexOf(severityThreshold))
            .forEach((sev) => {
            severityFilters.push(sev);
        });
    }
    if (!count) {
        if (severityFilters.length) {
            return `No ${severityFilters.join(' or ')} severity vulnerabilities`;
        }
        return 'No known vulnerabilities';
    }
    if (severityFilters.length) {
        countText += ' ' + severityFilters.join(' or ') + ' severity';
    }
    return `${countText} vulnerable dependency ${pl('path', count)}`;
}
function pl(word, count) {
    const ext = {
        y: 'ies',
        default: 's',
    };
    const last = word.split('').pop();
    if (count > 1) {
        return word.slice(0, -1) + (ext[last] || last + ext.default);
    }
    return word;
}
//# sourceMappingURL=legacy.js.map