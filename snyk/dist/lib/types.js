"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportedCliCommands = void 0;
var SupportedCliCommands;
(function (SupportedCliCommands) {
    SupportedCliCommands["version"] = "version";
    SupportedCliCommands["help"] = "help";
    // config = 'config', // TODO: cleanup `$ snyk config` parsing logic before adding it here
    // auth = 'auth', // TODO: auth does not support argv._ at the moment
    SupportedCliCommands["test"] = "test";
    SupportedCliCommands["monitor"] = "monitor";
    SupportedCliCommands["protect"] = "protect";
    SupportedCliCommands["policy"] = "policy";
    SupportedCliCommands["ignore"] = "ignore";
    SupportedCliCommands["wizard"] = "wizard";
    SupportedCliCommands["woof"] = "woof";
})(SupportedCliCommands = exports.SupportedCliCommands || (exports.SupportedCliCommands = {}));
//# sourceMappingURL=types.js.map