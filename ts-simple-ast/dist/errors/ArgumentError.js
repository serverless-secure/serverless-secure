"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseError_1 = require("./BaseError");
var ArgumentError = /** @class */ (function (_super) {
    tslib_1.__extends(ArgumentError, _super);
    function ArgumentError(argName, message, prototype) {
        if (prototype === void 0) { prototype = ArgumentError.prototype; }
        var _this = _super.call(this, "Argument Error (" + argName + "): " + message, prototype) || this;
        _this.argName = argName;
        return _this;
    }
    return ArgumentError;
}(BaseError_1.BaseError));
exports.ArgumentError = ArgumentError;
