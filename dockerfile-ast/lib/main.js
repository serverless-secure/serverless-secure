"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var argument_1 = require("./argument");
exports.Argument = argument_1.Argument;
var jsonArgument_1 = require("./jsonArgument");
exports.JSONArgument = jsonArgument_1.JSONArgument;
const comment_1 = require("./comment");
exports.Comment = comment_1.Comment;
const parser_1 = require("./parser");
var flag_1 = require("./flag");
exports.Flag = flag_1.Flag;
const instruction_1 = require("./instruction");
exports.Instruction = instruction_1.Instruction;
var line_1 = require("./line");
exports.Line = line_1.Line;
const parserDirective_1 = require("./parserDirective");
exports.ParserDirective = parserDirective_1.ParserDirective;
var property_1 = require("./property");
exports.Property = property_1.Property;
var variable_1 = require("./variable");
exports.Variable = variable_1.Variable;
var add_1 = require("./instructions/add");
exports.Add = add_1.Add;
const arg_1 = require("./instructions/arg");
exports.Arg = arg_1.Arg;
const cmd_1 = require("./instructions/cmd");
exports.Cmd = cmd_1.Cmd;
const copy_1 = require("./instructions/copy");
exports.Copy = copy_1.Copy;
const entrypoint_1 = require("./instructions/entrypoint");
exports.Entrypoint = entrypoint_1.Entrypoint;
const env_1 = require("./instructions/env");
exports.Env = env_1.Env;
const from_1 = require("./instructions/from");
exports.From = from_1.From;
const healthcheck_1 = require("./instructions/healthcheck");
exports.Healthcheck = healthcheck_1.Healthcheck;
var jsonInstruction_1 = require("./jsonInstruction");
exports.JSONInstruction = jsonInstruction_1.JSONInstruction;
var label_1 = require("./instructions/label");
exports.Label = label_1.Label;
var modifiableInstruction_1 = require("./modifiableInstruction");
exports.ModifiableInstruction = modifiableInstruction_1.ModifiableInstruction;
var onbuild_1 = require("./instructions/onbuild");
exports.Onbuild = onbuild_1.Onbuild;
var propertyInstruction_1 = require("./propertyInstruction");
exports.PropertyInstruction = propertyInstruction_1.PropertyInstruction;
var shell_1 = require("./instructions/shell");
exports.Shell = shell_1.Shell;
var stopsignal_1 = require("./instructions/stopsignal");
exports.Stopsignal = stopsignal_1.Stopsignal;
var user_1 = require("./instructions/user");
exports.User = user_1.User;
var volume_1 = require("./instructions/volume");
exports.Volume = volume_1.Volume;
var workdir_1 = require("./instructions/workdir");
exports.Workdir = workdir_1.Workdir;
var Keyword;
(function (Keyword) {
    Keyword["ADD"] = "ADD";
    Keyword["ARG"] = "ARG";
    Keyword["CMD"] = "CMD";
    Keyword["COPY"] = "COPY";
    Keyword["ENTRYPOINT"] = "ENTRYPOINT";
    Keyword["ENV"] = "ENV";
    Keyword["EXPOSE"] = "EXPOSE";
    Keyword["FROM"] = "FROM";
    Keyword["HEALTHCHECK"] = "HEALTHCHECK";
    Keyword["LABEL"] = "LABEL";
    Keyword["MAINTAINER"] = "MAINTAINER";
    Keyword["ONBUILD"] = "ONBUILD";
    Keyword["RUN"] = "RUN";
    Keyword["SHELL"] = "SHELL";
    Keyword["STOPSIGNAL"] = "STOPSIGNAL";
    Keyword["USER"] = "USER";
    Keyword["VOLUME"] = "VOLUME";
    Keyword["WORKDIR"] = "WORKDIR";
})(Keyword = exports.Keyword || (exports.Keyword = {}));
var Directive;
(function (Directive) {
    Directive["escape"] = "escape";
    Directive["syntax"] = "syntax";
})(Directive = exports.Directive || (exports.Directive = {}));
exports.DefaultVariables = [
    "FTP_PROXY", "ftp_proxy",
    "HTTP_PROXY", "http_proxy",
    "HTTPS_PROXY", "https_proxy",
    "NO_PROXY", "no_proxy"
];
var DockerfileParser;
(function (DockerfileParser) {
    function parse(content) {
        let parser = new parser_1.Parser();
        return parser.parse(content);
    }
    DockerfileParser.parse = parse;
})(DockerfileParser = exports.DockerfileParser || (exports.DockerfileParser = {}));
