"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorDepGraph = exports.monitor = void 0;
const Debug = require("debug");
const path = require("path");
const depGraphLib = require("@snyk/dep-graph");
const snyk = require("..");
const api_token_1 = require("../api-token");
const request = require("../request");
const config = require("../config");
const os = require("os");
const _ = require("lodash");
const is_ci_1 = require("../is-ci");
const analytics = require("../analytics");
const projectMetadata = require("../project-metadata");
const errors_1 = require("../errors");
const prune_1 = require("../prune");
const package_managers_1 = require("../package-managers");
const feature_flags_1 = require("../feature-flags");
const count_total_deps_in_tree_1 = require("./count-total-deps-in-tree");
const filter_out_missing_deps_1 = require("./filter-out-missing-deps");
const drop_empty_deps_1 = require("./drop-empty-deps");
const prune_dep_tree_1 = require("./prune-dep-tree");
const policy_1 = require("../policy");
const types_1 = require("../project-metadata/types");
const reachable_vulns_1 = require("../reachable-vulns");
const utils_1 = require("./utils");
const utils_2 = require("../utils");
const alerts = require("../alerts");
const error_format_1 = require("../error-format");
const debug = Debug('snyk');
const ANALYTICS_PAYLOAD_MAX_LENGTH = 1024;
async function monitor(root, meta, scannedProject, options, pluginMeta, targetFileRelativePath, contributors) {
    api_token_1.apiTokenExists();
    const packageManager = meta.packageManager;
    analytics.add('packageManager', packageManager);
    analytics.add('isDocker', !!meta.isDocker);
    if (scannedProject.depGraph) {
        return await monitorDepGraph(root, meta, scannedProject, pluginMeta, options, targetFileRelativePath, contributors);
    }
    // TODO @boost: delete this once 'experimental-dep-graph' ff is deleted
    if (package_managers_1.GRAPH_SUPPORTED_PACKAGE_MANAGERS.includes(packageManager)) {
        const monitorGraphSupportedRes = await feature_flags_1.isFeatureFlagSupportedForOrg(_.camelCase('experimental-dep-graph'), options.org || config.org);
        if (monitorGraphSupportedRes.code === 401) {
            throw errors_1.AuthFailedError(monitorGraphSupportedRes.error, monitorGraphSupportedRes.code);
        }
        if (monitorGraphSupportedRes.ok) {
            return await experimentalMonitorDepGraphFromDepTree(root, meta, scannedProject, pluginMeta, options, targetFileRelativePath, contributors);
        }
        if (monitorGraphSupportedRes.userMessage) {
            debug(monitorGraphSupportedRes.userMessage);
        }
    }
    return await monitorDepTree(root, meta, scannedProject, pluginMeta, options, targetFileRelativePath, contributors);
}
exports.monitor = monitor;
async function monitorDepTree(root, meta, scannedProject, pluginMeta, options, targetFileRelativePath, contributors) {
    var _a;
    let treeMissingDeps = [];
    const packageManager = meta.packageManager;
    let depTree = scannedProject.depTree;
    if (!depTree) {
        debug('scannedProject is missing depGraph or depTree, cannot run test/monitor');
        throw new errors_1.FailedToRunTestError('Your monitor request could not be completed. Please email support@snyk.io');
    }
    let prePruneDepCount;
    if (meta.prune) {
        debug('prune used, counting total dependencies');
        prePruneDepCount = count_total_deps_in_tree_1.countTotalDependenciesInTree(depTree);
        analytics.add('prePruneDepCount', prePruneDepCount);
        debug('total dependencies: %d', prePruneDepCount);
        debug('pruning dep tree');
        depTree = await prune_dep_tree_1.pruneTree(depTree, meta.packageManager);
        debug('finished pruning dep tree');
    }
    if (['npm', 'yarn'].includes(meta.packageManager)) {
        const { filteredDepTree, missingDeps } = filter_out_missing_deps_1.filterOutMissingDeps(depTree);
        depTree = filteredDepTree;
        treeMissingDeps = missingDeps;
    }
    let targetFileDir;
    if (targetFileRelativePath) {
        const { dir } = path.parse(targetFileRelativePath);
        targetFileDir = dir;
    }
    const policy = await policy_1.findAndLoadPolicy(root, meta.isDocker ? 'docker' : packageManager, options, 
    // TODO: fix this and send only send when we used resolve-deps for node
    // it should be a ExpandedPkgTree type instead
    depTree, targetFileDir);
    const target = await projectMetadata.getInfo(scannedProject, meta, depTree);
    if (types_1.isGitTarget(target) && target.branch) {
        analytics.add('targetBranch', target.branch);
    }
    depTree = drop_empty_deps_1.dropEmptyDeps(depTree);
    let callGraphPayload;
    if (options.reachableVulns && ((_a = scannedProject.callGraph) === null || _a === void 0 ? void 0 : _a.innerError)) {
        const err = scannedProject.callGraph;
        analytics.add('callGraphError', error_format_1.abridgeErrorMessage(err.innerError.toString(), ANALYTICS_PAYLOAD_MAX_LENGTH));
        alerts.registerAlerts([
            {
                type: 'error',
                name: 'missing-call-graph',
                msg: err.message,
            },
        ]);
    }
    else if (scannedProject.callGraph) {
        const { callGraph, nodeCount, edgeCount } = reachable_vulns_1.serializeCallGraphWithMetrics(scannedProject.callGraph);
        debug(`Adding call graph to payload, node count: ${nodeCount}, edge count: ${edgeCount}`);
        const callGraphMetrics = _.get(pluginMeta, 'meta.callGraphMetrics', {});
        analytics.add('callGraphMetrics', Object.assign({ callGraphEdgeCount: edgeCount, callGraphNodeCount: nodeCount }, callGraphMetrics));
        callGraphPayload = callGraph;
    }
    // TODO(kyegupov): async/await
    return new Promise((resolve, reject) => {
        var _a, _b, _c;
        if (!depTree) {
            debug('scannedProject is missing depGraph or depTree, cannot run test/monitor');
            return reject(new errors_1.FailedToRunTestError('Your monitor request could not be completed. Please email support@snyk.io'));
        }
        request({
            body: {
                meta: {
                    method: meta.method,
                    hostname: os.hostname(),
                    id: snyk.id || depTree.name,
                    ci: is_ci_1.isCI(),
                    pid: process.pid,
                    node: process.version,
                    master: snyk.config.isMaster,
                    name: utils_1.getNameDepTree(scannedProject, depTree, meta),
                    version: depTree.version,
                    org: config.org ? decodeURIComponent(config.org) : undefined,
                    pluginName: pluginMeta.name,
                    pluginRuntime: pluginMeta.runtime,
                    missingDeps: treeMissingDeps,
                    dockerImageId: pluginMeta.dockerImageId,
                    dockerBaseImage: depTree.docker
                        ? depTree.docker.baseImage
                        : undefined,
                    dockerfileLayers: depTree.docker
                        ? depTree.docker.dockerfileLayers
                        : undefined,
                    projectName: utils_1.getProjectName(scannedProject, meta),
                    prePruneDepCount,
                    monitorGraph: false,
                    versionBuildInfo: JSON.stringify((_a = scannedProject.meta) === null || _a === void 0 ? void 0 : _a.versionBuildInfo),
                    gradleProjectName: (_b = scannedProject.meta) === null || _b === void 0 ? void 0 : _b.gradleProjectName,
                    platform: (_c = scannedProject.meta) === null || _c === void 0 ? void 0 : _c.platform,
                },
                policy: policy ? policy.toString() : undefined,
                package: depTree,
                callGraph: callGraphPayload,
                // we take the targetFile from the plugin,
                // because we want to send it only for specific package-managers
                target,
                // WARNING: be careful changing this as it affects project uniqueness
                targetFile: utils_1.getTargetFile(scannedProject, pluginMeta),
                targetFileRelativePath,
                contributors,
            },
            gzip: true,
            method: 'PUT',
            headers: {
                authorization: 'token ' + snyk.api,
                'content-encoding': 'gzip',
            },
            url: config.API + '/monitor/' + packageManager,
            json: true,
        }, (error, res, body) => {
            if (error) {
                return reject(error);
            }
            if (res.statusCode >= 200 && res.statusCode <= 299) {
                resolve(body);
            }
            else {
                let err;
                const userMessage = body && body.userMessage;
                if (!userMessage && res.statusCode === 504) {
                    err = new errors_1.ConnectionTimeoutError();
                }
                else {
                    err = new errors_1.MonitorError(res.statusCode, userMessage);
                }
                reject(err);
            }
        });
    });
}
async function monitorDepGraph(root, meta, scannedProject, pluginMeta, options, targetFileRelativePath, contributors) {
    const packageManager = meta.packageManager;
    analytics.add('monitorDepGraph', true);
    let depGraph = scannedProject.depGraph;
    if (!depGraph) {
        debug('scannedProject is missing depGraph or depTree, cannot run test/monitor');
        throw new errors_1.FailedToRunTestError('Your monitor request could not be completed. Please email support@snyk.io');
    }
    let targetFileDir;
    if (targetFileRelativePath) {
        const { dir } = path.parse(targetFileRelativePath);
        targetFileDir = dir;
    }
    const policy = await policy_1.findAndLoadPolicy(root, meta.isDocker ? 'docker' : packageManager, options, undefined, targetFileDir);
    const target = await projectMetadata.getInfo(scannedProject, meta);
    if (types_1.isGitTarget(target) && target.branch) {
        analytics.add('targetBranch', target.branch);
    }
    // this graph will be pruned only if is too dense
    depGraph = await prune_1.pruneGraph(depGraph, packageManager);
    return new Promise((resolve, reject) => {
        var _a, _b;
        if (!depGraph) {
            debug('scannedProject is missing depGraph or depTree, cannot run test/monitor');
            return reject(new errors_1.FailedToRunTestError('Your monitor request could not be completed. Please email support@snyk.io'));
        }
        request({
            body: {
                meta: {
                    method: meta.method,
                    hostname: os.hostname(),
                    id: snyk.id || depGraph.rootPkg.name,
                    ci: is_ci_1.isCI(),
                    pid: process.pid,
                    node: process.version,
                    master: snyk.config.isMaster,
                    name: utils_1.getNameDepGraph(scannedProject, depGraph, meta),
                    version: depGraph.rootPkg.version,
                    org: config.org ? decodeURIComponent(config.org) : undefined,
                    pluginName: pluginMeta.name,
                    pluginRuntime: pluginMeta.runtime,
                    projectName: utils_1.getProjectName(scannedProject, meta),
                    monitorGraph: true,
                    versionBuildInfo: JSON.stringify((_a = scannedProject.meta) === null || _a === void 0 ? void 0 : _a.versionBuildInfo),
                    gradleProjectName: (_b = scannedProject.meta) === null || _b === void 0 ? void 0 : _b.gradleProjectName,
                },
                policy: policy ? policy.toString() : undefined,
                depGraphJSON: depGraph,
                // we take the targetFile from the plugin,
                // because we want to send it only for specific package-managers
                target,
                targetFile: utils_1.getTargetFile(scannedProject, pluginMeta),
                targetFileRelativePath,
                contributors,
            },
            gzip: true,
            method: 'PUT',
            headers: {
                authorization: 'token ' + snyk.api,
                'content-encoding': 'gzip',
            },
            url: `${config.API}/monitor/${packageManager}/graph`,
            json: true,
        }, (error, res, body) => {
            if (error) {
                return reject(error);
            }
            if (res.statusCode >= 200 && res.statusCode <= 299) {
                resolve(body);
            }
            else {
                let err;
                const userMessage = body && body.userMessage;
                if (!userMessage && res.statusCode === 504) {
                    err = new errors_1.ConnectionTimeoutError();
                }
                else {
                    err = new errors_1.MonitorError(res.statusCode, userMessage);
                }
                reject(err);
            }
        });
    });
}
exports.monitorDepGraph = monitorDepGraph;
/**
 * @deprecated it will be deleted once experimentalDepGraph FF will be deleted
 * and npm, yarn, sbt and rubygems usage of `experimentalMonitorDepGraphFromDepTree`
 * will be replaced with `monitorDepGraph` method
 */
async function experimentalMonitorDepGraphFromDepTree(root, meta, scannedProject, pluginMeta, options, targetFileRelativePath, contributors) {
    const packageManager = meta.packageManager;
    analytics.add('experimentalMonitorDepGraphFromDepTree', true);
    let treeMissingDeps;
    let depTree = scannedProject.depTree;
    if (!depTree) {
        debug('scannedProject is missing depGraph or depTree, cannot run test/monitor');
        throw new errors_1.FailedToRunTestError('Your monitor request could not be completed. Please email support@snyk.io');
    }
    let targetFileDir;
    if (targetFileRelativePath) {
        const { dir } = path.parse(targetFileRelativePath);
        targetFileDir = dir;
    }
    const policy = await policy_1.findAndLoadPolicy(root, meta.isDocker ? 'docker' : packageManager, options, 
    // TODO: fix this and send only send when we used resolve-deps for node
    // it should be a ExpandedPkgTree type instead
    depTree, targetFileDir);
    if (['npm', 'yarn'].includes(meta.packageManager)) {
        const { filteredDepTree, missingDeps } = filter_out_missing_deps_1.filterOutMissingDeps(depTree);
        depTree = filteredDepTree;
        treeMissingDeps = missingDeps;
    }
    const depGraph = await depGraphLib.legacy.depTreeToGraph(depTree, packageManager);
    const target = await projectMetadata.getInfo(scannedProject, meta, depTree);
    if (types_1.isGitTarget(target) && target.branch) {
        analytics.add('targetBranch', target.branch);
    }
    let prunedGraph = depGraph;
    let prePruneDepCount;
    if (meta.prune) {
        debug('Trying to prune the graph');
        prePruneDepCount = utils_2.countPathsToGraphRoot(depGraph);
        debug('pre prunedPathsCount: ' + prePruneDepCount);
        prunedGraph = await prune_1.pruneGraph(depGraph, packageManager, meta.prune);
    }
    return new Promise((resolve, reject) => {
        if (!depTree) {
            debug('scannedProject is missing depGraph or depTree, cannot run test/monitor');
            return reject(new errors_1.FailedToRunTestError('Your monitor request could not be completed. Please email support@snyk.io'));
        }
        request({
            body: {
                meta: {
                    method: meta.method,
                    hostname: os.hostname(),
                    id: snyk.id || depTree.name,
                    ci: is_ci_1.isCI(),
                    pid: process.pid,
                    node: process.version,
                    master: snyk.config.isMaster,
                    name: utils_1.getNameDepGraph(scannedProject, depGraph, meta),
                    version: depGraph.rootPkg.version,
                    org: config.org ? decodeURIComponent(config.org) : undefined,
                    pluginName: pluginMeta.name,
                    pluginRuntime: pluginMeta.runtime,
                    dockerImageId: pluginMeta.dockerImageId,
                    dockerBaseImage: depTree.docker
                        ? depTree.docker.baseImage
                        : undefined,
                    dockerfileLayers: depTree.docker
                        ? depTree.docker.dockerfileLayers
                        : undefined,
                    projectName: utils_1.getProjectName(scannedProject, meta),
                    prePruneDepCount,
                    missingDeps: treeMissingDeps,
                    monitorGraph: true,
                },
                policy: policy ? policy.toString() : undefined,
                depGraphJSON: prunedGraph,
                // we take the targetFile from the plugin,
                // because we want to send it only for specific package-managers
                target,
                targetFile: utils_1.getTargetFile(scannedProject, pluginMeta),
                targetFileRelativePath,
                contributors,
            },
            gzip: true,
            method: 'PUT',
            headers: {
                authorization: 'token ' + snyk.api,
                'content-encoding': 'gzip',
            },
            url: `${config.API}/monitor/${packageManager}/graph`,
            json: true,
        }, (error, res, body) => {
            if (error) {
                return reject(error);
            }
            if (res.statusCode >= 200 && res.statusCode <= 299) {
                resolve(body);
            }
            else {
                let err;
                const userMessage = body && body.userMessage;
                if (!userMessage && res.statusCode === 504) {
                    err = new errors_1.ConnectionTimeoutError();
                }
                else {
                    err = new errors_1.MonitorError(res.statusCode, userMessage);
                }
                reject(err);
            }
        });
    });
}
//# sourceMappingURL=index.js.map