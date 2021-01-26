"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = exports.getStats = exports.readDirectory = void 0;
const fs = require("fs");
const pathLib = require("path");
const _ = require("lodash");
const detect_1 = require("./detect");
const debugModule = require("debug");
const debug = debugModule('snyk:find-files');
// TODO: use util.promisify once we move to node 8
/**
 * Returns files inside given file path.
 *
 * @param path file path.
 */
async function readDirectory(path) {
    return await new Promise((resolve, reject) => {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            }
            resolve(files);
        });
    });
}
exports.readDirectory = readDirectory;
/**
 * Returns file stats object for given file path.
 *
 * @param path path to file or directory.
 */
async function getStats(path) {
    return await new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                reject(err);
            }
            resolve(stats);
        });
    });
}
exports.getStats = getStats;
/**
 * Find all files in given search path. Returns paths to files found.
 *
 * @param path file path to search.
 * @param ignore (optional) files to ignore. Will always ignore node_modules.
 * @param filter (optional) file names to find. If not provided all files are returned.
 * @param levelsDeep (optional) how many levels deep to search, defaults to two, this path and one sub directory.
 */
async function find(path, ignore = [], filter = [], levelsDeep = 4) {
    const found = [];
    const foundAll = [];
    // ensure we ignore find against node_modules path.
    if (path.endsWith('node_modules')) {
        return { files: found, allFilesFound: foundAll };
    }
    // ensure node_modules is always ignored
    if (!ignore.includes('node_modules')) {
        ignore.push('node_modules');
    }
    try {
        if (levelsDeep < 0) {
            return { files: found, allFilesFound: foundAll };
        }
        else {
            levelsDeep--;
        }
        const fileStats = await getStats(path);
        if (fileStats.isDirectory()) {
            const { files, allFilesFound } = await findInDirectory(path, ignore, filter, levelsDeep);
            found.push(...files);
            foundAll.push(...allFilesFound);
        }
        else if (fileStats.isFile()) {
            const fileFound = findFile(path, filter);
            if (fileFound) {
                found.push(fileFound);
                foundAll.push(fileFound);
            }
        }
        const filteredOutFiles = foundAll.filter((f) => !found.includes(f));
        if (filteredOutFiles.length) {
            debug(`Filtered out ${filteredOutFiles.length}/${foundAll.length} files: ${foundAll.join(', ')}`);
        }
        return { files: filterForDefaultManifests(found), allFilesFound: foundAll };
    }
    catch (err) {
        throw new Error(`Error finding files in path '${path}'.\n${err.message}`);
    }
}
exports.find = find;
function findFile(path, filter = []) {
    if (filter.length > 0) {
        const filename = pathLib.basename(path);
        if (filter.includes(filename)) {
            return path;
        }
    }
    else {
        return path;
    }
    return null;
}
async function findInDirectory(path, ignore = [], filter = [], levelsDeep = 4) {
    const files = await readDirectory(path);
    const toFind = files
        .filter((file) => !ignore.includes(file))
        .map((file) => {
        const resolvedPath = pathLib.resolve(path, file);
        if (!fs.existsSync(resolvedPath)) {
            debug('File does not seem to exist, skipping: ', file);
            return { files: [], allFilesFound: [] };
        }
        return find(resolvedPath, ignore, filter, levelsDeep);
    });
    const found = await Promise.all(toFind);
    return {
        files: Array.prototype.concat.apply([], found.map((f) => f.files)),
        allFilesFound: Array.prototype.concat.apply([], found.map((f) => f.allFilesFound)),
    };
}
function filterForDefaultManifests(files) {
    // take all the files in the same dir & filter out
    // based on package Manager
    if (files.length <= 1) {
        return files;
    }
    const filteredFiles = [];
    const foundFiles = _(files)
        .filter(Boolean)
        .filter((p) => fs.existsSync(p))
        .map((p) => (Object.assign(Object.assign({ path: p }, pathLib.parse(p)), { packageManager: detectProjectTypeFromFile(p) })))
        .sortBy('dir')
        .groupBy('dir')
        .value();
    for (const directory of Object.keys(foundFiles)) {
        const filesInDirectory = foundFiles[directory];
        const groupedFiles = _(filesInDirectory)
            .filter((p) => !!p.packageManager)
            .groupBy('packageManager')
            .value();
        for (const packageManager of Object.keys(groupedFiles)) {
            const filesPerPackageManager = groupedFiles[packageManager];
            if (filesPerPackageManager.length <= 1) {
                const shouldSkip = shouldSkipAddingFile(packageManager, filesPerPackageManager[0].path, filteredFiles);
                if (shouldSkip) {
                    continue;
                }
                filteredFiles.push(filesPerPackageManager[0].path);
                continue;
            }
            const defaultManifestFileName = chooseBestManifest(filesPerPackageManager, packageManager);
            if (defaultManifestFileName) {
                const shouldSkip = shouldSkipAddingFile(packageManager, filesPerPackageManager[0].path, filteredFiles);
                if (shouldSkip) {
                    continue;
                }
                filteredFiles.push(defaultManifestFileName);
            }
        }
    }
    return filteredFiles;
}
function detectProjectTypeFromFile(file) {
    try {
        const packageManager = detect_1.detectPackageManagerFromFile(file);
        if (['yarn', 'npm'].includes(packageManager)) {
            return 'node';
        }
        return packageManager;
    }
    catch (error) {
        return null;
    }
}
function shouldSkipAddingFile(packageManager, filePath, filteredFiles) {
    if (['gradle'].includes(packageManager) && filePath) {
        const rootGradleFile = filteredFiles
            .filter((targetFile) => targetFile.endsWith('build.gradle') ||
            targetFile.endsWith('build.gradle.kts'))
            .filter((targetFile) => {
            const parsedPath = pathLib.parse(targetFile);
            const relativePath = pathLib.relative(parsedPath.dir, filePath);
            return !relativePath.startsWith(`..${pathLib.sep}`);
        });
        return !!rootGradleFile.length;
    }
    return false;
}
function chooseBestManifest(files, projectType) {
    switch (projectType) {
        case 'node': {
            const lockFile = files.filter((path) => ['package-lock.json', 'yarn.lock'].includes(path.base))[0];
            debug(`Encountered multiple node lockfiles files, defaulting to ${lockFile.path}`);
            if (lockFile) {
                return lockFile.path;
            }
            const packageJson = files.filter((path) => ['package.json'].includes(path.base))[0];
            debug(`Encountered multiple npm manifest files, defaulting to ${packageJson.path}`);
            return packageJson.path;
        }
        case 'rubygems': {
            const defaultManifest = files.filter((path) => ['Gemfile.lock'].includes(path.base))[0];
            debug(`Encountered multiple gem manifest files, defaulting to ${defaultManifest.path}`);
            return defaultManifest.path;
        }
        case 'cocoapods': {
            const defaultManifest = files.filter((path) => ['Podfile'].includes(path.base))[0];
            debug(`Encountered multiple cocoapods manifest files, defaulting to ${defaultManifest.path}`);
            return defaultManifest.path;
        }
        case 'pip': {
            const defaultManifest = files.filter((path) => ['Pipfile'].includes(path.base))[0];
            debug(`Encountered multiple pip manifest files, defaulting to ${defaultManifest.path}`);
            return defaultManifest.path;
        }
        case 'gradle': {
            const defaultManifest = files.filter((path) => ['build.gradle'].includes(path.base))[0];
            debug(`Encountered multiple gradle manifest files, defaulting to ${defaultManifest.path}`);
            return defaultManifest.path;
        }
        default: {
            return null;
        }
    }
}
//# sourceMappingURL=find-files.js.map