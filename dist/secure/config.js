"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.slsCommands = exports.secureLayer = exports.secureConfig = exports.corsConfig = exports.secureFunc = exports.sessionFunc = exports.whiteList = exports.keyConfig = exports.envConfig = exports.ZIP_URL = exports.ZIP_FILE = exports.SEC_PATH = void 0;
exports.SEC_PATH = 'secure_layer';
exports.ZIP_FILE = 'secure-layer.zip';
exports.ZIP_URL = 'https://test-api.serverless-secure.com/layers/pullzip/' || process.env.ZIP_URL;
exports.envConfig = {
    STAGE: '${self:provider.stage}'
};
exports.keyConfig = {
    SLS_SECRET_KEY: 'MySecureKey'
};
exports.whiteList = {
    Effect: 'Allow',
    Principal: '*',
    Action: 'execute-api:Invoke',
    Resource: '*',
    Condition: {
        IpAddress: {
            'aws:SourceIp': ''
        }
    }
};
exports.sessionFunc = function (name) {
    var _a;
    return (_a = {},
        _a[name] = {
            handler: "handler." + name,
            events: [
                {
                    http: {
                        method: 'post',
                        path: "/{session_id}/" + name,
                        cors: '${self:custom.corsValue}',
                        authorizer: 'secureAuthorizer'
                    }
                }
            ]
        },
        _a);
};
exports.secureFunc = function (name) {
    var _a;
    return (_a = {},
        _a[name] = {
            handler: "src/handler." + name,
            events: [
                {
                    http: {
                        method: 'get',
                        path: "" + name,
                        cors: '${self:custom.corsValue}',
                        authorizer: 'secureAuthorizer'
                    }
                }
            ]
        },
        _a);
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
            usage: 'How to secure your lambda functions',
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
        usage: 'How to session your lambda functions',
        lifecycleEvents: ['init', 'create'],
        options: {
            path: {
                usage: 'Specify your session function: --path <Function Name> or -p <*>',
                required: true,
                shortcut: 'p',
            },
        }
    },
    _a['secure-whitelist'] = {
        usage: 'How to whitelist your lambda functions',
        lifecycleEvents: ['init', 'create'],
        options: {
            ip: {
                usage: 'Specify your IPAddress: --ip <IPAddress> or -ip <*>',
                required: false,
                shortcut: 'ip',
            },
        }
    },
    _a['secure-blacklist'] = {
        usage: 'How to blacklist your lambda functions',
        lifecycleEvents: ['init', 'create'],
        options: {
            ip: {
                usage: 'Specify your IPAddress: --ip <IPAddress> or -ip <*>',
                required: false,
                shortcut: 'ip',
            },
        }
    },
    _a);
