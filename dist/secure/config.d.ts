import { ServerlessSecure } from ".";
export declare const SEC_PATH = "secure_layer";
export declare const ZIP_FILE = "secure-layer.zip";
export declare const ZIP_URL: string;
export declare const PARSE_URL: string;
export declare const PUBLIC_KEY = "\n-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyYspBP77GlN1VPHCb2CWKvIJ2OgPOZKmqSzvOR+W+mpitTBepZrvCExLbHPAuH7zm6Ikc4UK2lIAL0A5EzD0HyW3LMPMgk6NhvcYt3z70WCsa+XRA5H2foSyfSNfH3ZVFb+QC3gWU86la3AjteDwGyl/nMJ+oFpQzHSEKchTEkidr8M7371DM35ObEr7NzxJAmcVOQVLqWpNNYNW7ShMtnhYFHEFokHRpRNubeV39XyKlagCiTbhUkj19c3IWEwi5G4Uup9ydiJAdifS2Y3mMu58utZYsiQRPfV6kVHl9/sZwXSh4QnhwQz2YrhYVIZdCqXL3/NV7ds/9Ai1jzmv2QIDAQAB\n-----END PUBLIC KEY-----";
export declare const hooks: (_this: ServerlessSecure) => {
    'before:package:finalize': any;
    'before:secure:init': any;
    'before:secure:create': any;
    'after:secure:create': any;
    'before:secure-key:init': any;
    'before:secure-key:create': any;
    'after:secure-key:create': any;
    'before:secure-blacklist:init': any;
    'before:secure-blacklist:create': any;
    'before:secure-whitelist:init': any;
    'before:secure-whitelist:create': any;
    'before:secure-policy:init': any;
    'before:secure-policy:create': any;
    'after:secure-policy:create': any;
    'before:secure-session:init': any;
    'before:secure-session:create': any;
    'after:secure-session:create': any;
    'before:secure-secret:init': any;
    'before:secure-secret:create': any;
    'after:secure-secret:create': any;
};
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
export declare const secretFunc: (name: any) => {
    [x: number]: {
        handler: string;
        events: {
            http: {
                method: string;
                path: string;
                cors: string;
            };
        }[];
    };
    secretAuthorizer: {
        handler: string;
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
export declare const secretLayer: {
    SecretDependenciesNodeModule: {
        path: string;
        description: string;
    };
};
export declare const input: {
    usage: string;
    required: boolean;
    shortcut: string;
};
export declare const out: {
    usage: string;
    required: boolean;
    shortcut: string;
};
export declare const slsCommands: {
    secure: {
        usage: string;
        lifecycleEvents: string[];
        options: {
            input: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            out: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            path: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
        };
    };
    'secure-key': {
        usage: string;
        lifecycleEvents: string[];
        options: {
            passphrase: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
        };
    };
    "secure-policy": {
        usage: string;
        lifecycleEvents: string[];
        options: {
            Action: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            Arn: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            Condition: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            Path: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            Policy: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            Resource: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            Sid: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
        };
    };
    "secure-secret": {
        usage: string;
        lifecycleEvents: string[];
        options: {
            input: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            out: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            passphrase: {
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
            input: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            out: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            path: {
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
            input: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            out: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            ip: {
                usage: string;
                required: boolean;
            };
        };
    };
    "secure-whitelist": {
        usage: string;
        lifecycleEvents: string[];
        options: {
            input: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            out: {
                usage: string;
                required: boolean;
                shortcut: string;
            };
            ip: {
                usage: string;
                required: boolean;
            };
        };
    };
};
declare const _default: {
    ZIP_URL: string;
    corsConfig: {
        corsValue: {
            origin: string;
            headers: string[];
            allowCredentials: boolean;
        };
    };
    secureConfig: {
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
    secureLayer: {
        SecureDependenciesNodeModule: {
            path: string;
            description: string;
        };
    };
    keyConfig: {
        SLS_SECRET_KEY: string;
    };
    slsCommands: {
        secure: {
            usage: string;
            lifecycleEvents: string[];
            options: {
                input: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                out: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                path: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
            };
        };
        'secure-key': {
            usage: string;
            lifecycleEvents: string[];
            options: {
                passphrase: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
            };
        };
        "secure-policy": {
            usage: string;
            lifecycleEvents: string[];
            options: {
                Action: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                Arn: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                Condition: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                Path: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                Policy: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                Resource: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                Sid: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
            };
        };
        "secure-secret": {
            usage: string;
            lifecycleEvents: string[];
            options: {
                input: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                out: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                passphrase: {
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
                input: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                out: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                path: {
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
                input: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                out: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                ip: {
                    usage: string;
                    required: boolean;
                };
            };
        };
        "secure-whitelist": {
            usage: string;
            lifecycleEvents: string[];
            options: {
                input: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                out: {
                    usage: string;
                    required: boolean;
                    shortcut: string;
                };
                ip: {
                    usage: string;
                    required: boolean;
                };
            };
        };
    };
    whiteList: {
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
    sessionFunc: (name: any) => {
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
    secureFunc: (name: any) => {
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
    secretFunc: (name: any) => {
        [x: number]: {
            handler: string;
            events: {
                http: {
                    method: string;
                    path: string;
                    cors: string;
                };
            }[];
        };
        secretAuthorizer: {
            handler: string;
        };
    };
    hooks: (_this: ServerlessSecure) => {
        'before:package:finalize': any;
        'before:secure:init': any;
        'before:secure:create': any;
        'after:secure:create': any;
        'before:secure-key:init': any;
        'before:secure-key:create': any;
        'after:secure-key:create': any;
        'before:secure-blacklist:init': any;
        'before:secure-blacklist:create': any;
        'before:secure-whitelist:init': any;
        'before:secure-whitelist:create': any;
        'before:secure-policy:init': any;
        'before:secure-policy:create': any;
        'after:secure-policy:create': any;
        'before:secure-session:init': any;
        'before:secure-session:create': any;
        'after:secure-session:create': any;
        'before:secure-secret:init': any;
        'before:secure-secret:create': any;
        'after:secure-secret:create': any;
    };
};
export default _default;
