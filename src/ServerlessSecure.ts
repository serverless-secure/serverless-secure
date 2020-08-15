import request from 'request';
import Globals from "./Globals";
// @ts-ignore
import pkg from '../package.json';
import * as fse from 'fs-extra';
import * as unzip from 'unzip-stream';
import updateNotifier from 'update-notifier'
// import Serverless from 'serverless';
import { read, write } from 'node-yaml'
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { corsConfig } from './Config';
import { ServerlessInstance, ServerlessOptions } from "./types";
import { TEMP_PATH } from './config';
import { ZIP_FILE } from './config';
import { ZIP_URL } from './config';
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
        this.options = options;
        Globals.options = options;
        this.serverless = serverless;
        Globals.serverless = serverless;
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
    static parseHttpPath(path: string) {
        return path[0] === '/' ? path : `/${path}`;
    }
    async apply() {
        // check if update is available
        updateNotifier({ pkg }).notify()
        this.serverless.cli.log('[Concurrence]: Applying plugin...');
        this.getRestFunctions();
    }

    getRestFunctions() {
        const allFunctions = this.serverless.service.getAllFunctions();

        if (!allFunctions.length) {
            this.notification(`slsSecure: No functions found!!`, 'error');
        }
        this.beforePath();
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
                console.log('item: ', content['functions'][item])
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

        this.downloadSecureLayer();
    };

    downloadSecureLayer() {
        try {
            const that = this;
            request
                .get(ZIP_URL)
                .on('error', (error) => this.notification(error, 'error'))
                .pipe(fse.createWriteStream(ZIP_FILE))
                .on('finish', ()=> that.unZipPackage(ZIP_FILE, TEMP_PATH));
        } catch (err) {
            console.error(err)
        }
    }

    async unZipPackage(extractPath: string, path: string): Promise<void> {
        try {
            const readStream = fse.createReadStream(extractPath);
            const writeStream = unzip.Extract({ path });
            await readStream.pipe(writeStream);
            setTimeout(() => this.deleteFile(`${path}handler.js.map`), 1000);
            this.notification('Secure layer applied..', 'success')
        } catch (err) {
            this.notification(err.message, 'error')
        }
    }
    async deleteFile(extractPath: string): Promise<void> {
        try {
            await fse.remove(extractPath);
            this.notification('Secure .map removed..', 'success')
        } catch (err) {
            this.notification(err.message, 'error')
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
}
