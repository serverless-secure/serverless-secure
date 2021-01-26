"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResults = exports.getTool = exports.createSarifOutputForContainers = void 0;
function createSarifOutputForContainers(testResult) {
    const sarifRes = {
        version: '2.1.0',
        runs: [],
    };
    testResult.forEach((testResult) => {
        sarifRes.runs.push({
            tool: getTool(testResult),
            results: getResults(testResult),
        });
    });
    return sarifRes;
}
exports.createSarifOutputForContainers = createSarifOutputForContainers;
function getTool(testResult) {
    const tool = {
        driver: {
            name: 'Snyk Container',
            rules: [],
        },
    };
    if (!testResult.vulnerabilities) {
        return tool;
    }
    const pushedIds = {};
    tool.driver.rules = testResult.vulnerabilities
        .map((vuln) => {
        if (pushedIds[vuln.id]) {
            return;
        }
        const level = vuln.severity === 'high' ? 'error' : 'warning';
        const cve = vuln['identifiers']['CVE'][0];
        pushedIds[vuln.id] = true;
        return {
            id: vuln.id,
            shortDescription: {
                text: `${vuln.severity} severity ${vuln.title} vulnerability in ${vuln.packageName}`,
            },
            fullDescription: {
                text: cve
                    ? `(${cve}) ${vuln.name}@${vuln.version}`
                    : `${vuln.name}@${vuln.version}`,
            },
            help: {
                text: '',
                markdown: vuln.description,
            },
            defaultConfiguration: {
                level: level,
            },
            properties: {
                tags: ['security', ...vuln.identifiers.CWE],
            },
        };
    })
        .filter(Boolean);
    return tool;
}
exports.getTool = getTool;
function getResults(testResult) {
    const results = [];
    if (!testResult.vulnerabilities) {
        return results;
    }
    testResult.vulnerabilities.forEach((vuln) => {
        results.push({
            ruleId: vuln.id,
            message: {
                text: `This file introduces a vulnerable ${vuln.packageName} package with a ${vuln.severity} severity vulnerability.`,
            },
            locations: [
                {
                    physicalLocation: {
                        artifactLocation: {
                            uri: testResult.displayTargetFile,
                        },
                        region: {
                            startLine: vuln.lineNumber || 1,
                        },
                    },
                },
            ],
        });
    });
    return results;
}
exports.getResults = getResults;
//# sourceMappingURL=sarif-output.js.map