"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPosAfterNewLine(text, pos) {
    while (pos < text.length) {
        if (text[pos] === "\n")
            return pos + 1;
        pos++;
    }
    return pos;
}
exports.getPosAfterNewLine = getPosAfterNewLine;
