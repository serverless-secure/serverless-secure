"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
function analyze(targetImage, aptFiles) {
    const pkgs = parseDpkgFile(aptFiles.dpkgFile);
    if (aptFiles.extFile) {
        setAutoInstalledPackages(aptFiles.extFile, pkgs);
    }
    return Promise.resolve({
        Image: targetImage,
        AnalyzeType: types_1.AnalysisType.Apt,
        Analysis: pkgs,
    });
}
exports.analyze = analyze;
function analyzeDistroless(targetImage, aptFiles) {
    const analyzedPackages = [];
    for (const fileContent of aptFiles) {
        const currentPackages = parseDpkgFile(fileContent);
        analyzedPackages.push(...currentPackages);
    }
    return Promise.resolve({
        Image: targetImage,
        AnalyzeType: types_1.AnalysisType.Apt,
        Analysis: analyzedPackages,
    });
}
exports.analyzeDistroless = analyzeDistroless;
function parseDpkgFile(text) {
    const pkgs = [];
    let curPkg = null;
    for (const line of text.split("\n")) {
        curPkg = parseDpkgLine(line, curPkg, pkgs);
    }
    return pkgs;
}
function parseDpkgLine(text, curPkg, pkgs) {
    const [key, value] = text.split(": ");
    switch (key) {
        case "Package":
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
        case "Version":
            curPkg.Version = value;
            break;
        case "Source":
            curPkg.Source = value.trim().split(" ")[0];
            break;
        case "Provides":
            for (let name of value.split(",")) {
                name = name.trim().split(" ")[0];
                curPkg.Provides.push(name);
            }
            break;
        case "Pre-Depends":
        case "Depends":
            for (const depElem of value.split(",")) {
                for (let name of depElem.split("|")) {
                    name = name.trim().split(" ")[0];
                    curPkg.Deps[name] = true;
                }
            }
            break;
    }
    return curPkg;
}
function setAutoInstalledPackages(text, pkgs) {
    const autoPkgs = parseExtFile(text);
    for (const pkg of pkgs) {
        if (autoPkgs[pkg.Name]) {
            pkg.AutoInstalled = true;
        }
    }
}
function parseExtFile(text) {
    const pkgMap = {};
    let curPkgName = null;
    for (const line of text.split("\n")) {
        curPkgName = parseExtLine(line, curPkgName, pkgMap);
    }
    return pkgMap;
}
function parseExtLine(text, curPkgName, pkgMap) {
    const [key, value] = text.split(": ");
    switch (key) {
        case "Package":
            curPkgName = value;
            break;
        case "Auto-Installed":
            if (parseInt(value, 10) === 1) {
                pkgMap[curPkgName] = true;
            }
            break;
    }
    return curPkgName;
}
//# sourceMappingURL=apt.js.map