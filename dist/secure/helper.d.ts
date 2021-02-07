/// <reference types="node" />
import AWS, { Serverless, Event } from 'serverless/plugins/aws/provider/awsProvider';
import crypto from 'crypto';
export declare const parseHttpPath: (_path: string) => string;
export declare const sortKeys: (data: object) => {
    [k: string]: any;
};
export declare const findValuesDeepByKey: (obj: any, key: any, res?: any[]) => any[];
export declare const updateCustom: (content: Serverless) => {
    [k: string]: any;
};
export declare const updateLayers: (content: Serverless) => AWS.Layers & {
    SecureDependenciesNodeModule: {
        path: string;
        description: string;
    };
};
export declare const updateEnv: (content: Serverless) => any;
export declare const parseData: (data: any) => any;
export declare const updateApiKeys: (content: {
    provider: any;
}) => unknown[];
export declare const updateSession: (content: any, opath: string) => Promise<any>;
export declare const getPolicyType: (arnType: any, word: any) => any[];
export declare const setOptions: (events: any) => Promise<void>;
export declare const updateFunctions: (content: any, opath: string) => AWS.Functions;
export declare const cleanFunction: (ele: Event) => void;
export declare const setList: (ips: any[], opath: any, List: any) => any;
export declare const formatIpaddress: (ips: string[], opath?: string) => string;
export declare const generateKeys: (passphrase: any) => crypto.KeyPairSyncResult<string, string>;
export declare const compileResourcePolicy: (_this: any, commands: any) => AWS.ResourcePolicy;
declare const _default: {
    compileResourcePolicy: (_this: any, commands: any) => AWS.ResourcePolicy;
    findValuesDeepByKey: (obj: any, key: any, res?: any[]) => any[];
    updateFunctions: (content: any, opath: string) => AWS.Functions;
    formatIpaddress: (ips: string[], opath?: string) => string;
    cleanFunction: (ele: AWS.Event) => void;
    updateApiKeys: (content: {
        provider: any;
    }) => unknown[];
    updateSession: (content: any, opath: string) => Promise<any>;
    getPolicyType: (arnType: any, word: any) => any[];
    generateKeys: (passphrase: any) => crypto.KeyPairSyncResult<string, string>;
    updateCustom: (content: AWS.Serverless) => {
        [k: string]: any;
    };
    updateEnv: (content: AWS.Serverless) => any;
    updateLayers: (content: AWS.Serverless) => AWS.Layers & {
        SecureDependenciesNodeModule: {
            path: string;
            description: string;
        };
    };
    parseData: (data: any) => any;
    sortKeys: (data: object) => {
        [k: string]: any;
    };
    setList: (ips: any[], opath: any, List: any) => any;
};
export default _default;
