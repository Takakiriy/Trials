import * as child_process from 'child_process';

const  scriptPath = '../build/app.js';


type Whitespace = " " | "\n" | "\r" | "\t";
type TrimStart<T extends string> = T extends `${Whitespace}${infer R}` ? TrimStart<R> : T;
type TrimEnd<T extends string> = T extends `${infer R}${Whitespace}` ? TrimEnd<R> : T;
type Trim<T extends string> = TrimStart<TrimEnd<T>>;

type BoolLiteral = "true" | "false";
type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type InferJsonScalarType<T extends string> = Trim<T> extends `"${infer _}"` ? string
  : Trim<T> extends `${BoolLiteral}` ? boolean
  : Trim<T> extends `${Digit}${infer _}` ? number
  : Trim<T> extends `null` ? null
  : never;

type HeadingJsonScalar<T extends string> = Trim<T> extends `"${infer Str}",${infer _}` ? `"${Str}"`
  : Trim<T> extends `${infer Token},${infer _}` ? Token
  : T;
type TrailingJsonEntries<T extends string> = Trim<T> extends `"${infer _}",${infer Tail}` ? Tail
  : Trim<T> extends `${infer _},${infer Tail}` ? Tail
  : T;

  type DecodeJsonStr<T extends string> = T extends `"${infer R}"` ? R : never;

type InfoerJsonObjectEntries<T extends string> = Trim<T> extends `${infer K}:${infer Tail}`
  ? { [key in DecodeJsonStr<Trim<K>>]: InferJsonScalarType<HeadingJsonScalar<Tail>> } & InfoerJsonObjectEntries<TrailingJsonEntries<Tail>>
  : {};

type TypeFromJson<T extends string> = Trim<T> extends `{${infer InnerJsonObject}}`
  ? InfoerJsonObjectEntries<InnerJsonObject>
  : never;

const json = `
{
  "name": "foo",
  "answer": 42,
  "ok": true
}
`;

type ResultType =  TypeFromJson<typeof json>;

async function  main() {
	await callChildProccess(`node ${scriptPath}`);
}

// callChildProccess
async function  callChildProccess(commandLine: string,  option?: ProcessOption): Promise<ProcessReturns> {
	return   new Promise( async (resolveFunction, rejectFunction) => {
		const  returnValue = new ProcessReturns();
		try {
			const  childProcess = child_process.exec( commandLine,

				// on close the "childProcess" (2)
				(error: child_process.ExecException | null, stdout: string, stderr: string) => {
					returnValue.stdout = stdout;
					returnValue.stderr = stderr;
					resolveFunction(returnValue);
				}
			);
			if (option && childProcess.stdin) {

				if (option.inputLines) {
					await new Promise(resolve => setTimeout(resolve, 300));
					for (const inputLine of option.inputLines) {
						console.log(inputLine);
						childProcess.stdin.write(inputLine + "\n");
						await new Promise(resolve => setTimeout(resolve, 200));
					}
				}
				childProcess.stdin.end();
			}

			// on close the "childProcess" (1)
			childProcess.on('close', (exitCode: number) => {
				returnValue.exitCode = exitCode;
			});
			childProcess.on('exit', (exitCode: number) => {
				returnValue.exitCode = exitCode;
			});
		} catch (e) {
			throw Error(`Error in the command line ${commandLine}`);
		}
	});
}

// ProcessOption
class ProcessOption {
	inputLines?: string[];
}

// ProcessReturns
class ProcessReturns {
	exitCode: number = 0;
	stdout: string = '';
	stderr: string = '';
}

main();