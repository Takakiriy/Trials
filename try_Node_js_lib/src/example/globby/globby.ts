import globby from 'globby';

async function  main() {
    const  currentFolderPath = process.cwd();
    try {
        process.chdir('src/example/globby/test');

        await doGlobby(['**/*']);
        await doGlobby(['**/foo*']);
        await doGlobby(['**/*', '!sub']);
    } finally {
        process.chdir(currentFolderPath);
    }
}

async function  doGlobby(parameters: string[]) {
    console.log();
    console.log(parameters);

    const  paths: string[] = await globby(parameters);
    console.log(paths);
}

main();
