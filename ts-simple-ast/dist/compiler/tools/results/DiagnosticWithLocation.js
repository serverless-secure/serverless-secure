"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Diagnostic_1 = require("./Diagnostic");
var DiagnosticWithLocation = /** @class */ (function (_super) {
    tslib_1.__extends(DiagnosticWithLocation, _super);
    /** @internal */
    function DiagnosticWithLocation(global, compilerObject) {
        return _super.call(this, global, compilerObject) || this;
    }
    /**
     * Gets the line number.
     */
    DiagnosticWithLocation.prototype.getLineNumber = function () {
        return _super.prototype.getLineNumber.call(this);
    };
    /**
     * Gets the start.
     */
    DiagnosticWithLocation.prototype.getStart = function () {
        return _super.prototype.getStart.call(this);
    };
    /**
     * Gets the length
     */
    DiagnosticWithLocation.prototype.getLength = function () {
        return _super.prototype.getLength.call(this);
    };
    /**
     * Gets the source file.
     */
    DiagnosticWithLocation.prototype.getSourceFile = function () {
        return _super.prototype.getSourceFile.call(this);
    };
    return DiagnosticWithLocation;
}(Diagnostic_1.Diagnostic));
exports.DiagnosticWithLocation = DiagnosticWithLocation;
