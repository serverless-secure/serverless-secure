"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../../utils");
var TextSpan_1 = require("./TextSpan");
/**
 * Document span.
 */
var DocumentSpan = /** @class */ (function () {
    /**
     * @internal
     */
    function DocumentSpan(global, compilerObject) {
        this.global = global;
        this._compilerObject = compilerObject;
        // store this node so that it's start doesn't go out of date because of manipulation (though the text span may)
        this.sourceFile = this.global.compilerFactory.getSourceFileFromCacheFromFilePath(this.compilerObject.fileName);
        // fill the memoize
        this.getNode();
    }
    Object.defineProperty(DocumentSpan.prototype, "compilerObject", {
        /**
         * Gets the compiler object.
         */
        get: function () {
            return this._compilerObject;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the source file this reference is in.
     */
    DocumentSpan.prototype.getSourceFile = function () {
        return this.sourceFile;
    };
    /**
     * Gets the text span.
     */
    DocumentSpan.prototype.getTextSpan = function () {
        return new TextSpan_1.TextSpan(this.compilerObject.textSpan);
    };
    /**
     * Gets the node at the start of the text span.
     */
    DocumentSpan.prototype.getNode = function () {
        return this.getSourceFile().getDescendantAtStartWithWidth(this.getTextSpan().getStart(), this.getTextSpan().getLength());
    };
    /**
     * Gets the original text span if the span represents a location that was remapped.
     */
    DocumentSpan.prototype.getOriginalTextSpan = function () {
        var originalTextSpan = this.compilerObject.originalTextSpan;
        return originalTextSpan == null ? undefined : new TextSpan_1.TextSpan(originalTextSpan);
    };
    /**
     * Gets the original file name if the span represents a location that was remapped.
     */
    DocumentSpan.prototype.getOriginalFileName = function () {
        return this.compilerObject.originalFileName;
    };
    tslib_1.__decorate([
        utils_1.Memoize
    ], DocumentSpan.prototype, "getTextSpan", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], DocumentSpan.prototype, "getNode", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], DocumentSpan.prototype, "getOriginalTextSpan", null);
    return DocumentSpan;
}());
exports.DocumentSpan = DocumentSpan;
