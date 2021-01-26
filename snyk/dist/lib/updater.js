"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCheck = void 0;
const updateNotifier = require("update-notifier");
const fs = require("fs");
const p = require("path");
const version_1 = require("./version");
function updateCheck() {
    const pkgPath = p.join(__dirname, '../..', 'package.json');
    const isPkgFilePresent = fs.existsSync(pkgPath);
    if (!isPkgFilePresent) {
        return false;
    }
    if (version_1.isStandaloneBuild()) {
        return false;
    }
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    // if there's no version (f.e. during tests) - do not proceed
    if (!pkg.version) {
        return false;
    }
    // Checks for available update and returns an instance
    // Default updateCheckInterval is once a day
    const notifier = updateNotifier({ pkg });
    notifier.notify();
    return true;
}
exports.updateCheck = updateCheck;
//# sourceMappingURL=updater.js.map