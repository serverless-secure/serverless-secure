"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
function analyze(targetImage, apkDbFileContent) {
    return Promise.resolve({
        Image: targetImage,
        AnalyzeType: types_1.AnalysisType.Apk,
        Analysis: parseFile(apkDbFileContent),
    });
}
exports.analyze = analyze;
function parseFile(text) {
    const pkgs = [];
    let curPkg = null;
    for (const line of text.split("\n")) {
        curPkg = parseLine(line, curPkg, pkgs);
    }
    return pkgs;
}
function parseLine(text, curPkg, pkgs) {
    const key = text.charAt(0);
    const value = text.substr(2).trim();
    switch (key) {
        case "P": // Package
            curPkg = {
                Name: value,
                Version: undefined,
                Source: undefined,
                Provides: [],
                Deps: {},
                AutoInstalled: undefined,
            };
            pkgs.push(curPkg);
            break;
        case "V": // Version
            curPkg.Version = value;
            break;
        case "p": // Provides
            for (let name of value.split(" ")) {
                name = name.split("=")[0];
                curPkg.Provides.push(name);
            }
            break;
        case "r": // Depends
        case "D": // Depends
            // tslint:disable-next-line:no-duplicate-variable
            for (let name of value.split(" ")) {
                if (name.charAt(0) !== "!") {
                    name = name.split("=")[0];
                    curPkg.Deps[name] = true;
                }
            }
            break;
        case "o": // Origin
            curPkg.Source = value;
            break;
    }
    return curPkg;
}
//# sourceMappingURL=apk.js.map