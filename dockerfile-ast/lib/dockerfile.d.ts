import { TextDocument, Range, Position } from 'vscode-languageserver-types';
import * as ast from './main';
import { ParserDirective } from './parserDirective';
import { ImageTemplate } from './imageTemplate';
import { Instruction } from './instruction';
import { Arg } from './instructions/arg';
export declare class Dockerfile extends ImageTemplate implements ast.Dockerfile {
    private readonly document;
    private readonly initialInstructions;
    private readonly buildStages;
    private currentBuildStage;
    private directives;
    /**
     * Whether a FROM instruction has been added to this Dockerfile or not.
     */
    private foundFrom;
    constructor(document: TextDocument);
    getEscapeCharacter(): string;
    getInitialARGs(): Arg[];
    getContainingImage(position: Position): ImageTemplate | null;
    addInstruction(instruction: Instruction): void;
    setDirectives(directives: ParserDirective[]): void;
    getDirective(): ParserDirective | null;
    getDirectives(): ParserDirective[];
    resolveVariable(variable: string, line: number): string | null | undefined;
    getAvailableVariables(currentLine: number): string[];
    /**
     * Internally reorganize the comments in the Dockerfile and allocate
     * them to the relevant build stages that they belong to.
     */
    organizeComments(): void;
    getRange(): Range | null;
}
