import { TextDocument, Range } from 'vscode-languageserver-types';
import { Argument } from './argument';
export declare class Property {
    private document;
    private escapeChar;
    private readonly range;
    private readonly nameRange;
    private readonly name;
    private readonly valueRange;
    private readonly value;
    constructor(document: TextDocument, escapeChar: string, arg: Argument, arg2?: Argument);
    getRange(): Range;
    getName(): string;
    getNameRange(): Range;
    getValue(): string | null;
    getValueRange(): Range | null;
    /**
     * Returns the value of this property including any enclosing
     * single or double quotes and relevant escape characters.
     * Escaped newlines and its associated contiguous whitespace
     * characters however will not be returned as they are deemed to
     * be uninteresting to clients trying to return a Dockerfile.
     *
     * @return the unescaped value of this property or null if this
     *         property has no associated value
     */
    getUnescapedValue(): string | null;
    private static getNameRange;
    private static getValueRange;
    /**
     * Returns the actual value of this key-value pair. The value will
     * have its escape characters removed if applicable. If the value
     * spans multiple lines and there are comments nested within the
     * lines, they too will be removed.
     *
     * @return the value that this key-value pair will actually be, may
     *         be null if no value is defined, may be the empty string
     *         if the value only consists of whitespace
     */
    private static getValue;
}
