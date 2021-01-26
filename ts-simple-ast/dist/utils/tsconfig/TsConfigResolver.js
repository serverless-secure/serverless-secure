"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var compiler_1 = require("../../compiler");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var getTsParseConfigHost_1 = require("./getTsParseConfigHost");
var TsConfigResolver = /** @class */ (function () {
    function TsConfigResolver(fileSystem, tsConfigFilePath, encoding) {
        this.fileSystem = fileSystem;
        this.encoding = encoding;
        this.host = getTsParseConfigHost_1.getTsParseConfigHost(fileSystem, { encoding: encoding });
        this.tsConfigFilePath = fileSystem.getStandardizedAbsolutePath(tsConfigFilePath);
        this.tsConfigDirPath = utils_1.FileUtils.getDirPath(this.tsConfigFilePath);
    }
    TsConfigResolver.prototype.getCompilerOptions = function () {
        return this.parseJsonConfigFileContent(this.tsConfigDirPath).options;
    };
    TsConfigResolver.prototype.getErrors = function () {
        return (this.parseJsonConfigFileContent(this.tsConfigDirPath).errors || []).map(function (e) { return new compiler_1.Diagnostic(undefined, e); });
    };
    TsConfigResolver.prototype.getPaths = function (compilerOptions) {
        var e_1, _a, e_2, _b, e_3, _c;
        var files = utils_1.createHashSet();
        var tsConfigDirPath = this.tsConfigDirPath;
        var directories = utils_1.createHashSet();
        compilerOptions = compilerOptions || this.getCompilerOptions();
        try {
            for (var _d = tslib_1.__values(getRootDirs(compilerOptions)), _e = _d.next(); !_e.done; _e = _d.next()) {
                var rootDir = _e.value;
                var result = this.parseJsonConfigFileContent(this.fileSystem.getStandardizedAbsolutePath(rootDir, this.tsConfigDirPath));
                try {
                    for (var _f = tslib_1.__values(result.fileNames), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var filePath = _g.value;
                        files.add(this.fileSystem.getStandardizedAbsolutePath(filePath));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                try {
                    for (var _h = tslib_1.__values(result.directories), _j = _h.next(); !_j.done; _j = _h.next()) {
                        var dirPath = _j.value;
                        directories.add(this.fileSystem.getStandardizedAbsolutePath(dirPath));
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return {
            filePaths: utils_1.ArrayUtils.from(files.values()),
            directoryPaths: utils_1.ArrayUtils.from(directories.values())
        };
        function getRootDirs(options) {
            var result = [];
            if (typeof options.rootDir === "string")
                result.push(options.rootDir);
            if (options.rootDirs != null)
                result.push.apply(result, tslib_1.__spread(options.rootDirs));
            // use the tsconfig directory if no rootDir or rootDirs is specified
            if (result.length === 0)
                result.push(tsConfigDirPath);
            return result;
        }
    };
    TsConfigResolver.prototype.parseJsonConfigFileContent = function (dirPath) {
        this.host.clearDirectories();
        // do not provide a tsconfig.json filepath to this because it will start searching in incorrect directories
        var result = typescript_1.ts.parseJsonConfigFileContent(this.getTsConfigFileJson(), this.host, dirPath, undefined, undefined);
        delete result.options.configFilePath;
        return tslib_1.__assign({}, result, { directories: this.host.getDirectories() });
    };
    TsConfigResolver.prototype.getTsConfigFileJson = function () {
        var text = this.fileSystem.readFileSync(this.tsConfigFilePath, this.encoding);
        var parseResult = typescript_1.ts.parseConfigFileTextToJson(this.tsConfigFilePath, text);
        if (parseResult.error != null)
            throw new Error(parseResult.error.messageText.toString());
        return parseResult.config;
    };
    tslib_1.__decorate([
        utils_1.Memoize
    ], TsConfigResolver.prototype, "getCompilerOptions", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], TsConfigResolver.prototype, "getErrors", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], TsConfigResolver.prototype, "getPaths", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], TsConfigResolver.prototype, "parseJsonConfigFileContent", null);
    tslib_1.__decorate([
        utils_1.Memoize
    ], TsConfigResolver.prototype, "getTsConfigFileJson", null);
    return TsConfigResolver;
}());
exports.TsConfigResolver = TsConfigResolver;
