"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../errors");
var utils_1 = require("../utils");
var Directory = /** @class */ (function () {
    function Directory(path) {
        this.path = path;
        this.operations = [];
        this.inboundOperations = [];
        this.isDeleted = false;
        this.wasEverDeleted = false;
        this.childDirs = [];
    }
    Directory.prototype.getExternalOperations = function () {
        var _this = this;
        return tslib_1.__spread(utils_1.ArrayUtils.flatten(this.getAncestors().map(function (a) { return getMoveCopyOrDeleteOperations(a); })).filter(function (o) { return isAncestorAffectedOperation(_this, o); }), utils_1.ArrayUtils.flatten(tslib_1.__spread([this], this.getDescendants()).map(function (d) { return getMoveOrCopyOperations(d); })).filter(function (o) { return !isInternalOperation(_this, o); }));
        function isInternalOperation(thisDir, operation) {
            return operation.oldDir.isDescendantOrEqual(thisDir) && operation.newDir.isDescendantOrEqual(thisDir);
        }
        function isAncestorAffectedOperation(thisDir, operation) {
            switch (operation.kind) {
                case "move":
                case "copy":
                    return thisDir.isDescendantOrEqual(operation.oldDir) || thisDir.isDescendantOrEqual(operation.newDir);
                case "deleteDir":
                    return thisDir.isDescendantOrEqual(operation.dir);
                default:
                    throw errors.getNotImplementedForNeverValueError(operation);
            }
        }
        function getMoveOrCopyOperations(dir) {
            return dir.operations.filter(function (o) { return o.kind === "move" || o.kind === "copy"; });
        }
        function getMoveCopyOrDeleteOperations(dir) {
            return dir.operations.filter(function (o) { return o.kind === "move" || o.kind === "deleteDir" || o.kind === "copy"; });
        }
    };
    Directory.prototype.isDescendantOrEqual = function (directory) {
        return this.isDescendant(directory) || this === directory;
    };
    Directory.prototype.isDescendant = function (directory) {
        return utils_1.FileUtils.pathStartsWith(this.path, directory.path);
    };
    Directory.prototype.getIsDeleted = function () {
        return this.isDeleted;
    };
    Directory.prototype.getWasEverDeleted = function () {
        var e_1, _a;
        if (this.wasEverDeleted)
            return true;
        try {
            for (var _b = tslib_1.__values(this.getAncestorsIterator()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var ancestor = _c.value;
                if (ancestor.wasEverDeleted)
                    return true;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return false;
    };
    Directory.prototype.setIsDeleted = function (isDeleted) {
        var e_2, _a;
        if (this.isDeleted === isDeleted)
            return;
        if (isDeleted) {
            this.wasEverDeleted = true;
            try {
                for (var _b = tslib_1.__values(this.childDirs), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    child.setIsDeleted(true);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            if (this.parent != null)
                this.parent.setIsDeleted(false);
        }
        this.isDeleted = isDeleted;
    };
    Directory.prototype.getParent = function () {
        return this.parent;
    };
    Directory.prototype.setParent = function (parent) {
        var _this = this;
        if (this.parent != null)
            throw new errors.InvalidOperationError("For some reason, a parent was being set when the directory already had a parent. Please open an issue.");
        this.parent = parent;
        utils_1.ArrayUtils.binaryInsert(parent.childDirs, this, function (item) { return item.path > _this.path; });
        if (parent.isDeleted && !this.isDeleted)
            parent.setIsDeleted(false);
    };
    Directory.prototype.removeParent = function () {
        var _this = this;
        var parent = this.parent;
        if (parent == null)
            return;
        var index = utils_1.ArrayUtils.binarySearch(parent.childDirs, function (item) { return item === _this; }, function (item) { return item.path > _this.path; });
        if (index >= 0)
            parent.childDirs.splice(index, 1);
        this.parent = undefined;
    };
    Directory.prototype.getAncestors = function () {
        return utils_1.ArrayUtils.from(this.getAncestorsIterator());
    };
    Directory.prototype.getAncestorsIterator = function () {
        var parent;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    parent = this.parent;
                    _a.label = 1;
                case 1:
                    if (!(parent != null)) return [3 /*break*/, 3];
                    return [4 /*yield*/, parent];
                case 2:
                    _a.sent();
                    parent = parent.parent;
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/];
            }
        });
    };
    Directory.prototype.getDescendants = function () {
        var e_3, _a;
        var descendants = [];
        try {
            for (var _b = tslib_1.__values(this.childDirs), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                descendants.push(child);
                descendants.push.apply(descendants, tslib_1.__spread(child.getDescendants()));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return descendants;
    };
    Directory.prototype.isFileQueuedForDelete = function (filePath) {
        return this.hasOperation(function (operation) { return operation.kind === "deleteFile" && operation.filePath === filePath; });
    };
    Directory.prototype.hasOperation = function (operationMatches) {
        var e_4, _a;
        try {
            for (var _b = tslib_1.__values(this.operations), _c = _b.next(); !_c.done; _c = _b.next()) {
                var operation = _c.value;
                if (operationMatches(operation))
                    return true;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return false;
    };
    Directory.prototype.dequeueFileDelete = function (filePath) {
        this.removeMatchingOperations(function (operation) { return operation.kind === "deleteFile" && operation.filePath === filePath; });
    };
    Directory.prototype.dequeueDirDelete = function (dirPath) {
        this.removeMatchingOperations(function (operation) { return operation.kind === "deleteDir" && operation.dir.path === dirPath; });
    };
    Directory.prototype.isRootDir = function () {
        return utils_1.FileUtils.isRootDirPath(this.path);
    };
    Directory.prototype.removeMatchingOperations = function (operationMatches) {
        utils_1.ArrayUtils.removeAll(this.operations, operationMatches);
    };
    return Directory;
}());
/**
 * File system host wrapper that allows queuing deletions to the file system.
 */
var FileSystemWrapper = /** @class */ (function () {
    function FileSystemWrapper(fileSystem) {
        this.fileSystem = fileSystem;
        this.directories = new utils_1.KeyValueCache();
        this.operationIndex = 0;
    }
    FileSystemWrapper.prototype.queueFileDelete = function (filePath) {
        filePath = this.getStandardizedAbsolutePath(filePath);
        var parentDir = this.getParentDirectory(filePath);
        parentDir.operations.push({
            kind: "deleteFile",
            index: this.getNextOperationIndex(),
            filePath: filePath
        });
    };
    FileSystemWrapper.prototype.removeFileDelete = function (filePath) {
        filePath = this.getStandardizedAbsolutePath(filePath);
        this.getParentDirectory(filePath).dequeueFileDelete(filePath);
    };
    FileSystemWrapper.prototype.queueMkdir = function (dirPath) {
        dirPath = this.getStandardizedAbsolutePath(dirPath);
        var dir = this.getDirectory(dirPath);
        dir.setIsDeleted(false);
        var parentDir = this.getParentDirectory(dirPath);
        parentDir.operations.push({
            kind: "mkdir",
            index: this.getNextOperationIndex(),
            dir: dir
        });
    };
    FileSystemWrapper.prototype.queueDirectoryDelete = function (dirPath) {
        dirPath = this.getStandardizedAbsolutePath(dirPath);
        var dir = this.getDirectory(dirPath);
        dir.setIsDeleted(true);
        var parentDir = this.getParentDirectory(dirPath);
        parentDir.operations.push({
            kind: "deleteDir",
            index: this.getNextOperationIndex(),
            dir: dir
        });
    };
    FileSystemWrapper.prototype.queueMoveDirectory = function (srcPath, destPath) {
        // todo: tests for the root directory
        srcPath = this.getStandardizedAbsolutePath(srcPath);
        destPath = this.getStandardizedAbsolutePath(destPath);
        var parentDir = this.getParentDirectory(srcPath);
        var moveDir = this.getDirectory(srcPath);
        var destinationDir = this.getDirectory(destPath);
        var moveOperation = {
            kind: "move",
            index: this.getNextOperationIndex(),
            oldDir: moveDir,
            newDir: destinationDir
        };
        parentDir.operations.push(moveOperation);
        (destinationDir.getParent() || destinationDir).inboundOperations.push(moveOperation);
        moveDir.setIsDeleted(true);
    };
    FileSystemWrapper.prototype.queueCopyDirectory = function (srcPath, destPath) {
        srcPath = this.getStandardizedAbsolutePath(srcPath);
        destPath = this.getStandardizedAbsolutePath(destPath);
        var parentDir = this.getParentDirectory(srcPath);
        var copyDir = this.getDirectory(srcPath);
        var destinationDir = this.getDirectory(destPath);
        var copyOperation = {
            kind: "copy",
            index: this.getNextOperationIndex(),
            oldDir: copyDir,
            newDir: destinationDir
        };
        parentDir.operations.push(copyOperation);
        (destinationDir.getParent() || destinationDir).inboundOperations.push(copyOperation);
    };
    FileSystemWrapper.prototype.flush = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_5, _a, operations, operations_1, operations_1_1, operation, e_5_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        operations = this.getAndClearOperations();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 6, 7, 8]);
                        operations_1 = tslib_1.__values(operations), operations_1_1 = operations_1.next();
                        _b.label = 2;
                    case 2:
                        if (!!operations_1_1.done) return [3 /*break*/, 5];
                        operation = operations_1_1.value;
                        return [4 /*yield*/, this.executeOperation(operation)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        operations_1_1 = operations_1.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_5_1 = _b.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (operations_1_1 && !operations_1_1.done && (_a = operations_1.return)) _a.call(operations_1);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    FileSystemWrapper.prototype.flushSync = function () {
        var e_6, _a;
        try {
            for (var _b = tslib_1.__values(this.getAndClearOperations()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var operation = _c.value;
                this.executeOperationSync(operation);
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
    FileSystemWrapper.prototype.saveForDirectory = function (dirPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var e_7, _a, dir, operations, operations_2, operations_2_1, operation, e_7_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dirPath = this.getStandardizedAbsolutePath(dirPath);
                        dir = this.getDirectory(dirPath);
                        this.throwIfHasExternalOperations(dir, "save directory");
                        operations = this.getAndClearOperationsForDir(dir);
                        // await after the state is set
                        return [4 /*yield*/, this.ensureDirectoryExists(dirPath)];
                    case 1:
                        // await after the state is set
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, 8, 9]);
                        operations_2 = tslib_1.__values(operations), operations_2_1 = operations_2.next();
                        _b.label = 3;
                    case 3:
                        if (!!operations_2_1.done) return [3 /*break*/, 6];
                        operation = operations_2_1.value;
                        return [4 /*yield*/, this.executeOperation(operation)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        operations_2_1 = operations_2.next();
                        return [3 /*break*/, 3];
                    case 6: return [3 /*break*/, 9];
                    case 7:
                        e_7_1 = _b.sent();
                        e_7 = { error: e_7_1 };
                        return [3 /*break*/, 9];
                    case 8:
                        try {
                            if (operations_2_1 && !operations_2_1.done && (_a = operations_2.return)) _a.call(operations_2);
                        }
                        finally { if (e_7) throw e_7.error; }
                        return [7 /*endfinally*/];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    FileSystemWrapper.prototype.saveForDirectorySync = function (dirPath) {
        var e_8, _a;
        dirPath = this.getStandardizedAbsolutePath(dirPath);
        var dir = this.getDirectory(dirPath);
        this.throwIfHasExternalOperations(dir, "save directory");
        this.ensureDirectoryExistsSync(dirPath);
        try {
            for (var _b = tslib_1.__values(this.getAndClearOperationsForDir(dir)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var operation = _c.value;
                this.executeOperationSync(operation);
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_8) throw e_8.error; }
        }
    };
    FileSystemWrapper.prototype.getAndClearOperationsForDir = function (dir) {
        var e_9, _a;
        var operations = getAndClearParentMkDirOperations(dir.getParent(), dir);
        try {
            for (var _b = tslib_1.__values(tslib_1.__spread([dir], dir.getDescendants())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var currentDir = _c.value;
                operations.push.apply(operations, tslib_1.__spread(currentDir.operations));
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_9) throw e_9.error; }
        }
        utils_1.ArrayUtils.sortByProperty(operations, function (item) { return item.index; });
        this.removeDirAndSubDirs(dir);
        return operations;
        function getAndClearParentMkDirOperations(parentDir, childDir) {
            if (parentDir == null)
                return [];
            var parentOperations = utils_1.ArrayUtils.removeAll(parentDir.operations, function (operation) { return operation.kind === "mkdir" && operation.dir === childDir; });
            return tslib_1.__spread(parentOperations, getAndClearParentMkDirOperations(parentDir.getParent(), parentDir));
        }
    };
    FileSystemWrapper.prototype.executeOperation = function (operation) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = operation.kind;
                        switch (_a) {
                            case "deleteDir": return [3 /*break*/, 1];
                            case "deleteFile": return [3 /*break*/, 3];
                            case "move": return [3 /*break*/, 5];
                            case "copy": return [3 /*break*/, 7];
                            case "mkdir": return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 11];
                    case 1: return [4 /*yield*/, this.deleteSuppressNotFound(operation.dir.path)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 3: return [4 /*yield*/, this.deleteSuppressNotFound(operation.filePath)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 5: return [4 /*yield*/, this.fileSystem.move(operation.oldDir.path, operation.newDir.path)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 7: return [4 /*yield*/, this.fileSystem.copy(operation.oldDir.path, operation.newDir.path)];
                    case 8:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 9: return [4 /*yield*/, this.fileSystem.mkdir(operation.dir.path)];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 12];
                    case 11: throw errors.getNotImplementedForNeverValueError(operation);
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    FileSystemWrapper.prototype.executeOperationSync = function (operation) {
        switch (operation.kind) {
            case "deleteDir":
                this.deleteSuppressNotFoundSync(operation.dir.path);
                break;
            case "deleteFile":
                this.deleteSuppressNotFoundSync(operation.filePath);
                break;
            case "move":
                this.fileSystem.moveSync(operation.oldDir.path, operation.newDir.path);
                break;
            case "copy":
                this.fileSystem.copySync(operation.oldDir.path, operation.newDir.path);
                break;
            case "mkdir":
                this.fileSystem.mkdirSync(operation.dir.path);
                break;
            default:
                throw errors.getNotImplementedForNeverValueError(operation);
        }
    };
    FileSystemWrapper.prototype.getAndClearOperations = function () {
        var e_10, _a;
        var operations = [];
        try {
            for (var _b = tslib_1.__values(this.directories.getValues()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var dir = _c.value;
                operations.push.apply(operations, tslib_1.__spread(dir.operations));
            }
        }
        catch (e_10_1) { e_10 = { error: e_10_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_10) throw e_10.error; }
        }
        utils_1.ArrayUtils.sortByProperty(operations, function (item) { return item.index; });
        this.directories.clear();
        return operations;
    };
    FileSystemWrapper.prototype.moveFileImmediately = function (oldFilePath, newFilePath, fileText) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        oldFilePath = this.getStandardizedAbsolutePath(oldFilePath);
                        newFilePath = this.getStandardizedAbsolutePath(newFilePath);
                        this.throwIfHasExternalOperations(this.getParentDirectory(oldFilePath), "move file");
                        this.throwIfHasExternalOperations(this.getParentDirectory(newFilePath), "move file");
                        return [4 /*yield*/, this.deleteFileImmediately(oldFilePath)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.writeFile(newFilePath, fileText)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileSystemWrapper.prototype.moveFileImmediatelySync = function (oldFilePath, newFilePath, fileText) {
        oldFilePath = this.getStandardizedAbsolutePath(oldFilePath);
        newFilePath = this.getStandardizedAbsolutePath(newFilePath);
        this.throwIfHasExternalOperations(this.getParentDirectory(oldFilePath), "move file");
        this.throwIfHasExternalOperations(this.getParentDirectory(newFilePath), "move file");
        this.deleteFileImmediatelySync(oldFilePath);
        this.writeFileSync(newFilePath, fileText);
    };
    FileSystemWrapper.prototype.deleteFileImmediately = function (filePath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dir, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = this.getStandardizedAbsolutePath(filePath);
                        dir = this.getParentDirectory(filePath);
                        this.throwIfHasExternalOperations(dir, "delete file");
                        dir.dequeueFileDelete(filePath);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.deleteSuppressNotFound(filePath)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        this.queueFileDelete(filePath);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FileSystemWrapper.prototype.deleteFileImmediatelySync = function (filePath) {
        filePath = this.getStandardizedAbsolutePath(filePath);
        var dir = this.getParentDirectory(filePath);
        this.throwIfHasExternalOperations(dir, "delete file");
        dir.dequeueFileDelete(filePath);
        try {
            this.deleteSuppressNotFoundSync(filePath);
        }
        catch (err) {
            this.queueFileDelete(filePath);
            throw err;
        }
    };
    FileSystemWrapper.prototype.copyDirectoryImmediately = function (srcDirPath, destDirPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var srcDir, destDir, saveTask;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcDirPath = this.getStandardizedAbsolutePath(srcDirPath);
                        destDirPath = this.getStandardizedAbsolutePath(destDirPath);
                        srcDir = this.getDirectory(srcDirPath);
                        destDir = this.getDirectory(destDirPath);
                        this.throwIfHasExternalOperations(srcDir, "copy directory");
                        this.throwIfHasExternalOperations(destDir, "copy directory");
                        saveTask = Promise.all([this.saveForDirectory(srcDirPath), this.saveForDirectory(destDirPath)]);
                        this.removeDirAndSubDirs(srcDir);
                        // await after the state is set
                        return [4 /*yield*/, saveTask];
                    case 1:
                        // await after the state is set
                        _a.sent();
                        return [4 /*yield*/, this.fileSystem.copy(srcDirPath, destDirPath)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileSystemWrapper.prototype.copyDirectoryImmediatelySync = function (srcDirPath, destDirPath) {
        srcDirPath = this.getStandardizedAbsolutePath(srcDirPath);
        destDirPath = this.getStandardizedAbsolutePath(destDirPath);
        var srcDir = this.getDirectory(srcDirPath);
        var destDir = this.getDirectory(destDirPath);
        this.throwIfHasExternalOperations(srcDir, "copy directory");
        this.throwIfHasExternalOperations(destDir, "copy directory");
        this.saveForDirectorySync(srcDirPath);
        this.saveForDirectorySync(destDirPath);
        this.removeDirAndSubDirs(srcDir);
        this.fileSystem.copySync(srcDirPath, destDirPath);
    };
    FileSystemWrapper.prototype.moveDirectoryImmediately = function (srcDirPath, destDirPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var srcDir, destDir, saveTask;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        srcDirPath = this.getStandardizedAbsolutePath(srcDirPath);
                        destDirPath = this.getStandardizedAbsolutePath(destDirPath);
                        srcDir = this.getDirectory(srcDirPath);
                        destDir = this.getDirectory(destDirPath);
                        this.throwIfHasExternalOperations(srcDir, "move directory");
                        this.throwIfHasExternalOperations(destDir, "move directory");
                        saveTask = Promise.all([this.saveForDirectory(srcDirPath), this.saveForDirectory(destDirPath)]);
                        this.removeDirAndSubDirs(srcDir);
                        // await after the state is set
                        return [4 /*yield*/, saveTask];
                    case 1:
                        // await after the state is set
                        _a.sent();
                        return [4 /*yield*/, this.fileSystem.move(srcDirPath, destDirPath)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileSystemWrapper.prototype.moveDirectoryImmediatelySync = function (srcDirPath, destDirPath) {
        srcDirPath = this.getStandardizedAbsolutePath(srcDirPath);
        destDirPath = this.getStandardizedAbsolutePath(destDirPath);
        var srcDir = this.getDirectory(srcDirPath);
        var destDir = this.getDirectory(destDirPath);
        this.throwIfHasExternalOperations(srcDir, "move directory");
        this.throwIfHasExternalOperations(destDir, "move directory");
        this.saveForDirectorySync(srcDirPath);
        this.saveForDirectorySync(destDirPath);
        this.removeDirAndSubDirs(srcDir);
        this.fileSystem.moveSync(srcDirPath, destDirPath);
    };
    FileSystemWrapper.prototype.deleteDirectoryImmediately = function (dirPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var dir, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        dirPath = this.getStandardizedAbsolutePath(dirPath);
                        dir = this.getDirectory(dirPath);
                        this.throwIfHasExternalOperations(dir, "delete");
                        this.removeDirAndSubDirs(dir);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.deleteSuppressNotFound(dirPath)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_2 = _a.sent();
                        this.addBackDirAndSubDirs(dir);
                        this.queueDirectoryDelete(dirPath);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FileSystemWrapper.prototype.deleteDirectoryImmediatelySync = function (dirPath) {
        dirPath = this.getStandardizedAbsolutePath(dirPath);
        var dir = this.getDirectory(dirPath);
        this.throwIfHasExternalOperations(dir, "delete");
        this.removeDirAndSubDirs(dir);
        try {
            this.deleteSuppressNotFoundSync(dirPath);
        }
        catch (err) {
            this.addBackDirAndSubDirs(dir);
            this.queueDirectoryDelete(dirPath);
        }
    };
    FileSystemWrapper.prototype.deleteSuppressNotFound = function (path) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var err_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fileSystem.delete(path)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        if (!utils_1.FileUtils.isNotExistsError(err_3))
                            throw err_3;
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileSystemWrapper.prototype.deleteSuppressNotFoundSync = function (path) {
        try {
            this.fileSystem.deleteSync(path);
        }
        catch (err) {
            if (!utils_1.FileUtils.isNotExistsError(err))
                throw err;
        }
    };
    FileSystemWrapper.prototype.fileExistsSync = function (filePath) {
        filePath = this.getStandardizedAbsolutePath(filePath);
        if (this.isPathQueuedForDeletion(filePath))
            return false;
        if (this.getParentDirectory(filePath).getWasEverDeleted())
            return false;
        return this.fileSystem.fileExistsSync(filePath);
    };
    FileSystemWrapper.prototype.directoryExistsSync = function (dirPath) {
        dirPath = this.getStandardizedAbsolutePath(dirPath);
        if (this.isPathQueuedForDeletion(dirPath))
            return false;
        if (this.isPathDirectoryInQueueThatExists(dirPath))
            return true;
        if (this.getDirectory(dirPath).getWasEverDeleted())
            return false;
        return this.fileSystem.directoryExistsSync(dirPath);
    };
    FileSystemWrapper.prototype.readFileSync = function (filePath, encoding) {
        filePath = this.getStandardizedAbsolutePath(filePath);
        if (this.isPathQueuedForDeletion(filePath))
            throw new errors.InvalidOperationError("Cannot read file at " + filePath + " when it is queued for deletion.");
        if (this.getParentDirectory(filePath).getWasEverDeleted())
            throw new errors.InvalidOperationError("Cannot read file at " + filePath + " because one of its ancestor directories was once deleted or moved.");
        return this.fileSystem.readFileSync(filePath, encoding);
    };
    FileSystemWrapper.prototype.readDirSync = function (dirPath) {
        var _this = this;
        dirPath = this.getStandardizedAbsolutePath(dirPath);
        var dir = this.getDirectory(dirPath);
        if (dir.getIsDeleted())
            throw new errors.InvalidOperationError("Cannot read directory at " + dirPath + " when it is queued for deletion.");
        if (dir.getWasEverDeleted())
            throw new errors.InvalidOperationError("Cannot read directory at " + dirPath + " because one of its ancestor directories was once deleted or moved.");
        return this.fileSystem.readDirSync(dirPath).filter(function (path) { return !_this.isPathQueuedForDeletion(path) && !_this.isPathQueuedForDeletion(path); });
    };
    FileSystemWrapper.prototype.glob = function (patterns) {
        var _this = this;
        return this.fileSystem.glob(patterns).filter(function (path) { return !_this.isPathQueuedForDeletion(path); });
    };
    FileSystemWrapper.prototype.getFileSystem = function () {
        return this.fileSystem;
    };
    FileSystemWrapper.prototype.getCurrentDirectory = function () {
        return this.fileSystem.getCurrentDirectory();
    };
    FileSystemWrapper.prototype.getStandardizedAbsolutePath = function (fileOrDirPath, relativeBase) {
        return utils_1.FileUtils.getStandardizedAbsolutePath(this.fileSystem, fileOrDirPath, relativeBase);
    };
    FileSystemWrapper.prototype.readFileOrNotExists = function (filePath, encoding) {
        filePath = this.getStandardizedAbsolutePath(filePath);
        if (this.isPathQueuedForDeletion(filePath))
            return false;
        return utils_1.FileUtils.readFileOrNotExists(this.fileSystem, filePath, encoding);
    };
    FileSystemWrapper.prototype.readFileOrNotExistsSync = function (filePath, encoding) {
        filePath = this.getStandardizedAbsolutePath(filePath);
        if (this.isPathQueuedForDeletion(filePath))
            return false;
        return utils_1.FileUtils.readFileOrNotExistsSync(this.fileSystem, filePath, encoding);
    };
    FileSystemWrapper.prototype.writeFile = function (filePath, fileText) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var parentDir;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filePath = this.getStandardizedAbsolutePath(filePath);
                        parentDir = this.getParentDirectory(filePath);
                        this.throwIfHasExternalOperations(parentDir, "write file");
                        parentDir.dequeueFileDelete(filePath);
                        return [4 /*yield*/, this.ensureDirectoryExists(parentDir.path)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.fileSystem.writeFile(filePath, fileText)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileSystemWrapper.prototype.writeFileSync = function (filePath, fileText) {
        filePath = this.getStandardizedAbsolutePath(filePath);
        var parentDir = this.getParentDirectory(filePath);
        this.throwIfHasExternalOperations(parentDir, "write file");
        parentDir.dequeueFileDelete(filePath);
        this.ensureDirectoryExistsSync(parentDir.path);
        this.fileSystem.writeFileSync(filePath, fileText);
    };
    FileSystemWrapper.prototype.isPathDirectoryInQueueThatExists = function (path) {
        var pathDir = this.getDirectoryIfExists(path);
        return pathDir == null ? false : !pathDir.getIsDeleted();
    };
    FileSystemWrapper.prototype.isPathQueuedForDeletion = function (path) {
        // check if the provided path is a dir and if it's deleted
        var pathDir = this.getDirectoryIfExists(path);
        if (pathDir != null)
            return pathDir.getIsDeleted();
        // check if the provided path is a file or if it or its parent is deleted
        var parentDir = this.getParentDirectory(path);
        return parentDir.isFileQueuedForDelete(path) || parentDir.getIsDeleted();
    };
    FileSystemWrapper.prototype.removeDirAndSubDirs = function (dir) {
        var e_11, _a;
        var originalParent = dir.getParent();
        dir.removeParent();
        try {
            for (var _b = tslib_1.__values(tslib_1.__spread([dir], dir.getDescendants())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var dirToRemove = _c.value;
                this.directories.removeByKey(dirToRemove.path);
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_11) throw e_11.error; }
        }
        if (originalParent != null)
            originalParent.dequeueDirDelete(dir.path);
    };
    FileSystemWrapper.prototype.addBackDirAndSubDirs = function (dir) {
        var e_12, _a;
        try {
            for (var _b = tslib_1.__values(tslib_1.__spread([dir], dir.getDescendants())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var dirToAdd = _c.value;
                this.directories.set(dirToAdd.path, dirToAdd);
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_12) throw e_12.error; }
        }
        if (!dir.isRootDir())
            dir.setParent(this.getParentDirectory(dir.path));
    };
    FileSystemWrapper.prototype.getNextOperationIndex = function () {
        return this.operationIndex++;
    };
    FileSystemWrapper.prototype.getParentDirectory = function (filePath) {
        return this.getDirectory(utils_1.FileUtils.getDirPath(filePath));
    };
    FileSystemWrapper.prototype.getDirectoryIfExists = function (dirPath) {
        return this.directories.get(dirPath);
    };
    FileSystemWrapper.prototype.getDirectory = function (dirPath) {
        var _this = this;
        var dir = this.directories.get(dirPath);
        if (dir != null)
            return dir;
        var getOrCreateDir = function (creatingDirPath) { return _this.directories.getOrCreate(creatingDirPath, function () { return new Directory(creatingDirPath); }); };
        dir = getOrCreateDir(dirPath);
        var currentDirPath = dirPath;
        var currentDir = dir;
        while (!utils_1.FileUtils.isRootDirPath(currentDirPath)) {
            var nextDirPath = utils_1.FileUtils.getDirPath(currentDirPath);
            var hadNextDir = this.directories.has(nextDirPath);
            var nextDir = getOrCreateDir(nextDirPath);
            currentDir.setParent(nextDir);
            if (hadNextDir)
                return dir;
            currentDir = nextDir;
            currentDirPath = nextDirPath;
        }
        return dir;
    };
    FileSystemWrapper.prototype.throwIfHasExternalOperations = function (dir, commandName) {
        var operations = dir.getExternalOperations();
        if (operations.length === 0)
            return;
        throw new errors.InvalidOperationError(getErrorText());
        function getErrorText() {
            var e_13, _a;
            var hasCopy = false;
            var errorText = "Cannot execute immediate operation '" + commandName + "' because of the following external operations:\n";
            try {
                for (var operations_3 = tslib_1.__values(operations), operations_3_1 = operations_3.next(); !operations_3_1.done; operations_3_1 = operations_3.next()) {
                    var operation = operations_3_1.value;
                    if (operation.kind === "move")
                        errorText += "\n* Move: " + operation.oldDir.path + " --> " + operation.newDir.path;
                    else if (operation.kind === "copy") {
                        errorText += "\n* Copy: " + operation.oldDir.path + " --> " + operation.newDir.path;
                        hasCopy = true;
                    }
                    else if (operation.kind === "deleteDir")
                        errorText += "\n* Delete: " + operation.dir.path;
                    else {
                        var expectNever = operation;
                        errorText += "\n* Unknown operation: Please report this as a bug.";
                    }
                }
            }
            catch (e_13_1) { e_13 = { error: e_13_1 }; }
            finally {
                try {
                    if (operations_3_1 && !operations_3_1.done && (_a = operations_3.return)) _a.call(operations_3);
                }
                finally { if (e_13) throw e_13.error; }
            }
            if (hasCopy)
                errorText += "\n\nNote: Copy operations can be removed from external operations by setting `includeUntrackedFiles` to `false` when copying.";
            return errorText;
        }
    };
    FileSystemWrapper.prototype.ensureDirectoryExists = function (dirPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var parentDirPath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileSystem.directoryExists(dirPath)];
                    case 1:
                        if (_a.sent())
                            return [2 /*return*/];
                        parentDirPath = utils_1.FileUtils.getDirPath(dirPath);
                        if (!(parentDirPath !== dirPath && !utils_1.FileUtils.isRootDirPath(parentDirPath))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.ensureDirectoryExists(parentDirPath)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        // make this directory
                        this.removeMkDirOperationsForDir(dirPath);
                        return [4 /*yield*/, this.fileSystem.mkdir(dirPath)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FileSystemWrapper.prototype.ensureDirectoryExistsSync = function (dirPath) {
        if (this.fileSystem.directoryExistsSync(dirPath))
            return;
        // ensure the parent exists and is not the root
        var parentDirPath = utils_1.FileUtils.getDirPath(dirPath);
        if (parentDirPath !== dirPath && !utils_1.FileUtils.isRootDirPath(parentDirPath))
            this.ensureDirectoryExistsSync(parentDirPath);
        // make this directory
        this.removeMkDirOperationsForDir(dirPath);
        this.fileSystem.mkdirSync(dirPath);
    };
    FileSystemWrapper.prototype.removeMkDirOperationsForDir = function (dirPath) {
        var dir = this.getDirectory(dirPath);
        var parentDir = this.getParentDirectory(dirPath);
        utils_1.ArrayUtils.removeAll(parentDir.operations, function (operation) { return operation.kind === "mkdir" && operation.dir === dir; });
    };
    return FileSystemWrapper;
}());
exports.FileSystemWrapper = FileSystemWrapper;
