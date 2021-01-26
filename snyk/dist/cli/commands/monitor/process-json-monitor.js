"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processJsonMonitorResponse = void 0;
function processJsonMonitorResponse(results) {
    let dataToSend = results.map((result) => {
        if (result.ok) {
            const jsonData = JSON.parse(result.data);
            if (result.projectName) {
                jsonData.projectName = result.projectName;
            }
            return jsonData;
        }
        return { ok: false, error: result.data.message, path: result.path };
    });
    // backwards compat - strip array if only one result
    dataToSend = dataToSend.length === 1 ? dataToSend[0] : dataToSend;
    const stringifiedData = JSON.stringify(dataToSend, null, 2);
    if (results.every((res) => res.ok)) {
        return stringifiedData;
    }
    const err = new Error(stringifiedData);
    err.json = dataToSend;
    throw err;
}
exports.processJsonMonitorResponse = processJsonMonitorResponse;
//# sourceMappingURL=process-json-monitor.js.map