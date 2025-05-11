import { parseProgramOptions } from "@src/programOptions";

function  main() {
    parseProgramOptions();
    console.log(`gProgramOptions size: ${gProgramOptions.size}, client: ${gProgramOptions.client}`);
}

main();
