import Globals from "./Globals";
// import Serverless from 'serverless';
import { read, write } from 'node-yaml'
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { corsConfig } from './Config';
import { ServerlessInstance, ServerlessOptions } from "./types";
// import {getAWSPagedResults, sleep, throttledCall} from "./utils";

export class ServerlessSecure {
    private baseYAML = path.join(__dirname + '../../../', 'serverless.yml');
    // AWS SDK resources
    public apigateway: any;
    public apigatewayV2: any;
    public route53: any;
    public acm: any;
    public acmRegion: string;
    public cloudformation: any;
    serverless
    commands
    options
    hooks
    constructor(serverless: ServerlessInstance, options: ServerlessOptions) {
        this.serverless = serverless;
        Globals.serverless = serverless;

        this.options = options;
        Globals.options = options;
        this.hooks = {
            'after:deploy:deploy': this.apply.bind(this),
            // 'before:slsSecure:path': this.beforePath.bind(this),
            // 'after:slsSecure:path': this.afterPath.bind(this)
            // 'create_sentinel_role:create': this.create_sentinel_role.bind(this),
            // 'create_notifier_role:create': this.create_notifier_role.bind(this),
            // 'before:package:finalize': this.applyPlugin.bind(this),

        };
        this.commands = {
            secure: {
                usage: 'How to secure your lambdas',
                lifecycleEvents: ['path'],
                options: {
                    path: {
                        usage:
                            'Specify what function you wish to secure: --path <Function Name> or -p <*>',
                        required: true,
                        shortcut: 'p',
                    },
                }
            }
        }
    }

    setCredentials() {
        const credentials = this.serverless.providers.aws.getCredentials();
        credentials.region = this.serverless.providers.aws.getRegion();

        this.apigateway = new this.serverless.providers.aws.sdk.APIGateway(credentials);
        this.apigatewayV2 = new this.serverless.providers.aws.sdk.ApiGatewayV2(credentials);
        this.route53 = new this.serverless.providers.aws.sdk.Route53(credentials);
        this.cloudformation = new this.serverless.providers.aws.sdk.CloudFormation(credentials);
    }

    async apply() {
        this.serverless.cli.log('[Concurrence]: Applying plugin...');
        this.getRestFunctions();
    }

    applyPlugin() {
        // const { Resources } = this.serverless.service.provider.compiledCloudFormationTemplate;
        // this.applyAuthorizers(Resources).catch((e: Error) =>
        //     this.serverless.cli.log(`Could not apply cross lambda Authorizers${e.message}`));
    }


    getRestFunctions() {
        const allFunctions = this.serverless.service.getAllFunctions();

        if (!allFunctions.length) {
            this.notification(`slsSecure: No functions found!!`, 'error');
        }
        this.beforePath();
    }

    notification(message, type) {
        this.serverless.cli.log(message);
        switch (type) {
            case 'success':
                break;
            case 'error':
                throw new Error(message);
            default:
                break;
        }
    }
    static parseHttpPath(path: string) {
        return path[0] === '/' ? path : `/${path}`;
    }

    beforePath() {
        this.findYAML()

        read(this.baseYAML)
            .then(res => this.parseYAML(res))
            .catch(err => this.notification(`Error while reading file:\n\n%s ${String(err)}`, 'error'))
    }
    findYAML() {
        if (!fs.existsSync(this.baseYAML)) {
            this.notification('Can not find base YAML file!', 'error')
        }
    };

    afterPath() {
        this.serverless.cli.log('List of Secure Paths:');
    }

    async parseYAML(_content) {
        const content = _content;
        content['custom'] = _.assign({}, content['custom'], corsConfig);
        
        const opath = this.options.path || this.options.p
        for (const item in content['functions']) {
            
            if (opath === '*' || opath === item) {
                const events = content['functions'][item]['events'] || [];
                console.log('item: ',content['functions'][item])
                events.map((res: { http: { [x: string]: string; }; }) => {
                    if (res && 'http' in res) {
                        res.http['cors'] = '${self:custom.corsValue}';
                        res.http['slsSecureAuthorizer'] = 'slsSecureAuthorizer';
                    }
                })
            }
        }
        console.log('path: ', opath)
        // if (!this.options.path) {
            // this.notification(`slsSecure: No path set!!`, 'error');
        // }
       
        // console.log(JSON.stringify(content, true, 2))
        await this.writeYAML(content)

    }
    async writeYAML(content) {
        // console.log(JSON.stringify(content, true, 2))
        await write(this.baseYAML, content)
            .then(this.serverless.cli.log('YAML File Updated!'))
            .catch((e: Error) => this.notification(e.message, 'error'))
    };
}
