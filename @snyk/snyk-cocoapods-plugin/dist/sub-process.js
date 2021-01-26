"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const childProcess = require("child_process");
function execute(command, args = [], options) {
    const spawnOptions = { shell: true };
    if (options && options.cwd) {
        spawnOptions.cwd = options.cwd;
    }
    return new Promise((resolve, reject) => {
        let stdout = '';
        let stderr = '';
        const proc = childProcess.spawn(command, args, spawnOptions);
        proc.stdout.on('data', (data) => {
            stdout = stdout + data;
        });
        proc.stderr.on('data', (data) => {
            stderr = stderr + data;
        });
        proc.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(stdout || stderr));
            }
            resolve(stdout || stderr);
        });
    });
}
exports.execute = execute;
//# sourceMappingURL=sub-process.js.map