"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maybePrintDepTree = exports.maybePrintDepGraph = void 0;
const config = require("./config");
const depGraphLib = require("@snyk/dep-graph");
const utils_1 = require("./utils");
async function maybePrintDepGraph(options, depGraph) {
    // TODO @boost: remove this logic once we get a valid depGraph print format
    const graphPathsCount = utils_1.countPathsToGraphRoot(depGraph);
    const hasTooManyPaths = graphPathsCount > config.PRUNE_DEPS_THRESHOLD;
    if (!hasTooManyPaths) {
        const depTree = (await depGraphLib.legacy.graphToDepTree(depGraph, depGraph.pkgManager.name));
        maybePrintDepTree(options, depTree);
    }
    else {
        if (options['print-deps']) {
            if (options.json) {
                console.log('--print-deps --json option not yet supported for large projects. Displaying graph json output instead');
                // TODO @boost: add as output graphviz 'dot' file to visualize?
                console.log(JSON.stringify(depGraph.toJSON(), null, 2));
            }
            else {
                console.log('--print-deps option not yet supported for large projects. Try with --json.');
            }
        }
    }
}
exports.maybePrintDepGraph = maybePrintDepGraph;
// This option is still experimental and might be deprecated.
// It might be a better idea to convert it to a command (i.e. do not perform test/monitor).
function maybePrintDepTree(options, rootPackage) {
    if (options['print-deps']) {
        if (options.json) {
            // Will produce 2 JSON outputs, one for the deps, one for the vuln scan.
            console.log(JSON.stringify(rootPackage, null, 2));
        }
        else {
            printDepsForTree({ [rootPackage.name]: rootPackage });
        }
    }
}
exports.maybePrintDepTree = maybePrintDepTree;
function printDepsForTree(depDict, prefix = '') {
    let counter = 0;
    const keys = Object.keys(depDict);
    for (const name of keys) {
        const dep = depDict[name];
        let branch = '├─ ';
        const last = counter === keys.length - 1;
        if (last) {
            branch = '└─ ';
        }
        console.log(prefix + (prefix ? branch : '') + dep.name + ' @ ' + dep.version);
        if (dep.dependencies) {
            printDepsForTree(dep.dependencies, prefix + (last ? '   ' : '│  '));
        }
        counter++;
    }
}
//# sourceMappingURL=print-deps.js.map