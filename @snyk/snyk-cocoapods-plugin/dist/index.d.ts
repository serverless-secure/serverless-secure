import { SingleSubprojectInspectOptions, SinglePackageResult } from '@snyk/cli-interface/legacy/plugin';
export interface CocoaPodsInspectOptions extends SingleSubprojectInspectOptions {
    strictOutOfSync?: boolean;
}
export declare function inspect(root: string, targetFile?: string, options?: CocoaPodsInspectOptions): Promise<SinglePackageResult>;
export declare class OutOfSyncError extends Error {
    code: number;
    name: string;
    constructor(manifestFileName: string, lockfileName: string);
}
