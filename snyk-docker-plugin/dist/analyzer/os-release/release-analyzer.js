"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function tryOSRelease(text) {
    if (!text) {
        return null;
    }
    const idRes = text.match(/^ID=(.+)$/m);
    if (!idRes) {
        throw new Error("Failed to parse /etc/os-release");
    }
    const name = idRes[1].replace(/"/g, "");
    const versionRes = text.match(/^VERSION_ID=(.+)$/m);
    let version = versionRes ? versionRes[1].replace(/"/g, "") : "unstable";
    if (name === "ol") {
        version = version.split(".")[0];
    }
    let prettyName = "";
    const prettyNameRes = text.match(/^PRETTY_NAME=(.+)$/m);
    if (prettyNameRes) {
        prettyName = prettyNameRes[1].replace(/"/g, "");
    }
    return { name, version, prettyName };
}
exports.tryOSRelease = tryOSRelease;
async function tryLsbRelease(text) {
    if (!text) {
        return null;
    }
    const idRes = text.match(/^DISTRIB_ID=(.+)$/m);
    const versionRes = text.match(/^DISTRIB_RELEASE=(.+)$/m);
    if (!idRes || !versionRes) {
        throw new Error("Failed to parse /etc/lsb-release");
    }
    const name = idRes[1].replace(/"/g, "").toLowerCase();
    const version = versionRes[1].replace(/"/g, "");
    return { name, version, prettyName: "" };
}
exports.tryLsbRelease = tryLsbRelease;
async function tryDebianVersion(text) {
    if (!text) {
        return null;
    }
    text = text.trim();
    if (text.length < 2) {
        throw new Error("Failed to parse /etc/debian_version");
    }
    return { name: "debian", version: text.split(".")[0], prettyName: "" };
}
exports.tryDebianVersion = tryDebianVersion;
async function tryAlpineRelease(text) {
    if (!text) {
        return null;
    }
    text = text.trim();
    if (text.length < 2) {
        throw new Error("Failed to parse /etc/alpine-release");
    }
    return { name: "alpine", version: text, prettyName: "" };
}
exports.tryAlpineRelease = tryAlpineRelease;
async function tryRedHatRelease(text) {
    if (!text) {
        return null;
    }
    const idRes = text.match(/^(\S+)/m);
    const versionRes = text.match(/(\d+)\./m);
    if (!idRes || !versionRes) {
        throw new Error("Failed to parse /etc/redhat-release");
    }
    const name = idRes[1].replace(/"/g, "").toLowerCase();
    const version = versionRes[1].replace(/"/g, "");
    return { name, version, prettyName: "" };
}
exports.tryRedHatRelease = tryRedHatRelease;
async function tryCentosRelease(text) {
    if (!text) {
        return null;
    }
    const idRes = text.match(/^(\S+)/m);
    const versionRes = text.match(/(\d+)\./m);
    if (!idRes || !versionRes) {
        throw new Error("Failed to parse /etc/centos-release");
    }
    const name = idRes[1].replace(/"/g, "").toLowerCase();
    const version = versionRes[1].replace(/"/g, "");
    return { name, version, prettyName: "" };
}
exports.tryCentosRelease = tryCentosRelease;
async function tryOracleRelease(text) {
    if (!text) {
        return null;
    }
    const idRes = text.match(/^(\S+)/m);
    const versionRes = text.match(/(\d+\.\d+)/m);
    if (!idRes || !versionRes) {
        throw new Error("Failed to parse /etc/oracle-release");
    }
    const name = idRes[1].replace(/"/g, "").toLowerCase();
    const version = versionRes[1].replace(/"/g, "").split(".")[0];
    return { name, version, prettyName: "" };
}
exports.tryOracleRelease = tryOracleRelease;
//# sourceMappingURL=release-analyzer.js.map