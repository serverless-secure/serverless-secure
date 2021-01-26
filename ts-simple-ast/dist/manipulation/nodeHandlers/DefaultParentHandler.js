"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../utils");
var NodeHandlerHelper_1 = require("./NodeHandlerHelper");
var StraightReplacementNodeHandler_1 = require("./StraightReplacementNodeHandler");
/**
 * Handler for deailing with a parent that is going to have a child replaced.
 */
var DefaultParentHandler = /** @class */ (function () {
    function DefaultParentHandler(compilerFactory, opts) {
        this.compilerFactory = compilerFactory;
        this.straightReplacementNodeHandler = new StraightReplacementNodeHandler_1.StraightReplacementNodeHandler(compilerFactory);
        this.helper = new NodeHandlerHelper_1.NodeHandlerHelper(compilerFactory);
        this.childCount = opts.childCount;
        this.isFirstChild = opts.isFirstChild;
        this.replacingNodes = opts.replacingNodes == null ? undefined : opts.replacingNodes.map(function (n) { return n.compilerNode; });
        this.customMappings = opts.customMappings;
    }
    DefaultParentHandler.prototype.handleNode = function (currentNode, newNode, newSourceFile) {
        var currentNodeChildren = new utils_1.AdvancedIterator(utils_1.ArrayUtils.toIterator(currentNode.getCompilerChildren()));
        var newNodeChildren = new utils_1.AdvancedIterator(utils_1.ArrayUtils.toIterator(newNode.getChildren(newSourceFile)));
        var count = this.childCount;
        // handle any custom mappings
        this.handleCustomMappings(newNode);
        // get the first child
        while (!currentNodeChildren.done && !newNodeChildren.done && !this.isFirstChild(currentNodeChildren.peek, newNodeChildren.peek))
            this.helper.handleForValues(this.straightReplacementNodeHandler, currentNodeChildren.next(), newNodeChildren.next(), newSourceFile);
        // try replacing any nodes
        while (!currentNodeChildren.done && this.tryReplaceNode(currentNodeChildren.peek))
            currentNodeChildren.next();
        // add or remove the items
        if (count > 0) {
            while (count > 0) {
                newNodeChildren.next();
                count--;
            }
        }
        else if (count < 0) {
            while (count < 0) {
                this.helper.forgetNodeIfNecessary(currentNodeChildren.next());
                count++;
            }
        }
        // handle the rest
        while (!currentNodeChildren.done)
            this.helper.handleForValues(this.straightReplacementNodeHandler, currentNodeChildren.next(), newNodeChildren.next(), newSourceFile);
        // ensure the new children iterator is done too
        if (!newNodeChildren.done)
            throw new Error("Error replacing tree: Should not have more children left over.");
        this.compilerFactory.replaceCompilerNode(currentNode, newNode);
    };
    DefaultParentHandler.prototype.handleCustomMappings = function (newParentNode) {
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
    DefaultParentHandler.prototype.tryReplaceNode = function (currentCompilerNode) {
        if (this.replacingNodes == null || this.replacingNodes.length === 0)
            return false;
        var index = this.replacingNodes.indexOf(currentCompilerNode);
        if (index === -1)
            return false;
        this.replacingNodes.splice(index, 1);
        this.helper.forgetNodeIfNecessary(currentCompilerNode);
        return true;
    };
    return DefaultParentHandler;
}());
exports.DefaultParentHandler = DefaultParentHandler;
