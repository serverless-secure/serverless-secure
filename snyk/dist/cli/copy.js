"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copy = void 0;
const child_process_1 = require("child_process");
const program = {
    darwin: 'pbcopy',
    linux: 'xclip -selection clipboard',
    win32: 'clip',
}[process.platform];
function copy(str) {
    return child_process_1.execSync(program, { input: str });
}
exports.copy = copy;
//# sourceMappingURL=copy.js.map