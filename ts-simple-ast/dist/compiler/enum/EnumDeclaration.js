"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var base_1 = require("../base");
var callBaseFill_1 = require("../callBaseFill");
var namespace_1 = require("../namespace");
var statement_1 = require("../statement");
exports.EnumDeclarationBase = base_1.ChildOrderableNode(base_1.TextInsertableNode(namespace_1.NamespaceChildableNode(base_1.JSDocableNode(base_1.AmbientableNode(base_1.ExportableNode(base_1.ModifierableNode(base_1.NamedNode(statement_1.Statement))))))));
var EnumDeclaration = /** @class */ (function (_super) {
    tslib_1.__extends(EnumDeclaration, _super);
    function EnumDeclaration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Fills the node from a structure.
     * @param structure - Structure to fill.
     */
    EnumDeclaration.prototype.fill = function (structure) {
        callBaseFill_1.callBaseFill(exports.EnumDeclarationBase.prototype, this, structure);
        if (structure.isConst != null)
            this.setIsConstEnum(structure.isConst);
        if (structure.members != null && structure.members.length > 0)
            this.addMembers(structure.members);
        return this;
    };
    /**
     * Adds a member to the enum.
     * @param structure - Structure of the enum.
     */
    EnumDeclaration.prototype.addMember = function (structure) {
        return this.addMembers([structure])[0];
    };
    /**
     * Adds members to the enum.
     * @param structures - Structures of the enums.
     */
    EnumDeclaration.prototype.addMembers = function (structures) {
        return this.insertMembers(this.getMembers().length, structures);
    };
    /**
     * Inserts a member to the enum.
     * @param index - Index to insert at.
     * @param structure - Structure of the enum.
     */
    EnumDeclaration.prototype.insertMember = function (index, structure) {
        return this.insertMembers(index, [structure])[0];
    };
    /**
     * Inserts members to an enum.
     * @param index - Index to insert at.
     * @param structures - Structures of the enums.
     */
    EnumDeclaration.prototype.insertMembers = function (index, structures) {
        var members = this.getMembers();
        index = manipulation_1.verifyAndGetIndex(index, members.length);
        if (structures.length === 0)
            return [];
        // create member code
        // todo: pass in the StructureToText to the function below
        var writer = this.getWriterWithChildIndentation();
        var structurePrinter = this.global.structurePrinterFactory.forEnumMember();
        structurePrinter.printTexts(writer, structures);
        // insert
        manipulation_1.insertIntoCommaSeparatedNodes({
            parent: this.getChildSyntaxListOrThrow(),
            currentNodes: members,
            insertIndex: index,
            newText: writer.toString(),
            useNewLines: true
        });
        // get the members
        return manipulation_1.getNodesToReturn(this.getMembers(), index, structures.length);
    };
    EnumDeclaration.prototype.getMember = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getMembers(), nameOrFindFunction);
    };
    EnumDeclaration.prototype.getMemberOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getMember(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("enum member", nameOrFindFunction); });
    };
    /**
     * Gets the enum's members.
     */
    EnumDeclaration.prototype.getMembers = function () {
        var _this = this;
        return this.compilerNode.members.map(function (m) { return _this.getNodeFromCompilerNode(m); });
    };
    /**
     * Toggle if it's a const enum
     */
    EnumDeclaration.prototype.setIsConstEnum = function (value) {
        return this.toggleModifier("const", value);
    };
    /**
     * Gets if it's a const enum.
     */
    EnumDeclaration.prototype.isConstEnum = function () {
        return this.getConstKeyword() != null;
    };
    /**
     * Gets the const enum keyword or undefined if not exists.
     */
    EnumDeclaration.prototype.getConstKeyword = function () {
        return this.getFirstModifierByKind(typescript_1.SyntaxKind.ConstKeyword);
    };
    return EnumDeclaration;
}(exports.EnumDeclarationBase));
exports.EnumDeclaration = EnumDeclaration;
