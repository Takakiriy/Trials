function  notExportedFunction(argument_: string): string {
    return  `> ${argument_}`;
}

class  NotExportedClass {
    argument: string;

    constructor(argument: string) {
        this.argument = argument;
    }

    get(): string {
        return  `> ${this.argument}`;
    }
}

const  notExportedVariable = 'hello';
