"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
function TextInsertableNode(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.insertText = function (pos, textOrWriterFunction) {
            this.replaceText([pos, pos], textOrWriterFunction);
            return this;
        };
        class_1.prototype.removeText = function (pos, end) {
            if (pos == null)
                this.replaceText(getValidRange(this), "");
            else
                this.replaceText([pos, end], "");
            return this;
        };
        class_1.prototype.replaceText = function (range, textOrWriterFunction) {
            var thisNode = this;
            var childSyntaxList = this.getChildSyntaxListOrThrow();
            var validRange = getValidRange(this);
            var pos = range[0];
            var end = range[1];
            verifyArguments();
            // ideally this wouldn't replace the existing syntax list
            manipulation_1.insertIntoParentTextRange({
                insertPos: pos,
                newText: utils_1.getTextFromStringOrWriter(this.getWriter(), textOrWriterFunction),
                parent: this,
                replacing: {
                    textLength: end - pos,
                    nodes: [childSyntaxList]
                }
            });
            return this;
            function verifyArguments() {
                verifyInRange(pos);
                verifyInRange(end);
                if (pos > end)
                    throw new errors.ArgumentError("range", "Cannot specify a start position greater than the end position.");
            }
            function verifyInRange(i) {
                if (i >= validRange[0] && i <= validRange[1])
                    return;
                throw new errors.InvalidOperationError("Cannot insert or replace text outside the bounds of the node. " +
                    ("Expected a position between [" + validRange[0] + ", " + validRange[1] + "], but received " + i + "."));
            }
        };
        return class_1;
    }(Base));
}
exports.TextInsertableNode = TextInsertableNode;
function getValidRange(thisNode) {
    var rangeNode = getRangeNode();
    var openBrace = utils_1.TypeGuards.isSourceFile(rangeNode) ? undefined : rangeNode.getPreviousSiblingIfKind(typescript_1.SyntaxKind.OpenBraceToken);
    var closeBrace = openBrace == null ? undefined : rangeNode.getNextSiblingIfKind(typescript_1.SyntaxKind.CloseBraceToken);
    if (openBrace != null && closeBrace != null)
        return [openBrace.getEnd(), closeBrace.getStart()];
    else
        return [rangeNode.getPos(), rangeNode.getEnd()];
    function getRangeNode() {
        if (utils_1.TypeGuards.isSourceFile(thisNode))
            return thisNode;
        return thisNode.getChildSyntaxListOrThrow();
    }
}
