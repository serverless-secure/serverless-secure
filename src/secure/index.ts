import { ZIP_URL, corsConfig, secureConfig, secureLayer, keyConfig } from './config';
import stringifyObject from 'stringify-object';
import { read, write } from 'node-yaml';
import * as unzip from 'unzip-stream';
import Serverless from 'serverless';
import * as fse from 'fs-extra';
import request from 'request';
import * as path from 'path';
import * as _ from 'lodash';

export class ServerlessSecure {
    private baseTS = path.join(process.cwd(), 'serverless.ts');
    private baseYAML = path.join(process.cwd(), 'serverless.yml');
    private isYaml = false;
    private serverless: Serverless;
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
                        required: true,
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
            this.notification(`sls secure: No path set!!`, 'error')
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
            await read(this.baseYAML)
                .then((config: Serverless) => this.parseYAML(config))
                .catch((err: any) => this.notification(`Error while reading file:\n\n%s ${String(err)}`, 'error'))
        } else {
            await this.parseTS();
        }
    }
    async afterPath() {
        await this.downloadSecureLayer();
        this.serverless.cli.log('List of Secure Paths:');
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
        provider['environment'] = {
            ...provider['environment'],
            ...keyConfig
        };
        provider['apiKeys'] = _.uniq(provider['apiKeys']);
        return provider;
    }
    updateLayers(content: { [x: string]: any; }) {
        return _.assign({}, content['layers'], secureLayer);
    }
    async updateFunctions(content: { [x: string]: any; }) {
        const opath = this.options.path || this.options.p
        for (const item in content['functions']) {
            if (opath === '.' || opath === item) {
                const events = content['functions'][item]['events'] || [];
                if('name' in events) {
                    delete content['functions'][item]['events']['name'];
                }
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
        return _.assign(content['functions'], secureConfig);
    }
    async parseTS() {
        let open: number;
        let close: number;
        const utfArray: any[] = [];
        try {
            await fse.readFile(this.baseTS, 'utf-8', async (err, data) => {
                if (err)
                    return;
                const serverlessConfiguration = require(path.join(process.cwd(), 'serverless.ts'));
                const updatedConfig: any = await this.parseYAML(serverlessConfiguration);
                const NewConfig = stringifyObject(updatedConfig, {
                    indent: '   ',
                    singleQuotes: false
                }).substring(1);
                const fileArray: any = data.split('\n');
                fileArray.forEach((dataArr: string, x: any) => {
                    const lArray = dataArr.split('');
                    if (lArray.includes('=') && lArray.includes('{')) {
                        open = x
                    }
                    if (lArray.includes('}')) {
                        close = x
                    }
                });
                utfArray.push(
                    this.parseFile(fileArray, 0, open + 1).join('\n'),
                    NewConfig + '\n',
                    this.parseFile(fileArray, close + 1, fileArray.length + 1).join('\n')
                );
                fse.writeFile(this.baseTS, utfArray.join(''), 'utf-8');
            });
        } catch (error) {
            this.notification(error.message, 'error')
        }

    }
    async parseYAML(_content: any) {
        try {
            if ('functions' in _content) {
                const content = {
                    ..._content,
                    custom: await this.updateCustom(_content),
                    layers: await this.updateLayers(_content)
                };
                if ('variableSyntax' in content['provider']) {
                    delete content.provider.variableSyntax;
                    delete content.configValidationMode;
                }
                content['functions'] = await this.updateFunctions(content);
                content['provider'] = await this.updateProvider(content);
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
    async writeYAML(content: Serverless) {
        await write(this.baseYAML, content)
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
            const writeStream = unzip.Extract({  path: _path });
            await readStream.pipe(writeStream).on('finish', () => that.notification('Secure layer applied..', 'success'));
            setTimeout(() => this.deleteFile(`${_path}handler.js.map`), 1000);
            setTimeout(() => this.deleteFile(extractPath), 1000);
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
