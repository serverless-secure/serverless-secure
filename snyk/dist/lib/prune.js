"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pruneGraph = void 0;
const _debug = require("debug");
const dep_graph_1 = require("@snyk/dep-graph");
const config = require("./config");
const errors_1 = require("./errors");
const analytics = require("../lib/analytics");
const utils_1 = require("./utils");
const debug = _debug('snyk:prune');
const { depTreeToGraph, graphToDepTree } = dep_graph_1.legacy;
async function pruneGraph(depGraph, packageManager, pruneIsRequired = false) {
    const prePrunePathsCount = utils_1.countPathsToGraphRoot(depGraph);
    const isDenseGraph = prePrunePathsCount > config.PRUNE_DEPS_THRESHOLD;
    debug('rootPkg', depGraph.rootPkg);
    debug('prePrunePathsCount: ' + prePrunePathsCount);
    debug('isDenseGraph', isDenseGraph);
    analytics.add('prePrunedPathsCount', prePrunePathsCount);
    if (isDenseGraph || pruneIsRequired) {
        debug('Trying to prune the graph');
        const prunedTree = (await graphToDepTree(depGraph, packageManager, {
            deduplicateWithinTopLevelDeps: true,
        }));
        const prunedGraph = await depTreeToGraph(prunedTree, packageManager);
        const postPrunePathsCount = utils_1.countPathsToGraphRoot(prunedGraph);
        analytics.add('postPrunedPathsCount', postPrunePathsCount);
        debug('postPrunePathsCount' + postPrunePathsCount);
        if (postPrunePathsCount > config.MAX_PATH_COUNT) {
            debug('Too many paths to process the project');
            //TODO replace the throw below with TooManyPaths we do not calculate vuln paths there
            throw new errors_1.TooManyVulnPaths();
        }
        return prunedGraph;
    }
    return depGraph;
}
exports.pruneGraph = pruneGraph;
//# sourceMappingURL=prune.js.map