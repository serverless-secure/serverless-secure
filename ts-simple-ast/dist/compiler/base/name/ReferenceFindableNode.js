"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var utils_1 = require("../../../utils");
function ReferenceFindableNode(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.findReferences = function () {
            return this.global.languageService.findReferences(getNodeForReferences(this));
        };
        class_1.prototype.findReferencesAsNodes = function () {
            return this.global.languageService.findReferencesAsNodes(getNodeForReferences(this));
        };
        return class_1;
    }(Base));
}
exports.ReferenceFindableNode = ReferenceFindableNode;
function getNodeForReferences(node) {
    if (utils_1.TypeGuards.isIdentifier(node))
        return node;
    var nameNode = node.getNodeProperty("name");
    if (nameNode != null)
        return nameNode;
    if (utils_1.TypeGuards.isExportableNode(node))
        return node.getDefaultKeyword() || node;
    return node;
}
