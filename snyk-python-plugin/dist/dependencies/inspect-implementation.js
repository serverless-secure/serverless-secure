"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildArgs = exports.inspectInstalledDeps = exports.getMetaData = void 0;
const tslib_1 = require("tslib");
const fs = require("fs");
const path = require("path");
const tmp = require("tmp");
const subProcess = require("./sub-process");
function getMetaData(command, baseargs, root, targetFile) {
    return subProcess
        .execute(command, [...baseargs, '--version'], { cwd: root })
        .then((output) => {
        return {
            name: 'snyk-python-plugin',
            runtime: output.replace('\n', ''),
            // specify targetFile only in case of Pipfile or setup.py
            targetFile: path.basename(targetFile).match(/^(Pipfile|setup\.py)$/)
                ? targetFile
                : undefined,
        };
    });
}
exports.getMetaData = getMetaData;
// path.join calls have to be exactly in this format, needed by "pkg" to build a standalone Snyk CLI binary:
// https://www.npmjs.com/package/pkg#detecting-assets-in-source-code
function createAssets() {
    return [
        path.join(__dirname, '../../pysrc/pip_resolve.py'),
        path.join(__dirname, '../../pysrc/distPackage.py'),
        path.join(__dirname, '../../pysrc/package.py'),
        path.join(__dirname, '../../pysrc/pipfile.py'),
        path.join(__dirname, '../../pysrc/reqPackage.py'),
        path.join(__dirname, '../../pysrc/setup_file.py'),
        path.join(__dirname, '../../pysrc/utils.py'),
        path.join(__dirname, '../../pysrc/requirements/fragment.py'),
        path.join(__dirname, '../../pysrc/requirements/parser.py'),
        path.join(__dirname, '../../pysrc/requirements/requirement.py'),
        path.join(__dirname, '../../pysrc/requirements/vcs.py'),
        path.join(__dirname, '../../pysrc/requirements/__init__.py'),
        path.join(__dirname, '../../pysrc/pytoml/__init__.py'),
        path.join(__dirname, '../../pysrc/pytoml/core.py'),
        path.join(__dirname, '../../pysrc/pytoml/parser.py'),
        path.join(__dirname, '../../pysrc/pytoml/writer.py'),
    ];
}
function writeFile(writeFilePath, contents) {
    const dirPath = path.dirname(writeFilePath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    fs.writeFileSync(writeFilePath, contents);
}
function getFilePathRelativeToDumpDir(filePath) {
    let pathParts = filePath.split('\\pysrc\\');
    // Windows
    if (pathParts.length > 1) {
        return pathParts[1];
    }
    // Unix
    pathParts = filePath.split('/pysrc/');
    return pathParts[1];
}
function dumpAllFilesInTempDir(tempDirName) {
    createAssets().forEach((currentReadFilePath) => {
        if (!fs.existsSync(currentReadFilePath)) {
            throw new Error('The file `' + currentReadFilePath + '` is missing');
        }
        const relFilePathToDumpDir = getFilePathRelativeToDumpDir(currentReadFilePath);
        const writeFilePath = path.join(tempDirName, relFilePathToDumpDir);
        const contents = fs.readFileSync(currentReadFilePath, 'utf8');
        writeFile(writeFilePath, contents);
    });
}
function inspectInstalledDeps(command, baseargs, root, targetFile, allowMissing, includeDevDeps, args) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const tempDirObj = tmp.dirSync({
            unsafeCleanup: true,
        });
        dumpAllFilesInTempDir(tempDirObj.name);
        try {
            // See ../../pysrc/README.md
            const output = yield subProcess.execute(command, [
                ...baseargs,
                ...buildArgs(targetFile, allowMissing, tempDirObj.name, includeDevDeps, args),
            ], { cwd: root });
            return JSON.parse(output);
        }
        catch (error) {
            if (typeof error === 'string') {
                if (error.indexOf('Required packages missing') !== -1) {
                    let errMsg = error;
                    if (path.basename(targetFile) === 'Pipfile') {
                        errMsg += '\nPlease run `pipenv update`.';
                    }
                    else if (path.basename(targetFile) === 'setup.py') {
                        errMsg += '\nPlease run `pip install -e .`.';
                    }
                    else {
                        errMsg += '\nPlease run `pip install -r ' + targetFile + '`.';
                    }
                    errMsg += ' If the issue persists try again with --skip-unresolved.';
                    throw new Error(errMsg);
                }
            }
            throw error;
        }
        finally {
            tempDirObj.removeCallback();
        }
    });
}
exports.inspectInstalledDeps = inspectInstalledDeps;
// Exported for tests only
function buildArgs(targetFile, allowMissing, tempDirPath, includeDevDeps, extraArgs) {
    const pathToRun = path.join(tempDirPath, 'pip_resolve.py');
    let args = [pathToRun];
    if (targetFile) {
        args.push(targetFile);
    }
    if (allowMissing) {
        args.push('--allow-missing');
    }
    if (includeDevDeps) {
        args.push('--dev-deps');
    }
    if (extraArgs) {
        args = args.concat(extraArgs);
    }
    return args;
}
exports.buildArgs = buildArgs;
//# sourceMappingURL=inspect-implementation.js.map