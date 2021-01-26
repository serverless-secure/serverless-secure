"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = exports.JAR_NAME = void 0;
const tslib_1 = require("tslib");
const fs = require("fs");
const path = require("path");
const needle = require("needle");
const ciInfo = require("ci-info");
const ProgressBar = require("progress");
const tempDir = require("temp-dir");
const crypto = require("crypto");
const debug_1 = require("./debug");
const metrics = require("./metrics");
const promisifedFs = require("./promisified-fs-glob");
exports.JAR_NAME = 'java-call-graph-generator.jar';
const LOCAL_PATH = path.join(tempDir, 'call-graph-generator', exports.JAR_NAME);
function createProgressBar(total, name) {
    return new ProgressBar(`downloading ${name} [:bar] :rate/Kbps :percent :etas remaining`, {
        complete: '=',
        incomplete: '.',
        width: 20,
        total: total / 1000,
    });
}
function downloadAnalyzer(url, localPath, expectedChecksum) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const fsStream = fs.createWriteStream(localPath + '.part');
            try {
                let progressBar;
                debug_1.debug(`fetching java graph generator from ${url}`);
                const req = needle.get(url);
                let matchChecksum;
                let hasError = false;
                // TODO: Try pump (https://www.npmjs.com/package/pump) for more organised flow
                req
                    .on('response', (res) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    if (res.statusCode >= 400) {
                        const err = new Error('Bad HTTP response for snyk-call-graph-generator download');
                        // TODO: add custom error for status code => err.statusCode = res.statusCode;
                        fsStream.destroy();
                        hasError = true;
                        return reject(err);
                    }
                    matchChecksum = verifyChecksum(req, expectedChecksum);
                    if (ciInfo.isCI) {
                        console.log(`downloading ${exports.JAR_NAME} ...`);
                    }
                    else {
                        const total = parseInt(res.headers['content-length'], 10);
                        progressBar = createProgressBar(total, exports.JAR_NAME);
                    }
                }))
                    .on('data', (chunk) => {
                    if (progressBar) {
                        progressBar.tick(chunk.length / 1000);
                    }
                })
                    .on('error', (err) => {
                    return reject(err);
                })
                    .pipe(fsStream)
                    .on('error', (err) => {
                    fsStream.destroy();
                    return reject(err);
                })
                    .on('finish', () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    if (hasError) {
                        yield promisifedFs.unlink(localPath + '.part');
                    }
                    else {
                        if (!(yield matchChecksum)) {
                            return reject(new Error('Wrong checksum of downloaded call-graph-generator.'));
                        }
                        yield promisifedFs.rename(localPath + '.part', localPath);
                        resolve(localPath);
                    }
                }));
            }
            catch (err) {
                reject(err);
            }
        });
    });
}
function verifyChecksum(localPathStream, expectedChecksum) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const hash = crypto.createHash('sha256');
            localPathStream
                .on('error', reject)
                .on('data', (chunk) => {
                hash.update(chunk);
            })
                .on('end', () => {
                resolve(hash.digest('hex') === expectedChecksum);
            });
        });
    });
}
function fetch(url, expectedChecksum) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const localPath = LOCAL_PATH;
        if (yield promisifedFs.exists(localPath)) {
            if (yield verifyChecksum(fs.createReadStream(localPath), expectedChecksum)) {
                return localPath;
            }
            console.log(`New version of ${exports.JAR_NAME} available`);
        }
        if (!(yield promisifedFs.exists(path.dirname(localPath)))) {
            yield promisifedFs.mkdir(path.dirname(localPath));
        }
        return yield metrics.timeIt('fetchCallGraphBuilder', () => downloadAnalyzer(url, localPath, expectedChecksum));
    });
}
exports.fetch = fetch;
//# sourceMappingURL=fetch-snyk-java-call-graph-generator.js.map