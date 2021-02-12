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
exports.compileResourcePolicy = exports.unZipPackage = exports.downloadSecureLayer = exports.mkdirRecursively = exports.generateKeys = exports.formatIpaddress = exports.setList = exports.cleanFunction = exports.updateFunctions = exports.setOptions = exports.getPolicyType = exports.updateSession = exports.updateApiKeys = exports.parseData = exports.updateEnv = exports.updateLayers = exports.updateCustom = exports.findValuesDeepByKey = exports.sortKeys = exports.parseHttpPath = exports.deCryptMessage = exports.enCryptMessage = void 0;
var config_1 = require("./config");
var _data = __importStar(require("./managed_policies"));
var config_2 = __importDefault(require("./config"));
var fse = __importStar(require("fs-extra"));
var _ = __importStar(require("lodash"));
var iconv_lite_1 = __importDefault(require("iconv-lite"));
var path = __importStar(require("path"));
var jszip_1 = __importDefault(require("jszip"));
var axios_1 = __importDefault(require("axios"));
var crypto_1 = __importDefault(require("crypto"));
exports.enCryptMessage = function (message, publicKey) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4, crypto_1.default.publicEncrypt(publicKey, Buffer.from(message)).toString('base64')];
        case 1: return [2, _a.sent()];
    }
}); }); };
exports.deCryptMessage = function (en_message, privateKey, passphrase) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4, crypto_1.default.privateDecrypt({ key: privateKey, passphrase: passphrase }, Buffer.from(en_message, 'base64')).toString('utf8')];
        case 1: return [2, _a.sent()];
    }
}); }); };
exports.parseHttpPath = function (_path) { return _path[0] === '/' ? _path : "/" + _path; };
exports.sortKeys = function (data) { return Object.fromEntries(Object.entries(data).sort()); };
exports.findValuesDeepByKey = function (obj, key, res) {
    if (res === void 0) { res = []; }
    return (_.cloneDeepWith(obj, function (v, k) { k == key && res.push(v); }) && res);
};
exports.updateCustom = function (content) {
    return exports.sortKeys(_.assign({}, content['custom'], config_1.corsConfig));
};
exports.updateLayers = function (content, commands) {
    return _.assign({}, content['layers'], (commands === 'secure') ? config_1.secureLayer : config_1.secretLayer);
};
exports.updateEnv = function (content) {
    return __assign(__assign({}, config_1.keyConfig), content['provider']['environment']);
};
exports.parseData = function (data) {
    try {
        return JSON.parse(data);
    }
    catch (error) {
        return data;
    }
};
exports.updateApiKeys = function (content) {
    var provider = content.provider, service = content.service;
    if (provider && !_.has(provider, 'apiKeys')) {
        return [service + "-${opt:stage, 'dev'}"];
    }
    return _.uniq(provider['apiKeys']);
};
exports.updateSession = function (content, opath) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content['functions'][opath] = __assign(__assign({}, config_1.sessionFunc(opath)[opath]), content['functions'][opath]);
                return [4, _.mapValues(content['functions'], function (ele) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2, exports.cleanFunction(ele)];
                    }); }); })];
            case 1:
                _a.sent();
                return [2, content['functions']];
        }
    });
}); };
exports.getPolicyType = function (arnType, word) {
    return _.uniq(_.flattenDeep(exports.findValuesDeepByKey(_data, arnType))).filter(function (ele) { return (!_.isObject(ele) && _.isString(ele) && (ele.match(word) || _.toLower(ele).match(_.toLower(word)))); });
};
exports.setOptions = function (events) { return __awaiter(void 0, void 0, void 0, function () {
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
}); };
exports.updateFunctions = function (content, opath) {
    if (opath !== '.' && !content['functions'][opath]) {
        content['functions'] = _.assign({}, content['functions'], config_1.secureFunc(opath));
    }
    _.mapValues(content['functions'], function (ele, item) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(opath === '.' || opath === item)) return [3, 3];
                    if (!_.has(ele, 'events') || !ele['events'].length) {
                        ele['events'] = config_1.secureFunc(item)[item]['events'];
                    }
                    return [4, exports.setOptions(ele['events'] || [])];
                case 1:
                    _a.sent();
                    return [4, exports.cleanFunction(ele)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [2];
            }
        });
    }); });
    return content['functions'];
};
exports.cleanFunction = function (ele) {
    if (_.has(ele, 'events') && ele['events'].length === 0) {
        delete ele['events'];
    }
    if (_.has(ele, 'events') && _.has(ele['events'][0], 'http')) {
        ele['events'][0].http['cors'] = '${self:custom.corsValue}';
    }
    if (_.has(ele, 'name')) {
        delete ele['name'];
    }
};
exports.setList = function (ips, opath, List) {
    if (ips === void 0) { ips = []; }
    return _.assign({}, config_1.whiteList, __assign(__assign({}, List), { Condition: {
            IpAddress: {
                aws: {
                    SourceIp: exports.formatIpaddress(ips, opath)
                }
            }
        } }));
};
exports.formatIpaddress = function (ips, opath) {
    if (opath === void 0) { opath = ''; }
    ips.push(opath);
    var regx = /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
    ips = _.uniq(ips.join(' ').match(regx));
    return ips.join(' ');
};
exports.generateKeys = function (passphrase) {
    return crypto_1.default.generateKeyPairSync('rsa', {
        modulusLength: 2048,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: "aes-256-cbc",
            passphrase: passphrase
        }
    });
};
exports.mkdirRecursively = function (folderpath, _this) {
    try {
        fse.mkdirsSync(folderpath);
        return true;
    }
    catch (e) {
        if (e.errno === 34) {
            exports.mkdirRecursively(path.dirname(folderpath), _this);
            exports.mkdirRecursively(folderpath, _this);
        }
        else if (e.errno === 47) {
            return true;
        }
        else {
            _this.notification('Error: Unable to create folder %s (errno: %s)', 'error');
            process.exit(2);
        }
    }
};
exports.downloadSecureLayer = function (Layer, _this) { return __awaiter(void 0, void 0, void 0, function () {
    var data, zip;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("" + config_2.default.ZIP_URL + Layer);
                return [4, axios_1.default.get("" + config_2.default.ZIP_URL + Layer, { responseType: 'arraybuffer' })];
            case 1:
                data = (_a.sent()).data;
                zip = new jszip_1.default();
                return [4, zip.loadAsync(data)
                        .then(function (content) { return exports.unZipPackage(zip, content, Layer, _this); })
                        .catch(function (e) { return _this.notification(e.message, 'error'); })];
            case 2:
                _a.sent();
                return [2];
        }
    });
}); };
exports.unZipPackage = function (zip, data, Layer, _this) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            _.keys(data.files).forEach(function (filepath) { return __awaiter(void 0, void 0, void 0, function () {
                var file, savePath, buffer, decoded;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            file = zip.files[filepath];
                            savePath = path.resolve(process.cwd() + ("/" + Layer + "/" + filepath));
                            if (!file.dir) return [3, 1];
                            if (!fse.existsSync(savePath)) {
                                exports.mkdirRecursively(savePath, _this);
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
            _this.notification(error.message, 'error');
        }
        return [2];
    });
}); };
exports.compileResourcePolicy = function (_this, commands) {
    var _a = _this.valid.initialServerlessConfig.provider.region, region = _a === void 0 ? '*' : _a;
    var ResourcePolicy = {
        Effect: 'Allow',
        Principal: '*',
        Action: 'execute-api:Invoke',
        Resource: "*",
    };
    switch (commands) {
        case 'secure-kms':
            ResourcePolicy.Action = 'kms:*';
            ResourcePolicy.Resource = _this.keyArn || "arn:aws:kms:" + region + ":*";
            break;
        case 'secure-key':
            ResourcePolicy.Action = 'ssm:*';
            ResourcePolicy.Resource = "arn:aws:ssm:" + region + ":*";
            break;
        case 'secure-blacklist':
            ResourcePolicy = exports.setList([], _this.options['ip'] || '.', ResourcePolicy);
            ResourcePolicy.Effect = 'Deny';
            break;
        case 'secure-whitelist':
            ResourcePolicy = exports.setList([], _this.options['ip'] || '.', ResourcePolicy);
            break;
        case 'secure':
            ResourcePolicy.Resource = "arn:aws:lambda:" + region + ":*:function:*";
            break;
        case 'secure-secret':
            ResourcePolicy.Action = 'ssm:getParameters*';
            ResourcePolicy.Resource = _this.secretArn || "arn:aws:ssm:" + region + ":*";
            break;
        case 'secure-session':
            ResourcePolicy.Resource = "arn:aws:lambda:" + region + ":*:function:*";
            break;
        case 'secure-basic':
            ResourcePolicy.Action = 'execute-api:Invoke';
            break;
        default:
            ResourcePolicy.Action = '*';
            break;
    }
    return ResourcePolicy;
};
exports.default = {
    compileResourcePolicy: exports.compileResourcePolicy,
    findValuesDeepByKey: exports.findValuesDeepByKey,
    downloadSecureLayer: exports.downloadSecureLayer,
    updateFunctions: exports.updateFunctions,
    formatIpaddress: exports.formatIpaddress,
    cleanFunction: exports.cleanFunction,
    updateApiKeys: exports.updateApiKeys,
    updateSession: exports.updateSession,
    getPolicyType: exports.getPolicyType,
    generateKeys: exports.generateKeys,
    updateCustom: exports.updateCustom,
    updateEnv: exports.updateEnv,
    updateLayers: exports.updateLayers,
    parseData: exports.parseData,
    sortKeys: exports.sortKeys,
    setList: exports.setList
};
