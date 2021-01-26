"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildArgs = exports.inspect = exports.getCommand = void 0;
const tslib_1 = require("tslib");
const javaCallGraphBuilder = require("@snyk/java-call-graph-builder");
const os = require("os");
const fs = require("fs");
const path = require("path");
const parse_mvn_1 = require("./parse-mvn");
const subProcess = require("./sub-process");
const jar_1 = require("./jar");
const error_format_1 = require("./error-format");
const debugModule = require("debug");
const WRAPPERS = ['mvnw', 'mvnw.cmd'];
// To enable debugging output, use `snyk -d`
let logger = null;
function debug(s) {
    if (logger === null) {
        // Lazy init: Snyk CLI needs to process the CLI argument "-d" first.
        // TODO(BST-648): more robust handling of the debug settings
        if (process.env.DEBUG) {
            debugModule.enable(process.env.DEBUG);
        }
        logger = debugModule('snyk-mvn-plugin');
    }
    logger(s);
}
function getCommand(root, targetFile) {
    if (!targetFile) {
        return 'mvn';
    }
    const isWinLocal = /^win/.test(os.platform()); // local check, can be stubbed in tests
    const wrapperScript = isWinLocal ? 'mvnw.cmd' : './mvnw';
    // try to find a sibling wrapper script first
    let pathToWrapper = path.resolve(root, path.dirname(targetFile), wrapperScript);
    if (fs.existsSync(pathToWrapper)) {
        return wrapperScript;
    }
    // now try to find a wrapper in the root
    pathToWrapper = path.resolve(root, wrapperScript);
    if (fs.existsSync(pathToWrapper)) {
        return wrapperScript;
    }
    return 'mvn';
}
exports.getCommand = getCommand;
function getParentDirectory(p) {
    return path.dirname(p);
}
// When we have `mvn`, we can run the subProcess from anywhere.
// However due to https://github.com/takari/maven-wrapper/issues/133, `mvnw` can only be run
// within the directory where `mvnw` exists
function findWrapper(mavenCommand, root, targetPath) {
    if (mavenCommand === 'mvn') {
        return root;
    }
    // In this branch we need to -find- the mvnw location;
    // we start from the containing directory and climb up to the scanned-root-folder
    let foundMVWLocation = false;
    // Look for mvnw in the current directory. if not - climb one up
    let currentFolder = targetPath;
    do {
        if (getParentDirectory(root) === currentFolder || !currentFolder.length) {
            // if we climbed up the tree 1 level higher than our root directory
            throw new Error("Couldn't find mvnw");
        }
        foundMVWLocation = !!WRAPPERS.map((name) => path.join(currentFolder, name)) // paths
            .map(fs.existsSync) // since we're on the client's machine - check if the file exists
            .filter(Boolean).length; // hope for truths & bolleanify
        if (!foundMVWLocation) {
            // if we couldn't find the file, go to the parent, or empty string for quick escape if needed
            currentFolder = getParentDirectory(currentFolder);
        }
    } while (!foundMVWLocation);
    return currentFolder;
}
function inspect(root, targetFile, options) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const targetPath = targetFile
            ? path.resolve(root, targetFile)
            : path.resolve(root);
        if (!fs.existsSync(targetPath)) {
            throw new Error('Could not find file or directory ' + targetPath);
        }
        if (!options) {
            options = { dev: false, scanAllUnmanaged: false };
        }
        if (jar_1.isJar(targetPath)) {
            debug(`Creating pom from jar ${targetFile}`);
            targetFile = yield jar_1.createPomForJar(root, targetFile);
        }
        if (options.scanAllUnmanaged) {
            if (jar_1.containsJar(root)) {
                debug(`Creating pom from jars in for ${root}`);
                targetFile = yield jar_1.createPomForJars(root);
            }
            else {
                throw Error(`Could not find any supported files in '${root}'.`);
            }
        }
        const mavenCommand = getCommand(root, targetFile);
        const mvnWorkingDirectory = findWrapper(mavenCommand, root, targetPath);
        const mvnArgs = buildArgs(root, mvnWorkingDirectory, targetFile, options.args);
        try {
            const result = yield subProcess.execute(mavenCommand, mvnArgs, {
                cwd: mvnWorkingDirectory,
            });
            const versionResult = yield subProcess.execute(`${mavenCommand} --version`, [], {
                cwd: mvnWorkingDirectory,
            });
            const parseResult = parse_mvn_1.parseTree(result, options.dev);
            const { javaVersion, mavenVersion } = parse_mvn_1.parseVersions(versionResult);
            let callGraph;
            let maybeCallGraphMetrics = {};
            if (options.reachableVulns) {
                // NOTE[muscar] We get the timeout in seconds, and the call graph builder
                // wants it in milliseconds
                const timeout = (options === null || options === void 0 ? void 0 : options.callGraphBuilderTimeout) ? (options === null || options === void 0 ? void 0 : options.callGraphBuilderTimeout) * 1000
                    : undefined;
                callGraph = yield getCallGraph(targetPath, timeout);
                maybeCallGraphMetrics = {
                    callGraphMetrics: javaCallGraphBuilder.runtimeMetrics(),
                    callGraphBuilderTimeoutSeconds: options === null || options === void 0 ? void 0 : options.callGraphBuilderTimeout,
                };
            }
            return {
                plugin: {
                    name: 'bundled:maven',
                    runtime: 'unknown',
                    meta: Object.assign({ versionBuildInfo: {
                            metaBuildVersion: {
                                mavenVersion,
                                javaVersion,
                            },
                        } }, maybeCallGraphMetrics),
                },
                package: parseResult.data,
                callGraph,
            };
        }
        catch (error) {
            error.message = error_format_1.formatGenericPluginError(error, mavenCommand, mvnArgs);
            throw error;
        }
    });
}
exports.inspect = inspect;
function buildArgs(rootPath, executionPath, targetFile, mavenArgs) {
    // Requires Maven >= 2.2
    let args = ['dependency:tree', '-DoutputType=dot'];
    if (targetFile) {
        // if we are where we can execute - we preserve the original path;
        // if not - we rely on the executor (mvnw) to be spawned at the closest directory, leaving us w/ the file itself
        if (rootPath === executionPath) {
            args.push('--file="' + targetFile + '"');
        }
        else {
            args.push('--file="' + path.basename(targetFile) + '"');
        }
    }
    if (mavenArgs) {
        args = args.concat(mavenArgs);
    }
    return args;
}
exports.buildArgs = buildArgs;
function getCallGraph(targetPath, timeout) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        debug(`getting call graph from path ${targetPath}`);
        try {
            const callGraph = yield javaCallGraphBuilder.getCallGraphMvn(path.dirname(targetPath), timeout);
            debug('got call graph successfully');
            return callGraph;
        }
        catch (e) {
            debug('call graph error: ' + e);
            return {
                message: e.message,
                innerError: e.innerError || e,
            };
        }
    });
}
//# sourceMappingURL=index.js.map