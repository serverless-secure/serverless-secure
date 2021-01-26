"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var textSeek_1 = require("../../manipulation/textSeek");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var base_1 = require("../base");
var callBaseFill_1 = require("../callBaseFill");
var common_1 = require("../common");
var statement_1 = require("../statement");
var FileSystemRefreshResult_1 = require("./FileSystemRefreshResult");
// todo: not sure why I need to explicitly type this in order to get VS to not complain... (TS 2.4.1)
exports.SourceFileBase = base_1.TextInsertableNode(statement_1.StatementedNode(common_1.Node));
var SourceFile = /** @class */ (function (_super) {
    tslib_1.__extends(SourceFile, _super);
    /**
     * Initializes a new instance.
     * @internal
     * @param global - Global container.
     * @param node - Underlying node.
     */
    function SourceFile(global, node) {
        var _this = 
        // start hack :(
        _super.call(this, global, node, undefined) || this;
        /** @internal */
        _this._isSaved = false;
        /** @internal */
        _this._modifiedEventContainer = new utils_1.EventContainer();
        /** @internal */
        _this._referenceContainer = new utils_1.SourceFileReferenceContainer(_this);
        _this.sourceFile = _this;
        return _this;
        // end hack
    }
    /**
     * Fills the node from a structure.
     * @param structure - Structure to fill.
     */
    SourceFile.prototype.fill = function (structure) {
        callBaseFill_1.callBaseFill(exports.SourceFileBase.prototype, this, structure);
        if (structure.imports != null)
            this.addImportDeclarations(structure.imports);
        if (structure.exports != null)
            this.addExportDeclarations(structure.exports);
        return this;
    };
    /**
     * @internal
     *
     * WARNING: This should only be called by the compiler factory!
     */
    SourceFile.prototype.replaceCompilerNodeFromFactory = function (compilerNode) {
        _super.prototype.replaceCompilerNodeFromFactory.call(this, compilerNode);
        this.global.resetProgram(); // make sure the program has the latest source file
        this._isSaved = false;
        this._modifiedEventContainer.fire(this);
    };
    /**
     * Gets the file path.
     */
    SourceFile.prototype.getFilePath = function () {
        return this.compilerNode.fileName;
    };
    /**
     * Gets the file path's base name.
     */
    SourceFile.prototype.getBaseName = function () {
        return utils_1.FileUtils.getBaseName(this.getFilePath());
    };
    /**
     * Gets the file path's base name without the extension.
     */
    SourceFile.prototype.getBaseNameWithoutExtension = function () {
        var baseName = this.getBaseName();
        var extension = this.getExtension();
        return baseName.substring(0, baseName.length - extension.length);
    };
    /**
     * Gets the file path's extension.
     */
    SourceFile.prototype.getExtension = function () {
        return utils_1.FileUtils.getExtension(this.getFilePath());
    };
    /**
     * Gets the directory that the source file is contained in.
     */
    SourceFile.prototype.getDirectory = function () {
        return this.global.compilerFactory.getDirectoryFromCache(this.getDirectoryPath());
    };
    /**
     * Gets the directory path that the source file is contained in.
     */
    SourceFile.prototype.getDirectoryPath = function () {
        return utils_1.FileUtils.getDirPath(this.compilerNode.fileName);
    };
    /**
     * Gets the full text with leading trivia.
     */
    SourceFile.prototype.getFullText = function () {
        // return the string instead of letting Node.getFullText() do a substring to prevent an extra allocation
        return this.compilerNode.text;
    };
    /**
     * Gets the line number at the provided position.
     * @param pos - Position
     */
    SourceFile.prototype.getLineNumberAtPos = function (pos) {
        return utils_1.StringUtils.getLineNumberAtPos(this.getFullText(), pos);
    };
    /**
     * @deprecated Use getLineNumberAtPos.
     */
    SourceFile.prototype.getLineNumberFromPos = function (pos) {
        return utils_1.StringUtils.getLineNumberAtPos(this.getFullText(), pos);
    };
    /**
     * Gets the length from the start of the line to the provided position.
     * @param pos - Position.
     */
    SourceFile.prototype.getColumnAtPos = function (pos) {
        return utils_1.StringUtils.getColumnAtPos(this.getFullText(), pos);
    };
    /**
     * Copy this source file to a new file.
     *
     * This will modify the module specifiers in the new file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for copying.
     */
    SourceFile.prototype.copy = function (filePath, options) {
        if (options === void 0) { options = {}; }
        var result = this._copyInternal(filePath, options);
        if (result === false)
            return this;
        var copiedSourceFile = result;
        if (copiedSourceFile.getDirectoryPath() !== this.getDirectoryPath())
            copiedSourceFile._updateReferencesForCopyInternal(this._getReferencesForCopyInternal());
        return copiedSourceFile;
    };
    /** @internal */
    SourceFile.prototype._copyInternal = function (filePath, options) {
        if (options === void 0) { options = {}; }
        var _a = options.overwrite, overwrite = _a === void 0 ? false : _a;
        filePath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(filePath, this.getDirectoryPath());
        if (filePath === this.getFilePath())
            return false;
        return getCopiedSourceFile(this);
        function getCopiedSourceFile(currentFile) {
            try {
                return currentFile.global.compilerFactory.createSourceFileFromText(filePath, currentFile.getFullText(), {
                    overwrite: overwrite,
                    languageVersion: currentFile.getLanguageVersion()
                });
            }
            catch (err) {
                if (err instanceof errors.InvalidOperationError)
                    throw new errors.InvalidOperationError("Did you mean to provide the overwrite option? " + err.message);
                else
                    throw err;
            }
        }
    };
    /** @internal */
    SourceFile.prototype._getReferencesForCopyInternal = function () {
        return utils_1.ArrayUtils.from(this._referenceContainer.getLiteralsReferencingOtherSourceFilesEntries());
    };
    /** @internal */
    SourceFile.prototype._updateReferencesForCopyInternal = function (literalReferences) {
        var e_1, _a;
        try {
            // update the nodes in this list to point to the nodes in this copied source file
            for (var literalReferences_1 = tslib_1.__values(literalReferences), literalReferences_1_1 = literalReferences_1.next(); !literalReferences_1_1.done; literalReferences_1_1 = literalReferences_1.next()) {
                var reference = literalReferences_1_1.value;
                reference[0] = this.getChildSyntaxListOrThrow().getDescendantAtStartWithWidth(reference[0].getStart(), reference[0].getWidth());
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (literalReferences_1_1 && !literalReferences_1_1.done && (_a = literalReferences_1.return)) _a.call(literalReferences_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // update the string literals in the copied file
        updateStringLiteralReferences(literalReferences);
    };
    /**
     * Copy this source file to a new file and immediately saves it to the file system asynchronously.
     *
     * This will modify the module specifiers in the new file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for copying.
     */
    SourceFile.prototype.copyImmediately = function (filePath, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var newSourceFile;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newSourceFile = this.copy(filePath, options);
                        return [4 /*yield*/, newSourceFile.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, newSourceFile];
                }
            });
        });
    };
    /**
     * Copy this source file to a new file and immediately saves it to the file system synchronously.
     *
     * This will modify the module specifiers in the new file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for copying.
     */
    SourceFile.prototype.copyImmediatelySync = function (filePath, options) {
        var newSourceFile = this.copy(filePath, options);
        newSourceFile.saveSync();
        return newSourceFile;
    };
    /**
     * Moves this source file to a new file.
     *
     * This will modify the module specifiers in other files that specify this file and the module specifiers in the current file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for moving.
     */
    SourceFile.prototype.move = function (filePath, options) {
        if (options === void 0) { options = {}; }
        var oldDirPath = this.getDirectoryPath();
        var sourceFileReferences = this._getReferencesForMoveInternal();
        var oldFilePath = this.getFilePath();
        if (!this._moveInternal(filePath, options))
            return this;
        this.global.fileSystemWrapper.queueFileDelete(oldFilePath);
        this._updateReferencesForMoveInternal(sourceFileReferences, oldDirPath);
        // ignore any modifications in other source files
        this.global.lazyReferenceCoordinator.clearDirtySourceFiles();
        // need to add the current source file as being dirty because it was removed and added to the cache in the move
        this.global.lazyReferenceCoordinator.addDirtySourceFile(this);
        return this;
    };
    /** @internal */
    SourceFile.prototype._moveInternal = function (filePath, options) {
        if (options === void 0) { options = {}; }
        var _a = options.overwrite, overwrite = _a === void 0 ? false : _a;
        filePath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(filePath, this.getDirectoryPath());
        if (filePath === this.getFilePath())
            return false;
        if (overwrite) {
            // remove the past file if it exists
            var existingSourceFile = this.global.compilerFactory.getSourceFileFromCacheFromFilePath(filePath);
            if (existingSourceFile != null)
                existingSourceFile.forget();
        }
        else
            this.global.compilerFactory.throwIfFileExists(filePath, "Did you mean to provide the overwrite option?");
        manipulation_1.replaceSourceFileForFilePathMove({
            newFilePath: filePath,
            sourceFile: this
        });
        return true;
    };
    /** @internal */
    SourceFile.prototype._getReferencesForMoveInternal = function () {
        return {
            literalReferences: utils_1.ArrayUtils.from(this._referenceContainer.getLiteralsReferencingOtherSourceFilesEntries()),
            referencingLiterals: utils_1.ArrayUtils.from(this._referenceContainer.getReferencingLiteralsInOtherSourceFiles())
        };
    };
    /** @internal */
    SourceFile.prototype._updateReferencesForMoveInternal = function (sourceFileReferences, oldDirPath) {
        var _this = this;
        var literalReferences = sourceFileReferences.literalReferences, referencingLiterals = sourceFileReferences.referencingLiterals;
        // update the literals in this file if the directory has changed
        if (oldDirPath !== this.getDirectoryPath())
            updateStringLiteralReferences(literalReferences);
        // update the string literals in other files
        updateStringLiteralReferences(referencingLiterals.map(function (node) { return ([node, _this]); }));
    };
    /**
     * Moves this source file to a new file and asynchronously updates the file system immediately.
     *
     * This will modify the module specifiers in other files that specify this file and the module specifiers in the current file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for moving.
     */
    SourceFile.prototype.moveImmediately = function (filePath, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var oldFilePath, newFilePath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldFilePath = this.getFilePath();
                        newFilePath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(filePath, this.getDirectoryPath());
                        this.move(filePath, options);
                        if (!(oldFilePath !== newFilePath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.global.fileSystemWrapper.moveFileImmediately(oldFilePath, newFilePath, this.getFullText())];
                    case 1:
                        _a.sent();
                        this._isSaved = true;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.save()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * Moves this source file to a new file and synchronously updates the file system immediately.
     *
     * This will modify the module specifiers in other files that specify this file and the module specifiers in the current file, if necessary.
     * @param filePath - New file path. Can be relative to the original file or an absolute path.
     * @param options - Options for moving.
     */
    SourceFile.prototype.moveImmediatelySync = function (filePath, options) {
        var oldFilePath = this.getFilePath();
        var newFilePath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(filePath, this.getDirectoryPath());
        this.move(filePath, options);
        if (oldFilePath !== newFilePath) {
            this.global.fileSystemWrapper.moveFileImmediatelySync(oldFilePath, newFilePath, this.getFullText());
            this._isSaved = true;
        }
        else
            this.saveSync();
        return this;
    };
    /**
     * Queues a deletion of the file to the file system.
     *
     * The file will be deleted when you call ast.save(). If you wish to immediately delete the file, then use deleteImmediately().
     */
    SourceFile.prototype.delete = function () {
        var filePath = this.getFilePath();
        this.forget();
        this.global.fileSystemWrapper.queueFileDelete(filePath);
    };
    /**
     * Asynchronously deletes the file from the file system.
     */
    SourceFile.prototype.deleteImmediately = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var filePath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = this.getFilePath();
                        this.forget();
                        return [4 /*yield*/, this.global.fileSystemWrapper.deleteFileImmediately(filePath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously deletes the file from the file system.
     */
    SourceFile.prototype.deleteImmediatelySync = function () {
        var filePath = this.getFilePath();
        this.forget();
        this.global.fileSystemWrapper.deleteFileImmediatelySync(filePath);
    };
    /**
     * Asynchronously saves this file with any changes.
     */
    SourceFile.prototype.save = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.global.fileSystemWrapper.writeFile(this.getFilePath(), this.getFullText())];
                    case 1:
                        _a.sent();
                        this._isSaved = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously saves this file with any changes.
     */
    SourceFile.prototype.saveSync = function () {
        this.global.fileSystemWrapper.writeFileSync(this.getFilePath(), this.getFullText());
        this._isSaved = true;
    };
    /**
     * Gets any referenced files.
     */
    SourceFile.prototype.getReferencedFiles = function () {
        var _this = this;
        // todo: add tests
        var dirPath = this.getDirectoryPath();
        return (this.compilerNode.referencedFiles || [])
            .map(function (f) { return _this.global.compilerFactory.addOrGetSourceFileFromFilePath(utils_1.FileUtils.pathJoin(dirPath, f.fileName), {}); })
            .filter(function (f) { return f != null; });
    };
    /**
     * Gets the source files for any type reference directives.
     */
    SourceFile.prototype.getTypeReferenceDirectives = function () {
        var _this = this;
        // todo: add tests
        var dirPath = this.getDirectoryPath();
        return (this.compilerNode.typeReferenceDirectives || [])
            .map(function (f) { return _this.global.compilerFactory.addOrGetSourceFileFromFilePath(utils_1.FileUtils.pathJoin(dirPath, f.fileName), {}); })
            .filter(function (f) { return f != null; });
    };
    /**
     * Get any source files that reference this source file.
     */
    SourceFile.prototype.getReferencingSourceFiles = function () {
        return utils_1.ArrayUtils.from(this._referenceContainer.getDependentSourceFiles());
    };
    /**
     * Gets the import and exports in other source files that reference this source file.
     */
    SourceFile.prototype.getReferencingNodesInOtherSourceFiles = function () {
        return utils_1.ArrayUtils.from(this._referenceContainer.getReferencingNodesInOtherSourceFiles());
    };
    /**
     * Gets the string literals in other source files that reference this source file.
     */
    SourceFile.prototype.getReferencingLiteralsInOtherSourceFiles = function () {
        return utils_1.ArrayUtils.from(this._referenceContainer.getReferencingLiteralsInOtherSourceFiles());
    };
    /**
     * Gets all the descendant string literals that reference a source file.
     */
    SourceFile.prototype.getImportStringLiterals = function () {
        var _this = this;
        this.ensureBound();
        var literals = (this.compilerNode.imports || []);
        return literals.filter(function (l) { return (l.flags & typescript_1.ts.NodeFlags.Synthesized) === 0; }).map(function (l) { return _this.getNodeFromCompilerNode(l); });
    };
    /**
     * Gets the script target of the source file.
     */
    SourceFile.prototype.getLanguageVersion = function () {
        return this.compilerNode.languageVersion;
    };
    /**
     * Gets the language variant of the source file.
     */
    SourceFile.prototype.getLanguageVariant = function () {
        return this.compilerNode.languageVariant;
    };
    /**
     * Gets if this is a declaration file.
     */
    SourceFile.prototype.isDeclarationFile = function () {
        return this.compilerNode.isDeclarationFile;
    };
    /**
     * Gets if the source file is from an external library.
     */
    SourceFile.prototype.isFromExternalLibrary = function () {
        return this.global.program.isSourceFileFromExternalLibrary(this);
    };
    /**
     * Gets if this source file has been saved or if the latest changes have been saved.
     */
    SourceFile.prototype.isSaved = function () {
        return this._isSaved;
    };
    /**
     * Sets if this source file has been saved.
     * @internal
     */
    SourceFile.prototype.setIsSaved = function (value) {
        this._isSaved = value;
    };
    /**
     * Adds an import.
     * @param structure - Structure that represents the import.
     */
    SourceFile.prototype.addImportDeclaration = function (structure) {
        return this.addImportDeclarations([structure])[0];
    };
    /**
     * Adds imports.
     * @param structures - Structures that represent the imports.
     */
    SourceFile.prototype.addImportDeclarations = function (structures) {
        var imports = this.getImportDeclarations();
        var insertIndex = imports.length === 0 ? 0 : imports[imports.length - 1].getChildIndex() + 1;
        return this.insertImportDeclarations(insertIndex, structures);
    };
    /**
     * Insert an import.
     * @param index - Index to insert at.
     * @param structure - Structure that represents the import.
     */
    SourceFile.prototype.insertImportDeclaration = function (index, structure) {
        return this.insertImportDeclarations(index, [structure])[0];
    };
    /**
     * Insert imports into a file.
     * @param index - Index to insert at.
     * @param structures - Structures that represent the imports to insert.
     */
    SourceFile.prototype.insertImportDeclarations = function (index, structures) {
        var _this = this;
        return this._insertChildren({
            expectedKind: typescript_1.SyntaxKind.ImportDeclaration,
            index: index,
            structures: structures,
            write: function (writer, info) {
                _this._standardWrite(writer, info, function () {
                    _this.global.structurePrinterFactory.forImportDeclaration().printTexts(writer, structures);
                }, {
                    previousNewLine: function (previousMember) { return utils_1.TypeGuards.isImportDeclaration(previousMember); },
                    nextNewLine: function (nextMember) { return utils_1.TypeGuards.isImportDeclaration(nextMember); }
                });
            }
        });
    };
    /**
     * Gets the first import declaration that matches a condition, or undefined if it doesn't exist.
     * @param condition - Condition to get the import by.
     */
    SourceFile.prototype.getImportDeclaration = function (condition) {
        return utils_1.ArrayUtils.find(this.getImportDeclarations(), condition);
    };
    /**
     * Gets the first import declaration that matches a condition, or throws if it doesn't exist.
     * @param condition - Condition to get the import by.
     */
    SourceFile.prototype.getImportDeclarationOrThrow = function (condition) {
        return errors.throwIfNullOrUndefined(this.getImportDeclaration(condition), "Expected to find an import with the provided condition.");
    };
    /**
     * Get the file's import declarations.
     */
    SourceFile.prototype.getImportDeclarations = function () {
        // todo: remove type assertion
        return this.getChildSyntaxListOrThrow().getChildrenOfKind(typescript_1.SyntaxKind.ImportDeclaration);
    };
    /**
     * Add export declarations.
     * @param structure - Structure that represents the export.
     */
    SourceFile.prototype.addExportDeclaration = function (structure) {
        return this.addExportDeclarations([structure])[0];
    };
    /**
     * Add export declarations.
     * @param structures - Structures that represent the exports.
     */
    SourceFile.prototype.addExportDeclarations = function (structures) {
        // always insert at end of file because of export {Identifier}; statements
        return this.insertExportDeclarations(this.getChildSyntaxListOrThrow().getChildCount(), structures);
    };
    /**
     * Insert an export declaration.
     * @param index - Index to insert at.
     * @param structure - Structure that represents the export.
     */
    SourceFile.prototype.insertExportDeclaration = function (index, structure) {
        return this.insertExportDeclarations(index, [structure])[0];
    };
    /**
     * Insert export declarations into a file.
     * @param index - Index to insert at.
     * @param structures - Structures that represent the exports to insert.
     */
    SourceFile.prototype.insertExportDeclarations = function (index, structures) {
        var _this = this;
        return this._insertChildren({
            expectedKind: typescript_1.SyntaxKind.ExportDeclaration,
            index: index,
            structures: structures,
            write: function (writer, info) {
                _this._standardWrite(writer, info, function () {
                    _this.global.structurePrinterFactory.forExportDeclaration().printTexts(writer, structures);
                }, {
                    previousNewLine: function (previousMember) { return utils_1.TypeGuards.isExportDeclaration(previousMember); },
                    nextNewLine: function (nextMember) { return utils_1.TypeGuards.isExportDeclaration(nextMember); }
                });
            }
        });
    };
    /**
     * Gets the first export declaration that matches a condition, or undefined if it doesn't exist.
     * @param condition - Condition to get the export declaration by.
     */
    SourceFile.prototype.getExportDeclaration = function (condition) {
        return utils_1.ArrayUtils.find(this.getExportDeclarations(), condition);
    };
    /**
     * Gets the first export declaration that matches a condition, or throws if it doesn't exist.
     * @param condition - Condition to get the export declaration by.
     */
    SourceFile.prototype.getExportDeclarationOrThrow = function (condition) {
        return errors.throwIfNullOrUndefined(this.getExportDeclaration(condition), "Expected to find an export declaration with the provided condition.");
    };
    /**
     * Get the file's export declarations.
     */
    SourceFile.prototype.getExportDeclarations = function () {
        return this.getChildSyntaxListOrThrow().getChildrenOfKind(typescript_1.SyntaxKind.ExportDeclaration);
    };
    /**
     * Gets the export symbols of the source file.
     */
    SourceFile.prototype.getExportSymbols = function () {
        return this.global.typeChecker.getExportsOfModule(this.getSymbolOrThrow());
    };
    /**
     * Gets all the declarations exported from the file.
     */
    SourceFile.prototype.getExportedDeclarations = function () {
        var exportSymbols = this.getExportSymbols();
        return utils_1.ArrayUtils.from(getDeclarationsForSymbols());
        function getDeclarationsForSymbols() {
            function getDeclarationHandlingExportSpecifiers(declaration) {
                var e_4, _a, e_5, _b, _c, _d, d, e_4_1, identifier, symbol, _e, _f, d, e_5_1;
                return tslib_1.__generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            if (handledDeclarations.has(declaration))
                                return [2 /*return*/];
                            handledDeclarations.add(declaration);
                            if (!(declaration.getKind() === typescript_1.SyntaxKind.ExportSpecifier)) return [3 /*break*/, 9];
                            _g.label = 1;
                        case 1:
                            _g.trys.push([1, 6, 7, 8]);
                            _c = tslib_1.__values(declaration.getLocalTargetDeclarations()), _d = _c.next();
                            _g.label = 2;
                        case 2:
                            if (!!_d.done) return [3 /*break*/, 5];
                            d = _d.value;
                            return [5 /*yield**/, tslib_1.__values(getDeclarationHandlingExportSpecifiers(d))];
                        case 3:
                            _g.sent();
                            _g.label = 4;
                        case 4:
                            _d = _c.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_4_1 = _g.sent();
                            e_4 = { error: e_4_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                            }
                            finally { if (e_4) throw e_4.error; }
                            return [7 /*endfinally*/];
                        case 8: return [3 /*break*/, 20];
                        case 9:
                            if (!(declaration.getKind() === typescript_1.SyntaxKind.ExportAssignment)) return [3 /*break*/, 18];
                            identifier = declaration.getExpression();
                            if (identifier == null || identifier.getKind() !== typescript_1.SyntaxKind.Identifier)
                                return [2 /*return*/];
                            symbol = identifier.getSymbol();
                            if (symbol == null)
                                return [2 /*return*/];
                            _g.label = 10;
                        case 10:
                            _g.trys.push([10, 15, 16, 17]);
                            _e = tslib_1.__values(symbol.getDeclarations()), _f = _e.next();
                            _g.label = 11;
                        case 11:
                            if (!!_f.done) return [3 /*break*/, 14];
                            d = _f.value;
                            return [5 /*yield**/, tslib_1.__values(getDeclarationHandlingExportSpecifiers(d))];
                        case 12:
                            _g.sent();
                            _g.label = 13;
                        case 13:
                            _f = _e.next();
                            return [3 /*break*/, 11];
                        case 14: return [3 /*break*/, 17];
                        case 15:
                            e_5_1 = _g.sent();
                            e_5 = { error: e_5_1 };
                            return [3 /*break*/, 17];
                        case 16:
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_5) throw e_5.error; }
                            return [7 /*endfinally*/];
                        case 17: return [3 /*break*/, 20];
                        case 18: return [4 /*yield*/, declaration];
                        case 19:
                            _g.sent();
                            _g.label = 20;
                        case 20: return [2 /*return*/];
                    }
                });
            }
            var e_2, _a, e_3, _b, handledDeclarations, exportSymbols_1, exportSymbols_1_1, symbol, _c, _d, declaration, e_3_1, e_2_1;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        handledDeclarations = utils_1.createHashSet();
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 12, 13, 14]);
                        exportSymbols_1 = tslib_1.__values(exportSymbols), exportSymbols_1_1 = exportSymbols_1.next();
                        _e.label = 2;
                    case 2:
                        if (!!exportSymbols_1_1.done) return [3 /*break*/, 11];
                        symbol = exportSymbols_1_1.value;
                        _e.label = 3;
                    case 3:
                        _e.trys.push([3, 8, 9, 10]);
                        _c = tslib_1.__values(symbol.getDeclarations()), _d = _c.next();
                        _e.label = 4;
                    case 4:
                        if (!!_d.done) return [3 /*break*/, 7];
                        declaration = _d.value;
                        return [5 /*yield**/, tslib_1.__values(getDeclarationHandlingExportSpecifiers(declaration))];
                    case 5:
                        _e.sent();
                        _e.label = 6;
                    case 6:
                        _d = _c.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_3_1 = _e.sent();
                        e_3 = { error: e_3_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                        }
                        finally { if (e_3) throw e_3.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        exportSymbols_1_1 = exportSymbols_1.next();
                        return [3 /*break*/, 2];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_2_1 = _e.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (exportSymbols_1_1 && !exportSymbols_1_1.done && (_a = exportSymbols_1.return)) _a.call(exportSymbols_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 14: return [2 /*return*/];
                }
            });
        }
    };
    /**
     * Add export assignments.
     * @param structure - Structure that represents the export.
     */
    SourceFile.prototype.addExportAssignment = function (structure) {
        return this.addExportAssignments([structure])[0];
    };
    /**
     * Add export assignments.
     * @param structures - Structures that represent the exports.
     */
    SourceFile.prototype.addExportAssignments = function (structures) {
        // always insert at end of file because of export {Identifier}; statements
        return this.insertExportAssignments(this.getChildSyntaxListOrThrow().getChildCount(), structures);
    };
    /**
     * Insert an export assignment.
     * @param index - Index to insert at.
     * @param structure - Structure that represents the export.
     */
    SourceFile.prototype.insertExportAssignment = function (index, structure) {
        return this.insertExportAssignments(index, [structure])[0];
    };
    /**
     * Insert export assignments into a file.
     * @param index - Index to insert at.
     * @param structures - Structures that represent the exports to insert.
     */
    SourceFile.prototype.insertExportAssignments = function (index, structures) {
        var _this = this;
        return this._insertChildren({
            expectedKind: typescript_1.SyntaxKind.ExportAssignment,
            index: index,
            structures: structures,
            write: function (writer, info) {
                _this._standardWrite(writer, info, function () {
                    _this.global.structurePrinterFactory.forExportAssignment().printTexts(writer, structures);
                }, {
                    previousNewLine: function (previousMember) { return utils_1.TypeGuards.isExportAssignment(previousMember); },
                    nextNewLine: function (nextMember) { return utils_1.TypeGuards.isExportAssignment(nextMember); }
                });
            }
        });
    };
    /**
     * Gets the first export assignment that matches a condition, or undefined if it doesn't exist.
     * @param condition - Condition to get the export assignment by.
     */
    SourceFile.prototype.getExportAssignment = function (condition) {
        return utils_1.ArrayUtils.find(this.getExportAssignments(), condition);
    };
    /**
     * Gets the first export assignment that matches a condition, or throws if it doesn't exist.
     * @param condition - Condition to get the export assignment by.
     */
    SourceFile.prototype.getExportAssignmentOrThrow = function (condition) {
        return errors.throwIfNullOrUndefined(this.getExportAssignment(condition), "Expected to find an export assignment with the provided condition.");
    };
    /**
     * Get the file's export assignments.
     */
    SourceFile.prototype.getExportAssignments = function () {
        return this.getChildSyntaxListOrThrow().getChildrenOfKind(typescript_1.SyntaxKind.ExportAssignment);
    };
    /**
     * Gets the default export symbol of the file.
     */
    SourceFile.prototype.getDefaultExportSymbol = function () {
        var sourceFileSymbol = this.getSymbol();
        // will be undefined when the source file doesn't have an export
        if (sourceFileSymbol == null)
            return undefined;
        return sourceFileSymbol.getExportByName("default");
    };
    /**
     * Gets the default export symbol of the file or throws if it doesn't exist.
     */
    SourceFile.prototype.getDefaultExportSymbolOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getDefaultExportSymbol(), "Expected to find a default export symbol");
    };
    /**
     * Gets the syntactic, semantic, and declaration diagnostics.
     */
    SourceFile.prototype.getDiagnostics = function () {
        return tslib_1.__spread(this.global.program.getSyntacticDiagnostics(this), this.global.program.getSemanticDiagnostics(this), this.global.program.getDeclarationDiagnostics(this));
    };
    /**
     * Gets the pre-emit diagnostics.
     */
    SourceFile.prototype.getPreEmitDiagnostics = function () {
        return this.global.program.getPreEmitDiagnostics(this);
    };
    /**
     * Removes any "export default";
     */
    SourceFile.prototype.removeDefaultExport = function (defaultExportSymbol) {
        defaultExportSymbol = defaultExportSymbol || this.getDefaultExportSymbol();
        if (defaultExportSymbol == null)
            return this;
        var declaration = defaultExportSymbol.getDeclarations()[0];
        if (declaration.compilerNode.kind === typescript_1.SyntaxKind.ExportAssignment)
            manipulation_1.removeChildrenWithFormatting({ children: [declaration], getSiblingFormatting: function () { return manipulation_1.FormattingKind.Newline; } });
        else if (utils_1.TypeGuards.isModifierableNode(declaration)) {
            declaration.toggleModifier("default", false);
            declaration.toggleModifier("export", false);
        }
        return this;
    };
    SourceFile.prototype.unindent = function (positionRangeOrPos, times) {
        if (times === void 0) { times = 1; }
        return this.indent(positionRangeOrPos, times * -1);
    };
    SourceFile.prototype.indent = function (positionRangeOrPos, times) {
        var e_6, _a;
        if (times === void 0) { times = 1; }
        if (times === 0)
            return this;
        var sourceFileText = this.getFullText();
        var positionRange = typeof positionRangeOrPos === "number" ? [positionRangeOrPos, positionRangeOrPos] : positionRangeOrPos;
        errors.throwIfRangeOutOfRange(positionRange, [0, sourceFileText.length], "positionRange");
        var startLinePos = textSeek_1.getPreviousMatchingPos(sourceFileText, positionRange[0], function (char) { return char === "\n"; });
        var endLinePos = textSeek_1.getNextMatchingPos(sourceFileText, positionRange[1], function (char) { return char === "\r" || char === "\n"; });
        var indentText = this.global.manipulationSettings.getIndentationText();
        var unindentRegex = times > 0 ? undefined : new RegExp(getDeindentRegexText());
        var pos = startLinePos;
        var newLines = [];
        try {
            for (var _b = tslib_1.__values(sourceFileText.substring(startLinePos, endLinePos).split("\n")), _c = _b.next(); !_c.done; _c = _b.next()) {
                var line = _c.value;
                if (this.isInStringAtPos(pos))
                    newLines.push(line);
                else if (times > 0)
                    newLines.push(utils_1.StringUtils.repeat(indentText, times) + line);
                else // negative
                    newLines.push(line.replace(unindentRegex, ""));
                pos += line.length;
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
        manipulation_1.replaceSourceFileTextForFormatting({
            sourceFile: this,
            newText: sourceFileText.substring(0, startLinePos) + newLines.join("\n") + sourceFileText.substring(endLinePos)
        });
        return this;
        function getDeindentRegexText() {
            var isSpaces = /^ +$/;
            var text = "^";
            for (var i = 0; i < Math.abs(times); i++) {
                text += "(";
                if (isSpaces.test(indentText)) {
                    // the optional string makes it possible to unindent when a line doesn't have the full number of spaces
                    for (var j = 0; j < indentText.length; j++)
                        text += " ?";
                }
                else
                    text += indentText;
                text += "|\t)?";
            }
            return text;
        }
    };
    /**
     * Emits the source file.
     */
    SourceFile.prototype.emit = function (options) {
        return this.global.program.emit(tslib_1.__assign({ targetSourceFile: this }, options));
    };
    /**
     * Gets the emit output of this source file.
     * @param options - Emit options.
     */
    SourceFile.prototype.getEmitOutput = function (options) {
        if (options === void 0) { options = {}; }
        return this.global.languageService.getEmitOutput(this, options.emitOnlyDtsFiles || false);
    };
    /**
     * Formats the source file text using the internal TypeScript formatting API.
     * @param settings - Format code settings.
     */
    SourceFile.prototype.formatText = function (settings) {
        if (settings === void 0) { settings = {}; }
        manipulation_1.replaceSourceFileTextForFormatting({
            sourceFile: this,
            newText: this.global.languageService.getFormattedDocumentText(this.getFilePath(), settings)
        });
    };
    /**
     * Refresh the source file from the file system.
     *
     * WARNING: When updating from the file system, this will "forget" any previously navigated nodes.
     * @returns What action ended up taking place.
     */
    SourceFile.prototype.refreshFromFileSystem = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fileReadResult;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.global.fileSystemWrapper.readFileOrNotExists(this.getFilePath(), this.global.getEncoding())];
                    case 1:
                        fileReadResult = _a.sent();
                        return [2 /*return*/, this._refreshFromFileSystemInternal(fileReadResult)];
                }
            });
        });
    };
    /**
     * Synchronously refreshes the source file from the file system.
     *
     * WARNING: When updating from the file system, this will "forget" any previously navigated nodes.
     * @returns What action ended up taking place.
     */
    SourceFile.prototype.refreshFromFileSystemSync = function () {
        var fileReadResult = this.global.fileSystemWrapper.readFileOrNotExistsSync(this.getFilePath(), this.global.getEncoding());
        return this._refreshFromFileSystemInternal(fileReadResult);
    };
    SourceFile.prototype.getRelativePathTo = function (sourceFileOrDir) {
        return this.getDirectory().getRelativePathTo(sourceFileOrDir);
    };
    SourceFile.prototype.getRelativePathAsModuleSpecifierTo = function (sourceFileOrDir) {
        return this.getDirectory().getRelativePathAsModuleSpecifierTo(sourceFileOrDir);
    };
    /**
     * Subscribe to when the source file is modified.
     * @param subscription - Subscription.
     * @param subscribe - Optional and defaults to true. Use an explicit false to unsubscribe.
     */
    SourceFile.prototype.onModified = function (subscription, subscribe) {
        if (subscribe === void 0) { subscribe = true; }
        if (subscribe)
            this._modifiedEventContainer.subscribe(subscription);
        else
            this._modifiedEventContainer.unsubscribe(subscription);
        return this;
    };
    /**
     * Organizes the imports in the file.
     *
     * WARNING! This will forget all the nodes in the file! It's best to do this after you're all done with the file.
     * @param settings - Format code settings.
     * @param userPreferences - User preferences for refactoring.
     */
    SourceFile.prototype.organizeImports = function (settings, userPreferences) {
        if (settings === void 0) { settings = {}; }
        if (userPreferences === void 0) { userPreferences = {}; }
        this.applyTextChanges(utils_1.ArrayUtils.flatten(this.global.languageService.organizeImports(this, settings, userPreferences).map(function (r) { return r.getTextChanges(); })));
        return this;
    };
    /**
     * Applies the text changes to the source file.
     *
     * WARNING! This will forget all the nodes in the file! It's best to do this after you're all done with the file.
     * @param textChanges - Text changes.
     */
    SourceFile.prototype.applyTextChanges = function (textChanges) {
        this.getChildSyntaxListOrThrow().forget();
        manipulation_1.replaceNodeText({
            sourceFile: this.sourceFile,
            start: 0,
            replacingLength: this.getFullWidth(),
            newText: manipulation_1.getTextFromFormattingEdits(this, textChanges)
        });
        return this;
    };
    SourceFile.prototype._refreshFromFileSystemInternal = function (fileReadResult) {
        if (fileReadResult === false) {
            this.forget();
            return FileSystemRefreshResult_1.FileSystemRefreshResult.Deleted;
        }
        var fileText = fileReadResult;
        if (fileText === this.getFullText())
            return FileSystemRefreshResult_1.FileSystemRefreshResult.NoChange;
        this.replaceText([0, this.getEnd()], fileText);
        this.setIsSaved(true); // saved when loaded from file system
        return FileSystemRefreshResult_1.FileSystemRefreshResult.Updated;
    };
    return SourceFile;
}(exports.SourceFileBase));
exports.SourceFile = SourceFile;
function updateStringLiteralReferences(nodeReferences) {
    var e_7, _a;
    try {
        for (var nodeReferences_1 = tslib_1.__values(nodeReferences), nodeReferences_1_1 = nodeReferences_1.next(); !nodeReferences_1_1.done; nodeReferences_1_1 = nodeReferences_1.next()) {
            var _b = tslib_1.__read(nodeReferences_1_1.value, 2), stringLiteral = _b[0], sourceFile = _b[1];
            if (utils_1.ModuleUtils.isModuleSpecifierRelative(stringLiteral.getLiteralText()))
                stringLiteral.setLiteralValue(stringLiteral.sourceFile.getRelativePathAsModuleSpecifierTo(sourceFile));
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (nodeReferences_1_1 && !nodeReferences_1_1.done && (_a = nodeReferences_1.return)) _a.call(nodeReferences_1);
        }
        finally { if (e_7) throw e_7.error; }
    }
}
