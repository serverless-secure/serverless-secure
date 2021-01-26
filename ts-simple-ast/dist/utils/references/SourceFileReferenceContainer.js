"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var collections_1 = require("../collections");
var compiler_1 = require("../compiler");
var TypeGuards_1 = require("../TypeGuards");
var SourceFileReferenceContainer = /** @class */ (function () {
    function SourceFileReferenceContainer(sourceFile) {
        var _this = this;
        this.sourceFile = sourceFile;
        this.nodesInThis = new collections_1.KeyValueCache();
        this.nodesInOther = new collections_1.KeyValueCache();
        this.unresolvedLiterals = [];
        this.resolveUnresolved = function () {
            for (var i = _this.unresolvedLiterals.length - 1; i >= 0; i--) {
                var literal = _this.unresolvedLiterals[i];
                var sourceFile = _this.getSourceFileForLiteral(literal);
                if (sourceFile != null) {
                    _this.unresolvedLiterals.splice(i, 1);
                    _this.addNodeInThis(literal, sourceFile);
                }
            }
            if (_this.unresolvedLiterals.length === 0)
                _this.sourceFile.global.compilerFactory.onSourceFileAdded(_this.resolveUnresolved, false);
        };
    }
    SourceFileReferenceContainer.prototype.getDependentSourceFiles = function () {
        var e_1, _a;
        this.sourceFile.global.lazyReferenceCoordinator.refreshDirtySourceFiles();
        var hashSet = collections_1.createHashSet();
        try {
            for (var _b = tslib_1.__values(this.nodesInOther.getKeys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var nodeInOther = _c.value;
                hashSet.add(nodeInOther.sourceFile);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return hashSet.values();
    };
    SourceFileReferenceContainer.prototype.getLiteralsReferencingOtherSourceFilesEntries = function () {
        this.sourceFile.global.lazyReferenceCoordinator.refreshSourceFileIfDirty(this.sourceFile);
        return this.nodesInThis.getEntries();
    };
    SourceFileReferenceContainer.prototype.getReferencingLiteralsInOtherSourceFiles = function () {
        this.sourceFile.global.lazyReferenceCoordinator.refreshDirtySourceFiles();
        return this.nodesInOther.getKeys();
    };
    SourceFileReferenceContainer.prototype.getReferencingNodesInOtherSourceFiles = function () {
        var e_2, _a, _b, _c, literal, parent, grandParent, e_2_1;
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 7, 8, 9]);
                    _b = tslib_1.__values(this.getReferencingLiteralsInOtherSourceFiles()), _c = _b.next();
                    _d.label = 1;
                case 1:
                    if (!!_c.done) return [3 /*break*/, 6];
                    literal = _c.value;
                    parent = literal.getParentOrThrow();
                    grandParent = parent.getParent();
                    if (!(grandParent != null && TypeGuards_1.TypeGuards.isImportEqualsDeclaration(grandParent))) return [3 /*break*/, 3];
                    return [4 /*yield*/, grandParent];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, literal.getParentOrThrow()];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _c = _b.next();
                    return [3 /*break*/, 1];
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
                case 9: return [2 /*return*/];
            }
        });
    };
    SourceFileReferenceContainer.prototype.refresh = function () {
        if (this.unresolvedLiterals.length > 0)
            this.sourceFile.global.compilerFactory.onSourceFileAdded(this.resolveUnresolved, false);
        this.clear();
        this.populateReferences();
        if (this.unresolvedLiterals.length > 0)
            this.sourceFile.global.compilerFactory.onSourceFileAdded(this.resolveUnresolved);
    };
    SourceFileReferenceContainer.prototype.clear = function () {
        var e_3, _a;
        this.unresolvedLiterals.length = 0;
        try {
            for (var _b = tslib_1.__values(this.nodesInThis.getEntries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = tslib_1.__read(_c.value, 2), node = _d[0], sourceFile = _d[1];
                this.nodesInThis.removeByKey(node);
                sourceFile._referenceContainer.nodesInOther.removeByKey(node);
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
    };
    SourceFileReferenceContainer.prototype.populateReferences = function () {
        var _this = this;
        this.sourceFile.global.compilerFactory.forgetNodesCreatedInBlock(function (remember) {
            var e_4, _a;
            try {
                for (var _b = tslib_1.__values(_this.sourceFile.getImportStringLiterals()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var literal = _c.value;
                    var sourceFile = _this.getSourceFileForLiteral(literal);
                    remember(literal);
                    if (sourceFile == null)
                        _this.unresolvedLiterals.push(literal);
                    else
                        _this.addNodeInThis(literal, sourceFile);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
        });
    };
    SourceFileReferenceContainer.prototype.getSourceFileForLiteral = function (literal) {
        var parent = literal.getParentOrThrow();
        var grandParent = parent.getParent();
        if (TypeGuards_1.TypeGuards.isImportDeclaration(parent) || TypeGuards_1.TypeGuards.isExportDeclaration(parent))
            return parent.getModuleSpecifierSourceFile();
        else if (grandParent != null && TypeGuards_1.TypeGuards.isImportEqualsDeclaration(grandParent))
            return grandParent.getExternalModuleReferenceSourceFile();
        else if (TypeGuards_1.TypeGuards.isCallExpression(parent)) {
            var literalSymbol = literal.getSymbol();
            if (literalSymbol != null)
                return compiler_1.ModuleUtils.getReferencedSourceFileFromSymbol(literalSymbol);
        }
        else
            this.sourceFile.global.logger.warn("Unknown import string literal parent: " + parent.getKindName());
        return undefined;
    };
    SourceFileReferenceContainer.prototype.addNodeInThis = function (literal, sourceFile) {
        this.nodesInThis.set(literal, sourceFile);
        sourceFile._referenceContainer.nodesInOther.set(literal, sourceFile);
    };
    return SourceFileReferenceContainer;
}());
exports.SourceFileReferenceContainer = SourceFileReferenceContainer;
