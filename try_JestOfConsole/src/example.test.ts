import rewire from 'rewire';
const example = rewire('./example.ts');

// #focus: example.__get__

test('rewire function', () => {
    const  notExportedFunction = example.__get__('notExportedFunction');
    expect(notExportedFunction('hello')).toBe('> hello');
});

test('rewire class', () => {
    const  NotExportedClass = example.__get__('NotExportedClass');
    const  object = new NotExportedClass('hello');
    expect(object.get()).toBe('> hello');
});

test('rewire variable', () => {
    const  notExportedVariable = example.__get__('notExportedVariable');
    expect(notExportedVariable).toBe('hello');
});
