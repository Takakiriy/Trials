/// <reference types="node" />
import * as commander from 'commander';
import * as readline from 'readline';
export declare function main(): Promise<void>;
declare class StandardInputBuffer {
    readlines: readline.Interface;
    inputBuffer: string[];
    inputResolver?: (answer: string) => void;
    constructor();
    input(guide: string): Promise<string>;
    close(): void;
}
export declare const InputObject: StandardInputBuffer;
export declare function callMainFromJest(options?: {
    [name: string]: string;
}): void;
export declare var stdout: string;
export declare var programOptions: commander.OptionValues;
export {};
