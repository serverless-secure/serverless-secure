"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var DocumentSpan_1 = require("./DocumentSpan");
var ReferenceEntry = /** @class */ (function (_super) {
    tslib_1.__extends(ReferenceEntry, _super);
    /**
     * @internal
     */
    function ReferenceEntry(global, compilerObject) {
        return _super.call(this, global, compilerObject) || this;
    }
    ReferenceEntry.prototype.isWriteAccess = function () {
        // todo: not sure what this does
        return this.compilerObject.isWriteAccess;
    };
    /**
     * If this is the definition reference.
     */
    ReferenceEntry.prototype.isDefinition = function () {
        return this.compilerObject.isDefinition;
    };
    ReferenceEntry.prototype.isInString = function () {
        // todo: not sure what this does and why it can be undefined
        return this.compilerObject.isInString;
    };
    return ReferenceEntry;
}(DocumentSpan_1.DocumentSpan));
exports.ReferenceEntry = ReferenceEntry;
