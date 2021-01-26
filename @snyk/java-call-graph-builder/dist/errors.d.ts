export declare class CallGraphGenerationError extends Error {
    innerError: Error;
    constructor(msg: string, innerError: Error);
}
export declare class ClassPathGenerationError extends Error {
    readonly userMessage = "Could not determine the project's class path. Please contact our support or submit an issue at https://github.com/snyk/java-call-graph-builder/issues. Re-running the command with the `-d` flag will provide useful information for the support engineers.";
    innerError: Error;
    constructor(innerError: Error);
}
export declare class EmptyClassPathError extends Error {
    readonly userMessage = "The class path for the project is empty. Please contact our support or submit an issue at https://github.com/snyk/java-call-graph-builder/issues. Re-running the command with the `-d` flag will provide useful information for the support engineers.";
    constructor(command: string);
}
export declare class MissingTargetFolderError extends Error {
    readonly userMessage = "Could not find the project's target folder. Please compile your code by running `mvn compile` and try again.";
    constructor(targetPath: string);
}
export declare class SubprocessTimeoutError extends Error {
    readonly userMessage = "Scanning for reachable vulnerabilities took too long. Please use the --reachable-timeout flag to increase the timeout for finding reachable vulnerabilities.";
    constructor(command: string, args: string, timeout: number);
}
export declare class SubprocessError extends Error {
    constructor(command: string, args: string, exitCode: number);
}
