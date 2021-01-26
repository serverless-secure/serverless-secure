"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const childProcess = require("child_process");
exports.composerCmd = 'composer --version';
exports.composerShowCmd = 'composer show -p';
exports.pharCmd = `php ${path.resolve(path.resolve() + '/composer.phar')} show -p --format=json`;
function cmdReturnsOk(cmd) {
    return cmd && childProcess.spawnSync(cmd, { shell: true }).status === 0;
}
exports.cmdReturnsOk = cmdReturnsOk;
// run a cmd in a specific folder and it's result should be there
function execWithResult(cmd, basePath) {
    return childProcess.execSync(cmd, { cwd: basePath }).toString();
}
exports.execWithResult = execWithResult;
//# sourceMappingURL=composer-cmds.js.map