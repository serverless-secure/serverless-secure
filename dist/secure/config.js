"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.secureLayer = exports.secureConfig = exports.corsConfig = exports.keyConfig = exports.envConfig = exports.ZIP_URL = exports.ZIP_FILE = exports.SEC_PATH = void 0;
exports.SEC_PATH = 'secure_layer';
exports.ZIP_FILE = 'secure-layer.zip';
exports.ZIP_URL = 'https://serverless-secure-files.s3-ap-southeast-1.amazonaws.com/secure-layer.zip';
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
