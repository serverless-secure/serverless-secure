"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMinimumTargetFrameworkFromPackagesConfig = exports.buildDepTreeFromFiles = void 0;
const fs = require("fs");
const path = require("path");
const csproj_parser_1 = require("./csproj-parser");
const _ = require("lodash");
const debugModule = require("debug");
const debug = debugModule('snyk');
const dotnetCoreParser = require("./dotnet-core-parser");
const dotnetFrameworkParser = require("./dotnet-framework-parser");
const projectJsonParser = require("./project-json-parser");
const packagesConfigParser = require("./packages-config-parser");
const errors_1 = require("../errors");
const depsParser = require("dotnet-deps-parser");
const framework_1 = require("./framework");
const PARSERS = {
    'dotnet-core': {
        depParser: dotnetCoreParser,
        fileContentParser: JSON,
    },
    'packages.config': {
        depParser: dotnetFrameworkParser,
        fileContentParser: packagesConfigParser,
    },
    'project.json': {
        depParser: dotnetFrameworkParser,
        fileContentParser: projectJsonParser,
    },
};
function getPackagesFolder(packagesFolder, projectRootFolder) {
    if (packagesFolder) {
        return path.resolve(process.cwd(), packagesFolder);
    }
    return path.resolve(projectRootFolder, 'packages');
}
async function buildDepTreeFromFiles(root, targetFile, packagesFolderPath, manifestType, useProjectNameFromAssetsFile) {
    const safeRoot = root || '.';
    const safeTargetFile = targetFile || '.';
    const fileContentPath = path.resolve(safeRoot, safeTargetFile);
    let fileContent;
    try {
        debug(`Parsing content of ${fileContentPath}`);
        fileContent = fs.readFileSync(fileContentPath, 'utf-8');
    }
    catch (error) {
        throw new errors_1.FileNotProcessableError(error);
    }
    const projectRootFolder = path.resolve(fileContentPath, '../../');
    const packagesFolder = getPackagesFolder(packagesFolderPath, projectRootFolder);
    const tree = {
        dependencies: {},
        meta: {},
        name: path.basename(root || projectRootFolder),
        packageFormatVersion: 'nuget:0.0.0',
        version: '0.0.0',
    };
    let targetFramework;
    try {
        if (manifestType === 'dotnet-core') {
            targetFramework = await csproj_parser_1.getTargetFrameworksFromProjFile(projectRootFolder);
        }
        else {
            // .csproj is in the same directory as packages.config or project.json
            const fileContentParentDirectory = path.resolve(fileContentPath, '../');
            targetFramework = await csproj_parser_1.getTargetFrameworksFromProjFile(fileContentParentDirectory);
            // finally, for the .NETFramework project, try to assume the framework using dotnet-deps-parser
            if (!targetFramework) {
                // currently only process packages.config files
                if (manifestType === 'packages.config') {
                    targetFramework = await getMinimumTargetFrameworkFromPackagesConfig(fileContent);
                }
            }
        }
    }
    catch (error) {
        return Promise.reject(error);
    }
    tree.meta = {
        targetFramework: targetFramework ? targetFramework.original : undefined,
    };
    const parser = PARSERS[manifestType];
    const manifest = await parser.fileContentParser.parse(fileContent, tree);
    if (manifestType === 'dotnet-core' && useProjectNameFromAssetsFile) {
        const projectName = _.get(manifest, 'project.restore.projectName');
        if (projectName) {
            tree.name = projectName;
        }
        else {
            debug("project.assets.json file doesn't contain a value for 'projectName'. Using default value: " + tree.name);
        }
    }
    return parser.depParser.parse(tree, manifest, targetFramework, packagesFolder);
}
exports.buildDepTreeFromFiles = buildDepTreeFromFiles;
async function getMinimumTargetFrameworkFromPackagesConfig(fileContent) {
    const extractedFrameworks = await depsParser.extractTargetFrameworksFromProjectConfig(fileContent);
    if (extractedFrameworks && extractedFrameworks.length > 0) {
        const minimumFramework = extractedFrameworks.reduce((prev, curr) => prev < curr ? prev : curr);
        return framework_1.toReadableFramework(minimumFramework);
    }
    return undefined;
}
exports.getMinimumTargetFrameworkFromPackagesConfig = getMinimumTargetFrameworkFromPackagesConfig;
//# sourceMappingURL=index.js.map