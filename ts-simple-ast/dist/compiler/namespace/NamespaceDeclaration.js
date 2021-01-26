"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var typescript_1 = require("../../typescript");
var base_1 = require("../base");
var callBaseFill_1 = require("../callBaseFill");
var statement_1 = require("../statement");
var NamespaceChildableNode_1 = require("./NamespaceChildableNode");
exports.NamespaceDeclarationBase = base_1.ChildOrderableNode(base_1.UnwrappableNode(base_1.TextInsertableNode(base_1.BodiedNode(NamespaceChildableNode_1.NamespaceChildableNode(statement_1.StatementedNode(base_1.JSDocableNode(base_1.AmbientableNode(base_1.ExportableNode(base_1.ModifierableNode(base_1.NamedNode(statement_1.Statement)))))))))));
var NamespaceDeclaration = /** @class */ (function (_super) {
    tslib_1.__extends(NamespaceDeclaration, _super);
    function NamespaceDeclaration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Fills the node from a structure.
     * @param structure - Structure to fill.
     */
    NamespaceDeclaration.prototype.fill = function (structure) {
        callBaseFill_1.callBaseFill(exports.NamespaceDeclarationBase.prototype, this, structure);
        if (structure.hasModuleKeyword != null)
            this.setHasModuleKeyword(structure.hasModuleKeyword);
        return this;
    };
    /**
     * Gets the full name of the namespace.
     */
    NamespaceDeclaration.prototype.getName = function () {
        return this.getNameNodes().map(function (n) { return n.getText(); }).join(".");
    };
    /**
     * Sets the name without renaming references.
     * @param newName - New full namespace name.
     */
    NamespaceDeclaration.prototype.setName = function (newName) {
        var nameNodes = this.getNameNodes();
        var openIssueText = "Please open an issue if you really need this and I'll up the priority.";
        if (nameNodes.length > 1)
            throw new errors.NotImplementedError("Not implemented to set a namespace name that uses dot notation. " + openIssueText);
        if (newName.indexOf(".") >= 0)
            throw new errors.NotImplementedError("Not implemented to set a namespace name to a name containing a period. " + openIssueText);
        manipulation_1.replaceNodeText({
            sourceFile: this.sourceFile,
            start: nameNodes[0].getStart(),
            replacingLength: nameNodes[0].getWidth(),
            newText: newName
        });
        return this;
    };
    /**
     * Renames the name.
     * @param newName - New name.
     */
    NamespaceDeclaration.prototype.rename = function (newName) {
        var nameNodes = this.getNameNodes();
        if (nameNodes.length > 1)
            throw new errors.NotSupportedError("Cannot rename a namespace name that uses dot notation. Rename the individual nodes via ." + "getNameNodes" + "()");
        if (newName.indexOf(".") >= 0)
            throw new errors.NotSupportedError("Cannot rename a namespace name to a name containing a period.");
        nameNodes[0].rename(newName);
        return this;
    };
    /**
     * Gets the name nodes.
     */
    NamespaceDeclaration.prototype.getNameNodes = function () {
        var nodes = [];
        var current = this;
        do {
            nodes.push(this.getNodeFromCompilerNode(current.compilerNode.name));
            current = current.getFirstChildByKind(typescript_1.SyntaxKind.ModuleDeclaration);
        } while (current != null);
        return nodes;
    };
    /**
     * Gets if this namespace has a namespace keyword.
     */
    NamespaceDeclaration.prototype.hasNamespaceKeyword = function () {
        return (this.compilerNode.flags & typescript_1.ts.NodeFlags.Namespace) === typescript_1.ts.NodeFlags.Namespace;
    };
    /**
     * Gets if this namespace has a namespace keyword.
     */
    NamespaceDeclaration.prototype.hasModuleKeyword = function () {
        return !this.hasNamespaceKeyword();
    };
    /**
     * Set if this namespace has a namespace keyword.
     * @param value - Whether to set it or not.
     */
    NamespaceDeclaration.prototype.setHasNamespaceKeyword = function (value) {
        if (value === void 0) { value = true; }
        if (this.hasNamespaceKeyword() === value)
            return this;
        var declarationKindKeyword = this.getDeclarationKindKeyword();
        /* istanbul ignore if */
        if (declarationKindKeyword == null)
            throw new errors.NotImplementedError("Expected the declaration kind keyword to exist on a namespace.");
        manipulation_1.replaceNodeText({
            sourceFile: this.getSourceFile(),
            start: declarationKindKeyword.getStart(),
            replacingLength: declarationKindKeyword.getWidth(),
            newText: value ? "namespace" : "module"
        });
        return this;
    };
    /**
     * Set if this namespace has a namepsace keyword.
     * @param value - Whether to set it or not.
     */
    NamespaceDeclaration.prototype.setHasModuleKeyword = function (value) {
        if (value === void 0) { value = true; }
        return this.setHasNamespaceKeyword(!value);
    };
    /**
     * Gets the namespace or module keyword.
     */
    NamespaceDeclaration.prototype.getDeclarationKindKeyword = function () {
        return this.getFirstChild(function (child) {
            return child.getKind() === typescript_1.SyntaxKind.NamespaceKeyword ||
                child.getKind() === typescript_1.SyntaxKind.ModuleKeyword;
        });
    };
    return NamespaceDeclaration;
}(exports.NamespaceDeclarationBase));
exports.NamespaceDeclaration = NamespaceDeclaration;
