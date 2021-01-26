"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallGraph = exports.getClassPerJarMapping = exports.getTargets = exports.getCallGraphGenCommandArgs = void 0;
const tslib_1 = require("tslib");
require("source-map-support/register");
const jszip = require("jszip");
const path = require("path");
const config = require("./config");
const sub_process_1 = require("./sub-process");
const fetch_snyk_java_call_graph_generator_1 = require("./fetch-snyk-java-call-graph-generator");
const call_graph_1 = require("./call-graph");
const promisifedFs = require("./promisified-fs-glob");
const promisified_fs_glob_1 = require("./promisified-fs-glob");
const class_parsing_1 = require("./class-parsing");
const metrics_1 = require("./metrics");
const tempDir = require("temp-dir");
const errors_1 = require("./errors");
function getCallGraphGenCommandArgs(classPath, jarPath, targets) {
    return [
        '-cp',
        jarPath,
        'io.snyk.callgraph.app.App',
        '--application-classpath-file',
        classPath,
        '--dirs-to-get-entrypoints',
        targets.join(','),
    ];
}
exports.getCallGraphGenCommandArgs = getCallGraphGenCommandArgs;
function getTargets(targetPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const targetDirs = yield promisified_fs_glob_1.glob(path.join(targetPath, '**/target'));
        if (!targetDirs.length) {
            throw new errors_1.MissingTargetFolderError(targetPath);
        }
        return targetDirs;
    });
}
exports.getTargets = getTargets;
function getClassPerJarMapping(classPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const classPerJarMapping = {};
        for (const classPathItem of classPath.split(path.delimiter)) {
            // classpath can also contain local directories with classes - we don't need them for package mapping
            if (!classPathItem.endsWith('.jar')) {
                continue;
            }
            const jarFileContent = yield promisified_fs_glob_1.readFile(classPathItem);
            const jarContent = yield jszip.loadAsync(jarFileContent);
            for (const classFile of Object.keys(jarContent.files).filter((name) => name.endsWith('.class'))) {
                const className = class_parsing_1.toFQclassName(classFile.replace('.class', '')); // removing .class from name
                classPerJarMapping[className] = classPathItem;
            }
        }
        return classPerJarMapping;
    });
}
exports.getClassPerJarMapping = getClassPerJarMapping;
function getCallGraph(classPath, targetPath, timeout) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const [jarPath, targets, { tmpDir, classPathFile }] = yield Promise.all([
            fetch_snyk_java_call_graph_generator_1.fetch(config.CALL_GRAPH_GENERATOR_URL, config.CALL_GRAPH_GENERATOR_CHECKSUM),
            metrics_1.timeIt('getEntrypoints', () => getTargets(targetPath)),
            writeClassPathToTempDir(classPath),
        ]);
        const callgraphGenCommandArgs = getCallGraphGenCommandArgs(classPathFile, jarPath, targets);
        try {
            const [javaOutput, classPerJarMapping] = yield Promise.all([
                metrics_1.timeIt('generateCallGraph', () => sub_process_1.execute('java', callgraphGenCommandArgs, {
                    cwd: targetPath,
                    timeout,
                })),
                metrics_1.timeIt('mapClassesPerJar', () => getClassPerJarMapping(classPath)),
            ]);
            return call_graph_1.buildCallGraph(javaOutput, classPerJarMapping);
        }
        finally {
            // Fire and forget - we don't have to wait for a deletion of a temporary file
            cleanupTempDir(classPathFile, tmpDir);
        }
    });
}
exports.getCallGraph = getCallGraph;
function writeClassPathToTempDir(classPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const tmpDir = yield promisifedFs.mkdtemp(path.join(tempDir, 'call-graph-generator'));
        const classPathFile = path.join(tmpDir, 'callgraph-classpath');
        yield promisifedFs.writeFile(classPathFile, classPath);
        return { tmpDir, classPathFile };
    });
}
function cleanupTempDir(classPathFile, tmpDir) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            yield promisifedFs.unlink(classPathFile);
            yield promisifedFs.rmdir(tmpDir);
        }
        catch (_a) {
            // we couldn't delete temporary data in temporary folder, no big deal
        }
    });
}
//# sourceMappingURL=java-wrapper.js.map