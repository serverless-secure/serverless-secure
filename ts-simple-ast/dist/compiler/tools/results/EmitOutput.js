"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../../utils");
var OutputFile_1 = require("./OutputFile");
/**
 * Output of an emit on a single file.
 */
var EmitOutput = /** @class */ (function () {
    /**
     * @internal
     */
    function EmitOutput(global, filePath, compilerObject) {
        this.filePath = filePath;
        this.global = global;
        this._compilerObject = compilerObject;
    }
    Object.defineProperty(EmitOutput.prototype, "compilerObject", {
        /**
         * TypeScript compiler emit result.
         */
        get: function () {
            return this._compilerObject;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets if the emit was skipped.
     */
    EmitOutput.prototype.getEmitSkipped = function () {
        return this.compilerObject.emitSkipped;
    };
    /**
     * Gets the output files.
     */
    EmitOutput.prototype.getOutputFiles = function () {
        var _this = this;
        return this.compilerObject.outputFiles.map(function (f) { return new OutputFile_1.OutputFile(_this.global, f); });
    };
    tslib_1.__decorate([
        utils_1.Memoize
    ], EmitOutput.prototype, "getOutputFiles", null);
    return EmitOutput;
}());
exports.EmitOutput = EmitOutput;
