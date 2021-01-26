"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var structurePrinters = require("../structurePrinters");
var utils_1 = require("../utils");
/**
 * Cached lazy factory for StructurePrinters.
 */
var StructurePrinterFactory = /** @class */ (function () {
    function StructurePrinterFactory(_getFormatCodeSettings) {
        this._getFormatCodeSettings = _getFormatCodeSettings;
    }
    StructurePrinterFactory.prototype.getFormatCodeSettings = function () {
        return this._getFormatCodeSettings();
    };
    StructurePrinterFactory.prototype.forInitializerExpressionableNode = function () {
        return new structurePrinters.InitializerExpressionableNodeStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forModifierableNode = function () {
        return new structurePrinters.ModifierableNodeStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forReturnTypedNode = function (alwaysWrite) {
        return new structurePrinters.ReturnTypedNodeStructurePrinter(this, alwaysWrite);
    };
    StructurePrinterFactory.prototype.forTypedNode = function (separator, alwaysWrite) {
        return new structurePrinters.TypedNodeStructurePrinter(this, separator, alwaysWrite);
    };
    StructurePrinterFactory.prototype.forJSDoc = function () {
        return new structurePrinters.JSDocStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forDecorator = function () {
        return new structurePrinters.DecoratorStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forClassDeclaration = function (options) {
        return new structurePrinters.ClassDeclarationStructurePrinter(this, options);
    };
    StructurePrinterFactory.prototype.forConstructorDeclaration = function (options) {
        return new structurePrinters.ConstructorDeclarationStructurePrinter(this, options);
    };
    StructurePrinterFactory.prototype.forGetAccessorDeclaration = function (options) {
        return new structurePrinters.GetAccessorDeclarationStructurePrinter(this, options);
    };
    StructurePrinterFactory.prototype.forMethodDeclaration = function (options) {
        return new structurePrinters.MethodDeclarationStructurePrinter(this, options);
    };
    StructurePrinterFactory.prototype.forPropertyDeclaration = function () {
        return new structurePrinters.PropertyDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forSetAccessorDeclaration = function (options) {
        return new structurePrinters.SetAccessorDeclarationStructurePrinter(this, options);
    };
    StructurePrinterFactory.prototype.forPropertyAssignment = function () {
        return new structurePrinters.PropertyAssignmentStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forShorthandPropertyAssignment = function () {
        return new structurePrinters.ShorthandPropertyAssignmentStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forSpreadAssignment = function () {
        return new structurePrinters.SpreadAssignmentStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forEnumDeclaration = function () {
        return new structurePrinters.EnumDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forEnumMember = function () {
        return new structurePrinters.EnumMemberStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forExportAssignment = function () {
        return new structurePrinters.ExportAssignmentStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forExportDeclaration = function () {
        return new structurePrinters.ExportDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forImportDeclaration = function () {
        return new structurePrinters.ImportDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forNamedImportExportSpecifier = function () {
        return new structurePrinters.NamedImportExportSpecifierStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forSourceFile = function (options) {
        return new structurePrinters.SourceFileStructurePrinter(this, options);
    };
    StructurePrinterFactory.prototype.forFunctionDeclaration = function () {
        return new structurePrinters.FunctionDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forParameterDeclaration = function () {
        return new structurePrinters.ParameterDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forCallSignatureDeclaration = function () {
        return new structurePrinters.CallSignatureDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forConstructSignatureDeclaration = function () {
        return new structurePrinters.ConstructSignatureDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forIndexSignatureDeclaration = function () {
        return new structurePrinters.IndexSignatureDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forInterfaceDeclaration = function () {
        return new structurePrinters.InterfaceDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forMethodSignature = function () {
        return new structurePrinters.MethodSignatureStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forPropertySignature = function () {
        return new structurePrinters.PropertySignatureStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forTypeElementMemberedNode = function () {
        return new structurePrinters.TypeElementMemberedNodeStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forJsxAttribute = function () {
        return new structurePrinters.JsxAttributeStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forJsxElement = function () {
        return new structurePrinters.JsxElementStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forNamespaceDeclaration = function (options) {
        return new structurePrinters.NamespaceDeclarationStructurePrinter(this, options);
    };
    StructurePrinterFactory.prototype.forBodyText = function (options) {
        return new structurePrinters.BodyTextStructurePrinter(this, options);
    };
    StructurePrinterFactory.prototype.forStatementedNode = function (options) {
        return new structurePrinters.StatementedNodeStructurePrinter(this, options);
    };
    StructurePrinterFactory.prototype.forVariableDeclaration = function () {
        return new structurePrinters.VariableDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forVariableStatement = function () {
        return new structurePrinters.VariableStatementStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forTypeAliasDeclaration = function () {
        return new structurePrinters.TypeAliasDeclarationStructurePrinter(this);
    };
    StructurePrinterFactory.prototype.forTypeParameterDeclaration = function () {
        return new structurePrinters.TypeParameterDeclarationStructurePrinter(this);
    };
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forInitializerExpressionableNode", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forModifierableNode", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forReturnTypedNode", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forTypedNode", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forJSDoc", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forDecorator", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forClassDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forConstructorDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forGetAccessorDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forMethodDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forPropertyDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forSetAccessorDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forPropertyAssignment", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forShorthandPropertyAssignment", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forSpreadAssignment", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forEnumDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forEnumMember", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forExportAssignment", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forExportDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forImportDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forNamedImportExportSpecifier", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forSourceFile", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forFunctionDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forParameterDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forCallSignatureDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forConstructSignatureDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forIndexSignatureDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forInterfaceDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forMethodSignature", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forPropertySignature", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forTypeElementMemberedNode", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forJsxAttribute", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forJsxElement", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forNamespaceDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forBodyText", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forStatementedNode", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forVariableDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forVariableStatement", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forTypeAliasDeclaration", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], StructurePrinterFactory.prototype, "forTypeParameterDeclaration", null);
    return StructurePrinterFactory;
}());
exports.StructurePrinterFactory = StructurePrinterFactory;
