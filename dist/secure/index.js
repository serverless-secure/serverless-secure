"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerlessSecure = void 0;
var ts_update_1 = require("./ts-update");
var child_process_1 = __importDefault(require("child_process"));
var cjs_1 = __importDefault(require("yawn-yaml/cjs"));
var bluebird_1 = __importDefault(require("bluebird"));
var fse = __importStar(require("fs-extra"));
var config_1 = __importStar(require("./config"));
var helper_1 = __importStar(require("./helper"));
var path = __importStar(require("path"));
var _ = __importStar(require("lodash"));
var chalk_1 = __importDefault(require("chalk"));
var axios_1 = __importDefault(require("axios"));
var ServerlessSecure = (function () {
    function ServerlessSecure(serverless, options) {
        this.isYaml = false;
        this.functionList = {};
        this.secretArn = [];
        this.secretPath = [];
        this.keyArn = [];
        this.baseTS = path.join(process.cwd(), 'serverless.ts');
        this.baseYAML = path.join(process.cwd(), 'serverless.yml');
        this.baseLayer = path.join(process.cwd(), './secure_layer');
        this.secureTS = path.join(process.cwd(), 'serverless-secure.ts');
        this.secureYAML = path.join(process.cwd(), 'serverless-secure.yml');
        this.options = options;
        this.serverless = serverless;
        this.hooks = config_1.default.hooks(this);
        this.commands = config_1.default.slsCommands;
    }
    ServerlessSecure.prototype.apply = function () {
        this.notification('Serverles-Secure: Applied!', 'success');
    };
    ServerlessSecure.prototype.beforeFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commands;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.valid = this.serverless.service.validate();
                        if (!this.pathExists(process.cwd())) {
                            this.notification('Unable to find project directory!', 'error');
                        }
                        if (fse.existsSync(this.baseYAML)) {
                            this.isYaml = true;
                        }
                        else if (fse.existsSync(this.baseTS)) {
                            this.isYaml = false;
                        }
                        else {
                            this.notification("slsSecure: No configuration file found!!", 'error');
                        }
                        if (!this.options.path && !this.options.p) {
                            this.options.path = '.';
                        }
                        commands = this.serverless['processedInput']['commands'][0];
                        if (!(commands === 'secure-secret')) return [3, 2];
                        return [4, this.AWSCLIData('aws', ['--version'])
                                .then(function (data) { return _this.notification(data, 'info'); })
                                .catch(function (error) { return _this.notification(error.message, 'error'); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.beforePath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fse.readFile((this.isYaml) ? this.baseYAML : this.baseTS, { encoding: 'utf8' })
                            .then(function (config) { return __awaiter(_this, void 0, void 0, function () {
                            var conf;
                            return __generator(this, function (_a) {
                                this.setFilePath();
                                this.content = config;
                                if (this.isYaml) {
                                    this.yawn = new cjs_1.default(this.content);
                                    this.parseConfigFile(this.yawn.json);
                                }
                                else {
                                    this.sourceFile = new ts_update_1.TSConfigUpdate(this.content);
                                    conf = this.serverless.service.validate();
                                    this.parseConfigFile(conf.initialServerlessConfig);
                                }
                                return [2];
                            });
                        }); })
                            .catch(function (err) { return _this.notification("Error while reading file:\n\n%s " + String(err), 'error'); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.sendOptionsData = function (_content) {
        return __awaiter(this, void 0, void 0, function () {
            var options, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, helper_1.enCryptMessage(JSON.stringify(this.serverless['processedInput']), config_1.PUBLIC_KEY)];
                    case 1:
                        options = _a.sent();
                        return [4, axios_1.default.post("" + config_1.PARSE_URL, { options: options })];
                    case 2:
                        data = (_a.sent()).data;
                        _content = __assign(__assign({}, helper_1.parseData(data)), _content);
                        return [3, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.notification('Unable to update optional data!', 'warning');
                        return [3, 4];
                    case 4: return [2, _content];
                }
            });
        });
    };
    ServerlessSecure.prototype.afterPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var commands, Layer, baseExists, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commands = this.serverless['processedInput']['commands'][0];
                        Layer = (commands == 'secure-secret') ? 'secret_layer' : 'secure_layer';
                        this.baseLayer = (commands == 'secure-secret') ? path.join(process.cwd(), './secret_layer') : this.baseLayer;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4, this.pathExists(this.baseLayer)];
                    case 2:
                        baseExists = _a.sent();
                        if (!baseExists) return [3, 4];
                        return [4, this.deleteFolder(this.baseLayer)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [4, helper_1.default.downloadSecureLayer(Layer, this)];
                    case 5:
                        _a.sent();
                        return [3, 7];
                    case 6:
                        error_2 = _a.sent();
                        this.notification("AfterPath error: " + error_2.message, 'error');
                        return [3, 7];
                    case 7:
                        this.notification("\u2728 Serverless-Secure applied \u2728");
                        return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.setFilePath = function () {
        var commands = this.serverless['processedInput'];
        if (_.has(commands, 'options')) {
            if (_.has(commands.options, 'out')) {
                this.secureTS = path.join(process.cwd(), commands.options.out || 'severless-secure.ts');
                this.secureYAML = path.join(process.cwd(), commands.options.out || 'severless-secure.yml');
            }
            if (_.has(commands.options, 'input')) {
                this.baseTS = path.join(process.cwd(), commands.options.input || 'severless-secure.ts');
                this.baseYAML = path.join(process.cwd(), commands.options.input || 'severless-secure.yml');
            }
        }
    };
    ServerlessSecure.prototype.pathExists = function (_path) {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (fse.pathExists(_path)) {
                            return [2, true];
                        }
                        return [4, fse.mkdir(_path, function (mkdirres) { return console.error({ mkdirres: mkdirres }); })];
                    case 1:
                        _a.sent();
                        return [4, fse.opendir(_path)];
                    case 2:
                        _a.sent();
                        return [4, fse.pathExists(_path)];
                    case 3: return [2, _a.sent()];
                    case 4:
                        err_1 = _a.sent();
                        this.notification(err_1.message, 'error');
                        return [2, false];
                    case 5: return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.getcompleteFunction = function () {
        var _this = this;
        this.functionList = {};
        return this.serverless.service.getAllFunctions().map(function (func) {
            var _a;
            return (__assign(__assign({}, _this.functionList), (_a = {}, _a[func] = _this.serverless.service.getFunction(func), _a)));
        });
    };
    ServerlessSecure.prototype.mapPolicies = function (content, commands) {
        return __awaiter(this, void 0, void 0, function () {
            var opath, resource, _a, resourcePolicy;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        opath = this.options['ip'] || '.';
                        resource = helper_1.default.compileResourcePolicy(this, commands);
                        _a = content.provider.resourcePolicy, resourcePolicy = _a === void 0 ? [resource] : _a;
                        if (commands === 'secure-secret') {
                            resourcePolicy.push(helper_1.default.compileResourcePolicy(this, 'secure-basic'));
                        }
                        return [4, this.assignContent(content, content.provider, this.assignPolicies(resourcePolicy, resource, opath))];
                    case 1: return [2, content = _b.sent()];
                }
            });
        });
    };
    ServerlessSecure.prototype.assignPolicies = function (resourcePolicy, resource, opath) {
        for (var _i = 0, _a = resourcePolicy; _i < _a.length; _i++) {
            var element = _a[_i];
            var ips = helper_1.default.findValuesDeepByKey(resource.Condition, 'SourceIp');
            if (ips && ips.length && (element.Effect === resource.Effect)) {
                element.Condition.IpAddress.aws.SourceIp = helper_1.default.formatIpaddress(ips, opath);
            }
            else if ((element.Effect === resource.Effect) && (resource.Action === element.Action)) {
                var merged = _.mergeWith({}, element, resource, function (a, b) {
                    if (a === undefined)
                        return b;
                    if (a != b)
                        return [].concat(a, b);
                });
                resourcePolicy[resourcePolicy.indexOf(element)] = merged;
                break;
            }
            else {
                resourcePolicy.push(resource);
                break;
            }
        }
        return resourcePolicy;
    };
    ServerlessSecure.prototype.assignContent = function (content, provider, resourcePolicy) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = __assign(__assign({}, content), { provider: __assign(__assign({}, provider), { resourcePolicy: resourcePolicy }) });
                        if (!!this.isYaml) return [3, 2];
                        return [4, this.sourceFile.updateProperty('provider', content['provider'])];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2, content];
                }
            });
        });
    };
    ServerlessSecure.prototype.contentUpdate = function (_content) {
        var content = _content;
        if (_.has(content['provider'], 'name') && content['provider']['name'] === 'azure') {
            this.notification('Severless Secure is configured for AWS only!!!', 'error');
        }
        content['provider']['apiKeys'] = helper_1.default.updateApiKeys(content);
        content['provider']['environment'] = helper_1.default.updateEnv(content);
        delete content['provider']['variableSyntax'];
        delete content['provider']['versionFunctions'];
        delete content['provider']['environment']['AWS_NODEJS_CONNECTION_REUSE_ENABLED'];
        content['provider']['environment']['SLS_SECRET_KEY'] = this.secretPath[0] || 'sls secure-key --passphrase <password>';
        content['provider']['environment']['SLS_PUBLIC_KEY'] = this.secretPath[1] || 'sls secure-key --passphrase <password>';
        content['provider']['environment']['SLS_PRIVATE_KEY'] = this.secretPath[2] || 'sls secure-key --passphrase <password>';
        content['provider'] = helper_1.default.sortKeys(content['provider']);
        return content;
    };
    ServerlessSecure.prototype.parseConfigFile = function (_content) {
        return __awaiter(this, void 0, void 0, function () {
            var commands, opath, content, _a, _b, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 12, , 13]);
                        commands = this.serverless['processedInput']['commands'][0];
                        opath = this.options.path || this.options.p || '.';
                        content = this.contentUpdate(_content);
                        return [4, this.mapPolicies(content, commands)];
                    case 1:
                        content = _c.sent();
                        _a = commands;
                        switch (_a) {
                            case 'secure': return [3, 2];
                            case 'secure-secret': return [3, 2];
                            case 'secure-session': return [3, 2];
                            case 'secure-key': return [3, 4];
                        }
                        return [3, 6];
                    case 2: return [4, this.mapSecure(content, opath, commands)];
                    case 3:
                        content = _c.sent();
                        return [3, 7];
                    case 4: return [4, this.mapPolicies(content, 'secure-kms')];
                    case 5:
                        content = _c.sent();
                        _c.label = 6;
                    case 6: return [3, 7];
                    case 7:
                        if (!(this.isYaml)) return [3, 9];
                        return [4, this.writeYAML(content)];
                    case 8:
                        _b = _c.sent();
                        return [3, 11];
                    case 9: return [4, this.writeTS(this.sourceFile)];
                    case 10:
                        _b = _c.sent();
                        _c.label = 11;
                    case 11:
                        _b;
                        return [3, 13];
                    case 12:
                        error_3 = _c.sent();
                        this.notification(error_3.message, 'error');
                        return [3, 13];
                    case 13: return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.mapSecure = function (content, opath, commands) {
        return __awaiter(this, void 0, void 0, function () {
            var error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.assignSecretFunc(content, opath, commands)];
                    case 1:
                        content = _a.sent();
                        return [4, this.assignSecureFunc(content, opath, commands)];
                    case 2:
                        content = _a.sent();
                        return [4, this.assignSessionFunc(content, opath, commands)];
                    case 3:
                        content = _a.sent();
                        content['custom'] = helper_1.default.updateCustom(content);
                        content = this.contentUpdate(content);
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 10, , 11]);
                        if (!(!this.isYaml && 'functions' in content)) return [3, 9];
                        return [4, this.sourceFile.updateProperty('custom', content['custom'])];
                    case 5:
                        _a.sent();
                        return [4, this.sourceFile.updateProperty('layers', helper_1.default.sortKeys(content['layers']))];
                    case 6:
                        _a.sent();
                        return [4, this.sourceFile.updateProperty('provider', helper_1.default.sortKeys(content['provider']))];
                    case 7:
                        _a.sent();
                        return [4, this.sourceFile.updateProperty('functions', helper_1.default.sortKeys(content['functions']))];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3, 11];
                    case 10:
                        error_4 = _a.sent();
                        this.notification(error_4.message, 'error');
                        return [3, 11];
                    case 11: return [2, content];
                }
            });
        });
    };
    ServerlessSecure.prototype.assignSecretFunc = function (content, __, commands) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(commands == 'secure-secret')) return [3, 2];
                        _a = content;
                        _b = 'layers';
                        return [4, helper_1.default.updateLayers(content, commands)];
                    case 1:
                        _a[_b] = _c.sent();
                        content['functions'] = _.assign({}, content['functions'], config_1.default.secretFunc('EnCryptMessage'));
                        content['functions'] = _.assign({}, content['functions'], config_1.default.secretFunc('DeCryptMessage'));
                        _c.label = 2;
                    case 2: return [2, content];
                }
            });
        });
    };
    ServerlessSecure.prototype.assignSecureFunc = function (content, opath, commands) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!('functions' in content && commands === 'secure')) return [3, 3];
                        _a = content;
                        _b = 'layers';
                        return [4, helper_1.default.updateLayers(content, commands)];
                    case 1:
                        _a[_b] = _e.sent();
                        _c = content;
                        _d = 'functions';
                        return [4, helper_1.default.updateFunctions(content, opath)];
                    case 2:
                        _c[_d] = _e.sent();
                        content['functions'] = helper_1.default.sortKeys(_.assign({}, content['functions'], config_1.default.secureConfig));
                        _e.label = 3;
                    case 3: return [2, content];
                }
            });
        });
    };
    ServerlessSecure.prototype.assignSessionFunc = function (content, opath, commands) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!('functions' in content && commands === 'secure-session')) return [3, 2];
                        _a = content;
                        _b = 'functions';
                        return [4, helper_1.default.updateSession(content, opath)];
                    case 1:
                        _a[_b] = _c.sent();
                        content['functions'] = helper_1.default.sortKeys(_.assign({}, content['functions'], config_1.default.secureConfig));
                        _c.label = 2;
                    case 2: return [2, content];
                }
            });
        });
    };
    ServerlessSecure.prototype.AWSCLIData = function (provider, options) {
        var _this = this;
        return new bluebird_1.default(function (resolve, reject) {
            var cps = child_process_1.default.spawn(provider, options);
            var packagePath = "";
            cps.stdout.on('data', function (data) { return packagePath += data; });
            cps.stderr.on('data', function (data) { return _this.notification(data.toString(), 'warning'); });
            cps.on('error', reject);
            cps.on('close', function (code) { return code === 0 ? resolve(packagePath.trim()) : reject(); });
        });
    };
    ServerlessSecure.prototype.createKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, commands, options;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.serverless['processedInput'], commands = _a.commands, options = _a.options;
                        this.Passphrase = options.passphrase || options.pass || this.notification('Passphrase not found', 'error');
                        if (!(commands[0] === 'secure-secret')) return [3, 2];
                        return [4, this.buildRSA(this.Passphrase)];
                    case 1:
                        _b.sent();
                        return [3, 4];
                    case 2: return [4, this.setMetaData(this.Passphrase)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.buildRSA = function (Passphrase) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, publicKey, privateKey, _b, _c, _d, _e, _f, _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        this.Passphrase = Passphrase;
                        _a = helper_1.default.generateKeys(this.Passphrase), publicKey = _a.publicKey, privateKey = _a.privateKey;
                        _c = (_b = Promise).all;
                        return [4, this.setMetaData(this.Passphrase)];
                    case 1:
                        _d = [_l.sent()];
                        return [4, this.setSecretKey()];
                    case 2:
                        _c.apply(_b, [_d.concat([_l.sent()])]);
                        _f = (_e = Promise).all;
                        return [4, this.setMetaData(publicKey)];
                    case 3:
                        _g = [_l.sent()];
                        return [4, this.setSecretKey()];
                    case 4:
                        _f.apply(_e, [_g.concat([_l.sent()])]);
                        _j = (_h = Promise).all;
                        return [4, this.setMetaData(privateKey)];
                    case 5:
                        _k = [_l.sent()];
                        return [4, this.setSecretKey()];
                    case 6:
                        _j.apply(_h, [_k.concat([_l.sent()])]);
                        if (this.secretPath.length > 1) {
                            this.notification('Your passphrase key has been saved to: ' + this.secretPath[0], 'info');
                            this.notification('Your publicKey key has been saved to: ' + this.secretPath[1], 'info');
                            this.notification('Your private key has been saved to: ' + this.secretPath[2], 'info');
                        }
                        else {
                            this.notification('Your keys could not be generated', 'warning');
                        }
                        this.notification("Please Share your public key: \n\n\n " + publicKey.toString(), 'warning');
                        return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.setMetaData = function (Passphrase) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, provider, service;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.valid.initialServerlessConfig, provider = _a.provider, service = _a.service;
                        this.keyName = service.name;
                        this.Passphrase = Passphrase;
                        return [4, this.AWSCLIData('aws', ['kms', 'create-key', '--description', this.keyName, '--region', provider.region])
                                .then(function (data) {
                                _this.KeyMetadata = helper_1.default.parseData(data)['KeyMetadata'];
                                _this.keyArn = _this.KeyMetadata.Arn;
                                _this.notification("KMS KeyId :" + _this.KeyMetadata.KeyId, 'info');
                            })];
                    case 1:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.setSecretKey = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, region, value, KeyId, keyName_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!_.has(this.KeyMetadata, 'KeyId')) return [3, 2];
                        _a = this.valid.initialServerlessConfig.provider.region, region = _a === void 0 ? '*' : _a;
                        value = this.KeyMetadata.KeyId.split('-')[0];
                        KeyId = this.KeyMetadata.KeyId;
                        keyName_1 = "/" + this.keyName + "-project/key_" + value;
                        this.secretPath.push('${ssm:' + (keyName_1 + "~true}"));
                        this.secretArn.push('arn:aws:ssm:' + keyName_1);
                        return [4, this.AWSCLIData('aws', ['ssm', 'put-parameter', '--name', keyName_1, '--value', this.Passphrase, '--type', 'SecureString', '--key-id', KeyId, '--region', region])
                                .then(function (data) {
                                _this.SSMdata = helper_1.default.parseData(data);
                                if (_.has(_this.SSMdata, 'Tier')) {
                                    _this.notification("New Secret Set to Tier " + _this.SSMdata.Tier + ": " + keyName_1, 'success');
                                }
                                else {
                                    _this.notification("Sorry your Secret could not be set!!", 'warning');
                                }
                            })
                                .catch(function (err) { return _this.notification(err, 'error'); })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2: return [4, this.beforePath()];
                    case 3:
                        _b.sent();
                        return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.deleteFolder = function (extractPath) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, fse.removeSync(extractPath)];
                    case 1:
                        _a.sent();
                        this.notification("Folder: secure_layer updated..!", 'success');
                        if (!this.isYaml)
                            this.notification("Webpack: .js extensions required!", 'warning');
                        return [3, 3];
                    case 2:
                        err_2 = _a.sent();
                        this.notification(err_2.message, 'error');
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.ignoreErrors = function (sourceFile) {
        var tsIgnore = '//@ts-ignore\n\t\t\t\t\t\t';
        var source = sourceFile.getSourceFile().getFullText();
        var commands = this.serverless['processedInput']['commands'][0];
        if (commands == 'secure-whitelist' || commands == 'secure-blacklist') {
            return source;
        }
        source = _.replace(source, new RegExp('cors:', 'g'), tsIgnore + "cors:");
        return _.replace(source, new RegExp('authorizer:', 'g'), tsIgnore + "authorizer:");
    };
    ServerlessSecure.prototype.writeTS = function (sourceFile) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fse.writeFile(this.secureTS, this.ignoreErrors(sourceFile), { encoding: 'utf8' })
                            .then(this.serverless.cli.log('TS File Updated!'))
                            .catch(function (e) { return _this.notification(e.message, 'error'); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ;
    ServerlessSecure.prototype.writeYAML = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.yawn.json = _.assign({}, this.yawn.json, content);
                        return [4, fse.writeFile(this.secureYAML, this.yawn.yaml, { encoding: 'utf8' })
                                .then(function (__) { return _this.notification('YAML File Updated!', 'info'); })
                                .catch(function (e) { return _this.notification(e.message, 'error'); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ;
    ServerlessSecure.prototype.searchReference = function () {
        var options = this.serverless['processedInput']['options'];
        var request = _.keysIn(options)[0];
        this.policy = helper_1.default.getPolicyType(request, options[request]);
    };
    ServerlessSecure.prototype.listReference = function () {
        if (this.policy.length) {
            this.notification(JSON.stringify(this.policy, true, 2), 'success');
        }
        else {
            this.notification('No reference found!', 'warning');
        }
    };
    ServerlessSecure.prototype.notification = function (message, type) {
        if (type === void 0) { type = ''; }
        switch (type) {
            case 'success':
                this.serverless.cli.log("\u2705 " + chalk_1.default.yellow(message));
                break;
            case 'info':
                this.serverless.cli.log("\u2705 " + chalk_1.default.green(message));
                break;
            case 'warning':
                this.serverless.cli.log("\u274E " + chalk_1.default.magenta(message));
                break;
            case 'error':
                throw new Error(message);
            default:
                this.serverless.cli.log("" + chalk_1.default.yellow(message));
                break;
        }
    };
    return ServerlessSecure;
}());
exports.ServerlessSecure = ServerlessSecure;
