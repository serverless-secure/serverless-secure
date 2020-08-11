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
    private securePaths = [];
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
            'before:secure:path': this.beforePath.bind(this),
            'after:secure:path': this.afterPath.bind(this)
            // 'create_sentinel_role:create': this.create_sentinel_role.bind(this),
            // 'create_notifier_role:create': this.create_notifier_role.bind(this),
            // 'before:package:finalize': this.applyPlugin.bind(this),

        };
        this.commands = {
            secure: {
                usage: 'How to secure your lambdas',
                lifecycleEvents: ['create'],
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
        console.log('credentials', credentials, this.apigateway, this.cloudformation)

    }

    async apply() {
        this.serverless.cli.log('[Concurrence]: Applying plugin...');
        await this.getRestFunctions();
    }

    getRestFunctions() {
        const allFunctions = this.serverless.service.getAllFunctions();

        if (!allFunctions.length) {
            this.notification(`slsSecure: No functions found!!`, 'error');
        }
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
        // this.setCredentials();
        this.findYAML()
        read(this.baseYAML)
            .then(res => this.parseYAML(res))
            .catch(err => this.notification(`Error while reading file:\n\n%s ${String(err)}`, 'error'))
    }
    afterPath() {
        this.serverless.cli.log(`Secured Paths: ${this.securePaths}`);
    }
    findYAML() {
        if (!this.options.path && !this.options.p) {
            this.notification(`slsSecure: No path set!!`, 'error');
        }
        if (!fs.existsSync(this.baseYAML)) {
            this.notification('Can not find base YAML file!', 'error')
        }
    };

    updateCustom(content){
       return _.assign({}, content['custom'], corsConfig);
    }
    updateProvider(content){
        const { provider } = content;
        if( provider && 'apiKeys' in provider){
            provider['apiKeys'].push('slsSecure')
        } else {
            return ['slsSecure'];
        }
        return _.uniq(provider['apiKeys']);
     }
    async parseYAML(_content) {
        const content = _content;
        content['custom'] = this.updateCustom(content);
        content['provider']['apiKeys'] = this.updateProvider(content);
        const opath = this.options.path || this.options.p
        for (const item in content['functions']) {
            
            if (opath === '.' || opath === item) {
                const events = content['functions'][item]['events'] || [];
                this.securePaths.push(item)
                await events.map((res: { http: { [x: string]: string; }; }) => {
                    if (res && 'http' in res) {
                        res.http['cors'] = '${self:custom.corsValue}';
                        if (res['private']==true){
                            return;
                        }
                        res.http['authorizer'] = 'secureAuthorizer';
                    }
                })
            }
        }
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
