"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatIssue = exports.printPath = exports.getSeverityValue = exports.formatIssuesWithRemediation = void 0;
const chalk_1 = require("chalk");
const config = require("../../../../lib/config");
const common_1 = require("../../../../lib/snyk-test/common");
const legal_license_instructions_1 = require("./legal-license-instructions");
const format_reachability_1 = require("./format-reachability");
const constants_1 = require("../../constants");
// How many reachable paths to show in the output
const MAX_REACHABLE_PATHS = 2;
function formatIssuesWithRemediation(vulns, remediationInfo, options) {
    var _a;
    const basicVulnInfo = {};
    const basicLicenseInfo = {};
    for (const vuln of vulns) {
        const allReachablePaths = { pathCount: 0, paths: [] };
        for (const issue of vuln.list) {
            const issueReachablePaths = ((_a = issue.reachablePaths) === null || _a === void 0 ? void 0 : _a.paths) || [];
            for (const functionReachablePaths of issueReachablePaths) {
                allReachablePaths.paths = allReachablePaths.paths.concat(functionReachablePaths.callPaths);
                allReachablePaths.pathCount += functionReachablePaths.callPaths.length;
            }
        }
        const vulnData = {
            title: vuln.title,
            severity: vuln.severity,
            originalSeverity: vuln.originalSeverity,
            isNew: vuln.isNew,
            name: vuln.name,
            type: vuln.metadata.type,
            version: vuln.version,
            fixedIn: vuln.fixedIn,
            note: vuln.note,
            legalInstructions: vuln.legalInstructionsArray,
            paths: vuln.list.map((v) => v.from),
            reachability: vuln.reachability,
            sampleReachablePaths: allReachablePaths,
        };
        if (vulnData.type === 'license') {
            basicLicenseInfo[vuln.metadata.id] = vulnData;
        }
        else {
            basicVulnInfo[vuln.metadata.id] = vulnData;
        }
    }
    const results = [''];
    let upgradeTextArray;
    if (remediationInfo.pin && Object.keys(remediationInfo.pin).length) {
        const upgradesByAffected = {};
        for (const topLevelPkg of Object.keys(remediationInfo.upgrade)) {
            for (const targetPkgStr of remediationInfo.upgrade[topLevelPkg]
                .upgrades) {
                if (!upgradesByAffected[targetPkgStr]) {
                    upgradesByAffected[targetPkgStr] = [];
                }
                upgradesByAffected[targetPkgStr].push({
                    name: topLevelPkg,
                    version: remediationInfo.upgrade[topLevelPkg].upgradeTo,
                });
            }
        }
        upgradeTextArray = constructPinText(remediationInfo.pin, upgradesByAffected, basicVulnInfo, options);
        const allVulnIds = new Set();
        Object.keys(remediationInfo.pin).forEach((name) => remediationInfo.pin[name].vulns.forEach((vid) => allVulnIds.add(vid)));
        remediationInfo.unresolved = remediationInfo.unresolved.filter((issue) => !allVulnIds.has(issue.id));
    }
    else {
        upgradeTextArray = constructUpgradesText(remediationInfo.upgrade, basicVulnInfo, options);
    }
    if (upgradeTextArray.length > 0) {
        results.push(upgradeTextArray.join('\n'));
    }
    const patchedTextArray = constructPatchesText(remediationInfo.patch, basicVulnInfo, options);
    if (patchedTextArray.length > 0) {
        results.push(patchedTextArray.join('\n'));
    }
    const unfixableIssuesTextArray = constructUnfixableText(remediationInfo.unresolved, basicVulnInfo, options);
    if (unfixableIssuesTextArray.length > 0) {
        results.push(unfixableIssuesTextArray.join('\n'));
    }
    const licenseIssuesTextArray = constructLicenseText(basicLicenseInfo, options);
    if (licenseIssuesTextArray.length > 0) {
        results.push(licenseIssuesTextArray.join('\n'));
    }
    return results;
}
exports.formatIssuesWithRemediation = formatIssuesWithRemediation;
function getSeverityValue(severity) {
    return common_1.SEVERITIES.find((s) => s.verboseName === severity).value;
}
exports.getSeverityValue = getSeverityValue;
function constructLicenseText(basicLicenseInfo, testOptions) {
    if (!(Object.keys(basicLicenseInfo).length > 0)) {
        return [];
    }
    const licenseTextArray = [chalk_1.default.bold.green('\nLicense issues:')];
    for (const id of Object.keys(basicLicenseInfo)) {
        const licenseText = formatIssue(id, basicLicenseInfo[id].title, basicLicenseInfo[id].severity, basicLicenseInfo[id].isNew, `${basicLicenseInfo[id].name}@${basicLicenseInfo[id].version}`, basicLicenseInfo[id].paths, testOptions, basicLicenseInfo[id].note, undefined, // We can never override license rules, so no originalSeverity here
        basicLicenseInfo[id].legalInstructions);
        licenseTextArray.push('\n' + licenseText);
    }
    return licenseTextArray;
}
function constructPatchesText(patches, basicVulnInfo, testOptions) {
    if (!(Object.keys(patches).length > 0)) {
        return [];
    }
    const patchedTextArray = [chalk_1.default.bold.green('\nPatchable issues:')];
    for (const id of Object.keys(patches)) {
        if (!basicVulnInfo[id]) {
            continue;
        }
        if (basicVulnInfo[id].type === 'license') {
            continue;
        }
        // todo: add vulnToPatch package name
        const packageAtVersion = `${basicVulnInfo[id].name}@${basicVulnInfo[id].version}`;
        const patchedText = `\n  Patch available for ${chalk_1.default.bold.whiteBright(packageAtVersion)}\n`;
        const thisPatchFixes = formatIssue(id, basicVulnInfo[id].title, basicVulnInfo[id].severity, basicVulnInfo[id].isNew, `${basicVulnInfo[id].name}@${basicVulnInfo[id].version}`, basicVulnInfo[id].paths, testOptions, basicVulnInfo[id].note, basicVulnInfo[id].originalSeverity);
        patchedTextArray.push(patchedText + thisPatchFixes);
    }
    return patchedTextArray;
}
function thisUpgradeFixes(vulnIds, basicVulnInfo, testOptions) {
    return vulnIds
        .filter((id) => basicVulnInfo[id]) // basicVulnInfo only contains issues with the specified severity levels
        .sort((a, b) => getSeverityValue(basicVulnInfo[a].severity) -
        getSeverityValue(basicVulnInfo[b].severity))
        .filter((id) => basicVulnInfo[id].type !== 'license')
        .map((id) => formatIssue(id, basicVulnInfo[id].title, basicVulnInfo[id].severity, basicVulnInfo[id].isNew, `${basicVulnInfo[id].name}@${basicVulnInfo[id].version}`, basicVulnInfo[id].paths, testOptions, basicVulnInfo[id].note, basicVulnInfo[id].originalSeverity, [], basicVulnInfo[id].reachability, basicVulnInfo[id].sampleReachablePaths))
        .join('\n');
}
function processUpgrades(sink, upgradesByDep, deps, basicVulnInfo, testOptions) {
    for (const dep of deps) {
        const data = upgradesByDep[dep];
        const upgradeDepTo = data.upgradeTo;
        const vulnIds = data.vulns || data.vulns;
        const upgradeText = `\n  Upgrade ${chalk_1.default.bold.whiteBright(dep)} to ${chalk_1.default.bold.whiteBright(upgradeDepTo)} to fix\n`;
        sink.push(upgradeText + thisUpgradeFixes(vulnIds, basicVulnInfo, testOptions));
    }
}
function constructUpgradesText(upgrades, basicVulnInfo, testOptions) {
    if (!(Object.keys(upgrades).length > 0)) {
        return [];
    }
    const upgradeTextArray = [chalk_1.default.bold.green('\nIssues to fix by upgrading:')];
    processUpgrades(upgradeTextArray, upgrades, Object.keys(upgrades), basicVulnInfo, testOptions);
    return upgradeTextArray;
}
function constructPinText(pins, upgradesByAffected, // classical "remediation via top-level dep" upgrades
basicVulnInfo, testOptions) {
    if (!Object.keys(pins).length) {
        return [];
    }
    const upgradeTextArray = [];
    upgradeTextArray.push(chalk_1.default.bold.green('\nIssues to fix by upgrading dependencies:'));
    // First, direct upgrades
    const upgradeables = Object.keys(pins).filter((name) => !pins[name].isTransitive);
    if (upgradeables.length) {
        processUpgrades(upgradeTextArray, pins, upgradeables, basicVulnInfo, testOptions);
    }
    // Second, pins
    const pinables = Object.keys(pins).filter((name) => pins[name].isTransitive);
    if (pinables.length) {
        for (const pkgName of pinables) {
            const data = pins[pkgName];
            const vulnIds = data.vulns;
            const upgradeDepTo = data.upgradeTo;
            const upgradeText = `\n  Pin ${chalk_1.default.bold.whiteBright(pkgName)} to ${chalk_1.default.bold.whiteBright(upgradeDepTo)} to fix`;
            upgradeTextArray.push(upgradeText);
            upgradeTextArray.push(thisUpgradeFixes(vulnIds, basicVulnInfo, testOptions));
            // Finally, if we have some upgrade paths that fix the same issues, suggest them as well.
            const topLevelUpgradesAlreadySuggested = new Set();
            for (const vid of vulnIds) {
                for (const topLevelPkg of upgradesByAffected[pkgName + '@' + basicVulnInfo[vid].version] || []) {
                    const setKey = `${topLevelPkg.name}\n${topLevelPkg.version}`;
                    if (!topLevelUpgradesAlreadySuggested.has(setKey)) {
                        topLevelUpgradesAlreadySuggested.add(setKey);
                        upgradeTextArray.push('  The issues above can also be fixed by upgrading top-level dependency ' +
                            `${topLevelPkg.name} to ${topLevelPkg.version}`);
                    }
                }
            }
        }
    }
    return upgradeTextArray;
}
function constructUnfixableText(unresolved, basicVulnInfo, testOptions) {
    if (!(unresolved.length > 0)) {
        return [];
    }
    const unfixableIssuesTextArray = [
        chalk_1.default.bold.white('\nIssues with no direct upgrade or patch:'),
    ];
    for (const issue of unresolved) {
        const issueInfo = basicVulnInfo[issue.id];
        if (!issueInfo) {
            // basicVulnInfo only contains issues with the specified severity levels
            continue;
        }
        const extraInfo = issue.fixedIn && issue.fixedIn.length
            ? `\n  This issue was fixed in versions: ${chalk_1.default.bold(issue.fixedIn.join(', '))}`
            : '\n  No upgrade or patch available';
        unfixableIssuesTextArray.push(formatIssue(issue.id, issue.title, issue.severity, issue.isNew, `${issue.packageName}@${issue.version}`, issueInfo.paths, testOptions, issueInfo.note, issueInfo.originalSeverity, [], issue.reachability) + `${extraInfo}`);
    }
    if (unfixableIssuesTextArray.length === 1) {
        // seems we still only have
        // the initial section title, so nothing to return
        return [];
    }
    return unfixableIssuesTextArray;
}
function printPath(path) {
    return path.slice(1).join(constants_1.PATH_SEPARATOR);
}
exports.printPath = printPath;
function formatIssue(id, title, severity, isNew, vulnerableModule, paths, testOptions, note, originalSeverity, legalInstructions, reachability, sampleReachablePaths) {
    const severitiesColourMapping = {
        low: {
            colorFunc(text) {
                return chalk_1.default.blueBright(text);
            },
        },
        medium: {
            colorFunc(text) {
                return chalk_1.default.yellowBright(text);
            },
        },
        high: {
            colorFunc(text) {
                return chalk_1.default.redBright(text);
            },
        },
    };
    const newBadge = isNew ? ' (new)' : '';
    const name = vulnerableModule ? ` in ${chalk_1.default.bold(vulnerableModule)}` : '';
    let legalLicenseInstructionsText;
    if (legalInstructions) {
        legalLicenseInstructionsText = legal_license_instructions_1.formatLegalInstructions(legalInstructions);
    }
    let reachabilityText = '';
    if (reachability) {
        reachabilityText = format_reachability_1.formatReachability(reachability);
    }
    let introducedBy = '';
    if (testOptions.showVulnPaths === 'some' &&
        paths &&
        paths.find((p) => p.length > 2)) {
        // In this mode, we show only one path by default, for compactness
        const pathStr = printPath(paths[0]);
        introducedBy =
            paths.length === 1
                ? `\n    introduced by ${pathStr}`
                : `\n    introduced by ${pathStr} and ${chalk_1.default.cyanBright('' + (paths.length - 1))} other path(s)`;
    }
    else if (testOptions.showVulnPaths === 'all' && paths) {
        introducedBy =
            '\n    introduced by:' +
                paths
                    .slice(0, 1000)
                    .map((p) => '\n    ' + printPath(p))
                    .join('');
        if (paths.length > 1000) {
            introducedBy += `\n    and ${chalk_1.default.cyanBright('' + (paths.length - 1))} other path(s)`;
        }
    }
    const reachableVia = format_reachability_1.formatReachablePaths(sampleReachablePaths, MAX_REACHABLE_PATHS, reachablePathsTemplate);
    let originalSeverityStr = '';
    if (originalSeverity && originalSeverity !== severity) {
        originalSeverityStr = ` (originally ${titleCaseText(originalSeverity)})`;
    }
    return (severitiesColourMapping[severity].colorFunc(`  ✗ ${chalk_1.default.bold(title)}${newBadge} [${titleCaseText(severity)} Severity${originalSeverityStr}]`) +
        reachabilityText +
        `[${config.ROOT}/vuln/${id}]` +
        name +
        reachableVia +
        introducedBy +
        (legalLicenseInstructionsText
            ? `${chalk_1.default.bold('\n    Legal instructions')}:\n    ${legalLicenseInstructionsText}`
            : '') +
        (note ? `${chalk_1.default.bold('\n    Note')}:\n    ${note}` : ''));
}
exports.formatIssue = formatIssue;
function titleCaseText(text) {
    return text[0].toUpperCase() + text.slice(1);
}
function reachablePathsTemplate(samplePaths, extraPathsCount) {
    if (samplePaths.length === 0 && extraPathsCount === 0) {
        return '';
    }
    if (samplePaths.length === 0) {
        return `\n    reachable via at least ${extraPathsCount} paths`;
    }
    let reachableVia = '\n    reachable via:\n';
    for (const p of samplePaths) {
        reachableVia += `    ${p}\n`;
    }
    if (extraPathsCount > 0) {
        reachableVia += `    and at least ${chalk_1.default.cyanBright('' + extraPathsCount)} other path(s)`;
    }
    return reachableVia;
}
//# sourceMappingURL=remediation-based-format-issues.js.map