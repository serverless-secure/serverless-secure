"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatting_1 = require("../formatting");
var textChecks_1 = require("../textChecks");
var textSeek_1 = require("../textSeek");
var getSpacingBetweenNodes_1 = require("./getSpacingBetweenNodes");
var getTextForError_1 = require("./getTextForError");
var RemoveChildrenWithFormattingTextManipulator = /** @class */ (function () {
    function RemoveChildrenWithFormattingTextManipulator(opts) {
        this.opts = opts;
    }
    RemoveChildrenWithFormattingTextManipulator.prototype.getNewText = function (inputText) {
        var _a = this.opts, children = _a.children, getSiblingFormatting = _a.getSiblingFormatting;
        var parent = children[0].getParentOrThrow();
        var sourceFile = parent.getSourceFile();
        var fullText = sourceFile.getFullText();
        var newLineKind = sourceFile.global.manipulationSettings.getNewLineKindAsString();
        var previousSibling = children[0].getPreviousSibling();
        var nextSibling = children[children.length - 1].getNextSibling();
        var removalPos = getRemovalPos();
        this.removalPos = removalPos;
        // console.log(JSON.stringify(fullText.substring(0, removalPos)));
        // console.log(JSON.stringify(fullText.substring(getRemovalEnd())));
        return getPrefix() + getSpacing() + getSuffix();
        function getPrefix() {
            return fullText.substring(0, removalPos);
        }
        function getSpacing() {
            return getSpacingBetweenNodes_1.getSpacingBetweenNodes({
                parent: parent,
                previousSibling: previousSibling,
                nextSibling: nextSibling,
                newLineKind: newLineKind,
                getSiblingFormatting: getSiblingFormatting
            });
        }
        function getSuffix() {
            return fullText.substring(getRemovalEnd());
        }
        function getRemovalPos() {
            if (previousSibling != null) {
                var trailingEnd = previousSibling.getTrailingTriviaEnd();
                return textChecks_1.isNewLineAtPos(fullText, trailingEnd) ? trailingEnd : previousSibling.getEnd();
            }
            if (parent.getPos() === children[0].getPos())
                return children[0].getNonWhitespaceStart(); // do not shift the parent
            return children[0].isFirstNodeOnLine() ? children[0].getPos() : children[0].getNonWhitespaceStart();
        }
        function getRemovalEnd() {
            if (previousSibling != null && nextSibling != null) {
                var nextSiblingFormatting = getSiblingFormatting(parent, nextSibling);
                if (nextSiblingFormatting === formatting_1.FormattingKind.Blankline || nextSiblingFormatting === formatting_1.FormattingKind.Newline)
                    return textSeek_1.getPosAtStartOfLineOrNonWhitespace(fullText, nextSibling.getNonWhitespaceStart());
                return nextSibling.getNonWhitespaceStart();
            }
            if (parent.getEnd() === children[children.length - 1].getEnd())
                return children[children.length - 1].getEnd(); // do not shift the parent
            var triviaEnd = children[children.length - 1].getTrailingTriviaEnd();
            if (textChecks_1.isNewLineAtPos(fullText, triviaEnd)) {
                if (previousSibling == null && children[0].getPos() === 0)
                    return textSeek_1.getPosAtNextNonBlankLine(fullText, triviaEnd);
                return textSeek_1.getPosAtEndOfPreviousLine(fullText, textSeek_1.getPosAtNextNonBlankLine(fullText, triviaEnd));
            }
            if (previousSibling == null)
                return triviaEnd;
            else
                return children[children.length - 1].getEnd();
        }
    };
    RemoveChildrenWithFormattingTextManipulator.prototype.getTextForError = function (newText) {
        return getTextForError_1.getTextForError(newText, this.removalPos);
    };
    return RemoveChildrenWithFormattingTextManipulator;
}());
exports.RemoveChildrenWithFormattingTextManipulator = RemoveChildrenWithFormattingTextManipulator;
