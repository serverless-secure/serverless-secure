export const SEC_PATH = 'secure_layer';
export const ZIP_FILE = 'secure-layer.zip';
export const ZIP_URL = 'https://serverless-secure-files.s3-ap-southeast-1.amazonaws.com/secure-layer.zip';
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