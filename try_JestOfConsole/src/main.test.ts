import * as main from './main';
import * as path from "path";
import * as lib from "./lib";
const  callMain = main.callMainFromJest;

if (path.basename(process.cwd()) !== 'src') {
    // Because the second execute of Jest watch mode is inherited the current folder.
    process.chdir('src');
}

// test
test('First', () => {
    callMain();
});

test('Check stdout', () => {
    callMain(['A', 'B'], {'command': 'stdout'});
    expect(main.stdout).toBe('ABC\nDE\n["A","B"]\n');
});

test('locale', () => {
    const  defaultLocale = Intl.NumberFormat().resolvedOptions().locale;

    callMain([], {'command': 'show-locale'});
    expect(main.stdout).toBe(defaultLocale + '\n');

    callMain([], {'command': 'show-locale', 'locale': 'fr-FR'});
    expect(main.stdout).toBe('fr-FR\n');
});
