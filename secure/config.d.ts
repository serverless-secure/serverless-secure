export declare const SEC_PATH = "secure_layer";
export declare const ZIP_FILE = "secure-layer.zip";
export declare const ZIP_URL = "https://dev-api.serverless-secure.com/layers/";
export declare const envConfig: {
    STAGE: string;
};
export declare const keyConfig: {
    SLS_SECRET_KEY: string;
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
    encrypt: {
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
    monitor: {
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
};
