"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// todo: tests
function getNextMatchingPos(text, pos, condition) {
    while (pos < text.length) {
        var char = text[pos];
        if (!condition(char))
            pos++;
        else
            break;
    }
    return pos;
}
exports.getNextMatchingPos = getNextMatchingPos;
