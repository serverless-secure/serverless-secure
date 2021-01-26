"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var utils_1 = require("../../utils");
var Type_1 = require("./Type");
var TypeParameter = /** @class */ (function (_super) {
    tslib_1.__extends(TypeParameter, _super);
    function TypeParameter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the constraint or throws if it doesn't exist.
     */
    TypeParameter.prototype.getConstraintOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getConstraint(), "Expected type parameter to have a constraint.");
    };
    /**
     * Gets the constraint type.
     */
    TypeParameter.prototype.getConstraint = function () {
        var declaration = this._getTypeParameterDeclaration();
        if (declaration == null)
            return undefined;
        var constraintNode = declaration.getConstraint();
        if (constraintNode == null)
            return undefined;
        return this.global.typeChecker.getTypeAtLocation(constraintNode);
    };
    /**
     * Gets the default type or throws if it doesn't exist.
     */
    TypeParameter.prototype.getDefaultOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getDefault(), "Expected type parameter to have a default type.");
    };
    /**
     * Gets the default type or undefined if it doesn't exist.
     */
    TypeParameter.prototype.getDefault = function () {
        var declaration = this._getTypeParameterDeclaration();
        if (declaration == null)
            return undefined;
        var defaultNode = declaration.getDefault();
        if (defaultNode == null)
            return undefined;
        return this.global.typeChecker.getTypeAtLocation(defaultNode);
    };
    /**
     * @internal
     */
    TypeParameter.prototype._getTypeParameterDeclaration = function () {
        var symbol = this.getSymbol();
        if (symbol == null)
            return undefined;
        var declaration = symbol.getDeclarations()[0];
        if (declaration == null)
            return undefined;
        if (!utils_1.TypeGuards.isTypeParameterDeclaration(declaration))
            return undefined;
        return declaration;
    };
    return TypeParameter;
}(Type_1.Type));
exports.TypeParameter = TypeParameter;
