"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../../errors");
var manipulation_1 = require("../../../manipulation");
var structurePrinters_1 = require("../../../structurePrinters");
var typescript_1 = require("../../../typescript");
var utils_1 = require("../../../utils");
var PrimaryExpression_1 = require("../PrimaryExpression");
exports.ObjectLiteralExpressionBase = PrimaryExpression_1.PrimaryExpression;
var ObjectLiteralExpression = /** @class */ (function (_super) {
    tslib_1.__extends(ObjectLiteralExpression, _super);
    function ObjectLiteralExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectLiteralExpression.prototype.getPropertyOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getProperty(nameOrFindFunction), "Expected to find a property.");
    };
    ObjectLiteralExpression.prototype.getProperty = function (nameOrFindFunction) {
        var findFunc;
        if (typeof nameOrFindFunction === "string")
            findFunc = function (prop) {
                if (prop["getName"] == null)
                    return false;
                return prop.getName() === nameOrFindFunction;
            };
        else
            findFunc = nameOrFindFunction;
        return utils_1.ArrayUtils.find(this.getProperties(), findFunc);
    };
    /**
     * Gets the properties.
     */
    ObjectLiteralExpression.prototype.getProperties = function () {
        var _this = this;
        var properties = this.compilerNode.properties; // explicit type for validation
        return properties.map(function (p) { return _this.getNodeFromCompilerNode(p); });
    };
    /* Property Assignments */
    /**
     * Adds a property assignment.
     * @param structure - Structure that represents the property assignment to add.
     */
    ObjectLiteralExpression.prototype.addPropertyAssignment = function (structure) {
        return this.addPropertyAssignments([structure])[0];
    };
    /**
     * Adds property assignments.
     * @param structures - Structure that represents the property assignments to add.
     */
    ObjectLiteralExpression.prototype.addPropertyAssignments = function (structures) {
        return this.insertPropertyAssignments(this.compilerNode.properties.length, structures);
    };
    /**
     * Inserts a property assignment at the specified index.
     * @param index - Index to insert.
     * @param structure - Structure that represents the property assignment to insert.
     */
    ObjectLiteralExpression.prototype.insertPropertyAssignment = function (index, structure) {
        return this.insertPropertyAssignments(index, [structure])[0];
    };
    /**
     * Inserts property assignments at the specified index.
     * @param index - Index to insert.
     * @param structures - Structures that represent the property assignments to insert.
     */
    ObjectLiteralExpression.prototype.insertPropertyAssignments = function (index, structures) {
        var _this = this;
        return this._insertProperty(index, structures, function () { return _this.global.structurePrinterFactory.forPropertyAssignment(); });
    };
    /* Shorthand Property Assignments */
    /**
     * Adds a shorthand property assignment.
     * @param structure - Structure that represents the shorthand property assignment to add.
     */
    ObjectLiteralExpression.prototype.addShorthandPropertyAssignment = function (structure) {
        return this.addShorthandPropertyAssignments([structure])[0];
    };
    /**
     * Adds shorthand property assignments.
     * @param structures - Structure that represents the shorthand property assignments to add.
     */
    ObjectLiteralExpression.prototype.addShorthandPropertyAssignments = function (structures) {
        return this.insertShorthandPropertyAssignments(this.compilerNode.properties.length, structures);
    };
    /**
     * Inserts a shorthand property assignment at the specified index.
     * @param index - Index to insert.
     * @param structure - Structure that represents the shorthand property assignment to insert.
     */
    ObjectLiteralExpression.prototype.insertShorthandPropertyAssignment = function (index, structure) {
        return this.insertShorthandPropertyAssignments(index, [structure])[0];
    };
    /**
     * Inserts shorthand property assignments at the specified index.
     * @param index - Index to insert.
     * @param structures - Structures that represent the shorthand property assignments to insert.
     */
    ObjectLiteralExpression.prototype.insertShorthandPropertyAssignments = function (index, structures) {
        var _this = this;
        return this._insertProperty(index, structures, function () { return _this.global.structurePrinterFactory.forShorthandPropertyAssignment(); });
    };
    /* Spread Assignments */
    /**
     * Adds a spread assignment.
     * @param structure - Structure that represents the spread assignment to add.
     */
    ObjectLiteralExpression.prototype.addSpreadAssignment = function (structure) {
        return this.addSpreadAssignments([structure])[0];
    };
    /**
     * Adds spread assignments.
     * @param structures - Structure that represents the spread assignments to add.
     */
    ObjectLiteralExpression.prototype.addSpreadAssignments = function (structures) {
        return this.insertSpreadAssignments(this.compilerNode.properties.length, structures);
    };
    /**
     * Inserts a spread assignment at the specified index.
     * @param index - Index to insert.
     * @param structure - Structure that represents the spread assignment to insert.
     */
    ObjectLiteralExpression.prototype.insertSpreadAssignment = function (index, structure) {
        return this.insertSpreadAssignments(index, [structure])[0];
    };
    /**
     * Inserts spread assignments at the specified index.
     * @param index - Index to insert.
     * @param structures - Structures that represent the spread assignments to insert.
     */
    ObjectLiteralExpression.prototype.insertSpreadAssignments = function (index, structures) {
        var _this = this;
        return this._insertProperty(index, structures, function () { return _this.global.structurePrinterFactory.forSpreadAssignment(); });
    };
    /* Method Declarations */
    /**
     * Adds a method.
     * @param structure - Structure that represents the method to add.
     */
    ObjectLiteralExpression.prototype.addMethod = function (structure) {
        return this.addMethods([structure])[0];
    };
    /**
     * Adds methods.
     * @param structures - Structure that represents the methods to add.
     */
    ObjectLiteralExpression.prototype.addMethods = function (structures) {
        return this.insertMethods(this.compilerNode.properties.length, structures);
    };
    /**
     * Inserts a method at the specified index.
     * @param index - Index to insert.
     * @param structure - Structure that represents the method to insert.
     */
    ObjectLiteralExpression.prototype.insertMethod = function (index, structure) {
        return this.insertMethods(index, [structure])[0];
    };
    /**
     * Inserts methods at the specified index.
     * @param index - Index to insert.
     * @param structures - Structures that represent the methods to insert.
     */
    ObjectLiteralExpression.prototype.insertMethods = function (index, structures) {
        var _this = this;
        return this._insertProperty(index, structures, function () { return _this.global.structurePrinterFactory.forMethodDeclaration({ isAmbient: false }); });
    };
    /* Get Accessor Declarations */
    /**
     * Adds a get accessor.
     * @param structure - Structure that represents the property assignment to add.
     */
    ObjectLiteralExpression.prototype.addGetAccessor = function (structure) {
        return this.addGetAccessors([structure])[0];
    };
    /**
     * Adds get accessors.
     * @param structures - Structure that represents the get accessors to add.
     */
    ObjectLiteralExpression.prototype.addGetAccessors = function (structures) {
        return this.insertGetAccessors(this.compilerNode.properties.length, structures);
    };
    /**
     * Inserts a get accessor at the specified index.
     * @param index - Index to insert.
     * @param structure - Structure that represents the get accessor to insert.
     */
    ObjectLiteralExpression.prototype.insertGetAccessor = function (index, structure) {
        return this.insertGetAccessors(index, [structure])[0];
    };
    /**
     * Inserts get accessors at the specified index.
     * @param index - Index to insert.
     * @param structures - Structures that represent the get accessors to insert.
     */
    ObjectLiteralExpression.prototype.insertGetAccessors = function (index, structures) {
        var _this = this;
        return this._insertProperty(index, structures, function () { return _this.global.structurePrinterFactory.forGetAccessorDeclaration({ isAmbient: false }); });
    };
    /* Set Accessor Declarations */
    /**
     * Adds a set accessor.
     * @param structure - Structure that represents the property assignment to add.
     */
    ObjectLiteralExpression.prototype.addSetAccessor = function (structure) {
        return this.addSetAccessors([structure])[0];
    };
    /**
     * Adds set accessors.
     * @param structures - Structure that represents the set accessors to add.
     */
    ObjectLiteralExpression.prototype.addSetAccessors = function (structures) {
        return this.insertSetAccessors(this.compilerNode.properties.length, structures);
    };
    /**
     * Inserts a set accessor at the specified index.
     * @param index - Index to insert.
     * @param structure - Structure that represents the set accessor to insert.
     */
    ObjectLiteralExpression.prototype.insertSetAccessor = function (index, structure) {
        return this.insertSetAccessors(index, [structure])[0];
    };
    /**
     * Inserts set accessors at the specified index.
     * @param index - Index to insert.
     * @param structures - Structures that represent the set accessors to insert.
     */
    ObjectLiteralExpression.prototype.insertSetAccessors = function (index, structures) {
        var _this = this;
        return this._insertProperty(index, structures, function () { return _this.global.structurePrinterFactory.forSetAccessorDeclaration({ isAmbient: false }); });
    };
    /**
     * @internal
     */
    ObjectLiteralExpression.prototype._insertProperty = function (index, structures, createStructurePrinter) {
        index = manipulation_1.verifyAndGetIndex(index, this.compilerNode.properties.length);
        var writer = this.getWriterWithChildIndentation();
        var structurePrinter = new structurePrinters_1.CommaNewLineSeparatedStructuresPrinter(createStructurePrinter());
        structurePrinter.printText(writer, structures);
        manipulation_1.insertIntoCommaSeparatedNodes({
            parent: this.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.SyntaxList),
            currentNodes: this.getProperties(),
            insertIndex: index,
            newText: writer.toString(),
            useNewLines: true
        });
        return manipulation_1.getNodesToReturn(this.getProperties(), index, structures.length);
    };
    return ObjectLiteralExpression;
}(exports.ObjectLiteralExpressionBase));
exports.ObjectLiteralExpression = ObjectLiteralExpression;
