"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const childProcess = require("child_process");
const debug_1 = require("./debug");
const errors_1 = require("./errors");
function execute(command, args, options) {
    const spawnOptions = { shell: true };
    if (options && options.cwd) {
        spawnOptions.cwd = options.cwd;
    }
    return new Promise((resolve, reject) => {
        let stdout = '';
        let stderr = '';
        debug_1.debug(`executing command: "${command} ${args.join(' ')}"`);
        const proc = childProcess.spawn(command, args, spawnOptions);
        let timerId = null;
        if (options === null || options === void 0 ? void 0 : options.timeout) {
            timerId = setTimeout(() => {
                proc.kill();
                const err = new errors_1.SubprocessTimeoutError(command, args.join(' '), options.timeout || 0);
                debug_1.debug(err.message);
                reject(err);
            }, options.timeout);
        }
        proc.stdout.on('data', (data) => {
            stdout = stdout + data;
        });
        proc.stderr.on('data', (data) => {
            stderr = stderr + data;
        });
        proc.on('close', (code) => {
            if (timerId !== null) {
                clearTimeout(timerId);
            }
            if (code !== 0) {
                const err = new errors_1.SubprocessError(command, args.join(' '), code);
                debug_1.debug(err.message);
                return reject(err);
            }
            resolve(stdout);
        });
    });
}
exports.execute = execute;
//# sourceMappingURL=sub-process.js.map