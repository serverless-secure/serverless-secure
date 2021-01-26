"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function interpolate(msg, vars) {
    if (vars === void 0) { vars = {}; }
    return msg.replace(/\{\{([^\}]+)\}\}/g, function (_, key) { return (key in vars ? vars[key] : _); });
}
exports.interpolate = interpolate;
