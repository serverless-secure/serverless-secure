"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnableableLogger = /** @class */ (function () {
    function EnableableLogger() {
        this.enabled = false;
    }
    EnableableLogger.prototype.setEnabled = function (enabled) {
        this.enabled = enabled;
    };
    EnableableLogger.prototype.log = function (text) {
        if (this.enabled)
            this.logInternal(text);
    };
    EnableableLogger.prototype.warn = function (text) {
        if (this.enabled)
            this.warnInternal(text);
    };
    return EnableableLogger;
}());
exports.EnableableLogger = EnableableLogger;
