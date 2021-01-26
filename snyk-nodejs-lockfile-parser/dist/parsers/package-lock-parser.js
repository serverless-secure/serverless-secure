"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _cloneDeep = require("lodash.clonedeep");
const _isEmpty = require("lodash.isempty");
const _set = require("lodash.set");
const _toPairs = require("lodash.topairs");
const graphlib = require("graphlib");
const uuid = require("uuid/v4");
const config_1 = require("../config");
const event_loop_spinner_1 = require("event-loop-spinner");
const _1 = require("./");
const errors_1 = require("../errors");
class PackageLockParser {
    constructor() {
        // package names must not contain URI unsafe characters, so one of them is
        // a good delimiter (https://www.ietf.org/rfc/rfc1738.txt)
        this.pathDelimiter = '|';
    }
    parseLockFile(lockFileContents) {
        try {
            const packageLock = JSON.parse(lockFileContents);
            packageLock.type = _1.LockfileType.npm;
            return packageLock;
        }
        catch (e) {
            throw new errors_1.InvalidUserInputError('package-lock.json parsing failed with ' + `error ${e.message}`);
        }
    }
    async getDependencyTree(manifestFile, lockfile, includeDev = false, strict = true) {
        var _a;
        if (lockfile.type !== _1.LockfileType.npm) {
            throw new errors_1.InvalidUserInputError('Unsupported lockfile provided. Please ' +
                'provide `package-lock.json`.');
        }
        const packageLock = lockfile;
        const depTree = {
            dependencies: {},
            hasDevDependencies: !_isEmpty(manifestFile.devDependencies),
            name: manifestFile.name,
            size: 1,
            version: manifestFile.version || '',
        };
        const nodeVersion = (_a = manifestFile === null || manifestFile === void 0 ? void 0 : manifestFile.engines) === null || _a === void 0 ? void 0 : _a.node;
        if (nodeVersion) {
            _set(depTree, 'meta.nodeVersion', nodeVersion);
        }
        // asked to process empty deps
        if (_isEmpty(manifestFile.dependencies) && !includeDev) {
            return depTree;
        }
        // prepare a flat map, where dependency path is a key to dependency object
        // path is an unique identifier for each dependency and corresponds to the
        // relative path on disc
        const depMap = this.flattenLockfile(packageLock);
        // all paths are identified, we can create a graph representing what depends on what
        const depGraph = this.createGraphOfDependencies(depMap);
        // topological sort will be applied and it requires acyclic graphs
        let cycleStarts = {};
        if (!graphlib.alg.isAcyclic(depGraph)) {
            const cycles = graphlib.alg.findCycles(depGraph);
            for (const cycle of cycles) {
                // Since one of top level dependencies can be a start of cycle and that node
                // will be duplicated, we need to store a link between original node
                // and the new one in order to identify those duplicated top level dependencies
                cycleStarts = Object.assign(Object.assign({}, cycleStarts), this.removeCycle(cycle, depMap, depGraph));
            }
        }
        // transform depMap to a map of PkgTrees
        const { depTrees, depTreesSizes } = await this.createDepTrees(depMap, depGraph);
        // get trees for dependencies from manifest file
        const topLevelDeps = _1.getTopLevelDeps(manifestFile, includeDev);
        // number of dependencies including root one
        let treeSize = 1;
        for (const dep of topLevelDeps) {
            // tree size limit should be 6 millions.
            if (treeSize > config_1.config.NPM_TREE_SIZE_LIMIT) {
                throw new errors_1.TreeSizeLimitError();
            }
            // if any of top level dependencies is a part of cycle
            // it now has a different item in the map
            const depName = cycleStarts[dep.name] || dep.name;
            if (depTrees[depName]) {
                // if the top level dependency is dev, all children are dev
                depTree.dependencies[dep.name] = dep.dev
                    ? this.setDevDepRec(_cloneDeep(depTrees[depName]))
                    : depTrees[depName];
                treeSize += depTreesSizes[depName];
                if (event_loop_spinner_1.eventLoopSpinner.isStarving()) {
                    await event_loop_spinner_1.eventLoopSpinner.spin();
                }
            }
            else if (/^file:/.test(dep.version)) {
                depTree.dependencies[dep.name] = _1.createDepTreeDepFromDep(dep);
                treeSize++;
            }
            else {
                // TODO: also check the package version
                // for a stricter check
                if (strict) {
                    throw new errors_1.OutOfSyncError(depName, _1.LockfileType.npm);
                }
                depTree.dependencies[dep.name] = _1.createDepTreeDepFromDep(dep);
                if (!depTree.dependencies[dep.name].labels) {
                    depTree.dependencies[dep.name].labels = {};
                }
                depTree.dependencies[dep.name].labels.missingLockFileEntry = 'true';
                treeSize++;
            }
        }
        depTree.size = treeSize;
        return depTree;
    }
    setDevDepRec(pkgTree) {
        for (const [name, subTree] of _toPairs(pkgTree.dependencies)) {
            pkgTree.dependencies[name] = this.setDevDepRec(subTree);
        }
        pkgTree.labels = {
            scope: _1.Scope.dev,
        };
        return pkgTree;
    }
    /* Algorithm for cycle removal:
      For every node in a cycle:
        1. Create a duplicate of entry node (without edges)
        2. For every cyclic dependency of entry node, create a duplicate of
            the dependency and connect it with the duplicated entry node
        3.a If edge goes to already-visited dependency, end of cycle is found;
            update metadata and do not continue traversing
        3.b Follow the edge and repeat the process, storing visited dependency-paths.
            All non-cyclic dependencies of duplicated node need to be updated.
        4. All non-cyclic dependencies or dependants of original node need to be
          updated to be connected with the duplicated one
  
      Once completed for all nodes in a cycle, original cyclic nodes can
      be removed.
    */
    removeCycle(cycle, depMap, depGraph) {
        /* FUNCTION DEFINITION
        To keep an order of algorithm steps readable, function is defined on-the-fly
        Arrow function is used for calling `this` without .bind(this) in the end
        */
        const acyclicDuplicationRec = (node, traversed, currentCycle, nodeCopy) => {
            // 2. For every cyclic dependency of entry node...
            const edgesToProcess = depGraph.inEdges(node).filter((e) => currentCycle.includes(e.v));
            for (const edge of edgesToProcess) {
                // ... create a duplicate of the dependency...
                const child = edge.v;
                const dependencyCopy = this.cloneNodeWithoutEdges(child, depMap, depGraph);
                // ...and connect it with the duplicated entry node
                depGraph.setEdge(dependencyCopy, nodeCopy);
                // 3.a If edge goes to already-visited dependency, end of cycle is found;
                if (traversed.includes(child)) {
                    // update metadata and labels and do not continue traversing
                    if (!depMap[dependencyCopy].labels) {
                        depMap[dependencyCopy].labels = {};
                    }
                    depMap[dependencyCopy].labels.pruned = 'cyclic';
                }
                else {
                    // 3.b Follow the edge and repeat the process, storing visited dependency-paths
                    acyclicDuplicationRec(child, [...traversed, node], currentCycle, dependencyCopy);
                    // All non-cyclic dependencies of duplicated node need to be updated.
                    this.cloneAcyclicNodeEdges(child, dependencyCopy, cycle, depGraph, {
                        inEdges: true,
                        outEdges: false,
                    });
                }
            }
        };
        const cycleStarts = {};
        // For every node in a cycle:
        for (const start of cycle) {
            // 1. Create a uniqe duplicate of entry node (without edges)
            const clonedNode = this.cloneNodeWithoutEdges(start, depMap, depGraph);
            cycleStarts[start] = clonedNode;
            // CALL of previously defined function
            acyclicDuplicationRec(start, [], cycle, clonedNode);
            // 4. All non-cyclic dependencies or dependants of original node need to be
            //   updated to be connected with the duplicated one
            this.cloneAcyclicNodeEdges(start, clonedNode, cycle, depGraph, {
                inEdges: true,
                outEdges: true,
            });
        }
        // Once completed for all nodes in a cycle, original cyclic nodes can
        // be removed.
        for (const start of cycle) {
            depGraph.removeNode(start);
        }
        return cycleStarts;
    }
    cloneAcyclicNodeEdges(nodeFrom, nodeTo, cycle, depGraph, { inEdges, outEdges }) {
        // node has to have edges
        const edges = depGraph.nodeEdges(nodeFrom);
        if (outEdges) {
            const parentEdges = edges.filter((e) => !cycle.includes(e.w));
            for (const edge of parentEdges) {
                const parent = edge.w;
                depGraph.setEdge(nodeTo, parent);
            }
        }
        if (inEdges) {
            const childEdges = edges.filter((e) => !cycle.includes(e.v));
            for (const edge of childEdges) {
                const child = edge.v;
                depGraph.setEdge(child, nodeTo);
            }
        }
    }
    cloneNodeWithoutEdges(node, depMap, depGraph) {
        const newNode = node + uuid();
        // update depMap with new node
        depMap[newNode] = _cloneDeep(depMap[node]);
        // add new node to the graph
        depGraph.setNode(newNode);
        return newNode;
    }
    createGraphOfDependencies(depMap) {
        const depGraph = new graphlib.Graph();
        for (const depKey of Object.keys(depMap)) {
            depGraph.setNode(depKey);
        }
        for (const [depPath, dep] of Object.entries(depMap)) {
            for (const depName of dep.requires) {
                const subDepPath = this.findDepsPath(depPath, depName, depMap);
                // direction is from the dependency to the package requiring it
                depGraph.setEdge(subDepPath, depPath);
            }
        }
        return depGraph;
    }
    // dependency in package-lock.json v1 can be defined either inside `dependencies`
    // of other dependency or anywhere upward towards root
    findDepsPath(startPath, depName, depMap) {
        const depPath = startPath.split(this.pathDelimiter);
        while (depPath.length) {
            const currentPath = depPath.concat(depName).join(this.pathDelimiter);
            if (depMap[currentPath]) {
                return currentPath;
            }
            depPath.pop();
        }
        if (!depMap[depName]) {
            throw new errors_1.OutOfSyncError(depName, _1.LockfileType.npm);
        }
        return depName;
    }
    // Algorithm is based on dynamic programming technique and tries to build
    // "more simple" trees and compose them into bigger ones.
    async createDepTrees(depMap, depGraph) {
        // Graph has to be acyclic
        if (!graphlib.alg.isAcyclic(depGraph)) {
            throw new Error('Cycles were not removed from graph.');
        }
        const depTrees = {};
        const depTreesSizes = {};
        // topological sort guarantees that when we create a pkg-tree for a dep,
        // all it's sub-trees were already created. This also implies that leaf
        // packages will be processed first as they have no sub-trees.
        const depOrder = graphlib.alg.topsort(depGraph);
        while (depOrder.length) {
            const depKey = depOrder.shift();
            const dep = depMap[depKey];
            let treeSize = 1;
            // direction is from the dependency to the package requiring it, so we are
            // looking for predecessors
            for (const subDepPath of depGraph.predecessors(depKey)) {
                const subDep = depTrees[subDepPath];
                if (!dep.dependencies) {
                    dep.dependencies = {};
                }
                dep.dependencies[subDep.name] = subDep;
                treeSize += depTreesSizes[subDepPath];
            }
            const depTreeDep = {
                labels: dep.labels,
                name: dep.name,
                version: dep.version,
            };
            if (dep.dependencies) {
                depTreeDep.dependencies = dep.dependencies;
            }
            depTrees[depKey] = depTreeDep;
            depTreesSizes[depKey] = treeSize;
            // Since this code doesn't handle any I/O or network, we need to force
            // event loop to tick while being used in server for request processing
            if (event_loop_spinner_1.eventLoopSpinner.isStarving()) {
                await event_loop_spinner_1.eventLoopSpinner.spin();
            }
        }
        return { depTrees, depTreesSizes };
    }
    flattenLockfile(lockfile) {
        const depMap = {};
        const flattenLockfileRec = (lockfileDeps, path) => {
            for (const [depName, dep] of Object.entries(lockfileDeps)) {
                const depNode = {
                    labels: {
                        scope: dep.dev ? _1.Scope.dev : _1.Scope.prod,
                    },
                    name: depName,
                    requires: [],
                    version: dep.version,
                };
                if (dep.requires) {
                    depNode.requires = Object.keys(dep.requires);
                }
                const depPath = [...path, depName];
                const depKey = depPath.join(this.pathDelimiter);
                depMap[depKey] = depNode;
                if (dep.dependencies) {
                    flattenLockfileRec(dep.dependencies, depPath);
                }
            }
        };
        flattenLockfileRec(lockfile.dependencies || {}, []);
        return depMap;
    }
}
exports.PackageLockParser = PackageLockParser;
//# sourceMappingURL=package-lock-parser.js.map