"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.display = void 0;
const chalk = require("chalk");
const dep_graph_1 = require("@snyk/dep-graph");
const debug_1 = require("debug");
const debug = debug_1.default('snyk-cpp-plugin');
function displayFingerprints(scanResults) {
    const result = [];
    for (const { artifacts = [] } of scanResults) {
        for (const { data = [] } of artifacts) {
            for (const { filePath, hash } of data) {
                if (filePath && hash) {
                    if (!result.length) {
                        result.push(chalk.whiteBright('Fingerprints'));
                    }
                    result.push(`${hash} ${filePath}`);
                }
            }
        }
    }
    if (result.length) {
        result.push('');
    }
    return result;
}
function displayDependencies(depGraph) {
    var _a;
    const result = [];
    const depCount = ((_a = depGraph === null || depGraph === void 0 ? void 0 : depGraph.getDepPkgs()) === null || _a === void 0 ? void 0 : _a.length) || 0;
    if (depCount > 0) {
        result.push(chalk.whiteBright('Dependencies'));
    }
    for (const pkg of (depGraph === null || depGraph === void 0 ? void 0 : depGraph.getDepPkgs()) || []) {
        result.push(`${pkg.name}@${pkg.version}`);
    }
    if (result.length) {
        result.push('');
    }
    return result;
}
function displayIssues(depGraph, issues, issuesData) {
    var _a;
    const result = [];
    const pkgCount = ((_a = depGraph === null || depGraph === void 0 ? void 0 : depGraph.getDepPkgs()) === null || _a === void 0 ? void 0 : _a.length) || 0;
    const depCount = pkgCount == 1 ? '1 dependency' : `${pkgCount} dependencies`;
    const issuesCount = issues.length == 1 ? '1 issue' : `${issues.length} issues`;
    result.push(chalk.whiteBright('Issues'));
    for (const { pkgName, pkgVersion, issueId, fixInfo } of issues) {
        const { title, severity } = issuesData[issueId];
        const fix = fixInfo.nearestFixedInVersion
            ? `fix version ${fixInfo.nearestFixedInVersion}`
            : 'no fix available';
        let color;
        switch (severity) {
            case 'low':
                color = chalk.blueBright;
                break;
            case 'medium':
                color = chalk.yellowBright;
                break;
            case 'high':
                color = chalk.redBright;
                break;
            default:
                color = chalk.whiteBright;
                break;
        }
        const issueUrl = `https://snyk.io/vuln/${issueId}`;
        const issueText = color(`✗ ${title} [${severity}]`);
        result.push(issueText);
        result.push(`  ${issueUrl}`);
        result.push(`  in ${pkgName}@${pkgVersion}`);
        result.push(`  ${fix}`);
    }
    if (issues.length) {
        result.push('');
    }
    const issuesFound = issues.length > 0
        ? chalk.redBright(issuesCount)
        : chalk.greenBright(issuesCount);
    result.push(`Tested ${depCount} for known issues, found ${issuesFound}.\n`);
    return result;
}
function displayErrors(errors) {
    const result = [];
    if (errors.length) {
        result.push(chalk.redBright('Errors'));
    }
    for (const error of errors) {
        result.push(error);
    }
    if (result.length) {
        result.push('');
    }
    return result;
}
async function display(scanResults, testResults, errors, options) {
    try {
        const result = [];
        if (options === null || options === void 0 ? void 0 : options.debug) {
            const fingerprintLines = displayFingerprints(scanResults);
            result.push(...fingerprintLines);
        }
        for (const testResult of testResults) {
            const depGraph = dep_graph_1.createFromJSON(testResult.depGraphData);
            const dependencyLines = displayDependencies(depGraph);
            result.push(...dependencyLines);
            const issueLines = displayIssues(depGraph, testResult.issues, testResult.issuesData);
            result.push(...issueLines);
        }
        const errorLines = displayErrors(errors);
        result.push(...errorLines);
        return result.join('\n');
    }
    catch (error) {
        debug(error.message || 'Error displaying results. ' + error);
        return 'Error displaying results.';
    }
}
exports.display = display;
//# sourceMappingURL=display.js.map