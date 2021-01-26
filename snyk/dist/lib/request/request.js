"use strict";
const debug_1 = require("debug");
const needle = require("needle");
const url_1 = require("url");
const querystring = require("querystring");
const zlib = require("zlib");
const config = require("../config");
const proxy_from_env_1 = require("proxy-from-env");
const ProxyAgent = require("proxy-agent");
const analytics = require("../analytics");
const version_1 = require("../version");
const debug = debug_1.debug('snyk:req');
const snykDebug = debug_1.debug('snyk');
module.exports = function makeRequest(payload) {
    return version_1.getVersion().then((versionNumber) => new Promise((resolve, reject) => {
        const body = payload.body;
        let data;
        delete payload.body;
        if (!payload.headers) {
            payload.headers = {};
        }
        payload.headers['x-snyk-cli-version'] = versionNumber;
        if (body) {
            const json = JSON.stringify(body);
            if (json.length < 1e4) {
                debug(JSON.stringify(body, null, 2));
            }
            // always compress going upstream
            data = zlib.gzipSync(json, { level: 9 });
            snykDebug('sending request to:', payload.url);
            snykDebug('request body size:', json.length);
            snykDebug('gzipped request body size:', data.length);
            let callGraphLength = null;
            if (body.callGraph) {
                callGraphLength = JSON.stringify(body.callGraph).length;
                snykDebug('call graph size:', callGraphLength);
            }
            if (!payload.url.endsWith('/analytics/cli')) {
                analytics.add('payloadSize', json.length);
                analytics.add('gzippedPayloadSize', data.length);
                if (callGraphLength) {
                    analytics.add('callGraphPayloadSize', callGraphLength);
                }
            }
            payload.headers['content-encoding'] = 'gzip';
            payload.headers['content-length'] = data.length;
        }
        const parsedUrl = url_1.parse(payload.url);
        if (parsedUrl.protocol === 'http:' &&
            parsedUrl.hostname !== 'localhost') {
            debug('forcing api request to https');
            parsedUrl.protocol = 'https:';
            payload.url = url_1.format(parsedUrl);
        }
        // prefer config timeout unless payload specified
        if (!payload.hasOwnProperty('timeout')) {
            payload.timeout = config.timeout * 1000; // s -> ms
        }
        debug('request payload: ', JSON.stringify(payload));
        const method = (payload.method || 'get').toLowerCase();
        let url = payload.url;
        if (payload.qs) {
            url = url + '?' + querystring.stringify(payload.qs);
            delete payload.qs;
        }
        const options = {
            json: payload.json,
            headers: payload.headers,
            timeout: payload.timeout,
            // eslint-disable-next-line @typescript-eslint/camelcase
            follow_max: 5,
            family: payload.family,
        };
        const proxyUri = proxy_from_env_1.getProxyForUrl(url);
        if (proxyUri) {
            snykDebug('using proxy:', proxyUri);
            options.agent = new ProxyAgent(proxyUri);
        }
        else {
            snykDebug('not using proxy');
        }
        if (global.ignoreUnknownCA) {
            debug('Using insecure mode (ignore unkown certificate authority)');
            options.rejectUnauthorized = false;
        }
        needle.request(method, url, data, options, (err, res, respBody) => {
            debug(err);
            debug('response (%s): ', (res || {}).statusCode, JSON.stringify(respBody));
            if (err) {
                return reject(err);
            }
            resolve({ res, body: respBody });
        });
    }));
};
//# sourceMappingURL=request.js.map