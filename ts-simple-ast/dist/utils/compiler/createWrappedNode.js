"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors = require("../../errors");
var fileSystem_1 = require("../../fileSystem");
var GlobalContainer_1 = require("../../GlobalContainer");
var typescript_1 = require("../../typescript");
/**
 * Creates a wrapped node from a compiler node.
 * @param node - Node to create a wrapped node from.
 * @param info - Info for creating the wrapped node.
 */
function createWrappedNode(node, opts) {
    if (opts === void 0) { opts = {}; }
    var _a = opts.compilerOptions, compilerOptions = _a === void 0 ? {} : _a, sourceFile = opts.sourceFile, typeChecker = opts.typeChecker;
    var globalContainer = new GlobalContainer_1.GlobalContainer(new fileSystem_1.FileSystemWrapper(new fileSystem_1.DefaultFileSystemHost()), compilerOptions, { createLanguageService: false, typeChecker: typeChecker });
    var wrappedSourceFile = globalContainer.compilerFactory.getSourceFile(getSourceFileNode());
    return globalContainer.compilerFactory.getNodeFromCompilerNode(node, wrappedSourceFile);
    function getSourceFileNode() {
        return sourceFile == null ? getSourceFileFromNode(node) : sourceFile;
    }
    function getSourceFileFromNode(compilerNode) {
        if (compilerNode.kind === typescript_1.SyntaxKind.SourceFile)
            return compilerNode;
        if (compilerNode.parent == null)
            throw new errors.InvalidOperationError("Please ensure the node was created from a source file with 'setParentNodes' set to 'true'.");
        var parent = compilerNode;
        while (parent.parent != null)
            parent = parent.parent;
        if (parent.kind !== typescript_1.SyntaxKind.SourceFile)
            throw new errors.NotImplementedError("For some reason the top parent was not a source file.");
        return parent;
    }
}
exports.createWrappedNode = createWrappedNode;
