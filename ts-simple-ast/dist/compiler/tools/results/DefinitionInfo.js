"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typescript_1 = require("../../../typescript");
var utils_1 = require("../../../utils");
var DocumentSpan_1 = require("./DocumentSpan");
/**
 * Definition info.
 */
var DefinitionInfo = /** @class */ (function (_super) {
    tslib_1.__extends(DefinitionInfo, _super);
    /**
     * @internal
     */
    function DefinitionInfo(global, compilerObject) {
        var _this = _super.call(this, global, compilerObject) || this;
        // fill memoize
        _this.getDeclarationNode();
        return _this;
    }
    /**
     * Gets the kind.
     */
    DefinitionInfo.prototype.getKind = function () {
        return this.compilerObject.kind;
    };
    /**
     * Gets the name.
     */
    DefinitionInfo.prototype.getName = function () {
        return this.compilerObject.name;
    };
    /**
     * Gets the container kind.
     */
    DefinitionInfo.prototype.getContainerKind = function () {
        return this.compilerObject.containerKind;
    };
    /**
     * Gets the container name.
     */
    DefinitionInfo.prototype.getContainerName = function () {
        return this.compilerObject.containerName;
    };
    /**
     * Gets the declaration node.
     */
    DefinitionInfo.prototype.getDeclarationNode = function () {
        var start = this.getTextSpan().getStart();
        var identifier = findIdentifier(this.getSourceFile());
        return identifier == null ? undefined : identifier.getParentOrThrow();
        function findIdentifier(node) {
            var e_1, _a;
            if (node.getKind() === typescript_1.SyntaxKind.Identifier && node.getStart() === start)
                return node;
            try {
                for (var _b = tslib_1.__values(node.getChildrenIterator()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    if (child.getPos() <= start && child.getEnd() >= start)
                        return findIdentifier(child);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return undefined;
        }
    };
    tslib_1.__decorate([
        utils_1.Memoize
    ], DefinitionInfo.prototype, "getDeclarationNode", null);
    return DefinitionInfo;
}(DocumentSpan_1.DocumentSpan));
exports.DefinitionInfo = DefinitionInfo;
