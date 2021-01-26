"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCallGraph = void 0;
const graphlib_1 = require("graphlib");
const class_parsing_1 = require("./class-parsing");
function getNodeLabel(functionCall, classPerJarMapping) {
    // com.ibm.wala.FakeRootClass:fakeRootMethod
    const [className, functionName] = functionCall.split(':');
    const jarName = classPerJarMapping[className];
    return {
        className,
        functionName,
        jarName,
    };
}
function buildCallGraph(input, classPerJarMapping) {
    const graph = new graphlib_1.Graph();
    for (const line of input.trim().split('\n')) {
        const [caller, callee] = line
            .trim()
            .split(' -> ')
            .map(class_parsing_1.removeParams)
            .map(class_parsing_1.toFQclassName);
        graph.setNode(caller, getNodeLabel(caller, classPerJarMapping));
        graph.setNode(callee, getNodeLabel(callee, classPerJarMapping));
        graph.setEdge(caller, callee);
    }
    return graph;
}
exports.buildCallGraph = buildCallGraph;
//# sourceMappingURL=call-graph.js.map