"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../../errors");
var typescript_1 = require("../../../typescript");
var ReferenceFindableNode_1 = require("./ReferenceFindableNode");
function DeclarationNamedNode(Base) {
    return DeclarationNamedNodeInternal(ReferenceFindableNode_1.ReferenceFindableNode(Base));
}
exports.DeclarationNamedNode = DeclarationNamedNode;
function DeclarationNamedNodeInternal(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getNameNodeOrThrow = function () {
            var nameNode = this.getNameNode();
            if (nameNode == null)
                throw new errors.InvalidOperationError("Expected a name node.");
            return nameNode;
        };
        class_1.prototype.getNameNode = function () {
            var compilerNameNode = this.compilerNode.name;
            if (compilerNameNode == null)
                return undefined;
            switch (compilerNameNode.kind) {
                case typescript_1.SyntaxKind.Identifier:
                    return this.getNodeFromCompilerNode(compilerNameNode);
                /* istanbul ignore next */
                default:
                    throw errors.getNotImplementedForSyntaxKindError(compilerNameNode.kind);
            }
        };
        class_1.prototype.getNameOrThrow = function () {
            return errors.throwIfNullOrUndefined(this.getName(), "Expected to find a name.");
        };
        class_1.prototype.getName = function () {
            var nameNode = this.getNameNode();
            return nameNode == null ? undefined : nameNode.getText();
        };
        class_1.prototype.rename = function (text) {
            errors.throwIfNotStringOrWhitespace(text, "text");
            var nameNode = this.getNameNode();
            if (nameNode == null)
                throw errors.getNotImplementedForSyntaxKindError(this.getKind());
            nameNode.rename(text);
            return this;
        };
        return class_1;
    }(Base));
}
