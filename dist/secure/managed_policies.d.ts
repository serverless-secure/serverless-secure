declare const _default: {
    APIGatewayServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAccountActivityAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAccountUsageReportAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAgentlessDiscoveryService: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Sid?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAppMeshEnvoyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAppMeshFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAppMeshPreviewEnvoyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAppMeshPreviewServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAppMeshReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAppMeshServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAppSyncAdministrator: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                        "iam:AWSServiceName"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                        "iam:PassedToService"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAppSyncInvokeFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAppSyncPushToCloudWatchLogs: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAppSyncSchemaAuthor: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationAutoScalingCustomResourcePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationAutoscalingAppStreamFleetPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationAutoscalingComprehendEndpointPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationAutoscalingDynamoDBTablePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationAutoscalingEC2SpotFleetRequestPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationAutoscalingECSServicePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationAutoscalingEMRInstanceGroupPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationAutoscalingLambdaConcurrencyPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationAutoscalingRDSClusterPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationAutoscalingSageMakerEndpointPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationDiscoveryAgentAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSApplicationDiscoveryServiceFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSArtifactAccountSync: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSAutoScalingPlansEC2AutoScalingPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSB9InternalServicePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEqualsIfExists: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSBackupAdminPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSBackupOperatorPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSBackupServiceRolePolicyForBackup: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    Bool: {
                        "kms:GrantIsForAWSResource": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSBackupServiceRolePolicyForRestores: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "kms:ViaService": string[];
                    };
                    Bool?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    Bool: {
                        "kms:GrantIsForAWSResource": string;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSBatchFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSBatchServiceEventTargetRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSBatchServiceRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                        "iam:AWSServiceName"?: undefined;
                        "ec2:CreateAction"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string[];
                        "iam:PassedToService"?: undefined;
                        "ec2:CreateAction"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "ec2:CreateAction": string;
                        "iam:PassedToService"?: undefined;
                        "iam:AWSServiceName"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCertificateManagerFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCertificateManagerPrivateCAAuditor: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCertificateManagerPrivateCAFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCertificateManagerPrivateCAPrivilegedUser: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    StringLike: {
                        "acm-pca:TemplateArn": string[];
                    };
                    StringNotLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringNotLike: {
                        "acm-pca:TemplateArn": string[];
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCertificateManagerPrivateCAReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            };
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCertificateManagerPrivateCAUser: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    StringLike: {
                        "acm-pca:TemplateArn": string[];
                    };
                    StringNotLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringNotLike: {
                        "acm-pca:TemplateArn": string[];
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCertificateManagerReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            };
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSChatbotServiceLinkedRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloud9Administrator: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloud9EnvironmentMember: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    Null: {
                        "cloud9:EnvironmentId": string;
                        "cloud9:UserArn": string;
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloud9ServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "aws:RequestTag/Name": string;
                        "ec2:ResourceTag/aws:cloudformation:stack-name"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "ec2:ResourceTag/aws:cloudformation:stack-name": string;
                        "aws:RequestTag/Name"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloud9User: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    Null: {
                        "cloud9:OwnerArn": string;
                        "cloud9:UserArn"?: undefined;
                        "cloud9:EnvironmentId"?: undefined;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    Null: {
                        "cloud9:UserArn": string;
                        "cloud9:OwnerArn"?: undefined;
                        "cloud9:EnvironmentId"?: undefined;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    Null: {
                        "cloud9:EnvironmentId": string;
                        "cloud9:UserArn": string;
                        "cloud9:OwnerArn"?: undefined;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                    Null?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudFormationFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudFormationReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudFrontLogger: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudHSMFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudHSMReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudHSMRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudMapDiscoverInstanceAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudMapFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudMapReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudMapRegisterInstanceAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudTrailFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCloudTrailReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeBuildAdminAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "codestar-notifications:NotificationsForResource": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeBuildDeveloperAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "codestar-notifications:NotificationsForResource": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeBuildReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "codestar-notifications:NotificationsForResource": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeCommitFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid?: undefined;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "codestar-notifications:NotificationsForResource": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeCommitPowerUser: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid?: undefined;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "codestar-notifications:NotificationsForResource": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeCommitReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid?: undefined;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "codestar-notifications:NotificationsForResource": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeDeployDeployerAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "codestar-notifications:NotificationsForResource": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeDeployFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "codestar-notifications:NotificationsForResource": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeDeployReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "codestar-notifications:NotificationsForResource": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeDeployRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeDeployRoleForECS: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeDeployRoleForECSLimited: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "s3:ExistingObjectTag/UseWithCodeDeploy": string;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string[];
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeDeployRoleForLambda: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "s3:ExistingObjectTag/UseWithCodeDeploy": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodePipelineApproverAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodePipelineCustomActionAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodePipelineFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string[];
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "codestar-notifications:NotificationsForResource": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodePipelineReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "codestar-notifications:NotificationsForResource": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeStarFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeStarNotificationsServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringNotEquals: {
                        "aws:ResourceTag/ExcludeFileContentFromNotifications": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSCodeStarServiceRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    ArnEquals: {
                        "iam:PolicyArn": string[];
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                    ArnEquals?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSConfigMultiAccountSetupPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSConfigRemediationServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSConfigRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSConfigRoleForOrganizations: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSConfigRulesExecutionRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSConfigServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSConfigUserAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSConnector: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSControlTowerServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDataExchangeFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEqualsIgnoreCase: {
                        "s3:ExistingObjectTag/AWSDataExchange": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDataExchangeProviderFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "dataexchange:JobType": string[];
                    };
                    StringEqualsIgnoreCase?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEqualsIgnoreCase: {
                        "s3:ExistingObjectTag/AWSDataExchange": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDataExchangeReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDataExchangeSubscriberFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "dataexchange:JobType": string[];
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDataLifecycleManagerServiceRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDataPipelineRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDataPipeline_FullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string;
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDataPipeline_PowerUser: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string;
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDataSyncFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDataSyncReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDeepLensLambdaFunctionAccessPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDeepLensServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                    };
                    StringEqualsIfExists?: undefined;
                };
                Effect: string;
                Resource: string[];
                Sid: string;
            } | {
                Action: string[];
                Condition: {
                    StringEqualsIfExists: {
                        "iam:PassedToService": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string[];
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDeepRacerCloudFormationAccessPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLikeIfExists: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDeepRacerRoboMakerAccessPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEqualsIgnoreCase: {
                        "s3:ExistingObjectTag/DeepRacer": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDeepRacerServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                    StringEqualsIgnoreCase?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEqualsIgnoreCase: {
                        "s3:ExistingObjectTag/DeepRacer": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDenyAll: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDeviceFarmFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDirectConnectFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDirectConnectReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDirectoryServiceFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    "ForAllValues:StringLike": {
                        "organizations:ServicePrincipal": string[];
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDirectoryServiceReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSDiscoveryContinuousExportFirehosePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSEC2FleetServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                        "iam:PassedToService"?: undefined;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                        "iam:AWSServiceName"?: undefined;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string[];
                Sid?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "ec2:ResourceTag/aws:ec2:fleet-id": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSEC2SpotFleetServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "ec2:ResourceTag/aws:ec2spot:fleet-request-id": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSEC2SpotServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringNotEquals: {
                        "ec2:InstanceMarketType": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                        "ec2:CreateAction"?: undefined;
                    };
                    StringNotEquals?: undefined;
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "ec2:CreateAction": string;
                        "iam:PassedToService"?: undefined;
                    };
                    StringNotEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticBeanstalkCustomPlatformforEC2Role: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticBeanstalkEnhancedHealth: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticBeanstalkFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                        "iam:PolicyArn"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PolicyArn": string[];
                        "iam:AWSServiceName"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticBeanstalkMaintenance: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticBeanstalkMulticontainerDocker: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticBeanstalkReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticBeanstalkService: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    ArnLike: {
                        "ec2:LaunchTemplate": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticBeanstalkServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticBeanstalkWebTier: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticBeanstalkWorkerTier: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticLoadBalancingClassicServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElasticLoadBalancingServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElementalMediaConvertFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElementalMediaConvertReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElementalMediaPackageFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            };
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElementalMediaPackageReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            };
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElementalMediaStoreFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Condition: {
                    Bool: {
                        "aws:SecureTransport": string;
                    };
                };
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSElementalMediaStoreReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Condition: {
                    Bool: {
                        "aws:SecureTransport": string;
                    };
                };
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSEnhancedClassicNetworkingMangementPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSFMAdminFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSFMAdminReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSFMMemberReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSForWordPressPluginPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "aws:RequestedRegion": string;
                        "aws:ResourceTag/createdBy"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "aws:ResourceTag/createdBy": string;
                        "aws:RequestedRegion"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSGlobalAcceleratorSLRPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "ec2:ResourceTag/AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSGlueConsoleFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "ec2:ResourceTag/aws:cloudformation:logical-id": string;
                    };
                    StringLike: {
                        "ec2:ResourceTag/aws:cloudformation:stack-id": string;
                        "iam:PassedToService"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string[];
                        "ec2:ResourceTag/aws:cloudformation:stack-id"?: undefined;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string[];
                        "ec2:ResourceTag/aws:cloudformation:stack-id"?: undefined;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSGlueConsoleSageMakerNotebookFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "ec2:ResourceTag/aws:cloudformation:logical-id": string;
                        "aws:TagKeys"?: undefined;
                    };
                    StringLike: {
                        "ec2:ResourceTag/aws:cloudformation:stack-id": string;
                        "iam:PassedToService"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "aws:TagKeys": string;
                        "ec2:ResourceTag/aws:cloudformation:logical-id"?: undefined;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string[];
                        "ec2:ResourceTag/aws:cloudformation:stack-id"?: undefined;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string[];
                        "ec2:ResourceTag/aws:cloudformation:stack-id"?: undefined;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSGlueServiceNotebookRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    "ForAllValues:StringEquals": {
                        "aws:TagKeys": string[];
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSGlueServiceRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    "ForAllValues:StringEquals": {
                        "aws:TagKeys": string[];
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSGreengrassFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSGreengrassReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSGreengrassResourceAccessRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSHealthFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIQContractServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIQFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIQPermissionServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    ArnEquals: {
                        "iam:PolicyARN": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSImportExportFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSImportExportReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoT1ClickFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoT1ClickReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTAnalyticsFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTAnalyticsReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTConfigAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTConfigReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTDataAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTDeviceDefenderAddThingsToThingGroupMitigationAction: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTDeviceDefenderAudit: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTDeviceDefenderEnableIoTLoggingMitigationAction: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTDeviceDefenderPublishFindingsToSNSMitigationAction: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTDeviceDefenderReplaceDefaultPolicyMitigationAction: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTDeviceDefenderUpdateCACertMitigationAction: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTDeviceDefenderUpdateDeviceCertMitigationAction: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTEventsFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTEventsReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTLogging: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTOTAUpdate: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            };
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTRuleActions: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            };
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTSiteWiseConsoleFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                        "iam:PassedToService"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string;
                        "iam:AWSServiceName"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTSiteWiseFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTSiteWiseMonitorServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTSiteWiseReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSIoTThingsRegistration: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSKeyManagementServiceCustomKeyStoresServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSKeyManagementServicePowerUser: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLakeFormationDataAdmin: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLambdaBasicExecutionRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLambdaDynamoDBExecutionRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLambdaENIManagementAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLambdaExecute: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLambdaFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    "AWSLambdaInvocation-DynamoDB": {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLambdaKinesisExecutionRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLambdaReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLambdaReplicator: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLikeIfExists: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string[];
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLambdaRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLambdaSQSQueueExecutionRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLambdaVPCAccessExecutionRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLicenseManagerMasterAccountRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "aws:RequestTag/Service": string;
                        "ram:ResourceTag/Service"?: undefined;
                        "iam:PassedToService"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
                Sid: string;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "ram:ResourceTag/Service": string;
                        "aws:RequestTag/Service"?: undefined;
                        "iam:PassedToService"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
                Sid: string;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                        "aws:RequestTag/Service"?: undefined;
                        "ram:ResourceTag/Service"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLicenseManagerMemberAccountRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSLicenseManagerServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMarketplaceFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string[];
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMarketplaceGetEntitlements: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMarketplaceImageBuildFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "ec2:ResourceTag/marketplace-image-build:build-id": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMarketplaceManageSubscriptions: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMarketplaceMeteringFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMarketplaceProcurementSystemAdminFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    "AWSMarketplaceRead-only": {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMarketplaceSellerFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMarketplaceSellerProductsFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMarketplaceSellerProductsReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMigrationHubDMSAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMigrationHubDiscoveryAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMigrationHubFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMigrationHubSMSAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMobileHub_FullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSMobileHub_ReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSOpsWorksCMInstanceProfileRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSOpsWorksCMServiceRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "ssm:resourceTag/aws:cloudformation:stack-name": string;
                        "ec2:ResourceTag/aws:cloudformation:stack-name"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "ec2:ResourceTag/aws:cloudformation:stack-name": string;
                        "ssm:resourceTag/aws:cloudformation:stack-name"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSOpsWorksCloudWatchLogs: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSOpsWorksFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSOpsWorksInstanceRegistration: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSOpsWorksRegisterCLI_EC2: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSOpsWorksRegisterCLI_OnPremises: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    ArnEquals: {
                        "iam:PolicyARN": string;
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSOpsWorksRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSOrganizationsFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSOrganizationsReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSOrganizationsServiceTrustPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSPriceListServiceFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSPrivateMarketplaceAdminFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSPrivateMarketplaceRequests: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSQuickSightDescribeRDS: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSQuickSightDescribeRedshift: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSQuickSightIoTAnalyticsAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSQuickSightListIAM: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSQuicksightAthenaAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSResourceAccessManagerFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSResourceAccessManagerServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSResourceGroupsReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSRoboMakerFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSRoboMakerReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSRoboMakerServicePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEqualsIfExists: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSRoboMakerServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEqualsIfExists: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSSODirectoryAdministrator: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSSODirectoryReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSSOMasterAccountAdministrator: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSSOMemberAccountAdministrator: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSSOReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSSOServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSavingsPlansFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSavingsPlansReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSchemasServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSecurityHubFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSecurityHubReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSecurityHubServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSServiceCatalogAdminFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSServiceCatalogAdminReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSServiceCatalogEndUserFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "servicecatalog:userLevel": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSServiceCatalogEndUserReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "servicecatalog:userLevel": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSServiceRoleForAmazonEKSNodegroup: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    "ForAnyValue:StringLike": {
                        "ec2:ResourceTag/eks": string;
                        "ec2:ResourceTag/eks:nodegroup-name"?: undefined;
                        "aws:TagKeys"?: undefined;
                    };
                    StringLike?: undefined;
                    StringEquals?: undefined;
                    "ForAnyValue:StringEquals"?: undefined;
                    StringEqualsIfExists?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Condition: {
                    "ForAnyValue:StringLike": {
                        "ec2:ResourceTag/eks:nodegroup-name": string;
                        "ec2:ResourceTag/eks"?: undefined;
                        "aws:TagKeys"?: undefined;
                    };
                    StringLike?: undefined;
                    StringEquals?: undefined;
                    "ForAnyValue:StringEquals"?: undefined;
                    StringEqualsIfExists?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "ec2:ResourceTag/eks:nodegroup-name": string;
                    };
                    "ForAnyValue:StringLike"?: undefined;
                    StringEquals?: undefined;
                    "ForAnyValue:StringEquals"?: undefined;
                    StringEqualsIfExists?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                    "ForAnyValue:StringLike"?: undefined;
                    StringLike?: undefined;
                    "ForAnyValue:StringEquals"?: undefined;
                    StringEqualsIfExists?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Condition: {
                    "ForAnyValue:StringEquals": {
                        "aws:TagKeys": string[];
                    };
                    "ForAnyValue:StringLike"?: undefined;
                    StringLike?: undefined;
                    StringEquals?: undefined;
                    StringEqualsIfExists?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string;
                Condition: {
                    StringEqualsIfExists: {
                        "iam:PassedToService": string;
                    };
                    "ForAnyValue:StringLike"?: undefined;
                    StringLike?: undefined;
                    StringEquals?: undefined;
                    "ForAnyValue:StringEquals"?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Condition: {
                    "ForAnyValue:StringLike": {
                        "aws:TagKeys": string[];
                        "ec2:ResourceTag/eks"?: undefined;
                        "ec2:ResourceTag/eks:nodegroup-name"?: undefined;
                    };
                    StringLike?: undefined;
                    StringEquals?: undefined;
                    "ForAnyValue:StringEquals"?: undefined;
                    StringEqualsIfExists?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSServiceRoleForEC2ScheduledInstances: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    "ForAllValues:StringEquals": {
                        "aws:TagKeys": string[];
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "ec2:ResourceTag/aws:ec2sri:scheduledInstanceId": string;
                    };
                    "ForAllValues:StringEquals"?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSServiceRoleForIoTSiteWise: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLikeIfExists: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSServiceRoleForLogDeliveryPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "firehose:ResourceTag/LogDeliveryEnabled": string;
                    };
                };
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSServiceRoleForSMS: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    "ForAllValues:StringLikeIfExists": {
                        "cloudformation:ResourceTypes": string[];
                    };
                    StringLike?: undefined;
                    "ForAllValues:StringLike"?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AssociatedResourceArn": string;
                    };
                    "ForAllValues:StringLikeIfExists"?: undefined;
                    "ForAllValues:StringLike"?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    "ForAllValues:StringLike": {
                        "ec2:ResourceTag/aws:cloudformation:stack-id": string;
                    };
                    "ForAllValues:StringLikeIfExists"?: undefined;
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSShieldDRTAccessPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSStepFunctionsConsoleFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSStepFunctionsFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSStepFunctionsReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSStorageGatewayFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSStorageGatewayReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSupportAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSupportServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSSystemsManagerAccountDiscoveryServicePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSTransferLoggingAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSTrustedAdvisorServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSVPCS2SVpnServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSVPCTransitGatewayServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSWAFFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSWAFReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSXRayDaemonWriteAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSXrayFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSXrayReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AWSXrayWriteOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AdministratorAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AlexaForBusinessDeviceSetup: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AlexaForBusinessFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string[];
                        "secretsmanager:Name"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "secretsmanager:Name": string;
                        "iam:AWSServiceName"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AlexaForBusinessGatewayExecution: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AlexaForBusinessNetworkProfileServicePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    StringEquals: {
                        "aws:ResourceTag/a4b": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AlexaForBusinessPolyDelegatedAccessPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "a4b:amazonId": string[];
                    };
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AlexaForBusinessReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonAPIGatewayAdministrator: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonAPIGatewayInvokeFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonAPIGatewayPushToCloudWatchLogs: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonAppStreamFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                        "iam:AWSServiceName"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                        "iam:PassedToService"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonAppStreamReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonAppStreamServiceAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonAthenaFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonChimeFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonChimeReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonChimeServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonChimeUserManagement: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonChimeVoiceConnectorServiceLinkedRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonCloudDirectoryFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonCloudDirectoryReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonCognitoDeveloperAuthenticatedIdentities: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonCognitoIdpEmailServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonCognitoPowerUser: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonCognitoReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonConnectFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonConnectReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonConnectServiceLinkedRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonDMSCloudWatchLogsRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonDMSRedshiftS3Role: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonDMSVPCManagementRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonDRSVPCManagement: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonDocDBConsoleFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonDocDBFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonDocDBReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonDynamoDBFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string[];
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string[];
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonDynamoDBFullAccesswithDataPipeline: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonDynamoDBReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2ContainerRegistryFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2ContainerRegistryPowerUser: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2ContainerRegistryReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2ContainerServiceAutoscaleRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2ContainerServiceEventsRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2ContainerServiceFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2ContainerServiceRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2ContainerServiceforEC2Role: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2FullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2ReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2ReportsAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2RolePolicyForLaunchWizard: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    "ForAllValues:StringLike": {
                        "aws:TagKeys": string;
                    };
                    "ForAllValues:StringEquals"?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    "ForAllValues:StringEquals": {
                        "aws:TagKeys": string;
                    };
                    "ForAllValues:StringLike"?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2RoleforAWSCodeDeploy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2RoleforDataPipelineRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2RoleforSSM: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2SpotFleetAutoscaleRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEC2SpotFleetTaggingRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonECSServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonECSTaskExecutionRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonECS_FullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "ec2:ResourceTag/aws:cloudformation:stack-name": string;
                        "iam:PassedToService"?: undefined;
                        "iam:AWSServiceName"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                        "ec2:ResourceTag/aws:cloudformation:stack-name"?: undefined;
                        "iam:AWSServiceName"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string[];
                        "ec2:ResourceTag/aws:cloudformation:stack-name"?: undefined;
                        "iam:AWSServiceName"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string[];
                        "ec2:ResourceTag/aws:cloudformation:stack-name"?: undefined;
                        "iam:PassedToService"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEKSClusterPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEKSServicePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string;
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEKSWorkerNodePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEKS_CNI_Policy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEMRCleanupPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonESCognitoAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonESFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonESReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElastiCacheFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElastiCacheReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticFileSystemFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticFileSystemReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticFileSystemServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticMapReduceEditorsRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    "ForAllValues:StringEquals": {
                        "aws:TagKeys": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticMapReduceFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticMapReduceReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticMapReduceRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticMapReduceforAutoScalingRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticMapReduceforEC2Role: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticTranscoderRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticTranscoder_FullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticTranscoder_JobsSubmitter: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticTranscoder_ReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonElasticsearchServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEventBridgeFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonEventBridgeReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonFSxConsoleFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonFSxConsoleReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonFSxFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonFSxReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonFSxServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonForecastFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonFreeRTOSFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonFreeRTOSOTAUpdate: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonGlacierFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonGlacierReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonGuardDutyFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonGuardDutyReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonGuardDutyServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonInspectorFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonInspectorReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonInspectorServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonKinesisAnalyticsFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonKinesisAnalyticsReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonKinesisFirehoseFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonKinesisFirehoseReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonKinesisFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonKinesisReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonKinesisVideoStreamsFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonKinesisVideoStreamsReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonLaunchWizardFullaccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    "ForAllValues:StringLike": {
                        "aws:TagKeys": string;
                    };
                };
                Effect: string;
                Resource: string;
                Sid?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string[];
                Condition?: undefined;
                Sid?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
                Sid?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonLexFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "lambda:Principal": string;
                        "iam:AWSServiceName"?: undefined;
                        "iam:PolicyArn"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                        "lambda:Principal"?: undefined;
                        "iam:PolicyArn"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PolicyArn": string;
                        "lambda:Principal"?: undefined;
                        "iam:AWSServiceName"?: undefined;
                    };
                };
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonLexReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonLexRunBotsOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMQApiFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMQApiReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMQFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMQReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMSKFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMSKReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMachineLearningBatchPredictionsAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMachineLearningCreateOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMachineLearningFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMachineLearningManageRealTimeEndpointOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMachineLearningReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMachineLearningRealTimePredictionOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMachineLearningRoleforRedshiftDataSourceV2: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMacieFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMacieHandshakeRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Condition: {
                    "ForAnyValue:StringEquals": {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMacieServiceRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMacieServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMacieSetupRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonManagedBlockchainConsoleFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonManagedBlockchainFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonManagedBlockchainReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMechanicalTurkFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMechanicalTurkReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMobileAnalyticsFinancialReportAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMobileAnalyticsFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    "AmazonMobileAnalyticsNon-financialReportAccess": {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonMobileAnalyticsWriteOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonPersonalizeFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonPollyFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonPollyReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonQLDBConsoleFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonQLDBFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonQLDBReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRDSBetaServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRDSDataFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRDSDirectoryServiceAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRDSEnhancedMonitoringRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRDSFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRDSPreviewServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRDSReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRDSServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRedshiftFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRedshiftQueryEditor: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRedshiftReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRedshiftServiceLinkedRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRekognitionFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRekognitionReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRekognitionServiceRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRoute53AutoNamingFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRoute53AutoNamingReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRoute53AutoNamingRegistrantAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRoute53DomainsFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRoute53DomainsReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRoute53FullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRoute53ReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRoute53ResolverFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonRoute53ResolverReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonS3FullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonS3ReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSESFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSESReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSNSFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSNSReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSNSRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSQSFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSQSReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSSMAutomationApproverAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSSMAutomationRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSSMDirectoryServiceAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSSMFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSSMMaintenanceWindowRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSSMManagedInstanceCore: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSSMReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSSMServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSageMakerFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "secretsmanager:ResourceTag/SageMaker": string;
                        "iam:AWSServiceName"?: undefined;
                        "iam:PassedToService"?: undefined;
                    };
                    StringEqualsIgnoreCase?: undefined;
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringEqualsIgnoreCase: {
                        "s3:ExistingObjectTag/SageMaker": string;
                    };
                    StringEquals?: undefined;
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                    StringEquals?: undefined;
                    StringEqualsIgnoreCase?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                        "secretsmanager:ResourceTag/SageMaker"?: undefined;
                        "iam:PassedToService"?: undefined;
                    };
                    StringEqualsIgnoreCase?: undefined;
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string[];
                        "secretsmanager:ResourceTag/SageMaker"?: undefined;
                        "iam:AWSServiceName"?: undefined;
                    };
                    StringEqualsIgnoreCase?: undefined;
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSageMakerNotebooksServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Condition: {
                    StringLike: {
                        "aws:RequestTag/ManagedByAmazonSageMakerResource": string;
                        "aws:ResourceTag/ManagedByAmazonSageMakerResource"?: undefined;
                        "ec2:ResourceTag/ManagedByAmazonSageMakerResource"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "aws:ResourceTag/ManagedByAmazonSageMakerResource": string;
                        "aws:RequestTag/ManagedByAmazonSageMakerResource"?: undefined;
                        "ec2:ResourceTag/ManagedByAmazonSageMakerResource"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "ec2:ResourceTag/ManagedByAmazonSageMakerResource": string;
                        "aws:RequestTag/ManagedByAmazonSageMakerResource"?: undefined;
                        "aws:ResourceTag/ManagedByAmazonSageMakerResource"?: undefined;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSageMakerReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonSumerianFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonTextractFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonTextractServiceRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonTranscribeFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonTranscribeReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonVPCCrossAccountNetworkInterfaceOperations: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonVPCFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonVPCReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonWorkLinkFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonWorkLinkReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonWorkLinkServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonWorkMailEventsServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonWorkMailFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonWorkMailReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonWorkSpacesAdmin: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonWorkSpacesApplicationManagerAdminAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonWorkSpacesSelfServiceAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonWorkSpacesServiceAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonZocaloFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AmazonZocaloReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ApplicationAutoScalingForAmazonAppStreamAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ApplicationDiscoveryServiceContinuousExportServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AutoScalingConsoleFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AutoScalingConsoleReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AutoScalingFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AutoScalingNotificationAccessRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AutoScalingReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    AutoScalingServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringLike: {
                        "iam:PassedToService": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    Billing: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ClientVPNServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudFrontFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudFrontReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudHSMServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudSearchFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudSearchReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudTrailServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    "CloudWatch-CrossAccountAccess": {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchActionsEC2Access: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchAgentAdminPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchAgentServerPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchAutomaticDashboardsAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchEventsBuiltInTargetExecutionAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchEventsFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchEventsInvocationAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchEventsReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchEventsServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchLogsFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchLogsReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudWatchReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    CloudwatchApplicationInsightsServiceLinkedRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ComprehendDataAccessRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            };
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ComprehendFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ComprehendMedicalFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ComprehendReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ConfigConformsServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    DAXServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    DataScientist: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:PassedToService": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    DatabaseAdministrator: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    DynamoDBCloudWatchContributorInsightsServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    DynamoDBReplicationServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    EC2InstanceConnect: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ElastiCacheServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ElasticLoadBalancingFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ElasticLoadBalancingReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ElementalAppliancesSoftwareFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string;
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    FMSServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    FSxDeleteServiceLinkedRoleAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    GlobalAcceleratorFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    GlobalAcceleratorReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    GreengrassOTAUpdateArtifactAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
                Sid: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    IAMAccessAdvisorReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    IAMFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    IAMReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    IAMSelfManageServiceSpecificCredentials: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    IAMUserChangePassword: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    IAMUserSSHKeys: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    KafkaServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    LakeFormationDataAccessServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    LexBotPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    LexChannelPolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    LightsailExportAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    MigrationHubDMSAccessServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    MigrationHubSMSAccessServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    MigrationHubServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    NeptuneConsoleFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    StringEquals: {
                        "rds:DatabaseEngine": string;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    NeptuneFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    StringEquals: {
                        "rds:DatabaseEngine": string;
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AWSServiceName": string;
                    };
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    NeptuneReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    NetworkAdministrator: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    PowerUserAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Effect: string;
                NotAction: string[];
                Resource: string;
                Action?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                NotAction?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    QuickSightAccessForS3StorageManagementAnalyticsReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    RDSCloudHsmAuthorizationRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ResourceGroupsandTagEditorFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ResourceGroupsandTagEditorReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    SecretsManagerReadWrite: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    SecurityAudit: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ServerMigrationConnector: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string;
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ServerMigrationServiceLaunchRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    "ForAllValues:StringLike": {
                        "ec2:ResourceTag/aws:cloudformation:stack-id": string;
                    };
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ServerMigrationServiceRole: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Condition: {
                    "ForAllValues:StringLikeIfExists": {
                        "cloudformation:ResourceTypes": string[];
                    };
                    StringLike?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string;
                Condition: {
                    StringLike: {
                        "iam:AssociatedResourceArn": string;
                    };
                    "ForAllValues:StringLikeIfExists"?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ServiceQuotasFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    Null: {
                        "cloudwatch:ResourceTag/ServiceQuotaMonitor": string;
                    };
                    "ForAllValues:StringLike"?: undefined;
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    "ForAllValues:StringLike": {
                        "organizations:ServicePrincipal": string[];
                    };
                    Null?: undefined;
                    StringEquals?: undefined;
                };
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Condition: {
                    StringEquals: {
                        "iam:AWSServiceName": string;
                    };
                    Null?: undefined;
                    "ForAllValues:StringLike"?: undefined;
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ServiceQuotasReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ServiceQuotasServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    SimpleWorkflowFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    SupportUser: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    SystemAdministrator: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string;
            } | {
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string;
                Effect: string;
                Resource: string[];
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    TagPoliciesServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
                Condition?: undefined;
            } | {
                Action: string[];
                Condition: {
                    "ForAllValues:StringLike": {
                        "organizations:ServicePrincipal": string[];
                    };
                };
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    TranslateFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    TranslateReadOnly: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    VMImportExportRoleForAWSConnector: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: ({
                Action: string[];
                Effect: string;
                Resource: string[];
            } | {
                Action: string[];
                Effect: string;
                Resource: string;
            })[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    ViewOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    WAFLoggingServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    WAFRegionalLoggingServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    WAFV2LoggingServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string[];
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    WellArchitectedConsoleFullAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    WellArchitectedConsoleReadOnlyAccess: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
    WorkLinkServiceRolePolicy: {
        Arn: string;
        AttachmentCount: number;
        CreateDate: string;
        DefaultVersionId: string;
        Document: {
            Statement: {
                Action: string[];
                Effect: string;
                Resource: string;
            }[];
            Version: string;
        };
        IsAttachable: boolean;
        IsDefaultVersion: boolean;
        Path: string;
        PermissionsBoundaryUsageCount: number;
        PolicyId: string;
        PolicyName: string;
        UpdateDate: string;
        VersionId: string;
    };
};
export default _default;
