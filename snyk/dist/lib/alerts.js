"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayAlerts = exports.hasAlert = exports.registerAlerts = void 0;
const chalk_1 = require("chalk");
const registeredAlerts = [];
function registerAlerts(alerts) {
    if (!alerts) {
        return;
    }
    alerts.forEach((alert) => {
        if (!hasAlert(alert.name)) {
            registeredAlerts.push(alert);
        }
    });
}
exports.registerAlerts = registerAlerts;
function hasAlert(name) {
    return registeredAlerts.find((a) => a.name === name);
}
exports.hasAlert = hasAlert;
function displayAlerts() {
    let res = '';
    const sep = '\n';
    registeredAlerts.forEach((alert) => {
        res += sep;
        if (alert.type === 'warning') {
            res += chalk_1.default.bold.red(alert.msg);
        }
        else {
            res += chalk_1.default.yellow(alert.msg);
        }
    });
    return res;
}
exports.displayAlerts = displayAlerts;
//# sourceMappingURL=alerts.js.map