/// <reference types="node" />
import AWS, { Serverless, Event } from 'serverless/plugins/aws/provider/awsProvider';
import crypto from 'crypto';
export declare const enCryptMessage: (message: any, publicKey: any) => Promise<string>;
export declare const deCryptMessage: (en_message: any, privateKey: any, passphrase: any) => Promise<string>;
export declare const parseHttpPath: (_path: string) => string;
export declare const sortKeys: (data: object) => {
    [k: string]: any;
};
export declare const findValuesDeepByKey: (obj: any, key: any, res?: any[]) => any[];
export declare const updateCustom: (content: any) => {
    [k: string]: any;
};
export declare const updateLayers: (content: Serverless, commands: any) => (AWS.Layers & {
    SecureDependenciesNodeModule: {
        path: string;
        description: string;
    };
}) | (AWS.Layers & {
    SecretDependenciesNodeModule: {
        path: string;
        description: string;
    };
});
export declare const updateEnv: (content: Serverless) => any;
export declare const parseData: (data: any) => any;
export declare const updateApiKeys: (content: Serverless) => string[];
export declare const updateSession: (content: any, opath: string) => Promise<any>;
export declare const getPolicyType: (arnType: any, word: any) => any[];
export declare const setOptions: (events: any) => Promise<void>;
export declare const updateFunctions: (content: any, opath: string) => AWS.Functions;
export declare const cleanFunction: (ele: Event) => void;
export declare const setList: (ips: any[], opath: any, List: any) => any;
export declare const formatIpaddress: (ips: string[], opath?: string) => string;
export declare const generateKeys: (passphrase: any) => crypto.KeyPairSyncResult<string, string>;
export declare const mkdirRecursively: (folderpath: any, _this: any) => boolean;
export declare const downloadSecureLayer: (Layer: any, _this: any) => Promise<void>;
export declare const unZipPackage: (zip: any, data: any, Layer: string, _this: any) => Promise<void>;
export declare const compileResourcePolicy: (_this: any, commands: any) => AWS.ResourcePolicy;
declare const _default: {
    compileResourcePolicy: (_this: any, commands: any) => AWS.ResourcePolicy;
    findValuesDeepByKey: (obj: any, key: any, res?: any[]) => any[];
    downloadSecureLayer: (Layer: any, _this: any) => Promise<void>;
    updateFunctions: (content: any, opath: string) => AWS.Functions;
    formatIpaddress: (ips: string[], opath?: string) => string;
    cleanFunction: (ele: AWS.Event) => void;
    updateApiKeys: (content: AWS.Serverless) => string[];
    updateSession: (content: any, opath: string) => Promise<any>;
    getPolicyType: (arnType: any, word: any) => any[];
    generateKeys: (passphrase: any) => crypto.KeyPairSyncResult<string, string>;
    updateCustom: (content: any) => {
        [k: string]: any;
    };
    updateEnv: (content: AWS.Serverless) => any;
    updateLayers: (content: AWS.Serverless, commands: any) => (AWS.Layers & {
        SecureDependenciesNodeModule: {
            path: string;
            description: string;
        };
    }) | (AWS.Layers & {
        SecretDependenciesNodeModule: {
            path: string;
            description: string;
        };
    });
    parseData: (data: any) => any;
    sortKeys: (data: object) => {
        [k: string]: any;
    };
    setList: (ips: any[], opath: any, List: any) => any;
};
export default _default;
