import * as main from './main';
const  callMain = main.callMainFromJest;

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
