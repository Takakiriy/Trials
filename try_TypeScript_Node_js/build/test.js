import * as child_process from 'child_process';
const scriptPath = '../build/app.js';
// main
async function main() {
    const output = await callChildProccess(`node ${scriptPath}`);
    console.log(`output = (${output.stdout})`);
}
// callChildProccess
async function callChildProccess(commandLine, option) {
    return new Promise(async (resolveFunction, rejectFunction) => {
        const returnValue = new ProcessReturns();
        try {
            const childProcess = child_process.exec(commandLine, 
            // on close the "childProcess" (2)
            (error, stdout, stderr) => {
                returnValue.stdout = stdout;
                returnValue.stderr = stderr;
                resolveFunction(returnValue);
            });
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
            childProcess.on('close', (exitCode) => {
                returnValue.exitCode = exitCode;
            });
            childProcess.on('exit', (exitCode) => {
                returnValue.exitCode = exitCode;
            });
        }
        catch (e) {
            throw Error(`Error in the command line ${commandLine}`);
        }
    });
}
// ProcessOption
class ProcessOption {
}
// ProcessReturns
class ProcessReturns {
    constructor() {
        this.exitCode = 0;
        this.stdout = '';
        this.stderr = '';
    }
}
main();
//# sourceMappingURL=test.js.map