"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var callBaseFill_1 = require("../callBaseFill");
function DecoratableNode(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getDecorator = function (nameOrFindFunction) {
            return utils_1.getNodeByNameOrFindFunction(this.getDecorators(), nameOrFindFunction);
        };
        class_1.prototype.getDecoratorOrThrow = function (nameOrFindFunction) {
            return errors.throwIfNullOrUndefined(this.getDecorator(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("decorator", nameOrFindFunction); });
        };
        class_1.prototype.getDecorators = function () {
            var _this = this;
            if (this.compilerNode.decorators == null)
                return [];
            return this.compilerNode.decorators.map(function (d) { return _this.getNodeFromCompilerNode(d); });
        };
        class_1.prototype.addDecorator = function (structure) {
            return this.insertDecorator(manipulation_1.getEndIndexFromArray(this.compilerNode.decorators), structure);
        };
        class_1.prototype.addDecorators = function (structures) {
            return this.insertDecorators(manipulation_1.getEndIndexFromArray(this.compilerNode.decorators), structures);
        };
        class_1.prototype.insertDecorator = function (index, structure) {
            return this.insertDecorators(index, [structure])[0];
        };
        class_1.prototype.insertDecorators = function (index, structures) {
            if (utils_1.ArrayUtils.isNullOrEmpty(structures))
                return [];
            var decoratorLines = getDecoratorLines(this, structures);
            var decorators = this.getDecorators();
            index = manipulation_1.verifyAndGetIndex(index, decorators.length);
            var formattingKind = getDecoratorFormattingKind(this, decorators);
            var previousDecorator = decorators[index - 1];
            var decoratorCode = manipulation_1.getNewInsertCode({
                structures: structures,
                newCodes: decoratorLines,
                parent: this,
                indentationText: this.getIndentationText(),
                getSeparator: function () { return formattingKind; },
                previousFormattingKind: previousDecorator == null ? manipulation_1.FormattingKind.None : formattingKind,
                nextFormattingKind: previousDecorator == null ? formattingKind : manipulation_1.FormattingKind.None
            });
            manipulation_1.insertIntoParentTextRange({
                parent: decorators.length === 0 ? this : decorators[0].getParentSyntaxListOrThrow(),
                insertPos: decorators[index - 1] == null ? this.getStart() : decorators[index - 1].getEnd(),
                newText: decoratorCode
            });
            return manipulation_1.getNodesToReturn(this.getDecorators(), index, structures.length);
        };
        class_1.prototype.fill = function (structure) {
            callBaseFill_1.callBaseFill(Base.prototype, this, structure);
            if (structure.decorators != null && structure.decorators.length > 0)
                this.addDecorators(structure.decorators);
            return this;
        };
        return class_1;
    }(Base));
}
exports.DecoratableNode = DecoratableNode;
function getDecoratorLines(node, structures) {
    var e_1, _a;
    var lines = [];
    try {
        for (var structures_1 = tslib_1.__values(structures), structures_1_1 = structures_1.next(); !structures_1_1.done; structures_1_1 = structures_1.next()) {
            var structure = structures_1_1.value;
            // todo: temporary code... refactor this later
            var writer = node.getWriter();
            var structurePrinter = node.global.structurePrinterFactory.forDecorator();
            structurePrinter.printText(writer, structure);
            lines.push(writer.toString());
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (structures_1_1 && !structures_1_1.done && (_a = structures_1.return)) _a.call(structures_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return lines;
}
function getDecoratorFormattingKind(parent, currentDecorators) {
    var sameLine = areDecoratorsOnSameLine(parent, currentDecorators);
    return sameLine ? manipulation_1.FormattingKind.Space : manipulation_1.FormattingKind.Newline;
}
function areDecoratorsOnSameLine(parent, currentDecorators) {
    if (currentDecorators.length <= 1)
        return parent.getKind() === typescript_1.SyntaxKind.Parameter;
    var startLinePos = currentDecorators[0].getStartLinePos();
    for (var i = 1; i < currentDecorators.length; i++) {
        if (currentDecorators[i].getStartLinePos() !== startLinePos)
            return false;
    }
    return true;
}
