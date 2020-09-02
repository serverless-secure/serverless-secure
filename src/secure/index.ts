import { ZIP_URL, corsConfig, secureConfig, secureLayer, keyConfig } from './config';
import { ConfigUpdate } from './config.update';
import * as unzip from 'unzip-stream';
import Serverless from 'serverless';
import YAWN from 'yawn-yaml/cjs';
import * as fse from 'fs-extra';
import request from 'request';
import * as path from 'path';
import * as _ from 'lodash';

export class ServerlessSecure {
    private baseTS = path.join(process.cwd(), 'serverless.ts');
    private baseYAML = path.join(process.cwd(), 'serverless.yml');
    private content!: string;
    private yawn: YAWN;
    private isYaml = false;
    private serverless: Serverless;
    private sourceFile!: ConfigUpdate;
    private functionList: string[] = [];
    commands: object;
    options: { path: string; p: string; }
    hooks: object;
    
    constructor(serverless?: Serverless, options?: any) {
        this.options = options;
        this.serverless = serverless;
        this.hooks = {
            'before:package:finalize': this.apply.bind(this),
            'before:secure:init': this.beforeFile.bind(this),
            'before:secure:create': this.beforePath.bind(this),
            'after:secure:create': this.afterPath.bind(this)
        };
        this.commands = {
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
            }
        }
    }
    async apply() {
        await this.notification('[Serverles-Secure]: Applying plugin...', 'success');
    }
    beforeFile() {
        if (!this.options.path && !this.options.p) {
            this.options.path = '.';
        }
        if (!this.pathExists(process.cwd())) {
            this.notification('Unable to find project directory!', 'error')
        }
        if (fse.existsSync(this.baseYAML)) {
            this.isYaml = true
        } else if (fse.existsSync(this.baseTS)) {
            this.isYaml = false
        } else {
            this.notification(`slsSecure: No configuration file found!!`, 'error');
        }
    }
    async beforePath() {
        if (this.isYaml) {
            await fse.readFile(this.baseYAML, { encoding: 'utf8' })
                .then((config) => {
                    this.content = config
                    this.yawn = new YAWN(this.content);
                    this.parseYAML(this.yawn.json)
                })
                .catch((err: any) => this.notification(`Error while reading file:\n\n%s ${String(err)}`, 'error'))
        } else {
            await fse.readFile(this.baseTS, { encoding: 'utf8' })
                .then((config: string) => {
                    this.content = config
                    this.sourceFile = new ConfigUpdate(this.content);
                    const Configuration = require(path.join(process.cwd(), 'serverless.ts'));
                    this.parseTS(Configuration)
                })
                .catch((err: any) => this.notification(`Error while reading file:\n\n%s ${String(err)}`, 'error'))
            // await this.parseTS();
        }
    }
    async afterPath() {
        await this.downloadSecureLayer();
    }
    static parseHttpPath(_path: string) {
        return _path[0] === '/' ? _path : `/${_path}`;
    }
    async pathExists(_path: string): Promise<boolean> {
        try {
            if (fse.pathExists(_path)) {
                return true;
            }
            await fse.mkdir(_path, (mkdirres) => console.error({ mkdirres }))
            await fse.opendir(_path)
            return await fse.pathExists(_path)
        } catch (err) {
            console.error(err)
            return false;
        }
    }
    updateEnv(content: { [x: string]: any; }) {
        return _.assign({}, content['provider']['environment'], keyConfig);
    }
    updateCustom(content: { [x: string]: any; }) {
        return _.assign({}, content['custom'], corsConfig);
    }
    updateLayers(content: { [x: string]: any; }) {
        return _.assign({}, content['layers'], secureLayer);
    }
    updateApiKeys(content: { provider: any; }) {
        const { provider } = content;
        if (provider && 'apiKeys' in provider) {
            provider['apiKeys'].push('slsSecure')
        } else {
            return ['slsSecure'];
        }
        return _.uniq(provider['apiKeys']);
    }

    async updateFunctions(content: { [x: string]: any; }) {
        const opath = this.options.path || this.options.p
        await _.mapValues(content['functions'], (ele, item) => {
            if (opath === '.' || opath === item) {
                this.functionList.push(item);
                const events = ele['events'] || [];
                if ('name' in events) {
                    delete ele['events']['name'];
                }
                _.map(events, (res: any) => {
                    if (res && 'http' in res) {
                        res.http['cors'] = '${self:custom.corsValue}';
                        if (!res['private'] || res['private'] !== true) {
                            res.http['authorizer'] = 'secureAuthorizer';
                        }
                    }
                })
            }
        });
        return _.assign({}, content['functions'], secureConfig);
    }

    contentUpdate(_content) {
        const content = _content;
        if ('variableSyntax' in content['provider']) {
            delete content.provider.variableSyntax;
            delete content.configValidationMode;
        }
        content['provider']['apiKeys'] = this.updateApiKeys(content);
        content['provider']['environment'] = this.updateEnv(content);
        return content;
    }
    async parseTS(_content: any) {
        try {
               const content = this.contentUpdate(_content);
            if ('functions' in content) {
                const func = await this.updateFunctions(content)
                await this.sourceFile.updateProperty('custom', this.updateCustom(content));
                await this.sourceFile.updateProperty('layers', this.updateLayers(content));
                await this.sourceFile.updateProperty('provider', content['provider']);
                await this.sourceFile.updateProperty('functions', func);
                await this.writeTS(this.sourceFile);
                return content;
            }
        } catch (error) {
            this.notification(error.message, 'error')
        }
    }
    async parseYAML(_content: any) {
        try {
            if ('functions' in _content) {
                const content = {
                    ...this.contentUpdate(_content),
                    custom: await this.updateCustom(_content),
                    layers: await this.updateLayers(_content)
                };
                content['functions'] = await this.updateFunctions(content);
                if (this.isYaml) {
                    await this.writeYAML(content)
                }
                return content;
            }
        } catch (error) {
            this.notification(error.message, 'error')
        }
        return _content;

    }
    ignoreErrors(sourceFile) {
        let source = sourceFile.getSourceFile().getFullText();
        source = _.replace(source, new RegExp('cors:', 'g'), '// @ts-ignore \n \t\t\t\t\t\t cors:')
        return _.replace(source, new RegExp('authorizer:', 'g'), '// @ts-ignore \n \t\t\t\t\t\t authorizer:')
    }
    async writeTS(sourceFile: ConfigUpdate) {
        await fse.writeFile(this.baseTS, await this.ignoreErrors(sourceFile), { encoding: 'utf8' })
            .then(this.serverless.cli.log('TS File Updated!'))
            .catch((e: Error) => this.notification(e.message, 'error'))
    };
    async writeYAML(content: Serverless) {
        this.yawn.json = _.assign({}, this.yawn.json, content);
        await fse.writeFile(this.baseYAML, this.yawn.yaml, { encoding: 'utf8' })
            .then(this.serverless.cli.log('YAML File Updated!'))
            .catch((e: Error) => this.notification(e.message, 'error'))
    };
    async downloadSecureLayer() {
        try {
            const that = this;
            await request
                .get(ZIP_URL)
                .on('error', (error) => this.notification(error.message, 'error'))
                .pipe(fse.createWriteStream(`${process.cwd()}/secure_layer.zip`))
                .on('finish', () => that.unZipPackage(`${process.cwd()}/secure_layer.zip`, `${process.cwd()}/secure_layer/`));
        } catch (err) {
            console.error(err)
        }
    }
    async unZipPackage(extractPath: string, _path: string): Promise<void> {
        try {
            if (!fse.existsSync(extractPath)) {
                throw new Error('...writing secure_layer!');
            }
            const that = this;
            const readStream = fse.createReadStream(extractPath);
            const writeStream = unzip.Extract({ path: _path });
            await readStream.pipe(writeStream).on('finish', () => that.notification('Secure layer applied..', 'success'));
            setTimeout(() => this.deleteFile(`${_path}handler.js.map`), 1000);
            setTimeout(() => this.deleteFile(extractPath), 1000);
            this.functionList.forEach(func => this.serverless.cli.log(`Function Paths Convered!!: ${func}`));
        } catch (err) {
            this.notification(err.message, 'error');
        }
    }
    async deleteFile(extractPath: string): Promise<void> {
        try {
            await fse.remove(extractPath);
            this.notification(`File: ${path.basename(extractPath)} cleaned..`, 'success')
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
    parseFile(arr: _.List<unknown> | null | undefined, top: number | undefined, bot: number | undefined) {
        return JSON.parse(JSON.stringify(_.slice(arr, top, bot)));
    }
}
