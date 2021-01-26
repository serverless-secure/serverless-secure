"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Remy Suen. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const flag_1 = require("./flag");
const instruction_1 = require("./instruction");
class ModifiableInstruction extends instruction_1.Instruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
    getFlags() {
        if (!this.flags) {
            this.flags = [];
            for (let arg of this.getArguments()) {
                let value = arg.getValue();
                if (this.stopSearchingForFlags(value)) {
                    return this.flags;
                }
                else if (value.indexOf("--") === 0) {
                    let range = arg.getRange();
                    let rawValue = this.document.getText().substring(this.document.offsetAt(range.start), this.document.offsetAt(range.end));
                    let nameIndex = value.indexOf('=');
                    let index = rawValue.indexOf('=');
                    let firstMatch = false;
                    let secondMatch = false;
                    let startIndex = -1;
                    nameSearchLoop: for (let i = 0; i < rawValue.length; i++) {
                        switch (rawValue.charAt(i)) {
                            case '\\':
                            case ' ':
                            case '\t':
                            case '\r':
                            case '\n':
                                break;
                            case '-':
                                if (secondMatch) {
                                    startIndex = i;
                                    break nameSearchLoop;
                                }
                                else if (firstMatch) {
                                    secondMatch = true;
                                }
                                else {
                                    firstMatch = true;
                                }
                                break;
                            default:
                                startIndex = i;
                                break nameSearchLoop;
                        }
                    }
                    let nameStart = this.document.positionAt(this.document.offsetAt(range.start) + startIndex);
                    if (index === -1) {
                        this.flags.push(new flag_1.Flag(this.document, range, value.substring(2), vscode_languageserver_types_1.Range.create(nameStart, range.end), null, null));
                    }
                    else if (index === value.length - 1) {
                        let nameEnd = this.document.positionAt(this.document.offsetAt(range.start) + index);
                        this.flags.push(new flag_1.Flag(this.document, range, value.substring(2, index), vscode_languageserver_types_1.Range.create(nameStart, nameEnd), "", vscode_languageserver_types_1.Range.create(range.end, range.end)));
                    }
                    else {
                        let nameEnd = this.document.positionAt(this.document.offsetAt(range.start) + index);
                        this.flags.push(new flag_1.Flag(this.document, range, value.substring(2, nameIndex), vscode_languageserver_types_1.Range.create(nameStart, nameEnd), value.substring(nameIndex + 1), vscode_languageserver_types_1.Range.create(this.document.positionAt(this.document.offsetAt(range.start) + index + 1), range.end)));
                    }
                }
            }
        }
        return this.flags;
    }
    getArguments() {
        const args = super.getArguments();
        const flags = this.getFlags();
        if (flags.length === 0) {
            return args;
        }
        for (let i = 0; i < flags.length; i++) {
            args.shift();
        }
        return args;
    }
}
exports.ModifiableInstruction = ModifiableInstruction;
