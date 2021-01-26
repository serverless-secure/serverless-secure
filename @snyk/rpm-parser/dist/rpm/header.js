"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_loop_spinner_1 = require("event-loop-spinner");
const types_1 = require("./types");
const types_2 = require("../types");
/**
 * Transform a blob of metadadata into addressable RPM package entries.
 * The entries need to be further processed to extract package information.
 * @param data A blob of RPM metadata, as stored inside BerkeleyDB.
 */
async function headerImport(data) {
    const indexLength = data.readInt32BE(0);
    const dataLength = data.readInt32BE(4);
    if (indexLength <= 0 || indexLength > 50000) {
        // Ensure we don't allocate something crazy...
        throw new types_2.ParserError('Invalid index length', { indexLength });
    }
    const entryInfos = new Array();
    // Skip the first 2 items (index and data lengths)
    const dataStart = 8 + indexLength * types_1.ENTRY_INFO_SIZE;
    const index = data.slice(8, indexLength * types_1.ENTRY_INFO_SIZE);
    for (let i = 0; i < indexLength; i++) {
        const entry = index.slice(i * types_1.ENTRY_INFO_SIZE, i * types_1.ENTRY_INFO_SIZE + types_1.ENTRY_INFO_SIZE);
        if (entry.length < types_1.ENTRY_INFO_SIZE) {
            continue;
        }
        const entryInfo = {
            tag: entry.readInt32BE(0),
            type: entry.readUInt32BE(4),
            offset: entry.readInt32BE(8),
            count: entry.readUInt32BE(12),
        };
        entryInfos.push(entryInfo);
        if (event_loop_spinner_1.eventLoopSpinner.isStarving()) {
            await event_loop_spinner_1.eventLoopSpinner.spin();
        }
    }
    return regionSwab(data, entryInfos, dataStart, dataLength);
}
exports.headerImport = headerImport;
async function regionSwab(data, entryInfos, dataStart, dataLength) {
    const indexEntries = new Array(entryInfos.length);
    for (let i = 0; i < entryInfos.length; i++) {
        const entryInfo = entryInfos[i];
        const entryLength = i < entryInfos.length - 1
            ? entryInfos[i + 1].offset - entryInfo.offset
            : dataLength - entryInfo.offset;
        const entryStart = dataStart + entryInfo.offset;
        const entryEnd = entryStart + entryLength;
        const indexEntry = {
            info: entryInfo,
            data: data.slice(entryStart, entryEnd),
            length: entryLength,
        };
        indexEntries[i] = indexEntry;
        if (event_loop_spinner_1.eventLoopSpinner.isStarving()) {
            await event_loop_spinner_1.eventLoopSpinner.spin();
        }
    }
    return indexEntries;
}
//# sourceMappingURL=header.js.map