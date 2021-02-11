"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSConfigUpdate = void 0;
var ts_morph_1 = require("ts-morph");
var stringify_object_1 = __importDefault(require("stringify-object"));
var require_from_string_1 = __importDefault(require("require-from-string"));
var TSConfigUpdate = (function () {
    function TSConfigUpdate(source) {
        this.project = new ts_morph_1.Project({
            useInMemoryFileSystem: true,
            manipulationSettings: {
                quoteKind: ts_morph_1.QuoteKind.Single,
                indentationText: ts_morph_1.IndentationText.TwoSpaces,
            },
            compilerOptions: {
                lib: ['es2017'],
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                sourceMap: false,
                allowJs: true,
                removeComments: false
            }
        });
        this.setSourceFile(source);
    }
    TSConfigUpdate.prototype.setSourceFile = function (source) {
        try {
            this.sourceFile = this.project.createSourceFile('/file.ts', source);
            this.addDataProp = this.sourceFile
                .getVariableDeclarationOrThrow('serverlessConfiguration')
                .getInitializerOrThrow();
            this.configElement = this.sourceFile
                .getVariableDeclarationOrThrow('serverlessConfiguration')
                .getInitializerOrThrow();
        }
        catch (error) {
            console.log(error.message);
        }
    };
    TSConfigUpdate.prototype.getSourceFile = function () {
        return this.sourceFile.getSourceFile();
    };
    TSConfigUpdate.prototype.getConfigElement = function () {
        return require_from_string_1.default('const secure = ' +
            this.addDataProp.getText() +
            '\n module.exports = secure;');
    };
    TSConfigUpdate.prototype.getDataProp = function () {
        return this.addDataProp;
    };
    TSConfigUpdate.prototype.getProperties = function () {
        return this.addDataProp.getProperties();
    };
    TSConfigUpdate.prototype.getProperty = function (prop) {
        try {
            return this.addDataProp.getPropertyOrThrow(prop);
        }
        catch (error) {
            console.log(error.message);
            return {};
        }
    };
    TSConfigUpdate.prototype.updateProperty = function (name, content) {
        try {
            this.removeProperty(name);
            this.getDataProp()
                .addPropertyAssignment({
                name: name,
                initializer: stringify_object_1.default(content)
            });
        }
        catch (error) {
            console.log(error.message);
        }
    };
    TSConfigUpdate.prototype.removeProperty = function (prop) {
        try {
            this.getProperty(prop).remove();
        }
        catch (error) {
            console.log(error.message);
        }
    };
    return TSConfigUpdate;
}());
exports.TSConfigUpdate = TSConfigUpdate;
