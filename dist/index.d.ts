/// <reference types="serverless" />
/// <reference types="lodash" />
declare module "secure/config" {
    export const SEC_PATH = "secure_layer";
    export const ZIP_FILE = "secure-layer.zip";
    export const ZIP_URL = "https://serverless-secure-files.s3-ap-southeast-1.amazonaws.com/secure-layer.zip";
    export const envConfig: {
        STAGE: string;
    };
    export const keyConfig: {
        SLS_SECRET_KEY: string;
    };
    export const corsConfig: {
        corsValue: {
            origin: string;
            headers: string[];
            allowCredentials: boolean;
        };
    };
    export const secureConfig: {
        secureToken: {
            handler: string;
            events: {
                http: {
                    path: string;
                    method: string;
                    private: boolean;
                };
            }[];
        };
        secureAuthorizer: {
            handler: string;
        };
    };
    export const secureLayer: {
        SecureDependenciesNodeModule: {
            path: string;
            description: string;
        };
    };
}
declare module "secure/config.update" {
    import { Project, PropertyAssignment, ObjectLiteralExpression, ObjectLiteralElementLike } from 'ts-morph';
    export class ConfigUpdate {
        project: Project;
        sourceFile: any;
        addDataProp: ObjectLiteralExpression;
        constructor(source: string);
        setSourceFile(source: string): void;
        getSourceFile(): any;
        getDataProp(): ObjectLiteralExpression;
        getProperties(): ObjectLiteralElementLike[];
        getProperty(prop: string): PropertyAssignment;
        updateProperty(name: string, content: object): void;
        removeProperty(prop: string): void;
    }
}
declare module "secure/index" {
    import { ConfigUpdate } from "secure/config.update";
    import Serverless from 'serverless';
    import * as _ from 'lodash';
    export class ServerlessSecure {
        private baseTS;
        private baseYAML;
        private content;
        private yawn;
        private isYaml;
        private serverless;
        private sourceFile;
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
        parseTS(_content: any): Promise<any>;
        parseYAML(_content: any): Promise<any>;
        writeTS(sourceFile: ConfigUpdate): Promise<void>;
        writeYAML(content: Serverless): Promise<void>;
        downloadSecureLayer(): Promise<void>;
        unZipPackage(extractPath: string, _path: string): Promise<void>;
        deleteFile(extractPath: string): Promise<void>;
        notification(message: string, type: string): void;
        parseFile(arr: _.List<unknown> | null | undefined, top: number | undefined, bot: number | undefined): any;
    }
}
declare module "index" {
    import { ServerlessSecure } from "secure/index";
    export = ServerlessSecure;
}
