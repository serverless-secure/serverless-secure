"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseError_1 = require("./BaseError");
var InvalidOperationError = /** @class */ (function (_super) {
    tslib_1.__extends(InvalidOperationError, _super);
    function InvalidOperationError(message) {
        var _this = _super.call(this, message, InvalidOperationError.prototype) || this;
        _this.message = message;
        return _this;
    }
    return InvalidOperationError;
}(BaseError_1.BaseError));
exports.InvalidOperationError = InvalidOperationError;
