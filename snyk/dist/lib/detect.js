"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPackageManagerFromFile = exports.detectPackageFile = exports.isLocalFolder = exports.isIacProject = exports.detectPackageManager = exports.isPathToPackageFile = exports.AUTO_DETECTABLE_FILES = void 0;
const fs = require("fs");
const pathLib = require("path");
const debugLib = require("debug");
const _ = require("lodash");
const errors_1 = require("./errors");
const iac_parser_1 = require("./iac/iac-parser");
const unsupported_options_iac_error_1 = require("./errors/unsupported-options-iac-error");
const debug = debugLib('snyk-detect');
const DETECTABLE_FILES = [
    'yarn.lock',
    'package-lock.json',
    'package.json',
    'Gemfile',
    'Gemfile.lock',
    'pom.xml',
    'build.gradle',
    'build.gradle.kts',
    'build.sbt',
    'Pipfile',
    'requirements.txt',
    'Gopkg.lock',
    'go.mod',
    'vendor/vendor.json',
    'obj/project.assets.json',
    'project.assets.json',
    'packages.config',
    'paket.dependencies',
    'composer.lock',
    'Podfile',
    'Podfile.lock',
];
exports.AUTO_DETECTABLE_FILES = [
    'package-lock.json',
    'yarn.lock',
    'package.json',
    'Gemfile',
    'Gemfile.lock',
    'pom.xml',
    'packages.config',
    'paket.dependencies',
    'project.json',
    'project.assets.json',
    'Podfile',
    'Podfile.lock',
    'composer.lock',
    'Gopkg.lock',
    'go.mod',
    'vendor.json',
    'Pipfile',
    'requirements.txt',
    'build.sbt',
    'build.gradle',
    'build.gradle.kts',
];
// when file is specified with --file, we look it up here
const DETECTABLE_PACKAGE_MANAGERS = {
    Gemfile: 'rubygems',
    'Gemfile.lock': 'rubygems',
    '.gemspec': 'rubygems',
    'package-lock.json': 'npm',
    'pom.xml': 'maven',
    '.jar': 'maven',
    '.war': 'maven',
    'build.gradle': 'gradle',
    'build.gradle.kts': 'gradle',
    'build.sbt': 'sbt',
    'yarn.lock': 'yarn',
    'package.json': 'npm',
    Pipfile: 'pip',
    'setup.py': 'pip',
    'requirements.txt': 'pip',
    'Gopkg.lock': 'golangdep',
    'go.mod': 'gomodules',
    'vendor.json': 'govendor',
    'project.assets.json': 'nuget',
    'packages.config': 'nuget',
    'project.json': 'nuget',
    'paket.dependencies': 'paket',
    'composer.lock': 'composer',
    'Podfile.lock': 'cocoapods',
    'CocoaPods.podfile.yaml': 'cocoapods',
    'CocoaPods.podfile': 'cocoapods',
    Podfile: 'cocoapods',
};
function isPathToPackageFile(path) {
    for (const fileName of DETECTABLE_FILES) {
        if (_.endsWith(path, fileName)) {
            return true;
        }
    }
    return false;
}
exports.isPathToPackageFile = isPathToPackageFile;
function detectPackageManager(root, options) {
    // If user specified a package manager let's use it.
    if (options.packageManager) {
        return options.packageManager;
    }
    // The package manager used by a docker container is not known ahead of time
    if (options.docker) {
        return undefined;
    }
    let packageManager;
    let file;
    if (isLocalFolder(root)) {
        if (options.file) {
            if (localFileSuppliedButNotFound(root, options.file)) {
                throw new Error('Could not find the specified file: ' +
                    options.file +
                    '\nPlease check that it exists and try again.');
            }
            file = options.file;
            packageManager = detectPackageManagerFromFile(file);
        }
        else if (options.scanAllUnmanaged) {
            packageManager = 'maven';
        }
        else {
            debug('no file specified. Trying to autodetect in base folder ' + root);
            file = detectPackageFile(root);
            if (file) {
                packageManager = detectPackageManagerFromFile(file);
            }
        }
    }
    else {
        debug('specified parameter is not a folder, trying to lookup as repo');
        const registry = options.registry || 'npm';
        packageManager = detectPackageManagerFromRegistry(registry);
    }
    if (!packageManager) {
        throw errors_1.NoSupportedManifestsFoundError([root]);
    }
    return packageManager;
}
exports.detectPackageManager = detectPackageManager;
function isIacProject(root, options) {
    if (options.file) {
        debug('Iac - --file specified ' + options.file);
        throw unsupported_options_iac_error_1.UnsupportedOptionFileIacError(options.file);
    }
    if (isLocalFolder(root)) {
        debug('Iac - folder case ' + root);
        throw unsupported_options_iac_error_1.SupportLocalFileOnlyIacError();
    }
    if (localFileSuppliedButNotFound(root, '.') || !fs.existsSync(root)) {
        throw unsupported_options_iac_error_1.SupportLocalFileOnlyIacError();
    }
    const filePath = pathLib.resolve(root, '.');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    iac_parser_1.validateK8sFile(fileContent, filePath, root);
    return 'k8sconfig';
}
exports.isIacProject = isIacProject;
// User supplied a "local" file, but that file doesn't exist
function localFileSuppliedButNotFound(root, file) {
    return (file && fs.existsSync(root) && !fs.existsSync(pathLib.resolve(root, file)));
}
function isLocalFolder(root) {
    try {
        return fs.lstatSync(root).isDirectory();
    }
    catch (e) {
        return false;
    }
}
exports.isLocalFolder = isLocalFolder;
function detectPackageFile(root) {
    for (const file of DETECTABLE_FILES) {
        if (fs.existsSync(pathLib.resolve(root, file))) {
            debug('found package file ' + file + ' in ' + root);
            return file;
        }
    }
    debug('no package file found in ' + root);
}
exports.detectPackageFile = detectPackageFile;
function detectPackageManagerFromFile(file) {
    let key = pathLib.basename(file);
    // TODO: fix this to use glob matching instead
    // like *.gemspec
    if (/\.gemspec$/.test(key)) {
        key = '.gemspec';
    }
    if (/\.jar$/.test(key)) {
        key = '.jar';
    }
    if (/\.war$/.test(key)) {
        key = '.war';
    }
    if (!(key in DETECTABLE_PACKAGE_MANAGERS)) {
        // we throw and error here because the file was specified by the user
        throw new Error('Could not detect package manager for file: ' + file);
    }
    return DETECTABLE_PACKAGE_MANAGERS[key];
}
exports.detectPackageManagerFromFile = detectPackageManagerFromFile;
function detectPackageManagerFromRegistry(registry) {
    return registry;
}
//# sourceMappingURL=detect.js.map