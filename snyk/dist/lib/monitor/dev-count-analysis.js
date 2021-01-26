"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellOutError = exports.execShell = exports.separateLines = exports.runGitLog = exports.getTimestampStartOfContributingDevTimeframe = exports.isSha1Hash = exports.hashData = exports.parseGitLog = exports.parseGitLogLine = exports.GitRepoCommitStats = exports.GitCommitInfo = exports.CONTRIBUTING_DEVELOPER_PERIOD_DAYS = exports.SERIOUS_DELIMITER = void 0;
/**
 * This is to count the number of "contributing" developers using Snyk on a given repo.
 * "Contributing" is defined as having contributed a commit in the last 90 days.
 * This is use only on the `snyk monitor` command as that is used to monitor a project's dependencies in an
 * on-going manner.
 * It collects only a hash of the email of a git user and the most recent commit timestamp (both per the `git log`
 * output) and can be disabled by config (see https://snyk.io/policies/tracking-and-analytics/).
 */
const crypto = require("crypto");
const child_process_1 = require("child_process");
exports.SERIOUS_DELIMITER = '_SNYK_SEPARATOR_';
exports.CONTRIBUTING_DEVELOPER_PERIOD_DAYS = 90;
class GitCommitInfo {
    constructor(authorHashedEmail, commitTimestamp) {
        if (isSha1Hash(authorHashedEmail)) {
            this.authorHashedEmail = authorHashedEmail;
            this.commitTimestamp = commitTimestamp;
        }
        else {
            throw new Error('authorHashedEmail must be a sha1 hash');
        }
    }
}
exports.GitCommitInfo = GitCommitInfo;
class GitRepoCommitStats {
    constructor(commitInfos) {
        this.commitInfos = commitInfos;
    }
    static empty() {
        return new GitRepoCommitStats([]);
    }
    addCommitInfo(info) {
        this.commitInfos.push(info);
    }
    getUniqueAuthorsCount() {
        const uniqueAuthorHashedEmails = this.getUniqueAuthorHashedEmails();
        return uniqueAuthorHashedEmails.size;
    }
    getCommitsCount() {
        return this.commitInfos.length;
    }
    getUniqueAuthorHashedEmails() {
        const allCommitAuthorHashedEmails = this.commitInfos.map((c) => c.authorHashedEmail);
        const uniqueAuthorHashedEmails = new Set(allCommitAuthorHashedEmails);
        return uniqueAuthorHashedEmails;
    }
    getRepoContributors() {
        const uniqueAuthorHashedEmails = this.getUniqueAuthorHashedEmails();
        const contributors = [];
        // for each uniqueAuthorHashedEmails, get the latest commit
        for (const nextUniqueAuthorHashedEmail of uniqueAuthorHashedEmails) {
            const latestCommitTimestamp = this.getMostRecentCommitTimestamp(nextUniqueAuthorHashedEmail);
            contributors.push({
                userId: nextUniqueAuthorHashedEmail,
                lastCommitDate: latestCommitTimestamp,
            });
        }
        return contributors;
    }
    getMostRecentCommitTimestamp(authorHashedEmail) {
        for (const nextGI of this.commitInfos) {
            if (nextGI.authorHashedEmail === authorHashedEmail) {
                return nextGI.commitTimestamp;
            }
        }
        return '';
    }
}
exports.GitRepoCommitStats = GitRepoCommitStats;
function parseGitLogLine(logLine) {
    const lineComponents = logLine.split(exports.SERIOUS_DELIMITER);
    const authorEmail = lineComponents[2];
    const commitTimestamp = lineComponents[3];
    const hashedAuthorEmail = hashData(authorEmail);
    const commitInfo = new GitCommitInfo(hashedAuthorEmail, commitTimestamp);
    return commitInfo;
}
exports.parseGitLogLine = parseGitLogLine;
function parseGitLog(gitLog) {
    if (gitLog.trim() === '') {
        return GitRepoCommitStats.empty();
    }
    const logLines = separateLines(gitLog);
    const logLineInfos = logLines.map(parseGitLogLine);
    const stats = new GitRepoCommitStats(logLineInfos);
    return stats;
}
exports.parseGitLog = parseGitLog;
function hashData(s) {
    const hashedData = crypto
        .createHash('sha1')
        .update(s)
        .digest('hex');
    return hashedData;
}
exports.hashData = hashData;
function isSha1Hash(data) {
    // sha1 hash must be exactly 40 characters of 0-9 / a-f (i.e. lowercase hex characters)
    // ^ == start anchor
    // [0-9a-f] == characters 0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f only
    // {40} 40 of the [0-9a-f] characters
    // $ == end anchor
    const matchRegex = new RegExp('^[0-9a-f]{40}$');
    const looksHashed = matchRegex.test(data);
    return looksHashed;
}
exports.isSha1Hash = isSha1Hash;
/**
 * @returns time stamp in seconds-since-epoch of 90 days ago since 90 days is the "contributing devs" timeframe
 */
function getTimestampStartOfContributingDevTimeframe(dNow, timespanInDays = exports.CONTRIBUTING_DEVELOPER_PERIOD_DAYS) {
    const nowUtcEpocMS = dNow.getTime();
    const nowUtcEpocS = Math.floor(nowUtcEpocMS / 1000);
    const ONE_DAY_IN_SECONDS = 86400;
    const lookbackTimespanSeconds = timespanInDays * ONE_DAY_IN_SECONDS;
    const startOfPeriodEpochSeconds = nowUtcEpocS - lookbackTimespanSeconds;
    return startOfPeriodEpochSeconds;
}
exports.getTimestampStartOfContributingDevTimeframe = getTimestampStartOfContributingDevTimeframe;
async function runGitLog(timestampEpochSecondsStartOfPeriod, repoPath, fnShellout) {
    try {
        const gitLogCommand = `git --no-pager log --no-merges --pretty=tformat:"%H${exports.SERIOUS_DELIMITER}%an${exports.SERIOUS_DELIMITER}%ae${exports.SERIOUS_DELIMITER}%aI" --after="${timestampEpochSecondsStartOfPeriod}"`;
        const gitLogStdout = await fnShellout(gitLogCommand, repoPath);
        return gitLogStdout;
    }
    catch (_a) {
        return '';
    }
}
exports.runGitLog = runGitLog;
function separateLines(inputText) {
    const linuxStyleNewLine = '\n';
    const windowsStyleNewLine = '\r\n';
    const reg = new RegExp(`${linuxStyleNewLine}|${windowsStyleNewLine}`);
    const lines = inputText.trim().split(reg);
    return lines;
}
exports.separateLines = separateLines;
function execShell(cmd, workingDirectory) {
    const options = {
        cwd: workingDirectory,
    };
    return new Promise((resolve, reject) => {
        child_process_1.exec(cmd, options, (error, stdout, stderr) => {
            if (error) {
                // TODO: we can probably remove this after unshipping Node 8 support
                // and then just directly get the error code like `error.code`
                let exitCode = 0;
                try {
                    exitCode = parseInt(error['code']);
                }
                catch (_a) {
                    exitCode = -1;
                }
                const e = new ShellOutError(error.message, exitCode, stdout, stderr, error);
                reject(e);
            }
            else {
                resolve(stdout ? stdout : stderr);
            }
        });
    });
}
exports.execShell = execShell;
class ShellOutError extends Error {
    constructor(message, exitCode, stdout, stderr, innerError) {
        super(message);
        this.exitCode = exitCode;
        this.stdout = stdout;
        this.stderr = stderr;
        this.innerError = innerError;
    }
}
exports.ShellOutError = ShellOutError;
//# sourceMappingURL=dev-count-analysis.js.map