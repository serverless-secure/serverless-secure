export declare const SEC_PATH = "secure_layer";
export declare const ZIP_FILE = "secure-layer.zip";
export declare const ZIP_URL: string;
export declare const envConfig: {
    STAGE: string;
};
export declare const keyConfig: {
    SLS_SECRET_KEY: string;
};
export declare const whiteList: {
    Effect: string;
    Principal: string;
    Action: string;
    Resource: string;
    Condition: {
        IpAddress: {
            'aws:SourceIp': string;
        };
    };
};
export declare const sessionFunc: (name: any) => {
    [x: number]: {
        handler: string;
        events: {
            http: {
                method: string;
                path: string;
                cors: string;
                authorizer: string;
            };
        }[];
    };
};
export declare const secureFunc: (name: any) => {
    [x: number]: {
        handler: string;
        events: {
            http: {
                method: string;
                path: string;
                cors: string;
                authorizer: string;
            };
        }[];
    };
};
export declare const corsConfig: {
    corsValue: {
        origin: string;
        headers: string[];
        allowCredentials: boolean;
    };
};
export declare const secureConfig: {
    secureToken: {
        handler: string;
        events: {
            http: {
                path: string;
                method: string;
                cors: string;
                private: boolean;
            };
        }[];
    };
    secureAuthorizer: {
        handler: string;
    };
};
export declare const secureLayer: {
    SecureDependenciesNodeModule: {
        path: string;
        description: string;
    };
};
export declare const slsCommands: {
    secure: {
        usage: string;
        lifecycleEvents: string[];
        options: {
            path: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
        };
    };
    "secure-session": {
        usage: string;
        lifecycleEvents: string[];
        options: {
            path: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
        };
    };
    "secure-whitelist": {
        usage: string;
        lifecycleEvents: string[];
        options: {
            ip: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
        };
    };
    "secure-blacklist": {
        usage: string;
        lifecycleEvents: string[];
        options: {
            ip: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
        };
    };
};
