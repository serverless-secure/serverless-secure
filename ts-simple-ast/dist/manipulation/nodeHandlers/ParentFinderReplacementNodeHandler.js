"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../utils");
var StraightReplacementNodeHandler_1 = require("./StraightReplacementNodeHandler");
/**
 * Replacement handler that tries to find the parents.
 */
var ParentFinderReplacementNodeHandler = /** @class */ (function (_super) {
    tslib_1.__extends(ParentFinderReplacementNodeHandler, _super);
    function ParentFinderReplacementNodeHandler(compilerFactory, parentNodeHandler, changingParent) {
        var _this = _super.call(this, compilerFactory) || this;
        _this.parentNodeHandler = parentNodeHandler;
        _this.changingParent = changingParent;
        _this.foundParent = false;
        _this.changingParentParent = _this.changingParent.getParentSyntaxList() || _this.changingParent.getParent();
        return _this;
    }
    ParentFinderReplacementNodeHandler.prototype.handleNode = function (currentNode, newNode, newSourceFile) {
        if (!this.foundParent && areNodesEqual(newNode, this.changingParent) && areNodesEqual(utils_1.getParentSyntaxList(newNode) || newNode.parent, this.changingParentParent)) {
            this.foundParent = true; // don't bother checking for the parent once it's found
            this.parentNodeHandler.handleNode(currentNode, newNode, newSourceFile);
        }
        else
            _super.prototype.handleNode.call(this, currentNode, newNode, newSourceFile);
    };
    return ParentFinderReplacementNodeHandler;
}(StraightReplacementNodeHandler_1.StraightReplacementNodeHandler));
exports.ParentFinderReplacementNodeHandler = ParentFinderReplacementNodeHandler;
function areNodesEqual(a, b) {
    if (a == null && b == null)
        return true;
    if (a == null || b == null)
        return false;
    if (a.pos === b.getPos() && a.kind === b.getKind())
        return true;
    return false;
}
