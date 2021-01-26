"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../utils");
var NodeHandlerHelper_1 = require("./NodeHandlerHelper");
var StraightReplacementNodeHandler_1 = require("./StraightReplacementNodeHandler");
/**
 * Parent handler used to unwrap a node.
 */
var UnwrapParentHandler = /** @class */ (function () {
    function UnwrapParentHandler(compilerFactory, childIndex) {
        this.compilerFactory = compilerFactory;
        this.childIndex = childIndex;
        this.straightReplacementNodeHandler = new StraightReplacementNodeHandler_1.StraightReplacementNodeHandler(compilerFactory);
        this.helper = new NodeHandlerHelper_1.NodeHandlerHelper(compilerFactory);
    }
    UnwrapParentHandler.prototype.handleNode = function (currentNode, newNode, newSourceFile) {
        var e_1, _a;
        var helper = this.helper;
        var currentNodeChildren = new utils_1.AdvancedIterator(utils_1.ArrayUtils.toIterator(currentNode.getCompilerChildren()));
        var newNodeChildren = new utils_1.AdvancedIterator(utils_1.ArrayUtils.toIterator(newNode.getChildren(newSourceFile)));
        var index = 0;
        // replace normally until reaching the first child
        while (!currentNodeChildren.done && !newNodeChildren.done && index++ < this.childIndex)
            this.helper.handleForValues(this.straightReplacementNodeHandler, currentNodeChildren.next(), newNodeChildren.next(), newSourceFile);
        // the child syntax list's children should map to the newNodes next children
        var currentChild = this.compilerFactory.getExistingCompilerNode(currentNodeChildren.next());
        var childSyntaxList = currentChild.getChildSyntaxListOrThrow();
        try {
            for (var _b = tslib_1.__values(childSyntaxList.getCompilerChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                this.helper.handleForValues(this.straightReplacementNodeHandler, child, newNodeChildren.next(), newSourceFile);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // destroy all the current child's children except for the children of its child syntax list
        forgetNodes(currentChild);
        function forgetNodes(node) {
            var e_2, _a;
            if (node === childSyntaxList) {
                node.forgetOnlyThis();
                return;
            }
            try {
                for (var _b = tslib_1.__values(node.getChildrenInCacheIterator()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    forgetNodes(child);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            node.forgetOnlyThis();
        }
        // handle the rest
        while (!currentNodeChildren.done)
            this.helper.handleForValues(this.straightReplacementNodeHandler, currentNodeChildren.next(), newNodeChildren.next(), newSourceFile);
        // ensure the new children iterator is done too
        if (!newNodeChildren.done)
            throw new Error("Error replacing tree: Should not have more children left over.");
        this.compilerFactory.replaceCompilerNode(currentNode, newNode);
    };
    return UnwrapParentHandler;
}());
exports.UnwrapParentHandler = UnwrapParentHandler;
