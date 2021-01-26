"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containsJar = exports.isJar = exports.createPomForJars = exports.createPomForJar = void 0;
const tslib_1 = require("tslib");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const needle = require("needle");
const pom_1 = require("./pom");
const tmp = require("tmp");
tmp.setGracefulCleanup();
const debugLib = require("debug");
const debug = debugLib('snyk-mvn-plugin');
// Using the maven-central sha1 checksum API call (see: https://search.maven.org/classic/#api)
const MAVEN_SEARCH_URL = process.env.MAVEN_SEARCH_URL || 'https://search.maven.org/solrsearch/select';
const ALGORITHM = 'sha1';
const DIGEST = 'hex';
function getSha1(buf) {
    return crypto
        .createHash(ALGORITHM)
        .update(buf)
        .digest(DIGEST);
}
function getMavenDependency(targetPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const contents = fs.readFileSync(targetPath);
        const sha1 = getSha1(contents);
        const { g, a, v } = yield getMavenPackageInfo(sha1, targetPath);
        return {
            groupId: g,
            artifactId: a,
            version: v,
        };
    });
}
function getDependencies(paths) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const dependencies = [];
        for (const p of paths) {
            try {
                const dependency = yield getMavenDependency(p);
                dependencies.push(dependency);
            }
            catch (err) {
                // log error and continue with other paths
                console.error(`Failed to get maven dependency for '${p}'.`, err.message);
            }
        }
        return dependencies;
    });
}
function createPomForJar(root, targetFile) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const targetPath = path.resolve(root, targetFile);
        try {
            const dependency = yield getMavenDependency(targetPath);
            debug(`Creating pom.xml for ${JSON.stringify(dependency)}`);
            const rootDependency = getRootDependency(root, targetFile);
            const pomContents = pom_1.getPomContents([dependency], rootDependency);
            const pomFile = createTempPomFile(targetPath, pomContents);
            return pomFile;
        }
        catch (err) {
            const msg = `There was a problem generating a pom file for jar ${targetPath}.`;
            debug(msg, err);
            throw new Error(msg + ' ' + err.message);
        }
    });
}
exports.createPomForJar = createPomForJar;
function createPomForJars(root) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const jarPaths = fs
                .readdirSync(root)
                .filter(isJar)
                .map((jar) => path.join(root, jar));
            const dependencies = yield getDependencies(jarPaths);
            debug(`Creating pom.xml for ${JSON.stringify(dependencies)}`);
            const rootDependency = getRootDependency(root);
            const pomContents = pom_1.getPomContents(dependencies, rootDependency);
            const pomFile = createTempPomFile(root, pomContents);
            return pomFile;
        }
        catch (err) {
            const msg = `Detected jar file(s) in: '${root}', but there was a problem generating a pom file.`;
            debug(msg, err);
            throw new Error(msg + ' ' + err.message);
        }
    });
}
exports.createPomForJars = createPomForJars;
function isJar(file) {
    return !!file.match(/\.(([jw]ar)|(zip))$/);
}
exports.isJar = isJar;
function containsJar(targetPath) {
    const stats = fs.statSync(targetPath);
    if (stats.isFile()) {
        // look in files directory
        const dir = path.dirname(targetPath);
        return fs.readdirSync(dir).some(isJar);
    }
    if (stats.isDirectory()) {
        return fs.readdirSync(targetPath).some(isJar);
    }
    return false;
}
exports.containsJar = containsJar;
function getMavenPackageInfo(sha1, targetPath) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const url = `${MAVEN_SEARCH_URL}?q=1:"${sha1}"&wt=json`;
        return new Promise((resolve, reject) => {
            needle.request('get', url, {}, { json: true }, (err, fullRes, res) => {
                if (err) {
                    reject(err);
                }
                if (!res || !res.response || res.response.docs.length === 0) {
                    reject(new Error(`No package found querying '${MAVEN_SEARCH_URL}' for sha1 hash '${sha1}'.`));
                }
                if (res.response.docs.length > 1) {
                    const sha1Target = path.parse(targetPath).base;
                    debug('Got multiple results for sha1, looking for', sha1Target);
                    const foundPackage = res.response.docs.find(({ g }) => sha1Target.includes(g));
                    res.response.docs = [foundPackage || res.response.docs[0]];
                }
                resolve(res.response.docs[0]);
            });
        });
    });
}
function createTempPomFile(filePath, pomContents) {
    try {
        const tmpPom = tmp.fileSync({
            postfix: '-pom.xml',
            dir: path.resolve(path.dirname(filePath)),
        });
        fs.writeFileSync(tmpPom.name, pomContents);
        return tmpPom.name;
    }
    catch (err) {
        throw new Error('Failed to create temporary pom. ' + err.message);
    }
}
function getRootDependency(root, targetFile) {
    let groupId;
    if (targetFile) {
        groupId = path.dirname(targetFile);
        if (groupId === '.') {
            // we are in directory of the jar
            groupId = path.basename(path.resolve(root));
        }
    }
    else {
        // take root's parent directory base name
        groupId = path.basename(path.dirname(path.resolve(root)));
    }
    // replace path seperators with dots
    groupId = groupId
        .replace(/\//g, '.') // *inx
        .replace(/\\/g, '.') // windows
        .replace(/^\./, ''); // remove any leading '.'
    return {
        groupId: groupId || 'root',
        artifactId: path.basename(targetFile || root) || 'root',
        version: '1.0.0',
    };
}
//# sourceMappingURL=jar.js.map