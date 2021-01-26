"use strict";
const fs = require("fs");
const analytics = require("../analytics");
const debugModule = require("debug");
const request = require("../request");
const debug = debugModule('snyk:fetch-patch');
async function getPatchFile(patchUrl, patchFilename) {
    try {
        const response = await request({ url: patchUrl });
        if (!response ||
            !response.res ||
            !response.body ||
            response.res.statusCode !== 200) {
            throw response;
        }
        fs.writeFileSync(patchFilename, response.body);
        debug(`Fetched patch from ${patchUrl} to ${patchFilename}, patch size ${response.body.length} bytes`);
    }
    catch (error) {
        const errorMessage = `Failed to fetch patch from ${patchUrl} to ${patchFilename}`;
        debug(errorMessage, error);
        analytics.add('patch-fetch-fail', {
            message: (error && error.message) || errorMessage,
            code: error && error.res && error.res.statusCode,
            patchFilename,
            patchUrl,
        });
        throw new Error(errorMessage);
    }
    return patchFilename;
}
module.exports = getPatchFile;
//# sourceMappingURL=fetch-patch.js.map