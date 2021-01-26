"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatting_1 = require("../formatting");
// todo: seems like this should be renamed or removed?
function getNewInsertCode(opts) {
    var structures = opts.structures, newCodes = opts.newCodes, parent = opts.parent, getSeparator = opts.getSeparator, previousFormattingKind = opts.previousFormattingKind, nextFormattingKind = opts.nextFormattingKind;
    var indentationText = opts.indentationText == null ? parent.getChildIndentationText() : opts.indentationText;
    var newLineKind = parent.global.manipulationSettings.getNewLineKindAsString();
    return getFormattingKindTextWithIndent(previousFormattingKind) + getChildCode() + getFormattingKindTextWithIndent(nextFormattingKind);
    function getChildCode() {
        var code = newCodes[0];
        for (var i = 1; i < newCodes.length; i++) {
            var formattingKind = getSeparator(structures[i - 1], structures[i]);
            code += getFormattingKindTextWithIndent(formattingKind);
            code += newCodes[i];
        }
        return code;
    }
    function getFormattingKindTextWithIndent(formattingKind) {
        var code = formatting_1.getFormattingKindText(formattingKind, { newLineKind: newLineKind });
        if (formattingKind === formatting_1.FormattingKind.Newline || formattingKind === formatting_1.FormattingKind.Blankline)
            code += indentationText;
        return code;
    }
}
exports.getNewInsertCode = getNewInsertCode;
