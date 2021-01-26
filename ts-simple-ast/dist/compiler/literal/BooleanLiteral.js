"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typescript_1 = require("../../typescript");
var expression_1 = require("../expression");
exports.BooleanLiteralBase = expression_1.PrimaryExpression;
var BooleanLiteral = /** @class */ (function (_super) {
    tslib_1.__extends(BooleanLiteral, _super);
    function BooleanLiteral() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the literal value.
     */
    BooleanLiteral.prototype.getLiteralValue = function () {
        return this.getKind() === typescript_1.SyntaxKind.TrueKeyword;
    };
    /**
     * Sets the literal value.
     *
     * Note: For the time being, this forgets the current node and returns the new node.
     * @param value - Value to set.
     */
    BooleanLiteral.prototype.setLiteralValue = function (value) {
        if (this.getLiteralValue() === value)
            return;
        // todo: make this not forget the current node
        var parent = this.getParentSyntaxList() || this.getParentOrThrow();
        var index = this.getChildIndex();
        this.replaceWithText(value ? "true" : "false");
        return parent.getChildAtIndex(index);
    };
    return BooleanLiteral;
}(exports.BooleanLiteralBase));
exports.BooleanLiteral = BooleanLiteral;
