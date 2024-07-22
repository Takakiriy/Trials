import * as fs from "fs";
import * as main from './main';
import * as path from "path";
import * as lib from "./lib";
const callMain = main.callMainFromJest;
if (path.basename(process.cwd()) !== 'src') {
    // Because the second execute of Jest watch mode is inherited the current folder.
    process.chdir('src');
}
// test
test('First', () => {
    callMain();
});
test('Check stdout', () => {
    callMain(['A', 'B'], { 'command': 'stdout' });
    expect(main.stdout).toBe('ABC\nDE\n["A","B"]\n');
});
test('locale', () => {
    const defaultLocale = Intl.NumberFormat().resolvedOptions().locale;
    callMain([], { 'command': 'show-locale' });
    expect(main.stdout).toBe(defaultLocale + '\n');
    callMain([], { 'command': 'show-locale', 'locale': 'fr-FR' });
    expect(main.stdout).toBe('fr-FR\n');
});
test('snapshot 1', () => {
    const inputText = lib.getSnapshot(`snapshot 1: 1 sourceFileContents 1`);
    const outputText = inputText.replace('input', 'output');
    expect(outputText).toMatchSnapshot('answer');
});
test("checks snapshots files are confirmed", () => {
    const activeSnapshots = fs.readFileSync('__snapshots__/main.test.ts.snap').toString();
    const backUpSnapshots = fs.readFileSync('__snapshots__/main.test.ts.snap.confirmed-ts').toString();
    // 拡張子の末尾を .snap にしない理由は、Jest が使っていない .snap ファイルを自動的に削除しようとするからです
    // ____.snap.confirmed-ts ファイルが存在する理由は、Jest の自動編集が予期しないデータを追加することがあるからです
    expect(activeSnapshots).toBe(backUpSnapshots);
});
//# sourceMappingURL=main.test.js.map