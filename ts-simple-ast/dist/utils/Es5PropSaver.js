"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Es5PropSaver = /** @class */ (function () {
    function Es5PropSaver() {
        this.propName = "__key_" + Es5PropSaver.instanceCount++;
    }
    Es5PropSaver.prototype.get = function (obj) {
        return obj[this.propName];
    };
    Es5PropSaver.prototype.set = function (obj, value) {
        Object.defineProperty(obj, this.propName, {
            configurable: true,
            enumerable: false,
            writable: false,
            value: value
        });
    };
    Es5PropSaver.prototype.remove = function (obj) {
        delete obj[this.propName];
    };
    Es5PropSaver.instanceCount = 0;
    return Es5PropSaver;
}());
exports.Es5PropSaver = Es5PropSaver;
