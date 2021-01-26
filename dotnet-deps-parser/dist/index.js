"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const fs = require("fs");
const path = require("path");
const parsers_1 = require("./parsers");
exports.DepType = parsers_1.DepType;
const project_assets_json_parser_1 = require("./parsers/project-assets-json-parser");
const errors_1 = require("./errors");
const PROJ_FILE_EXTENSIONS = [
    '.csproj',
    '.vbproj',
    '.fsproj',
];
function buildDepTreeFromProjectJson(manifestFileContents, includeDev = false) {
    // trimming required to address files with UTF-8 with BOM encoding
    const manifestFile = JSON.parse(manifestFileContents.trim());
    return parsers_1.getDependencyTreeFromProjectJson(manifestFile, includeDev);
}
exports.buildDepTreeFromProjectJson = buildDepTreeFromProjectJson;
// TODO: Figure out what to do about devDeps
function buildDepTreeFromProjectAssetsJson(manifestFileContents, targetFramework) {
    if (!targetFramework) {
        throw new Error('Missing targetFramework for project.assets.json');
    }
    // trimming required to address files with UTF-8 with BOM encoding
    const manifestFile = JSON.parse(manifestFileContents.trim());
    return project_assets_json_parser_1.getDependencyTreeFromProjectAssetsJson(manifestFile, targetFramework);
}
exports.buildDepTreeFromProjectAssetsJson = buildDepTreeFromProjectAssetsJson;
async function buildDepTreeFromPackagesConfig(manifestFileContents, includeDev = false) {
    const manifestFile = await parsers_1.parseXmlFile(manifestFileContents);
    return parsers_1.getDependencyTreeFromPackagesConfig(manifestFile, includeDev);
}
exports.buildDepTreeFromPackagesConfig = buildDepTreeFromPackagesConfig;
async function buildDepTreeFromProjectFile(manifestFileContents, includeDev = false, propsMap = {}) {
    const manifestFile = await parsers_1.parseXmlFile(manifestFileContents);
    return parsers_1.getDependencyTreeFromProjectFile(manifestFile, includeDev, propsMap);
}
exports.buildDepTreeFromProjectFile = buildDepTreeFromProjectFile;
function buildDepTreeFromFiles(root, manifestFilePath, includeDev = false, targetFramework) {
    if (!root || !manifestFilePath) {
        throw new Error('Missing required parameters for buildDepTreeFromFiles()');
    }
    const manifestFileFullPath = path.resolve(root, manifestFilePath);
    if (!fs.existsSync(manifestFileFullPath)) {
        throw new Error('No packages.config, project.json or project file found at ' +
            `location: ${manifestFileFullPath}`);
    }
    const manifestFileContents = fs.readFileSync(manifestFileFullPath, 'utf-8');
    const manifestFileExtension = path.extname(manifestFileFullPath);
    if (PROJ_FILE_EXTENSIONS.includes(manifestFileExtension)) {
        return buildDepTreeFromProjectFile(manifestFileContents, includeDev);
    }
    else if (manifestFilePath.endsWith('packages.config')) {
        return buildDepTreeFromPackagesConfig(manifestFileContents, includeDev);
    }
    else if (manifestFilePath.endsWith('project.json')) {
        return buildDepTreeFromProjectJson(manifestFileContents, includeDev);
    }
    else if (manifestFilePath.endsWith('project.assets.json')) {
        return buildDepTreeFromProjectAssetsJson(manifestFileContents, targetFramework);
    }
    else {
        throw new Error(`Unsupported file ${manifestFilePath}, Please provide ` +
            'either packages.config or project file.');
    }
}
exports.buildDepTreeFromFiles = buildDepTreeFromFiles;
function extractTargetFrameworksFromFiles(root, manifestFilePath, includeDev = false) {
    if (!root || !manifestFilePath) {
        throw new Error('Missing required parameters for extractTargetFrameworksFromFiles()');
    }
    const manifestFileFullPath = path.resolve(root, manifestFilePath);
    if (!fs.existsSync(manifestFileFullPath)) {
        throw new Error('No project file found at ' +
            `location: ${manifestFileFullPath}`);
    }
    const manifestFileContents = fs.readFileSync(manifestFileFullPath, 'utf-8');
    const manifestFileExtension = path.extname(manifestFileFullPath);
    if (PROJ_FILE_EXTENSIONS.includes(manifestFileExtension)) {
        return extractTargetFrameworksFromProjectFile(manifestFileContents);
    }
    else if (manifestFilePath.endsWith('packages.config')) {
        return extractTargetFrameworksFromProjectConfig(manifestFileContents);
    }
    else if (manifestFilePath.endsWith('project.json')) {
        return extractTargetFrameworksFromProjectJson(manifestFileContents);
    }
    else if (manifestFilePath.endsWith('project.assets.json')) {
        return extractTargetFrameworksFromProjectAssetsJson(manifestFileContents);
    }
    else {
        throw new Error(`Unsupported file ${manifestFilePath}, Please provide ` +
            'a project *.csproj, *.vbproj, *.fsproj or packages.config file.');
    }
}
exports.extractTargetFrameworksFromFiles = extractTargetFrameworksFromFiles;
async function extractTargetFrameworksFromProjectFile(manifestFileContents) {
    try {
        const manifestFile = await parsers_1.parseXmlFile(manifestFileContents);
        return parsers_1.getTargetFrameworksFromProjectFile(manifestFile);
    }
    catch (err) {
        throw new Error(`Extracting target framework failed with error ${err.message}`);
    }
}
exports.extractTargetFrameworksFromProjectFile = extractTargetFrameworksFromProjectFile;
async function extractTargetFrameworksFromProjectConfig(manifestFileContents) {
    try {
        const manifestFile = await parsers_1.parseXmlFile(manifestFileContents);
        return parsers_1.getTargetFrameworksFromProjectConfig(manifestFile);
    }
    catch (err) {
        throw new Error(`Extracting target framework failed with error ${err.message}`);
    }
}
exports.extractTargetFrameworksFromProjectConfig = extractTargetFrameworksFromProjectConfig;
async function containsPackageReference(manifestFileContents) {
    var _a, _b, _c;
    const manifestFile = await parsers_1.parseXmlFile(manifestFileContents);
    const projectItems = (_c = (_b = (_a = manifestFile) === null || _a === void 0 ? void 0 : _a.Project) === null || _b === void 0 ? void 0 : _b.ItemGroup, (_c !== null && _c !== void 0 ? _c : []));
    const referenceIndex = projectItems.findIndex((itemGroup) => 'PackageReference' in itemGroup);
    return referenceIndex !== -1;
}
exports.containsPackageReference = containsPackageReference;
async function extractTargetFrameworksFromProjectJson(manifestFileContents) {
    try {
        // trimming required to address files with UTF-8 with BOM encoding
        const manifestFile = JSON.parse(manifestFileContents.trim());
        return parsers_1.getTargetFrameworksFromProjectJson(manifestFile);
    }
    catch (err) {
        throw new Error(`Extracting target framework failed with error ${err.message}`);
    }
}
exports.extractTargetFrameworksFromProjectJson = extractTargetFrameworksFromProjectJson;
async function extractTargetFrameworksFromProjectAssetsJson(manifestFileContents) {
    try {
        // trimming required to address files with UTF-8 with BOM encoding
        const manifestFile = JSON.parse(manifestFileContents.trim());
        return parsers_1.getTargetFrameworksFromProjectAssetsJson(manifestFile);
    }
    catch (err) {
        throw new Error(`Extracting target framework failed with error ${err.message}`);
    }
}
exports.extractTargetFrameworksFromProjectAssetsJson = extractTargetFrameworksFromProjectAssetsJson;
async function extractProps(propsFileContents) {
    try {
        const propsFile = await parsers_1.parseXmlFile(propsFileContents);
        if (!propsFile) {
            throw new errors_1.InvalidUserInputError('xml file parsing failed');
        }
        return parsers_1.getPropertiesMap(propsFile);
    }
    catch (err) {
        if (err.name === 'InvalidUserInputError') {
            throw err;
        }
        throw new Error(`Extracting props failed with error ${err.message}`);
    }
}
exports.extractProps = extractProps;
//# sourceMappingURL=index.js.map