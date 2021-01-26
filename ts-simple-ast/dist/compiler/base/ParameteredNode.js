"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var callBaseFill_1 = require("../callBaseFill");
function ParameteredNode(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getParameter = function (nameOrFindFunction) {
            return utils_1.getNodeByNameOrFindFunction(this.getParameters(), nameOrFindFunction);
        };
        class_1.prototype.getParameterOrThrow = function (nameOrFindFunction) {
            return errors.throwIfNullOrUndefined(this.getParameter(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("parameter", nameOrFindFunction); });
        };
        class_1.prototype.getParameters = function () {
            var _this = this;
            return this.compilerNode.parameters.map(function (p) { return _this.getNodeFromCompilerNode(p); });
        };
        class_1.prototype.addParameter = function (structure) {
            return this.addParameters([structure])[0];
        };
        class_1.prototype.addParameters = function (structures) {
            return this.insertParameters(manipulation_1.getEndIndexFromArray(this.compilerNode.parameters), structures);
        };
        class_1.prototype.insertParameter = function (index, structure) {
            return this.insertParameters(index, [structure])[0];
        };
        class_1.prototype.insertParameters = function (index, structures) {
            if (utils_1.ArrayUtils.isNullOrEmpty(structures))
                return [];
            var parameters = this.getParameters();
            var syntaxList = this.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.OpenParenToken).getNextSiblingIfKindOrThrow(typescript_1.SyntaxKind.SyntaxList);
            index = manipulation_1.verifyAndGetIndex(index, parameters.length);
            var writer = this.getWriterWithQueuedChildIndentation();
            var structurePrinter = this.global.structurePrinterFactory.forParameterDeclaration();
            structurePrinter.printTexts(writer, structures);
            manipulation_1.insertIntoCommaSeparatedNodes({
                parent: syntaxList,
                currentNodes: parameters,
                insertIndex: index,
                newText: writer.toString()
            });
            return manipulation_1.getNodesToReturn(this.getParameters(), index, structures.length);
        };
        class_1.prototype.fill = function (structure) {
            callBaseFill_1.callBaseFill(Base.prototype, this, structure);
            if (structure.parameters != null && structure.parameters.length > 0)
                this.addParameters(structure.parameters);
            return this;
        };
        return class_1;
    }(Base));
}
exports.ParameteredNode = ParameteredNode;
