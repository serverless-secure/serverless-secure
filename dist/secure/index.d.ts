import { ConfigUpdate } from './config.update';
import Serverless from 'serverless';
import * as _ from 'lodash';
export declare class ServerlessSecure {
    private baseTS;
    private baseYAML;
    private content;
    private yawn;
    private isYaml;
    private serverless;
    private sourceFile;
    private functionList;
    commands: object;
    options: {
        path: string;
        p: string;
    };
    hooks: object;
    constructor(serverless?: Serverless, options?: any);
    apply(): Promise<void>;
    beforeFile(): void;
    beforePath(): Promise<void>;
    afterPath(): Promise<void>;
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
    ignoreErrors(sourceFile: any): string;
    writeTS(sourceFile: ConfigUpdate): Promise<void>;
    writeYAML(content: Serverless): Promise<void>;
    downloadSecureLayer(): Promise<void>;
    unZipPackage(extractPath: string, _path: string): Promise<void>;
    deleteFile(extractPath: string): Promise<void>;
    notification(message: string, type: string): void;
    parseFile(arr: _.List<unknown> | null | undefined, top: number | undefined, bot: number | undefined): any;
}
