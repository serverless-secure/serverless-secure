"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var base_1 = require("../base");
var expressioned_1 = require("./expressioned");
var LeftHandSideExpression_1 = require("./LeftHandSideExpression");
exports.CallExpressionBase = base_1.TypeArgumentedNode(base_1.ArgumentedNode(expressioned_1.LeftHandSideExpressionedNode(LeftHandSideExpression_1.LeftHandSideExpression)));
var CallExpression = /** @class */ (function (_super) {
    tslib_1.__extends(CallExpression, _super);
    function CallExpression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the return type of the call expression.
     */
    CallExpression.prototype.getReturnType = function () {
        return this.global.typeChecker.getTypeAtLocation(this);
    };
    return CallExpression;
}(exports.CallExpressionBase));
exports.CallExpression = CallExpression;
