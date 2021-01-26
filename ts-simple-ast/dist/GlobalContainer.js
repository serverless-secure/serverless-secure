"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var codeBlockWriter_1 = require("./codeBlockWriter");
var compiler_1 = require("./compiler");
var errors = require("./errors");
var factories_1 = require("./factories");
var fileSystem_1 = require("./fileSystem");
var options_1 = require("./options");
var utils_1 = require("./utils");
var createWrappedNode_1 = require("./utils/compiler/createWrappedNode");
/**
 * Global container.
 * @internal
 */
var GlobalContainer = /** @class */ (function () {
    function GlobalContainer(fileSystemWrapper, compilerOptions, opts) {
        var _this = this;
        this._manipulationSettings = new options_1.ManipulationSettingsContainer();
        this._compilerOptions = new options_1.CompilerOptionsContainer();
        this._logger = new utils_1.ConsoleLogger();
        this._fileSystemWrapper = fileSystemWrapper;
        this._compilerOptions.set(compilerOptions);
        this._compilerFactory = new factories_1.CompilerFactory(this);
        this._structurePrinterFactory = new factories_1.StructurePrinterFactory(function () { return _this.manipulationSettings.getFormatCodeSettings(); });
        this._lazyReferenceCoordinator = new utils_1.LazyReferenceCoordinator(this._compilerFactory);
        this._directoryCoordinator = new fileSystem_1.DirectoryCoordinator(this._compilerFactory, fileSystemWrapper);
        this._languageService = opts.createLanguageService ? new compiler_1.LanguageService(this) : undefined;
        if (opts.typeChecker != null) {
            errors.throwIfTrue(opts.createLanguageService, "Cannot specify a type checker and create a language service.");
            this._customTypeChecker = new compiler_1.TypeChecker(this);
            this._customTypeChecker.reset(function () { return opts.typeChecker; });
        }
    }
    Object.defineProperty(GlobalContainer.prototype, "fileSystemWrapper", {
        /** Gets the file system wrapper. */
        get: function () {
            return this._fileSystemWrapper;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalContainer.prototype, "compilerOptions", {
        /** Gets the compiler options. */
        get: function () {
            return this._compilerOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalContainer.prototype, "manipulationSettings", {
        /** Gets the manipulation settings. */
        get: function () {
            return this._manipulationSettings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalContainer.prototype, "compilerFactory", {
        /** Gets the compiler factory. */
        get: function () {
            return this._compilerFactory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalContainer.prototype, "structurePrinterFactory", {
        /** Gets the structure printer factory. */
        get: function () {
            return this._structurePrinterFactory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalContainer.prototype, "languageService", {
        /** Gets the language service. Throws an exception if it doesn't exist. */
        get: function () {
            if (this._languageService == null)
                throw this.getToolRequiredError("language service");
            return this._languageService;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalContainer.prototype, "program", {
        /**
         * Gets the program.
         */
        get: function () {
            if (this._languageService == null)
                throw this.getToolRequiredError("program");
            return this.languageService.getProgram();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalContainer.prototype, "typeChecker", {
        /**
         * Gets the type checker.
         */
        get: function () {
            if (this._customTypeChecker != null)
                return this._customTypeChecker;
            if (this._languageService == null)
                throw this.getToolRequiredError("type checker");
            return this.program.getTypeChecker();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalContainer.prototype, "logger", {
        /**
         * Gets the logger.
         */
        get: function () {
            return this._logger;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalContainer.prototype, "lazyReferenceCoordinator", {
        /** Gets the lazy reference coordinator. */
        get: function () {
            return this._lazyReferenceCoordinator;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GlobalContainer.prototype, "directoryCoordinator", {
        /** Gets the directory coordinator. */
        get: function () {
            return this._directoryCoordinator;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets if this object has a language service.
     */
    GlobalContainer.prototype.hasLanguageService = function () {
        return this._languageService != null;
    };
    /**
     * Gets the encoding.
     */
    GlobalContainer.prototype.getEncoding = function () {
        return this.compilerOptions.get().charset || "utf-8";
    };
    /**
     * Helper for getting the format code settings.
     */
    GlobalContainer.prototype.getFormatCodeSettings = function () {
        return this.manipulationSettings.getFormatCodeSettings();
    };
    /**
     * Helper for getting the user preferences.
     */
    GlobalContainer.prototype.getUserPreferences = function () {
        return this.manipulationSettings.getUserPreferences();
    };
    /**
     * Resets the program.
     */
    GlobalContainer.prototype.resetProgram = function () {
        this.languageService.resetProgram();
    };
    /**
     * Creates a code block writer.
     */
    GlobalContainer.prototype.createWriter = function () {
        var indentationText = this.manipulationSettings.getIndentationText();
        return new codeBlockWriter_1.CodeBlockWriter({
            newLine: this.manipulationSettings.getNewLineKindAsString(),
            indentNumberOfSpaces: indentationText === options_1.IndentationText.Tab ? undefined : indentationText.length,
            useTabs: indentationText === options_1.IndentationText.Tab,
            useSingleQuote: this.manipulationSettings.getQuoteKind() === compiler_1.QuoteKind.Single
        });
    };
    GlobalContainer.prototype.getToolRequiredError = function (name) {
        return new errors.InvalidOperationError("A " + name + " is required for this operation. " +
            "This might occur when manipulating or getting type information from a node that was not added " +
            ("to a Project object and created via " + "createWrappedNode" + ". ") +
            ("Please submit a bug report if you don't believe a " + name + " should be required for this operation."));
    };
    return GlobalContainer;
}());
exports.GlobalContainer = GlobalContainer;
