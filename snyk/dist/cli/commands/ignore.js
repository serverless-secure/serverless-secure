"use strict";
const policy = require("snyk-policy");
const chalk_1 = require("chalk");
const authorization = require("../../lib/authorization");
const auth = require("./auth/is-authed");
const api_token_1 = require("../../lib/api-token");
const is_ci_1 = require("../../lib/is-ci");
const Debug = require("debug");
const debug = Debug('snyk');
const misconfigured_auth_in_ci_error_1 = require("../../lib/errors/misconfigured-auth-in-ci-error");
function ignore(options) {
    debug('snyk ignore called with options: %O', options);
    return auth
        .isAuthed()
        .then((authed) => {
        if (!authed) {
            if (is_ci_1.isCI()) {
                throw misconfigured_auth_in_ci_error_1.MisconfiguredAuthInCI();
            }
        }
        api_token_1.apiTokenExists();
    })
        .then(() => {
        return authorization.actionAllowed('cliIgnore', options);
    })
        .then((cliIgnoreAuthorization) => {
        if (!cliIgnoreAuthorization.allowed) {
            debug('snyk ignore called when disallowed');
            console.log(chalk_1.default.bold.red(cliIgnoreAuthorization.reason));
            return;
        }
        if (!options.id) {
            throw Error('idRequired');
        }
        options.expiry = new Date(options.expiry);
        if (options.expiry.getTime() !== options.expiry.getTime()) {
            debug('No/invalid expiry given, using the default 30 days');
            options.expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        }
        if (!options.reason) {
            options.reason = 'None Given';
        }
        debug('changing policy: ignore "%s", for all paths, reason: "%s", until: %o', options.id, options.reason, options.expiry);
        return policy
            .load(options['policy-path'])
            .catch((error) => {
            if (error.code === 'ENOENT') {
                // file does not exist - create it
                return policy.create();
            }
            throw Error('policyFile');
        })
            .then(async function ignoreIssue(pol) {
            pol.ignore[options.id] = [
                {
                    '*': {
                        reason: options.reason,
                        expires: options.expiry,
                    },
                },
            ];
            return await policy.save(pol, options['policy-path']);
        });
    });
}
module.exports = ignore;
//# sourceMappingURL=ignore.js.map