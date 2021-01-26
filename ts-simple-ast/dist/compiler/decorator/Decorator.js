"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var common_1 = require("../common");
exports.DecoratorBase = common_1.Node;
var Decorator = /** @class */ (function (_super) {
    tslib_1.__extends(Decorator, _super);
    function Decorator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the decorator name.
     */
    Decorator.prototype.getName = function () {
        return this.getNameNode().getText();
    };
    /**
     * Gets the name node of the decorator.
     */
    Decorator.prototype.getNameNode = function () {
        var sourceFile = this.getSourceFile();
        if (this.isDecoratorFactory()) {
            var callExpression = this.getCallExpression();
            return getIdentifierFromName(callExpression.getExpression());
        }
        return getIdentifierFromName(this.getExpression());
        function getIdentifierFromName(expression) {
            var identifier = getNameFromExpression(expression);
            if (!utils_1.TypeGuards.isIdentifier(identifier)) {
                throw new errors.NotImplementedError("Expected the decorator expression '" + identifier.getText() + "' to be an identifier, " +
                    "but it wasn't. Please report this as a bug.");
            }
            return identifier;
        }
        function getNameFromExpression(expression) {
            if (utils_1.TypeGuards.isPropertyAccessExpression(expression))
                return expression.getNameNode();
            return expression;
        }
    };
    /**
     * Gets the full decorator name.
     */
    Decorator.prototype.getFullName = function () {
        var sourceFile = this.getSourceFile();
        if (this.isDecoratorFactory())
            return this.getCallExpression().getExpression().getText();
        return this.compilerNode.expression.getText(sourceFile.compilerNode);
    };
    /**
     * Gets if the decorator is a decorator factory.
     */
    Decorator.prototype.isDecoratorFactory = function () {
        return this.compilerNode.expression.kind === typescript_1.SyntaxKind.CallExpression;
    };
    /**
     * Set if this decorator is a decorator factory.
     * @param isDecoratorFactory - If it should be a decorator factory or not.
     */
    Decorator.prototype.setIsDecoratorFactory = function (isDecoratorFactory) {
        if (this.isDecoratorFactory() === isDecoratorFactory)
            return this;
        if (isDecoratorFactory) {
            var expression_1 = this.getExpression();
            var expressionText = expression_1.getText();
            manipulation_1.insertIntoParentTextRange({
                parent: this,
                insertPos: expression_1.getStart(),
                newText: expressionText + "()",
                replacing: {
                    textLength: expressionText.length
                },
                customMappings: function (newParent) {
                    // the expression will move into the call expression
                    return [{ currentNode: expression_1, newNode: newParent.expression.expression }];
                }
            });
        }
        else {
            var callExpression = this.getCallExpressionOrThrow();
            var expression_2 = callExpression.getExpression();
            var expressionText = expression_2.getText();
            manipulation_1.insertIntoParentTextRange({
                parent: this,
                insertPos: callExpression.getStart(),
                newText: "" + expressionText,
                replacing: {
                    textLength: callExpression.getWidth()
                },
                customMappings: function (newParent) {
                    // the expression will move out of the call expression
                    return [{ currentNode: expression_2, newNode: newParent.expression }];
                }
            });
        }
        return this;
    };
    /**
     * Gets the call expression if a decorator factory, or throws.
     */
    Decorator.prototype.getCallExpressionOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getCallExpression(), "Expected to find a call expression.");
    };
    /**
     * Gets the call expression if a decorator factory.
     */
    Decorator.prototype.getCallExpression = function () {
        if (!this.isDecoratorFactory())
            return undefined;
        return this.getExpression();
    };
    /**
     * Gets the expression.
     */
    Decorator.prototype.getExpression = function () {
        return this.getNodeFromCompilerNode(this.compilerNode.expression);
    };
    /**
     * Gets the decorator's arguments from its call expression.
     */
    Decorator.prototype.getArguments = function () {
        var callExpression = this.getCallExpression();
        return callExpression == null ? [] : callExpression.getArguments();
    };
    /**
     * Gets the decorator's type arguments from its call expression.
     */
    Decorator.prototype.getTypeArguments = function () {
        var callExpression = this.getCallExpression();
        return callExpression == null ? [] : callExpression.getTypeArguments();
    };
    /**
     * Adds a type argument.
     * @param argumentTexts - Argument text.
     */
    Decorator.prototype.addTypeArgument = function (argumentText) {
        return this.getCallExpressionOrThrow().addTypeArgument(argumentText);
    };
    /**
     * Adds type arguments.
     * @param argumentTexts - Argument texts.
     */
    Decorator.prototype.addTypeArguments = function (argumentTexts) {
        return this.getCallExpressionOrThrow().addTypeArguments(argumentTexts);
    };
    /**
     * Inserts a type argument.
     * @param index - Index to insert at.
     * @param argumentTexts - Argument text.
     */
    Decorator.prototype.insertTypeArgument = function (index, argumentText) {
        return this.getCallExpressionOrThrow().insertTypeArgument(index, argumentText);
    };
    /**
     * Inserts type arguments.
     * @param index - Index to insert at.
     * @param argumentTexts - Argument texts.
     */
    Decorator.prototype.insertTypeArguments = function (index, argumentTexts) {
        return this.getCallExpressionOrThrow().insertTypeArguments(index, argumentTexts);
    };
    Decorator.prototype.removeTypeArgument = function (typeArgOrIndex) {
        var callExpression = this.getCallExpression();
        if (callExpression == null)
            throw new errors.InvalidOperationError("Cannot remove a type argument from a decorator that has no type arguments.");
        callExpression.removeTypeArgument(typeArgOrIndex);
        return this;
    };
    /**
     * Adds an argument.
     * @param argumentTexts - Argument text.
     */
    Decorator.prototype.addArgument = function (argumentText) {
        return this.addArguments([argumentText])[0];
    };
    /**
     * Adds arguments.
     * @param argumentTexts - Argument texts.
     */
    Decorator.prototype.addArguments = function (argumentTexts) {
        return this.insertArguments(this.getArguments().length, argumentTexts);
    };
    /**
     * Inserts an argument.
     * @param index - Index to insert at.
     * @param argumentTexts - Argument text.
     */
    Decorator.prototype.insertArgument = function (index, argumentText) {
        return this.insertArguments(index, [argumentText])[0];
    };
    /**
     * Inserts arguments.
     * @param index - Index to insert at.
     * @param argumentTexts - Argument texts.
     */
    Decorator.prototype.insertArguments = function (index, argumentTexts) {
        this.setIsDecoratorFactory(true);
        return this.getCallExpressionOrThrow().insertArguments(index, argumentTexts);
    };
    Decorator.prototype.removeArgument = function (argOrIndex) {
        var callExpression = this.getCallExpression();
        if (callExpression == null)
            throw new errors.InvalidOperationError("Cannot remove an argument from a decorator that has no arguments.");
        callExpression.removeArgument(argOrIndex);
        return this;
    };
    /**
     * Removes this decorator.
     */
    Decorator.prototype.remove = function () {
        var thisStartLinePos = this.getStartLinePos();
        var previousDecorator = this.getPreviousSiblingIfKind(typescript_1.SyntaxKind.Decorator);
        if (previousDecorator != null && previousDecorator.getStartLinePos() === thisStartLinePos) {
            manipulation_1.removeChildren({
                children: [this],
                removePrecedingSpaces: true
            });
        }
        else
            manipulation_1.removeChildrenWithFormattingFromCollapsibleSyntaxList({
                children: [this],
                getSiblingFormatting: function (parent, sibling) { return sibling.getStartLinePos() === thisStartLinePos ? manipulation_1.FormattingKind.Space : manipulation_1.FormattingKind.Newline; }
            });
    };
    return Decorator;
}(exports.DecoratorBase));
exports.Decorator = Decorator;
