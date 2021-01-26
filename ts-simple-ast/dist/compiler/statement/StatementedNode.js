"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var callBaseFill_1 = require("../callBaseFill");
function StatementedNode(Base) {
    return /** @class */ (function (_super) {
        tslib_1.__extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /* General */
        class_1.prototype.getStatements = function () {
            var _this = this;
            return this.getCompilerStatements().map(function (s) { return _this.getNodeFromCompilerNode(s); });
        };
        class_1.prototype.getStatement = function (findFunction) {
            return utils_1.ArrayUtils.find(this.getStatements(), findFunction);
        };
        class_1.prototype.getStatementOrThrow = function (findFunction) {
            return errors.throwIfNullOrUndefined(this.getStatement(findFunction), "Expected to find a statement matching the provided condition.");
        };
        class_1.prototype.getStatementByKind = function (kind) {
            var statement = utils_1.ArrayUtils.find(this.getCompilerStatements(), function (s) { return s.kind === kind; });
            return this.getNodeFromCompilerNodeIfExists(statement);
        };
        class_1.prototype.getStatementByKindOrThrow = function (kind) {
            return errors.throwIfNullOrUndefined(this.getStatementByKind(kind), "Expected to find a statement with syntax kind " + utils_1.getSyntaxKindName(kind) + ".");
        };
        class_1.prototype.addStatements = function (textOrWriterFunction) {
            return this.insertStatements(this.getCompilerStatements().length, textOrWriterFunction);
        };
        class_1.prototype.insertStatements = function (index, textOrWriterFunction) {
            return this.getChildSyntaxListOrThrow().insertChildText(index, textOrWriterFunction);
        };
        class_1.prototype.removeStatement = function (index) {
            index = manipulation_1.verifyAndGetIndex(index, this.getCompilerStatements().length - 1);
            return this.removeStatements([index, index]);
        };
        class_1.prototype.removeStatements = function (indexRange) {
            var statements = this.getStatements();
            errors.throwIfRangeOutOfRange(indexRange, [0, statements.length], "indexRange");
            manipulation_1.removeStatementedNodeChildren(statements.slice(indexRange[0], indexRange[1] + 1));
            return this;
        };
        /* Classes */
        class_1.prototype.addClass = function (structure) {
            return this.addClasses([structure])[0];
        };
        class_1.prototype.addClasses = function (structures) {
            return this.insertClasses(this.getCompilerStatements().length, structures);
        };
        class_1.prototype.insertClass = function (index, structure) {
            return this.insertClasses(index, [structure])[0];
        };
        class_1.prototype.insertClasses = function (index, structures) {
            var _this = this;
            return this._insertChildren({
                expectedKind: typescript_1.SyntaxKind.ClassDeclaration,
                index: index,
                structures: structures,
                write: function (writer, info) {
                    _this._standardWrite(writer, info, function () {
                        _this.global.structurePrinterFactory.forClassDeclaration({ isAmbient: utils_1.isNodeAmbientOrInAmbientContext(_this) }).printTexts(writer, structures);
                    });
                }
            });
        };
        class_1.prototype.getClasses = function () {
            // todo: remove type assertion
            return this.getChildSyntaxListOrThrow().getChildrenOfKind(typescript_1.SyntaxKind.ClassDeclaration);
        };
        class_1.prototype.getClass = function (nameOrFindFunction) {
            return utils_1.getNodeByNameOrFindFunction(this.getClasses(), nameOrFindFunction);
        };
        class_1.prototype.getClassOrThrow = function (nameOrFindFunction) {
            return errors.throwIfNullOrUndefined(this.getClass(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class", nameOrFindFunction); });
        };
        /* Enums */
        class_1.prototype.addEnum = function (structure) {
            return this.addEnums([structure])[0];
        };
        class_1.prototype.addEnums = function (structures) {
            return this.insertEnums(this.getCompilerStatements().length, structures);
        };
        class_1.prototype.insertEnum = function (index, structure) {
            return this.insertEnums(index, [structure])[0];
        };
        class_1.prototype.insertEnums = function (index, structures) {
            var _this = this;
            return this._insertChildren({
                expectedKind: typescript_1.SyntaxKind.EnumDeclaration,
                index: index,
                structures: structures,
                write: function (writer, info) {
                    _this._standardWrite(writer, info, function () {
                        _this.global.structurePrinterFactory.forEnumDeclaration().printTexts(writer, structures);
                    });
                }
            });
        };
        class_1.prototype.getEnums = function () {
            // todo: remove type assertion
            return this.getChildSyntaxListOrThrow().getChildrenOfKind(typescript_1.SyntaxKind.EnumDeclaration);
        };
        class_1.prototype.getEnum = function (nameOrFindFunction) {
            return utils_1.getNodeByNameOrFindFunction(this.getEnums(), nameOrFindFunction);
        };
        class_1.prototype.getEnumOrThrow = function (nameOrFindFunction) {
            return errors.throwIfNullOrUndefined(this.getEnum(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("enum", nameOrFindFunction); });
        };
        /* Functions */
        class_1.prototype.addFunction = function (structure) {
            return this.addFunctions([structure])[0];
        };
        class_1.prototype.addFunctions = function (structures) {
            return this.insertFunctions(this.getCompilerStatements().length, structures);
        };
        class_1.prototype.insertFunction = function (index, structure) {
            return this.insertFunctions(index, [structure])[0];
        };
        class_1.prototype.insertFunctions = function (index, structures) {
            var _this = this;
            return this._insertChildren({
                expectedKind: typescript_1.SyntaxKind.FunctionDeclaration,
                index: index,
                structures: structures,
                write: function (writer, info) {
                    _this._standardWrite(writer, info, function () {
                        _this.global.structurePrinterFactory.forFunctionDeclaration().printTexts(writer, structures);
                    }, {
                        previousNewLine: function (previousMember) {
                            return structures[0].hasDeclareKeyword && utils_1.TypeGuards.isFunctionDeclaration(previousMember) && previousMember.getBody() == null;
                        },
                        nextNewLine: function (nextMember) {
                            return structures[structures.length - 1].hasDeclareKeyword && utils_1.TypeGuards.isFunctionDeclaration(nextMember) && nextMember.getBody() == null;
                        }
                    });
                }
            });
        };
        class_1.prototype.getFunctions = function () {
            // todo: remove type assertion
            return (this.getChildSyntaxListOrThrow().getChildrenOfKind(typescript_1.SyntaxKind.FunctionDeclaration))
                .filter(function (f) { return f.isAmbient() || f.isImplementation(); });
        };
        class_1.prototype.getFunction = function (nameOrFindFunction) {
            return utils_1.getNodeByNameOrFindFunction(this.getFunctions(), nameOrFindFunction);
        };
        class_1.prototype.getFunctionOrThrow = function (nameOrFindFunction) {
            return errors.throwIfNullOrUndefined(this.getFunction(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("function", nameOrFindFunction); });
        };
        /* Interfaces */
        class_1.prototype.addInterface = function (structure) {
            return this.addInterfaces([structure])[0];
        };
        class_1.prototype.addInterfaces = function (structures) {
            return this.insertInterfaces(this.getCompilerStatements().length, structures);
        };
        class_1.prototype.insertInterface = function (index, structure) {
            return this.insertInterfaces(index, [structure])[0];
        };
        class_1.prototype.insertInterfaces = function (index, structures) {
            var _this = this;
            return this._insertChildren({
                expectedKind: typescript_1.SyntaxKind.InterfaceDeclaration,
                index: index,
                structures: structures,
                write: function (writer, info) {
                    _this._standardWrite(writer, info, function () {
                        _this.global.structurePrinterFactory.forInterfaceDeclaration().printTexts(writer, structures);
                    });
                }
            });
        };
        class_1.prototype.getInterfaces = function () {
            // todo: remove type assertion
            return this.getChildSyntaxListOrThrow().getChildrenOfKind(typescript_1.SyntaxKind.InterfaceDeclaration);
        };
        class_1.prototype.getInterface = function (nameOrFindFunction) {
            return utils_1.getNodeByNameOrFindFunction(this.getInterfaces(), nameOrFindFunction);
        };
        class_1.prototype.getInterfaceOrThrow = function (nameOrFindFunction) {
            return errors.throwIfNullOrUndefined(this.getInterface(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("interface", nameOrFindFunction); });
        };
        /* Namespaces */
        class_1.prototype.addNamespace = function (structure) {
            return this.addNamespaces([structure])[0];
        };
        class_1.prototype.addNamespaces = function (structures) {
            return this.insertNamespaces(this.getCompilerStatements().length, structures);
        };
        class_1.prototype.insertNamespace = function (index, structure) {
            return this.insertNamespaces(index, [structure])[0];
        };
        class_1.prototype.insertNamespaces = function (index, structures) {
            var _this = this;
            return this._insertChildren({
                expectedKind: typescript_1.SyntaxKind.ModuleDeclaration,
                index: index,
                structures: structures,
                write: function (writer, info) {
                    _this._standardWrite(writer, info, function () {
                        _this.global.structurePrinterFactory.forNamespaceDeclaration({ isAmbient: utils_1.isNodeAmbientOrInAmbientContext(_this) }).printTexts(writer, structures);
                    });
                }
            });
        };
        class_1.prototype.getNamespaces = function () {
            return this.getChildSyntaxListOrThrow().getChildrenOfKind(typescript_1.SyntaxKind.ModuleDeclaration);
        };
        class_1.prototype.getNamespace = function (nameOrFindFunction) {
            return utils_1.getNodeByNameOrFindFunction(this.getNamespaces(), nameOrFindFunction);
        };
        class_1.prototype.getNamespaceOrThrow = function (nameOrFindFunction) {
            return errors.throwIfNullOrUndefined(this.getNamespace(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("namespace", nameOrFindFunction); });
        };
        /* Type aliases */
        class_1.prototype.addTypeAlias = function (structure) {
            return this.addTypeAliases([structure])[0];
        };
        class_1.prototype.addTypeAliases = function (structures) {
            return this.insertTypeAliases(this.getCompilerStatements().length, structures);
        };
        class_1.prototype.insertTypeAlias = function (index, structure) {
            return this.insertTypeAliases(index, [structure])[0];
        };
        class_1.prototype.insertTypeAliases = function (index, structures) {
            var _this = this;
            return this._insertChildren({
                expectedKind: typescript_1.SyntaxKind.TypeAliasDeclaration,
                index: index,
                structures: structures,
                write: function (writer, info) {
                    _this._standardWrite(writer, info, function () {
                        _this.global.structurePrinterFactory.forTypeAliasDeclaration().printTexts(writer, structures);
                    }, {
                        previousNewLine: function (previousMember) { return utils_1.TypeGuards.isTypeAliasDeclaration(previousMember); },
                        nextNewLine: function (nextMember) { return utils_1.TypeGuards.isTypeAliasDeclaration(nextMember); }
                    });
                }
            });
        };
        class_1.prototype.getTypeAliases = function () {
            // todo: remove type assertion
            return this.getChildSyntaxListOrThrow().getChildrenOfKind(typescript_1.SyntaxKind.TypeAliasDeclaration);
        };
        class_1.prototype.getTypeAlias = function (nameOrFindFunction) {
            return utils_1.getNodeByNameOrFindFunction(this.getTypeAliases(), nameOrFindFunction);
        };
        class_1.prototype.getTypeAliasOrThrow = function (nameOrFindFunction) {
            return errors.throwIfNullOrUndefined(this.getTypeAlias(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("type alias", nameOrFindFunction); });
        };
        /* Variable statements */
        class_1.prototype.getVariableStatements = function () {
            return this.getChildSyntaxListOrThrow().getChildrenOfKind(typescript_1.SyntaxKind.VariableStatement);
        };
        class_1.prototype.getVariableStatement = function (findFunction) {
            return utils_1.ArrayUtils.find(this.getVariableStatements(), findFunction);
        };
        class_1.prototype.getVariableStatementOrThrow = function (findFunction) {
            return errors.throwIfNullOrUndefined(this.getVariableStatement(findFunction), "Expected to find a variable statement that matched the provided condition.");
        };
        class_1.prototype.addVariableStatement = function (structure) {
            return this.addVariableStatements([structure])[0];
        };
        class_1.prototype.addVariableStatements = function (structures) {
            return this.insertVariableStatements(this.getCompilerStatements().length, structures);
        };
        class_1.prototype.insertVariableStatement = function (index, structure) {
            return this.insertVariableStatements(index, [structure])[0];
        };
        class_1.prototype.insertVariableStatements = function (index, structures) {
            var _this = this;
            return this._insertChildren({
                expectedKind: typescript_1.SyntaxKind.VariableStatement,
                index: index,
                structures: structures,
                write: function (writer, info) {
                    _this._standardWrite(writer, info, function () {
                        _this.global.structurePrinterFactory.forVariableStatement().printTexts(writer, structures);
                    }, {
                        previousNewLine: function (previousMember) { return utils_1.TypeGuards.isVariableStatement(previousMember); },
                        nextNewLine: function (nextMember) { return utils_1.TypeGuards.isVariableStatement(nextMember); }
                    });
                }
            });
        };
        /* Variable declarations */
        class_1.prototype.getVariableDeclarations = function () {
            var e_1, _a;
            var variables = [];
            try {
                for (var _b = tslib_1.__values(this.getVariableStatements()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var list = _c.value;
                    variables.push.apply(variables, tslib_1.__spread(list.getDeclarations()));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return variables;
        };
        class_1.prototype.getVariableDeclaration = function (nameOrFindFunction) {
            return utils_1.getNodeByNameOrFindFunction(this.getVariableDeclarations(), nameOrFindFunction);
        };
        class_1.prototype.getVariableDeclarationOrThrow = function (nameOrFindFunction) {
            return errors.throwIfNullOrUndefined(this.getVariableDeclaration(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("variable declaration", nameOrFindFunction); });
        };
        class_1.prototype.fill = function (structure) {
            callBaseFill_1.callBaseFill(Base.prototype, this, structure);
            if (structure.classes != null && structure.classes.length > 0)
                this.addClasses(structure.classes);
            if (structure.enums != null && structure.enums.length > 0)
                this.addEnums(structure.enums);
            if (structure.functions != null && structure.functions.length > 0)
                this.addFunctions(structure.functions);
            if (structure.interfaces != null && structure.interfaces.length > 0)
                this.addInterfaces(structure.interfaces);
            if (structure.namespaces != null && structure.namespaces.length > 0)
                this.addNamespaces(structure.namespaces);
            if (structure.typeAliases != null && structure.typeAliases.length > 0)
                this.addTypeAliases(structure.typeAliases);
            return this;
        };
        /**
         * @internal
         */
        class_1.prototype.getCompilerStatements = function () {
            if (utils_1.TypeGuards.isSourceFile(this) || utils_1.TypeGuards.isCaseClause(this) || utils_1.TypeGuards.isDefaultClause(this))
                return this.compilerNode.statements;
            else if (utils_1.TypeGuards.isNamespaceDeclaration(this)) {
                // need to get the inner-most body for namespaces
                var node = this;
                while (utils_1.TypeGuards.isBodiedNode(node) && node.compilerNode.statements == null) {
                    node = node.getBody();
                }
                return node.compilerNode.statements;
            }
            else if (utils_1.TypeGuards.isBodyableNode(this))
                return this.getBodyOrThrow().compilerNode.statements;
            else if (utils_1.TypeGuards.isBodiedNode(this))
                return this.getBody().compilerNode.statements;
            else if (utils_1.TypeGuards.isBlock(this))
                return this.compilerNode.statements;
            else
                throw new errors.NotImplementedError("Could not find the statements for node kind: " + this.getKindName() + ", text: " + this.getText());
        };
        class_1.prototype._insertChildren = function (opts) {
            var _this = this;
            return manipulation_1.insertIntoBracesOrSourceFileWithGetChildren({
                expectedKind: opts.expectedKind,
                getIndexedChildren: function () { return _this.getStatements(); },
                index: opts.index,
                parent: this,
                structures: opts.structures,
                write: function (writer, info) { return opts.write(writer, info); }
            });
        };
        class_1.prototype._standardWrite = function (writer, info, writeStructures, opts) {
            if (opts === void 0) { opts = {}; }
            if (info.previousMember != null && (opts.previousNewLine == null || !opts.previousNewLine(info.previousMember)))
                writer.blankLine();
            else if (!info.isStartOfFile)
                writer.newLine();
            writeStructures();
            if (info.nextMember != null && (opts.nextNewLine == null || !opts.nextNewLine(info.nextMember)))
                writer.blankLine();
            else
                writer.newLine();
        };
        return class_1;
    }(Base));
}
exports.StatementedNode = StatementedNode;
