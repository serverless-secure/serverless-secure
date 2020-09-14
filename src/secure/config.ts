export const SEC_PATH = 'secure_layer';
export const ZIP_FILE = 'secure-layer.zip';
export const ZIP_URL = 'https://dev-api.serverless-secure.com/layers/';
export const envConfig = {
  STAGE: '${self:provider.stage}'
}
export const keyConfig = {
  SLS_SECRET_KEY: 'MySecureKey'
}
export const corsConfig = {
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
export const secureConfig = {
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
}
export const secureLayer = {
  SecureDependenciesNodeModule: { path: 'secure_layer', description: 'secure dependencies' }
}
export const slsCommands = {
  secure: {
    usage: 'How to secure your lambdas',
    lifecycleEvents: ['init', 'create'],
    options: {
      path: {
        usage:
          'Specify what function you wish to secure: --path <Function Name> or -p <*>',
        required: false,
        shortcut: 'p',
      },
    }
  },
  encrypt: {
    usage: 'How to secure your lambdas',
    lifecycleEvents: ['init', 'create'],
    options: {
      path: {
        usage:
          'Specify what function you wish to secure: --path <Function Name> or -p <*>',
        required: false,
        shortcut: 'p',
      },
    }
  },
  monitor: {
    usage: 'How to secure your lambdas',
    lifecycleEvents: ['init', 'create'],
    options: {
      path: {
        usage:
          'Specify what function you wish to secure: --path <Function Name> or -p <*>',
        required: false,
        shortcut: 'p',
      },
    }
  }
}