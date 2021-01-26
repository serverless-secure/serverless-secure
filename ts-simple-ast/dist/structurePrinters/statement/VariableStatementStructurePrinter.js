"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var VariableDeclarationKind_1 = require("../../compiler/statement/VariableDeclarationKind");
var FactoryStructurePrinter_1 = require("../FactoryStructurePrinter");
var formatting_1 = require("../formatting");
var VariableStatementStructurePrinter = /** @class */ (function (_super) {
    tslib_1.__extends(VariableStatementStructurePrinter, _super);
    function VariableStatementStructurePrinter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.multipleWriter = new formatting_1.NewLineFormattingStructuresPrinter(_this);
        return _this;
    }
    VariableStatementStructurePrinter.prototype.printTexts = function (writer, structures) {
        this.multipleWriter.printText(writer, structures);
    };
    VariableStatementStructurePrinter.prototype.printText = function (writer, structure) {
        this.factory.forJSDoc().printDocs(writer, structure.docs);
        this.factory.forModifierableNode().printText(writer, structure);
        writer.write((structure.declarationKind || VariableDeclarationKind_1.VariableDeclarationKind.Let) + " ");
        this.factory.forVariableDeclaration().printTexts(writer, structure.declarations);
        writer.write(";");
    };
    return VariableStatementStructurePrinter;
}(FactoryStructurePrinter_1.FactoryStructurePrinter));
exports.VariableStatementStructurePrinter = VariableStatementStructurePrinter;
