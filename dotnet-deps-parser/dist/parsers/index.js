"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseXML = require("xml2js");
const _isEmpty = require("lodash.isempty");
const _set = require("lodash.set");
const _uniq = require("lodash.uniq");
const errors_1 = require("../errors");
var DepType;
(function (DepType) {
    DepType["prod"] = "prod";
    DepType["dev"] = "dev";
})(DepType = exports.DepType || (exports.DepType = {}));
var ProjectJsonDepType;
(function (ProjectJsonDepType) {
    ProjectJsonDepType["build"] = "build";
    ProjectJsonDepType["project"] = "project";
    ProjectJsonDepType["platform"] = "platform";
    ProjectJsonDepType["default"] = "default";
})(ProjectJsonDepType = exports.ProjectJsonDepType || (exports.ProjectJsonDepType = {}));
function getDependencyTreeFromProjectJson(manifestFile, includeDev = false) {
    const depTree = {
        dependencies: {},
        hasDevDependencies: false,
        name: '',
        version: '',
    };
    for (const depName in manifestFile.dependencies) {
        if (!manifestFile.dependencies.hasOwnProperty(depName)) {
            continue;
        }
        const depValue = manifestFile.dependencies[depName];
        const version = depValue.version || depValue;
        const isDev = depValue.type === 'build';
        depTree.hasDevDependencies = depTree.hasDevDependencies || isDev;
        if (isDev && !includeDev) {
            continue;
        }
        depTree.dependencies[depName] = buildSubTreeFromProjectJson(depName, version, isDev);
    }
    return depTree;
}
exports.getDependencyTreeFromProjectJson = getDependencyTreeFromProjectJson;
function buildSubTreeFromProjectJson(name, version, isDev) {
    const depSubTree = {
        depType: isDev ? DepType.dev : DepType.prod,
        dependencies: {},
        name,
        version,
    };
    return depSubTree;
}
async function getDependencyTreeFromPackagesConfig(manifestFile, includeDev = false) {
    var _a, _b, _c;
    const depTree = {
        dependencies: {},
        hasDevDependencies: false,
        name: '',
        version: '',
    };
    const packageList = (_c = (_b = (_a = manifestFile) === null || _a === void 0 ? void 0 : _a.packages) === null || _b === void 0 ? void 0 : _b.package, (_c !== null && _c !== void 0 ? _c : []));
    for (const dep of packageList) {
        const depName = dep.$.id;
        const isDev = !!dep.$.developmentDependency;
        depTree.hasDevDependencies = depTree.hasDevDependencies || isDev;
        if (isDev && !includeDev) {
            continue;
        }
        depTree.dependencies[depName] = buildSubTreeFromPackagesConfig(dep, isDev);
    }
    return depTree;
}
exports.getDependencyTreeFromPackagesConfig = getDependencyTreeFromPackagesConfig;
function buildSubTreeFromPackagesConfig(dep, isDev) {
    const depSubTree = {
        depType: isDev ? DepType.dev : DepType.prod,
        dependencies: {},
        name: dep.$.id,
        version: dep.$.version,
    };
    if (dep.$.targetFramework) {
        depSubTree.targetFrameworks = [dep.$.targetFramework];
    }
    return depSubTree;
}
async function getDependencyTreeFromProjectFile(manifestFile, includeDev = false, propsMap = {}) {
    var _a, _b, _c, _d, _e;
    const nameProperty = (_c = (_b = (_a = manifestFile) === null || _a === void 0 ? void 0 : _a.Project) === null || _b === void 0 ? void 0 : _b.PropertyGroup, (_c !== null && _c !== void 0 ? _c : []))
        .find((propertyGroup) => {
        return 'PackageId' in propertyGroup
            || 'AssemblyName' in propertyGroup;
    }) || {};
    const name = ((_d = nameProperty.PackageId) === null || _d === void 0 ? void 0 : _d[0])
        || ((_e = nameProperty.AssemblyName) === null || _e === void 0 ? void 0 : _e[0])
        || '';
    const packageReferenceDeps = await getDependenciesFromPackageReference(manifestFile, includeDev, propsMap);
    const referenceIncludeDeps = await getDependenciesFromReferenceInclude(manifestFile, includeDev, propsMap);
    // order matters, the order deps are parsed in needs to be preserved and first seen kept
    // so applying the packageReferenceDeps last to override the second parsed
    const depTree = {
        dependencies: Object.assign(Object.assign({}, referenceIncludeDeps.dependencies), packageReferenceDeps.dependencies),
        hasDevDependencies: packageReferenceDeps.hasDevDependencies || referenceIncludeDeps.hasDevDependencies,
        name,
        version: '',
    };
    if (packageReferenceDeps.dependenciesWithUnknownVersions) {
        depTree.dependenciesWithUnknownVersions = packageReferenceDeps.dependenciesWithUnknownVersions;
    }
    if (referenceIncludeDeps.dependenciesWithUnknownVersions) {
        depTree.dependenciesWithUnknownVersions = referenceIncludeDeps.dependenciesWithUnknownVersions;
    }
    return depTree;
}
exports.getDependencyTreeFromProjectFile = getDependencyTreeFromProjectFile;
async function getDependenciesFromPackageReference(manifestFile, includeDev = false, propsMap) {
    var _a, _b, _c;
    let dependenciesResult = {
        dependencies: {},
        hasDevDependencies: false,
    };
    const packageGroups = (_c = (_b = (_a = manifestFile) === null || _a === void 0 ? void 0 : _a.Project) === null || _b === void 0 ? void 0 : _b.ItemGroup, (_c !== null && _c !== void 0 ? _c : []))
        .filter((itemGroup) => 'PackageReference' in itemGroup);
    if (!packageGroups.length) {
        return dependenciesResult;
    }
    for (const packageList of packageGroups) {
        dependenciesResult = processItemGroupForPackageReference(packageList, manifestFile, includeDev, dependenciesResult, propsMap);
    }
    return dependenciesResult;
}
function processItemGroupForPackageReference(packageList, manifestFile, includeDev, dependenciesResult, propsMap) {
    var _a, _b, _c;
    const targetFrameworks = (_c = (_b = (_a = packageList) === null || _a === void 0 ? void 0 : _a.$) === null || _b === void 0 ? void 0 : _b.Condition, (_c !== null && _c !== void 0 ? _c : false)) ?
        getConditionalFrameworks(packageList.$.Condition) : [];
    for (const dep of packageList.PackageReference) {
        const depName = dep.$.Include;
        if (!depName) {
            // PackageReference Update is not yet supported
            continue;
        }
        const isDev = !!dep.$.developmentDependency;
        dependenciesResult.hasDevDependencies = dependenciesResult.hasDevDependencies || isDev;
        if (isDev && !includeDev) {
            continue;
        }
        const subDep = buildSubTreeFromPackageReference(dep, isDev, manifestFile, targetFrameworks, propsMap);
        if (subDep.withoutVersion) {
            dependenciesResult.dependenciesWithUnknownVersions = dependenciesResult.dependenciesWithUnknownVersions || [];
            dependenciesResult.dependenciesWithUnknownVersions.push(subDep.name);
        }
        else {
            dependenciesResult.dependencies[depName] = subDep;
        }
    }
    return dependenciesResult;
}
// TODO: almost same as getDependenciesFromPackageReference
async function getDependenciesFromReferenceInclude(manifestFile, includeDev = false, propsMap) {
    var _a, _b, _c;
    let referenceIncludeResult = {
        dependencies: {},
        hasDevDependencies: false,
    };
    const referenceIncludeList = (_c = (_b = (_a = manifestFile) === null || _a === void 0 ? void 0 : _a.Project) === null || _b === void 0 ? void 0 : _b.ItemGroup, (_c !== null && _c !== void 0 ? _c : []))
        .find((itemGroup) => 'Reference' in itemGroup);
    if (!referenceIncludeList) {
        return referenceIncludeResult;
    }
    referenceIncludeResult =
        processItemGroupForReferenceInclude(referenceIncludeList, manifestFile, includeDev, referenceIncludeResult, propsMap);
    return referenceIncludeResult;
}
function processItemGroupForReferenceInclude(packageList, manifestFile, includeDev, dependenciesResult, propsMap) {
    var _a, _b, _c;
    const targetFrameworks = (_c = (_b = (_a = packageList) === null || _a === void 0 ? void 0 : _a.$) === null || _b === void 0 ? void 0 : _b.Condition, (_c !== null && _c !== void 0 ? _c : false)) ?
        getConditionalFrameworks(packageList.$.Condition) : [];
    for (const item of packageList.Reference) {
        const propertiesList = item.$.Include.split(',').map((i) => i.trim());
        const [depName, ...depInfoArray] = propertiesList;
        const depInfo = {};
        if (!depName) {
            continue;
        }
        // TODO: identify dev deps @lili
        const isDev = false;
        dependenciesResult.hasDevDependencies = dependenciesResult.hasDevDependencies || isDev;
        if (isDev && !includeDev) {
            continue;
        }
        for (const itemValue of depInfoArray) {
            const propertyValuePair = itemValue.split('=');
            depInfo[propertyValuePair[0]] = propertyValuePair[1];
        }
        depInfo.name = depName;
        const subDep = buildSubTreeFromReferenceInclude(depInfo, isDev, manifestFile, targetFrameworks, propsMap);
        if (subDep.withoutVersion) {
            dependenciesResult.dependenciesWithUnknownVersions = dependenciesResult.dependenciesWithUnknownVersions || [];
            dependenciesResult.dependenciesWithUnknownVersions.push(subDep.name);
        }
        else {
            dependenciesResult.dependencies[depName] = subDep;
        }
    }
    return dependenciesResult;
}
function buildSubTreeFromReferenceInclude(dep, isDev, manifestFile, targetFrameworks, propsMap) {
    const version = extractDependencyVersion(dep, manifestFile, propsMap) || '';
    if (!_isEmpty(version)) {
        const depSubTree = {
            depType: isDev ? DepType.dev : DepType.prod,
            dependencies: {},
            name: dep.name,
            // Version could be in attributes or as child node.
            version,
        };
        if (targetFrameworks.length) {
            depSubTree.targetFrameworks = targetFrameworks;
        }
        return depSubTree;
    }
    else {
        return { name: dep.name, withoutVersion: true };
    }
}
function buildSubTreeFromPackageReference(dep, isDev, manifestFile, targetFrameworks, propsMap) {
    const version = extractDependencyVersion(dep, manifestFile, propsMap) || '';
    if (!_isEmpty(version)) {
        const depSubTree = {
            depType: isDev ? DepType.dev : DepType.prod,
            dependencies: {},
            name: dep.$.Include,
            // Version could be in attributes or as child node.
            version,
        };
        if (targetFrameworks.length) {
            depSubTree.targetFrameworks = targetFrameworks;
        }
        return depSubTree;
    }
    else {
        return { name: dep.$.Include, withoutVersion: true };
    }
}
function extractDependencyVersion(dep, manifestFile, propsMap) {
    var _a, _b, _c, _d, _e;
    const VARS_MATCHER = /^\$\((.*?)\)/;
    let version = ((_b = (_a = dep) === null || _a === void 0 ? void 0 : _a.$) === null || _b === void 0 ? void 0 : _b.Version) || ((_c = dep) === null || _c === void 0 ? void 0 : _c.Version);
    if (Array.isArray(version)) {
        version = version[0];
    }
    const variableVersion = version && version.match(VARS_MATCHER);
    if (!variableVersion) {
        return version;
    }
    // version is a variable, extract it from manifest or props lookup
    const propertyName = variableVersion[1];
    const propertyMap = Object.assign(Object.assign({}, propsMap), getPropertiesMap(manifestFile));
    return _e = (_d = propertyMap) === null || _d === void 0 ? void 0 : _d[propertyName], (_e !== null && _e !== void 0 ? _e : null);
}
function getConditionalFrameworks(condition) {
    const regexp = /\(TargetFramework\)'\s?==\s? '((\w|\d|\.)*)'/g;
    const frameworks = [];
    let match = regexp.exec(condition);
    while (match !== null) {
        frameworks.push(match[1]);
        match = regexp.exec(condition);
    }
    return frameworks;
}
async function parseXmlFile(manifestFileContents) {
    return new Promise((resolve, reject) => {
        parseXML
            .parseString(manifestFileContents, (err, result) => {
            if (err) {
                const e = new errors_1.InvalidUserInputError('xml file parsing failed');
                return reject(e);
            }
            return resolve(result);
        });
    });
}
exports.parseXmlFile = parseXmlFile;
function getPropertiesMap(propsContents) {
    var _a, _b, _c;
    const projectPropertyGroup = (_c = (_b = (_a = propsContents) === null || _a === void 0 ? void 0 : _a.Project) === null || _b === void 0 ? void 0 : _b.PropertyGroup, (_c !== null && _c !== void 0 ? _c : []));
    const props = {};
    if (!projectPropertyGroup.length) {
        return props;
    }
    for (const group of projectPropertyGroup) {
        for (const key of Object.keys(group)) {
            _set(props, key, group[key][0]);
        }
    }
    return props;
}
exports.getPropertiesMap = getPropertiesMap;
function getTargetFrameworksFromProjectFile(manifestFile) {
    var _a, _b, _c;
    let targetFrameworksResult = [];
    const projectPropertyGroup = (_c = (_b = (_a = manifestFile) === null || _a === void 0 ? void 0 : _a.Project) === null || _b === void 0 ? void 0 : _b.PropertyGroup, (_c !== null && _c !== void 0 ? _c : []));
    if (!projectPropertyGroup) {
        return targetFrameworksResult;
    }
    const propertyList = projectPropertyGroup
        .find((propertyGroup) => {
        return 'TargetFramework' in propertyGroup
            || 'TargetFrameworks' in propertyGroup
            || 'TargetFrameworkVersion' in propertyGroup;
    }) || {};
    if (_isEmpty(propertyList)) {
        return targetFrameworksResult;
    }
    // TargetFrameworks is expected to be a list ; separated
    if (propertyList.TargetFrameworks) {
        for (const item of propertyList.TargetFrameworks) {
            targetFrameworksResult = [...targetFrameworksResult, ...item.split(';')];
        }
    }
    // TargetFrameworkVersion is expected to be a string containing only one item
    // TargetFrameworkVersion also implies .NETFramework, for convenience
    // return longer version
    if (propertyList.TargetFrameworkVersion) {
        targetFrameworksResult.push(`.NETFramework,Version=${propertyList.TargetFrameworkVersion[0]}`);
    }
    // TargetFrameworks is expected to be a string
    if (propertyList.TargetFramework) {
        targetFrameworksResult = [...targetFrameworksResult, ...propertyList.TargetFramework];
    }
    return _uniq(targetFrameworksResult);
}
exports.getTargetFrameworksFromProjectFile = getTargetFrameworksFromProjectFile;
function getTargetFrameworksFromProjectConfig(manifestFile) {
    var _a, _b, _c;
    const targetFrameworksResult = [];
    const packages = (_c = (_b = (_a = manifestFile) === null || _a === void 0 ? void 0 : _a.packages) === null || _b === void 0 ? void 0 : _b.package, (_c !== null && _c !== void 0 ? _c : []));
    for (const item of packages) {
        const targetFramework = item.$.targetFramework;
        if (!targetFramework) {
            continue;
        }
        if (!targetFrameworksResult.includes(targetFramework)) {
            targetFrameworksResult.push(targetFramework);
        }
    }
    return targetFrameworksResult;
}
exports.getTargetFrameworksFromProjectConfig = getTargetFrameworksFromProjectConfig;
function getTargetFrameworksFromProjectJson(manifestFile) {
    var _a, _b;
    return Object.keys((_b = (_a = manifestFile) === null || _a === void 0 ? void 0 : _a.frameworks, (_b !== null && _b !== void 0 ? _b : {})));
}
exports.getTargetFrameworksFromProjectJson = getTargetFrameworksFromProjectJson;
function getTargetFrameworksFromProjectAssetsJson(manifestFile) {
    var _a, _b;
    return Object.keys((_b = (_a = manifestFile) === null || _a === void 0 ? void 0 : _a.targets, (_b !== null && _b !== void 0 ? _b : {})));
}
exports.getTargetFrameworksFromProjectAssetsJson = getTargetFrameworksFromProjectAssetsJson;
//# sourceMappingURL=index.js.map