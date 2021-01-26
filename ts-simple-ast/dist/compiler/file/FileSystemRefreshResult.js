"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Result of refreshing a source file from the file system.
 */
var FileSystemRefreshResult;
(function (FileSystemRefreshResult) {
    /** The source file did not change. */
    FileSystemRefreshResult[FileSystemRefreshResult["NoChange"] = 0] = "NoChange";
    /** The source file was updated from the file system. */
    FileSystemRefreshResult[FileSystemRefreshResult["Updated"] = 1] = "Updated";
    /** The source file was deleted. */
    FileSystemRefreshResult[FileSystemRefreshResult["Deleted"] = 2] = "Deleted";
})(FileSystemRefreshResult = exports.FileSystemRefreshResult || (exports.FileSystemRefreshResult = {}));
