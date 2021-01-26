"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors = require("../../errors");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var Type = /** @class */ (function () {
    /**
     * Initializes a new instance of Type.
     * @internal
     * @param global - Global container.
     * @param type - Compiler type.
     */
    function Type(global, type) {
        this.global = global;
        this._compilerType = type;
    }
    Object.defineProperty(Type.prototype, "compilerType", {
        /**
         * Gets the underlying compiler type.
         */
        get: function () {
            return this._compilerType;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the type text.
     * @param enclosingNode - The enclosing node.
     * @param typeFormatFlags - Format flags for the type text.
     */
    Type.prototype.getText = function (enclosingNode, typeFormatFlags) {
        return this.global.typeChecker.getTypeText(this, enclosingNode, typeFormatFlags);
    };
    /**
     * Gets the alias symbol if it exists.
     */
    Type.prototype.getAliasSymbol = function () {
        return this.compilerType.aliasSymbol == null ? undefined : this.global.compilerFactory.getSymbol(this.compilerType.aliasSymbol);
    };
    /**
     * Gets the alias symbol if it exists, or throws.
     */
    Type.prototype.getAliasSymbolOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getAliasSymbol(), "Expected to find an alias symbol.");
    };
    /**
     * Gets the alias type arguments.
     */
    Type.prototype.getAliasTypeArguments = function () {
        var _this = this;
        var aliasTypeArgs = this.compilerType.aliasTypeArguments || [];
        return aliasTypeArgs.map(function (t) { return _this.global.compilerFactory.getType(t); });
    };
    /**
     * Gets the apparent type.
     */
    Type.prototype.getApparentType = function () {
        return this.global.typeChecker.getApparentType(this);
    };
    /**
     * Gets the array type
     */
    Type.prototype.getArrayType = function () {
        if (!this.isArray())
            return undefined;
        return this.getTypeArguments()[0];
    };
    /**
     * Gets the base types.
     */
    Type.prototype.getBaseTypes = function () {
        var _this = this;
        var baseTypes = this.compilerType.getBaseTypes() || [];
        return baseTypes.map(function (t) { return _this.global.compilerFactory.getType(t); });
    };
    /**
     * Gets the base type of a literal type.
     *
     * For example, for a number literal type it will return the number type.
     */
    Type.prototype.getBaseTypeOfLiteralType = function () {
        return this.global.typeChecker.getBaseTypeOfLiteralType(this);
    };
    /**
     * Gets the call signatures.
     */
    Type.prototype.getCallSignatures = function () {
        var _this = this;
        return this.compilerType.getCallSignatures().map(function (s) { return _this.global.compilerFactory.getSignature(s); });
    };
    /**
     * Gets the construct signatures.
     */
    Type.prototype.getConstructSignatures = function () {
        var _this = this;
        return this.compilerType.getConstructSignatures().map(function (s) { return _this.global.compilerFactory.getSignature(s); });
    };
    /**
     * Gets the constraint or throws if it doesn't exist.
     */
    Type.prototype.getConstraintOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getConstraint(), "Expected to find a constraint.");
    };
    /**
     * Gets the constraint or returns undefined if it doesn't exist.
     */
    Type.prototype.getConstraint = function () {
        var constraint = this.compilerType.getConstraint();
        return constraint == null ? undefined : this.global.compilerFactory.getType(constraint);
    };
    /**
     * Gets the default type or throws if it doesn't exist.
     */
    Type.prototype.getDefaultOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getDefault(), "Expected to find a constraint.");
    };
    /**
     * Gets the default type or returns undefined if it doesn't exist.
     */
    Type.prototype.getDefault = function () {
        var defaultType = this.compilerType.getDefault();
        return defaultType == null ? undefined : this.global.compilerFactory.getType(defaultType);
    };
    /**
     * Gets the properties of the type.
     */
    Type.prototype.getProperties = function () {
        var _this = this;
        return this.compilerType.getProperties().map(function (s) { return _this.global.compilerFactory.getSymbol(s); });
    };
    Type.prototype.getProperty = function (nameOrFindFunction) {
        return utils_1.getSymbolByNameOrFindFunction(this.getProperties(), nameOrFindFunction);
    };
    /**
     * Gets the apparent properties of the type.
     */
    Type.prototype.getApparentProperties = function () {
        var _this = this;
        return this.compilerType.getApparentProperties().map(function (s) { return _this.global.compilerFactory.getSymbol(s); });
    };
    Type.prototype.getApparentProperty = function (nameOrFindFunction) {
        return utils_1.getSymbolByNameOrFindFunction(this.getApparentProperties(), nameOrFindFunction);
    };
    /**
     * Gets if the type is possibly null or undefined.
     */
    Type.prototype.isNullable = function () {
        return this.getUnionTypes().some(function (t) { return t.isNull() || t.isUndefined(); });
    };
    /**
     * Gets the non-nullable type.
     */
    Type.prototype.getNonNullableType = function () {
        return this.global.compilerFactory.getType(this.compilerType.getNonNullableType());
    };
    /**
     * Gets the number index type.
     */
    Type.prototype.getNumberIndexType = function () {
        var numberIndexType = this.compilerType.getNumberIndexType();
        return numberIndexType == null ? undefined : this.global.compilerFactory.getType(numberIndexType);
    };
    /**
     * Gets the string index type.
     */
    Type.prototype.getStringIndexType = function () {
        var stringIndexType = this.compilerType.getStringIndexType();
        return stringIndexType == null ? undefined : this.global.compilerFactory.getType(stringIndexType);
    };
    /**
     * Gets the target type of a type reference if it exists.
     */
    Type.prototype.getTargetType = function () {
        var targetType = this.compilerType.target || undefined;
        return targetType == null ? undefined : this.global.compilerFactory.getType(targetType);
    };
    /**
     * Gets the target type of a type reference or throws if it doesn't exist.
     */
    Type.prototype.getTargetTypeOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getTargetType(), "Expected to find the target type.");
    };
    /**
     * Gets type arguments.
     */
    Type.prototype.getTypeArguments = function () {
        var _this = this;
        var typeArguments = this.compilerType.typeArguments || [];
        return typeArguments.map(function (t) { return _this.global.compilerFactory.getType(t); });
    };
    /**
     * Gets the individual element types of the tuple.
     */
    Type.prototype.getTupleElements = function () {
        return this.isTuple() ? this.getTypeArguments() : [];
    };
    /**
     * Gets the union types.
     */
    Type.prototype.getUnionTypes = function () {
        var _this = this;
        if (!this.isUnion())
            return [];
        return this.compilerType.types.map(function (t) { return _this.global.compilerFactory.getType(t); });
    };
    /**
     * Gets the intersection types.
     */
    Type.prototype.getIntersectionTypes = function () {
        var _this = this;
        if (!this.isIntersection())
            return [];
        return this.compilerType.types.map(function (t) { return _this.global.compilerFactory.getType(t); });
    };
    /**
     * Gets the symbol of the type.
     */
    Type.prototype.getSymbol = function () {
        var tsSymbol = this.compilerType.getSymbol();
        return tsSymbol == null ? undefined : this.global.compilerFactory.getSymbol(tsSymbol);
    };
    /**
     * Gets the symbol of the type or throws.
     */
    Type.prototype.getSymbolOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getSymbol(), "Expected to find a symbol.");
    };
    /**
     * Gets if this is an anonymous type.
     */
    Type.prototype.isAnonymous = function () {
        return this._hasObjectFlag(typescript_1.ObjectFlags.Anonymous);
    };
    /**
     * Gets if this is an array type.
     */
    Type.prototype.isArray = function () {
        var symbol = this.getSymbol();
        if (symbol == null)
            return false;
        return symbol.getName() === "Array" && this.getTypeArguments().length === 1;
    };
    /**
     * Gets if this is a boolean type.
     */
    Type.prototype.isBoolean = function () {
        return this._hasTypeFlag(typescript_1.TypeFlags.Boolean);
    };
    /**
     * Gets if this is a string type.
     */
    Type.prototype.isString = function () {
        return this._hasTypeFlag(typescript_1.TypeFlags.String);
    };
    /**
     * Gets if this is a number type.
     */
    Type.prototype.isNumber = function () {
        return this._hasTypeFlag(typescript_1.TypeFlags.Number);
    };
    /**
     * Gets if this is a literal type.
     */
    Type.prototype.isLiteral = function () {
        return this.compilerType.isLiteral();
    };
    /**
     * Gets if this is a boolean literal type.
     */
    Type.prototype.isBooleanLiteral = function () {
        return this._hasTypeFlag(typescript_1.TypeFlags.BooleanLiteral);
    };
    /**
     * Gets if this is an enum literal type.
     */
    Type.prototype.isEnumLiteral = function () {
        return this._hasTypeFlag(typescript_1.TypeFlags.EnumLiteral);
    };
    /**
     * Gets if this is a number literal type.
     */
    Type.prototype.isNumberLiteral = function () {
        return this._hasTypeFlag(typescript_1.TypeFlags.NumberLiteral);
    };
    /**
     * Gets if this is a string literal type.
     */
    Type.prototype.isStringLiteral = function () {
        return this.compilerType.isStringLiteral();
    };
    /**
     * Gets if this is a class type.
     */
    Type.prototype.isClass = function () {
        return this.compilerType.isClass();
    };
    /**
     * Gets if this is a class or interface type.
     */
    Type.prototype.isClassOrInterface = function () {
        return this.compilerType.isClassOrInterface();
    };
    /**
     * Gets if this is an enum type.
     */
    Type.prototype.isEnum = function () {
        return this._hasTypeFlag(typescript_1.TypeFlags.Enum);
    };
    /**
     * Gets if this is an interface type.
     */
    Type.prototype.isInterface = function () {
        return this._hasObjectFlag(typescript_1.ObjectFlags.Interface);
    };
    /**
     * Gets if this is an object type.
     */
    Type.prototype.isObject = function () {
        return this._hasTypeFlag(typescript_1.TypeFlags.Object);
    };
    /**
     * Gets if this is a type parameter.
     */
    Type.prototype.isTypeParameter = function () {
        return this.compilerType.isTypeParameter();
    };
    /**
     * Gets if this is a tuple type.
     */
    Type.prototype.isTuple = function () {
        var targetType = this.getTargetType();
        if (targetType == null)
            return false;
        return targetType._hasObjectFlag(typescript_1.ObjectFlags.Tuple);
    };
    /**
     * Gets if this is a union type.
     */
    Type.prototype.isUnion = function () {
        return this.compilerType.isUnion();
    };
    /**
     * Gets if this is an intersection type.
     */
    Type.prototype.isIntersection = function () {
        return this.compilerType.isIntersection();
    };
    /**
     * Gets if this is a union or intersection type.
     */
    Type.prototype.isUnionOrIntersection = function () {
        return this.compilerType.isUnionOrIntersection();
    };
    /**
     * Gets if this is the null type.
     */
    Type.prototype.isNull = function () {
        return this._hasTypeFlag(typescript_1.TypeFlags.Null);
    };
    /**
     * Gets if this is the undefined type.
     */
    Type.prototype.isUndefined = function () {
        return this._hasTypeFlag(typescript_1.TypeFlags.Undefined);
    };
    /**
     * Gets the type flags.
     */
    Type.prototype.getFlags = function () {
        return this.compilerType.flags;
    };
    /**
     * Gets the object flags.
     * @remarks Returns 0 for a non-object type.
     */
    Type.prototype.getObjectFlags = function () {
        if (!this.isObject())
            return 0;
        return this.compilerType.objectFlags || 0;
    };
    Type.prototype._hasTypeFlag = function (flag) {
        return (this.compilerType.flags & flag) === flag;
    };
    Type.prototype._hasAnyTypeFlag = function (flag) {
        return (this.compilerType.flags & flag) !== 0;
    };
    Type.prototype._hasObjectFlag = function (flag) {
        return (this.getObjectFlags() & flag) === flag;
    };
    return Type;
}());
exports.Type = Type;
