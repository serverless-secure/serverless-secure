"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isBlankLineAtPos(sourceFile, pos) {
    var fullText = sourceFile.getFullText();
    var foundBlankLine = false;
    for (var i = pos; i < fullText.length; i++) {
        var char = fullText[i];
        if (char === " " || char === "\t")
            continue;
        if (char === "\r" && fullText[i + 1] === "\n" || char === "\n") {
            if (foundBlankLine)
                return true;
            foundBlankLine = true;
            if (char === "\r")
                i++;
            continue;
        }
        return false;
    }
    return false;
}
exports.isBlankLineAtPos = isBlankLineAtPos;
