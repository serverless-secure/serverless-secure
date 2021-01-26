"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAPI = exports.isAuthed = void 0;
const snyk = require("../../../lib");
const config = require("../../../lib/config");
const request = require("../../../lib/request");
function isAuthed() {
    const token = snyk.config.get('api');
    return verifyAPI(token).then((res) => {
        return res.body.ok;
    });
}
exports.isAuthed = isAuthed;
function verifyAPI(api) {
    const payload = {
        body: {
            api,
        },
        method: 'POST',
        url: config.API + '/verify/token',
        json: true,
    };
    return new Promise((resolve, reject) => {
        request(payload, (error, res, body) => {
            if (error) {
                return reject(error);
            }
            resolve({
                res,
                body,
            });
        });
    });
}
exports.verifyAPI = verifyAPI;
//# sourceMappingURL=is-authed.js.map