
export const CONCURRENCE_HOME = '402882153924';

export const envConfig = {
    "STAGE": "${self:provider.stage}"
}
export const corsConfig = {
    "corsValue": {
        "origin": "*",
        "headers": [
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
        "allowCredentials": true
    }
};

export const customConfig = {
    "concurrence": {
        "sentinelArn": `arn:aws:sns:ap-southeast-1:${CONCURRENCE_HOME}` + ":concurrence-sentinel-topic-${self:provider.stage}"
      },
    "authorizer": {
        "name": "ConcurrenceAuthorizer",
        "arn": `arn:aws:lambda:ap-southeast-1:${CONCURRENCE_HOME}` + ":function:sm-lambda-secure-${self:provider.stage}-concurrenceAuthorizer",
        "resultTtlInSeconds": 3600,
        "identitySource": "method.request.header.x-app-token,method.request.header.x-user-token",
        "type": "request"
    },
    "xLambdaAuthorizers": [
        {
          "Type": "REQUEST",
          "Name": "AuthAppTokenAuthorizer",
          "IdentitySource": "method.request.header.x-app-token",
          "AuthorizerCredentials": "arn:aws:iam::#{AWS::AccountId}:role/sm-sso-authorizer-invoke-role",
          "AuthorizerResultTtlInSeconds": 3600,
          "AuthorizerUri": {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":apigateway:",
                {
                  "Ref": "AWS::Region"
                },
                ":lambda:path/2015-03-31/functions/",
                {
                  "Fn::Sub": `arn:aws:lambda:ap-southeast-1:${CONCURRENCE_HOME}` + ":function:sm-lambda-secure-${self:provider.stage}-mobileCMSAuthApp"
                },
                "/invocations"
              ]
            ]
          }
        },
        {
          "Type": "REQUEST",
          "Name": "AuthAppAndUserTokenAuthorizer",
          "IdentitySource": "method.request.header.x-app-token,method.request.header.x-user-token",
          "AuthorizerCredentials": "arn:aws:iam::#{AWS::AccountId}:role/sm-sso-authorizer-invoke-role",
          "AuthorizerResultTtlInSeconds": 3600,
          "AuthorizerUri": {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":apigateway:",
                {
                  "Ref": "AWS::Region"
                },
                ":lambda:path/2015-03-31/functions/",
                {
                  "Fn::Sub": `arn:aws:lambda:ap-southeast-1:${CONCURRENCE_HOME}` + ":function:sm-lambda-secure-${self:provider.stage}-mobileCMSAuthAppAndUser"
                },
                "/invocations"
              ]
            ]
          }
        },
        {
          "Type": "REQUEST",
          "Name": "ConcurrenceAuthorizer",
          "IdentitySource": "method.request.header.x-app-token,method.request.header.x-user-token",
          "AuthorizerCredentials": "arn:aws:iam::493436326252:role/sm-sso-authorizer-invoke-role",
          "AuthorizerResultTtlInSeconds": 3600,
          "AuthorizerUri": {
            "Fn::Join": [
              "",
              [
                "arn:",
                {
                  "Ref": "AWS::Partition"
                },
                ":apigateway:",
                {
                  "Ref": "AWS::Region"
                },
                ":lambda:path/2015-03-31/functions/",
                {
                  "Fn::Sub": `arn:aws:lambda:ap-southeast-1:${CONCURRENCE_HOME}` + ":function:sm-lambda-secure-${self:provider.stage}-concurrenceAuthorizer"
                },
                "/invocations"
              ]
            ]
          }
        }
      ]
};

export const IAMConfig =  [
        {
            "Effect": "Allow",
            "Action": [
                "lambda:InvokeFunction"
            ],
            "Resource": [
                {
                    "Fn::Join": [
                        ":",
                        [
                            "arn:aws:lambda",
                            {
                                "Ref": "AWS::Region"
                            },
                            {
                                "Ref": "AWS::AccountId"
                            },
                            "function:${self:service}-${opt:stage, self:provider.stage}-*"
                        ]
                    ]
                }
            ]
        }
    ]