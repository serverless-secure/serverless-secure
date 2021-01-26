"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var manipulation_1 = require("../../manipulation");
var utils_1 = require("../../utils");
var Node_1 = require("./Node");
var SyntaxList = /** @class */ (function (_super) {
    tslib_1.__extends(SyntaxList, _super);
    function SyntaxList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SyntaxList.prototype.addChildText = function (textOrWriterFunction) {
        return this.insertChildText(this.getChildCount(), textOrWriterFunction);
    };
    SyntaxList.prototype.insertChildText = function (index, textOrWriterFunction) {
        // get index
        var initialChildCount = this.getChildCount();
        var newLineKind = this.global.manipulationSettings.getNewLineKindAsString();
        var parent = this.getParentOrThrow();
        index = manipulation_1.verifyAndGetIndex(index, initialChildCount);
        // get text
        var insertText = utils_1.getTextFromStringOrWriter(parent.getWriterWithChildIndentation(), textOrWriterFunction);
        if (insertText.length === 0)
            return [];
        if (index === 0 && utils_1.TypeGuards.isSourceFile(parent)) {
            if (!utils_1.StringUtils.endsWith(insertText, newLineKind))
                insertText += newLineKind;
        }
        else
            insertText = newLineKind + insertText;
        // insert
        var insertPos = manipulation_1.getInsertPosFromIndex(index, parent, this.getChildren());
        manipulation_1.insertIntoParentTextRange({
            insertPos: insertPos,
            newText: insertText,
            parent: this
        });
        // get inserted children
        var finalChildren = this.getChildren();
        return manipulation_1.getNodesToReturn(finalChildren, index, finalChildren.length - initialChildCount);
    };
    return SyntaxList;
}(Node_1.Node));
exports.SyntaxList = SyntaxList;
