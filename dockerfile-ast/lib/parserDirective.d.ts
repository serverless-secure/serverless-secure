import { TextDocument, Range } from 'vscode-languageserver-types';
import { Directive } from './main';
import { Line } from './line';
export declare class ParserDirective extends Line {
    private readonly nameRange;
    private readonly valueRange;
    constructor(document: TextDocument, range: Range, nameRange: Range, valueRange: Range);
    toString(): string;
    getNameRange(): Range;
    getValueRange(): Range;
    getName(): string;
    getValue(): string;
    getDirective(): Directive | null;
}
