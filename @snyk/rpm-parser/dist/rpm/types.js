"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Size of an RPM metadata entry in bytes.
 */
exports.ENTRY_INFO_SIZE = 16;
var RpmTag;
(function (RpmTag) {
    RpmTag[RpmTag["NAME"] = 1000] = "NAME";
    RpmTag[RpmTag["VERSION"] = 1001] = "VERSION";
    RpmTag[RpmTag["RELEASE"] = 1002] = "RELEASE";
    RpmTag[RpmTag["EPOCH"] = 1003] = "EPOCH";
    RpmTag[RpmTag["SIZE"] = 1009] = "SIZE";
    RpmTag[RpmTag["ARCH"] = 1022] = "ARCH";
})(RpmTag = exports.RpmTag || (exports.RpmTag = {}));
var RpmType;
(function (RpmType) {
    RpmType[RpmType["NULL"] = 0] = "NULL";
    RpmType[RpmType["CHAR"] = 1] = "CHAR";
    RpmType[RpmType["INT8"] = 2] = "INT8";
    RpmType[RpmType["INT16"] = 3] = "INT16";
    RpmType[RpmType["INT32"] = 4] = "INT32";
    RpmType[RpmType["INT64"] = 5] = "INT64";
    RpmType[RpmType["STRING"] = 6] = "STRING";
    RpmType[RpmType["BIN"] = 7] = "BIN";
    RpmType[RpmType["STRING_ARRAY"] = 8] = "STRING_ARRAY";
    RpmType[RpmType["I18NSTRING"] = 9] = "I18NSTRING";
})(RpmType = exports.RpmType || (exports.RpmType = {}));
//# sourceMappingURL=types.js.map