"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTest = void 0;
const fs = require("fs");
const _ = require("lodash");
const path = require("path");
const debugModule = require("debug");
const chalk_1 = require("chalk");
const pathUtil = require("path");
const snyk_module_1 = require("snyk-module");
const depGraphLib = require("@snyk/dep-graph");
const legacy_1 = require("./legacy");
const errors_1 = require("../errors");
const snyk = require("../");
const is_ci_1 = require("../is-ci");
const common = require("./common");
const config = require("../config");
const analytics = require("../analytics");
const print_deps_1 = require("../print-deps");
const projectMetadata = require("../project-metadata");
const prune_1 = require("../prune");
const get_deps_from_plugin_1 = require("../plugins/get-deps-from-plugin");
const request = require("../request");
const spinner = require("../spinner");
const extract_package_manager_1 = require("../plugins/extract-package-manager");
const get_extra_project_count_1 = require("../plugins/get-extra-project-count");
const reachable_vulns_1 = require("../reachable-vulns");
const options_validator_1 = require("../options-validator");
const policy_1 = require("../policy");
const run_iac_test_1 = require("./run-iac-test");
const alerts = require("../alerts");
const error_format_1 = require("../error-format");
const api_token_1 = require("../api-token");
const debug = debugModule('snyk:run-test');
const ANALYTICS_PAYLOAD_MAX_LENGTH = 1024;
async function sendAndParseResults(payloads, spinnerLbl, root, options) {
    const results = [];
    for (const payload of payloads) {
        await spinner.clear(spinnerLbl)();
        await spinner(spinnerLbl);
        if (options.iac) {
            const iacScan = payload.body;
            analytics.add('iac type', !!iacScan.type);
            const res = (await sendTestPayload(payload));
            const projectName = iacScan.projectNameOverride || iacScan.originalProjectName;
            const result = await run_iac_test_1.parseIacTestResult(res, iacScan.targetFile, projectName, options.severityThreshold);
            results.push(result);
        }
        else {
            const payloadBody = payload.body;
            const payloadPolicy = payloadBody && payloadBody.policy;
            const depGraph = payloadBody && payloadBody.depGraph;
            const pkgManager = depGraph &&
                depGraph.pkgManager &&
                depGraph.pkgManager.name;
            const targetFile = payloadBody && payloadBody.targetFile;
            const projectName = _.get(payload, 'body.projectNameOverride') ||
                _.get(payload, 'body.originalProjectName');
            const foundProjectCount = _.get(payload, 'body.foundProjectCount');
            const displayTargetFile = _.get(payload, 'body.displayTargetFile');
            let dockerfilePackages;
            if (payloadBody &&
                payloadBody.docker &&
                payloadBody.docker.dockerfilePackages) {
                dockerfilePackages = payloadBody.docker.dockerfilePackages;
            }
            analytics.add('depGraph', !!depGraph);
            analytics.add('isDocker', !!(payloadBody && payloadBody.docker));
            // Type assertion might be a lie, but we are correcting that below
            const res = (await sendTestPayload(payload));
            const result = await parseRes(depGraph, pkgManager, res, options, payload, payloadPolicy, root, dockerfilePackages);
            results.push(Object.assign(Object.assign({}, result), { targetFile,
                projectName,
                foundProjectCount,
                displayTargetFile }));
        }
    }
    return results;
}
async function runTest(projectType, root, options) {
    const spinnerLbl = 'Querying vulnerabilities database...';
    try {
        await options_validator_1.validateOptions(options, options.packageManager);
        const payloads = await assemblePayloads(root, options);
        return await sendAndParseResults(payloads, spinnerLbl, root, options);
    }
    catch (error) {
        debug('Error running test', { error });
        // handling denial from registry because of the feature flag
        // currently done for go.mod
        const isFeatureNotAllowed = error.code === 403 && error.message.includes('Feature not allowed');
        const hasFailedToGetVulnerabilities = error.code === 404 &&
            error.name.includes('FailedToGetVulnerabilitiesError');
        if (isFeatureNotAllowed) {
            throw errors_1.NoSupportedManifestsFoundError([root]);
        }
        if (hasFailedToGetVulnerabilities) {
            throw errors_1.FailedToGetVulnsFromUnavailableResource(root, error.code);
        }
        throw new errors_1.FailedToRunTestError(error.userMessage ||
            error.message ||
            `Failed to test ${projectType} project`, error.code);
    }
    finally {
        spinner.clear(spinnerLbl)();
    }
}
exports.runTest = runTest;
async function parseRes(depGraph, pkgManager, res, options, payload, payloadPolicy, root, dockerfilePackages) {
    // TODO: docker doesn't have a package manager
    // so this flow will not be applicable
    // refactor to separate
    if (depGraph && pkgManager) {
        res = legacy_1.convertTestDepGraphResultToLegacy(res, // Double "as" required by Typescript for dodgy assertions
        depGraph, pkgManager, options.severityThreshold);
        // For Node.js: inject additional information (for remediation etc.) into the response.
        if (payload.modules) {
            res.dependencyCount =
                payload.modules.numDependencies || depGraph.getPkgs().length - 1;
            if (res.vulnerabilities) {
                res.vulnerabilities.forEach((vuln) => {
                    if (payload.modules && payload.modules.pluck) {
                        const plucked = payload.modules.pluck(vuln.from, vuln.name, vuln.version);
                        vuln.__filename = plucked.__filename;
                        vuln.shrinkwrap = plucked.shrinkwrap;
                        vuln.bundled = plucked.bundled;
                        // this is an edgecase when we're testing the directly vuln pkg
                        if (vuln.from.length === 1) {
                            return;
                        }
                        const parentPkg = snyk_module_1.parsePackageString(vuln.from[1]);
                        const parent = payload.modules.pluck(vuln.from.slice(0, 2), parentPkg.name, parentPkg.version);
                        vuln.parentDepType = parent.depType;
                    }
                });
            }
        }
    }
    // TODO: is this needed? we filter on the other side already based on policy
    // this will move to be filtered server side soon & it will support `'ignore-policy'`
    analytics.add('vulns-pre-policy', res.vulnerabilities.length);
    res.filesystemPolicy = !!payloadPolicy;
    if (!options['ignore-policy']) {
        res.policy = res.policy || payloadPolicy;
        const policy = await snyk.policy.loadFromText(res.policy);
        res = policy.filter(res, root);
    }
    analytics.add('vulns', res.vulnerabilities.length);
    if (res.docker && dockerfilePackages) {
        res.vulnerabilities = res.vulnerabilities.map((vuln) => {
            const dockerfilePackage = dockerfilePackages[vuln.name.split('/')[0]];
            if (dockerfilePackage) {
                vuln.dockerfileInstruction =
                    dockerfilePackage.instruction;
            }
            vuln.dockerBaseImage = res.docker.baseImage;
            return vuln;
        });
    }
    if (options.docker && options.file && options['exclude-base-image-vulns']) {
        res.vulnerabilities = res.vulnerabilities.filter((vuln) => vuln.dockerfileInstruction);
    }
    res.uniqueCount = countUniqueVulns(res.vulnerabilities);
    return res;
}
function sendTestPayload(payload) {
    const filesystemPolicy = payload.body && !!payload.body.policy;
    return new Promise((resolve, reject) => {
        request(payload, (error, res, body) => {
            if (error) {
                return reject(error);
            }
            if (res.statusCode !== 200) {
                const err = handleTestHttpErrorResponse(res, body);
                return reject(err);
            }
            body.filesystemPolicy = filesystemPolicy;
            resolve(body);
        });
    });
}
function handleTestHttpErrorResponse(res, body) {
    const { statusCode } = res;
    let err;
    const userMessage = body && body.userMessage;
    switch (statusCode) {
        case 401:
        case 403:
            err = errors_1.AuthFailedError(userMessage, statusCode);
            err.innerError = body.stack;
            break;
        case 405:
            err = new errors_1.UnsupportedFeatureFlagError('reachableVulns');
            err.innerError = body.stack;
            break;
        case 500:
            err = new errors_1.InternalServerError(userMessage);
            err.innerError = body.stack;
            break;
        default:
            err = new errors_1.FailedToGetVulnerabilitiesError(userMessage, statusCode);
            err.innerError = body.error;
    }
    return err;
}
function assemblePayloads(root, options) {
    let isLocal;
    if (options.docker) {
        isLocal = true;
    }
    else {
        // TODO: Refactor this check so we don't require files when tests are using mocks
        isLocal = fs.existsSync(root);
    }
    analytics.add('local', isLocal);
    if (isLocal) {
        return assembleLocalPayloads(root, options);
    }
    return assembleRemotePayloads(root, options);
}
// Payload to send to the Registry for scanning a package from the local filesystem.
async function assembleLocalPayloads(root, options) {
    var _a, _b;
    // For --all-projects packageManager is yet undefined here. Use 'all'
    let analysisTypeText = 'all dependencies for ';
    if (options.docker) {
        analysisTypeText = 'docker dependencies for ';
    }
    else if (options.iac) {
        analysisTypeText = 'Infrastructure as code configurations for ';
    }
    else if (options.packageManager) {
        analysisTypeText = options.packageManager + ' dependencies for ';
    }
    const spinnerLbl = 'Analyzing ' +
        analysisTypeText +
        (path.relative('.', path.join(root, options.file || '')) ||
            path.relative('..', '.') + ' project dir');
    try {
        const payloads = [];
        await spinner.clear(spinnerLbl)();
        await spinner(spinnerLbl);
        if (options.iac) {
            return run_iac_test_1.assembleIacLocalPayloads(root, options);
        }
        const deps = await get_deps_from_plugin_1.getDepsFromPlugin(root, options);
        const failedResults = deps.failedResults;
        if (failedResults === null || failedResults === void 0 ? void 0 : failedResults.length) {
            await spinner.clear(spinnerLbl)();
            if (!options.json) {
                console.warn(chalk_1.default.bold.red(`✗ ${failedResults.length}/${failedResults.length +
                    deps.scannedProjects
                        .length} potential projects failed to get dependencies. Run with \`-d\` for debug output.`));
            }
        }
        analytics.add('pluginName', deps.plugin.name);
        const javaVersion = _.get(deps.plugin, 'meta.versionBuildInfo.metaBuildVersion.javaVersion', null);
        const mvnVersion = _.get(deps.plugin, 'meta.versionBuildInfo.metaBuildVersion.mvnVersion', null);
        if (javaVersion) {
            analytics.add('javaVersion', javaVersion);
        }
        if (mvnVersion) {
            analytics.add('mvnVersion', mvnVersion);
        }
        for (const scannedProject of deps.scannedProjects) {
            if (!scannedProject.depTree && !scannedProject.depGraph) {
                debug('scannedProject is missing depGraph or depTree, cannot run test/monitor');
                throw new errors_1.FailedToRunTestError('Your test request could not be completed. Please email support@snyk.io');
            }
            // prefer dep-graph fallback on dep tree
            // TODO: clean up once dep-graphs only
            const pkg = scannedProject.depGraph
                ? scannedProject.depGraph
                : scannedProject.depTree;
            if (options['print-deps']) {
                if (scannedProject.depGraph) {
                    await spinner.clear(spinnerLbl)();
                    print_deps_1.maybePrintDepGraph(options, pkg);
                }
                else {
                    await spinner.clear(spinnerLbl)();
                    print_deps_1.maybePrintDepTree(options, pkg);
                }
            }
            const project = scannedProject;
            const packageManager = extract_package_manager_1.extractPackageManager(project, deps, options);
            if (pkg.docker) {
                const baseImageFromDockerfile = pkg.docker.baseImage;
                if (!baseImageFromDockerfile && options['base-image']) {
                    pkg.docker.baseImage = options['base-image'];
                }
                if (baseImageFromDockerfile && deps.plugin && deps.plugin.imageLayers) {
                    analytics.add('BaseImage', baseImageFromDockerfile);
                    analytics.add('imageLayers', deps.plugin.imageLayers);
                }
            }
            // todo: normalize what target file gets used across plugins and functions
            const targetFile = scannedProject.targetFile || deps.plugin.targetFile || options.file;
            // Forcing options.path to be a string as pathUtil requires is to be stringified
            const targetFileRelativePath = targetFile
                ? pathUtil.join(pathUtil.resolve(`${options.path || root}`), targetFile)
                : '';
            let targetFileDir;
            if (targetFileRelativePath) {
                const { dir } = path.parse(targetFileRelativePath);
                targetFileDir = dir;
            }
            const policy = await policy_1.findAndLoadPolicy(root, options.docker ? 'docker' : packageManager, options, 
            // TODO: fix this and send only send when we used resolve-deps for node
            // it should be a ExpandedPkgTree type instead
            pkg, targetFileDir);
            analytics.add('packageManager', packageManager);
            if (scannedProject.depGraph) {
                const depGraph = pkg;
                addPackageAnalytics(depGraph.rootPkg.name, depGraph.rootPkg.version);
            }
            if (scannedProject.depTree) {
                const depTree = pkg;
                addPackageAnalytics(depTree.name, depTree.version);
            }
            let target;
            if (scannedProject.depGraph) {
                target = await projectMetadata.getInfo(scannedProject, options);
            }
            else {
                target = await projectMetadata.getInfo(scannedProject, options, pkg);
            }
            const originalProjectName = scannedProject.depGraph
                ? pkg.rootPkg.name
                : pkg.name;
            let body = {
                // WARNING: be careful changing this as it affects project uniqueness
                targetFile: project.plugin.targetFile,
                // TODO: Remove relativePath prop once we gather enough ruby related logs
                targetFileRelativePath: `${targetFileRelativePath}`,
                projectNameOverride: options.projectName,
                originalProjectName,
                policy: policy ? policy.toString() : undefined,
                foundProjectCount: await get_extra_project_count_1.getExtraProjectCount(root, options, deps),
                displayTargetFile: targetFile,
                docker: pkg.docker,
                hasDevDependencies: pkg.hasDevDependencies,
                target,
            };
            if (options.vulnEndpoint) {
                // options.vulnEndpoint is only used by `snyk protect` (i.e. local filesystem tests).
                body = Object.assign(Object.assign({}, body), pkg);
            }
            else {
                let depGraph;
                if (scannedProject.depGraph) {
                    depGraph = scannedProject.depGraph;
                }
                else {
                    // Graphs are more compact and robust representations.
                    // Legacy parts of the code are still using trees, but will eventually be fully migrated.
                    debug('converting dep-tree to dep-graph', {
                        name: pkg.name,
                        targetFile: scannedProject.targetFile || options.file,
                    });
                    depGraph = await depGraphLib.legacy.depTreeToGraph(pkg, packageManager);
                    debug('done converting dep-tree to dep-graph', {
                        uniquePkgsCount: depGraph.getPkgs().length,
                    });
                }
                const pruneIsRequired = options.pruneRepeatedSubdependencies;
                if (packageManager) {
                    depGraph = await prune_1.pruneGraph(depGraph, packageManager, pruneIsRequired);
                }
                body.depGraph = depGraph;
            }
            if (options.reachableVulns && ((_a = scannedProject.callGraph) === null || _a === void 0 ? void 0 : _a.message)) {
                const err = scannedProject.callGraph;
                const analyticsError = err.innerError || err;
                analytics.add('callGraphError', {
                    errorType: (_b = analyticsError.constructor) === null || _b === void 0 ? void 0 : _b.name,
                    message: error_format_1.abridgeErrorMessage(analyticsError.message.toString(), ANALYTICS_PAYLOAD_MAX_LENGTH),
                });
                alerts.registerAlerts([
                    {
                        type: 'error',
                        name: 'missing-call-graph',
                        msg: err.message,
                    },
                ]);
            }
            else if (scannedProject.callGraph) {
                const { callGraph, nodeCount, edgeCount, } = reachable_vulns_1.serializeCallGraphWithMetrics(scannedProject.callGraph);
                debug(`Adding call graph to payload, node count: ${nodeCount}, edge count: ${edgeCount}`);
                const callGraphMetrics = _.get(deps.plugin, 'meta.callGraphMetrics', {});
                analytics.add('callGraphMetrics', Object.assign({ callGraphEdgeCount: edgeCount, callGraphNodeCount: nodeCount }, callGraphMetrics));
                body.callGraph = callGraph;
            }
            const reqUrl = config.API +
                (options.testDepGraphDockerEndpoint ||
                    options.vulnEndpoint ||
                    '/test-dep-graph');
            const payload = {
                method: 'POST',
                url: reqUrl,
                json: true,
                headers: {
                    'x-is-ci': is_ci_1.isCI(),
                    authorization: getAuthHeader(),
                },
                qs: common.assembleQueryString(options),
                body,
            };
            if (packageManager && ['yarn', 'npm'].indexOf(packageManager) !== -1) {
                const isLockFileBased = targetFile &&
                    (targetFile.endsWith('package-lock.json') ||
                        targetFile.endsWith('yarn.lock'));
                if (!isLockFileBased || options.traverseNodeModules) {
                    payload.modules = pkg; // See the output of resolve-deps
                }
            }
            payloads.push(payload);
        }
        return payloads;
    }
    finally {
        await spinner.clear(spinnerLbl)();
    }
}
// Payload to send to the Registry for scanning a remote package.
async function assembleRemotePayloads(root, options) {
    const pkg = snyk_module_1.parsePackageString(root);
    debug('testing remote: %s', pkg.name + '@' + pkg.version);
    addPackageAnalytics(pkg.name, pkg.version);
    const encodedName = encodeURIComponent(pkg.name + '@' + pkg.version);
    // options.vulnEndpoint is only used by `snyk protect` (i.e. local filesystem tests)
    const url = `${config.API}${options.vulnEndpoint ||
        `/vuln/${options.packageManager}`}/${encodedName}`;
    return [
        {
            method: 'GET',
            url,
            qs: common.assembleQueryString(options),
            json: true,
            headers: {
                'x-is-ci': is_ci_1.isCI(),
                authorization: 'token ' + snyk.api,
            },
        },
    ];
}
function addPackageAnalytics(name, version) {
    analytics.add('packageName', name);
    analytics.add('packageVersion', version);
    analytics.add('package', name + '@' + version);
}
function getAuthHeader() {
    const dockerToken = api_token_1.getDockerToken();
    if (dockerToken) {
        return 'bearer ' + dockerToken;
    }
    return 'token ' + snyk.api;
}
function countUniqueVulns(vulns) {
    const seen = {};
    for (const curr of vulns) {
        seen[curr.id] = true;
    }
    return Object.keys(seen).length;
}
//# sourceMappingURL=run-test.js.map