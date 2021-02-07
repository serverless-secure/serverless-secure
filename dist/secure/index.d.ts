import { TSConfigUpdate } from './ts-update';
import Serverless from 'serverless';
import Service from 'serverless/classes/Service';
export declare class ServerlessSecure {
    private yawn;
    hooks: object;
    private isYaml;
    private ApiKey;
    commands: object;
    private content;
    private serverless;
    private sourceFile;
    private KeyMetadata;
    private functionList;
    options: {
        path: string;
        p: string;
    };
    private baseTS;
    private baseYAML;
    private baseLayer;
    private secureTS;
    private secureYAML;
    private SSMdata;
    private keyArn;
    private secretArn;
    private secretPath;
    policy: any[];
    valid: Service;
    keyName: string;
    Passphrase: any;
    constructor(serverless?: Serverless, options?: any);
    apply(): void;
    beforeFile(): void;
    afterPath(): Promise<void>;
    beforePath(): Promise<void>;
    setFilePath(): void;
    pathExists(_path: string): Promise<boolean>;
    getcompleteFunction(): {}[];
    contentUpdate(_content: any, commands: string): any;
    parseConfigFile(_content: Serverless): Promise<void>;
    mapPolicies(content: any, commands: string): Promise<any>;
    assignContent(content: any, provider: any, resourcePolicy: any): Promise<any>;
    mapSecure(content: Serverless, opath: any, commands: any): Promise<Serverless>;
    mapSecureYML(_content: Serverless, opath: any, commands: any): Promise<Serverless>;
    AWSCLIData(provider: string, options: any[]): any;
    createKey(): Promise<void>;
    setMetaData(Passphrase: string): Promise<void>;
    setSecretKey(): Promise<void>;
    buildRSA(Passphrase: string): Promise<void>;
    mkdirRecursively(folderpath: any): boolean;
    downloadSecureLayer(Layer: any): Promise<void>;
    unZipPackage(zip: any, data: any, Layer: string): Promise<void>;
    deleteFolder(extractPath: string): Promise<void>;
    ignoreErrors(sourceFile: TSConfigUpdate): any;
    writeTS(sourceFile: TSConfigUpdate): Promise<void>;
    writeYAML(content: Serverless): Promise<void>;
    searchReference(): void;
    listReference(): void;
    notification(message: string, type?: string): void;
}
