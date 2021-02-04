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
var config_1 = require("./config");
var ts_update_1 = require("./ts-update");
var cjs_1 = __importDefault(require("yawn-yaml/cjs"));
var fse = __importStar(require("fs-extra"));
var iconv_lite_1 = __importDefault(require("iconv-lite"));
var path = __importStar(require("path"));
var _ = __importStar(require("lodash"));
var jszip_1 = __importDefault(require("jszip"));
var axios_1 = __importDefault(require("axios"));
var ServerlessSecure = (function () {
    function ServerlessSecure(serverless, options) {
        this.isYaml = false;
        this.functionList = [];
        this.baseTS = path.join(process.cwd(), 'serverless.ts');
        this.baseYAML = path.join(process.cwd(), 'serverless.yml');
        this.baseLayer = path.join(process.cwd(), './secure_layer');
        this.secureTS = path.join(process.cwd(), 'serverless-secure.ts');
        this.secureYAML = path.join(process.cwd(), 'serverless-secure.yml');
        this.options = options;
        this.serverless = serverless;
        this.hooks = config_1.hooks(this);
        this.commands = config_1.slsCommands;
    }
    ServerlessSecure.prototype.apply = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.notification('Serverles-Secure: Applied!', 'success')];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.beforeFile = function () {
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
    };
    ServerlessSecure.prototype.afterPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var baseExists, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4, this.pathExists(this.baseLayer)];
                    case 1:
                        baseExists = _a.sent();
                        if (!baseExists) return [3, 3];
                        return [4, this.deleteFolder(this.baseLayer)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4, this.downloadSecureLayer()];
                    case 4:
                        _a.sent();
                        return [3, 6];
                    case 5:
                        error_1 = _a.sent();
                        this.notification("AfterPath error: " + error_1.message, 'error');
                        return [3, 6];
                    case 6:
                        this.notification("\u2728 Serverless-Secure applied \u2728", 'success');
                        return [2];
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
                            .then(function (config) {
                            _this.setFilePath();
                            _this.content = config;
                            if (_this.isYaml) {
                                _this.yawn = new cjs_1.default(_this.content);
                                _this.parseConfigFile(_this.yawn.json);
                            }
                            else {
                                _this.content = config;
                                _this.sourceFile = new ts_update_1.TSConfigUpdate(_this.content);
                                var conf = _this.serverless.service.validate();
                                _this.parseConfigFile(conf.initialServerlessConfig);
                            }
                        })
                            .catch(function (err) { return _this.notification("Error while reading file:\n\n%s " + String(err), 'error'); })];
                    case 1:
                        _a.sent();
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
    ServerlessSecure.prototype.updateEnv = function (content) {
        return __assign(__assign({}, config_1.keyConfig), content['provider']['environment']);
    };
    ServerlessSecure.prototype.updateCustom = function (content) {
        return _.assign({}, content['custom'], config_1.corsConfig);
    };
    ServerlessSecure.prototype.updateLayers = function (content) {
        return _.assign({}, content['layers'], config_1.secureLayer);
    };
    ServerlessSecure.prototype.updateApiKeys = function (content) {
        var provider = content.provider;
        if (provider && !_.has(provider, 'apiKeys')) {
            return ['sls-secure-auth'];
        }
        return _.uniq(provider['apiKeys']);
    };
    ServerlessSecure.prototype.getcompleteFunction = function () {
        var _this = this;
        var funcName = {};
        return this.serverless.service.getAllFunctions().map(function (func) {
            var _a;
            return (__assign(__assign({}, funcName), (_a = {}, _a[func] = _this.serverless.service.getFunction(func), _a)));
        });
    };
    ServerlessSecure.prototype.setOptions = function (events) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, _.map(events, function (res) {
                            if (_.has(res, 'http') || _.has(res, 'httpApi')) {
                                res.http = __assign(__assign({}, res.http), { cors: '${self:custom.corsValue}' });
                                if (!_.has(res['http'], 'private') || res['http']['private'] !== true) {
                                    res.http['authorizer'] = 'secureAuthorizer';
                                }
                                if (!_.has(res['httpApi'], 'private') || res['httpApi']['private'] !== true) {
                                    res.http['authorizer'] = 'secureAuthorizer';
                                }
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.updateFunctions = function (content, opath) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (opath !== '.' && !content['functions'][opath]) {
                            content['functions'] = _.assign(content['functions'], config_1.secureFunc(opath));
                        }
                        return [4, _.mapValues(content['functions'], function (ele, item) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(opath === '.' || opath === item)) return [3, 3];
                                            if (!_.has(ele, 'events') || !ele['events'].length) {
                                                ele['events'] = config_1.secureFunc(item)[item]['events'];
                                            }
                                            return [4, this.setOptions(ele['events'] || [])];
                                        case 1:
                                            _a.sent();
                                            return [4, this.cleanFunction(ele)];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2, content['functions']];
                }
            });
        });
    };
    ServerlessSecure.prototype.updateSession = function (content, opath) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content['functions'][opath] = __assign(__assign({}, config_1.sessionFunc(opath)[opath]), content['functions'][opath]);
                        return [4, _.mapValues(content['functions'], function (ele) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2, this.cleanFunction(ele)];
                            }); }); })];
                    case 1:
                        _a.sent();
                        return [2, content['functions']];
                }
            });
        });
    };
    ServerlessSecure.prototype.cleanFunction = function (ele) {
        if (_.has(ele, 'events') && ele['events'].length === 0) {
            delete ele['events'];
        }
        if (_.has(ele, 'events') && _.has(ele['events'][0], 'http')) {
            ele['events'][0].http['cors'] = '${self:custom.corsValue}';
        }
        if (_.has(ele, 'name')) {
            delete ele['name'];
        }
        this.functionList.push(ele);
    };
    ServerlessSecure.prototype.contentUpdate = function (_content) {
        var content = _content;
        content['provider']['apiKeys'] = this.updateApiKeys(content);
        content['provider']['environment'] = this.updateEnv(content);
        delete content['provider']['stage'];
        delete content['provider']['region'];
        delete content['provider']['variableSyntax'];
        delete content['provider']['versionFunctions'];
        this.ApiKey = content['provider']['environment']['SLS_SECRET_KEY'];
        if (_.has(content['provider'], 'name') && content['provider']['name'] === 'azure') {
            this.notification('Severless Secure is is configured for AWS only!!!', 'error');
        }
        return content;
    };
    ServerlessSecure.prototype.parseConfigFile = function (_content) {
        return __awaiter(this, void 0, void 0, function () {
            var content, commands, opath, _a, _b, _c, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        content = this.contentUpdate(_content);
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 15, , 16]);
                        commands = this.serverless['processedInput']['commands'][0];
                        opath = this.options.path || this.options.p || '.';
                        _a = commands;
                        switch (_a) {
                            case 'secure': return [3, 2];
                            case 'secure-session': return [3, 2];
                            case 'secure-whitelist': return [3, 7];
                            case 'secure-blacklist': return [3, 7];
                        }
                        return [3, 9];
                    case 2:
                        if (!(this.isYaml)) return [3, 4];
                        return [4, this.mapSecureYML(content, opath, commands)];
                    case 3:
                        _b = _d.sent();
                        return [3, 6];
                    case 4: return [4, this.mapSecure(content, opath, commands)];
                    case 5:
                        _b = _d.sent();
                        _d.label = 6;
                    case 6:
                        _b;
                        return [3, 10];
                    case 7: return [4, this.mapWhitelist(content, opath, commands)];
                    case 8:
                        content = _d.sent();
                        return [3, 10];
                    case 9:
                        this.notification("Error while reading file:\n\n%s " + String(commands), 'error');
                        return [3, 10];
                    case 10:
                        if (!(this.isYaml)) return [3, 12];
                        return [4, this.writeYAML(content)];
                    case 11:
                        _c = _d.sent();
                        return [3, 14];
                    case 12: return [4, this.writeTS(this.sourceFile)];
                    case 13:
                        _c = _d.sent();
                        _d.label = 14;
                    case 14: return [2, _c];
                    case 15:
                        error_2 = _d.sent();
                        this.notification(error_2.message, 'error');
                        return [3, 16];
                    case 16: return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.formatIpaddress = function (ips, opath) {
        if (opath === void 0) { opath = ''; }
        ips.push(opath);
        var regx = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
        ips = _.uniq(ips.join(' ').match(regx));
        return ips.join(' ');
    };
    ServerlessSecure.prototype.setList = function (ips, Effect, opath) {
        if (ips === void 0) { ips = []; }
        return _.assign({}, config_1.whiteList, {
            Effect: Effect,
            Condition: {
                IpAddress: {
                    aws: {
                        SourceIp: this.formatIpaddress(ips, opath)
                    }
                }
            }
        });
    };
    ServerlessSecure.prototype.mapWhitelist = function (content, opath, commands) {
        if (opath === void 0) { opath = ''; }
        return __awaiter(this, void 0, void 0, function () {
            var provider, Effect, _a, resourcePolicy, findValuesDeepByKey, _i, resourcePolicy_1, element, ips;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        provider = content.provider;
                        Effect = (commands == 'secure-whitelist') ? 'Allow' : 'Deny';
                        _a = provider.resourcePolicy, resourcePolicy = _a === void 0 ? [this.setList([], Effect, opath)] : _a;
                        findValuesDeepByKey = function (obj, key, res) {
                            if (res === void 0) { res = []; }
                            return (_.cloneDeepWith(obj, function (v, k) { k == key && res.push(v); }) && res);
                        };
                        if (!resourcePolicy.filter(function (ele) { return (ele.Effect == Effect && findValuesDeepByKey(ele.Condition, 'SourceIp')); }).length) {
                            resourcePolicy.push(this.setList([], Effect, opath));
                        }
                        else {
                            for (_i = 0, resourcePolicy_1 = resourcePolicy; _i < resourcePolicy_1.length; _i++) {
                                element = resourcePolicy_1[_i];
                                ips = findValuesDeepByKey(element.Condition, 'SourceIp');
                                if (ips && ips.length && element.Effect === Effect) {
                                    element.Condition.IpAddress.aws.SourceIp = this.formatIpaddress(ips, opath);
                                }
                            }
                        }
                        provider = __assign(__assign({}, provider), { resourcePolicy: resourcePolicy });
                        content = __assign(__assign({}, content), { provider: provider });
                        if (!!this.isYaml) return [3, 2];
                        return [4, this.sourceFile.updateProperty('provider', provider)];
                    case 1:
                        _b.sent();
                        return [3, 3];
                    case 2: return [2, content];
                    case 3: return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.mapSecure = function (content, opath, commands) {
        return __awaiter(this, void 0, void 0, function () {
            var func, _a, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 10, , 11]);
                        if (!('functions' in content)) return [3, 9];
                        if (!(commands === 'secure')) return [3, 2];
                        return [4, this.updateFunctions(content, opath)];
                    case 1:
                        _a = _b.sent();
                        return [3, 4];
                    case 2: return [4, this.updateSession(content, opath)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        func = _a;
                        return [4, this.sourceFile.updateProperty('custom', config_1.sortKeys(this.updateCustom(content)))];
                    case 5:
                        _b.sent();
                        return [4, this.sourceFile.updateProperty('layers', this.updateLayers(content))];
                    case 6:
                        _b.sent();
                        return [4, this.sourceFile.updateProperty('provider', config_1.sortKeys(content['provider']))];
                    case 7:
                        _b.sent();
                        return [4, this.sourceFile.updateProperty('functions', config_1.sortKeys(_.assign({}, func, config_1.secureConfig)))];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [2, content];
                    case 10:
                        error_3 = _b.sent();
                        this.notification(error_3.message, 'error');
                        return [3, 11];
                    case 11: return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.mapSecureYML = function (_content, opath, commands) {
        return __awaiter(this, void 0, void 0, function () {
            var content, _a, _b, _c, _d, _e, error_4;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        _f.trys.push([0, 8, , 9]);
                        if (!('functions' in _content)) return [3, 7];
                        _a = [__assign({}, this.contentUpdate(_content))];
                        _b = {};
                        return [4, config_1.sortKeys(this.updateCustom(_content))];
                    case 1:
                        _b.custom = _f.sent();
                        return [4, this.updateLayers(_content)];
                    case 2:
                        content = __assign.apply(void 0, _a.concat([(_b.layers = _f.sent(), _b)]));
                        _c = content;
                        _d = 'functions';
                        if (!(commands === 'secure')) return [3, 4];
                        return [4, this.updateFunctions(content, opath)];
                    case 3:
                        _e = _f.sent();
                        return [3, 6];
                    case 4: return [4, this.updateSession(content, opath)];
                    case 5:
                        _e = _f.sent();
                        _f.label = 6;
                    case 6:
                        _c[_d] = _e;
                        _f.label = 7;
                    case 7: return [3, 9];
                    case 8:
                        error_4 = _f.sent();
                        this.notification(error_4.message, 'error');
                        return [3, 9];
                    case 9: return [2];
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
                                .then(this.serverless.cli.log('YAML File Updated!'))
                                .catch(function (e) { return _this.notification(e.message, 'error'); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ;
    ServerlessSecure.prototype.mkdirRecursively = function (folderpath) {
        try {
            fse.mkdirsSync(folderpath);
            return true;
        }
        catch (e) {
            if (e.errno === 34) {
                this.mkdirRecursively(path.dirname(folderpath));
                this.mkdirRecursively(folderpath);
            }
            else if (e.errno === 47) {
                return true;
            }
            else {
                this.notification('Error: Unable to create folder %s (errno: %s)', 'error');
                process.exit(2);
            }
        }
    };
    ServerlessSecure.prototype.downloadSecureLayer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var zip, URL, data;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        zip = new jszip_1.default();
                        URL = config_1.ZIP_URL + "pullzip?key=" + this.ApiKey;
                        return [4, axios_1.default.get(URL, { responseType: 'arraybuffer' })];
                    case 1:
                        data = (_a.sent()).data;
                        return [4, zip.loadAsync(data)
                                .then(function (content) { return _this.unZipPackage(zip, content); })
                                .catch(function (e) { return _this.notification(e.message, 'error'); })];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    ServerlessSecure.prototype.unZipPackage = function (zip, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    _.keys(data.files).forEach(function (filepath) { return __awaiter(_this, void 0, void 0, function () {
                        var file, savePath, buffer, decoded;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    file = zip.files[filepath];
                                    savePath = path.resolve(process.cwd() + ("/secure_layer/" + filepath));
                                    if (!file.dir) return [3, 1];
                                    if (!fse.existsSync(savePath)) {
                                        this.mkdirRecursively(savePath);
                                    }
                                    return [3, 4];
                                case 1: return [4, file.async('nodebuffer')];
                                case 2:
                                    buffer = _a.sent();
                                    decoded = iconv_lite_1.default.decode(buffer, 'utf8');
                                    return [4, fse.writeFile(savePath, decoded, { encoding: 'utf8' })];
                                case 3:
                                    _a.sent();
                                    _a.label = 4;
                                case 4: return [2];
                            }
                        });
                    }); });
                }
                catch (error) {
                    this.notification(error.message, 'error');
                }
                return [2];
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
                            this.notification("Webpack: .js extensions required!", 'success');
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
    ServerlessSecure.prototype.notification = function (message, type) {
        this.serverless.cli.log(message);
        switch (type) {
            case 'success':
                break;
            case 'warning':
                console.error(message);
                break;
            case 'error':
                throw new Error(message);
            default:
                break;
        }
    };
    return ServerlessSecure;
}());
exports.ServerlessSecure = ServerlessSecure;
