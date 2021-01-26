import * as tslint from "tslint";
import * as ts from "typescript";
import { SonarRuleMetaData } from "../sonarRule";
export declare class Rule extends tslint.Rules.AbstractRule {
    static metadata: SonarRuleMetaData;
    static DEFAULT_THRESHOLD: number;
    private readonly threshold;
    static message(complexity: number, threshold: number): string;
    apply(sourceFile: ts.SourceFile): tslint.RuleFailure[];
}
