"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var codeBlockWriter_1 = require("../../codeBlockWriter");
var utils_1 = require("../../utils");
var FactoryStructurePrinter_1 = require("../FactoryStructurePrinter");
var JSDocStructurePrinter = /** @class */ (function (_super) {
    tslib_1.__extends(JSDocStructurePrinter, _super);
    function JSDocStructurePrinter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JSDocStructurePrinter.prototype.printText = function (writer, structure) {
        var e_1, _a;
        var lines = getText().split(/\r?\n/);
        writer.writeLine("/**");
        try {
            for (var lines_1 = tslib_1.__values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                var line = lines_1_1.value;
                writer.writeLine(" * " + line);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        writer.write(" */");
        function getText() {
            if (typeof structure === "string")
                return structure;
            return utils_1.getTextFromStringOrWriter(new codeBlockWriter_1.CodeBlockWriter(writer.getOptions()), structure.description);
        }
    };
    JSDocStructurePrinter.prototype.printDocs = function (writer, structures) {
        var e_2, _a;
        if (structures == null)
            return;
        try {
            for (var structures_1 = tslib_1.__values(structures), structures_1_1 = structures_1.next(); !structures_1_1.done; structures_1_1 = structures_1.next()) {
                var structure = structures_1_1.value;
                this.printText(writer, structure);
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
    return JSDocStructurePrinter;
}(FactoryStructurePrinter_1.FactoryStructurePrinter));
exports.JSDocStructurePrinter = JSDocStructurePrinter;
