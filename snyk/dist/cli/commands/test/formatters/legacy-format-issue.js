"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleCaseText = exports.formatIssues = void 0;
const _ = require("lodash");
const chalk_1 = require("chalk");
const config = require("../../../../lib/config");
const detect_1 = require("../../../../lib/detect");
const snyk_module_1 = require("snyk-module");
const package_managers_1 = require("../../../../lib/package-managers");
const legal_license_instructions_1 = require("./legal-license-instructions");
const format_reachability_1 = require("./format-reachability");
const constants_1 = require("../../constants");
function formatIssues(vuln, options) {
    const vulnID = vuln.list[0].id;
    const packageManager = options.packageManager;
    const localPackageTest = detect_1.isLocalFolder(options.path);
    const uniquePackages = _.uniq(vuln.list.map((i) => {
        if (i.from[1]) {
            return i.from && i.from[1];
        }
        return i.from;
    })).join(', ');
    const vulnOutput = {
        issueHeading: createSeverityBasedIssueHeading({
            severity: vuln.metadata.severity,
            originalSeverity: vuln.originalSeverity,
            type: vuln.metadata.type,
            packageName: vuln.metadata.name,
            isNew: false,
        }),
        introducedThrough: '  Introduced through: ' + uniquePackages,
        description: '  Description: ' + vuln.title,
        info: '  Info: ' + chalk_1.default.underline(config.ROOT + '/vuln/' + vulnID),
        fromPaths: createTruncatedVulnsPathsText(vuln.list, options.showVulnPaths),
        extraInfo: vuln.note ? chalk_1.default.bold('\n  Note: ' + vuln.note) : '',
        remediationInfo: vuln.metadata.type !== 'license' && localPackageTest
            ? createRemediationText(vuln, packageManager)
            : '',
        fixedIn: options.docker ? createFixedInText(vuln) : '',
        dockerfilePackage: options.docker ? dockerfileInstructionText(vuln) : '',
        legalInstructions: vuln.legalInstructionsArray
            ? chalk_1.default.bold('\n  Legal instructions:\n') +
                ' '.repeat(2) +
                legal_license_instructions_1.formatLegalInstructions(vuln.legalInstructionsArray, 2)
            : '',
        reachability: vuln.reachability ? createReachabilityInText(vuln) : '',
    };
    return (`${vulnOutput.issueHeading}\n` +
        `${vulnOutput.description}\n` +
        `${vulnOutput.info}\n` +
        `${vulnOutput.introducedThrough}\n` +
        vulnOutput.fromPaths +
        // Optional - not always there
        vulnOutput.reachability +
        vulnOutput.remediationInfo +
        vulnOutput.dockerfilePackage +
        vulnOutput.fixedIn +
        vulnOutput.extraInfo +
        vulnOutput.legalInstructions);
}
exports.formatIssues = formatIssues;
function createSeverityBasedIssueHeading({ severity, originalSeverity, type, packageName, isNew, }) {
    // Example: ✗ Medium severity vulnerability found in xmldom
    const vulnTypeText = type === 'license' ? 'issue' : 'vulnerability';
    const severitiesColourMapping = {
        low: {
            colorFunc(text) {
                return chalk_1.default.bold.blue(text);
            },
        },
        medium: {
            colorFunc(text) {
                return chalk_1.default.bold.yellow(text);
            },
        },
        high: {
            colorFunc(text) {
                return chalk_1.default.bold.red(text);
            },
        },
    };
    let originalSeverityStr = '';
    if (originalSeverity && originalSeverity !== severity) {
        originalSeverityStr = ` (originally ${titleCaseText(originalSeverity)})`;
    }
    return (severitiesColourMapping[severity].colorFunc('✗ ' +
        titleCaseText(severity) +
        ` severity${originalSeverityStr} ` +
        vulnTypeText +
        ' found in ' +
        chalk_1.default.underline(packageName)) + chalk_1.default.bold.magenta(isNew ? ' (new)' : ''));
}
function titleCaseText(text) {
    return text[0].toUpperCase() + text.slice(1);
}
exports.titleCaseText = titleCaseText;
function dockerfileInstructionText(vuln) {
    if (vuln.dockerfileInstruction) {
        return `\n  Introduced in your Dockerfile by '${vuln.dockerfileInstruction}'`;
    }
    if (vuln.dockerBaseImage) {
        return `\n  Introduced by your base image (${vuln.dockerBaseImage})`;
    }
    return '';
}
function createTruncatedVulnsPathsText(vulnList, show) {
    if (show === 'none') {
        return '';
    }
    const numberOfPathsToDisplay = show === 'all' ? 1000 : 3;
    const fromPathsArray = vulnList.map((i) => i.from);
    const formatedFromPathsArray = fromPathsArray.map((i) => {
        const fromWithoutBaseProject = i.slice(1);
        // If more than one From path
        if (fromWithoutBaseProject.length) {
            return i.slice(1).join(constants_1.PATH_SEPARATOR);
        }
        // Else issue is in the core package
        return i;
    });
    const notShownPathsNumber = fromPathsArray.length - numberOfPathsToDisplay;
    const shouldTruncatePaths = fromPathsArray.length > numberOfPathsToDisplay;
    const truncatedText = `\n  and ${notShownPathsNumber} more...`;
    const formattedPathsText = formatedFromPathsArray
        .slice(0, numberOfPathsToDisplay)
        .join('\n  From: ');
    if (fromPathsArray.length > 0) {
        return ('  From: ' +
            formattedPathsText +
            (shouldTruncatePaths ? truncatedText : ''));
    }
}
function createFixedInText(vuln) {
    if (vuln.nearestFixedInVersion) {
        return chalk_1.default.bold('\n  Fixed in: ' + vuln.nearestFixedInVersion);
    }
    else if (vuln.fixedIn && vuln.fixedIn.length > 0) {
        return chalk_1.default.bold('\n  Fixed in: ' + vuln.fixedIn.join(', '));
    }
    return '';
}
function createReachabilityInText(vuln) {
    if (!vuln.reachability) {
        return '';
    }
    const reachabilityText = format_reachability_1.getReachabilityText(vuln.reachability);
    if (!reachabilityText) {
        return '';
    }
    return `\n  Reachability: ${reachabilityText}`;
}
function createRemediationText(vuln, packageManager) {
    let wizardHintText = '';
    if (package_managers_1.WIZARD_SUPPORTED_PACKAGE_MANAGERS.includes(packageManager)) {
        wizardHintText = 'Run `snyk wizard` to explore remediation options.';
    }
    if (vuln.fixedIn &&
        package_managers_1.PINNING_SUPPORTED_PACKAGE_MANAGERS.includes(packageManager)) {
        const toVersion = vuln.fixedIn.join(' or ');
        const transitive = vuln.list.every((i) => i.from.length > 2);
        const fromVersionArray = vuln.list.map((v) => v.from[1]);
        const fromVersion = fromVersionArray[0];
        if (transitive) {
            return chalk_1.default.bold(`\n  Remediation:\n    Pin the transitive dependency ${vuln.name} to version ${toVersion}`);
        }
        else {
            return chalk_1.default.bold(`\n  Remediation:\n    Upgrade direct dependency ${fromVersion} to ${vuln.name}@${toVersion}`);
        }
    }
    if (vuln.isFixable === true) {
        const upgradePathsArray = _.uniq(vuln.list.map((v) => {
            const shouldUpgradeItself = !!v.upgradePath[0];
            const shouldUpgradeDirectDep = !!v.upgradePath[1];
            if (shouldUpgradeItself) {
                // If we are testing a library/package like express
                // Then we can suggest they get the latest version
                // Example command: snyk test express@3
                const selfUpgradeInfo = v.upgradePath.length > 0
                    ? ` (triggers upgrades to ${v.upgradePath.join(constants_1.PATH_SEPARATOR)})`
                    : '';
                const testedPackageName = snyk_module_1.parsePackageString(v.upgradePath[0]);
                return (`You've tested an outdated version of ${testedPackageName[0]}.` +
                    +` Upgrade to ${v.upgradePath[0]}${selfUpgradeInfo}`);
            }
            if (shouldUpgradeDirectDep) {
                const formattedUpgradePath = v.upgradePath
                    .slice(1)
                    .join(constants_1.PATH_SEPARATOR);
                const upgradeTextInfo = v.upgradePath.length
                    ? ` (triggers upgrades to ${formattedUpgradePath})`
                    : '';
                return `Upgrade direct dependency ${v.from[1]} to ${v.upgradePath[1]}${upgradeTextInfo}`;
            }
            return ('Some paths have no direct dependency upgrade that' +
                ` can address this issue. ${wizardHintText}`);
        }));
        return chalk_1.default.bold(`\n  Remediation:\n    ${upgradePathsArray.join('\n    ')}`);
    }
    if (vuln.fixedIn && vuln.fixedIn.length > 0) {
        return createFixedInText(vuln);
    }
    return '';
}
//# sourceMappingURL=legacy-format-issue.js.map