import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: "serverless-secure-authorizer"
  },
  frameworkVersion: ">=1.72.0",
  custom: {
    prune: { automatic: true, number: 1, includeLayers: true },
    domainConf:
    {
      dev: { domainName: 'dev-api.serverless-secure.com' },
      prd: { domainName: 'api.serverless-secure.com' },
      test: { domainName: 'test-api.serverless-secure.com' }
    },
    customDomain:
    {
      domainName: '${self:custom.domainConf.${self:provider.stage}.domainName}',
      basePath: 'auth',
      certificateName: 'serverless-secure.com',
      stage: '${self:provider.stage}',
      createRoute53Record: true
    },
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true
    },
    // test test
    corsValue: {
      origin: "*",
      headers: [
        "Content-Type",
        "X-Amz-Date",
        "Authorization",
        "X-Api-Key",
        "X-Amz-Security-Token",
        "X-Amz-User-Agent",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin",
        "x-app-token",
        "x-user-token",
        "Cache-Control"
      ],
      allowCredentials: true
    }
  },
  plugins: [
    "serverless-webpack",
    "serverless-secure",
    "serverless-offline",
    'serverless-pseudo-parameters',
    'serverless-prune-plugin',
    'serverless-domain-manager',
  ],
  provider: {
    region: '${opt:region, \'ap-southeast-1\'}',
    stage: '${opt:stage, \'dev\'}',
    name: "aws",
    runtime: "nodejs12.x",
    apiGateway: {
      minimumCompressionSize: 1024
    },
    environment: {
      STAGE: '${self:provider.stage}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1"
    },
    versionFunctions: true,
    apiKeys: [
      "sls-secure-auth-prd"
    ]
  },
          
  functions: {
    hello: {
      handler: "handler.hello",
      events: [
        {
          http: {
            method: "get",
            path: "hello",
            // @ts-ignore
            cors: "${self:custom.corsValue}",
            // @ts-ignore
            authorizer: "secureAuthorizer"
          }
        }
      ]
    },
    secureToken: {
      handler: "secure_layer/handler.secureToken",
      events: [
        {
          http: {
            path: "secure_token",
            method: "post",
            private: true
          }
        }
      ]
    },
    secureAuthorizer: {
      handler: "secure_layer/handler.secureAuthorizer"
    }
  },
  resources: undefined,
  package: {},
  layers: {
    	SecureDependenciesNodeModule: {
    		path: 'secure_layer',
    		description: 'secure dependencies'
    	}
    }
}

module.exports = serverlessConfiguration;
