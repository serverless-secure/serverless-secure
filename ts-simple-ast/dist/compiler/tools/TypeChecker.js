"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typescript_1 = require("../../typescript");
/**
 * Wrapper around the TypeChecker.
 */
var TypeChecker = /** @class */ (function () {
    /** @internal */
    function TypeChecker(global) {
        this.global = global;
    }
    Object.defineProperty(TypeChecker.prototype, "compilerObject", {
        /**
         * Gets the compiler's TypeChecker.
         */
        get: function () {
            return this._getCompilerObject();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Resets the type checker.
     * @internal
     */
    TypeChecker.prototype.reset = function (getTypeChecker) {
        this._getCompilerObject = getTypeChecker;
    };
    /**
     * Gets the apparent type of a type.
     * @param type - Type to get the apparent type of.
     */
    TypeChecker.prototype.getApparentType = function (type) {
        return this.global.compilerFactory.getType(this.compilerObject.getApparentType(type.compilerType));
    };
    /**
     * Gets the constant value of a declaration.
     * @param node - Node to get the constant value from.
     */
    TypeChecker.prototype.getConstantValue = function (node) {
        return this.compilerObject.getConstantValue(node.compilerNode);
    };
    /**
     * Gets the fully qualified name of a symbol.
     * @param symbol - Symbol to get the fully qualified name of.
     */
    TypeChecker.prototype.getFullyQualifiedName = function (symbol) {
        return this.compilerObject.getFullyQualifiedName(symbol.compilerSymbol);
    };
    /**
     * Gets the type at the specified location.
     * @param node - Node to get the type for.
     */
    TypeChecker.prototype.getTypeAtLocation = function (node) {
        return this.global.compilerFactory.getType(this.compilerObject.getTypeAtLocation(node.compilerNode));
    };
    /**
     * Gets the contextual type of an expression.
     * @param expression - Expression.
     */
    TypeChecker.prototype.getContextualType = function (expression) {
        var contextualType = this.compilerObject.getContextualType(expression.compilerNode);
        return contextualType == null ? undefined : this.global.compilerFactory.getType(contextualType);
    };
    /**
     * Gets the type of a symbol at the specified location.
     * @param symbol - Symbol to get the type for.
     * @param node - Location to get the type for.
     */
    TypeChecker.prototype.getTypeOfSymbolAtLocation = function (symbol, node) {
        return this.global.compilerFactory.getType(this.compilerObject.getTypeOfSymbolAtLocation(symbol.compilerSymbol, node.compilerNode));
    };
    /**
     * Gets the declared type of a symbol.
     * @param symbol - Symbol to get the type for.
     */
    TypeChecker.prototype.getDeclaredTypeOfSymbol = function (symbol) {
        return this.global.compilerFactory.getType(this.compilerObject.getDeclaredTypeOfSymbol(symbol.compilerSymbol));
    };
    /**
     * Gets the symbol at the specified location or undefined if none exists.
     * @param node - Node to get the symbol for.
     */
    TypeChecker.prototype.getSymbolAtLocation = function (node) {
        var compilerSymbol = this.compilerObject.getSymbolAtLocation(node.compilerNode);
        return compilerSymbol == null ? undefined : this.global.compilerFactory.getSymbol(compilerSymbol);
    };
    /**
     * Gets the aliased symbol of a symbol.
     * @param symbol - Symbol to get the alias symbol of.
     */
    TypeChecker.prototype.getAliasedSymbol = function (symbol) {
        if (!symbol.hasFlags(typescript_1.SymbolFlags.Alias))
            return undefined;
        var tsAliasSymbol = this.compilerObject.getAliasedSymbol(symbol.compilerSymbol);
        return tsAliasSymbol == null ? undefined : this.global.compilerFactory.getSymbol(tsAliasSymbol);
    };
    /**
     * Gets the properties of a type.
     * @param type - Type.
     */
    TypeChecker.prototype.getPropertiesOfType = function (type) {
        var _this = this;
        return this.compilerObject.getPropertiesOfType(type.compilerType).map(function (p) { return _this.global.compilerFactory.getSymbol(p); });
    };
    /**
     * Gets the type text
     * @param type - Type to get the text of.
     * @param enclosingNode - Enclosing node.
     * @param typeFormatFlags - Type format flags.
     */
    TypeChecker.prototype.getTypeText = function (type, enclosingNode, typeFormatFlags) {
        if (typeFormatFlags == null)
            typeFormatFlags = this.getDefaultTypeFormatFlags(enclosingNode);
        var compilerNode = enclosingNode == null ? undefined : enclosingNode.compilerNode;
        return this.compilerObject.typeToString(type.compilerType, compilerNode, typeFormatFlags);
    };
    /**
     * Gets the return type of a signature.
     * @param signature - Signature to get the return type of.
     */
    TypeChecker.prototype.getReturnTypeOfSignature = function (signature) {
        return this.global.compilerFactory.getType(this.compilerObject.getReturnTypeOfSignature(signature.compilerSignature));
    };
    /**
     * Gets a signature from a node.
     * @param node - Node to get the signature from.
     */
    TypeChecker.prototype.getSignatureFromNode = function (node) {
        var signature = this.compilerObject.getSignatureFromDeclaration(node.compilerNode);
        return signature == null ? undefined : this.global.compilerFactory.getSignature(signature);
    };
    /**
     * Gets the exports of a module.
     * @param moduleSymbol - Module symbol.
     */
    TypeChecker.prototype.getExportsOfModule = function (moduleSymbol) {
        var _this = this;
        var symbols = this.compilerObject.getExportsOfModule(moduleSymbol.compilerSymbol);
        return (symbols || []).map(function (s) { return _this.global.compilerFactory.getSymbol(s); });
    };
    /**
     * Gets the local target symbol of the provided export specifier.
     * @param exportSpecifier - Export specifier.
     */
    TypeChecker.prototype.getExportSpecifierLocalTargetSymbol = function (exportSpecifier) {
        var symbol = this.compilerObject.getExportSpecifierLocalTargetSymbol(exportSpecifier.compilerNode);
        return symbol == null ? undefined : this.global.compilerFactory.getSymbol(symbol);
    };
    /**
     * Gets the base type of a literal type.
     *
     * For example, for a number literal type it will return the number type.
     * @param type - Literal type to get the base type of.
     */
    TypeChecker.prototype.getBaseTypeOfLiteralType = function (type) {
        return this.global.compilerFactory.getType(this.compilerObject.getBaseTypeOfLiteralType(type.compilerType));
    };
    TypeChecker.prototype.getDefaultTypeFormatFlags = function (enclosingNode) {
        var formatFlags = (typescript_1.TypeFormatFlags.UseTypeOfFunction | typescript_1.TypeFormatFlags.NoTruncation | typescript_1.TypeFormatFlags.UseFullyQualifiedType |
            typescript_1.TypeFormatFlags.WriteTypeArgumentsOfSignature);
        if (enclosingNode != null && enclosingNode.getKind() === typescript_1.SyntaxKind.TypeAliasDeclaration)
            formatFlags |= typescript_1.TypeFormatFlags.InTypeAlias;
        return formatFlags;
    };
    return TypeChecker;
}());
exports.TypeChecker = TypeChecker;
