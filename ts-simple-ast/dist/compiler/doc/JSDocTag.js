"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var common_1 = require("../common");
/**
 * JS doc tag node.
 */
var JSDocTag = /** @class */ (function (_super) {
    tslib_1.__extends(JSDocTag, _super);
    function JSDocTag() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the at token.
     */
    JSDocTag.prototype.getAtToken = function () {
        return this.getNodeFromCompilerNode(this.compilerNode.atToken);
    };
    /**
     * Gets the tag name node.
     */
    JSDocTag.prototype.getTagNameNode = function () {
        return this.getNodeFromCompilerNode(this.compilerNode.tagName);
    };
    /**
     * Gets the tag's comment.
     */
    JSDocTag.prototype.getComment = function () {
        return this.compilerNode.comment;
    };
    return JSDocTag;
}(common_1.Node));
exports.JSDocTag = JSDocTag;
