"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapIacIssue = exports.mapIacTestResult = void 0;
const IAC_ISSUES_KEY = 'infrastructureAsCodeIssues';
function mapIacTestResult(iacTest) {
    var _a;
    if (iacTest instanceof Error) {
        return {
            ok: false,
            error: iacTest.message,
            path: iacTest.path,
        };
    }
    const { result: { projectType } } = iacTest, filteredIacTest = __rest(iacTest, ["result"]);
    return Object.assign(Object.assign({}, filteredIacTest), { projectType, [IAC_ISSUES_KEY]: ((_a = iacTest === null || iacTest === void 0 ? void 0 : iacTest.result) === null || _a === void 0 ? void 0 : _a.cloudConfigResults.map(mapIacIssue)) || [] });
}
exports.mapIacTestResult = mapIacTestResult;
function mapIacIssue(iacIssue) {
    // filters out & renames properties we're getting from registry and don't need for the JSON output.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cloudConfigPath: path, name, from } = iacIssue, mappedIacIssue = __rest(iacIssue, ["cloudConfigPath", "name", "from"]);
    return Object.assign(Object.assign({}, mappedIacIssue), { path });
}
exports.mapIacIssue = mapIacIssue;
//# sourceMappingURL=iac-test-result.js.map