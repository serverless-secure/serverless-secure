"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../utils");
var textSeek_1 = require("../textSeek");
var getSpacingBetweenNodes_1 = require("./getSpacingBetweenNodes");
var ChangingChildOrderTextManipulator = /** @class */ (function () {
    function ChangingChildOrderTextManipulator(opts) {
        this.opts = opts;
    }
    ChangingChildOrderTextManipulator.prototype.getNewText = function (inputText) {
        var _a = this.opts, parent = _a.parent, oldIndex = _a.oldIndex, newIndex = _a.newIndex, getSiblingFormatting = _a.getSiblingFormatting;
        var children = parent.getChildren();
        var newLineKind = parent.global.manipulationSettings.getNewLineKindAsString();
        var movingNode = children[oldIndex];
        var fullText = parent.sourceFile.getFullText();
        var movingNodeStart = textSeek_1.getPosAtNextNonBlankLine(fullText, movingNode.getPos());
        var movingNodeText = fullText.substring(movingNodeStart, movingNode.getEnd());
        var lowerIndex = Math.min(newIndex, oldIndex);
        var upperIndex = Math.max(newIndex, oldIndex);
        var childrenInNewOrder = getChildrenInNewOrder();
        var isParentSourceFile = utils_1.TypeGuards.isSourceFile(parent.getParentOrThrow());
        var finalText = "";
        fillPrefixText();
        fillTextForIndex(lowerIndex);
        fillMiddleText();
        fillTextForIndex(upperIndex);
        fillSuffixText();
        return finalText;
        function getChildrenInNewOrder() {
            var result = tslib_1.__spread(children);
            result.splice(oldIndex, 1);
            result.splice(newIndex, 0, movingNode);
            return result;
        }
        function fillPrefixText() {
            finalText += fullText.substring(0, children[lowerIndex].getPos());
            if (lowerIndex === 0 && !isParentSourceFile)
                finalText += newLineKind;
        }
        function fillMiddleText() {
            var startPos;
            var endPos;
            if (lowerIndex === oldIndex) {
                startPos = textSeek_1.getPosAtNextNonBlankLine(fullText, children[lowerIndex].getEnd());
                endPos = children[upperIndex].getEnd();
            }
            else {
                startPos = textSeek_1.getPosAtNextNonBlankLine(fullText, children[lowerIndex].getPos());
                endPos = children[upperIndex].getPos();
            }
            finalText += fullText.substring(startPos, endPos);
        }
        function fillSuffixText() {
            if (children.length - 1 === upperIndex && !isParentSourceFile)
                finalText += newLineKind;
            finalText += fullText.substring(textSeek_1.getPosAtNextNonBlankLine(fullText, children[upperIndex].getEnd()));
        }
        function fillTextForIndex(index) {
            if (index === oldIndex)
                fillSpacingForRemoval();
            else {
                fillSpacingBeforeInsertion();
                finalText += movingNodeText;
                fillSpacingAfterInsertion();
            }
        }
        function fillSpacingForRemoval() {
            if (oldIndex === 0 || oldIndex === children.length - 1)
                return;
            fillSpacingCommon({
                previousSibling: childrenInNewOrder[oldIndex - 1],
                nextSibling: childrenInNewOrder[oldIndex]
            });
        }
        function fillSpacingBeforeInsertion() {
            if (newIndex === 0)
                return;
            fillSpacingCommon({
                previousSibling: childrenInNewOrder[newIndex - 1],
                nextSibling: childrenInNewOrder[newIndex]
            });
        }
        function fillSpacingAfterInsertion() {
            fillSpacingCommon({
                previousSibling: childrenInNewOrder[newIndex],
                nextSibling: childrenInNewOrder[newIndex + 1]
            });
        }
        function fillSpacingCommon(spacingOpts) {
            var spacing = getSpacingBetweenNodes_1.getSpacingBetweenNodes({
                parent: parent,
                getSiblingFormatting: getSiblingFormatting,
                newLineKind: newLineKind,
                previousSibling: spacingOpts.previousSibling,
                nextSibling: spacingOpts.nextSibling
            });
            var twoNewLines = newLineKind + newLineKind;
            if (spacing === twoNewLines) {
                if (utils_1.StringUtils.endsWith(finalText, twoNewLines))
                    return;
                else if (utils_1.StringUtils.endsWith(finalText, newLineKind))
                    finalText += newLineKind;
                else
                    finalText += twoNewLines;
            }
            else if (spacing === newLineKind) {
                if (utils_1.StringUtils.endsWith(finalText, newLineKind))
                    return;
                else
                    finalText += newLineKind;
            }
            else if (spacing === " ") {
                if (utils_1.StringUtils.endsWith(finalText, " "))
                    return;
                else
                    finalText += " ";
            }
            else
                finalText += spacing;
        }
    };
    ChangingChildOrderTextManipulator.prototype.getTextForError = function (newText) {
        return newText;
    };
    return ChangingChildOrderTextManipulator;
}());
exports.ChangingChildOrderTextManipulator = ChangingChildOrderTextManipulator;
