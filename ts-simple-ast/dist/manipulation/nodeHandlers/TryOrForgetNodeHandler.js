"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors = require("../../errors");
var utils_1 = require("../../utils");
/**
 * Attempts to use a node handler, but if it fails it will forget all the nodes' children.
 */
var TryOrForgetNodeHandler = /** @class */ (function () {
    function TryOrForgetNodeHandler(handler) {
        this.handler = handler;
    }
    TryOrForgetNodeHandler.prototype.handleNode = function (currentNode, newNode, newSourceFile) {
        /* istanbul ignore next */
        if (!utils_1.TypeGuards.isSourceFile(currentNode))
            throw new errors.InvalidOperationError("Can only use a " + "TryOrForgetNodeHandler" + " with a source file.");
        try {
            this.handler.handleNode(currentNode, newNode, newSourceFile);
        }
        catch (ex) {
            currentNode.global.logger.warn("Could not replace tree, so forgetting all nodes instead. Message: " + ex);
            // forget all the source file's nodes
            currentNode.getChildSyntaxListOrThrow().forget();
            // replace the source file with the temporary source file
            currentNode.global.compilerFactory.replaceCompilerNode(currentNode, newNode);
        }
    };
    return TryOrForgetNodeHandler;
}());
exports.TryOrForgetNodeHandler = TryOrForgetNodeHandler;
