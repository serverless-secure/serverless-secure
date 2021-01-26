"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../utils");
var NodeHandlerHelper_1 = require("./NodeHandlerHelper");
var StraightReplacementNodeHandler_1 = require("./StraightReplacementNodeHandler");
/**
 * Handler for deailing with a parent that is going to have a child replaced based on the range.
 */
var RangeParentHandler = /** @class */ (function () {
    function RangeParentHandler(compilerFactory, opts) {
        this.compilerFactory = compilerFactory;
        this.straightReplacementNodeHandler = new StraightReplacementNodeHandler_1.StraightReplacementNodeHandler(compilerFactory);
        this.helper = new NodeHandlerHelper_1.NodeHandlerHelper(compilerFactory);
        this.start = opts.start;
        this.end = opts.end;
        this.replacingLength = opts.replacingLength;
        this.replacingNodes = opts.replacingNodes == null ? undefined : opts.replacingNodes.map(function (n) { return n.compilerNode; });
        this.customMappings = opts.customMappings;
    }
    RangeParentHandler.prototype.handleNode = function (currentNode, newNode, newSourceFile) {
        var currentNodeChildren = new utils_1.AdvancedIterator(utils_1.ArrayUtils.toIterator(currentNode.getCompilerChildren()));
        var newNodeChildren = new utils_1.AdvancedIterator(utils_1.ArrayUtils.toIterator(newNode.getChildren(newSourceFile)));
        // handle any custom mappings
        this.handleCustomMappings(newNode);
        // get the first child
        while (!currentNodeChildren.done && !newNodeChildren.done && newNodeChildren.peek.getStart() < this.start)
            this.straightReplace(currentNodeChildren.next(), newNodeChildren.next(), newSourceFile);
        // handle the new nodes
        while (!newNodeChildren.done && newNodeChildren.peek.getStart() >= this.start && newNodeChildren.peek.getEnd() <= this.end)
            newNodeChildren.next();
        // handle the nodes being replaced
        if (this.replacingLength != null) {
            var replacingEnd = this.start + this.replacingLength;
            while (!currentNodeChildren.done && (currentNodeChildren.peek.end <= replacingEnd || currentNodeChildren.peek.getStart() < replacingEnd))
                this.helper.forgetNodeIfNecessary(currentNodeChildren.next());
        }
        // handle the rest
        while (!currentNodeChildren.done)
            this.straightReplace(currentNodeChildren.next(), newNodeChildren.next(), newSourceFile);
        // ensure the new children iterator is done too
        if (!newNodeChildren.done)
            throw new Error("Error replacing tree: Should not have more children left over.");
        this.compilerFactory.replaceCompilerNode(currentNode, newNode);
    };
    RangeParentHandler.prototype.handleCustomMappings = function (newParentNode) {
        var e_1, _a;
        if (this.customMappings == null)
            return;
        var customMappings = this.customMappings(newParentNode);
        try {
            for (var customMappings_1 = tslib_1.__values(customMappings), customMappings_1_1 = customMappings_1.next(); !customMappings_1_1.done; customMappings_1_1 = customMappings_1.next()) {
                var mapping = customMappings_1_1.value;
                mapping.currentNode.global.compilerFactory.replaceCompilerNode(mapping.currentNode, mapping.newNode);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (customMappings_1_1 && !customMappings_1_1.done && (_a = customMappings_1.return)) _a.call(customMappings_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    RangeParentHandler.prototype.straightReplace = function (currentNode, nextNode, newSourceFile) {
        if (!this.tryReplaceNode(currentNode))
            this.helper.handleForValues(this.straightReplacementNodeHandler, currentNode, nextNode, newSourceFile);
    };
    RangeParentHandler.prototype.tryReplaceNode = function (currentCompilerNode) {
        if (this.replacingNodes == null || this.replacingNodes.length === 0)
            return false;
        var index = this.replacingNodes.indexOf(currentCompilerNode);
        if (index === -1)
            return false;
        this.replacingNodes.splice(index, 1);
        this.helper.forgetNodeIfNecessary(currentCompilerNode);
        return true;
    };
    return RangeParentHandler;
}());
exports.RangeParentHandler = RangeParentHandler;
