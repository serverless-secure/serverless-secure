"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typescript_1 = require("../../typescript");
function NamespaceChildableNode(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getParentNamespace = function () {
            var parent = this.getParentOrThrow();
            if (parent.getKind() !== typescript_1.SyntaxKind.ModuleBlock)
                return undefined;
            while (parent.getParentOrThrow().getKind() === typescript_1.SyntaxKind.ModuleDeclaration)
                parent = parent.getParentOrThrow();
            return parent;
        };
        return class_1;
    }(Base));
}
exports.NamespaceChildableNode = NamespaceChildableNode;
