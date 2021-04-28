import * as main from './main';

test('First', () => {
    main.callMainFromJest();
});

test('Check stdout', () => {
    main.callMainFromJest({'command': 'stdout'});
    expect(main.stdout).toBe('ABC\nDE\n');
});
