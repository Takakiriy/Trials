import * as fs from 'fs';

async function  main() {
	const  exists = fs.existsSync( "_CheckingFile.txt" )
	console.log(exists);
}
main();
