/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const comment_1 = require("./comment");
const parserDirective_1 = require("./parserDirective");
const instruction_1 = require("./instruction");
const add_1 = require("./instructions/add");
const arg_1 = require("./instructions/arg");
const cmd_1 = require("./instructions/cmd");
const copy_1 = require("./instructions/copy");
const env_1 = require("./instructions/env");
const entrypoint_1 = require("./instructions/entrypoint");
const from_1 = require("./instructions/from");
const healthcheck_1 = require("./instructions/healthcheck");
const label_1 = require("./instructions/label");
const onbuild_1 = require("./instructions/onbuild");
const run_1 = require("./instructions/run");
const shell_1 = require("./instructions/shell");
const stopsignal_1 = require("./instructions/stopsignal");
const workdir_1 = require("./instructions/workdir");
const user_1 = require("./instructions/user");
const volume_1 = require("./instructions/volume");
const dockerfile_1 = require("./dockerfile");
class Parser {
    constructor() {
        this.escapeChar = null;
    }
    static createInstruction(document, dockerfile, escapeChar, lineRange, instruction, instructionRange) {
        switch (instruction.toUpperCase()) {
            case "ADD":
                return new add_1.Add(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "ARG":
                return new arg_1.Arg(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "CMD":
                return new cmd_1.Cmd(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "COPY":
                return new copy_1.Copy(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "ENTRYPOINT":
                return new entrypoint_1.Entrypoint(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "ENV":
                return new env_1.Env(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "FROM":
                return new from_1.From(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "HEALTHCHECK":
                return new healthcheck_1.Healthcheck(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "LABEL":
                return new label_1.Label(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "ONBUILD":
                return new onbuild_1.Onbuild(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "RUN":
                return new run_1.Run(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "SHELL":
                return new shell_1.Shell(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "STOPSIGNAL":
                return new stopsignal_1.Stopsignal(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "WORKDIR":
                return new workdir_1.Workdir(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "USER":
                return new user_1.User(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
            case "VOLUME":
                return new volume_1.Volume(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
        }
        return new instruction_1.Instruction(document, lineRange, dockerfile, escapeChar, instruction, instructionRange);
    }
    getParserDirectives(document, buffer) {
        // reset the escape directive in between runs
        const directives = [];
        this.escapeChar = '';
        directiveCheck: for (let i = 0; i < buffer.length; i++) {
            switch (buffer.charAt(i)) {
                case ' ':
                case '\t':
                    break;
                case '\r':
                case '\n':
                    // blank lines stop the parsing of directives immediately
                    break directiveCheck;
                case '#':
                    let commentStart = i;
                    let directiveStart = -1;
                    let directiveEnd = -1;
                    for (let j = i + 1; j < buffer.length; j++) {
                        let char = buffer.charAt(j);
                        switch (char) {
                            case ' ':
                            case '\t':
                                if (directiveStart !== -1 && directiveEnd === -1) {
                                    directiveEnd = j;
                                }
                                break;
                            case '\r':
                            case '\n':
                                break directiveCheck;
                            case '=':
                                let valueStart = -1;
                                let valueEnd = -1;
                                if (directiveEnd === -1) {
                                    directiveEnd = j;
                                }
                                // assume the line ends with the file
                                let lineEnd = buffer.length;
                                directiveValue: for (let k = j + 1; k < buffer.length; k++) {
                                    char = buffer.charAt(k);
                                    switch (char) {
                                        case '\r':
                                        case '\n':
                                            if (valueStart !== -1 && valueEnd === -1) {
                                                valueEnd = k;
                                            }
                                            // line break found, reset
                                            lineEnd = k;
                                            break directiveValue;
                                        case '\t':
                                        case ' ':
                                            if (valueStart !== -1 && valueEnd === -1) {
                                                valueEnd = k;
                                            }
                                            continue;
                                        default:
                                            if (valueStart === -1) {
                                                valueStart = k;
                                            }
                                            break;
                                    }
                                }
                                let lineRange = vscode_languageserver_types_1.Range.create(document.positionAt(commentStart), document.positionAt(lineEnd));
                                if (directiveStart === -1) {
                                    // no directive, it's a regular comment
                                    break directiveCheck;
                                }
                                if (valueStart === -1) {
                                    // no non-whitespace characters found, highlight all the characters then
                                    valueStart = j + 1;
                                    valueEnd = lineEnd;
                                }
                                else if (valueEnd === -1) {
                                    // reached EOF
                                    valueEnd = buffer.length;
                                }
                                let nameRange = vscode_languageserver_types_1.Range.create(document.positionAt(directiveStart), document.positionAt(directiveEnd));
                                let valueRange = vscode_languageserver_types_1.Range.create(document.positionAt(valueStart), document.positionAt(valueEnd));
                                directives.push(new parserDirective_1.ParserDirective(document, lineRange, nameRange, valueRange));
                                directiveStart = -1;
                                if (buffer.charAt(valueEnd) === '\r') {
                                    // skip over the \r
                                    i = valueEnd + 1;
                                }
                                else {
                                    i = valueEnd;
                                }
                                continue directiveCheck;
                            default:
                                if (directiveStart === -1) {
                                    directiveStart = j;
                                }
                                break;
                        }
                    }
                    break;
                default:
                    break directiveCheck;
            }
        }
        return directives;
    }
    parse(buffer) {
        let document = vscode_languageserver_types_1.TextDocument.create("", "", 0, buffer);
        let dockerfile = new dockerfile_1.Dockerfile(document);
        let directives = this.getParserDirectives(document, buffer);
        let offset = 0;
        this.escapeChar = '\\';
        if (directives.length > 0) {
            dockerfile.setDirectives(directives);
            this.escapeChar = dockerfile.getEscapeCharacter();
            // start parsing after the directives
            offset = document.offsetAt(vscode_languageserver_types_1.Position.create(directives.length, 0));
        }
        lineCheck: for (let i = offset; i < buffer.length; i++) {
            let char = buffer.charAt(i);
            switch (char) {
                case ' ':
                case '\t':
                case '\r':
                case '\n':
                    break;
                case '#':
                    for (let j = i + 1; j < buffer.length; j++) {
                        char = buffer.charAt(j);
                        switch (char) {
                            case '\r':
                                dockerfile.addComment(new comment_1.Comment(document, vscode_languageserver_types_1.Range.create(document.positionAt(i), document.positionAt(j))));
                                // offset one more for \r\n
                                i = j + 1;
                                continue lineCheck;
                            case '\n':
                                dockerfile.addComment(new comment_1.Comment(document, vscode_languageserver_types_1.Range.create(document.positionAt(i), document.positionAt(j))));
                                i = j;
                                continue lineCheck;
                        }
                    }
                    // reached EOF
                    let range = vscode_languageserver_types_1.Range.create(document.positionAt(i), document.positionAt(buffer.length));
                    dockerfile.addComment(new comment_1.Comment(document, range));
                    break lineCheck;
                default:
                    let instruction = char;
                    let instructionStart = i;
                    let instructionEnd = -1;
                    let lineRange = null;
                    let instructionRange = null;
                    let escapedInstruction = false;
                    instructionCheck: for (let j = i + 1; j < buffer.length; j++) {
                        char = buffer.charAt(j);
                        switch (char) {
                            case this.escapeChar:
                                escapedInstruction = true;
                                char = buffer.charAt(j + 1);
                                if (char === '\r') {
                                    // skip two for \r\n
                                    j += 2;
                                }
                                else if (char === '\n') {
                                    j++;
                                }
                                else if (char === ' ' || char === '\t') {
                                    for (let k = j + 2; k < buffer.length; k++) {
                                        switch (buffer.charAt(k)) {
                                            case ' ':
                                            case '\t':
                                                break;
                                            case '\r':
                                                // skip another for \r\n
                                                j = k + 1;
                                                continue instructionCheck;
                                            case '\n':
                                                j = k;
                                                continue instructionCheck;
                                            default:
                                                instructionEnd = j + 1;
                                                instruction = instruction + this.escapeChar;
                                                j = k - 2;
                                                continue instructionCheck;
                                        }
                                    }
                                    instructionEnd = j + 1;
                                    instruction = instruction + this.escapeChar;
                                    break instructionCheck;
                                }
                                else {
                                    instructionEnd = j + 1;
                                    instruction = instruction + this.escapeChar;
                                }
                                break;
                            case ' ':
                            case '\t':
                                if (escapedInstruction) {
                                    // on an escaped newline, need to search for non-whitespace
                                    escapeCheck: for (let k = j + 1; k < buffer.length; k++) {
                                        switch (buffer.charAt(k)) {
                                            case ' ':
                                            case '\t':
                                                break;
                                            case '\r':
                                                // skip another for \r\n
                                                j = k + 1;
                                                continue instructionCheck;
                                            case '\n':
                                                j = k;
                                                continue instructionCheck;
                                            default:
                                                break escapeCheck;
                                        }
                                    }
                                    escapedInstruction = false;
                                }
                                if (instructionEnd === -1) {
                                    instructionEnd = j;
                                }
                                let escaped = false;
                                argumentsCheck: for (let k = j + 1; k < buffer.length; k++) {
                                    switch (buffer.charAt(k)) {
                                        case '\r':
                                        case '\n':
                                            if (escaped) {
                                                continue;
                                            }
                                            i = k;
                                            lineRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(k));
                                            instructionRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(instructionEnd));
                                            dockerfile.addInstruction(Parser.createInstruction(document, dockerfile, this.escapeChar, lineRange, instruction, instructionRange));
                                            continue lineCheck;
                                        case this.escapeChar:
                                            let next = buffer.charAt(k + 1);
                                            if (next === '\n') {
                                                escaped = true;
                                                k++;
                                            }
                                            else if (next === '\r') {
                                                escaped = true;
                                                // skip two chars for \r\n
                                                k = k + 2;
                                            }
                                            else if (next === ' ' || next === '\t') {
                                                escapeCheck: for (let l = k + 2; l < buffer.length; l++) {
                                                    switch (buffer.charAt(l)) {
                                                        case ' ':
                                                        case '\t':
                                                            break;
                                                        case '\r':
                                                            // skip another char for \r\n
                                                            escaped = true;
                                                            k = l + 1;
                                                            break escapeCheck;
                                                        case '\n':
                                                            escaped = true;
                                                            k = l;
                                                            break escapeCheck;
                                                        default:
                                                            k = l;
                                                            break escapeCheck;
                                                    }
                                                }
                                            }
                                            continue;
                                        case '#':
                                            if (escaped) {
                                                for (let l = k + 1; l < buffer.length; l++) {
                                                    switch (buffer.charAt(l)) {
                                                        case '\r':
                                                            dockerfile.addComment(new comment_1.Comment(document, vscode_languageserver_types_1.Range.create(document.positionAt(k), document.positionAt(l))));
                                                            // offset one more for \r\n
                                                            k = l + 1;
                                                            continue argumentsCheck;
                                                        case '\n':
                                                            let range = vscode_languageserver_types_1.Range.create(document.positionAt(k), document.positionAt(l));
                                                            dockerfile.addComment(new comment_1.Comment(document, range));
                                                            k = l;
                                                            continue argumentsCheck;
                                                    }
                                                }
                                                let range = vscode_languageserver_types_1.Range.create(document.positionAt(k), document.positionAt(buffer.length));
                                                dockerfile.addComment(new comment_1.Comment(document, range));
                                                break argumentsCheck;
                                            }
                                            break;
                                        case ' ':
                                        case '\t':
                                            break;
                                        default:
                                            if (escaped) {
                                                escaped = false;
                                            }
                                            break;
                                    }
                                }
                                // reached EOF
                                lineRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(buffer.length));
                                instructionRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(instructionEnd));
                                dockerfile.addInstruction(Parser.createInstruction(document, dockerfile, this.escapeChar, lineRange, instruction, instructionRange));
                                break lineCheck;
                            case '\r':
                                if (instructionEnd === -1) {
                                    instructionEnd = j;
                                }
                                // skip for \r\n
                                j++;
                            case '\n':
                                if (escapedInstruction) {
                                    continue;
                                }
                                if (instructionEnd === -1) {
                                    instructionEnd = j;
                                }
                                lineRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(instructionEnd));
                                dockerfile.addInstruction(Parser.createInstruction(document, dockerfile, this.escapeChar, lineRange, instruction, lineRange));
                                i = j;
                                continue lineCheck;
                            default:
                                instructionEnd = j + 1;
                                instruction = instruction + char;
                                break;
                        }
                    }
                    // reached EOF
                    if (instructionEnd === -1) {
                        instructionEnd = buffer.length;
                    }
                    lineRange = vscode_languageserver_types_1.Range.create(document.positionAt(instructionStart), document.positionAt(instructionEnd));
                    dockerfile.addInstruction(Parser.createInstruction(document, dockerfile, this.escapeChar, lineRange, instruction, lineRange));
                    break lineCheck;
            }
        }
        dockerfile.organizeComments();
        return dockerfile;
    }
}
exports.Parser = Parser;
