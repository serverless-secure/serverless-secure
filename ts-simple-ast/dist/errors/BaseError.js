"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var BaseError = /** @class */ (function (_super) {
    tslib_1.__extends(BaseError, _super);
    function BaseError(message, prototype) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        // workaround for extending error to work in ES5 :(
        Object.setPrototypeOf(_this, prototype);
        return _this;
    }
    return BaseError;
}(Error));
exports.BaseError = BaseError;
