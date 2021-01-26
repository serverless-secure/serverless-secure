"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var structurePrinters_1 = require("../../structurePrinters");
var typescript_1 = require("../../typescript");
var base_1 = require("../base");
var callBaseFill_1 = require("../callBaseFill");
var common_1 = require("../common");
var VariableDeclarationKind_1 = require("./VariableDeclarationKind");
exports.VariableDeclarationListBase = base_1.ModifierableNode(common_1.Node);
var VariableDeclarationList = /** @class */ (function (_super) {
    tslib_1.__extends(VariableDeclarationList, _super);
    function VariableDeclarationList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get the variable declarations.
     */
    VariableDeclarationList.prototype.getDeclarations = function () {
        var _this = this;
        return this.compilerNode.declarations.map(function (d) { return _this.getNodeFromCompilerNode(d); });
    };
    /**
     * Gets the variable declaration kind.
     */
    VariableDeclarationList.prototype.getDeclarationKind = function () {
        var nodeFlags = this.compilerNode.flags;
        if (nodeFlags & typescript_1.ts.NodeFlags.Let)
            return VariableDeclarationKind_1.VariableDeclarationKind.Let;
        else if (nodeFlags & typescript_1.ts.NodeFlags.Const)
            return VariableDeclarationKind_1.VariableDeclarationKind.Const;
        else
            return VariableDeclarationKind_1.VariableDeclarationKind.Var;
    };
    /**
     * Gets the variable declaration kind keyword.
     */
    VariableDeclarationList.prototype.getDeclarationKindKeyword = function () {
        var declarationKind = this.getDeclarationKind();
        switch (declarationKind) {
            case VariableDeclarationKind_1.VariableDeclarationKind.Const:
                return this.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.ConstKeyword);
            case VariableDeclarationKind_1.VariableDeclarationKind.Let:
                return this.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.LetKeyword);
            case VariableDeclarationKind_1.VariableDeclarationKind.Var:
                return this.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.VarKeyword);
            default:
                throw errors.getNotImplementedForNeverValueError(declarationKind);
        }
    };
    /**
     * Sets the variable declaration kind.
     * @param type - Type to set.
     */
    VariableDeclarationList.prototype.setDeclarationKind = function (type) {
        if (this.getDeclarationKind() === type)
            return this;
        var keyword = this.getDeclarationKindKeyword();
        manipulation_1.insertIntoParentTextRange({
            insertPos: keyword.getStart(),
            newText: type,
            parent: this,
            replacing: {
                textLength: keyword.getWidth()
            }
        });
        return this;
    };
    /**
     * Add a variable declaration to the statement.
     * @param structure - Structure representing the variable declaration to add.
     */
    VariableDeclarationList.prototype.addDeclaration = function (structure) {
        return this.addDeclarations([structure])[0];
    };
    /**
     * Adds variable declarations to the statement.
     * @param structures - Structures representing the variable declarations to add.
     */
    VariableDeclarationList.prototype.addDeclarations = function (structures) {
        return this.insertDeclarations(this.getDeclarations().length, structures);
    };
    /**
     * Inserts a variable declaration at the specified index within the statement.
     * @param index - Index to insert.
     * @param structure - Structure representing the variable declaration to insert.
     */
    VariableDeclarationList.prototype.insertDeclaration = function (index, structure) {
        return this.insertDeclarations(index, [structure])[0];
    };
    /**
     * Inserts variable declarations at the specified index within the statement.
     * @param index - Index to insert.
     * @param structures - Structures representing the variable declarations to insert.
     */
    VariableDeclarationList.prototype.insertDeclarations = function (index, structures) {
        var writer = this.getWriterWithQueuedChildIndentation();
        var structurePrinter = new structurePrinters_1.CommaSeparatedStructuresPrinter(this.global.structurePrinterFactory.forVariableDeclaration());
        structurePrinter.printText(writer, structures);
        manipulation_1.insertIntoCommaSeparatedNodes({
            parent: this.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.SyntaxList),
            currentNodes: this.getDeclarations(),
            insertIndex: index,
            newText: writer.toString()
        });
        return manipulation_1.getNodesToReturn(this.getDeclarations(), index, structures.length);
    };
    /**
     * Fills the node from a structure.
     * @param structure - Structure to fill.
     */
    VariableDeclarationList.prototype.fill = function (structure) {
        callBaseFill_1.callBaseFill(exports.VariableDeclarationListBase.prototype, this, structure);
        if (structure.declarationKind != null)
            this.setDeclarationKind(structure.declarationKind);
        if (structure.declarations != null)
            this.addDeclarations(structure.declarations);
        return this;
    };
    return VariableDeclarationList;
}(exports.VariableDeclarationListBase));
exports.VariableDeclarationList = VariableDeclarationList;
