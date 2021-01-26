/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const ast = require("./main");
const imageTemplate_1 = require("./imageTemplate");
const from_1 = require("./instructions/from");
const util_1 = require("./util");
const main_1 = require("./main");
class Dockerfile extends imageTemplate_1.ImageTemplate {
    constructor(document) {
        super();
        this.initialInstructions = new imageTemplate_1.ImageTemplate();
        this.buildStages = [];
        this.directives = [];
        /**
         * Whether a FROM instruction has been added to this Dockerfile or not.
         */
        this.foundFrom = false;
        this.document = document;
    }
    getEscapeCharacter() {
        for (const directive of this.directives) {
            if (directive.getDirective() === ast.Directive.escape) {
                const value = directive.getValue();
                if (value === '\\' || value === '`') {
                    return value;
                }
            }
        }
        return '\\';
    }
    getInitialARGs() {
        return this.initialInstructions.getARGs();
    }
    getContainingImage(position) {
        let range = vscode_languageserver_types_1.Range.create(vscode_languageserver_types_1.Position.create(0, 0), this.document.positionAt(this.document.getText().length));
        if (!util_1.Util.isInsideRange(position, range)) {
            // not inside the document, invalid position
            return null;
        }
        if (this.initialInstructions.getComments().length > 0 || this.initialInstructions.getInstructions().length > 0) {
            if (util_1.Util.isInsideRange(position, this.initialInstructions.getRange())) {
                return this.initialInstructions;
            }
        }
        for (const buildStage of this.buildStages) {
            if (util_1.Util.isInsideRange(position, buildStage.getRange())) {
                return buildStage;
            }
        }
        return this;
    }
    addInstruction(instruction) {
        if (instruction.getKeyword() === main_1.Keyword.FROM) {
            this.currentBuildStage = new imageTemplate_1.ImageTemplate();
            this.buildStages.push(this.currentBuildStage);
            this.foundFrom = true;
        }
        else if (!this.foundFrom) {
            this.initialInstructions.addInstruction(instruction);
        }
        if (this.foundFrom) {
            this.currentBuildStage.addInstruction(instruction);
        }
        super.addInstruction(instruction);
    }
    setDirectives(directives) {
        this.directives = directives;
    }
    getDirective() {
        return this.directives.length === 0 ? null : this.directives[0];
    }
    getDirectives() {
        return this.directives;
    }
    resolveVariable(variable, line) {
        for (let from of this.getFROMs()) {
            let range = from.getRange();
            if (range.start.line <= line && line <= range.end.line) {
                // resolve the FROM variable against the initial ARGs
                let initialARGs = new imageTemplate_1.ImageTemplate();
                for (let instruction of this.initialInstructions.getARGs()) {
                    initialARGs.addInstruction(instruction);
                }
                return initialARGs.resolveVariable(variable, line);
            }
        }
        let image = this.getContainingImage(vscode_languageserver_types_1.Position.create(line, 0));
        if (image === null) {
            return undefined;
        }
        let resolvedVariable = image.resolveVariable(variable, line);
        if (resolvedVariable === null) {
            // refers to an uninitialized ARG variable,
            // try resolving it against the initial ARGs then
            let initialARGs = new imageTemplate_1.ImageTemplate();
            for (let instruction of this.initialInstructions.getARGs()) {
                initialARGs.addInstruction(instruction);
            }
            return initialARGs.resolveVariable(variable, line);
        }
        return resolvedVariable;
    }
    getAvailableVariables(currentLine) {
        if (this.getInstructionAt(currentLine) instanceof from_1.From) {
            let variables = [];
            for (let arg of this.getInitialARGs()) {
                let property = arg.getProperty();
                if (property) {
                    variables.push(property.getName());
                }
            }
            return variables;
        }
        let image = this.getContainingImage(vscode_languageserver_types_1.Position.create(currentLine, 0));
        return image ? image.getAvailableVariables(currentLine) : [];
    }
    /**
     * Internally reorganize the comments in the Dockerfile and allocate
     * them to the relevant build stages that they belong to.
     */
    organizeComments() {
        const comments = this.getComments();
        for (let i = 0; i < comments.length; i++) {
            if (util_1.Util.isInsideRange(comments[i].getRange().end, this.initialInstructions.getRange())) {
                this.initialInstructions.addComment(comments[i]);
            }
            else {
                for (const buildStage of this.buildStages) {
                    if (util_1.Util.isInsideRange(comments[i].getRange().start, buildStage.getRange())) {
                        buildStage.addComment(comments[i]);
                    }
                }
            }
        }
    }
    getRange() {
        const comments = this.getComments();
        const instructions = this.getInstructions();
        let range = null;
        if (comments.length === 0) {
            if (instructions.length > 0) {
                range = vscode_languageserver_types_1.Range.create(instructions[0].getRange().start, instructions[instructions.length - 1].getRange().end);
            }
        }
        else if (instructions.length === 0) {
            range = vscode_languageserver_types_1.Range.create(comments[0].getRange().start, comments[comments.length - 1].getRange().end);
        }
        else {
            const commentStart = comments[0].getRange().start;
            const commentEnd = comments[comments.length - 1].getRange().end;
            const instructionStart = instructions[0].getRange().start;
            const instructionEnd = instructions[instructions.length - 1].getRange().end;
            if (commentStart.line < instructionStart.line) {
                if (commentEnd.line < instructionEnd.line) {
                    range = vscode_languageserver_types_1.Range.create(commentStart, instructionEnd);
                }
                range = vscode_languageserver_types_1.Range.create(commentStart, commentEnd);
            }
            else if (commentEnd.line < instructionEnd.line) {
                range = vscode_languageserver_types_1.Range.create(instructionStart, instructionEnd);
            }
            else {
                range = vscode_languageserver_types_1.Range.create(instructionStart, commentEnd);
            }
        }
        if (range === null) {
            if (this.directives.length === 0) {
                return null;
            }
            return this.directives[0].getRange();
        }
        else if (this.directives.length === 0) {
            return range;
        }
        return vscode_languageserver_types_1.Range.create(this.directives[0].getRange().start, range.end);
    }
}
exports.Dockerfile = Dockerfile;
