import * as path from "path";  // or path = require("path")
import * as readline from 'readline';

// main
export async function  main() {
	locale = Intl.NumberFormat().resolvedOptions().locale;
	if ('locale' in programOptions) {
		locale = programOptions.locale;
	}

	if ('command' in programOptions) {
        if (programOptions.command === 'stdout') {
            println('ABC');
            println('DE');
            println(programArguments);
        } else if (programOptions.command === 'show-locale') {
            println(locale);
        }
    } else if ('input' in programOptions) {
        const  key = await input('input>')
        println(key);
    } else {
        println('main');
    }
}

function  add(a: number, b: number): number {
    return  a + b;
}

// println
function  println(message: any) {
	if (typeof message === 'object') {
		message = JSON.stringify(message);
	}
	if (withJest) {
		stdout += message.toString() + '\n';
	} else {
		console.log(message);
	}
}

// StandardInputBuffer
class  StandardInputBuffer {
	readlines: readline.Interface;
	inputBuffer: string[] = [];
	inputResolver?: (answer:string)=>void = undefined;

	constructor() {
		this.readlines = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		});
		this.readlines.on('line', async (line: string) => {
			if (this.inputResolver) {
				this.inputResolver(line);
				this.inputResolver = undefined;
			} else {
				this.inputBuffer.push(line);
			}
		});

		this.readlines.setPrompt('');
		this.readlines.prompt();
	}

	async  input(guide: string): Promise<string> {
		return  new Promise(
			(resolve: (answer:string)=>void,  reject: (answer:string)=>void ) =>
		{
			const  nextLine = this.inputBuffer.shift();
			if (nextLine) {
				console.log(guide + nextLine);
				resolve(nextLine);
			} else {
				process.stdout.write(guide);
				this.inputResolver = resolve;
			}
		});
	}

	close() {
		this.readlines.close();
	}
}

// InputOption
class InputOption {
	inputLines: string[];
	nextLineIndex: number;
	nextParameterIndex: number;  // The index of the starting process parameters

	constructor(inputLines: string[]) {
		this.inputLines = inputLines;
		this.nextLineIndex = 0;
		this.nextParameterIndex = 2;
	}
}

const  testBaseFolder = String.raw `R:\home\mem_cache\MyDoc\src\TypeScript\typrm\test_data`+'\\';

// inputOption
const inputOption = new InputOption([
/*
	testBaseFolder +`change_set_.yaml`,
	String.raw `file`,
	testBaseFolder +`change_set_setting.yaml`,
	String.raw `Changed`,
*/
]);

// input
// Example: const name = await input('What is your name? ');
async function  input( guide: string ): Promise<string> {
	// Input emulation
	if (inputOption.inputLines) {
		if (inputOption.nextLineIndex < inputOption.inputLines.length) {
			const  value = inputOption.inputLines[inputOption.nextLineIndex];
			inputOption.nextLineIndex += 1;
			console.log(guide + value);

			return  value;
		}
	}

	// Read the starting process parameters
	while (inputOption.nextParameterIndex < process.argv.length) {
		const  value = process.argv[inputOption.nextParameterIndex];
		inputOption.nextParameterIndex += 1;
		if (value.substr(0,1) !== '-') {
			console.log(guide + value);

			return  value;
		}
		if (value !== '--test') {
			inputOption.nextParameterIndex += 1;
		}
	}

	// input
	return  InputObject.input(guide);
}
export const  InputObject = new StandardInputBuffer();

// inputPath
// Example: const name = await input('What is your name? ');
async function  inputPath( guide: string ) {
	const  key = await input(guide);
	return  pathResolve(key);
}

// pathResolve
function  pathResolve(path_: string) {

	// '/c/home' format to current OS format
	if (path_.length >= 3) {
		if (path_[0] === '/'  &&  path_[2] === '/') {
			path_ = path_[1] +':'+ path_.substr(2);
		}
	}

	// Change separators to OS format
	path_ = path.resolve(path_);

	return path_
}

// callMainFromJest
export function  callMainFromJest(parameters?: string[], options?: {[name: string]: string}) {
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

    main();
}

var    locale = '';
var    withJest = false;
export var  stdout = '';
export var  programArguments: string[] = [];
export var  programOptions: {[key: string]: any} = {};
