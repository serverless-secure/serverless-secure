"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Directory_1 = require("../fileSystem/Directory");
var utils_1 = require("../utils");
/**
 * Cache for the directories.
 * @internal
 */
var DirectoryCache = /** @class */ (function () {
    function DirectoryCache(global) {
        this.global = global;
        this.directoriesByPath = new utils_1.KeyValueCache();
        this.sourceFilesByDirPath = new utils_1.KeyValueCache();
        this.directoriesByDirPath = new utils_1.KeyValueCache();
        this.orphanDirs = new utils_1.KeyValueCache();
    }
    DirectoryCache.prototype.has = function (dirPath) {
        return this.directoriesByPath.has(dirPath);
    };
    DirectoryCache.prototype.get = function (dirPath) {
        var e_1, _a;
        if (!this.directoriesByPath.has(dirPath)) {
            try {
                for (var _b = tslib_1.__values(this.orphanDirs.getValues()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var orphanDir = _c.value;
                    if (utils_1.FileUtils.pathStartsWith(orphanDir.getPath(), dirPath))
                        return this.createOrAddIfExists(dirPath);
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
        return this.directoriesByPath.get(dirPath);
    };
    DirectoryCache.prototype.getOrphans = function () {
        return this.orphanDirs.getValuesAsArray();
    };
    DirectoryCache.prototype.getAll = function () {
        return this.directoriesByPath.getValuesAsArray();
    };
    DirectoryCache.prototype.getAllByDepth = function () {
        function addToDirLevels(dir) {
            var dirDepth = dir.getDepth();
            /* istanbul ignore if */
            if (depth > dirDepth)
                throw new Error("For some reason a subdirectory had a lower depth than the parent directory: " + dir.getPath());
            var dirs = dirLevels.getOrCreate(dirDepth, function () { return []; });
            dirs.push(dir);
        }
        var e_2, _a, dirLevels, depth, _b, _c, dir, e_2_1;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    dirLevels = new utils_1.KeyValueCache();
                    depth = 0;
                    this.getOrphans().forEach(addToDirLevels);
                    depth = Math.min.apply(Math, tslib_1.__spread(utils_1.ArrayUtils.from(dirLevels.getKeys())));
                    _d.label = 1;
                case 1:
                    if (!(dirLevels.getSize() > 0)) return [3 /*break*/, 10];
                    _d.label = 2;
                case 2:
                    _d.trys.push([2, 7, 8, 9]);
                    _b = tslib_1.__values(dirLevels.get(depth) || []), _c = _b.next();
                    _d.label = 3;
                case 3:
                    if (!!_c.done) return [3 /*break*/, 6];
                    dir = _c.value;
                    return [4 /*yield*/, dir];
                case 4:
                    _d.sent();
                    dir.getDirectories().forEach(addToDirLevels);
                    _d.label = 5;
                case 5:
                    _c = _b.next();
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 9];
                case 7:
                    e_2_1 = _d.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 9];
                case 8:
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                    return [7 /*endfinally*/];
                case 9:
                    dirLevels.removeByKey(depth);
                    depth++;
                    return [3 /*break*/, 1];
                case 10: return [2 /*return*/];
            }
        });
    };
    DirectoryCache.prototype.remove = function (dirPath) {
        this.removeFromDirectoriesByDirPath(dirPath);
        this.directoriesByPath.removeByKey(dirPath);
        this.orphanDirs.removeByKey(dirPath);
    };
    DirectoryCache.prototype.getChildDirectoriesOfDirectory = function (dirPath) {
        var directories = this.directoriesByDirPath.get(dirPath);
        if (directories == null)
            return [];
        return tslib_1.__spread(directories);
    };
    DirectoryCache.prototype.getChildSourceFilesOfDirectory = function (dirPath) {
        var sourceFiles = this.sourceFilesByDirPath.get(dirPath);
        if (sourceFiles == null)
            return [];
        return tslib_1.__spread(sourceFiles);
    };
    DirectoryCache.prototype.addSourceFile = function (sourceFile) {
        var dirPath = sourceFile.getDirectoryPath();
        this.createOrAddIfExists(dirPath);
        var sourceFiles = this.sourceFilesByDirPath.getOrCreate(dirPath, function () { return []; });
        var baseName = sourceFile.getBaseName().toUpperCase();
        utils_1.ArrayUtils.binaryInsert(sourceFiles, sourceFile, function (item) { return item.getBaseName().toUpperCase() > baseName; });
    };
    DirectoryCache.prototype.removeSourceFile = function (filePath) {
        var dirPath = utils_1.FileUtils.getDirPath(filePath);
        var sourceFiles = this.sourceFilesByDirPath.get(dirPath);
        if (sourceFiles == null)
            return;
        var baseName = utils_1.FileUtils.getBaseName(filePath).toUpperCase();
        var index = utils_1.ArrayUtils.binarySearch(sourceFiles, function (item) { return item.getFilePath() === filePath; }, function (item) { return item.getBaseName().toUpperCase() > baseName; });
        if (index >= 0)
            sourceFiles.splice(index, 1);
        // clean up
        if (sourceFiles.length === 0)
            this.sourceFilesByDirPath.removeByKey(dirPath);
    };
    DirectoryCache.prototype.createOrAddIfExists = function (dirPath) {
        if (this.has(dirPath))
            return this.get(dirPath);
        this.fillParentsOfDirPath(dirPath);
        return this.createDirectory(dirPath);
    };
    DirectoryCache.prototype.createDirectory = function (path) {
        var newDirectory = new Directory_1.Directory(this.global, path);
        this.addDirectory(newDirectory);
        return newDirectory;
    };
    DirectoryCache.prototype.addDirectory = function (directory) {
        var e_3, _a, e_4, _b;
        var path = directory.getPath();
        var parentDirPath = utils_1.FileUtils.getDirPath(path);
        var isRootDir = parentDirPath === path;
        try {
            // remove any orphans that have a loaded parent
            for (var _c = tslib_1.__values(this.orphanDirs.getValues()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var orphanDir = _d.value;
                var orphanDirPath = orphanDir.getPath();
                var orphanDirParentPath = utils_1.FileUtils.getDirPath(orphanDirPath);
                var isOrphanRootDir = orphanDirParentPath === orphanDirPath;
                if (!isOrphanRootDir && orphanDirParentPath === path)
                    this.orphanDirs.removeByKey(orphanDirPath);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (!isRootDir)
            this.addToDirectoriesByDirPath(directory);
        if (!this.has(parentDirPath))
            this.orphanDirs.set(path, directory);
        this.directoriesByPath.set(path, directory);
        if (!this.global.fileSystemWrapper.directoryExistsSync(path))
            this.global.fileSystemWrapper.queueMkdir(path);
        try {
            for (var _e = tslib_1.__values(this.orphanDirs.getValues()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var orphanDir = _f.value;
                if (directory.isAncestorOf(orphanDir))
                    this.fillParentsOfDirPath(orphanDir.getPath());
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_4) throw e_4.error; }
        }
    };
    DirectoryCache.prototype.addToDirectoriesByDirPath = function (directory) {
        if (utils_1.FileUtils.isRootDirPath(directory.getPath()))
            return;
        var parentDirPath = utils_1.FileUtils.getDirPath(directory.getPath());
        var directories = this.directoriesByDirPath.getOrCreate(parentDirPath, function () { return []; });
        var baseName = directory.getBaseName().toUpperCase();
        utils_1.ArrayUtils.binaryInsert(directories, directory, function (item) { return item.getBaseName().toUpperCase() > baseName; });
    };
    DirectoryCache.prototype.removeFromDirectoriesByDirPath = function (dirPath) {
        if (utils_1.FileUtils.isRootDirPath(dirPath))
            return;
        var parentDirPath = utils_1.FileUtils.getDirPath(dirPath);
        var directories = this.directoriesByDirPath.get(parentDirPath);
        if (directories == null)
            return;
        var baseName = utils_1.FileUtils.getBaseName(dirPath).toUpperCase();
        var index = utils_1.ArrayUtils.binarySearch(directories, function (item) { return item.getPath() === dirPath; }, function (item) { return item.getBaseName().toUpperCase() > baseName; });
        if (index >= 0)
            directories.splice(index, 1);
        // clean up
        if (directories.length === 0)
            this.directoriesByDirPath.removeByKey(parentDirPath);
    };
    DirectoryCache.prototype.fillParentsOfDirPath = function (dirPath) {
        var e_5, _a;
        var passedDirPaths = [];
        var dir = dirPath;
        var parentDir = utils_1.FileUtils.getDirPath(dir);
        while (dir !== parentDir) {
            dir = parentDir;
            parentDir = utils_1.FileUtils.getDirPath(dir);
            if (this.directoriesByPath.has(dir)) {
                try {
                    for (var passedDirPaths_1 = tslib_1.__values(passedDirPaths), passedDirPaths_1_1 = passedDirPaths_1.next(); !passedDirPaths_1_1.done; passedDirPaths_1_1 = passedDirPaths_1.next()) {
                        var currentDirPath = passedDirPaths_1_1.value;
                        this.createDirectory(currentDirPath);
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (passedDirPaths_1_1 && !passedDirPaths_1_1.done && (_a = passedDirPaths_1.return)) _a.call(passedDirPaths_1);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                break;
            }
            passedDirPaths.unshift(dir);
        }
    };
    return DirectoryCache;
}());
exports.DirectoryCache = DirectoryCache;
