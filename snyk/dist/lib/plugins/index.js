"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPlugin = void 0;
const dockerPlugin = require("snyk-docker-plugin");
const rubygemsPlugin = require("./rubygems");
const mvnPlugin = require("snyk-mvn-plugin");
const gradlePlugin = require("snyk-gradle-plugin");
const sbtPlugin = require("snyk-sbt-plugin");
const pythonPlugin = require("snyk-python-plugin");
const goPlugin = require("snyk-go-plugin");
const nugetPlugin = require("snyk-nuget-plugin");
const phpPlugin = require("snyk-php-plugin");
const nodejsPlugin = require("./nodejs-plugin");
const cocoapodsPlugin = require("@snyk/snyk-cocoapods-plugin");
const errors_1 = require("../errors");
function loadPlugin(packageManager, options = {}) {
    if (options.docker) {
        return dockerPlugin;
    }
    switch (packageManager) {
        case 'npm': {
            return nodejsPlugin;
        }
        case 'rubygems': {
            return rubygemsPlugin;
        }
        case 'maven': {
            return mvnPlugin;
        }
        case 'gradle': {
            return gradlePlugin;
        }
        case 'sbt': {
            return sbtPlugin;
        }
        case 'yarn': {
            return nodejsPlugin;
        }
        case 'pip': {
            return pythonPlugin;
        }
        case 'golangdep':
        case 'gomodules':
        case 'govendor': {
            return goPlugin;
        }
        case 'nuget': {
            return nugetPlugin;
        }
        case 'paket': {
            return nugetPlugin;
        }
        case 'composer': {
            return phpPlugin;
        }
        case 'cocoapods': {
            return cocoapodsPlugin;
        }
        default: {
            throw new errors_1.UnsupportedPackageManagerError(packageManager);
        }
    }
}
exports.loadPlugin = loadPlugin;
//# sourceMappingURL=index.js.map