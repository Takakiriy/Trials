import * as commander from 'commander';
import * as main from './main';
import * as lib from './lib';

function  exitFromCommander(e: commander.CommanderError) {
    if (e.code !== 'commander.version') {
        console.log(e.message);
    }
}
async function  callMain() {
    commander.program.version('0.1.1').exitOverride(exitFromCommander)
        .exitOverride(exitFromCommander)
        .option("-l, --locale <s>")
        .option("-t, --test")
        .option("-c, --command <s>")
        .option("-i, --input")
        .parse(process.argv);

    for (const arg of commander.program.args) {
        main.programArguments.push(arg);
    }
    Object.assign(main.programOptions, commander.program.opts());

    await  main.main()
        .catch( (e)=>{
            if (main.programOptions.test) {
                throw e;
            } else {

                console.log( `ERROR: ${e.message}` );
                const  timeOver = new Date();
                timeOver.setSeconds( timeOver.getSeconds() + 1 );

                while ((new Date()).getTime() < timeOver.getTime()) {
                }
            }
        })
        .finally(()=>{
            lib.getInputObject().close();
        });
}
callMain();
