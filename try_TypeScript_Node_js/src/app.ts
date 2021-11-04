import * as fs from 'fs';

async function  main() {
	const  exists = fs.existsSync( "main.ts" )
	console.log(exists);
}
main();
