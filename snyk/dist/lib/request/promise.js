"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRequest = void 0;
const request = require("./index");
async function makeRequest(payload) {
    return new Promise((resolve, reject) => {
        request(payload, (error, res, body) => {
            if (error) {
                return reject(error);
            }
            if (res.statusCode !== 200) {
                return reject({
                    code: res.statusCode,
                    message: body === null || body === void 0 ? void 0 : body.message,
                });
            }
            resolve(body);
        });
    });
}
exports.makeRequest = makeRequest;
//# sourceMappingURL=promise.js.map