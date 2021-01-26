"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var create_from_json_1 = require("./core/create-from-json");
exports.createFromJSON = create_from_json_1.createFromJSON;
var builder_1 = require("./core/builder");
exports.DepGraphBuilder = builder_1.DepGraphBuilder;
const Errors = require("./core/errors");
exports.Errors = Errors;
const legacy = require("./legacy");
exports.legacy = legacy;
//# sourceMappingURL=index.js.map