"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../../errors");
var manipulation_1 = require("../../../manipulation");
var structurePrinters_1 = require("../../../structurePrinters");
var typescript_1 = require("../../../typescript");
var utils_1 = require("../../../utils");
function JsxAttributedNode(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getAttributes = function () {
            var _this = this;
            return this.compilerNode.attributes.properties.map(function (p) { return _this.getNodeFromCompilerNode(p); });
        };
        class_1.prototype.getAttributeOrThrow = function (nameOrFindFunction) {
            return errors.throwIfNullOrUndefined(this.getAttribute(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("attribute", nameOrFindFunction); });
        };
        class_1.prototype.getAttribute = function (nameOrFindFunction) {
            return utils_1.getNodeByNameOrFindFunction(this.getAttributes(), nameOrFindFunction);
        };
        class_1.prototype.addAttribute = function (structure) {
            return this.addAttributes([structure])[0];
        };
        class_1.prototype.addAttributes = function (structures) {
            return this.insertAttributes(this.compilerNode.attributes.properties.length, structures);
        };
        class_1.prototype.insertAttribute = function (index, structure) {
            return this.insertAttributes(index, [structure])[0];
        };
        class_1.prototype.insertAttributes = function (index, structures) {
            if (structures.length === 0)
                return [];
            index = manipulation_1.verifyAndGetIndex(index, this.compilerNode.attributes.properties.length);
            var insertPos = index === 0 ? this.getTagName().getEnd() : this.getAttributes()[index - 1].getEnd();
            var writer = this.getWriterWithQueuedChildIndentation();
            var structuresPrinter = new structurePrinters_1.SpaceFormattingStructuresPrinter(this.global.structurePrinterFactory.forJsxAttribute());
            structuresPrinter.printText(writer, structures);
            manipulation_1.insertIntoParentTextRange({
                insertPos: insertPos,
                newText: " " + writer.toString(),
                parent: this.getNodeProperty("attributes").getFirstChildByKindOrThrow(typescript_1.SyntaxKind.SyntaxList)
            });
            return manipulation_1.getNodesToReturn(this.getAttributes(), index, structures.length);
        };
        return class_1;
    }(Base));
}
exports.JsxAttributedNode = JsxAttributedNode;
