import { LockfileType } from '../parsers';
export declare class OutOfSyncError extends Error {
    code: number;
    name: string;
    dependencyName: string;
    lockFileType: string;
    constructor(dependencyName: string, lockFileType: LockfileType);
}
