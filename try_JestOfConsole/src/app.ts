import * as commander from 'commander';
import * as main from './main';

function  exitFromCommander(e: commander.CommanderError) {
	console.log(e.message);
}
async function  callMain() {
	commander.program.version('0.1.1').exitOverride(exitFromCommander)
		.option("-l, --locale <s>")
		.option("-t, --test")
		.option("-c, --command <s>")
		.option("-i, --input")
		.parse(process.argv);
	
	locale = Intl.NumberFormat().resolvedOptions().locale;
	if (programOptions.locale) {
		locale = programOptions.locale;
	}
	Object.assign(main.programOptions, commander.program.opts());

	await  main.main()
		.catch( (e)=>{
			if (programOptions.test) {
				throw e;
			} else {

				console.log( `ERROR: ${e.message}` );
				const  timeOver = new Date();
				timeOver.setSeconds( timeOver.getSeconds() + 5 );

				while ((new Date()).getTime() < timeOver.getTime()) {
				}
			}
		})
		.finally(()=>{
			main.InputObject.close();
		});
}

let    locale: string;
const  programOptions = commander.program.opts();
callMain();
