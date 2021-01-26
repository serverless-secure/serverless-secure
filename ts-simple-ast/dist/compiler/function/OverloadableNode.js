"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var objectAssign = require("object-assign");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var utils_1 = require("../../utils");
function OverloadableNode(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getOverloads = function () {
            return getOverloadsAndImplementation(this).filter(function (n) { return n.isOverload(); });
        };
        class_1.prototype.getImplementation = function () {
            if (this.isImplementation())
                return this;
            return utils_1.ArrayUtils.find(getOverloadsAndImplementation(this), function (n) { return n.isImplementation(); });
        };
        class_1.prototype.getImplementationOrThrow = function () {
            return errors.throwIfNullOrUndefined(this.getImplementation(), "Expected to find a corresponding implementation for the overload.");
        };
        class_1.prototype.isOverload = function () {
            return !this.isImplementation();
        };
        class_1.prototype.isImplementation = function () {
            return this.getBody() != null;
        };
        return class_1;
    }(Base));
}
exports.OverloadableNode = OverloadableNode;
function getOverloadsAndImplementation(node) {
    var parentSyntaxList = node.getParentSyntaxListOrThrow();
    var name = getNameIfNamedNode(node);
    var kind = node.getKind();
    return parentSyntaxList.getChildren().filter(function (n) {
        var hasSameName = getNameIfNamedNode(n) === name;
        var hasSameKind = n.getKind() === kind;
        return hasSameName && hasSameKind;
    });
}
function getNameIfNamedNode(node) {
    var nodeAsNamedNode = node;
    if (nodeAsNamedNode.getName instanceof Function)
        return nodeAsNamedNode.getName();
    return undefined;
}
/**
 * @internal
 */
function insertOverloads(opts) {
    if (opts.structures.length === 0)
        return [];
    var overloads = opts.node.getOverloads();
    var overloadsCount = overloads.length;
    var parentSyntaxList = opts.node.getParentSyntaxListOrThrow();
    var firstIndex = overloads.length > 0 ? overloads[0].getChildIndex() : opts.node.getChildIndex();
    var index = manipulation_1.verifyAndGetIndex(opts.index, overloadsCount);
    var mainIndex = firstIndex + index;
    var thisStructure = opts.getThisStructure(opts.node.getImplementation() || opts.node);
    var structures = opts.structures;
    for (var i = 0; i < structures.length; i++) {
        structures[i] = objectAssign(objectAssign({}, thisStructure), structures[i]);
        // structures[i] = {...thisStructure, ...structures[i]}; // not supported by TS as of 2.4.1
    }
    var indentationText = opts.node.getIndentationText();
    var newLineKind = opts.node.global.manipulationSettings.getNewLineKindAsString();
    manipulation_1.insertIntoParentTextRange({
        parent: parentSyntaxList,
        insertPos: opts.node.getNonWhitespaceStart(),
        newText: opts.childCodes.map(function (c, i) { return (i > 0 ? indentationText : "") + c; }).join(newLineKind) + newLineKind + indentationText
    });
    var children = manipulation_1.getRangeFromArray(parentSyntaxList.getChildren(), mainIndex, structures.length, opts.expectedSyntaxKind);
    // todo: Do not fill here... this should be printed
    children.forEach(function (child, i) {
        opts.fillNodeFromStructure(child, structures[i]);
    });
    return children;
}
exports.insertOverloads = insertOverloads;
