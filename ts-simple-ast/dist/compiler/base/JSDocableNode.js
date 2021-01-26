"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var manipulation_1 = require("../../manipulation");
var utils_1 = require("../../utils");
var callBaseFill_1 = require("../callBaseFill");
function JSDocableNode(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getJsDocs = function () {
            var _this = this;
            var nodes = this.compilerNode.jsDoc;
            if (nodes == null)
                return [];
            return nodes.map(function (n) { return _this.getNodeFromCompilerNode(n); });
        };
        class_1.prototype.addJsDoc = function (structure) {
            return this.addJsDocs([structure])[0];
        };
        class_1.prototype.addJsDocs = function (structures) {
            return this.insertJsDocs(manipulation_1.getEndIndexFromArray(this.compilerNode.jsDoc), structures);
        };
        class_1.prototype.insertJsDoc = function (index, structure) {
            return this.insertJsDocs(index, [structure])[0];
        };
        class_1.prototype.insertJsDocs = function (index, structures) {
            if (utils_1.ArrayUtils.isNullOrEmpty(structures))
                return [];
            var writer = this.getWriterWithQueuedIndentation();
            var structurePrinter = this.global.structurePrinterFactory.forJSDoc();
            structurePrinter.printDocs(writer, structures);
            writer.write(""); // final indentation
            var code = writer.toString();
            var nodes = this.getJsDocs();
            index = manipulation_1.verifyAndGetIndex(index, nodes.length);
            var insertPos = index === nodes.length ? this.getStart() : nodes[index].getStart();
            manipulation_1.insertIntoParentTextRange({
                insertPos: insertPos,
                parent: this,
                newText: code
            });
            return manipulation_1.getNodesToReturn(this.getJsDocs(), index, structures.length);
        };
        class_1.prototype.fill = function (structure) {
            callBaseFill_1.callBaseFill(Base.prototype, this, structure);
            if (structure.docs != null && structure.docs.length > 0)
                this.addJsDocs(structure.docs);
            return this;
        };
        return class_1;
    }(Base));
}
exports.JSDocableNode = JSDocableNode;
