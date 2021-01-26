"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var CommentRange_1 = require("./CommentRange");
var Node = /** @class */ (function () {
    /**
     * Initializes a new instance.
     * @internal
     * @param global - Global container.
     * @param node - Underlying node.
     * @param sourceFile - Source file for the node.
     */
    function Node(global, node, sourceFile) {
        if (global == null || global.compilerFactory == null)
            throw new errors.InvalidOperationError("Constructing a node is not supported. Please create a source file from the default export " +
                "of the package and manipulate the source file from there.");
        this.global = global;
        this._compilerNode = node;
        this.sourceFile = sourceFile;
    }
    Object.defineProperty(Node.prototype, "compilerNode", {
        /**
         * Gets the underlying compiler node.
         */
        get: function () {
            if (this._compilerNode == null)
                throw new errors.InvalidOperationError("Attempted to get information from a node that was removed or forgotten.");
            return this._compilerNode;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Releases the node and all its descendants from the underlying node cache and ast.
     *
     * This is useful if you want to improve the performance of manipulation by not tracking this node anymore.
     */
    Node.prototype.forget = function () {
        var e_1, _a;
        if (this.wasForgotten())
            return;
        try {
            for (var _b = tslib_1.__values(this.getChildrenInCacheIterator()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.forget();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.forgetOnlyThis();
    };
    /**
     * Only forgets this node.
     * @internal
     */
    Node.prototype.forgetOnlyThis = function () {
        if (this.wasForgotten())
            return;
        this.global.compilerFactory.removeNodeFromCache(this);
        this._clearInternals();
    };
    /**
     * Gets if the node was forgotten.
     *
     * This will be true when the node was forgotten or removed.
     */
    Node.prototype.wasForgotten = function () {
        return this._compilerNode == null;
    };
    /**
     * @internal
     *
     * WARNING: This should only be called by the compiler factory!
     */
    Node.prototype.replaceCompilerNodeFromFactory = function (compilerNode) {
        this._clearInternals();
        this._compilerNode = compilerNode;
    };
    /** @internal */
    Node.prototype._clearInternals = function () {
        this._compilerNode = undefined;
        this._childStringRanges = undefined;
        clearCommentRanges(this._leadingCommentRanges);
        clearCommentRanges(this._trailingCommentRanges);
        this._leadingCommentRanges = undefined;
        this._trailingCommentRanges = undefined;
        function clearCommentRanges(commentRanges) {
            if (commentRanges == null)
                return;
            commentRanges.forEach(function (r) { return r.forget(); });
        }
    };
    /**
     * Gets the syntax kind.
     */
    Node.prototype.getKind = function () {
        return this.compilerNode.kind;
    };
    /**
     * Gets the syntax kind name.
     */
    Node.prototype.getKindName = function () {
        return utils_1.getSyntaxKindName(this.compilerNode.kind);
    };
    /**
     * Prints the node using the compiler's printer.
     * @param options - Options.
     */
    Node.prototype.print = function (options) {
        if (options === void 0) { options = {}; }
        if (options.newLineKind == null)
            options.newLineKind = this.global.manipulationSettings.getNewLineKind();
        if (this.getKind() === typescript_1.SyntaxKind.SourceFile)
            return utils_1.printNode(this.compilerNode, options);
        else
            return utils_1.printNode(this.compilerNode, this.sourceFile.compilerNode, options);
    };
    /**
     * Gets the symbol or throws an error if it doesn't exist.
     */
    Node.prototype.getSymbolOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getSymbol(), "Could not find the node's symbol.");
    };
    /**
     * Gets the compiler symbol or undefined if it doesn't exist.
     */
    Node.prototype.getSymbol = function () {
        var boundSymbol = this.compilerNode.symbol;
        if (boundSymbol != null)
            return this.global.compilerFactory.getSymbol(boundSymbol);
        var typeChecker = this.global.typeChecker;
        var typeCheckerSymbol = typeChecker.getSymbolAtLocation(this);
        if (typeCheckerSymbol != null)
            return typeCheckerSymbol;
        var nameNode = this.compilerNode.name;
        if (nameNode != null)
            return this.getNodeFromCompilerNode(nameNode).getSymbol();
        return undefined;
    };
    /**
     * Gets the type of the node.
     */
    Node.prototype.getType = function () {
        return this.global.typeChecker.getTypeAtLocation(this);
    };
    /**
     * If the node contains the provided range (inclusive).
     * @param pos - Start position.
     * @param end - End position.
     */
    Node.prototype.containsRange = function (pos, end) {
        return this.getPos() <= pos && end <= this.getEnd();
    };
    /**
     * Gets if the specified position is within a string.
     * @param pos - Position.
     */
    Node.prototype.isInStringAtPos = function (pos) {
        var e_2, _a;
        errors.throwIfOutOfRange(pos, [this.getPos(), this.getEnd()], "pos");
        if (this._childStringRanges == null) {
            this._childStringRanges = [];
            try {
                for (var _b = tslib_1.__values(this.getCompilerDescendantsIterator()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var descendant = _c.value;
                    if (utils_1.isStringKind(descendant.kind))
                        this._childStringRanges.push([descendant.getStart(this.sourceFile.compilerNode), descendant.getEnd()]);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        return utils_1.ArrayUtils.binarySearch(this._childStringRanges, function (range) { return range[0] < pos && pos < range[1] - 1; }, function (range) { return range[0] > pos; }) !== -1;
    };
    /**
     * Gets the first child by a condition or throws.
     * @param condition - Condition.
     */
    Node.prototype.getFirstChildOrThrow = function (condition) {
        return errors.throwIfNullOrUndefined(this.getFirstChild(condition), "Could not find a child that matched the specified condition.");
    };
    /**
     * Gets the first child by a condition.
     * @param condition - Condition.
     */
    Node.prototype.getFirstChild = function (condition) {
        var firstChild = this.getCompilerFirstChild(getWrappedCondition(this, condition));
        return this.getNodeFromCompilerNodeIfExists(firstChild);
    };
    /**
     * Gets the last child by a condition or throws.
     * @param condition - Condition.
     */
    Node.prototype.getLastChildOrThrow = function (condition) {
        return errors.throwIfNullOrUndefined(this.getLastChild(condition), "Could not find a child that matched the specified condition.");
    };
    /**
     * Gets the last child by a condition.
     * @param condition - Condition.
     */
    Node.prototype.getLastChild = function (condition) {
        var lastChild = this.getCompilerLastChild(getWrappedCondition(this, condition));
        return this.getNodeFromCompilerNodeIfExists(lastChild);
    };
    /**
     * Gets the first descendant by a condition or throws.
     * @param condition - Condition.
     */
    Node.prototype.getFirstDescendantOrThrow = function (condition) {
        return errors.throwIfNullOrUndefined(this.getFirstDescendant(condition), "Could not find a descendant that matched the specified condition.");
    };
    /**
     * Gets the first descendant by a condition.
     * @param condition - Condition.
     */
    Node.prototype.getFirstDescendant = function (condition) {
        var e_3, _a;
        try {
            for (var _b = tslib_1.__values(this.getDescendantsIterator()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var descendant = _c.value;
                if (condition == null || condition(descendant))
                    return descendant;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return undefined;
    };
    /**
     * Offset this node's positions (pos and end) and all of its children by the given offset.
     * @internal
     * @param offset - Offset.
     */
    Node.prototype.offsetPositions = function (offset) {
        var e_4, _a;
        this.compilerNode.pos += offset;
        this.compilerNode.end += offset;
        try {
            for (var _b = tslib_1.__values(this.getChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                child.offsetPositions(offset);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    /**
     * Gets the previous sibling or throws.
     * @param condition - Optional condition for getting the previous sibling.
     */
    Node.prototype.getPreviousSiblingOrThrow = function (condition) {
        return errors.throwIfNullOrUndefined(this.getPreviousSibling(condition), "Could not find the previous sibling.");
    };
    /**
     * Gets the previous sibling.
     * @param condition - Optional condition for getting the previous sibling.
     */
    Node.prototype.getPreviousSibling = function (condition) {
        var previousSibling = this.getCompilerPreviousSibling(getWrappedCondition(this, condition));
        return this.getNodeFromCompilerNodeIfExists(previousSibling);
    };
    /**
     * Gets the next sibling or throws.
     * @param condition - Optional condition for getting the next sibling.
     */
    Node.prototype.getNextSiblingOrThrow = function (condition) {
        return errors.throwIfNullOrUndefined(this.getNextSibling(condition), "Could not find the next sibling.");
    };
    /**
     * Gets the next sibling.
     * @param condition - Optional condition for getting the previous sibling.
     */
    Node.prototype.getNextSibling = function (condition) {
        var nextSibling = this.getCompilerNextSibling(getWrappedCondition(this, condition));
        return this.getNodeFromCompilerNodeIfExists(nextSibling);
    };
    /**
     * Gets the previous siblings.
     *
     * Note: Closest sibling is the zero index.
     */
    Node.prototype.getPreviousSiblings = function () {
        var _this = this;
        return this.getCompilerPreviousSiblings().map(function (n) { return _this.getNodeFromCompilerNode(n); });
    };
    /**
     * Gets the next siblings.
     *
     * Note: Closest sibling is the zero index.
     */
    Node.prototype.getNextSiblings = function () {
        var _this = this;
        return this.getCompilerNextSiblings().map(function (n) { return _this.getNodeFromCompilerNode(n); });
    };
    /**
     * Gets all the children of the node.
     */
    Node.prototype.getChildren = function () {
        var _this = this;
        return this.getCompilerChildren().map(function (n) { return _this.getNodeFromCompilerNode(n); });
    };
    /**
     * Gets the child at the specified index.
     * @param index - Index of the child.
     */
    Node.prototype.getChildAtIndex = function (index) {
        return this.getNodeFromCompilerNode(this.getCompilerChildAtIndex(index));
    };
    /**
     * @internal
     */
    Node.prototype.getChildrenIterator = function () {
        var e_5, _a, _b, _c, compilerChild, e_5_1;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _b = tslib_1.__values(this.getCompilerChildren()), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3 /*break*/, 4];
                    compilerChild = _c.value;
                    return [4 /*yield*/, this.getNodeFromCompilerNode(compilerChild)];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _c = _b.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_5_1 = _d.sent();
                    e_5 = { error: e_5_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    };
    /**
     * @internal
     */
    Node.prototype.getChildrenInCacheIterator = function () {
        var e_6, _a, _b, _c, child, e_6_1;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 7, 8, 9]);
                    _b = tslib_1.__values(this.getCompilerChildren()), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3 /*break*/, 6];
                    child = _c.value;
                    if (!this.global.compilerFactory.hasCompilerNode(child)) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.global.compilerFactory.getExistingCompilerNode(child)];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 3:
                    if (!(child.kind === typescript_1.SyntaxKind.SyntaxList)) return [3 /*break*/, 5];
                    // always return syntax lists because their children could be in the cache
                    return [4 /*yield*/, this.getNodeFromCompilerNode(child)];
                case 4:
                    // always return syntax lists because their children could be in the cache
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _c = _b.next();
                    return [3 /*break*/, 1];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_6_1 = _d.sent();
                    e_6 = { error: e_6_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_6) throw e_6.error; }
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    };
    /**
     * Gets the child syntax list or throws if it doesn't exist.
     */
    Node.prototype.getChildSyntaxListOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getChildSyntaxList(), "A child syntax list was expected.");
    };
    /**
     * Gets the child syntax list if it exists.
     */
    Node.prototype.getChildSyntaxList = function () {
        var e_7, _a;
        var node = this;
        if (utils_1.TypeGuards.isBodyableNode(node) || utils_1.TypeGuards.isBodiedNode(node)) {
            do {
                node = utils_1.TypeGuards.isBodyableNode(node) ? node.getBodyOrThrow() : node.getBody();
            } while ((utils_1.TypeGuards.isBodyableNode(node) || utils_1.TypeGuards.isBodiedNode(node)) && node.compilerNode.statements == null);
        }
        if (utils_1.TypeGuards.isSourceFile(node) ||
            utils_1.TypeGuards.isBodyableNode(this) ||
            utils_1.TypeGuards.isBodiedNode(this) ||
            utils_1.TypeGuards.isCaseBlock(this) ||
            utils_1.TypeGuards.isCaseClause(this) ||
            utils_1.TypeGuards.isDefaultClause(this) ||
            utils_1.TypeGuards.isJsxElement(this))
            return node.getFirstChildByKind(typescript_1.SyntaxKind.SyntaxList);
        var passedBrace = false;
        try {
            for (var _b = tslib_1.__values(node.getCompilerChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (!passedBrace)
                    passedBrace = child.kind === typescript_1.SyntaxKind.OpenBraceToken;
                else if (child.kind === typescript_1.SyntaxKind.SyntaxList)
                    return this.getNodeFromCompilerNode(child);
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        return undefined;
    };
    /**
     * Invokes the `cbNode` callback for each child and the `cbNodeArray` for every array of nodes stored in properties of the node.
     * If `cbNodeArray` is not defined, then it will pass every element of the array to `cbNode`.
     *
     * @remarks There exists a `stop` function that exists to stop iteration.
     * @param cbNode - Callback invoked for each child.
     * @param cbNodeArray - Callback invoked for each array of nodes.
     */
    Node.prototype.forEachChild = function (cbNode, cbNodeArray) {
        var _this = this;
        var stop = false;
        var stopFunc = function () { return stop = true; };
        var nodeCallback = function (node) {
            cbNode(_this.getNodeFromCompilerNode(node), stopFunc);
            return stop;
        };
        var arrayCallback = cbNodeArray == null ? undefined : function (nodes) {
            cbNodeArray(nodes.map(function (n) { return _this.getNodeFromCompilerNode(n); }), stopFunc);
            return stop;
        };
        this.compilerNode.forEachChild(nodeCallback, arrayCallback);
    };
    /**
     * Invokes the `cbNode` callback for each descendant and the `cbNodeArray` for every array of nodes stored in properties of the node and descendant nodes.
     * If `cbNodeArray` is not defined, then it will pass every element of the array to `cbNode`.
     *
     * @remarks There exists a `stop` function that exists to stop iteration.
     * @param cbNode - Callback invoked for each descendant.
     * @param cbNodeArray - Callback invoked for each array of nodes.
     */
    Node.prototype.forEachDescendant = function (cbNode, cbNodeArray) {
        var stop = false;
        var stopFunc = function () { return stop = true; };
        var nodeCallback = function (node) {
            if (stop)
                return true;
            cbNode(node, stopFunc);
            if (stop)
                return true;
            node.forEachChild(nodeCallback, arrayCallback);
            return stop;
        };
        var arrayCallback = cbNodeArray == null ? undefined : function (nodes) {
            var e_8, _a;
            if (stop)
                return true;
            cbNodeArray(nodes, stopFunc);
            if (stop)
                return true;
            try {
                for (var nodes_1 = tslib_1.__values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                    var node = nodes_1_1.value;
                    node.forEachChild(nodeCallback, arrayCallback);
                    if (stop)
                        return true;
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
                }
                finally { if (e_8) throw e_8.error; }
            }
            return stop;
        };
        this.forEachChild(nodeCallback, arrayCallback);
    };
    /**
     * Gets the node's descendants.
     */
    Node.prototype.getDescendants = function () {
        return utils_1.ArrayUtils.from(this.getDescendantsIterator());
    };
    /**
     * Gets the node's descendants as an iterator.
     * @internal
     */
    Node.prototype.getDescendantsIterator = function () {
        var e_9, _a, _b, _c, descendant, e_9_1;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 5, 6, 7]);
                    _b = tslib_1.__values(this.getCompilerDescendantsIterator()), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3 /*break*/, 4];
                    descendant = _c.value;
                    return [4 /*yield*/, this.getNodeFromCompilerNode(descendant)];
                case 2:
                    _d.sent();
                    _d.label = 3;
                case 3:
                    _c = _b.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_9_1 = _d.sent();
                    e_9 = { error: e_9_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_9) throw e_9.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    };
    /**
     * Gets the node's descendant statements.
     */
    Node.prototype.getDescendantStatements = function () {
        var statements = [];
        handleNode(this, this.compilerNode);
        return statements;
        function handleNode(thisNode, node) {
            if (handleStatements(thisNode, node))
                return;
            else if (node.kind === typescript_1.SyntaxKind.ArrowFunction) {
                var arrowFunction = node;
                if (arrowFunction.body.kind !== typescript_1.SyntaxKind.Block)
                    statements.push(thisNode.getNodeFromCompilerNode(arrowFunction.body)); // todo: bug... it's not a statement
                else
                    handleNode(thisNode, arrowFunction.body);
            }
            else
                handleChildren(thisNode, node);
        }
        function handleStatements(thisNode, node) {
            var e_10, _a;
            if (node.statements == null)
                return false;
            try {
                for (var _b = tslib_1.__values(node.statements), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var statement = _c.value;
                    statements.push(thisNode.getNodeFromCompilerNode(statement));
                    handleChildren(thisNode, statement);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_10) throw e_10.error; }
            }
            return true;
        }
        function handleChildren(thisNode, node) {
            typescript_1.ts.forEachChild(node, function (childNode) { return handleNode(thisNode, childNode); });
        }
    };
    /**
     * Gets the child count.
     */
    Node.prototype.getChildCount = function () {
        return this.compilerNode.getChildCount(this.sourceFile.compilerNode);
    };
    /**
     * Gets the child at the provided position, or undefined if not found.
     * @param pos - Position to search for.
     */
    Node.prototype.getChildAtPos = function (pos) {
        var e_11, _a;
        if (pos < this.getPos() || pos >= this.getEnd())
            return undefined;
        try {
            for (var _b = tslib_1.__values(this.getCompilerChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (pos >= child.pos && pos < child.end)
                    return this.getNodeFromCompilerNode(child);
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return undefined;
    };
    /**
     * Gets the most specific descendant at the provided position, or undefined if not found.
     * @param pos - Position to search for.
     */
    Node.prototype.getDescendantAtPos = function (pos) {
        var node;
        while (true) {
            var nextNode = (node || this).getChildAtPos(pos);
            if (nextNode == null)
                return node;
            else
                node = nextNode;
        }
    };
    /**
     * Gets the most specific descendant at the provided start position with the specified width, or undefined if not found.
     * @param start - Start position to search for.
     * @param width - Width of the node to search for.
     */
    Node.prototype.getDescendantAtStartWithWidth = function (start, width) {
        var _this = this;
        var foundNode;
        this.global.compilerFactory.forgetNodesCreatedInBlock(function (remember) {
            var nextNode = _this.getSourceFile();
            do {
                nextNode = nextNode.getChildAtPos(start);
                if (nextNode != null) {
                    if (nextNode.getStart() === start && nextNode.getWidth() === width)
                        foundNode = nextNode;
                    else if (foundNode != null)
                        break; // no need to keep looking
                }
            } while (nextNode != null);
            if (foundNode != null)
                remember(foundNode);
        });
        return foundNode;
    };
    /**
     * Gets the start position with leading trivia.
     */
    Node.prototype.getPos = function () {
        return this.compilerNode.pos;
    };
    /**
     * Gets the end position.
     */
    Node.prototype.getEnd = function () {
        return this.compilerNode.end;
    };
    /**
     * Gets the start position without leading trivia.
     * @param includeJsDocComment - Whether to include the JS doc comment.
     */
    Node.prototype.getStart = function (includeJsDocComment) {
        // rare time a bool parameter will be used... it's because it's done in the ts compiler
        return this.compilerNode.getStart(this.sourceFile.compilerNode, includeJsDocComment);
    };
    /**
     * Gets the end position of the last significant token.
     */
    Node.prototype.getFullStart = function () {
        return this.compilerNode.getFullStart();
    };
    /**
     * Gets the first position from the pos that is not whitespace.
     */
    Node.prototype.getNonWhitespaceStart = function () {
        return manipulation_1.getNextNonWhitespacePos(this.sourceFile.getFullText(), this.getPos());
    };
    /**
     * Gets the width of the node (length without trivia).
     */
    Node.prototype.getWidth = function () {
        return this.compilerNode.getWidth(this.sourceFile.compilerNode);
    };
    /**
     * Gets the full width of the node (length with trivia).
     */
    Node.prototype.getFullWidth = function () {
        return this.compilerNode.getFullWidth();
    };
    /**
     * Gets the leading trivia width.
     */
    Node.prototype.getLeadingTriviaWidth = function () {
        return this.compilerNode.getLeadingTriviaWidth(this.sourceFile.compilerNode);
    };
    /**
     * Gets the trailing trivia width.
     *
     * This is the width from the end of the current node to the next significant token or new line.
     */
    Node.prototype.getTrailingTriviaWidth = function () {
        return this.getTrailingTriviaEnd() - this.getEnd();
    };
    /**
     * Gets the trailing trivia end.
     *
     * This is the position of the next significant token or new line.
     */
    Node.prototype.getTrailingTriviaEnd = function () {
        var parent = this.getParent();
        var end = this.getEnd();
        if (parent == null)
            return end;
        var parentEnd = parent.getEnd();
        if (parentEnd === end)
            return end;
        var trailingComments = this.getTrailingCommentRanges();
        var searchStart = getSearchStart();
        return manipulation_1.getNextMatchingPos(this.sourceFile.getFullText(), searchStart, function (char) { return char !== " " && char !== "\t"; });
        function getSearchStart() {
            return trailingComments.length > 0 ? trailingComments[trailingComments.length - 1].getEnd() : end;
        }
    };
    /**
     * Gets the text without leading trivia.
     */
    Node.prototype.getText = function () {
        return this.compilerNode.getText(this.sourceFile.compilerNode);
    };
    /**
     * Gets the full text with leading trivia.
     */
    Node.prototype.getFullText = function () {
        return this.compilerNode.getFullText(this.sourceFile.compilerNode);
    };
    /**
     * Gets the combined modifier flags.
     */
    Node.prototype.getCombinedModifierFlags = function () {
        return typescript_1.ts.getCombinedModifierFlags(this.compilerNode);
    };
    /**
     * Gets the source file.
     */
    Node.prototype.getSourceFile = function () {
        return this.sourceFile;
    };
    /**
     * Gets a compiler node property wrapped in a Node.
     * @param propertyName - Property name.
     */
    Node.prototype.getNodeProperty = function (propertyName) {
        var _this = this;
        var property = this.compilerNode[propertyName];
        if (property == null)
            return undefined;
        else if (property instanceof Array)
            return property.map(function (p) { return isNode(p) ? _this.getNodeFromCompilerNode(p) : p; });
        else if (isNode(property))
            return this.getNodeFromCompilerNode(property);
        else
            return property;
        function isNode(value) {
            return typeof value.kind === "number" && typeof value.pos === "number" && typeof value.end === "number";
        }
    };
    Node.prototype.getAncestors = function (includeSyntaxLists) {
        if (includeSyntaxLists === void 0) { includeSyntaxLists = false; }
        return utils_1.ArrayUtils.from(this.getAncestorsIterator(includeSyntaxLists));
    };
    /**
     * @internal
     */
    Node.prototype.getAncestorsIterator = function (includeSyntaxLists) {
        function getParent(node) {
            return includeSyntaxLists ? node.getParentSyntaxList() || node.getParent() : node.getParent();
        }
        var parent;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parent = getParent(this);
                    _a.label = 1;
                case 1:
                    if (!(parent != null)) return [3 /*break*/, 3];
                    return [4 /*yield*/, parent];
                case 2:
                    _a.sent();
                    parent = getParent(parent);
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    };
    /**
     * Get the node's parent.
     */
    Node.prototype.getParent = function () {
        return this.getNodeFromCompilerNodeIfExists(this.compilerNode.parent);
    };
    /**
     * Gets the parent or throws an error if it doesn't exist.
     */
    Node.prototype.getParentOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getParent(), "Expected to find a parent.");
    };
    /**
     * Goes up the parents (ancestors) of the node while a condition is true.
     * Throws if the initial parent doesn't match the condition.
     * @param condition - Condition that tests the parent to see if the expression is true.
     */
    Node.prototype.getParentWhileOrThrow = function (condition) {
        return errors.throwIfNullOrUndefined(this.getParentWhile(condition), "The initial parent did not match the provided condition.");
    };
    /**
     * Goes up the parents (ancestors) of the node while a condition is true.
     * Returns undefined if the initial parent doesn't match the condition.
     * @param condition - Condition that tests the parent to see if the expression is true.
     */
    Node.prototype.getParentWhile = function (condition) {
        var node = undefined;
        var nextParent = this.getParent();
        while (nextParent != null && condition(nextParent)) {
            node = nextParent;
            nextParent = nextParent.getParent();
        }
        return node;
    };
    /**
     * Goes up the parents (ancestors) of the node while the parent is the specified syntax kind.
     * Throws if the initial parent is not the specified syntax kind.
     * @param kind - Syntax kind to check for.
     */
    Node.prototype.getParentWhileKindOrThrow = function (kind) {
        return errors.throwIfNullOrUndefined(this.getParentWhileKind(kind), "The initial parent was not a syntax kind of " + utils_1.getSyntaxKindName(kind) + ".");
    };
    /**
     * Goes up the parents (ancestors) of the node while the parent is the specified syntax kind.
     * Returns undefined if the initial parent is not the specified syntax kind.
     * @param kind - Syntax kind to check for.
     */
    Node.prototype.getParentWhileKind = function (kind) {
        return this.getParentWhile(function (n) { return n.getKind() === kind; });
    };
    /**
     * Gets the last token of this node. Usually this is a close brace.
     */
    Node.prototype.getLastToken = function () {
        var lastToken = this.compilerNode.getLastToken(this.sourceFile.compilerNode);
        if (lastToken == null)
            throw new errors.NotImplementedError("Not implemented scenario where the last token does not exist.");
        return this.getNodeFromCompilerNode(lastToken);
    };
    /**
     * Gets if this node is in a syntax list.
     */
    Node.prototype.isInSyntaxList = function () {
        return this.getParentSyntaxList() != null;
    };
    /**
     * Gets the parent if it's a syntax list or throws an error otherwise.
     */
    Node.prototype.getParentSyntaxListOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getParentSyntaxList(), "Expected the parent to be a syntax list.");
    };
    /**
     * Gets the parent if it's a syntax list.
     */
    Node.prototype.getParentSyntaxList = function () {
        var syntaxList = utils_1.getParentSyntaxList(this.compilerNode);
        return this.getNodeFromCompilerNodeIfExists(syntaxList);
    };
    /**
     * Gets the child index of this node relative to the parent.
     */
    Node.prototype.getChildIndex = function () {
        var e_12, _a;
        var parent = this.getParentSyntaxList() || this.getParentOrThrow();
        var i = 0;
        try {
            for (var _b = tslib_1.__values(parent.getCompilerChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child === this.compilerNode)
                    return i;
                i++;
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_12) throw e_12.error; }
        }
        /* istanbul ignore next */
        throw new errors.NotImplementedError("For some reason the child's parent did not contain the child.");
    };
    /**
     * Gets the indentation level of the current node.
     */
    Node.prototype.getIndentationLevel = function () {
        var indentationText = this.global.manipulationSettings.getIndentationText();
        return this.global.languageService.getIdentationAtPosition(this.sourceFile, this.getStart()) / indentationText.length;
    };
    /**
     * Gets the child indentation level of the current node.
     */
    Node.prototype.getChildIndentationLevel = function () {
        if (utils_1.TypeGuards.isSourceFile(this))
            return 0;
        return this.getIndentationLevel() + 1;
    };
    /**
     * Gets the indentation text.
     * @param offset - Optional number of levels of indentation to add or remove.
     */
    Node.prototype.getIndentationText = function (offset) {
        if (offset === void 0) { offset = 0; }
        return this._getIndentationTextForLevel(this.getIndentationLevel() + offset);
    };
    /**
     * Gets the next indentation level text.
     * @param offset - Optional number of levels of indentation to add or remove.
     */
    Node.prototype.getChildIndentationText = function (offset) {
        if (offset === void 0) { offset = 0; }
        return this._getIndentationTextForLevel(this.getChildIndentationLevel() + offset);
    };
    /**
     * @internal
     */
    Node.prototype._getIndentationTextForLevel = function (level) {
        return utils_1.StringUtils.repeat(this.global.manipulationSettings.getIndentationText(), level);
    };
    /**
     * Gets the position of the start of the line that this node starts on.
     * @param includeJsDocComment - Whether to include the JS doc comment or not.
     */
    Node.prototype.getStartLinePos = function (includeJsDocComment) {
        var sourceFileText = this.sourceFile.getFullText();
        return manipulation_1.getPreviousMatchingPos(sourceFileText, this.getStart(includeJsDocComment), function (char) { return char === "\n" || char === "\r"; });
    };
    /**
     * Gets the line number at the start of the node.
     * @param includeJsDocComment - Whether to include the JS doc comment or not.
     */
    Node.prototype.getStartLineNumber = function (includeJsDocComment) {
        return this.sourceFile.getLineNumberAtPos(this.getStartLinePos(includeJsDocComment));
    };
    /**
     * Gets the line number of the end of the node.
     */
    Node.prototype.getEndLineNumber = function () {
        var sourceFileText = this.sourceFile.getFullText();
        var endLinePos = manipulation_1.getPreviousMatchingPos(sourceFileText, this.getEnd(), function (char) { return char === "\n" || char === "\r"; });
        return this.sourceFile.getLineNumberAtPos(endLinePos);
    };
    /**
     * Gets the length from the start of the line to the start of the node.
     * @param includeJsDocComment - Whether to include the JS doc comment or not.
     */
    Node.prototype.getStartColumn = function (includeJsDocComment) {
        return this.sourceFile.getColumnAtPos(this.getStart(includeJsDocComment));
    };
    /**
     * Gets the length from the start of the line to the end of the node.
     */
    Node.prototype.getEndColumn = function () {
        return this.sourceFile.getColumnAtPos(this.getEnd());
    };
    /**
     * Gets if this is the first node on the current line.
     */
    Node.prototype.isFirstNodeOnLine = function () {
        var sourceFileText = this.sourceFile.getFullText();
        var startPos = this.getNonWhitespaceStart();
        for (var i = startPos - 1; i >= 0; i--) {
            var currentChar = sourceFileText[i];
            if (currentChar === " " || currentChar === "\t")
                continue;
            if (currentChar === "\n")
                return true;
            return false;
        }
        return true; // first node on the first line
    };
    Node.prototype.replaceWithText = function (textOrWriterFunction, writer) {
        var newText = utils_1.getTextFromStringOrWriter(writer || this.getWriter(), textOrWriterFunction);
        if (utils_1.TypeGuards.isSourceFile(this)) {
            this.replaceText([this.getPos(), this.getEnd()], newText);
            return this;
        }
        var parent = this.getParentSyntaxList() || this.getParentOrThrow();
        var childIndex = this.getChildIndex();
        var start = this.getStart(true);
        manipulation_1.insertIntoParentTextRange({
            parent: parent,
            insertPos: start,
            newText: newText,
            replacing: {
                textLength: this.getEnd() - start
            }
        });
        return parent.getChildren()[childIndex];
    };
    /**
     * Prepends the specified whitespace to current node.
     * @param textOrWriterFunction - Text or writer function.
     */
    Node.prototype.prependWhitespace = function (textOrWriterFunction) {
        insertWhiteSpaceTextAtPos(this, this.getStart(true), textOrWriterFunction, "prependWhitespace");
    };
    /**
     * Appends the specified whitespace to current node.
     * @param textOrWriterFunction - Text or writer function.
     */
    Node.prototype.appendWhitespace = function (textOrWriterFunction) {
        insertWhiteSpaceTextAtPos(this, this.getEnd(), textOrWriterFunction, "appendWhitespace");
    };
    /**
     * Formats the node's text using the internal TypeScript formatting API.
     * @param settings - Format code settings.
     */
    Node.prototype.formatText = function (settings) {
        if (settings === void 0) { settings = {}; }
        var formattingEdits = this.global.languageService.getFormattingEditsForRange(this.sourceFile.getFilePath(), [this.getStart(true), this.getEnd()], settings);
        manipulation_1.replaceSourceFileTextForFormatting({
            sourceFile: this.sourceFile,
            newText: manipulation_1.getTextFromFormattingEdits(this.sourceFile, formattingEdits)
        });
    };
    /**
     * Gets the leading comment ranges of the current node.
     */
    Node.prototype.getLeadingCommentRanges = function () {
        return this._leadingCommentRanges || (this._leadingCommentRanges = this._getCommentsAtPos(this.getFullStart(), typescript_1.ts.getLeadingCommentRanges));
    };
    /**
     * Gets the trailing comment ranges of the current node.
     */
    Node.prototype.getTrailingCommentRanges = function () {
        return this._trailingCommentRanges || (this._trailingCommentRanges = this._getCommentsAtPos(this.getEnd(), typescript_1.ts.getTrailingCommentRanges));
    };
    /** @internal */
    Node.prototype._getCommentsAtPos = function (pos, getComments) {
        var _this = this;
        if (this.getKind() === typescript_1.SyntaxKind.SourceFile)
            return [];
        return (getComments(this.sourceFile.getFullText(), pos) || []).map(function (r) { return new CommentRange_1.CommentRange(r, _this.sourceFile); });
    };
    /**
     * Gets the children based on a kind.
     * @param kind - Syntax kind.
     */
    Node.prototype.getChildrenOfKind = function (kind) {
        var _this = this;
        return this.getCompilerChildren().filter(function (c) { return c.kind === kind; }).map(function (c) { return _this.getNodeFromCompilerNode(c); });
    };
    /**
     * Gets the first child by syntax kind or throws an error if not found.
     * @param kind - Syntax kind.
     */
    Node.prototype.getFirstChildByKindOrThrow = function (kind) {
        return errors.throwIfNullOrUndefined(this.getFirstChildByKind(kind), "A child of the kind " + utils_1.getSyntaxKindName(kind) + " was expected.");
    };
    /**
     * Gets the first child by syntax kind.
     * @param kind - Syntax kind.
     */
    Node.prototype.getFirstChildByKind = function (kind) {
        var child = this.getCompilerFirstChild(function (c) { return c.kind === kind; });
        return child == null ? undefined : this.getNodeFromCompilerNode(child);
    };
    /**
     * Gets the first child if it matches the specified syntax kind or throws an error if not found.
     * @param kind - Syntax kind.
     */
    Node.prototype.getFirstChildIfKindOrThrow = function (kind) {
        return errors.throwIfNullOrUndefined(this.getFirstChildIfKind(kind), "A first child of the kind " + utils_1.getSyntaxKindName(kind) + " was expected.");
    };
    /**
     * Gets the first child if it matches the specified syntax kind.
     * @param kind - Syntax kind.
     */
    Node.prototype.getFirstChildIfKind = function (kind) {
        var firstChild = this.getCompilerFirstChild();
        return firstChild != null && firstChild.kind === kind ? this.getNodeFromCompilerNode(firstChild) : undefined;
    };
    /**
     * Gets the last child by syntax kind or throws an error if not found.
     * @param kind - Syntax kind.
     */
    Node.prototype.getLastChildByKindOrThrow = function (kind) {
        return errors.throwIfNullOrUndefined(this.getLastChildByKind(kind), "A child of the kind " + utils_1.getSyntaxKindName(kind) + " was expected.");
    };
    /**
     * Gets the last child by syntax kind.
     * @param kind - Syntax kind.
     */
    Node.prototype.getLastChildByKind = function (kind) {
        var lastChild = this.getCompilerLastChild(function (c) { return c.kind === kind; });
        return this.getNodeFromCompilerNodeIfExists(lastChild);
    };
    /**
     * Gets the last child if it matches the specified syntax kind or throws an error if not found.
     * @param kind - Syntax kind.
     */
    Node.prototype.getLastChildIfKindOrThrow = function (kind) {
        return errors.throwIfNullOrUndefined(this.getLastChildIfKind(kind), "A last child of the kind " + utils_1.getSyntaxKindName(kind) + " was expected.");
    };
    /**
     * Gets the last child if it matches the specified syntax kind.
     * @param kind - Syntax kind.
     */
    Node.prototype.getLastChildIfKind = function (kind) {
        var lastChild = this.getCompilerLastChild();
        return lastChild != null && lastChild.kind === kind ? this.getNodeFromCompilerNode(lastChild) : undefined;
    };
    /**
     * Gets the child at the specified index if it's the specified kind or throws an exception.
     * @param index - Index to get.
     * @param kind - Expected kind.
     */
    Node.prototype.getChildAtIndexIfKindOrThrow = function (index, kind) {
        return errors.throwIfNullOrUndefined(this.getChildAtIndexIfKind(index, kind), "Child at index " + index + " was expected to be " + utils_1.getSyntaxKindName(kind));
    };
    /**
     * Gets the child at the specified index if it's the specified kind or returns undefined.
     * @param index - Index to get.
     * @param kind - Expected kind.
     */
    Node.prototype.getChildAtIndexIfKind = function (index, kind) {
        var node = this.getCompilerChildAtIndex(index);
        return node.kind === kind ? this.getNodeFromCompilerNode(node) : undefined;
    };
    /**
     * Gets the previous sibiling if it matches the specified kind, or throws.
     * @param kind - Kind to check.
     */
    Node.prototype.getPreviousSiblingIfKindOrThrow = function (kind) {
        return errors.throwIfNullOrUndefined(this.getPreviousSiblingIfKind(kind), "A previous sibling of kind " + utils_1.getSyntaxKindName(kind) + " was expected.");
    };
    /**
     * Gets the next sibiling if it matches the specified kind, or throws.
     * @param kind - Kind to check.
     */
    Node.prototype.getNextSiblingIfKindOrThrow = function (kind) {
        return errors.throwIfNullOrUndefined(this.getNextSiblingIfKind(kind), "A next sibling of kind " + utils_1.getSyntaxKindName(kind) + " was expected.");
    };
    /**
     * Gets the previous sibling if it matches the specified kind.
     * @param kind - Kind to check.
     */
    Node.prototype.getPreviousSiblingIfKind = function (kind) {
        var previousSibling = this.getCompilerPreviousSibling();
        return previousSibling != null && previousSibling.kind === kind ? this.getNodeFromCompilerNode(previousSibling) : undefined;
    };
    /**
     * Gets the next sibling if it matches the specified kind.
     * @param kind - Kind to check.
     */
    Node.prototype.getNextSiblingIfKind = function (kind) {
        var nextSibling = this.getCompilerNextSibling();
        return nextSibling != null && nextSibling.kind === kind ? this.getNodeFromCompilerNode(nextSibling) : undefined;
    };
    /**
     * Gets the parent if it's a certain syntax kind.
     */
    Node.prototype.getParentIfKind = function (kind) {
        var parentNode = this.getParent();
        return parentNode == null || parentNode.getKind() !== kind ? undefined : parentNode;
    };
    /**
     * Gets the parent if it's a certain syntax kind of throws.
     */
    Node.prototype.getParentIfKindOrThrow = function (kind) {
        return errors.throwIfNullOrUndefined(this.getParentIfKind(kind), "Expected a parent with a syntax kind of " + utils_1.getSyntaxKindName(kind) + ".");
    };
    /**
     * Gets the first ancestor by syntax kind or throws if not found.
     * @param kind - Syntax kind.
     */
    Node.prototype.getFirstAncestorByKindOrThrow = function (kind) {
        return errors.throwIfNullOrUndefined(this.getFirstAncestorByKind(kind), "Expected an ancestor with a syntax kind of " + utils_1.getSyntaxKindName(kind) + ".");
    };
    /**
     * Get the first ancestor by syntax kind.
     * @param kind - Syntax kind.
     */
    Node.prototype.getFirstAncestorByKind = function (kind) {
        var e_13, _a;
        try {
            for (var _b = tslib_1.__values(this.getAncestors(kind === typescript_1.SyntaxKind.SyntaxList)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var parent = _c.value;
                if (parent.getKind() === kind)
                    return parent;
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_13) throw e_13.error; }
        }
        return undefined;
    };
    /**
     * Gets the descendants that match a specified syntax kind.
     * @param kind - Kind to check.
     */
    Node.prototype.getDescendantsOfKind = function (kind) {
        var e_14, _a;
        var descendants = [];
        try {
            for (var _b = tslib_1.__values(this.getCompilerDescendantsIterator()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var descendant = _c.value;
                if (descendant.kind === kind)
                    descendants.push(this.getNodeFromCompilerNode(descendant));
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_14) throw e_14.error; }
        }
        return descendants;
    };
    /**
     * Gets the first descendant by syntax kind or throws.
     * @param kind - Syntax kind.
     */
    Node.prototype.getFirstDescendantByKindOrThrow = function (kind) {
        return errors.throwIfNullOrUndefined(this.getFirstDescendantByKind(kind), "A descendant of kind " + utils_1.getSyntaxKindName(kind) + " was expected to be found.");
    };
    /**
     * Gets the first descendant by syntax kind.
     * @param kind - Syntax kind.
     */
    Node.prototype.getFirstDescendantByKind = function (kind) {
        var e_15, _a;
        try {
            for (var _b = tslib_1.__values(this.getCompilerDescendantsIterator()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var descendant = _c.value;
                if (descendant.kind === kind)
                    return this.getNodeFromCompilerNode(descendant);
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_15) throw e_15.error; }
        }
        return undefined;
    };
    /**
     * Gets the compiler children of the node.
     * @internal
     */
    Node.prototype.getCompilerChildren = function () {
        return this.compilerNode.getChildren(this.sourceFile.compilerNode);
    };
    /**
     * Gets the node's descendant compiler nodes as an iterator.
     * @internal
     */
    Node.prototype.getCompilerDescendantsIterator = function () {
        var compilerSourceFile = this.sourceFile.compilerNode;
        return getDescendantsIterator(this.compilerNode);
        function getDescendantsIterator(node) {
            var e_16, _a, _b, _c, child, e_16_1;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, 7, 8]);
                        _b = tslib_1.__values(node.getChildren(compilerSourceFile)), _c = _b.next();
                        _d.label = 1;
                    case 1:
                        if (!!_c.done) return [3 /*break*/, 5];
                        child = _c.value;
                        return [4 /*yield*/, child];
                    case 2:
                        _d.sent();
                        return [5 /*yield**/, tslib_1.__values(getDescendantsIterator(child))];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _c = _b.next();
                        return [3 /*break*/, 1];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_16_1 = _d.sent();
                        e_16 = { error: e_16_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_16) throw e_16.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }
    };
    /**
     * Gets the first compiler node child that matches the condition.
     * @param condition - Condition.
     * @internal
     */
    Node.prototype.getCompilerFirstChild = function (condition) {
        var e_17, _a;
        try {
            for (var _b = tslib_1.__values(this.getCompilerChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (condition == null || condition(child))
                    return child;
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_17) throw e_17.error; }
        }
        return undefined;
    };
    /**
     * Gets the last compiler node child that matches the condition.
     * @param condition - Condition.
     * @internal
     */
    Node.prototype.getCompilerLastChild = function (condition) {
        var children = this.getCompilerChildren();
        for (var i = children.length - 1; i >= 0; i--) {
            var child = children[i];
            if (condition == null || condition(child))
                return child;
        }
        return undefined;
    };
    /**
     * Gets the previous compiler siblings.
     *
     * Note: Closest sibling is the zero index.
     * @internal
     */
    Node.prototype.getCompilerPreviousSiblings = function () {
        var e_18, _a;
        var parent = this.getParentSyntaxList() || this.getParentOrThrow();
        var previousSiblings = [];
        try {
            for (var _b = tslib_1.__values(parent.getCompilerChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (child === this.compilerNode)
                    break;
                previousSiblings.unshift(child);
            }
        }
        catch (e_18_1) { e_18 = { error: e_18_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_18) throw e_18.error; }
        }
        return previousSiblings;
    };
    /**
     * Gets the next compiler siblings.
     *
     * Note: Closest sibling is the zero index.
     * @internal
     */
    Node.prototype.getCompilerNextSiblings = function () {
        var e_19, _a;
        var foundChild = false;
        var parent = this.getParentSyntaxList() || this.getParentOrThrow();
        var nextSiblings = [];
        try {
            for (var _b = tslib_1.__values(parent.getCompilerChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                if (!foundChild) {
                    foundChild = child === this.compilerNode;
                    continue;
                }
                nextSiblings.push(child);
            }
        }
        catch (e_19_1) { e_19 = { error: e_19_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_19) throw e_19.error; }
        }
        return nextSiblings;
    };
    /**
     * Gets the previous compiler sibling.
     * @param condition - Optional condition for getting the previous sibling.
     * @internal
     */
    Node.prototype.getCompilerPreviousSibling = function (condition) {
        var e_20, _a;
        try {
            for (var _b = tslib_1.__values(this.getCompilerPreviousSiblings()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sibling = _c.value;
                if (condition == null || condition(sibling))
                    return sibling;
            }
        }
        catch (e_20_1) { e_20 = { error: e_20_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_20) throw e_20.error; }
        }
        return undefined;
    };
    /**
     * Gets the next compiler sibling.
     * @param condition - Optional condition for getting the previous sibling.
     * @internal
     */
    Node.prototype.getCompilerNextSibling = function (condition) {
        var e_21, _a;
        try {
            for (var _b = tslib_1.__values(this.getCompilerNextSiblings()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sibling = _c.value;
                if (condition == null || condition(sibling))
                    return sibling;
            }
        }
        catch (e_21_1) { e_21 = { error: e_21_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_21) throw e_21.error; }
        }
        return undefined;
    };
    /**
     * Gets the compiler child at the specified index.
     * @param index - Index.
     * @internal
     */
    Node.prototype.getCompilerChildAtIndex = function (index) {
        var children = this.getCompilerChildren();
        errors.throwIfOutOfRange(index, [0, children.length - 1], "index");
        return children[index];
    };
    /**
     * Gets a writer with the indentation text.
     * @internal
     */
    Node.prototype.getWriterWithIndentation = function () {
        var writer = this.getWriter();
        writer.setIndentationLevel(this.getIndentationLevel());
        return writer;
    };
    /**
     * Gets a writer with the queued indentation text.
     * @internal
     */
    Node.prototype.getWriterWithQueuedIndentation = function () {
        var writer = this.getWriter();
        writer.queueIndentationLevel(this.getIndentationLevel());
        return writer;
    };
    /**
     * Gets a writer with the child indentation text.
     * @internal
     */
    Node.prototype.getWriterWithChildIndentation = function () {
        var writer = this.getWriter();
        writer.setIndentationLevel(this.getChildIndentationLevel());
        return writer;
    };
    /**
     * Gets a writer with the queued child indentation text.
     * @internal
     */
    Node.prototype.getWriterWithQueuedChildIndentation = function () {
        var writer = this.getWriter();
        writer.queueIndentationLevel(this.getChildIndentationLevel());
        return writer;
    };
    /**
     * Gets a writer with no child indentation text.
     * @internal
     */
    Node.prototype.getWriter = function () {
        return this.global.createWriter();
    };
    /**
     * Gets or creates a node from the internal cache.
     * @internal
     */
    Node.prototype.getNodeFromCompilerNode = function (compilerNode) {
        return this.global.compilerFactory.getNodeFromCompilerNode(compilerNode, this.sourceFile);
    };
    /**
     * Gets or creates a node from the internal cache, if it exists.
     * @internal
     */
    Node.prototype.getNodeFromCompilerNodeIfExists = function (compilerNode) {
        return compilerNode == null ? undefined : this.getNodeFromCompilerNode(compilerNode);
    };
    /**
     * Ensures that the binder has bound the node before.
     * @internal
     */
    Node.prototype.ensureBound = function () {
        if (this.compilerNode.symbol != null)
            return;
        this.getSymbol(); // binds the node
    };
    return Node;
}());
exports.Node = Node;
function getWrappedCondition(thisNode, condition) {
    return condition == null ? undefined : (function (c) { return condition(thisNode.getNodeFromCompilerNode(c)); });
}
function insertWhiteSpaceTextAtPos(node, insertPos, textOrWriterFunction, methodName) {
    var parent = utils_1.TypeGuards.isSourceFile(node) ? node.getChildSyntaxListOrThrow() : node.getParentSyntaxList() || node.getParentOrThrow();
    var newText = utils_1.getTextFromStringOrWriter(node.getWriterWithQueuedIndentation(), textOrWriterFunction);
    if (!/^[\s\r\n]*$/.test(newText))
        throw new errors.InvalidOperationError("Cannot insert non-whitespace into " + methodName + ".");
    manipulation_1.insertIntoParentTextRange({
        parent: parent,
        insertPos: insertPos,
        newText: newText
    });
}
