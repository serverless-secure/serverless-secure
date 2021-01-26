"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const Configstore = require('configstore');
const pkg = require(__dirname + '/../../package.json');
class ConfigStoreWithEnvironmentVariables extends Configstore {
    constructor(id, defaults = undefined, options = {}) {
        super(id, defaults, options);
    }
    get(key) {
        const envKey = `SNYK_CFG_${key.replace(/-/g, '_').toUpperCase()}`;
        const envValue = process.env[envKey];
        return super.has(key) && !envValue ? String(super.get(key)) : envValue;
    }
}
exports.config = new ConfigStoreWithEnvironmentVariables(pkg.name);
//# sourceMappingURL=user-config.js.map