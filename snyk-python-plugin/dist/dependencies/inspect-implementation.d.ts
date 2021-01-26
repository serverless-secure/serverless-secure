import { legacyCommon } from '@snyk/cli-interface';
export declare function getMetaData(command: string, baseargs: string[], root: string, targetFile: string): Promise<{
    name: string;
    runtime: string;
    targetFile: string;
}>;
export declare function inspectInstalledDeps(command: string, baseargs: string[], root: string, targetFile: string, allowMissing: boolean, includeDevDeps: boolean, args?: string[]): Promise<legacyCommon.DepTree>;
export declare function buildArgs(targetFile: string, allowMissing: boolean, tempDirPath: string, includeDevDeps: boolean, extraArgs?: string[]): string[];
