import { TSConfigUpdate } from './ts-update';
import Serverless from 'serverless';
export declare class ServerlessSecure {
    private yawn;
    hooks: object;
    private isYaml;
    private ApiKey;
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
    private baseLayer;
    constructor(serverless?: Serverless, options?: any);
    apply(): Promise<void>;
    beforeFile(): void;
    afterPath(): Promise<void>;
    beforePath(): Promise<void>;
    static parseHttpPath(_path: string): string;
    pathExists(_path: string): Promise<boolean>;
    updateEnv(content: Serverless): any;
    updateCustom(content: Serverless): any;
    updateLayers(content: Serverless): any;
    updateApiKeys(content: {
        provider: any;
    }): unknown[];
    setOptions(ele: any): Promise<void>;
    updateFunctions(content: Serverless, opath: any): Promise<any>;
    updateSession(content: Serverless, opath: string): Promise<any>;
    contentUpdate(_content: any): any;
    parseYAML(_content: any): Promise<void>;
    parseTS(_content: Serverless): Promise<void>;
    formatIpaddress(ips: string[], opath?: string): string;
    setList(ips: any[], Effect: any, opath: any): {
        Effect: string;
        Principal: string;
        Action: string;
        Resource: string;
        Condition: {
            IpAddress: {
                'aws:SourceIp': string;
            };
        };
    } & {
        Effect: any;
        Condition: {
            IpAddress: {
                aws: {
                    SourceIp: string;
                };
            };
        };
    };
    mapWhitelist(content: any, opath: string, commands: any): Promise<void>;
    mapSecure(content: Serverless, opath: any, commands: any): Promise<Serverless>;
    sortKeys(data: object): {
        [k: string]: any;
    };
    mapSecureYML(_content: Serverless, opath: any, commands: any): Promise<void>;
    ignoreErrors(sourceFile: TSConfigUpdate): any;
    writeTS(sourceFile: TSConfigUpdate): Promise<void>;
    writeYAML(content: Serverless): Promise<void>;
    mkdirRecursively(folderpath: any): boolean;
    downloadSecureLayer(): Promise<void>;
    unZipPackage(zip: any, data: any): Promise<void>;
    deleteFolder(extractPath: string): Promise<void>;
    notification(message: string, type: string): void;
}
