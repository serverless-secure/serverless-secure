"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigUpdate = void 0;
var ts_morph_1 = require("ts-morph");
var stringify_object_1 = __importDefault(require("stringify-object"));
var require_from_string_1 = __importDefault(require("require-from-string"));
var ConfigUpdate = (function () {
    function ConfigUpdate(source) {
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
    ConfigUpdate.prototype.setSourceFile = function (source) {
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
    ConfigUpdate.prototype.getSourceFile = function () {
        return this.sourceFile.getSourceFile();
    };
    ConfigUpdate.prototype.getConfigElement = function () {
        return require_from_string_1.default('const secure = ' +
            this.addDataProp.getText() +
            '\n module.exports = secure;');
    };
    ConfigUpdate.prototype.getDataProp = function () {
        return this.addDataProp;
    };
    ConfigUpdate.prototype.getProperties = function () {
        return this.addDataProp.getProperties();
    };
    ConfigUpdate.prototype.getProperty = function (prop) {
        try {
            return this.addDataProp.getPropertyOrThrow(prop);
        }
        catch (error) {
            console.log(error.message);
            return {};
        }
    };
    ConfigUpdate.prototype.updateProperty = function (name, content) {
        this.removeProperty(name);
        try {
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
    ConfigUpdate.prototype.removeProperty = function (prop) {
        try {
            this.getProperty(prop).remove();
        }
        catch (error) {
            console.log(error.message);
        }
    };
    return ConfigUpdate;
}());
exports.ConfigUpdate = ConfigUpdate;
