import * as commander from 'commander';

declare global {export const  gProgramOptions: ProgramOptions} (globalThis as any).
gProgramOptions = {};

export interface  ProgramOptions {
    size: boolean;
    client: string;
}

export function  parseProgramOptions() {
    commander.program
        .version('0.1.0')
        .exitOverride(exitFromCommander)
        .option("-s, --size <i>")
        .option("-c, --client <s>", "Client name. --client system")
        .parse(process.argv);

    (globalThis as any).gProgramOptions = commander.program.opts<ProgramOptions>();
}

function  exitFromCommander(e: commander.CommanderError) {
    if (e.code !== 'commander.version') {
        console.error(e.message);
    }
}
