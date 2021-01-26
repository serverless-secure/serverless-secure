import { Range, TextDocument } from 'vscode-languageserver-types';
import { FlagOption } from './flagOption';
export declare class Flag {
    private readonly range;
    private readonly name;
    private readonly nameRange;
    private readonly value;
    private readonly valueRange;
    private readonly options;
    constructor(document: TextDocument, range: Range, name: string, nameRange: Range, value: string | null, valueRange: Range | null);
    private createFlagOption;
    toString(): string;
    /**
     * Returns the range that encompasses this entire flag. This includes the
     * -- prefix in the beginning to the last character of the flag's value (if
     * it has been defined).
     *
     * @return the entire range of this flag
     */
    getRange(): Range;
    /**
     * Returns the name of this flag. The name does not include the -- prefix.
     * Thus, for HEALTHCHECK's --interval flag, interval is the flag's name and
     * not --interval.
     *
     * @return this flag's name
     */
    getName(): string;
    /**
     * Returns the range that encompasses the flag's name
     *
     * @return the range containing the flag's name
     */
    getNameRange(): Range;
    /**
     * Returns the value that has been set to this flag. May be null if the
     * flag is invalid and has no value set like a --start-period. If the flag
     * is instead a --start-period= with an equals sign then the flag's value
     * is the empty string.
     *
     * @return this flag's value if it has been defined, null otherwise
     */
    getValue(): string | null;
    /**
     * Returns the range that encompasses this flag's value. If no value has
     * been set then null will be returned.
     *
     * @return the range containing this flag's value, or null if the flag
     *         has no value defined
     */
    getValueRange(): Range | null;
    getOption(name: string): FlagOption | null;
    getOptions(): FlagOption[];
    hasOptions(): boolean;
}
