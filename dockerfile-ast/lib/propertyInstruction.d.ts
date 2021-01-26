import { TextDocument, Range } from 'vscode-languageserver-types';
import { Dockerfile } from './dockerfile';
import { Instruction } from './instruction';
import { Property } from './property';
import { Argument } from './argument';
export declare abstract class PropertyInstruction extends Instruction {
    private properties;
    constructor(document: TextDocument, range: Range, dockerfile: Dockerfile, escapeChar: string, instruction: string, instructionRange: Range);
    getProperties(): Property[];
    /**
     * Goes from the back of the string and returns the first
     * non-whitespace character that is found. If an escape character
     * is found with newline characters, the escape character will
     * not be considered a non-whitespace character and its index in
     * the string will not be returned.
     *
     * @param content the string to search through
     * @return the index in the string for the first non-whitespace
     *         character when searching from the end of the string
     */
    private findTrailingNonWhitespace;
    getPropertyArguments(): Argument[];
}
