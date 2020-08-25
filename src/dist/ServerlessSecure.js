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
exports.__esModule = true;
exports.ServerlessSecure = void 0;
var request_1 = require("request");
// @ts-ignore
// import pkg from '../../package.json';
var fse = require("fs-extra");
var unzip = require("unzip-stream");
var node_yaml_1 = require("node-yaml");
var path = require("path");
var _ = require("lodash");
var stringify_object_1 = require("stringify-object");
var config_1 = require("./config");
var ServerlessSecure = /** @class */ (function () {
    function ServerlessSecure(serverless, options) {
        this.baseTS = path.join(process.cwd(), 'serverless.ts');
        this.baseYAML = path.join(process.cwd(), 'serverless.yml');
        this.options = options;
        this.serverless = serverless;
        this.hooks = {
            'before:package:finalize': this.apply.bind(this),
            'before:secure:create': this.beforePath.bind(this),
            'after:secure:create': this.afterPath.bind(this)
        };
        this.commands = {
            secure: {
                usage: 'How to secure your lambdas',
                lifecycleEvents: ['create'],
                options: {
                    path: {
                        usage: 'Specify what function you wish to secure: --path <Function Name> or -p <*>',
                        required: true,
                        shortcut: 'p'
                    }
                }
            }
        };
    }
    ServerlessSecure.parseHttpPath = function (_path) {
        return _path[0] === '/' ? _path : "/" + _path;
    };
    ServerlessSecure.prototype.pathExists = function (_path) {
        return __awaiter(this, void 0, Promise, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (fse.pathExists(_path)) {
                            return [2 /*return*/, true];
                        }
                        return [4 /*yield*/, fse.mkdir(_path, function (mkdirres) { return console.error({ mkdirres: mkdirres }); })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, fse.opendir(_path)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, fse.pathExists(_path)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ServerlessSecure.prototype.apply = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // check if update is available
                        // updateNotifier({ pkg }).notify();
                        console.log('Test');
                        return [4 /*yield*/, this.notification('[Serverles-Secure]: Applying plugin...', 'success')];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ServerlessSecure.prototype.getRestFunctions = function () {
        var allFunctions = this.serverless.service.getAllFunctions();
        if (!allFunctions.length) {
            this.notification("slsSecure: No functions found!!", 'error');
        }
        // this.beforePath()
    };
    ServerlessSecure.prototype.beforePath = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.findRequirements();
                        if (!fse.existsSync(this.baseYAML)) return [3 /*break*/, 2];
                        return [4 /*yield*/, node_yaml_1.read(this.baseYAML)
                                .then(function (res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.parseYAML(res, true)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); })["catch"](function (err) { return _this.notification("Error while reading file:\n\n%s " + String(err), 'error'); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (fse.existsSync(this.baseTS)) {
                            this.parseTS();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ServerlessSecure.prototype.afterPath = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.downloadSecureLayer()];
                    case 1:
                        _a.sent();
                        this.serverless.cli.log('List of Secure Paths:');
                        return [2 /*return*/];
                }
            });
        });
    };
    ServerlessSecure.prototype.findRequirements = function () {
        if (!this.options.path && !this.options.p) {
            this.notification("sls secure: No path set!!", 'error');
            return false;
        }
        if (!this.pathExists(process.cwd())) {
            this.notification('Unable to find project directory!', 'error');
            return false;
        }
        return true;
    };
    ;
    ServerlessSecure.prototype.updateCustom = function (content) {
        return _.assign({}, content['custom'], config_1.corsConfig);
    };
    ServerlessSecure.prototype.updateProvider = function (content) {
        var provider = content.provider;
        if (provider && 'apiKeys' in provider) {
            provider['apiKeys'].push('slsSecure');
        }
        else {
            return ['slsSecure'];
        }
        return _.uniq(provider['apiKeys']);
    };
    ServerlessSecure.prototype.updateLayers = function (content) {
        return _.assign({}, content['layers'], config_1.secureLayer);
    };
    ServerlessSecure.prototype.updateFunctions = function (content) {
        return _.assign({}, content['functions'], config_1.secureConfig);
    };
    ServerlessSecure.prototype.parseTS = function () {
        return __awaiter(this, void 0, void 0, function () {
            var open, close, utfArray, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        utfArray = [];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // tslint:disable-next-line: no-invalid-await
                        return [4 /*yield*/, fse.readFile(this.baseTS, 'utf-8', function (err, data) { return __awaiter(_this, void 0, void 0, function () {
                                var serverlessConfiguration, updatedConfig, NewConfig, fileArray;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (err)
                                                return [2 /*return*/];
                                            serverlessConfiguration = require(path.join(process.cwd(), 'serverless.ts'));
                                            return [4 /*yield*/, this.parseYAML(serverlessConfiguration)];
                                        case 1:
                                            updatedConfig = _a.sent();
                                            NewConfig = stringify_object_1["default"](updatedConfig, {
                                                indent: '   ',
                                                singleQuotes: false
                                            }).substring(1);
                                            fileArray = data.split('\n');
                                            fileArray.forEach(function (dataArr, x) {
                                                var lArray = dataArr.split('');
                                                if (lArray.includes('=') && lArray.includes('{')) {
                                                    open = x;
                                                }
                                                if (lArray.includes('}')) {
                                                    close = x;
                                                }
                                            });
                                            utfArray.push(this.parseFile(fileArray, 0, open + 1).join('\n'), NewConfig + '\n', this.parseFile(fileArray, close + 1, fileArray.length + 1).join('\n'));
                                            fse.writeFile(this.baseTS, utfArray.join(''), 'utf-8');
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        // tslint:disable-next-line: no-invalid-await
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        this.notification(error_1.message, 'error');
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ServerlessSecure.prototype.parseYAML = function (_content, isYML) {
        if (isYML === void 0) { isYML = false; }
        return __awaiter(this, void 0, void 0, function () {
            var content, _a, _b, _c, _d, opath, _e, _f, _i, item, events, _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        if (!_content) {
                            return [2 /*return*/];
                        }
                        content = __assign({}, _content);
                        _a = content;
                        _b = 'custom';
                        return [4 /*yield*/, this.updateCustom(content)];
                    case 1:
                        _a[_b] = _l.sent();
                        _c = content['provider'];
                        _d = 'apiKeys';
                        return [4 /*yield*/, this.updateProvider(content)];
                    case 2:
                        _c[_d] = _l.sent();
                        opath = this.options.path || this.options.p;
                        _e = [];
                        for (_f in content['functions'])
                            _e.push(_f);
                        _i = 0;
                        _l.label = 3;
                    case 3:
                        if (!(_i < _e.length)) return [3 /*break*/, 6];
                        item = _e[_i];
                        if (!(opath === '.' || opath === item)) return [3 /*break*/, 5];
                        events = content['functions'][item]['events'] || [];
                        delete content['functions'][item]['events']['name'];
                        return [4 /*yield*/, events.map(function (res) {
                                if (res && 'http' in res) {
                                    res.http['cors'] = '${self:custom.corsValue}';
                                    if (!res['private'] || res['private'] !== true) {
                                        res.http['authorizer'] = 'secureAuthorizer';
                                    }
                                }
                            })];
                    case 4:
                        _l.sent();
                        _l.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 3];
                    case 6:
                        if (!('layers' in content)) return [3 /*break*/, 8];
                        _g = content;
                        _h = 'layers';
                        return [4 /*yield*/, this.updateLayers(content)];
                    case 7:
                        _g[_h] = _l.sent();
                        _l.label = 8;
                    case 8:
                        if (!('functions' in content)) return [3 /*break*/, 10];
                        _j = content;
                        _k = 'functions';
                        return [4 /*yield*/, this.updateFunctions(content)];
                    case 9:
                        _j[_k] = _l.sent();
                        _l.label = 10;
                    case 10:
                        if ('variableSyntax' in content['provider']) {
                            delete content.provider.variableSyntax;
                            content.configValidationMode;
                        }
                        // @ts-ignore
                        console.log(JSON.stringify(content, true, 2));
                        if (!isYML) return [3 /*break*/, 12];
                        return [4 /*yield*/, this.writeYAML(content)];
                    case 11:
                        _l.sent();
                        _l.label = 12;
                    case 12: return [2 /*return*/, content];
                }
            });
        });
    };
    ServerlessSecure.prototype.writeYAML = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // console.log(JSON.stringify(content, true, 2))
                    return [4 /*yield*/, node_yaml_1.write(this.baseYAML, content)
                            .then(this.serverless.cli.log('YAML File Updated!'))["catch"](function (e) { return _this.notification(e.message, 'error'); })];
                    case 1:
                        // console.log(JSON.stringify(content, true, 2))
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    ServerlessSecure.prototype.downloadSecureLayer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that_1, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        that_1 = this;
                        return [4 /*yield*/, request_1["default"]
                                .get(config_1.ZIP_URL)
                                .on('error', function (error) { return _this.notification(error.message, 'error'); })
                                .pipe(fse.createWriteStream(process.cwd() + "/secure_layer.zip"))
                                .on('finish', function () { return that_1.unZipPackage(process.cwd() + "/secure_layer.zip", process.cwd() + "/secure_layer/"); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.error(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServerlessSecure.prototype.unZipPackage = function (extractPath, path) {
        return __awaiter(this, void 0, Promise, function () {
            var that_2, readStream, writeStream, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!fse.existsSync(extractPath)) {
                            throw new Error('...writing secure_layer!');
                        }
                        that_2 = this;
                        readStream = fse.createReadStream(extractPath);
                        writeStream = unzip.Extract({ path: path });
                        return [4 /*yield*/, readStream.pipe(writeStream).on('finish', function () { return that_2.notification('Secure layer applied..', 'success'); })];
                    case 1:
                        _a.sent();
                        ;
                        setTimeout(function () { return _this.deleteFile(path + "handler.js.map"); }, 1000);
                        setTimeout(function () { return _this.deleteFile(extractPath); }, 1000);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        this.notification(err_3.message, 'error');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServerlessSecure.prototype.deleteFile = function (extractPath) {
        return __awaiter(this, void 0, Promise, function () {
            var err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fse.remove(extractPath)];
                    case 1:
                        _a.sent();
                        this.notification("File: " + path.basename(extractPath) + " cleaned..", 'success');
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        this.notification(err_4.message, 'error');
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ServerlessSecure.prototype.notification = function (message, type) {
        this.serverless.cli.log(message);
        switch (type) {
            case 'success':
                break;
            case 'error':
                throw new Error(message);
            default:
                break;
        }
    };
    ServerlessSecure.prototype.parseFile = function (arr, top, bot) {
        return JSON.parse(JSON.stringify(_.slice(arr, top, bot)));
    };
    return ServerlessSecure;
}());
exports.ServerlessSecure = ServerlessSecure;