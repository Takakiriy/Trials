"use strict";
function notExportedFunction(argument_) {
    return `> ${argument_}`;
}
class NotExportedClass {
    constructor(argument) {
        this.argument = argument;
    }
    get() {
        return `> ${this.argument}`;
    }
}
const notExportedVariable = 'hello';
//# sourceMappingURL=example.js.map