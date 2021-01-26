"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatLegalInstructions = void 0;
const wrap = require("wrap-ansi");
const chalk_1 = require("chalk");
function formatLegalInstructions(legalInstructions, paddingLength = 4) {
    const legalContent = legalInstructions.map((legalData) => wrap(chalk_1.default.bold(`○ for ${legalData.licenseName}: `) + legalData.legalContent, 100)
        .split('\n')
        .join('\n' + ' '.repeat(paddingLength)));
    return legalContent.join('\n' + ' '.repeat(paddingLength));
}
exports.formatLegalInstructions = formatLegalInstructions;
//# sourceMappingURL=legal-license-instructions.js.map