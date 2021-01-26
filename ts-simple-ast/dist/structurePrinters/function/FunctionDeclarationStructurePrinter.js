"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../utils");
var FactoryStructurePrinter_1 = require("../FactoryStructurePrinter");
var FunctionDeclarationStructurePrinter = /** @class */ (function (_super) {
    tslib_1.__extends(FunctionDeclarationStructurePrinter, _super);
    function FunctionDeclarationStructurePrinter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunctionDeclarationStructurePrinter.prototype.printTexts = function (writer, structures) {
        if (structures == null)
            return;
        for (var i = 0; i < structures.length; i++) {
            var currentStructure = structures[i];
            if (i > 0) {
                var previousStructure = structures[i - 1];
                if (previousStructure.hasDeclareKeyword && currentStructure.hasDeclareKeyword)
                    writer.newLine();
                else
                    writer.blankLine();
            }
            this.printText(writer, currentStructure);
        }
    };
    FunctionDeclarationStructurePrinter.prototype.printText = function (writer, structure) {
        var _this = this;
        this.printOverloads(writer, structure.name, getOverloadStructures());
        this.printBase(writer, structure.name, structure);
        if (structure.hasDeclareKeyword)
            writer.write(";");
        else
            writer.space().inlineBlock(function () {
                _this.factory.forBodyText({ isAmbient: false }).printText(writer, structure);
            });
        function getOverloadStructures() {
            var e_1, _a;
            // all the overloads need to have similar properties as the implementation
            var overloads = utils_1.ObjectUtils.clone(structure.overloads);
            if (overloads == null || overloads.length === 0)
                return;
            try {
                for (var overloads_1 = tslib_1.__values(overloads), overloads_1_1 = overloads_1.next(); !overloads_1_1.done; overloads_1_1 = overloads_1.next()) {
                    var overload = overloads_1_1.value;
                    utils_1.setValueIfUndefined(overload, "hasDeclareKeyword", structure.hasDeclareKeyword);
                    utils_1.setValueIfUndefined(overload, "isExported", structure.isExported);
                    utils_1.setValueIfUndefined(overload, "isDefaultExport", structure.isDefaultExport);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (overloads_1_1 && !overloads_1_1.done && (_a = overloads_1.return)) _a.call(overloads_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return overloads;
        }
    };
    FunctionDeclarationStructurePrinter.prototype.printOverloads = function (writer, name, structures) {
        var e_2, _a;
        if (structures == null || structures.length === 0)
            return;
        try {
            for (var structures_1 = tslib_1.__values(structures), structures_1_1 = structures_1.next(); !structures_1_1.done; structures_1_1 = structures_1.next()) {
                var structure = structures_1_1.value;
                this.printOverload(writer, name, structure);
                writer.newLine();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (structures_1_1 && !structures_1_1.done && (_a = structures_1.return)) _a.call(structures_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    FunctionDeclarationStructurePrinter.prototype.printOverload = function (writer, name, structure) {
        this.printBase(writer, name, structure);
        writer.write(";");
    };
    FunctionDeclarationStructurePrinter.prototype.printBase = function (writer, name, structure) {
        this.factory.forJSDoc().printDocs(writer, structure.docs);
        this.factory.forModifierableNode().printText(writer, structure);
        writer.write("function");
        writer.conditionalWrite(structure.isGenerator, "*");
        writer.write(" " + name);
        this.factory.forTypeParameterDeclaration().printTextsWithBrackets(writer, structure.typeParameters);
        writer.write("(");
        if (structure.parameters != null)
            this.factory.forParameterDeclaration().printTexts(writer, structure.parameters);
        writer.write(")");
        this.factory.forReturnTypedNode().printText(writer, structure);
    };
    return FunctionDeclarationStructurePrinter;
}(FactoryStructurePrinter_1.FactoryStructurePrinter));
exports.FunctionDeclarationStructurePrinter = FunctionDeclarationStructurePrinter;
