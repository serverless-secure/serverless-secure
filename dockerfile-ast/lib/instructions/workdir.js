"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const instruction_1 = require("../instruction");
class Workdir extends instruction_1.Instruction {
    constructor(document, range, dockerfile, escapeChar, instruction, instructionRange) {
        super(document, range, dockerfile, escapeChar, instruction, instructionRange);
    }
}
exports.Workdir = Workdir;
