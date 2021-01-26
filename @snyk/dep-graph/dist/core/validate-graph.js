"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphlib = require("graphlib");
const errors_1 = require("./errors");
function assert(condition, msg) {
    if (!condition) {
        throw new errors_1.ValidationError(msg);
    }
}
function validateGraph(graph, rootNodeId, pkgs, pkgNodes) {
    assert((graph.predecessors(rootNodeId) || []).length === 0, `"${rootNodeId}" is not really the root`);
    const reachableFromRoot = graphlib.alg.postorder(graph, [rootNodeId]);
    const nodeIds = graph.nodes();
    assert(JSON.stringify(nodeIds.sort()) === JSON.stringify(reachableFromRoot.sort()), 'not all graph nodes are reachable from root');
    const pkgIds = Object.keys(pkgs);
    const pkgsWithoutInstances = pkgIds.filter((pkgId) => !pkgNodes[pkgId] || pkgNodes[pkgId].size === 0);
    assert(pkgsWithoutInstances.length === 0, 'not all pkgs have instance nodes');
}
exports.validateGraph = validateGraph;
//# sourceMappingURL=validate-graph.js.map