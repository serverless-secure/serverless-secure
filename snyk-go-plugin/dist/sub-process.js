"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const childProcess = require("child_process");
function execute(command, args, options) {
    if (process.env.TERM_PROGRAM === 'vscode') {
        throw new Error('running go subprocesses in VS Code seems to be broken!');
        // Namely, it seems that no data is collected from stdout/stderr streams.
        // Even just running `go version > 1.txt` in the terminal produces an empty file.
    }
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
                return reject(stdout || stderr);
            }
            resolve(stdout || stderr);
        });
    });
}
exports.execute = execute;
//# sourceMappingURL=sub-process.js.map