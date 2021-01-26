"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromAbstractableNode(node) {
    return {
        isAbstract: node.isAbstract()
    };
}
exports.fromAbstractableNode = fromAbstractableNode;
function fromAmbientableNode(node) {
    return {
        hasDeclareKeyword: node.hasDeclareKeyword()
    };
}
exports.fromAmbientableNode = fromAmbientableNode;
function fromAsyncableNode(node) {
    return {
        isAsync: node.isAsync()
    };
}
exports.fromAsyncableNode = fromAsyncableNode;
function fromAwaitableNode(node) {
    return {
        isAwaited: node.isAwaited()
    };
}
exports.fromAwaitableNode = fromAwaitableNode;
function fromExportableNode(node) {
    return {
        isDefaultExport: node.hasDefaultKeyword(),
        isExported: node.hasExportKeyword()
    };
}
exports.fromExportableNode = fromExportableNode;
function fromGeneratorableNode(node) {
    return {
        isGenerator: node.isGenerator()
    };
}
exports.fromGeneratorableNode = fromGeneratorableNode;
function fromReturnTypedNode(node) {
    var returnTypeNode = node.getReturnTypeNode();
    return {
        returnType: returnTypeNode == null ? undefined : returnTypeNode.getText()
    };
}
exports.fromReturnTypedNode = fromReturnTypedNode;
function fromStaticableNode(node) {
    return {
        isStatic: node.isStatic()
    };
}
exports.fromStaticableNode = fromStaticableNode;
function fromScopeableNode(node) {
    return {
        scope: node.getScope()
    };
}
exports.fromScopeableNode = fromScopeableNode;
function fromScopedNode(node) {
    return {
        scope: node.hasScopeKeyword() ? node.getScope() : undefined
    };
}
exports.fromScopedNode = fromScopedNode;
function fromExtendsClauseableNode(node) {
    var exts = node.getExtends();
    return {
        extends: exts.length === 0 ? undefined : exts.map(function (e) { return e.getText(); })
    };
}
exports.fromExtendsClauseableNode = fromExtendsClauseableNode;
function fromImplementsClauseableNode(node) {
    var implementsNodes = node.getImplements();
    return {
        implements: implementsNodes.length === 0 ? undefined : implementsNodes.map(function (e) { return e.getText(); })
    };
}
exports.fromImplementsClauseableNode = fromImplementsClauseableNode;
function fromQuestionTokenableNode(node) {
    return {
        hasQuestionToken: node.hasQuestionToken()
    };
}
exports.fromQuestionTokenableNode = fromQuestionTokenableNode;
function fromReadonlyableNode(node) {
    return {
        isReadonly: node.isReadonly()
    };
}
exports.fromReadonlyableNode = fromReadonlyableNode;
function fromTypedNode(node) {
    var typeNode = node.getTypeNode();
    return {
        type: typeNode == null ? undefined : typeNode.getText()
    };
}
exports.fromTypedNode = fromTypedNode;
function fromInitializerExpressionableNode(node) {
    var initializer = node.getInitializer();
    return {
        initializer: initializer == null ? undefined : initializer.getText()
    };
}
exports.fromInitializerExpressionableNode = fromInitializerExpressionableNode;
function fromNamedNode(node) {
    return {
        name: node.getName()
    };
}
exports.fromNamedNode = fromNamedNode;
