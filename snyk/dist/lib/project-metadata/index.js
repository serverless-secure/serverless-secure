"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfo = void 0;
const gitTargetBuilder = require("./target-builders/git");
const containerTargetBuilder = require("./target-builders/container");
const invalid_remote_url_error_1 = require("../errors/invalid-remote-url-error");
const TARGET_BUILDERS = [containerTargetBuilder, gitTargetBuilder];
async function getInfo(scannedProject, options, packageInfo) {
    const isFromContainer = options.docker || options.isDocker || false;
    for (const builder of TARGET_BUILDERS) {
        const target = await builder.getInfo(isFromContainer, scannedProject, packageInfo);
        if (target) {
            const remoteUrl = options['remote-repo-url'];
            if (!remoteUrl) {
                return target;
            }
            if (typeof remoteUrl !== 'string') {
                throw new invalid_remote_url_error_1.InvalidRemoteUrlError();
            }
            return Object.assign(Object.assign({}, target), { remoteUrl });
        }
    }
    return null;
}
exports.getInfo = getInfo;
//# sourceMappingURL=index.js.map