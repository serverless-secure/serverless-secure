"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FullReplacementTextManipulator = /** @class */ (function () {
    function FullReplacementTextManipulator(newText) {
        this.newText = newText;
    }
    FullReplacementTextManipulator.prototype.getNewText = function (inputText) {
        return this.newText;
    };
    FullReplacementTextManipulator.prototype.getTextForError = function (newText) {
        return newText;
    };
    return FullReplacementTextManipulator;
}());
exports.FullReplacementTextManipulator = FullReplacementTextManipulator;
