import { parseProgramOptions } from "@src/9b.programOptions";

function  main() {
    parseProgramOptions();
    console.log(`gProgramOptions size: ${gProgramOptions.size}, client: ${gProgramOptions.client}`);
}

main();
