"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Output file of an emit.
 */
var OutputFile = /** @class */ (function () {
    /**
     * @internal
     */
    function OutputFile(global, compilerObject) {
        this.global = global;
        this._compilerObject = compilerObject;
    }
    Object.defineProperty(OutputFile.prototype, "compilerObject", {
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
     * Gets the file path.
     */
    OutputFile.prototype.getFilePath = function () {
        return this.global.fileSystemWrapper.getStandardizedAbsolutePath(this.compilerObject.name);
    };
    /**
     * Gets whether the byte order mark should be written.
     */
    OutputFile.prototype.getWriteByteOrderMark = function () {
        return this.compilerObject.writeByteOrderMark || false;
    };
    /**
     * Gets the file text.
     */
    OutputFile.prototype.getText = function () {
        return this.compilerObject.text;
    };
    return OutputFile;
}());
exports.OutputFile = OutputFile;
