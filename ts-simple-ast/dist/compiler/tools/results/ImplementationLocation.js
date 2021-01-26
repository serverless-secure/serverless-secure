"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../../utils");
var DocumentSpan_1 = require("./DocumentSpan");
var ImplementationLocation = /** @class */ (function (_super) {
    tslib_1.__extends(ImplementationLocation, _super);
    /**
     * @internal
     */
    function ImplementationLocation(global, compilerObject) {
        return _super.call(this, global, compilerObject) || this;
    }
    /**
     * Gets the kind.
     */
    ImplementationLocation.prototype.getKind = function () {
        return this.compilerObject.kind;
    };
    /**
     * Gets the display parts.
     */
    ImplementationLocation.prototype.getDisplayParts = function () {
        var _this = this;
        return this.compilerObject.displayParts.map(function (p) { return _this.global.compilerFactory.getSymbolDisplayPart(p); });
    };
    tslib_1.__decorate([
        utils_1.Memoize
    ], ImplementationLocation.prototype, "getDisplayParts", null);
    return ImplementationLocation;
}(DocumentSpan_1.DocumentSpan));
exports.ImplementationLocation = ImplementationLocation;
