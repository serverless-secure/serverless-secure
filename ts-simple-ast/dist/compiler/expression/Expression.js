"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Node_1 = require("../common/Node");
var Expression = /** @class */ (function (_super) {
    tslib_1.__extends(Expression, _super);
    function Expression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the contextual type of the expression.
     */
    Expression.prototype.getContextualType = function () {
        return this.global.typeChecker.getContextualType(this);
    };
    return Expression;
}(Node_1.Node));
exports.Expression = Expression;
