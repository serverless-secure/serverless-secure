"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var callBaseFill_1 = require("../callBaseFill");
function ReturnTypedNode(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getReturnType = function () {
            var typeChecker = this.global.typeChecker;
            var signature = typeChecker.getSignatureFromNode(this); // should always return a signature
            return signature.getReturnType();
        };
        class_1.prototype.getReturnTypeNode = function () {
            return this.getNodeFromCompilerNodeIfExists(this.compilerNode.type);
        };
        class_1.prototype.getReturnTypeNodeOrThrow = function () {
            return errors.throwIfNullOrUndefined(this.getReturnTypeNode(), "Expected to find a return type node.");
        };
        class_1.prototype.setReturnType = function (textOrWriterFunction) {
            var text = utils_1.getTextFromStringOrWriter(this.getWriterWithQueuedChildIndentation(), textOrWriterFunction);
            if (utils_1.StringUtils.isNullOrWhitespace(text))
                return this.removeReturnType();
            var returnTypeNode = this.getReturnTypeNode();
            if (returnTypeNode != null && returnTypeNode.getText() === text)
                return this;
            // insert new type
            manipulation_1.insertIntoParentTextRange({
                parent: this,
                insertPos: returnTypeNode != null ? returnTypeNode.getStart() : this.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.CloseParenToken).getEnd(),
                newText: returnTypeNode != null ? text : ": " + text,
                replacing: {
                    textLength: returnTypeNode == null ? 0 : returnTypeNode.getWidth()
                }
            });
            return this;
        };
        class_1.prototype.fill = function (structure) {
            callBaseFill_1.callBaseFill(Base.prototype, this, structure);
            if (structure.returnType != null)
                this.setReturnType(structure.returnType);
            return this;
        };
        class_1.prototype.removeReturnType = function () {
            var returnTypeNode = this.getReturnTypeNode();
            if (returnTypeNode == null)
                return this;
            var colonToken = returnTypeNode.getPreviousSiblingIfKindOrThrow(typescript_1.SyntaxKind.ColonToken);
            manipulation_1.removeChildren({ children: [colonToken, returnTypeNode], removePrecedingSpaces: true });
            return this;
        };
        return class_1;
    }(Base));
}
exports.ReturnTypedNode = ReturnTypedNode;
