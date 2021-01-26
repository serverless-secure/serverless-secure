"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var compiler_1 = require("../compiler");
var errors = require("../errors");
var typescript_1 = require("../typescript");
var utils_1 = require("../utils");
var DirectoryEmitResult_1 = require("./DirectoryEmitResult");
var Directory = /** @class */ (function () {
    /** @internal */
    function Directory(global, path) {
        this._global = global;
        this._setPathInternal(path);
    }
    /** @internal */
    Directory.prototype._setPathInternal = function (path) {
        this._path = path;
        this._pathParts = path.split("/").filter(function (p) { return p.length > 0; });
    };
    Object.defineProperty(Directory.prototype, "global", {
        /** @internal */
        get: function () {
            this._throwIfDeletedOrRemoved();
            return this._global;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if this directory is an ancestor of the provided directory.
     * @param possibleDescendant - Directory or source file that's a possible descendant.
     */
    Directory.prototype.isAncestorOf = function (possibleDescendant) {
        return Directory.isAncestorOfDir(this, possibleDescendant);
    };
    /**
     * Checks if this directory is a descendant of the provided directory.
     * @param possibleAncestor - Directory or source file that's a possible ancestor.
     */
    Directory.prototype.isDescendantOf = function (possibleAncestor) {
        return Directory.isAncestorOfDir(possibleAncestor, this);
    };
    /**
     * Gets the directory depth.
     * @internal
     */
    Directory.prototype.getDepth = function () {
        return this._pathParts.length;
    };
    /**
     * Gets the path to the directory.
     */
    Directory.prototype.getPath = function () {
        this._throwIfDeletedOrRemoved();
        return this._path;
    };
    /**
     * Gets the directory path's base name.
     */
    Directory.prototype.getBaseName = function () {
        return this._pathParts[this._pathParts.length - 1];
    };
    /**
     * Gets the parent directory or throws if it doesn't exist or was never added to the AST.
     */
    Directory.prototype.getParentOrThrow = function () {
        var _this = this;
        return errors.throwIfNullOrUndefined(this.getParent(), function () { return "Parent directory of " + _this.getPath() + " does not exist or was never added."; });
    };
    /**
     * Gets the parent directory if it exists and was added to the AST.
     */
    Directory.prototype.getParent = function () {
        if (utils_1.FileUtils.isRootDirPath(this.getPath()))
            return undefined;
        return this.addExistingDirectoryIfExists(utils_1.FileUtils.getDirPath(this.getPath()));
    };
    Directory.prototype.getDirectoryOrThrow = function (pathOrCondition) {
        var _this = this;
        return errors.throwIfNullOrUndefined(this.getDirectory(pathOrCondition), function () {
            if (typeof pathOrCondition === "string")
                return "Could not find a directory at path '" + _this.global.fileSystemWrapper.getStandardizedAbsolutePath(pathOrCondition, _this.getPath()) + "'.";
            return "Could not find child directory that matched condition.";
        });
    };
    Directory.prototype.getDirectory = function (pathOrCondition) {
        if (typeof pathOrCondition === "string") {
            var path = this.global.fileSystemWrapper.getStandardizedAbsolutePath(pathOrCondition, this.getPath());
            return this.global.compilerFactory.getDirectoryFromCache(path);
        }
        return utils_1.ArrayUtils.find(this.getDirectories(), pathOrCondition);
    };
    Directory.prototype.getSourceFileOrThrow = function (pathOrCondition) {
        var _this = this;
        return errors.throwIfNullOrUndefined(this.getSourceFile(pathOrCondition), function () {
            if (typeof pathOrCondition === "string")
                return "Could not find child source file at path '" + _this.global.fileSystemWrapper.getStandardizedAbsolutePath(pathOrCondition, _this.getPath()) + "'.";
            return "Could not find child source file that matched condition.";
        });
    };
    Directory.prototype.getSourceFile = function (pathOrCondition) {
        if (typeof pathOrCondition === "string") {
            var path = this.global.fileSystemWrapper.getStandardizedAbsolutePath(pathOrCondition, this.getPath());
            return this.global.compilerFactory.getSourceFileFromCacheFromFilePath(path);
        }
        return utils_1.ArrayUtils.find(this.getSourceFiles(), pathOrCondition);
    };
    /**
     * Gets the child directories.
     */
    Directory.prototype.getDirectories = function () {
        return this.global.compilerFactory.getChildDirectoriesOfDirectory(this.getPath());
    };
    /**
     * Gets the source files within this directory.
     */
    Directory.prototype.getSourceFiles = function () {
        return this.global.compilerFactory.getChildSourceFilesOfDirectory(this.getPath());
    };
    /**
     * Gets the source files in the current directory and all the descendant directories.
     */
    Directory.prototype.getDescendantSourceFiles = function () {
        return utils_1.ArrayUtils.from(this.getDescendantSourceFilesIterator());
    };
    /**
     * Gets the source files in the current directory and all the descendant directories.
     * @internal
     */
    Directory.prototype.getDescendantSourceFilesIterator = function () {
        var e_1, _a, e_2, _b, _c, _d, sourceFile, e_1_1, _e, _f, directory, e_2_1;
        return tslib_1.__generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 5, 6, 7]);
                    _c = tslib_1.__values(this.getSourceFiles()), _d = _c.next();
                    _g.label = 1;
                case 1:
                    if (!!_d.done) return [3 /*break*/, 4];
                    sourceFile = _d.value;
                    return [4 /*yield*/, sourceFile];
                case 2:
                    _g.sent();
                    _g.label = 3;
                case 3:
                    _d = _c.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7 /*endfinally*/];
                case 7:
                    _g.trys.push([7, 12, 13, 14]);
                    _e = tslib_1.__values(this.getDirectories()), _f = _e.next();
                    _g.label = 8;
                case 8:
                    if (!!_f.done) return [3 /*break*/, 11];
                    directory = _f.value;
                    return [5 /*yield**/, tslib_1.__values(directory.getDescendantSourceFilesIterator())];
                case 9:
                    _g.sent();
                    _g.label = 10;
                case 10:
                    _f = _e.next();
                    return [3 /*break*/, 8];
                case 11: return [3 /*break*/, 14];
                case 12:
                    e_2_1 = _g.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 14];
                case 13:
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    };
    /**
     * Gets the descendant directories.
     */
    Directory.prototype.getDescendantDirectories = function () {
        return utils_1.ArrayUtils.from(this.getDescendantDirectoriesIterator());
    };
    /**
     * Gets the descendant directories.
     * @internal
     */
    Directory.prototype.getDescendantDirectoriesIterator = function () {
        var e_3, _a, _b, _c, directory, e_3_1;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 6, 7, 8]);
                    _b = tslib_1.__values(this.getDirectories()), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3 /*break*/, 5];
                    directory = _c.value;
                    return [4 /*yield*/, directory];
                case 2:
                    _d.sent();
                    return [5 /*yield**/, tslib_1.__values(directory.getDescendantDirectoriesIterator())];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    _c = _b.next();
                    return [3 /*break*/, 1];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_3_1 = _d.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    };
    /**
     * Adds an existing directory to the AST from the relative path or directory name, or returns undefined if it doesn't exist.
     *
     * Will return the directory if it was already added.
     * @param dirPath - Directory name or path to the directory that should be added.
     * @param options - Options.
     */
    Directory.prototype.addExistingDirectoryIfExists = function (dirPath, options) {
        if (options === void 0) { options = {}; }
        dirPath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(dirPath, this.getPath());
        return this.global.directoryCoordinator.addExistingDirectoryIfExists(dirPath, options);
    };
    /**
     * Adds an existing directory to the AST from the relative path or directory name, or throws if it doesn't exist.
     *
     * Will return the directory if it was already added.
     * @param dirPath - Directory name or path to the directory that should be added.
     * @throws DirectoryNotFoundError if the directory does not exist.
     */
    Directory.prototype.addExistingDirectory = function (dirPath, options) {
        if (options === void 0) { options = {}; }
        dirPath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(dirPath, this.getPath());
        return this.global.directoryCoordinator.addExistingDirectory(dirPath, options);
    };
    /**
     * Creates a directory if it doesn't exist.
     * @param dirPath - Relative or absolute path to the directory that should be created.
     */
    Directory.prototype.createDirectory = function (dirPath) {
        dirPath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(dirPath, this.getPath());
        return this.global.directoryCoordinator.createDirectoryOrAddIfExists(dirPath);
    };
    Directory.prototype.createSourceFile = function (relativeFilePath, structureOrText, options) {
        var filePath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(relativeFilePath, this.getPath());
        return this.global.compilerFactory.createSourceFile(filePath, structureOrText || "", options || {});
    };
    /**
     * Adds an existing source file to the AST, relative to this directory, or returns undefined.
     *
     * Will return the source file if it was already added.
     * @param relativeFilePath - Relative file path to add.
     * @param options - Options for adding the source file.
     */
    Directory.prototype.addExistingSourceFileIfExists = function (relativeFilePath, options) {
        var filePath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(relativeFilePath, this.getPath());
        return this.global.compilerFactory.addOrGetSourceFileFromFilePath(filePath, options || {});
    };
    /**
     * Adds an existing source file to the AST, relative to this directory, or throws if it doesn't exist.
     *
     * Will return the source file if it was already added.
     * @param relativeFilePath - Relative file path to add.
     * @param options - Options for adding the source file.
     * @throws FileNotFoundError when the file doesn't exist.
     */
    Directory.prototype.addExistingSourceFile = function (relativeFilePath, options) {
        var sourceFile = this.addExistingSourceFileIfExists(relativeFilePath, options);
        if (sourceFile == null)
            throw new errors.FileNotFoundError(this.global.fileSystemWrapper.getStandardizedAbsolutePath(relativeFilePath, this.getPath()));
        return sourceFile;
    };
    /**
     * Emits the files in the directory.
     * @param options - Options for emitting.
     */
    Directory.prototype.emit = function (options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_4, _a, fileSystemWrapper, writeTasks, outputFilePaths, _b, _c, emitResult, e_4_1;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        fileSystemWrapper = this.global.fileSystemWrapper;
                        writeTasks = [];
                        outputFilePaths = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 7, 8, 9]);
                        _b = tslib_1.__values(this._emitInternal(options)), _c = _b.next();
                        _d.label = 2;
                    case 2:
                        if (!!_c.done) return [3 /*break*/, 6];
                        emitResult = _c.value;
                        if (!(emitResult === false)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Promise.all(writeTasks)];
                    case 3:
                        _d.sent();
                        return [2 /*return*/, new DirectoryEmitResult_1.DirectoryEmitResult(true, outputFilePaths)];
                    case 4:
                        writeTasks.push(fileSystemWrapper.writeFile(emitResult.filePath, emitResult.fileText));
                        outputFilePaths.push(emitResult.filePath);
                        _d.label = 5;
                    case 5:
                        _c = _b.next();
                        return [3 /*break*/, 2];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_4_1 = _d.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 9: return [4 /*yield*/, Promise.all(writeTasks)];
                    case 10:
                        _d.sent();
                        return [2 /*return*/, new DirectoryEmitResult_1.DirectoryEmitResult(false, outputFilePaths)];
                }
            });
        });
    };
    /**
     * Emits the files in the directory synchronously.
     *
     * Remarks: This might be very slow compared to the asynchronous version if there are a lot of files.
     * @param options - Options for emitting.
     */
    Directory.prototype.emitSync = function (options) {
        var e_5, _a;
        if (options === void 0) { options = {}; }
        var fileSystemWrapper = this.global.fileSystemWrapper;
        var outputFilePaths = [];
        try {
            for (var _b = tslib_1.__values(this._emitInternal(options)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var emitResult = _c.value;
                if (emitResult === false)
                    return new DirectoryEmitResult_1.DirectoryEmitResult(true, outputFilePaths);
                fileSystemWrapper.writeFileSync(emitResult.filePath, emitResult.fileText);
                outputFilePaths.push(emitResult.filePath);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return new DirectoryEmitResult_1.DirectoryEmitResult(false, outputFilePaths);
    };
    Directory.prototype._emitInternal = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var _a = options.emitOnlyDtsFiles, emitOnlyDtsFiles = _a === void 0 ? false : _a;
        var isJsFile = options.outDir == null ? undefined : /\.js$/i;
        var isMapFile = options.outDir == null ? undefined : /\.js\.map$/i;
        var isDtsFile = options.declarationDir == null && options.outDir == null ? undefined : /\.d\.ts$/i;
        var getStandardizedPath = function (path) { return path == null ? undefined : _this.global.fileSystemWrapper.getStandardizedAbsolutePath(path, _this.getPath()); };
        var getSubDirPath = function (path, dir) { return path == null ? undefined : utils_1.FileUtils.pathJoin(path, dir.getBaseName()); };
        var hasDeclarationDir = this.global.compilerOptions.get().declarationDir != null || options.declarationDir != null;
        return emitDirectory(this, getStandardizedPath(options.outDir), getStandardizedPath(options.declarationDir));
        function emitDirectory(directory, outDir, declarationDir) {
            var e_6, _a, e_7, _b, e_8, _c, _d, _e, sourceFile, output, _f, _g, outputFile, filePath, fileText, e_7_1, e_6_1, _h, _j, dir, e_8_1;
            return tslib_1.__generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        _k.trys.push([0, 12, 13, 14]);
                        _d = tslib_1.__values(directory.getSourceFiles()), _e = _d.next();
                        _k.label = 1;
                    case 1:
                        if (!!_e.done) return [3 /*break*/, 11];
                        sourceFile = _e.value;
                        output = sourceFile.getEmitOutput({ emitOnlyDtsFiles: emitOnlyDtsFiles });
                        if (!output.getEmitSkipped()) return [3 /*break*/, 3];
                        return [4 /*yield*/, false];
                    case 2:
                        _k.sent();
                        return [2 /*return*/];
                    case 3:
                        _k.trys.push([3, 8, 9, 10]);
                        _f = tslib_1.__values(output.getOutputFiles()), _g = _f.next();
                        _k.label = 4;
                    case 4:
                        if (!!_g.done) return [3 /*break*/, 7];
                        outputFile = _g.value;
                        filePath = outputFile.getFilePath();
                        fileText = outputFile.getWriteByteOrderMark() ? utils_1.FileUtils.getTextWithByteOrderMark(outputFile.getText()) : outputFile.getText();
                        if (outDir != null && (isJsFile.test(filePath) || isMapFile.test(filePath) || (!hasDeclarationDir && isDtsFile.test(filePath))))
                            filePath = utils_1.FileUtils.pathJoin(outDir, utils_1.FileUtils.getBaseName(filePath));
                        else if (declarationDir != null && isDtsFile.test(filePath))
                            filePath = utils_1.FileUtils.pathJoin(declarationDir, utils_1.FileUtils.getBaseName(filePath));
                        return [4 /*yield*/, { filePath: filePath, fileText: fileText }];
                    case 5:
                        _k.sent();
                        _k.label = 6;
                    case 6:
                        _g = _f.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_7_1 = _k.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_7) throw e_7.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        _e = _d.next();
                        return [3 /*break*/, 1];
                    case 11: return [3 /*break*/, 14];
                    case 12:
                        e_6_1 = _k.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 14];
                    case 13:
                        try {
                            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7 /*endfinally*/];
                    case 14:
                        _k.trys.push([14, 19, 20, 21]);
                        _h = tslib_1.__values(directory.getDirectories()), _j = _h.next();
                        _k.label = 15;
                    case 15:
                        if (!!_j.done) return [3 /*break*/, 18];
                        dir = _j.value;
                        return [5 /*yield**/, tslib_1.__values(emitDirectory(dir, getSubDirPath(outDir, dir), getSubDirPath(declarationDir, dir)))];
                    case 16:
                        _k.sent();
                        _k.label = 17;
                    case 17:
                        _j = _h.next();
                        return [3 /*break*/, 15];
                    case 18: return [3 /*break*/, 21];
                    case 19:
                        e_8_1 = _k.sent();
                        e_8 = { error: e_8_1 };
                        return [3 /*break*/, 21];
                    case 20:
                        try {
                            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                        }
                        finally { if (e_8) throw e_8.error; }
                        return [7 /*endfinally*/];
                    case 21: return [2 /*return*/];
                }
            });
        }
    };
    /**
     * Copies a directory to a new directory.
     * @param relativeOrAbsolutePath - The relative or absolute path to the new directory.
     * @param options - Options.
     * @returns The directory the copy was made to.
     */
    Directory.prototype.copy = function (relativeOrAbsolutePath, options) {
        var originalPath = this.getPath();
        var fileSystem = this.global.fileSystemWrapper;
        var newPath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(relativeOrAbsolutePath, this.getPath());
        if (originalPath === newPath)
            return this;
        options = getDirectoryCopyOptions(options);
        if (options.includeUntrackedFiles)
            fileSystem.queueCopyDirectory(originalPath, newPath);
        return this._copyInternal(newPath, options);
    };
    /**
     * Immediately copies the directory to the specified path asynchronously.
     * @param relativeOrAbsolutePath - Directory path as an absolute or relative path.
     * @param options - Options for moving the directory.
     * @remarks If includeTrackedFiles is true, then it will execute the pending operations in the current directory.
     */
    Directory.prototype.copyImmediately = function (relativeOrAbsolutePath, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fileSystem, originalPath, newPath, newDir;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileSystem = this.global.fileSystemWrapper;
                        originalPath = this.getPath();
                        newPath = fileSystem.getStandardizedAbsolutePath(relativeOrAbsolutePath, originalPath);
                        if (!(originalPath === newPath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                    case 2:
                        options = getDirectoryCopyOptions(options);
                        newDir = this._copyInternal(newPath, options);
                        if (!options.includeUntrackedFiles) return [3 /*break*/, 4];
                        return [4 /*yield*/, fileSystem.copyDirectoryImmediately(originalPath, newPath)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, newDir.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, newDir];
                }
            });
        });
    };
    /**
     * Immediately copies the directory to the specified path synchronously.
     * @param relativeOrAbsolutePath - Directory path as an absolute or relative path.
     * @param options - Options for moving the directory.
     * @remarks If includeTrackedFiles is true, then it will execute the pending operations in the current directory.
     */
    Directory.prototype.copyImmediatelySync = function (relativeOrAbsolutePath, options) {
        var fileSystem = this.global.fileSystemWrapper;
        var originalPath = this.getPath();
        var newPath = fileSystem.getStandardizedAbsolutePath(relativeOrAbsolutePath, originalPath);
        if (originalPath === newPath) {
            this.saveSync();
            return this;
        }
        options = getDirectoryCopyOptions(options);
        var newDir = this._copyInternal(newPath, options);
        if (options.includeUntrackedFiles)
            fileSystem.copyDirectoryImmediatelySync(originalPath, newPath);
        newDir.saveSync();
        return newDir;
    };
    /** @internal */
    Directory.prototype._copyInternal = function (newPath, options) {
        var e_9, _a, e_10, _b, e_11, _c;
        var _this = this;
        var originalPath = this.getPath();
        if (originalPath === newPath)
            return this;
        var fileSystem = this.global.fileSystemWrapper;
        var copyingDirectories = tslib_1.__spread([this], this.getDescendantDirectories()).map(function (directory) { return ({
            directory: directory,
            oldPath: directory.getPath(),
            newDirPath: directory === _this ? newPath : fileSystem.getStandardizedAbsolutePath(_this.getRelativePathTo(directory), newPath)
        }); });
        var copyingSourceFiles = this.getDescendantSourceFiles().map(function (sourceFile) { return ({
            sourceFile: sourceFile,
            newFilePath: fileSystem.getStandardizedAbsolutePath(_this.getRelativePathTo(sourceFile), newPath),
            references: _this._getReferencesForCopy(sourceFile)
        }); });
        try {
            // copy directories
            for (var copyingDirectories_1 = tslib_1.__values(copyingDirectories), copyingDirectories_1_1 = copyingDirectories_1.next(); !copyingDirectories_1_1.done; copyingDirectories_1_1 = copyingDirectories_1.next()) {
                var _d = copyingDirectories_1_1.value, directory = _d.directory, oldPath = _d.oldPath, newDirPath = _d.newDirPath;
                this.global.compilerFactory.createDirectoryOrAddIfExists(newDirPath);
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (copyingDirectories_1_1 && !copyingDirectories_1_1.done && (_a = copyingDirectories_1.return)) _a.call(copyingDirectories_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
        try {
            // copy source files
            for (var copyingSourceFiles_1 = tslib_1.__values(copyingSourceFiles), copyingSourceFiles_1_1 = copyingSourceFiles_1.next(); !copyingSourceFiles_1_1.done; copyingSourceFiles_1_1 = copyingSourceFiles_1.next()) {
                var _e = copyingSourceFiles_1_1.value, sourceFile = _e.sourceFile, newFilePath = _e.newFilePath;
                sourceFile._copyInternal(newFilePath, options);
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (copyingSourceFiles_1_1 && !copyingSourceFiles_1_1.done && (_b = copyingSourceFiles_1.return)) _b.call(copyingSourceFiles_1);
            }
            finally { if (e_10) throw e_10.error; }
        }
        try {
            // update the references
            for (var copyingSourceFiles_2 = tslib_1.__values(copyingSourceFiles), copyingSourceFiles_2_1 = copyingSourceFiles_2.next(); !copyingSourceFiles_2_1.done; copyingSourceFiles_2_1 = copyingSourceFiles_2.next()) {
                var _f = copyingSourceFiles_2_1.value, references = _f.references, newFilePath = _f.newFilePath;
                this.getSourceFileOrThrow(newFilePath)._updateReferencesForCopyInternal(references);
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (copyingSourceFiles_2_1 && !copyingSourceFiles_2_1.done && (_c = copyingSourceFiles_2.return)) _c.call(copyingSourceFiles_2);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return this.global.compilerFactory.getDirectoryFromCache(newPath);
    };
    /**
     * Moves the directory to a new path.
     * @param relativeOrAbsolutePath - Directory path as an absolute or relative path.
     * @param options - Options for moving the directory.
     */
    Directory.prototype.move = function (relativeOrAbsolutePath, options) {
        var fileSystem = this.global.fileSystemWrapper;
        var originalPath = this.getPath();
        var newPath = fileSystem.getStandardizedAbsolutePath(relativeOrAbsolutePath, originalPath);
        if (originalPath === newPath)
            return this;
        fileSystem.queueMoveDirectory(originalPath, newPath);
        return this._moveInternal(newPath, options);
    };
    /**
     * Immediately moves the directory to a new path asynchronously.
     * @param relativeOrAbsolutePath - Directory path as an absolute or relative path.
     * @param options - Options for moving the directory.
     */
    Directory.prototype.moveImmediately = function (relativeOrAbsolutePath, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fileSystem, originalPath, newPath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileSystem = this.global.fileSystemWrapper;
                        originalPath = this.getPath();
                        newPath = fileSystem.getStandardizedAbsolutePath(relativeOrAbsolutePath, originalPath);
                        if (!(originalPath === newPath)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                    case 2:
                        this._moveInternal(newPath, options);
                        return [4 /*yield*/, fileSystem.moveDirectoryImmediately(originalPath, newPath)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.save()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    /**
     * Immediately moves the directory to a new path synchronously.
     * @param relativeOrAbsolutePath - Directory path as an absolute or relative path.
     * @param options - Options for moving the directory.
     */
    Directory.prototype.moveImmediatelySync = function (relativeOrAbsolutePath, options) {
        var fileSystem = this.global.fileSystemWrapper;
        var originalPath = this.getPath();
        var newPath = fileSystem.getStandardizedAbsolutePath(relativeOrAbsolutePath, originalPath);
        if (originalPath === newPath) {
            this.saveSync();
            return this;
        }
        this._moveInternal(newPath, options);
        fileSystem.moveDirectoryImmediatelySync(originalPath, newPath);
        this.saveSync();
        return this;
    };
    /** @internal */
    Directory.prototype._moveInternal = function (newPath, options) {
        var e_12, _a, e_13, _b, e_14, _c;
        var _this = this;
        var originalPath = this.getPath();
        if (originalPath === newPath)
            return this;
        var fileSystem = this.global.fileSystemWrapper;
        var compilerFactory = this.global.compilerFactory;
        var movingDirectories = tslib_1.__spread([this], this.getDescendantDirectories()).map(function (directory) { return ({
            directory: directory,
            oldPath: directory.getPath(),
            newDirPath: directory === _this ? newPath : fileSystem.getStandardizedAbsolutePath(_this.getRelativePathTo(directory), newPath)
        }); });
        var movingSourceFiles = this.getDescendantSourceFiles().map(function (sourceFile) { return ({
            sourceFile: sourceFile,
            newFilePath: fileSystem.getStandardizedAbsolutePath(_this.getRelativePathTo(sourceFile), newPath),
            references: _this._getReferencesForMove(sourceFile)
        }); });
        try {
            // update directories
            for (var movingDirectories_1 = tslib_1.__values(movingDirectories), movingDirectories_1_1 = movingDirectories_1.next(); !movingDirectories_1_1.done; movingDirectories_1_1 = movingDirectories_1.next()) {
                var _d = movingDirectories_1_1.value, directory = _d.directory, oldPath = _d.oldPath, newDirPath = _d.newDirPath;
                compilerFactory.removeDirectoryFromCache(oldPath);
                var dirToOverwrite = compilerFactory.getDirectoryFromCache(newDirPath);
                if (dirToOverwrite != null)
                    dirToOverwrite._forgetOnlyThis();
                directory._setPathInternal(newDirPath);
                compilerFactory.addDirectoryToCache(directory);
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (movingDirectories_1_1 && !movingDirectories_1_1.done && (_a = movingDirectories_1.return)) _a.call(movingDirectories_1);
            }
            finally { if (e_12) throw e_12.error; }
        }
        try {
            // update source files
            for (var movingSourceFiles_1 = tslib_1.__values(movingSourceFiles), movingSourceFiles_1_1 = movingSourceFiles_1.next(); !movingSourceFiles_1_1.done; movingSourceFiles_1_1 = movingSourceFiles_1.next()) {
                var _e = movingSourceFiles_1_1.value, sourceFile = _e.sourceFile, newFilePath = _e.newFilePath;
                sourceFile._moveInternal(newFilePath, options);
            }
        }
        catch (e_13_1) { e_13 = { error: e_13_1 }; }
        finally {
            try {
                if (movingSourceFiles_1_1 && !movingSourceFiles_1_1.done && (_b = movingSourceFiles_1.return)) _b.call(movingSourceFiles_1);
            }
            finally { if (e_13) throw e_13.error; }
        }
        try {
            // update the references
            for (var movingSourceFiles_2 = tslib_1.__values(movingSourceFiles), movingSourceFiles_2_1 = movingSourceFiles_2.next(); !movingSourceFiles_2_1.done; movingSourceFiles_2_1 = movingSourceFiles_2.next()) {
                var _f = movingSourceFiles_2_1.value, sourceFile = _f.sourceFile, references = _f.references;
                sourceFile._updateReferencesForMoveInternal(references, originalPath);
            }
        }
        catch (e_14_1) { e_14 = { error: e_14_1 }; }
        finally {
            try {
                if (movingSourceFiles_2_1 && !movingSourceFiles_2_1.done && (_c = movingSourceFiles_2.return)) _c.call(movingSourceFiles_2);
            }
            finally { if (e_14) throw e_14.error; }
        }
        return this;
    };
    /**
     * Queues a deletion of the directory to the file system.
     *
     * The directory will be deleted when calling ast.save(). If you wish to delete the file immediately, then use deleteImmediately().
     */
    Directory.prototype.delete = function () {
        var e_15, _a, e_16, _b;
        var fileSystemWrapper = this.global.fileSystemWrapper;
        var path = this.getPath();
        try {
            for (var _c = tslib_1.__values(this.getSourceFiles()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var sourceFile = _d.value;
                sourceFile.delete();
            }
        }
        catch (e_15_1) { e_15 = { error: e_15_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_15) throw e_15.error; }
        }
        try {
            for (var _e = tslib_1.__values(this.getDirectories()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var dir = _f.value;
                dir.delete();
            }
        }
        catch (e_16_1) { e_16 = { error: e_16_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_16) throw e_16.error; }
        }
        fileSystemWrapper.queueDirectoryDelete(path);
        this.forget();
    };
    /**
     * Asyncronously deletes the directory and all its descendants from the file system.
     */
    Directory.prototype.deleteImmediately = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fileSystemWrapper, path;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileSystemWrapper = this.global.fileSystemWrapper;
                        path = this.getPath();
                        this.forget();
                        return [4 /*yield*/, fileSystemWrapper.deleteDirectoryImmediately(path)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously deletes the directory and all its descendants from the file system.
     */
    Directory.prototype.deleteImmediatelySync = function () {
        var fileSystemWrapper = this.global.fileSystemWrapper;
        var path = this.getPath();
        this.forget();
        fileSystemWrapper.deleteDirectoryImmediatelySync(path);
    };
    /**
     * Forgets the directory and all its descendants from the Project.
     *
     * Note: Does not delete the directory from the file system.
     */
    Directory.prototype.forget = function () {
        var e_17, _a, e_18, _b;
        if (this.wasForgotten())
            return;
        try {
            for (var _c = tslib_1.__values(this.getSourceFiles()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var sourceFile = _d.value;
                sourceFile.forget();
            }
        }
        catch (e_17_1) { e_17 = { error: e_17_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_17) throw e_17.error; }
        }
        try {
            for (var _e = tslib_1.__values(this.getDirectories()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var dir = _f.value;
                dir.forget();
            }
        }
        catch (e_18_1) { e_18 = { error: e_18_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_18) throw e_18.error; }
        }
        this._forgetOnlyThis();
    };
    /** @internal */
    Directory.prototype._forgetOnlyThis = function () {
        if (this.wasForgotten())
            return;
        this.global.compilerFactory.removeDirectoryFromCache(this.getPath());
        this._global = undefined;
    };
    /**
     * Asynchronously saves the directory and all the unsaved source files to the disk.
     */
    Directory.prototype.save = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var unsavedSourceFiles;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.global.fileSystemWrapper.saveForDirectory(this.getPath())];
                    case 1:
                        _a.sent();
                        unsavedSourceFiles = this.getDescendantSourceFiles().filter(function (s) { return !s.isSaved(); });
                        return [4 /*yield*/, Promise.all(unsavedSourceFiles.map(function (s) { return s.save(); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously saves the directory and all the unsaved source files to the disk.
     */
    Directory.prototype.saveSync = function () {
        this.global.fileSystemWrapper.saveForDirectorySync(this.getPath());
        var unsavedSourceFiles = this.getDescendantSourceFiles().filter(function (s) { return !s.isSaved(); });
        unsavedSourceFiles.forEach(function (s) { return s.saveSync(); });
    };
    Directory.prototype.getRelativePathTo = function (sourceFileOrDir) {
        return utils_1.FileUtils.getRelativePathTo(this.getPath(), getPath());
        function getPath() {
            return sourceFileOrDir instanceof compiler_1.SourceFile ? sourceFileOrDir.getFilePath() : sourceFileOrDir.getPath();
        }
    };
    Directory.prototype.getRelativePathAsModuleSpecifierTo = function (sourceFileOrDir) {
        var moduleResolution = this.global.program.getEmitModuleResolutionKind();
        var thisDirectory = this;
        var moduleSpecifier = utils_1.FileUtils.getRelativePathTo(this.getPath(), getPath()).replace(/((\.d\.ts$)|(\.[^/.]+$))/i, "");
        return utils_1.StringUtils.startsWith(moduleSpecifier, "../") ? moduleSpecifier : "./" + moduleSpecifier;
        function getPath() {
            return sourceFileOrDir instanceof compiler_1.SourceFile ? getPathForSourceFile(sourceFileOrDir) : getPathForDirectory(sourceFileOrDir);
            function getPathForSourceFile(sourceFile) {
                switch (moduleResolution) {
                    case typescript_1.ModuleResolutionKind.NodeJs:
                        var filePath = sourceFile.getFilePath();
                        if (sourceFile.getDirectory() === thisDirectory)
                            return filePath;
                        return filePath.replace(/\/index?(\.d\.ts|\.ts|\.js)$/i, "");
                    case typescript_1.ModuleResolutionKind.Classic:
                        return sourceFile.getFilePath();
                    default:
                        throw errors.getNotImplementedForNeverValueError(moduleResolution);
                }
            }
            function getPathForDirectory(dir) {
                switch (moduleResolution) {
                    case typescript_1.ModuleResolutionKind.NodeJs:
                        if (dir === thisDirectory)
                            return utils_1.FileUtils.pathJoin(dir.getPath(), "index.ts");
                        return dir.getPath();
                    case typescript_1.ModuleResolutionKind.Classic:
                        return utils_1.FileUtils.pathJoin(dir.getPath(), "index.ts");
                    default:
                        throw errors.getNotImplementedForNeverValueError(moduleResolution);
                }
            }
        }
    };
    /**
     * Gets if the directory was forgotten.
     */
    Directory.prototype.wasForgotten = function () {
        return this._global == null;
    };
    /** @internal */
    Directory.prototype._hasLoadedParent = function () {
        return this.global.compilerFactory.containsDirectoryAtPath(utils_1.FileUtils.getDirPath(this.getPath()));
    };
    /** @internal */
    Directory.prototype._throwIfDeletedOrRemoved = function () {
        if (this.wasForgotten())
            throw new errors.InvalidOperationError("Cannot use a directory that was deleted, removed, or overwritten.");
    };
    /** @internal */
    Directory.prototype._getReferencesForCopy = function (sourceFile) {
        var _this = this;
        var literalReferences = sourceFile._getReferencesForCopyInternal();
        return literalReferences.filter(function (r) { return !_this.isAncestorOf(r[1]); });
    };
    /** @internal */
    Directory.prototype._getReferencesForMove = function (sourceFile) {
        var _this = this;
        var _a = sourceFile._getReferencesForMoveInternal(), literalReferences = _a.literalReferences, referencingLiterals = _a.referencingLiterals;
        return {
            literalReferences: literalReferences.filter(function (r) { return !_this.isAncestorOf(r[1]); }),
            referencingLiterals: referencingLiterals.filter(function (l) { return !_this.isAncestorOf(l.sourceFile); })
        };
    };
    /** @internal */
    Directory.isAncestorOfDir = function (ancestor, descendant) {
        if (descendant instanceof compiler_1.SourceFile) {
            descendant = descendant.getDirectory();
            if (ancestor === descendant)
                return true;
        }
        if (ancestor._pathParts.length >= descendant._pathParts.length)
            return false;
        // more likely to be a mistake at the end, so search backwards
        for (var i = ancestor._pathParts.length - 1; i >= 0; i--) {
            if (ancestor._pathParts[i] !== descendant._pathParts[i])
                return false;
        }
        return true;
    };
    return Directory;
}());
exports.Directory = Directory;
function getDirectoryCopyOptions(options) {
    options = utils_1.ObjectUtils.clone(options || {});
    utils_1.setValueIfUndefined(options, "includeUntrackedFiles", true);
    return options;
}
