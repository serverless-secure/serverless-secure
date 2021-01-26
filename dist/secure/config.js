"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.slsCommands = exports.secureLayer = exports.secureConfig = exports.corsConfig = exports.keyConfig = exports.envConfig = exports.ZIP_URL = exports.ZIP_FILE = exports.SEC_PATH = void 0;
exports.SEC_PATH = 'secure_layer';
exports.ZIP_FILE = 'secure-layer.zip';
exports.ZIP_URL = 'https://dev-api.serverless-secure.com/layers/';
exports.envConfig = {
    STAGE: '${self:provider.stage}'
};
exports.keyConfig = {
    SLS_SECRET_KEY: 'MySecureKey'
};
exports.corsConfig = {
    corsValue: {
        origin: '*',
        headers: [
            'Content-Type',
            'X-Amz-Date',
            'Authorization',
            'X-Api-Key',
            'X-Amz-Security-Token',
            'X-Amz-User-Agent',
            'Access-Control-Allow-Headers',
            'Access-Control-Allow-Origin',
            'x-app-token',
            'x-user-token',
            'Cache-Control'
        ],
        allowCredentials: true
    }
};
exports.secureConfig = {
    secureToken: {
        handler: 'secure_layer/handler.secureToken',
        events: [
            {
                http: {
                    path: 'secure_token',
                    method: 'post',
                    cors: '${self:custom.corsValue}',
                    private: true
                }
            }
        ]
    },
    secureAuthorizer: {
        handler: 'secure_layer/handler.secureAuthorizer'
    }
};
exports.secureLayer = {
    SecureDependenciesNodeModule: { path: 'secure_layer', description: 'secure dependencies' }
};
exports.slsCommands = (_a = {
        secure: {
            usage: 'How to secure your lambdas',
            lifecycleEvents: ['init', 'create'],
            options: {
                path: {
                    usage: 'Specify which function you wish to secure: --path <Function Name> or -p <*>',
                    required: false,
                    shortcut: 'p',
                },
            }
        }
    },
    _a['secure-session'] = {
        usage: 'How to secure your lambdas',
        lifecycleEvents: ['init', 'create'],
        options: {
            path: {
                usage: 'Specify your session function: --path <Function Name> or -p <*>',
                required: false,
                shortcut: 'p',
            },
        }
    },
    _a.encrypt = {
        usage: 'How to encrypt your lambdas',
        lifecycleEvents: ['init', 'create'],
        options: {
            path: {
                usage: 'Specify what function you wish to encrypt: --path <Function Name> or -p <*>',
                required: false,
                shortcut: 'p',
            },
        }
    },
    _a.monitor = {
        usage: 'How to monitor your lambdas',
        lifecycleEvents: ['init', 'create'],
        options: {
            path: {
                usage: 'Specify what function you wish to monitor: --path <Function Name> or -p <*>',
                required: false,
                shortcut: 'p',
            },
        }
    },
    _a);
