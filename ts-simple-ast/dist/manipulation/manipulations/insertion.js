"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../constants");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var helpers_1 = require("../helpers");
var nodeHandlers_1 = require("../nodeHandlers");
var textManipulators_1 = require("../textManipulators");
var doManipulation_1 = require("./doManipulation");
/**
 * Inserts a text range into a parent.
 */
function insertIntoParentTextRange(opts) {
    var insertPos = opts.insertPos, newText = opts.newText, parent = opts.parent;
    // todo: this should only forget the existing node if the kind changes
    doManipulation_1.doManipulation(parent.sourceFile, new textManipulators_1.InsertionTextManipulator({
        insertPos: insertPos,
        newText: newText,
        replacingLength: opts.replacing == null ? undefined : opts.replacing.textLength
    }), new nodeHandlers_1.NodeHandlerFactory().getForRange({
        parent: parent,
        start: insertPos,
        end: insertPos + newText.length,
        replacingLength: opts.replacing == null ? undefined : opts.replacing.textLength,
        replacingNodes: opts.replacing == null ? undefined : opts.replacing.nodes,
        customMappings: opts.customMappings
    }));
}
exports.insertIntoParentTextRange = insertIntoParentTextRange;
function insertIntoCommaSeparatedNodes(opts) {
    // todo: this needs to be fixed/cleaned up in the future, but this is good enough for now
    var currentNodes = opts.currentNodes, insertIndex = opts.insertIndex, parent = opts.parent;
    var nextNode = currentNodes[insertIndex];
    var previousNode = currentNodes[insertIndex - 1];
    var separator = opts.useNewLines ? parent.global.manipulationSettings.getNewLineKindAsString() : " ";
    var childIndentationText = parent.getParentOrThrow().getChildIndentationText();
    var parentNextSibling = parent.getNextSibling();
    var isContained = parentNextSibling != null && (parentNextSibling.getKind() === typescript_1.SyntaxKind.CloseBraceToken || parentNextSibling.getKind() === typescript_1.SyntaxKind.CloseBracketToken);
    var newText = opts.newText;
    if (previousNode != null) {
        var nextEndStart = nextNode == null ? (isContained ? parentNextSibling.getStart(true) : parent.getEnd()) : nextNode.getStart(true);
        var insertPos = previousNode.getEnd();
        newText = "," + separator + newText;
        if (nextNode != null) {
            newText += "," + separator;
            if (opts.useNewLines)
                newText += childIndentationText;
        }
        else if (opts.useNewLines)
            newText += separator + parent.getParentOrThrow().getIndentationText();
        else if (opts.surroundWithSpaces)
            newText += " ";
        insertIntoParentTextRange({
            insertPos: insertPos,
            newText: newText,
            parent: parent,
            replacing: { textLength: nextEndStart - insertPos }
        });
    }
    else if (nextNode != null) {
        if (opts.useNewLines)
            newText = separator + newText;
        else if (opts.surroundWithSpaces)
            newText = " " + newText;
        newText += "," + separator;
        if (opts.useNewLines)
            newText += childIndentationText;
        var insertPos = isContained ? parent.getPos() : parent.getStart(true);
        insertIntoParentTextRange({
            insertPos: insertPos,
            newText: newText,
            parent: parent,
            replacing: { textLength: nextNode.getStart(true) - insertPos }
        });
    }
    else {
        if (opts.useNewLines)
            newText = separator + newText + parent.global.manipulationSettings.getNewLineKindAsString() + parent.getParentOrThrow().getIndentationText();
        else if (opts.surroundWithSpaces)
            newText = " " + newText + " ";
        insertIntoParentTextRange({
            insertPos: parent.getPos(),
            newText: newText,
            parent: parent,
            replacing: { textLength: parent.getNextSiblingOrThrow().getStart() - parent.getPos() }
        });
    }
}
exports.insertIntoCommaSeparatedNodes = insertIntoCommaSeparatedNodes;
/**
 * Used to insert non-comma separated nodes into braces or a source file.
 */
function insertIntoBracesOrSourceFile(opts) {
    var parent = opts.parent, index = opts.index, children = opts.children;
    var fullText = parent.sourceFile.getFullText();
    var insertPos = helpers_1.getInsertPosFromIndex(index, parent, children);
    var endPos = helpers_1.getEndPosFromIndex(index, parent, children, fullText);
    var replacingLength = endPos - insertPos;
    var newText = getNewText();
    doManipulation_1.doManipulation(parent.sourceFile, new textManipulators_1.InsertionTextManipulator({ insertPos: insertPos, replacingLength: replacingLength, newText: newText }), new nodeHandlers_1.NodeHandlerFactory().getForRange({
        parent: parent.getChildSyntaxListOrThrow(),
        start: insertPos,
        end: insertPos + newText.length,
        replacingLength: replacingLength
    }));
    function getNewText() {
        // todo: make this configurable
        var writer = parent.getWriterWithChildIndentation();
        opts.write(writer, {
            previousMember: getChild(children[index - 1]),
            nextMember: getChild(children[index]),
            isStartOfFile: insertPos === 0 || insertPos === 1 && fullText[0] === constants_1.Chars.BOM
        });
        return writer.toString();
        function getChild(child) {
            // ensure it passes the implementation
            if (child == null)
                return child;
            else if (utils_1.TypeGuards.isOverloadableNode(child))
                return child.getImplementation() || child;
            else
                return child;
        }
    }
}
exports.insertIntoBracesOrSourceFile = insertIntoBracesOrSourceFile;
/**
 * Glues together insertIntoBracesOrSourceFile and getRangeFromArray.
 * @param opts - Options to do this operation.
 */
function insertIntoBracesOrSourceFileWithGetChildren(opts) {
    if (opts.structures.length === 0)
        return [];
    var startChildren = opts.getIndexedChildren();
    var parentSyntaxList = opts.parent.getChildSyntaxListOrThrow();
    var index = helpers_1.verifyAndGetIndex(opts.index, startChildren.length);
    var childIndex = getChildIndex();
    insertIntoBracesOrSourceFile({
        parent: opts.parent,
        index: getChildIndex(),
        children: parentSyntaxList.getChildren(),
        write: opts.write
    });
    return helpers_1.getRangeFromArray(opts.getIndexedChildren(), opts.index, opts.structures.length, opts.expectedKind);
    function getChildIndex() {
        if (index === 0)
            return 0;
        // get the previous member in order to get the implementation signature + 1
        return startChildren[index - 1].getChildIndex() + 1;
    }
}
exports.insertIntoBracesOrSourceFileWithGetChildren = insertIntoBracesOrSourceFileWithGetChildren;
