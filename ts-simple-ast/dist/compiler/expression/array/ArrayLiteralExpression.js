"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../../errors");
var manipulation_1 = require("../../../manipulation");
var structurePrinters_1 = require("../../../structurePrinters");
var typescript_1 = require("../../../typescript");
var PrimaryExpression_1 = require("../PrimaryExpression");
var ArrayLiteralExpression = /** @class */ (function (_super) {
    tslib_1.__extends(ArrayLiteralExpression, _super);
    function ArrayLiteralExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the array's elements.
     */
    ArrayLiteralExpression.prototype.getElements = function () {
        var _this = this;
        return this.compilerNode.elements.map(function (e) { return _this.getNodeFromCompilerNode(e); });
    };
    /**
     * Adds an element to the array.
     * @param text - Text to add as an element.
     * @param options - Options.
     */
    ArrayLiteralExpression.prototype.addElement = function (text, options) {
        return this.addElements([text], options)[0];
    };
    /**
     * Adds elements to the array.
     * @param texts - Texts to add as elements.
     * @param options - Options.
     */
    ArrayLiteralExpression.prototype.addElements = function (texts, options) {
        return this.insertElements(this.compilerNode.elements.length, texts, options);
    };
    /**
     * Insert an element into the array.
     * @param index - Index to insert at.
     * @param text - Text to insert as an element.
     * @param options - Options.
     */
    ArrayLiteralExpression.prototype.insertElement = function (index, text, options) {
        return this.insertElements(index, [text], options)[0];
    };
    ArrayLiteralExpression.prototype.insertElements = function (index, textsOrWriterFunction, options) {
        if (options === void 0) { options = {}; }
        var elements = this.getElements();
        index = manipulation_1.verifyAndGetIndex(index, elements.length);
        var useNewLines = getUseNewLines(this);
        var writer = useNewLines ? this.getWriterWithChildIndentation() : this.getWriterWithQueuedChildIndentation();
        var stringStructurePrinter = new structurePrinters_1.StringStructurePrinter();
        var structurePrinter = useNewLines ?
            new structurePrinters_1.CommaNewLineSeparatedStructuresPrinter(stringStructurePrinter) :
            new structurePrinters_1.CommaSeparatedStructuresPrinter(stringStructurePrinter);
        structurePrinter.printText(writer, textsOrWriterFunction instanceof Function ? [textsOrWriterFunction] : textsOrWriterFunction);
        return insertTexts(this);
        function insertTexts(node) {
            manipulation_1.insertIntoCommaSeparatedNodes({
                parent: node.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.SyntaxList),
                currentNodes: elements,
                insertIndex: index,
                newText: writer.toString(),
                useNewLines: useNewLines
            });
            var newElements = node.getElements();
            return manipulation_1.getNodesToReturn(newElements, index, newElements.length - elements.length);
        }
        function getUseNewLines(node) {
            if (options.useNewLines != null)
                return options.useNewLines;
            if (elements.length > 1)
                return allElementsOnDifferentLines();
            return node.getStartLineNumber() !== node.getEndLineNumber();
            function allElementsOnDifferentLines() {
                var previousLine = elements[0].getStartLineNumber();
                for (var i = 1; i < elements.length; i++) {
                    var currentLine = elements[i].getStartLineNumber();
                    if (previousLine === currentLine)
                        return false;
                    previousLine = currentLine;
                }
                return true;
            }
        }
    };
    ArrayLiteralExpression.prototype.removeElement = function (elementOrIndex) {
        var elements = this.getElements();
        if (elements.length === 0)
            throw new errors.InvalidOperationError("Cannot remove an element when none exist.");
        var elementToRemove = typeof elementOrIndex === "number" ? getElementFromIndex(elementOrIndex) : elementOrIndex;
        manipulation_1.removeCommaSeparatedChild(elementToRemove);
        function getElementFromIndex(index) {
            return elements[manipulation_1.verifyAndGetIndex(index, elements.length - 1)];
        }
    };
    return ArrayLiteralExpression;
}(PrimaryExpression_1.PrimaryExpression));
exports.ArrayLiteralExpression = ArrayLiteralExpression;
