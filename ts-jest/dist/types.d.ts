import * as _ts from 'typescript';
export interface TsJestGlobalOptions {
    tsConfig?: boolean | string | _ts.CompilerOptions;
    tsconfig?: boolean | string | _ts.CompilerOptions;
    packageJson?: boolean | string | object;
    isolatedModules?: boolean;
    compiler?: string;
    astTransformers?: string[];
    diagnostics?: boolean | {
        pretty?: boolean;
        ignoreCodes?: number | string | (number | string)[];
        pathRegex?: RegExp | string;
        warnOnly?: boolean;
    };
    babelConfig?: boolean | string | BabelConfig;
    stringifyContentPathRegex?: string | RegExp;
}
interface TsJestConfig$tsConfig$file {
    kind: 'file';
    value: string | undefined;
}
interface TsJestConfig$tsConfig$inline {
    kind: 'inline';
    value: _ts.CompilerOptions;
}
declare type TsJestConfig$tsConfig = TsJestConfig$tsConfig$file | TsJestConfig$tsConfig$inline | undefined;
interface TsJestConfig$diagnostics {
    pretty: boolean;
    ignoreCodes: number[];
    pathRegex?: string | undefined;
    throws: boolean;
    warnOnly?: boolean;
}
interface TsJestConfig$babelConfig$file {
    kind: 'file';
    value: string | undefined;
}
interface TsJestConfig$babelConfig$inline {
    kind: 'inline';
    value: BabelConfig;
}
declare type TsJestConfig$babelConfig = TsJestConfig$babelConfig$file | TsJestConfig$babelConfig$inline | undefined;
interface TsJestConfig$packageJson$file {
    kind: 'file';
    value: string | undefined;
}
interface TsJestConfig$packageJson$inline {
    kind: 'inline';
    value: any;
}
declare type TsJestConfig$packageJson = TsJestConfig$packageJson$file | TsJestConfig$packageJson$inline | undefined;
declare type TsJestConfig$stringifyContentPathRegex = string | undefined;
export interface TsJestConfig {
    tsConfig: TsJestConfig$tsConfig;
    packageJson: TsJestConfig$packageJson;
    isolatedModules: boolean;
    compiler: string;
    diagnostics: TsJestConfig$diagnostics;
    babelConfig: TsJestConfig$babelConfig;
    transformers: string[];
    stringifyContentPathRegex: TsJestConfig$stringifyContentPathRegex;
}
export interface TsCompiler {
    program: _ts.Program | undefined;
}
export declare type TSFiles = Map<string, TSFile>;
export interface TSFile {
    text?: string;
    output?: string;
    version: number;
    projectReference?: {
        project?: _ts.ResolvedProjectReference;
        outputFileName?: string;
    };
}
export {};
