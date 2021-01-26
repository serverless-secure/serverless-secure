"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayModeHelp = exports.modeValidation = exports.parseMode = void 0;
const abbrev = require("abbrev");
const errors_1 = require("../lib/errors");
const modes = {
    source: {
        allowedCommands: ['test'],
        config: (args) => {
            args['source'] = true;
            return args;
        },
    },
    container: {
        allowedCommands: ['test', 'monitor'],
        config: (args) => {
            args['docker'] = true;
            args['experimental'] = true;
            args['app-vulns'] = args.json ? false : true;
            return args;
        },
    },
    iac: {
        allowedCommands: ['test'],
        config: (args) => {
            args['iac'] = true;
            return args;
        },
    },
};
function parseMode(mode, args) {
    if (isValidMode(mode)) {
        const command = args._[0];
        if (isValidCommand(mode, command)) {
            configArgs(mode, args);
            mode = args._.shift();
        }
    }
    return mode;
}
exports.parseMode = parseMode;
function modeValidation(args) {
    const mode = args['command'];
    const commands = args['options']._;
    if (isValidMode(mode) && commands.length <= 1) {
        const allowed = modes[mode].allowedCommands
            .join(', ')
            .replace(/, ([^,]*)$/, ' or $1');
        const message = `use snyk ${mode} with ${allowed}`;
        throw new errors_1.CustomError(message);
    }
    const command = commands[0];
    if (isValidMode(mode) && !isValidCommand(mode, command)) {
        const notSupported = [mode, command];
        throw new errors_1.UnsupportedOptionCombinationError(notSupported);
    }
}
exports.modeValidation = modeValidation;
function displayModeHelp(mode, args) {
    if (isValidMode(mode)) {
        const command = args._[0];
        if (!isValidCommand(mode, command) || args['help']) {
            args['help'] = mode;
        }
    }
    return mode;
}
exports.displayModeHelp = displayModeHelp;
function isValidMode(mode) {
    return Object.keys(modes).includes(mode);
}
function isValidCommand(mode, command) {
    const aliases = abbrev(modes[mode].allowedCommands);
    return Object.keys(aliases).includes(command);
}
function configArgs(mode, args) {
    return modes[mode].config(args);
}
//# sourceMappingURL=modes.js.map