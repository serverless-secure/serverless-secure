"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InitializerGetExpressionableNode_1 = require("./InitializerGetExpressionableNode");
var InitializerSetExpressionableNode_1 = require("./InitializerSetExpressionableNode");
function InitializerExpressionableNode(Base) {
    return InitializerSetExpressionableNode_1.InitializerSetExpressionableNode(InitializerGetExpressionableNode_1.InitializerGetExpressionableNode(Base));
}
exports.InitializerExpressionableNode = InitializerExpressionableNode;
