import * as tslint from "tslint";
import * as ts from "typescript";
import { SonarRuleMetaData } from "../sonarRule";
export declare class Rule extends tslint.Rules.TypedRule {
    static metadata: SonarRuleMetaData;
    static MESSAGE: string;
    applyWithProgram(sourceFile: ts.SourceFile): tslint.RuleFailure[];
}
