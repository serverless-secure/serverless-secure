"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeSync = exports.execute = void 0;
const child_process_1 = require("child_process");
function makeSpawnOptions(options) {
    const spawnOptions = { shell: true };
    if (options && options.cwd) {
        spawnOptions.cwd = options.cwd;
    }
    if (options && options.env) {
        spawnOptions.env = options.env;
    }
    return spawnOptions;
}
function execute(command, args, options) {
    const spawnOptions = makeSpawnOptions(options);
    return new Promise((resolve, reject) => {
        let stdout = '';
        let stderr = '';
        const proc = child_process_1.spawn(command, args, spawnOptions);
        proc.stdout.on('data', (data) => {
            stdout = stdout + data;
        });
        proc.stderr.on('data', (data) => {
            stderr = stderr + data;
        });
        proc.on('close', (code) => {
            if (code !== 0) {
                return reject(stdout || stderr);
            }
            resolve(stdout || stderr);
        });
    });
}
exports.execute = execute;
function executeSync(command, args, options) {
    const spawnOptions = makeSpawnOptions(options);
    return child_process_1.spawnSync(command, args, spawnOptions);
}
exports.executeSync = executeSync;
//# sourceMappingURL=sub-process.js.map