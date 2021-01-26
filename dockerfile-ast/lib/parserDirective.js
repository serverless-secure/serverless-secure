"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const line_1 = require("./line");
class ParserDirective extends line_1.Line {
    constructor(document, range, nameRange, valueRange) {
        super(document, range);
        this.nameRange = nameRange;
        this.valueRange = valueRange;
    }
    toString() {
        return "# " + this.getName() + '=' + this.getValue();
    }
    getNameRange() {
        return this.nameRange;
    }
    getValueRange() {
        return this.valueRange;
    }
    getName() {
        return this.document.getText().substring(this.document.offsetAt(this.nameRange.start), this.document.offsetAt(this.nameRange.end));
    }
    getValue() {
        return this.document.getText().substring(this.document.offsetAt(this.valueRange.start), this.document.offsetAt(this.valueRange.end));
    }
    getDirective() {
        const directive = main_1.Directive[this.getName().toLowerCase()];
        return directive === undefined ? null : directive;
    }
}
exports.ParserDirective = ParserDirective;
