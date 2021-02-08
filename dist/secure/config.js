"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.slsCommands = exports.out = exports.input = exports.secureLayer = exports.secureConfig = exports.corsConfig = exports.secretFunc = exports.secureFunc = exports.sessionFunc = exports.whiteList = exports.keyConfig = exports.envConfig = exports.hooks = exports.ZIP_URL = exports.ZIP_FILE = exports.SEC_PATH = void 0;
var path = __importStar(require("path"));
exports.SEC_PATH = 'secure_layer';
exports.ZIP_FILE = 'secure-layer.zip';
exports.ZIP_URL = process.env.ZIP_URL || 'https://api.serverless-secure.com/layers/';
exports.hooks = function (_this) { return ({
    'before:package:finalize': _this.apply.bind(_this),
    'before:secure:init': _this.beforeFile.bind(_this),
    'before:secure:create': _this.beforePath.bind(_this),
    'after:secure:create': _this.afterPath.bind(_this),
    'before:secure-key:init': _this.beforeFile.bind(_this),
    'before:secure-key:create': _this.createKey.bind(_this),
    'after:secure-key:create': _this.setSecretKey.bind(_this),
    'before:secure-blacklist:init': _this.beforeFile.bind(_this),
    'before:secure-blacklist:create': _this.beforePath.bind(_this),
    'before:secure-whitelist:init': _this.beforeFile.bind(_this),
    'before:secure-whitelist:create': _this.beforePath.bind(_this),
    'before:secure-policy:init': _this.beforeFile.bind(_this),
    'before:secure-policy:create': _this.searchReference.bind(_this),
    'after:secure-policy:create': _this.listReference.bind(_this),
    'before:secure-session:init': _this.beforeFile.bind(_this),
    'before:secure-session:create': _this.beforePath.bind(_this),
    'after:secure-session:create': _this.afterPath.bind(_this),
    'before:secure-secret:init': _this.beforeFile.bind(_this),
    'before:secure-secret:create': _this.createKey.bind(_this),
    'after:secure-secret:create': _this.afterPath.bind(_this),
}); };
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
            handler: path.dirname("/handler." + name),
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
            handler: path.dirname("/handler." + name),
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
exports.secretFunc = function (name) {
    var _a;
    return (_a = {},
        _a[name] = {
            handler: path.dirname("secret_layers/handler." + name),
            events: [
                {
                    http: {
                        method: 'post',
                        path: "" + name,
                        cors: '${self:custom.corsValue}'
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
        handler: path.dirname('secure_layer/handler.secureToken'),
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
        handler: path.dirname('secure_layer/handler.secureAuthorizer')
    }
};
exports.secureLayer = {
    SecureDependenciesNodeModule: { path: 'secure_layer', description: 'secure dependencies' }
};
exports.input = {
    usage: 'Define your secure input file: --input <filename> or --in <*>',
    required: false,
    shortcut: 'in',
};
exports.out = {
    usage: 'Define your secure output file: --out <filename> or --o <*>',
    required: false,
    shortcut: 'o',
};
exports.slsCommands = (_a = {
        secure: {
            usage: 'How to secure your lambda functions',
            lifecycleEvents: ['init', 'create'],
            options: {
                input: exports.input,
                out: exports.out,
                path: {
                    usage: 'Specify which function you wish to secure: --path <Function Name> or --p <*>',
                    required: false,
                    shortcut: 'p',
                }
            }
        },
        'secure-key': {
            usage: 'How to create a KMS Secret',
            lifecycleEvents: ['init', 'create'],
            options: {
                passphrase: {
                    usage: 'Specify Secrect Passphrase: --passphrase <Function Name> or --pass <*>',
                    required: true,
                    shortcut: 'pass',
                },
            }
        }
    },
    _a['secure-policy'] = {
        usage: 'How to secure your lambda policies',
        lifecycleEvents: ['init', 'create'],
        options: {
            Action: {
                usage: 'Reference your Action: --Action <Name> or --a <*>',
                required: false,
                shortcut: 'a',
            },
            Arn: {
                usage: 'Reference your Arn: --Arn <Name> or --arn <*>',
                required: false,
                shortcut: 'arn',
            },
            Condition: {
                usage: 'Reference your Condition: --Condition <Name> or --con <*>',
                required: false,
                shortcut: 'con',
            },
            Path: {
                usage: 'Reference your AWS Path: --Path <Name> or --p <*>',
                required: false,
                shortcut: 'p',
            },
            Policy: {
                usage: 'Reference your Policy: --Policy <Name>or --pol <*>',
                required: false,
                shortcut: 'pol',
            },
            Resource: {
                usage: 'Reference your Resource: --Resource <Name> or --r <*>',
                required: false,
                shortcut: 'r',
            },
            Sid: {
                usage: 'Reference your Sid: --Sid <Name> or --s <*>',
                required: false,
                shortcut: 's',
            }
        }
    },
    _a['secure-secret'] = {
        usage: 'How to secure all secrets via Encrypted KeyPairs',
        lifecycleEvents: ['init', 'create'],
        options: {
            input: exports.input,
            out: exports.out,
            passphrase: {
                usage: 'Specify Secrect Passphrase: --passphrase <Function Name> or --pass <*>',
                required: true,
                shortcut: 'pass',
            }
        }
    },
    _a['secure-session'] = {
        usage: 'How to session your lambda functions',
        lifecycleEvents: ['init', 'create'],
        options: {
            input: exports.input,
            out: exports.out,
            path: {
                usage: 'Specify your session function: --path <Function Name> or --p <*>',
                required: true,
                shortcut: 'p',
            }
        }
    },
    _a['secure-blacklist'] = {
        usage: 'How to blacklist your lambda functions',
        lifecycleEvents: ['init', 'create'],
        options: {
            input: exports.input,
            out: exports.out,
            ip: {
                usage: 'Specify your IPAddress: --ip <IPAddress>',
                required: false
            }
        }
    },
    _a['secure-whitelist'] = {
        usage: 'How to whitelist your lambda functions',
        lifecycleEvents: ['init', 'create'],
        options: {
            input: exports.input,
            out: exports.out,
            ip: {
                usage: 'Specify your IPAddress: --ip <IPAddress>',
                required: false
            }
        }
    },
    _a);
exports.default = {
    ZIP_URL: exports.ZIP_URL,
    corsConfig: exports.corsConfig,
    secureConfig: exports.secureConfig,
    secureLayer: exports.secureLayer,
    keyConfig: exports.keyConfig,
    slsCommands: exports.slsCommands,
    whiteList: exports.whiteList,
    sessionFunc: exports.sessionFunc,
    secureFunc: exports.secureFunc,
    secretFunc: exports.secretFunc,
    hooks: exports.hooks
};
