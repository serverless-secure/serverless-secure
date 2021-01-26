"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDockerBinaryHeading = void 0;
const _ = require("lodash");
const chalk_1 = require("chalk");
function createDockerBinaryHeading(pkgInfo) {
    const binaryName = pkgInfo.pkg.name;
    const binaryVersion = pkgInfo.pkg.version;
    const numOfVulns = _.values(pkgInfo.issues).length;
    const vulnCountText = numOfVulns > 1 ? 'vulnerabilities' : 'vulnerability';
    return numOfVulns
        ? chalk_1.default.bold.white(`------------ Detected ${numOfVulns} ${vulnCountText}` +
            ` for ${binaryName}@${binaryVersion} ------------`, '\n')
        : '';
}
exports.createDockerBinaryHeading = createDockerBinaryHeading;
//# sourceMappingURL=format-docker-binary-heading.js.map