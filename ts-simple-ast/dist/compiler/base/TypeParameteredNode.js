"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var callBaseFill_1 = require("../callBaseFill");
function TypeParameteredNode(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getTypeParameter = function (nameOrFindFunction) {
            return utils_1.getNodeByNameOrFindFunction(this.getTypeParameters(), nameOrFindFunction);
        };
        class_1.prototype.getTypeParameterOrThrow = function (nameOrFindFunction) {
            return errors.throwIfNullOrUndefined(this.getTypeParameter(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("type parameter", nameOrFindFunction); });
        };
        class_1.prototype.getTypeParameters = function () {
            var _this = this;
            var typeParameters = this.compilerNode.typeParameters;
            if (typeParameters == null)
                return [];
            return typeParameters.map(function (t) { return _this.getNodeFromCompilerNode(t); });
        };
        class_1.prototype.addTypeParameter = function (structure) {
            return this.addTypeParameters([structure])[0];
        };
        class_1.prototype.addTypeParameters = function (structures) {
            return this.insertTypeParameters(manipulation_1.getEndIndexFromArray(this.compilerNode.typeParameters), structures);
        };
        class_1.prototype.insertTypeParameter = function (index, structure) {
            return this.insertTypeParameters(index, [structure])[0];
        };
        class_1.prototype.insertTypeParameters = function (index, structures) {
            if (utils_1.ArrayUtils.isNullOrEmpty(structures))
                return [];
            var typeParameters = this.getTypeParameters();
            var writer = this.getWriterWithQueuedChildIndentation();
            var structurePrinter = this.global.structurePrinterFactory.forTypeParameterDeclaration();
            index = manipulation_1.verifyAndGetIndex(index, typeParameters.length);
            structurePrinter.printTexts(writer, structures);
            if (typeParameters.length === 0) {
                manipulation_1.insertIntoParentTextRange({
                    insertPos: getInsertPos(this),
                    parent: this,
                    newText: "<" + writer.toString() + ">"
                });
            }
            else {
                manipulation_1.insertIntoCommaSeparatedNodes({
                    parent: this.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.LessThanToken).getNextSiblingIfKindOrThrow(typescript_1.SyntaxKind.SyntaxList),
                    currentNodes: typeParameters,
                    insertIndex: index,
                    newText: writer.toString()
                });
            }
            return manipulation_1.getNodesToReturn(this.getTypeParameters(), index, structures.length);
        };
        class_1.prototype.fill = function (structure) {
            callBaseFill_1.callBaseFill(Base.prototype, this, structure);
            if (structure.typeParameters != null && structure.typeParameters.length > 0)
                this.addTypeParameters(structure.typeParameters);
            return this;
        };
        return class_1;
    }(Base));
}
exports.TypeParameteredNode = TypeParameteredNode;
function getInsertPos(node) {
    var namedNode = node;
    if (namedNode.getNameNode != null)
        return namedNode.getNameNode().getEnd();
    else if (utils_1.TypeGuards.isCallSignatureDeclaration(node) || utils_1.TypeGuards.isFunctionTypeNode(node))
        return node.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.OpenParenToken).getStart();
    else
        throw new errors.NotImplementedError("Not implemented scenario inserting type parameters for node with kind " + node.getKindName() + ".");
}
