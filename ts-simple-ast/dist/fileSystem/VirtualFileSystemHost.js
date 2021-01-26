"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../errors");
var utils_1 = require("../utils");
var VirtualFileSystemHost = /** @class */ (function () {
    function VirtualFileSystemHost() {
        this.directories = new utils_1.KeyValueCache();
        this.getOrCreateDir("/");
    }
    VirtualFileSystemHost.prototype.delete = function (path) {
        try {
            this.deleteSync(path);
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    VirtualFileSystemHost.prototype.deleteSync = function (path) {
        var e_1, _a;
        path = utils_1.FileUtils.getStandardizedAbsolutePath(this, path);
        if (this.directories.has(path)) {
            try {
                // remove descendant dirs
                for (var _b = tslib_1.__values(getDescendantDirectories(this.directories.getKeys(), path)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var descendantDirPath = _c.value;
                    this.directories.removeByKey(descendantDirPath);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // remove this dir
            this.directories.removeByKey(path);
            return;
        }
        var parentDir = this.directories.get(utils_1.FileUtils.getDirPath(path));
        if (parentDir == null || !parentDir.files.has(path))
            throw new errors.FileNotFoundError(path);
        parentDir.files.removeByKey(path);
    };
    VirtualFileSystemHost.prototype.readDirSync = function (dirPath) {
        dirPath = utils_1.FileUtils.getStandardizedAbsolutePath(this, dirPath);
        var dir = this.directories.get(dirPath);
        if (dir == null)
            throw new errors.DirectoryNotFoundError(dirPath);
        return tslib_1.__spread(getDirectories(this.directories.getKeys()), dir.files.getKeys());
        function getDirectories(dirPaths) {
            var e_2, _a, dirPaths_1, dirPaths_1_1, path, parentDir, e_2_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        dirPaths_1 = tslib_1.__values(dirPaths), dirPaths_1_1 = dirPaths_1.next();
                        _b.label = 1;
                    case 1:
                        if (!!dirPaths_1_1.done) return [3 /*break*/, 4];
                        path = dirPaths_1_1.value;
                        parentDir = utils_1.FileUtils.getDirPath(path);
                        if (!(parentDir === dirPath && parentDir !== path)) return [3 /*break*/, 3];
                        return [4 /*yield*/, path];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        dirPaths_1_1 = dirPaths_1.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (dirPaths_1_1 && !dirPaths_1_1.done && (_a = dirPaths_1.return)) _a.call(dirPaths_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }
    };
    VirtualFileSystemHost.prototype.readFile = function (filePath, encoding) {
        if (encoding === void 0) { encoding = "utf-8"; }
        try {
            return Promise.resolve(this.readFileSync(filePath, encoding));
        }
        catch (err) {
            return Promise.reject(err);
        }
    };
    VirtualFileSystemHost.prototype.readFileSync = function (filePath, encoding) {
        if (encoding === void 0) { encoding = "utf-8"; }
        filePath = utils_1.FileUtils.getStandardizedAbsolutePath(this, filePath);
        var parentDir = this.directories.get(utils_1.FileUtils.getDirPath(filePath));
        if (parentDir == null)
            throw new errors.FileNotFoundError(filePath);
        var fileText = parentDir.files.get(filePath);
        if (fileText === undefined)
            throw new errors.FileNotFoundError(filePath);
        return fileText;
    };
    VirtualFileSystemHost.prototype.writeFile = function (filePath, fileText) {
        this.writeFileSync(filePath, fileText);
        return Promise.resolve();
    };
    VirtualFileSystemHost.prototype.writeFileSync = function (filePath, fileText) {
        filePath = utils_1.FileUtils.getStandardizedAbsolutePath(this, filePath);
        var dirPath = utils_1.FileUtils.getDirPath(filePath);
        this.getOrCreateDir(dirPath).files.set(filePath, fileText);
    };
    VirtualFileSystemHost.prototype.mkdir = function (dirPath) {
        this.mkdirSync(dirPath);
        return Promise.resolve();
    };
    VirtualFileSystemHost.prototype.mkdirSync = function (dirPath) {
        dirPath = utils_1.FileUtils.getStandardizedAbsolutePath(this, dirPath);
        this.getOrCreateDir(dirPath);
    };
    VirtualFileSystemHost.prototype.move = function (srcPath, destPath) {
        this.moveSync(srcPath, destPath);
        return Promise.resolve();
    };
    VirtualFileSystemHost.prototype.moveSync = function (srcPath, destPath) {
        var e_3, _a;
        var _this = this;
        srcPath = utils_1.FileUtils.getStandardizedAbsolutePath(this, srcPath);
        destPath = utils_1.FileUtils.getStandardizedAbsolutePath(this, destPath);
        if (this.fileExistsSync(srcPath)) {
            var fileText = this.readFileSync(srcPath);
            this.deleteSync(srcPath);
            this.writeFileSync(destPath, fileText);
        }
        else if (this.directories.has(srcPath)) {
            var moveDirectory = function (from, to) {
                _this._copyDirInternal(from, to);
                _this.directories.removeByKey(from);
            };
            moveDirectory(srcPath, destPath);
            try {
                // move descendant dirs
                for (var _b = tslib_1.__values(getDescendantDirectories(this.directories.getKeys(), srcPath)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var descendantDirPath = _c.value;
                    var relativePath = utils_1.FileUtils.getRelativePathTo(srcPath, descendantDirPath);
                    moveDirectory(descendantDirPath, utils_1.FileUtils.pathJoin(destPath, relativePath));
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        else
            throw new errors.PathNotFoundError(srcPath);
    };
    VirtualFileSystemHost.prototype.copy = function (srcPath, destPath) {
        this.copySync(srcPath, destPath);
        return Promise.resolve();
    };
    VirtualFileSystemHost.prototype.copySync = function (srcPath, destPath) {
        var e_4, _a;
        srcPath = utils_1.FileUtils.getStandardizedAbsolutePath(this, srcPath);
        destPath = utils_1.FileUtils.getStandardizedAbsolutePath(this, destPath);
        if (this.fileExistsSync(srcPath))
            this.writeFileSync(destPath, this.readFileSync(srcPath));
        else if (this.directories.has(srcPath)) {
            this._copyDirInternal(srcPath, destPath);
            try {
                // copy descendant dirs
                for (var _b = tslib_1.__values(getDescendantDirectories(this.directories.getKeys(), srcPath)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var descendantDirPath = _c.value;
                    var relativePath = utils_1.FileUtils.getRelativePathTo(srcPath, descendantDirPath);
                    this._copyDirInternal(descendantDirPath, utils_1.FileUtils.pathJoin(destPath, relativePath));
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        else
            throw new errors.PathNotFoundError(srcPath);
    };
    VirtualFileSystemHost.prototype._copyDirInternal = function (from, to) {
        var e_5, _a;
        var dir = this.directories.get(from);
        var newDir = this.getOrCreateDir(to);
        try {
            for (var _b = tslib_1.__values(dir.files.getEntries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var fileEntry = _c.value;
                newDir.files.set(utils_1.FileUtils.pathJoin(to, utils_1.FileUtils.getBaseName(fileEntry[0])), fileEntry[1]);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
    };
    VirtualFileSystemHost.prototype.fileExists = function (filePath) {
        return Promise.resolve(this.fileExistsSync(filePath));
    };
    VirtualFileSystemHost.prototype.fileExistsSync = function (filePath) {
        filePath = utils_1.FileUtils.getStandardizedAbsolutePath(this, filePath);
        var dirPath = utils_1.FileUtils.getDirPath(filePath);
        var dir = this.directories.get(dirPath);
        if (dir == null)
            return false;
        return dir.files.has(filePath);
    };
    VirtualFileSystemHost.prototype.directoryExists = function (dirPath) {
        return Promise.resolve(this.directoryExistsSync(dirPath));
    };
    VirtualFileSystemHost.prototype.directoryExistsSync = function (dirPath) {
        dirPath = utils_1.FileUtils.getStandardizedAbsolutePath(this, dirPath);
        return this.directories.has(dirPath);
    };
    VirtualFileSystemHost.prototype.getCurrentDirectory = function () {
        return "/";
    };
    VirtualFileSystemHost.prototype.glob = function (patterns) {
        var filePaths = [];
        var allFilePaths = utils_1.ArrayUtils.from(getAllFilePaths(this.directories.getValues()));
        return utils_1.matchGlobs(allFilePaths, patterns, this.getCurrentDirectory());
        function getAllFilePaths(directories) {
            var e_6, _a, directories_1, directories_1_1, dir, e_6_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, 6, 7]);
                        directories_1 = tslib_1.__values(directories), directories_1_1 = directories_1.next();
                        _b.label = 1;
                    case 1:
                        if (!!directories_1_1.done) return [3 /*break*/, 4];
                        dir = directories_1_1.value;
                        return [5 /*yield**/, tslib_1.__values(dir.files.getKeys())];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        directories_1_1 = directories_1.next();
                        return [3 /*break*/, 1];
                    case 4: return [3 /*break*/, 7];
                    case 5:
                        e_6_1 = _b.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 7];
                    case 6:
                        try {
                            if (directories_1_1 && !directories_1_1.done && (_a = directories_1.return)) _a.call(directories_1);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7 /*endfinally*/];
                    case 7: return [2 /*return*/];
                }
            });
        }
    };
    VirtualFileSystemHost.prototype.getOrCreateDir = function (dirPath) {
        var dir = this.directories.get(dirPath);
        if (dir == null) {
            dir = { path: dirPath, files: new utils_1.KeyValueCache() };
            this.directories.set(dirPath, dir);
            var parentDirPath = utils_1.FileUtils.getDirPath(dirPath);
            if (parentDirPath !== dirPath)
                this.getOrCreateDir(parentDirPath);
        }
        return dir;
    };
    return VirtualFileSystemHost;
}());
exports.VirtualFileSystemHost = VirtualFileSystemHost;
function getDescendantDirectories(directoryPaths, dirPath) {
    var e_7, _a, directoryPaths_1, directoryPaths_1_1, path, e_7_1;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 7]);
                directoryPaths_1 = tslib_1.__values(directoryPaths), directoryPaths_1_1 = directoryPaths_1.next();
                _b.label = 1;
            case 1:
                if (!!directoryPaths_1_1.done) return [3 /*break*/, 4];
                path = directoryPaths_1_1.value;
                if (!utils_1.FileUtils.pathStartsWith(path, dirPath)) return [3 /*break*/, 3];
                return [4 /*yield*/, path];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                directoryPaths_1_1 = directoryPaths_1.next();
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5:
                e_7_1 = _b.sent();
                e_7 = { error: e_7_1 };
                return [3 /*break*/, 7];
            case 6:
                try {
                    if (directoryPaths_1_1 && !directoryPaths_1_1.done && (_a = directoryPaths_1.return)) _a.call(directoryPaths_1);
                }
                finally { if (e_7) throw e_7.error; }
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}
