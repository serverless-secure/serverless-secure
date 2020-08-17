import request from 'request';
// @ts-ignore
// import pkg from '../../package.json';
import * as fse from 'fs-extra';
import * as unzip from 'unzip-stream';
// import updateNotifier from 'update-notifier'
import Serverless from 'serverless';
import { read, write } from 'node-yaml'
import * as path from 'path';
import * as _ from 'lodash';
import { ZIP_URL, corsConfig } from './config';

// import {getAWSPagedResults, sleep, throttledCall} from "./utils";

export class ServerlessSecure {
    private baseYAML = path.join(process.cwd(), 'serverless.yml');
    // AWS SDK resources
    public apigateway: any;
    public apigatewayV2: any;
    public route53: any;
    public acm: any;
    public acmRegion!: string;
    public cloudformation: any;
    serverless: Serverless;
    commands: { secure: { usage: string; lifecycleEvents: string[]; options: { path: { usage: string; required: boolean; shortcut: string; }; }; }; }
    options: { path: any; p: any; }
    hooks: { 'before:package:finalize': any; 'before:secure:create': any; 'after:secure:create': any; };
    constructor(serverless: Serverless, options?: any) {
        this.options = options;
        this.serverless = serverless;
        this.hooks = {
            'before:package:finalize': this.apply.bind(this),
            'before:secure:create': this.beforePath.bind(this),
            'after:secure:create': this.afterPath.bind(this)
            // 'before:slsSecure:path': this.beforePath.bind(this),
            // 'after:slsSecure:path': this.afterPath.bind(this)
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
        // let pluginsDirectory = this.serverless.getProject().getRootPath('plugins');
        // console.log({pluginsDirectory})
        // // let pluginDirectory = path.join(pluginsDirectory, pluginName);
        // const credentials = this.serverless.providers.aws.getCredentials();
        // credentials.region = this.serverless.providers.aws.getRegion();
        // this.apigateway = new this.serverless.providers.aws.sdk.APIGateway(credentials);
        // this.apigatewayV2 = new this.serverless.providers.aws.sdk.ApiGatewayV2(credentials);
        // this.route53 = new this.serverless.providers.aws.sdk.Route53(credentials);
        // this.cloudformation = new this.serverless.providers.aws.sdk.CloudFormation(credentials);
        // console.log('credentials', credentials, this.apigateway, this.cloudformation)

    }
    static parseHttpPath(path: string) {
        return path[0] === '/' ? path : `/${path}`;
    }
    async pathExists(path: string): Promise<boolean> {
        try {
            if (fse.pathExists(path)) {
                return true;
            }
            await fse.mkdir(path, (mkdirres) =>{
                console.error({mkdirres})
            })
            await fse.opendir(path)
            return await fse.pathExists(path)
        } catch (err) {
            console.error(err)
        }
    }
    async apply() {
        // check if update is available
        // updateNotifier({ pkg }).notify();
        console.log('Test')
        await this.notification('[Concurrence]: Applying plugin...', 'success');


    }

    getRestFunctions() {
        const allFunctions = this.serverless.service.getAllFunctions();
        if (!allFunctions.length) {
            this.notification(`slsSecure: No functions found!!`, 'error');
        }
        // this.beforePath()
    }

    beforePath() {
        // this.setCredentials();
        ;
        if(this.findRequirements()){
            read(this.baseYAML)
            .then((res: any) => this.parseYAML(res))
            .catch((err: any) => this.notification(`Error while reading file:\n\n%s ${String(err)}`, 'error'))
        }
    }
   async afterPath() {
        await this.downloadSecureLayer();
        this.serverless.cli.log('List of Secure Paths:');
    }

    findRequirements() {
        if (!this.options.path && !this.options.p) {
            this.notification(`sls secure: No path set!!`, 'error')
            return false;
        }
        if (!this.pathExists(process.cwd())) {
            this.notification('Unable to find project directory!', 'error')
            return false;
        }
        if (!fse.existsSync(this.baseYAML)) {
            this.notification('Can not find base YAML file!', 'error')
        }
        return true;
    };

    updateCustom(content: { [x: string]: any; }) {
        return _.assign({}, content['custom'], corsConfig);
    }
    updateProvider(content: { provider: any; }) {
        const { provider } = content;
        if (provider && 'apiKeys' in provider) {
            provider['apiKeys'].push('slsSecure')
        } else {
            return ['slsSecure'];
        }
        return _.uniq(provider['apiKeys']);
    }
    async parseYAML(_content: any) {

        const content = _content;
        content['custom'] = this.updateCustom(content);
        content['provider']['apiKeys'] = this.updateProvider(content);
        const opath = this.options.path || this.options.p
        for (const item in content['functions']) {

            if (opath === '.' || opath === item) {
                const events = content['functions'][item]['events'] || [];
                await events.map((res: any) => {
                    if (res && 'http' in res) {
                        res.http['cors'] = '${self:custom.corsValue}';
                        if (!res['private'] || res['private'] !== true) {
                            res.http['authorizer'] = 'secureAuthorizer';
                        }
                    }
                })
            }
        }
        // console.log(JSON.stringify(content, true, 2))
       
        await this.writeYAML(content);
    }
    async writeYAML(content: any) {
        // console.log(JSON.stringify(content, true, 2))
        await write(this.baseYAML, content)
            .then(this.serverless.cli.log('YAML File Updated!'))
            .catch((e: Error) => this.notification(e.message, 'error'))
    };

    downloadSecureLayer() {
        try {
            const that = this;
            request
                .get(ZIP_URL)
                .on('error', (error) => this.notification(error.message, 'error'))
                .pipe(fse.createWriteStream(`${process.cwd()}/secure_layer.zip`))
                .on('finish', () => that.unZipPackage(`${process.cwd()}/secure_layer.zip`, `${process.cwd()}/secure_layer/`));
        } catch (err) {
            console.error(err)
        }
    }

    async unZipPackage(extractPath: string, path: string): Promise<void> {
        try {
            if (!fse.existsSync(extractPath)) {
                throw new Error('...writing secure_layer!');
            }
            const that = this;
            const readStream = fse.createReadStream(extractPath);
            const writeStream = unzip.Extract({ path });
            await readStream.pipe(writeStream).on('finish', () => that.notification('Secure layer applied..', 'success'));;
            setTimeout(() => this.deleteFile(`${path}handler.js.map`), 1000);
            setTimeout(() => this.deleteFile(extractPath), 1000);
        } catch (err) {
            this.notification(err.message, 'error')
        }
    }
    async deleteFile(extractPath: string): Promise<void> {
        try {
            await fse.remove(extractPath);
            this.notification(`File: ${extractPath} cleaned..`, 'success')
        } catch (err) {
            this.notification(err.message, 'error')
        }
    }
    notification(message: string, type: string) {
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
