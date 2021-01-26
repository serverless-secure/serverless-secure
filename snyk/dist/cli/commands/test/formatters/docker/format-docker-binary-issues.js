"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDockerBinariesIssues = void 0;
const _ = require("lodash");
const format_docker_binary_heading_1 = require("./format-docker-binary-heading");
const legacy_format_issue_1 = require("../legacy-format-issue");
function formatDockerBinariesIssues(dockerBinariesSortedGroupedVulns, binariesVulns, options) {
    const binariesIssuesOutput = [];
    for (const pkgInfo of _.values(binariesVulns.affectedPkgs)) {
        binariesIssuesOutput.push(format_docker_binary_heading_1.createDockerBinaryHeading(pkgInfo));
        const binaryIssues = dockerBinariesSortedGroupedVulns.filter((vuln) => vuln.metadata.name === pkgInfo.pkg.name);
        const formattedBinaryIssues = binaryIssues.map((vuln) => legacy_format_issue_1.formatIssues(vuln, options));
        binariesIssuesOutput.push(formattedBinaryIssues.join('\n\n'));
    }
    return binariesIssuesOutput;
}
exports.formatDockerBinariesIssues = formatDockerBinariesIssues;
//# sourceMappingURL=format-docker-binary-issues.js.map