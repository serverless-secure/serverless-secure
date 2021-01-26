"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var typescript_1 = require("../../typescript");
var ChangeChildOrderParentHandler_1 = require("./ChangeChildOrderParentHandler");
var DefaultParentHandler_1 = require("./DefaultParentHandler");
var ForgetChangedNodeHandler_1 = require("./ForgetChangedNodeHandler");
var ParentFinderReplacementNodeHandler_1 = require("./ParentFinderReplacementNodeHandler");
var RangeParentHandler_1 = require("./RangeParentHandler");
var StraightReplacementNodeHandler_1 = require("./StraightReplacementNodeHandler");
var TryOrForgetNodeHandler_1 = require("./TryOrForgetNodeHandler");
var UnwrapParentHandler_1 = require("./UnwrapParentHandler");
var NodeHandlerFactory = /** @class */ (function () {
    function NodeHandlerFactory() {
    }
    NodeHandlerFactory.prototype.getDefault = function (opts) {
        var changingParent = opts.parent, isFirstChild = opts.isFirstChild, childCount = opts.childCount, customMappings = opts.customMappings;
        var sourceFile = changingParent.getSourceFile();
        var compilerFactory = sourceFile.global.compilerFactory;
        var replacingNodes = opts.replacingNodes == null ? undefined : tslib_1.__spread(opts.replacingNodes);
        var parentHandler = new DefaultParentHandler_1.DefaultParentHandler(compilerFactory, { childCount: childCount, isFirstChild: isFirstChild, replacingNodes: replacingNodes, customMappings: customMappings });
        if (changingParent === sourceFile)
            return parentHandler;
        else
            return new ParentFinderReplacementNodeHandler_1.ParentFinderReplacementNodeHandler(compilerFactory, parentHandler, changingParent);
    };
    NodeHandlerFactory.prototype.getForCreatingSyntaxList = function (opts) {
        var parent = opts.parent, insertPos = opts.insertPos;
        return this.getDefault({
            parent: parent,
            childCount: 1,
            isFirstChild: function (currentNode, newNode) { return newNode.kind === typescript_1.SyntaxKind.SyntaxList && insertPos <= newNode.getStart(); }
        });
    };
    NodeHandlerFactory.prototype.getForRange = function (opts) {
        var changingParent = opts.parent, start = opts.start, end = opts.end, replacingLength = opts.replacingLength, replacingNodes = opts.replacingNodes, customMappings = opts.customMappings;
        var sourceFile = changingParent.getSourceFile();
        var compilerFactory = sourceFile.global.compilerFactory;
        var parentHandler = new RangeParentHandler_1.RangeParentHandler(compilerFactory, { start: start, end: end, replacingLength: replacingLength, replacingNodes: replacingNodes, customMappings: customMappings });
        if (changingParent === sourceFile)
            return parentHandler;
        else
            return new ParentFinderReplacementNodeHandler_1.ParentFinderReplacementNodeHandler(compilerFactory, parentHandler, changingParent);
    };
    NodeHandlerFactory.prototype.getForChildIndex = function (opts) {
        var parent = opts.parent, childIndex = opts.childIndex, childCount = opts.childCount, replacingNodes = opts.replacingNodes, customMappings = opts.customMappings;
        var parentChildren = parent.getChildren();
        errors.throwIfOutOfRange(childIndex, [0, parentChildren.length], "opts.childIndex");
        if (childCount < 0)
            errors.throwIfOutOfRange(childCount, [childIndex - parentChildren.length, 0], "opts.childCount");
        var i = 0;
        var isFirstChild = function () { return i++ === childIndex; };
        return this.getDefault({
            parent: parent,
            isFirstChild: isFirstChild,
            childCount: childCount,
            replacingNodes: replacingNodes,
            customMappings: customMappings
        });
    };
    NodeHandlerFactory.prototype.getForStraightReplacement = function (compilerFactory) {
        return new StraightReplacementNodeHandler_1.StraightReplacementNodeHandler(compilerFactory);
    };
    NodeHandlerFactory.prototype.getForForgetChanged = function (compilerFactory) {
        return new ForgetChangedNodeHandler_1.ForgetChangedNodeHandler(compilerFactory);
    };
    NodeHandlerFactory.prototype.getForTryOrForget = function (handler) {
        return new TryOrForgetNodeHandler_1.TryOrForgetNodeHandler(handler);
    };
    NodeHandlerFactory.prototype.getForChangingChildOrder = function (opts) {
        var changingParent = opts.parent, oldIndex = opts.oldIndex, newIndex = opts.newIndex;
        var sourceFile = changingParent.getSourceFile();
        var compilerFactory = sourceFile.global.compilerFactory;
        var changeChildOrderParentHandler = new ChangeChildOrderParentHandler_1.ChangeChildOrderParentHandler(compilerFactory, { oldIndex: oldIndex, newIndex: newIndex });
        if (changingParent === sourceFile)
            return changeChildOrderParentHandler;
        else
            return new ParentFinderReplacementNodeHandler_1.ParentFinderReplacementNodeHandler(compilerFactory, changeChildOrderParentHandler, changingParent);
    };
    NodeHandlerFactory.prototype.getForUnwrappingNode = function (unwrappingNode) {
        var changingParent = unwrappingNode.getParentSyntaxList() || unwrappingNode.getParentOrThrow();
        var childIndex = unwrappingNode.getChildIndex();
        var sourceFile = changingParent.getSourceFile();
        var compilerFactory = sourceFile.global.compilerFactory;
        var unwrapParentHandler = new UnwrapParentHandler_1.UnwrapParentHandler(compilerFactory, childIndex);
        if (changingParent === sourceFile)
            return unwrapParentHandler;
        else
            return new ParentFinderReplacementNodeHandler_1.ParentFinderReplacementNodeHandler(compilerFactory, unwrapParentHandler, changingParent);
    };
    return NodeHandlerFactory;
}());
exports.NodeHandlerFactory = NodeHandlerFactory;
