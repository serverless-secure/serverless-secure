"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("./errors");
var fileSystem_1 = require("./fileSystem");
var GlobalContainer_1 = require("./GlobalContainer");
var utils_1 = require("./utils");
/**
 * Project that holds source files.
 */
var Project = /** @class */ (function () {
    /**
     * Initializes a new instance.
     * @param options - Optional options.
     * @param fileSystem - Optional file system host. Useful for mocking access to the file system.
     */
    function Project(options, fileSystem) {
        if (options === void 0) { options = {}; }
        // setup file system
        if (fileSystem != null && options.useVirtualFileSystem)
            throw new errors.InvalidOperationError("Cannot provide a file system when specifying to use a virtual file system.");
        else if (options.useVirtualFileSystem)
            fileSystem = new fileSystem_1.VirtualFileSystemHost();
        else if (fileSystem == null)
            fileSystem = new fileSystem_1.DefaultFileSystemHost();
        var fileSystemWrapper = new fileSystem_1.FileSystemWrapper(fileSystem);
        // get tsconfig info
        var tsConfigResolver = options.tsConfigFilePath == null ? undefined : new utils_1.TsConfigResolver(fileSystemWrapper, options.tsConfigFilePath, getEncoding());
        var compilerOptions = getCompilerOptions();
        // setup global container
        this.global = new GlobalContainer_1.GlobalContainer(fileSystemWrapper, compilerOptions, { createLanguageService: true });
        // initialize manipulation settings
        if (options.manipulationSettings != null)
            this.global.manipulationSettings.set(options.manipulationSettings);
        // add any file paths from the tsconfig if necessary
        if (tsConfigResolver != null && options.addFilesFromTsConfig !== false)
            this._addSourceFilesForTsConfigResolver(tsConfigResolver, compilerOptions, {});
        function getCompilerOptions() {
            return tslib_1.__assign({}, getTsConfigCompilerOptions(), (options.compilerOptions || {}));
        }
        function getTsConfigCompilerOptions() {
            if (tsConfigResolver == null)
                return {};
            return tsConfigResolver.getCompilerOptions();
        }
        function getEncoding() {
            var defaultEncoding = "utf-8";
            if (options.compilerOptions != null)
                return options.compilerOptions.charset || defaultEncoding;
            return defaultEncoding;
        }
    }
    Object.defineProperty(Project.prototype, "manipulationSettings", {
        /** Gets the manipulation settings. */
        get: function () {
            return this.global.manipulationSettings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Project.prototype, "compilerOptions", {
        /** Gets the compiler options for modification. */
        get: function () {
            return this.global.compilerOptions;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds an existing directory from the path or returns undefined if it doesn't exist.
     *
     * Will return the directory if it was already added.
     * @param dirPath - Path to add the directory at.
     * @param options - Options.
     */
    Project.prototype.addExistingDirectoryIfExists = function (dirPath, options) {
        if (options === void 0) { options = {}; }
        dirPath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(dirPath);
        return this.global.directoryCoordinator.addExistingDirectoryIfExists(dirPath, options);
    };
    /**
     * Adds an existing directory from the path or throws if it doesn't exist.
     *
     * Will return the directory if it was already added.
     * @param dirPath - Path to add the directory at.
     * @param options - Options.
     * @throws DirectoryNotFoundError when the directory does not exist.
     */
    Project.prototype.addExistingDirectory = function (dirPath, options) {
        if (options === void 0) { options = {}; }
        dirPath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(dirPath);
        return this.global.directoryCoordinator.addExistingDirectory(dirPath, options);
    };
    /**
     * Creates a directory at the specified path.
     * @param dirPath - Path to create the directory at.
     */
    Project.prototype.createDirectory = function (dirPath) {
        dirPath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(dirPath);
        return this.global.directoryCoordinator.createDirectoryOrAddIfExists(dirPath);
    };
    /**
     * Gets a directory by the specified path or throws if it doesn't exist.
     * @param dirPath - Path to create the directory at.
     */
    Project.prototype.getDirectoryOrThrow = function (dirPath) {
        var _this = this;
        return errors.throwIfNullOrUndefined(this.getDirectory(dirPath), function () { return "Could not find a directory at the specified path: " + _this.global.fileSystemWrapper.getStandardizedAbsolutePath(dirPath); });
    };
    /**
     * Gets a directory by the specified path or returns undefined if it doesn't exist.
     * @param dirPath - Directory path.
     */
    Project.prototype.getDirectory = function (dirPath) {
        dirPath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(dirPath);
        return this.global.compilerFactory.getDirectoryFromCache(dirPath);
    };
    /**
     * Gets all the directories.
     */
    Project.prototype.getDirectories = function () {
        return utils_1.ArrayUtils.from(this.global.compilerFactory.getDirectoriesByDepth());
    };
    /**
     * Gets the directories without a parent.
     */
    Project.prototype.getRootDirectories = function () {
        return this.global.compilerFactory.getOrphanDirectories();
    };
    Project.prototype.addExistingSourceFiles = function (fileGlobs, options) {
        var e_1, _a, e_2, _b;
        if (typeof fileGlobs === "string")
            fileGlobs = [fileGlobs];
        var sourceFiles = [];
        var globbedDirectories = utils_1.FileUtils.getParentMostPaths(fileGlobs.filter(function (g) { return !utils_1.FileUtils.isNegatedGlob(g); }).map(function (g) { return utils_1.FileUtils.getGlobDir(g); }));
        try {
            for (var _c = tslib_1.__values(this.global.fileSystemWrapper.glob(fileGlobs)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var filePath = _d.value;
                var sourceFile = this.addExistingSourceFileIfExists(filePath, options);
                if (sourceFile != null)
                    sourceFiles.push(sourceFile);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var globbedDirectories_1 = tslib_1.__values(globbedDirectories), globbedDirectories_1_1 = globbedDirectories_1.next(); !globbedDirectories_1_1.done; globbedDirectories_1_1 = globbedDirectories_1.next()) {
                var dirPath = globbedDirectories_1_1.value;
                this.addExistingDirectoryIfExists(dirPath, { recursive: true });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (globbedDirectories_1_1 && !globbedDirectories_1_1.done && (_b = globbedDirectories_1.return)) _b.call(globbedDirectories_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return sourceFiles;
    };
    /**
     * Adds a source file from a file path if it exists or returns undefined.
     *
     * Will return the source file if it was already added.
     * @param filePath - File path to get the file from.
     * @param options - Options for adding the source file.
     */
    Project.prototype.addExistingSourceFileIfExists = function (filePath, options) {
        return this.global.compilerFactory.addOrGetSourceFileFromFilePath(filePath, options || {});
    };
    /**
     * Adds an existing source file from a file path or throws if it doesn't exist.
     *
     * Will return the source file if it was already added.
     * @param filePath - File path to get the file from.
     * @param options - Options for adding the source file.
     * @throws FileNotFoundError when the file is not found.
     */
    Project.prototype.addExistingSourceFile = function (filePath, options) {
        var sourceFile = this.addExistingSourceFileIfExists(filePath, options);
        if (sourceFile == null) {
            var absoluteFilePath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(filePath);
            throw new errors.FileNotFoundError(absoluteFilePath);
        }
        return sourceFile;
    };
    /**
     * Adds all the source files from the specified tsconfig.json.
     *
     * Note that this is done by default when specifying a tsconfig file in the constructor and not explicitly setting the
     * addFilesFromTsConfig option to false.
     * @param tsConfigFilePath - File path to the tsconfig.json file.
     * @param options - Options for adding the source file.
     */
    Project.prototype.addSourceFilesFromTsConfig = function (tsConfigFilePath, options) {
        if (options === void 0) { options = {}; }
        tsConfigFilePath = this.global.fileSystemWrapper.getStandardizedAbsolutePath(tsConfigFilePath);
        var resolver = new utils_1.TsConfigResolver(this.global.fileSystemWrapper, tsConfigFilePath, this.global.getEncoding());
        return this._addSourceFilesForTsConfigResolver(resolver, resolver.getCompilerOptions(), options);
    };
    /** @internal */
    Project.prototype._addSourceFilesForTsConfigResolver = function (tsConfigResolver, compilerOptions, addOptions) {
        var e_3, _a;
        var _this = this;
        var paths = tsConfigResolver.getPaths(compilerOptions);
        if (addOptions.languageVersion == null && compilerOptions.target != null)
            addOptions.languageVersion = compilerOptions.target;
        var addedSourceFiles = paths.filePaths.map(function (p) { return _this.addExistingSourceFile(p, addOptions); });
        try {
            for (var _b = tslib_1.__values(paths.directoryPaths), _c = _b.next(); !_c.done; _c = _b.next()) {
                var dirPath = _c.value;
                this.addExistingDirectoryIfExists(dirPath);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return addedSourceFiles;
    };
    Project.prototype.createSourceFile = function (filePath, structureOrText, options) {
        return this.global.compilerFactory.createSourceFile(filePath, structureOrText || "", options || {});
    };
    /**
     * Removes a source file from the AST.
     * @param sourceFile - Source file to remove.
     * @returns True if removed.
     */
    Project.prototype.removeSourceFile = function (sourceFile) {
        var previouslyForgotten = sourceFile.wasForgotten();
        sourceFile.forget();
        return !previouslyForgotten;
    };
    Project.prototype.getSourceFileOrThrow = function (fileNameOrSearchFunction) {
        var sourceFile = this.getSourceFile(fileNameOrSearchFunction);
        if (sourceFile == null) {
            var filePathOrSearchFunction = getFilePathOrSearchFunction(this.global.fileSystemWrapper, fileNameOrSearchFunction);
            if (typeof filePathOrSearchFunction === "string")
                throw new errors.InvalidOperationError("Could not find source file based on the provided name or path: " + filePathOrSearchFunction + ".");
            else
                throw new errors.InvalidOperationError("Could not find source file based on the provided condition.");
        }
        return sourceFile;
    };
    Project.prototype.getSourceFile = function (fileNameOrSearchFunction) {
        var filePathOrSearchFunction = getFilePathOrSearchFunction(this.global.fileSystemWrapper, fileNameOrSearchFunction);
        if (typeof filePathOrSearchFunction === "string")
            return this.global.compilerFactory.getSourceFileFromCacheFromFilePath(filePathOrSearchFunction);
        return utils_1.ArrayUtils.find(this.global.compilerFactory.getSourceFilesByDirectoryDepth(), filePathOrSearchFunction);
    };
    Project.prototype.getSourceFiles = function (globPatterns) {
        var _a = this.global, compilerFactory = _a.compilerFactory, fileSystemWrapper = _a.fileSystemWrapper;
        var sourceFiles = this.global.compilerFactory.getSourceFilesByDirectoryDepth();
        if (typeof globPatterns === "string" || globPatterns instanceof Array)
            return utils_1.ArrayUtils.from(getFilteredSourceFiles());
        else
            return utils_1.ArrayUtils.from(sourceFiles);
        function getFilteredSourceFiles() {
            function getSourceFilePaths() {
                var e_5, _a, sourceFiles_1, sourceFiles_1_1, sourceFile, e_5_1;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 5, 6, 7]);
                            sourceFiles_1 = tslib_1.__values(sourceFiles), sourceFiles_1_1 = sourceFiles_1.next();
                            _b.label = 1;
                        case 1:
                            if (!!sourceFiles_1_1.done) return [3 /*break*/, 4];
                            sourceFile = sourceFiles_1_1.value;
                            return [4 /*yield*/, sourceFile.getFilePath()];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            sourceFiles_1_1 = sourceFiles_1.next();
                            return [3 /*break*/, 1];
                        case 4: return [3 /*break*/, 7];
                        case 5:
                            e_5_1 = _b.sent();
                            e_5 = { error: e_5_1 };
                            return [3 /*break*/, 7];
                        case 6:
                            try {
                                if (sourceFiles_1_1 && !sourceFiles_1_1.done && (_a = sourceFiles_1.return)) _a.call(sourceFiles_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                            return [7 /*endfinally*/];
                        case 7: return [2 /*return*/];
                    }
                });
            }
            var e_4, _a, sourceFilePaths, matchedPaths, matchedPaths_1, matchedPaths_1_1, matchedPath, e_4_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sourceFilePaths = Array.from(getSourceFilePaths());
                        matchedPaths = utils_1.matchGlobs(sourceFilePaths, globPatterns, fileSystemWrapper.getCurrentDirectory());
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        matchedPaths_1 = tslib_1.__values(matchedPaths), matchedPaths_1_1 = matchedPaths_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!matchedPaths_1_1.done) return [3 /*break*/, 5];
                        matchedPath = matchedPaths_1_1.value;
                        return [4 /*yield*/, compilerFactory.getSourceFileFromCacheFromFilePath(matchedPath)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        matchedPaths_1_1 = matchedPaths_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_4_1 = _b.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (matchedPaths_1_1 && !matchedPaths_1_1.done && (_a = matchedPaths_1.return)) _a.call(matchedPaths_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        }
    };
    /**
     * Saves all the unsaved source files to the file system and deletes all deleted files.
     */
    Project.prototype.save = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.global.fileSystemWrapper.flush()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Promise.all(this.getUnsavedSourceFiles().map(function (f) { return f.save(); }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Synchronously saves all the unsaved source files to the file system and deletes all deleted files.
     *
     * Remarks: This might be very slow compared to the asynchronous version if there are a lot of files.
     */
    Project.prototype.saveSync = function () {
        var e_6, _a;
        this.global.fileSystemWrapper.flushSync();
        try {
            // sidenote: I wish I could do something like in c# where I do this all asynchronously then
            // wait synchronously on the task. It would not be as bad as this is performance wise. Maybe there
            // is a way, but people just shouldn't be using this method unless they're really lazy.
            for (var _b = tslib_1.__values(this.getUnsavedSourceFiles()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var file = _c.value;
                file.saveSync();
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_6) throw e_6.error; }
        }
    };
    /**
     * Enables logging to the console.
     * @param enabled - Enabled.
     */
    Project.prototype.enableLogging = function (enabled) {
        if (enabled === void 0) { enabled = true; }
        this.global.logger.setEnabled(enabled);
    };
    Project.prototype.getUnsavedSourceFiles = function () {
        return utils_1.ArrayUtils.from(getUnsavedIterator(this.global.compilerFactory.getSourceFilesByDirectoryDepth()));
        function getUnsavedIterator(sourceFiles) {
            var e_7, _a, sourceFiles_2, sourceFiles_2_1, sourceFile, e_7_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        sourceFiles_2 = tslib_1.__values(sourceFiles), sourceFiles_2_1 = sourceFiles_2.next();
                        _b.label = 1;
                    case 1:
                        if (!!sourceFiles_2_1.done) return [3 /*break*/, 4];
                        sourceFile = sourceFiles_2_1.value;
                        if (!!sourceFile.isSaved()) return [3 /*break*/, 3];
                        return [4 /*yield*/, sourceFile];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        sourceFiles_2_1 = sourceFiles_2.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_7_1 = _b.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (sourceFiles_2_1 && !sourceFiles_2_1.done && (_a = sourceFiles_2.return)) _a.call(sourceFiles_2);
                        }
                        finally { if (e_7) throw e_7.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }
    };
    /**
     * Gets the compiler diagnostics.
     */
    Project.prototype.getDiagnostics = function () {
        return tslib_1.__spread(this.global.program.getSyntacticDiagnostics(), this.global.program.getSemanticDiagnostics(), this.global.program.getDeclarationDiagnostics());
    };
    /**
     * Gets the pre-emit diagnostics.
     */
    Project.prototype.getPreEmitDiagnostics = function () {
        return this.global.program.getPreEmitDiagnostics();
    };
    /**
     * Gets the language service.
     */
    Project.prototype.getLanguageService = function () {
        return this.global.languageService;
    };
    /**
     * Gets the program.
     */
    Project.prototype.getProgram = function () {
        return this.global.program;
    };
    /**
     * Gets the type checker.
     */
    Project.prototype.getTypeChecker = function () {
        return this.global.typeChecker;
    };
    /**
     * Gets the file system.
     */
    Project.prototype.getFileSystem = function () {
        return this.global.fileSystemWrapper.getFileSystem();
    };
    /**
     * Emits all the source files.
     * @param emitOptions - Optional emit options.
     */
    Project.prototype.emit = function (emitOptions) {
        if (emitOptions === void 0) { emitOptions = {}; }
        return this.global.program.emit(emitOptions);
    };
    /**
     * Gets the compiler options.
     */
    Project.prototype.getCompilerOptions = function () {
        return this.global.compilerOptions.get();
    };
    /**
     * Creates a writer with the current manipulation settings.
     * @remarks Generally it's best to use a provided writer, but this may be useful in some scenarios.
     */
    Project.prototype.createWriter = function () {
        return this.global.createWriter();
    };
    Project.prototype.forgetNodesCreatedInBlock = function (block) {
        return this.global.compilerFactory.forgetNodesCreatedInBlock(block);
    };
    return Project;
}());
exports.Project = Project;
function getFilePathOrSearchFunction(fileSystemWrapper, fileNameOrSearchFunction) {
    if (fileNameOrSearchFunction instanceof Function)
        return fileNameOrSearchFunction;
    var fileNameOrPath = utils_1.FileUtils.standardizeSlashes(fileNameOrSearchFunction);
    if (utils_1.FileUtils.pathIsAbsolute(fileNameOrPath) || fileNameOrPath.indexOf("/") >= 0)
        return fileSystemWrapper.getStandardizedAbsolutePath(fileNameOrPath);
    else
        return function (def) { return utils_1.FileUtils.pathEndsWith(def.getFilePath(), fileNameOrPath); };
}
