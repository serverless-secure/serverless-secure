"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ArgumentError_1 = require("./ArgumentError");
var ArgumentOutOfRangeError = /** @class */ (function (_super) {
    tslib_1.__extends(ArgumentOutOfRangeError, _super);
    function ArgumentOutOfRangeError(argName, value, range) {
        var _this = _super.call(this, argName, "Range is " + range[0] + " to " + range[1] + ", but " + value + " was provided.", ArgumentOutOfRangeError.prototype) || this;
        _this.argName = argName;
        return _this;
    }
    return ArgumentOutOfRangeError;
}(ArgumentError_1.ArgumentError));
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
