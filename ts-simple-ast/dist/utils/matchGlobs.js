"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multimatch = require("multimatch");
var FileUtils_1 = require("./FileUtils");
function matchGlobs(paths, patterns, cwd) {
    if (typeof patterns === "string")
        patterns = FileUtils_1.FileUtils.toAbsoluteGlob(patterns, cwd);
    else
        patterns = patterns.map(function (p) { return FileUtils_1.FileUtils.toAbsoluteGlob(p, cwd); });
    return multimatch(paths, patterns);
}
exports.matchGlobs = matchGlobs;
