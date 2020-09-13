import { TSConfigUpdate } from './ts-update';
import Serverless from 'serverless';
import * as _ from 'lodash';
export declare class ServerlessSecure {
    private yawn;
    hooks: object;
    private isYaml;
    commands: object;
    private content;
    private serverless;
    private sourceFile;
    private functionList;
    options: {
        path: string;
        p: string;
    };
    private baseTS;
    private baseYAML;
    constructor(serverless?: Serverless, options?: any);
    apply(): Promise<void>;
    beforeFile(): void;
    afterPath(): Promise<void>;
    beforePath(): Promise<void>;
    static parseHttpPath(_path: string): string;
    pathExists(_path: string): Promise<boolean>;
    updateEnv(content: {
        [x: string]: any;
    }): any;
    updateCustom(content: {
        [x: string]: any;
    }): any;
    updateLayers(content: {
        [x: string]: any;
    }): any;
    updateApiKeys(content: {
        provider: any;
    }): unknown[];
    updateFunctions(content: {
        [x: string]: any;
    }): Promise<any>;
    contentUpdate(_content: any): any;
    parseTS(_content: any): Promise<any>;
    parseYAML(_content: any): Promise<any>;
    ignoreErrors(sourceFile: TSConfigUpdate): string;
    writeTS(sourceFile: TSConfigUpdate): Promise<void>;
    writeYAML(content: Serverless): Promise<void>;
    mkdirRecursively(folderpath: any): boolean;
    downloadSecureLayer(): Promise<void>;
    unZipPackage(zip: any, data: any): Promise<void>;
    deleteFile(extractPath: string): Promise<void>;
    notification(message: string, type: string): void;
    parseFile(arr: _.List<unknown> | null | undefined, top: number | undefined, bot: number | undefined): any;
}
