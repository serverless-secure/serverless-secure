"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Debug = require("debug");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const docker_1 = require("../docker");
const debug = Debug("snyk");
async function getInspectResult(docker, targetImage) {
    const info = await docker.inspectImage(targetImage);
    return JSON.parse(info.stdout)[0];
}
async function detect(targetImage, options) {
    const docker = new docker_1.Docker(targetImage, options);
    return getInspectResult(docker, targetImage);
}
exports.detect = detect;
function cleanupCallback(imagePath, imageName) {
    return () => {
        const fullImagePath = path.join(imagePath, imageName);
        if (fs.existsSync(fullImagePath)) {
            fs.unlinkSync(fullImagePath);
        }
        fs.rmdirSync(imagePath);
    };
}
async function pullWithDockerBinary(docker, targetImage, saveLocation, username, password, platform) {
    let pullAndSaveSuccessful = false;
    try {
        if (username || password) {
            debug("using local docker binary credentials. the credentials you provided will be ignored");
        }
        await docker.pullCli(targetImage, { platform });
        await docker.save(targetImage, saveLocation);
        return (pullAndSaveSuccessful = true);
    }
    catch (err) {
        debug(`couldn't pull ${targetImage} using docker binary: ${err}`);
        if (err.stderr &&
            err.stderr.includes("unknown operating system or architecture")) {
            throw new Error("Unknown operating system or architecture");
        }
        return pullAndSaveSuccessful;
    }
}
async function pullFromContainerRegistry(docker, targetImage, imageSavePath, username, password) {
    const { hostname, imageName, tag } = await extractImageDetails(targetImage);
    debug(`Attempting to pull: registry: ${hostname}, image: ${imageName}, tag: ${tag}`);
    await docker.pull(hostname, imageName, tag, imageSavePath, username, password);
}
async function pullImage(docker, targetImage, saveLocation, imageSavePath, username, password, platform) {
    if (await docker_1.Docker.binaryExists()) {
        const pullAndSaveSuccessful = await pullWithDockerBinary(docker, targetImage, saveLocation, username, password, platform);
        if (pullAndSaveSuccessful) {
            return;
        }
    }
    await pullFromContainerRegistry(docker, targetImage, imageSavePath, username, password);
}
/**
 * In the case that an `ImageType.Identifier` is detected we need to produce
 * an image archive, either by saving the image if it's already loaded into
 * the local docker daemon, or by pulling the image from a remote registry and
 * saving it to the filesystem directly.
 *
 * Users may also provide us with a URL to an image in a Docker compatible
 * remote registry.
 *
 * @param {string} targetImage - The image to test, this could be in one of
 *    the following forms:
 *      * [registry/]<repo>/<image>[:tag]
 *      * <repo>/<image>[:tag]
 *      * <image>[:tag]
 *    In the case that a registry is not provided, the plugin will default
 *    this to Docker Hub. If a tag is not provided this will default to
 *    `latest`.
 * @param {string} [username] - Optional username for private repo auth.
 * @param {string} [password] - Optional password for private repo auth.
 * @param {string} [platform] - Optional platform parameter to pull specific image arch.
 */
async function getImageArchive(targetImage, imageSavePath, username, password, platform) {
    const docker = new docker_1.Docker(targetImage);
    mkdirp.sync(imageSavePath);
    const destination = {
        name: imageSavePath,
        removeCallback: cleanupCallback(imageSavePath, "image.tar"),
    };
    const saveLocation = path.join(destination.name, "image.tar");
    let inspectResult;
    try {
        inspectResult = await getInspectResult(docker, targetImage);
    }
    catch (_a) {
        debug(`${targetImage} does not exist locally, proceeding to pull image.`);
    }
    if (inspectResult === undefined) {
        await pullImage(docker, targetImage, saveLocation, imageSavePath, username, password, platform);
        return {
            path: saveLocation,
            removeArchive: destination.removeCallback,
        };
    }
    if (platform !== undefined &&
        inspectResult &&
        !isLocalImageSameArchitecture(platform, inspectResult.Architecture)) {
        await pullImage(docker, targetImage, saveLocation, imageSavePath, username, password, platform);
    }
    else {
        await docker.save(targetImage, saveLocation);
    }
    return {
        path: saveLocation,
        removeArchive: destination.removeCallback,
    };
}
exports.getImageArchive = getImageArchive;
async function extractImageDetails(targetImage) {
    let remainder;
    let hostname;
    let imageName;
    let tag;
    // We need to detect if the `targetImage` is part of a URL. Based on the Docker specification,
    // the hostname should contain a `.` or `:` before the first instance of a `/` otherwise the
    // default hostname will be used (registry-1.docker.io). ref: https://stackoverflow.com/a/37867949
    const i = targetImage.indexOf("/");
    if (i === -1 ||
        (!targetImage.substring(0, i).includes(".") &&
            !targetImage.substring(0, i).includes(":") &&
            targetImage.substring(0, i) !== "localhost")) {
        hostname = "registry-1.docker.io";
        remainder = targetImage;
        [imageName, tag] = remainder.split(":");
        imageName =
            imageName.indexOf("/") === -1 ? "library/" + imageName : imageName;
    }
    else {
        hostname = targetImage.substring(0, i);
        remainder = targetImage.substring(i + 1);
        [imageName, tag] = remainder.split(":");
    }
    // Assume the latest tag if no tag was found.
    tag = tag || "latest";
    return {
        hostname,
        imageName,
        tag,
    };
}
exports.extractImageDetails = extractImageDetails;
function isLocalImageSameArchitecture(platformOption, inspectResultArchitecture) {
    let platformArchitecture;
    try {
        // Note: this is using the same flag/input pattern as the new Docker buildx: eg. linux/arm64/v8
        platformArchitecture = platformOption.split("/")[1];
    }
    catch (error) {
        debug(`Error parsing platform flag: '${error}'`);
        return false;
    }
    return platformArchitecture === inspectResultArchitecture;
}
async function pullIfNotLocal(targetImage, options) {
    const docker = new docker_1.Docker(targetImage);
    try {
        await docker.inspectImage(targetImage);
        return;
    }
    catch (err) {
        // image doesn't exist locally
    }
    await docker.pullCli(targetImage);
}
exports.pullIfNotLocal = pullIfNotLocal;
//# sourceMappingURL=image-inspector.js.map