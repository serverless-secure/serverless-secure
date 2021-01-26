"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterOutMissingDeps = void 0;
function filterOutMissingDeps(depTree) {
    const filteredDeps = {};
    const missingDeps = [];
    if (!depTree.dependencies) {
        return {
            filteredDepTree: depTree,
            missingDeps,
        };
    }
    for (const depKey of Object.keys(depTree.dependencies)) {
        const dep = depTree.dependencies[depKey];
        if (dep.missingLockFileEntry ||
            (dep.labels && dep.labels.missingLockFileEntry)) {
            // TODO(kyegupov): add field to the type
            missingDeps.push(`${dep.name}@${dep.version}`);
        }
        else {
            filteredDeps[depKey] = dep;
        }
    }
    const filteredDepTree = Object.assign(Object.assign({}, depTree), { dependencies: filteredDeps });
    return {
        filteredDepTree,
        missingDeps,
    };
}
exports.filterOutMissingDeps = filterOutMissingDeps;
//# sourceMappingURL=filter-out-missing-deps.js.map