import { TextDocument, Range } from 'vscode-languageserver-types';
import { Instruction } from './instruction';
import { Dockerfile } from './dockerfile';
export declare class Parser {
    private escapeChar;
    static createInstruction(document: TextDocument, dockerfile: Dockerfile, escapeChar: string, lineRange: Range, instruction: string, instructionRange: Range): Instruction;
    private getParserDirectives;
    parse(buffer: string): Dockerfile;
}
