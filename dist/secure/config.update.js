"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigUpdate = void 0;
var ts_morph_1 = require("ts-morph");
var path = __importStar(require("path"));
var stringify_object_1 = __importDefault(require("stringify-object"));
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
            this.project.addSourceFilesAtPaths(path.join(process.cwd(), 'serverless.ts'));
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
        return this.configElement;
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
