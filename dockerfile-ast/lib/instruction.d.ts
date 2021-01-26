import { TextDocument, Range } from 'vscode-languageserver-types';
import { Dockerfile } from './dockerfile';
import { Line } from './line';
import { Argument } from './argument';
import { Variable } from './variable';
export declare class Instruction extends Line {
    protected readonly dockerfile: Dockerfile;
    protected readonly escapeChar: string;
    private readonly instruction;
    private readonly instructionRange;
    constructor(document: TextDocument, range: Range, dockerfile: Dockerfile, escapeChar: string, instruction: string, instructionRange: Range);
    toString(): string;
    protected getRangeContent(range: Range | null): string | null;
    getInstructionRange(): Range;
    getInstruction(): string;
    getKeyword(): string;
    getArgumentsRange(): Range | null;
    getArgumentsRanges(): Range[];
    getRawArgumentsContent(): string | null;
    getArgumentsContent(): string | null;
    getArguments(): Argument[];
    private getRawArguments;
    getExpandedArguments(): Argument[];
    getVariables(): Variable[];
    private parseVariables;
    private isBuildVariable;
}
