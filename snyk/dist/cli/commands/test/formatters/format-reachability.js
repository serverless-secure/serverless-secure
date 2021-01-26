"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatReachablePath = exports.formatReachablePaths = exports.summariseReachableVulns = exports.getReachabilityText = exports.formatReachability = void 0;
const wrap = require("wrap-ansi");
const chalk_1 = require("chalk");
const legacy_1 = require("../../../../lib/snyk-test/legacy");
const constants_1 = require("../../constants");
const reachabilityLevels = {
    [legacy_1.REACHABILITY.FUNCTION]: {
        color: chalk_1.default.redBright,
        text: 'Reachable',
    },
    [legacy_1.REACHABILITY.PACKAGE]: {
        color: chalk_1.default.yellow,
        text: 'Potentially reachable',
    },
    [legacy_1.REACHABILITY.NOT_REACHABLE]: {
        color: chalk_1.default.blueBright,
        text: 'Not reachable',
    },
    [legacy_1.REACHABILITY.NO_INFO]: {
        color: (str) => str,
        text: '',
    },
};
function formatReachability(reachability) {
    if (!reachability) {
        return '';
    }
    const reachableInfo = reachabilityLevels[reachability];
    const textFunc = reachableInfo ? reachableInfo.color : (str) => str;
    const text = reachableInfo && reachableInfo.text ? `[${reachableInfo.text}]` : '';
    return wrap(textFunc(text), 100);
}
exports.formatReachability = formatReachability;
function getReachabilityText(reachability) {
    if (!reachability) {
        return '';
    }
    const reachableInfo = reachabilityLevels[reachability];
    return reachableInfo ? reachableInfo.text : '';
}
exports.getReachabilityText = getReachabilityText;
function summariseReachableVulns(vulnerabilities) {
    const reachableVulnsCount = vulnerabilities.filter((v) => v.reachability === legacy_1.REACHABILITY.FUNCTION).length;
    if (reachableVulnsCount > 0) {
        const vulnText = reachableVulnsCount === 1 ? 'vulnerability' : 'vulnerabilities';
        return `In addition, found ${reachableVulnsCount} ${vulnText} with a reachable path.`;
    }
    return '';
}
exports.summariseReachableVulns = summariseReachableVulns;
function getDistinctReachablePaths(reachablePaths, maxPathCount) {
    const uniquePaths = new Set();
    for (const path of reachablePaths) {
        if (uniquePaths.size >= maxPathCount) {
            break;
        }
        uniquePaths.add(formatReachablePath(path));
    }
    return Array.from(uniquePaths.values());
}
function formatReachablePaths(sampleReachablePaths, maxPathCount, template) {
    const paths = (sampleReachablePaths === null || sampleReachablePaths === void 0 ? void 0 : sampleReachablePaths.paths) || [];
    const pathCount = (sampleReachablePaths === null || sampleReachablePaths === void 0 ? void 0 : sampleReachablePaths.pathCount) || 0;
    const distinctPaths = getDistinctReachablePaths(paths, maxPathCount);
    const extraPaths = pathCount - distinctPaths.length;
    return template(distinctPaths, extraPaths);
}
exports.formatReachablePaths = formatReachablePaths;
function formatReachablePath(path) {
    const head = path.slice(0, constants_1.CALL_PATH_LEADING_ELEMENTS).join(constants_1.PATH_SEPARATOR);
    const tail = path
        .slice(path.length - constants_1.CALL_PATH_TRAILING_ELEMENTS, path.length)
        .join(constants_1.PATH_SEPARATOR);
    return `${head}${constants_1.PATH_SEPARATOR}${constants_1.PATH_HIDDEN_ELEMENTS}${constants_1.PATH_SEPARATOR}${tail}`;
}
exports.formatReachablePath = formatReachablePath;
//# sourceMappingURL=format-reachability.js.map