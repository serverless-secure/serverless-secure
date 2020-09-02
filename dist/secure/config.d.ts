export declare const SEC_PATH = "secure_layer";
export declare const ZIP_FILE = "secure-layer.zip";
export declare const ZIP_URL = "https://serverless-secure-files.s3-ap-southeast-1.amazonaws.com/secure-layer.zip";
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
