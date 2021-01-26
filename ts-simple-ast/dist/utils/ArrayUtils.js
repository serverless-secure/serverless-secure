"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ArrayUtils = /** @class */ (function () {
    function ArrayUtils() {
    }
    ArrayUtils.isNullOrEmpty = function (a) {
        return !(a instanceof Array) || a.length === 0;
    };
    ArrayUtils.getUniqueItems = function (a) {
        return a.filter(function (item, index) { return a.indexOf(item) === index; });
    };
    ArrayUtils.removeFirst = function (a, item) {
        var index = a.indexOf(item);
        if (index === -1)
            return false;
        a.splice(index, 1);
        return true;
    };
    ArrayUtils.removeAll = function (a, isMatch) {
        var removedItems = [];
        for (var i = a.length - 1; i >= 0; i--) {
            if (isMatch(a[i])) {
                removedItems.push(a[i]);
                a.splice(i, 1);
            }
        }
        return removedItems;
    };
    ArrayUtils.flatten = function (items) {
        return items.reduce(function (a, b) { return a.concat(b); }, []);
    };
    ArrayUtils.find = function (items, condition) {
        var e_1, _a;
        try {
            for (var items_1 = tslib_1.__values(items), items_1_1 = items_1.next(); !items_1_1.done; items_1_1 = items_1.next()) {
                var item = items_1_1.value;
                if (condition(item))
                    return item;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (items_1_1 && !items_1_1.done && (_a = items_1.return)) _a.call(items_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return undefined;
    };
    ArrayUtils.findIndex = function (items, condition) {
        for (var i = 0; i < items.length; i++) {
            if (condition(items[i]))
                return i;
        }
        return -1;
    };
    ArrayUtils.from = function (items) {
        var e_2, _a;
        var a = [];
        try {
            for (var items_2 = tslib_1.__values(items), items_2_1 = items_2.next(); !items_2_1.done; items_2_1 = items_2.next()) {
                var item = items_2_1.value;
                a.push(item);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (items_2_1 && !items_2_1.done && (_a = items_2.return)) _a.call(items_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return a;
    };
    ArrayUtils.toIterator = function (items) {
        var e_3, _a, items_3, items_3_1, item, e_3_1;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, 6, 7]);
                    items_3 = tslib_1.__values(items), items_3_1 = items_3.next();
                    _b.label = 1;
                case 1:
                    if (!!items_3_1.done) return [3 /*break*/, 4];
                    item = items_3_1.value;
                    return [4 /*yield*/, item];
                case 2:
                    _b.sent();
                    _b.label = 3;
                case 3:
                    items_3_1 = items_3.next();
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_3_1 = _b.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 7];
                case 6:
                    try {
                        if (items_3_1 && !items_3_1.done && (_a = items_3.return)) _a.call(items_3);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    };
    ArrayUtils.sortByProperty = function (items, getProp) {
        items.sort(function (a, b) { return getProp(a) <= getProp(b) ? -1 : 1; });
        return items;
    };
    ArrayUtils.binaryInsert = function (items, newItem, isGreaterThan) {
        var top = items.length - 1;
        var bottom = 0;
        while (bottom <= top) {
            var mid = Math.floor((top + bottom) / 2);
            if (isGreaterThan(items[mid]))
                top = mid - 1;
            else
                bottom = mid + 1;
        }
        items.splice(top + 1, 0, newItem);
    };
    ArrayUtils.binarySearch = function (items, isEqual, isGreaterThan) {
        var top = items.length - 1;
        var bottom = 0;
        while (bottom <= top) {
            var mid = Math.floor((top + bottom) / 2);
            if (isEqual(items[mid]))
                return mid;
            if (isGreaterThan(items[mid]))
                top = mid - 1;
            else
                bottom = mid + 1;
        }
        return -1;
    };
    ArrayUtils.containsSubArray = function (items, subArray) {
        var e_4, _a;
        var findIndex = 0;
        try {
            for (var items_4 = tslib_1.__values(items), items_4_1 = items_4.next(); !items_4_1.done; items_4_1 = items_4.next()) {
                var item = items_4_1.value;
                if (subArray[findIndex] === item) {
                    findIndex++;
                    if (findIndex === subArray.length)
                        return true;
                }
                else
                    findIndex = 0;
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (items_4_1 && !items_4_1.done && (_a = items_4.return)) _a.call(items_4);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return false;
    };
    return ArrayUtils;
}());
exports.ArrayUtils = ArrayUtils;
