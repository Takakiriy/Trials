import * as path from "path";  // or path = require("path")
import * as readline from 'readline';
import * as lib from "./lib";
import { pp } from "./lib";

// main
export async function  main() {
    locale = Intl.NumberFormat().resolvedOptions().locale;
    if ('locale' in programOptions) {
        locale = programOptions.locale;
    }

    if ('command' in programOptions) {
        if (programOptions.command === 'stdout') {
            console.log('ABC');
            console.log('DE');
            console.log(programArguments);
        } else if (programOptions.command === 'show-locale') {
            console.log(locale);
        }
    } else if ('input' in programOptions) {
        const  key = await lib.input('input>')
        console.log(key);
    } else {
        console.log('main');
    }
}

function  add(a: number, b: number): number {
    return  a + b;
}


// getStdOut
// Example:
//    var d = getStdOut();  // Set break point here and watch the variable d
function  getStdOut(): string[] {
    return  stdout.split('\n');
}

// println
// #keyword: println, console.log, consoleLog
// Output any text to standard output.
export function  println(message: any, delayedExpanding: boolean = false) {
    if (typeof message === 'object' && !delayedExpanding) {
        message = JSON.stringify(message);
    }
    if (withJest && !delayedExpanding) {
        stdout += message.toString() + '\n';
        pp(message.toString());
    } else {
        consoleLog(message);
    }
}
const  consoleLog = console.log;
console.log = println;

// callMainFromJest
// #keyword: callMainFromJest
export async function  callMainFromJest(parameters?: string[], options?: {[name: string]: string}) {
    withJest = true;
    stdout = '';
    if (parameters) {
        programArguments = parameters;
    } else {
        programArguments = [];
    }
    if (options) {
        programOptions = options;
    } else {
        programOptions = {};
    }

    await main();
}

var    locale = '';
var    withJest = false;
export var  stdout = '';
export var  programArguments: string[] = [];
export var  programOptions: {[key: string]: any} = {};
