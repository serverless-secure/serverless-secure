"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../../utils");
/**
 * Referenced symbol.
 */
var ReferencedSymbol = /** @class */ (function () {
    /**
     * @internal
     */
    function ReferencedSymbol(global, compilerObject) {
        this.global = global;
        this._compilerObject = compilerObject;
        // it's important to store the references so that the nodes referenced inside will point
        // to the right node in case the user does manipulation between getting this object and getting the references
        this.references = this.compilerObject.references.map(function (r) { return global.compilerFactory.getReferenceEntry(r); });
    }
    Object.defineProperty(ReferencedSymbol.prototype, "compilerObject", {
        /**
         * Gets the compiler referenced symbol.
         */
        get: function () {
            return this._compilerObject;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the definition.
     */
    ReferencedSymbol.prototype.getDefinition = function () {
        return this.global.compilerFactory.getReferencedSymbolDefinitionInfo(this.compilerObject.definition);
    };
    /**
     * Gets the references.
     */
    ReferencedSymbol.prototype.getReferences = function () {
        return this.references;
    };
    tslib_1.__decorate([
        utils_1.Memoize
    ], ReferencedSymbol.prototype, "getDefinition", null);
    return ReferencedSymbol;
}());
exports.ReferencedSymbol = ReferencedSymbol;
