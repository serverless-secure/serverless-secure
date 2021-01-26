"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const childProcess = require("child_process");
const debugModule = require("debug");
const debugLogging = debugModule('snyk-gradle-plugin');
// Executes a subprocess. Resolves successfully with stdout contents if the exit code is 0.
function execute(command, args, options, perLineCallback) {
    const spawnOptions = { shell: true };
    if (options && options.cwd) {
        spawnOptions.cwd = options.cwd;
    }
    return new Promise((resolve, reject) => {
        let stdout = '';
        let stderr = '';
        const proc = childProcess.spawn(command, args, spawnOptions);
        proc.stdout.on('data', (data) => {
            const strData = data.toString();
            stdout = stdout + strData;
            if (perLineCallback) {
                strData.split('\n').forEach(perLineCallback);
            }
        });
        proc.stderr.on('data', (data) => {
            stderr = stderr + data;
        });
        proc.on('close', (code) => {
            if (code !== 0) {
                const fullCommand = command + ' ' + args.join(' ');
                return reject(new Error(`
>>> command: ${fullCommand}
>>> exit code: ${code}
>>> stdout:
${stdout}
>>> stderr:
${stderr}
`));
            }
            if (stderr) {
                debugLogging('subprocess exit code = 0, but stderr was not empty: ' + stderr);
            }
            resolve(stdout);
        });
    });
}
exports.execute = execute;
//# sourceMappingURL=sub-process.js.map