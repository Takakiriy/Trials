var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import * as fs from "fs";
import * as path from "path";
import { globby } from 'globby';
import * as readline from 'readline';
try {
    var snapshots = require("./__snapshots__/main.test.ts.snap");
}
catch (e) {
}
const inputDefault = [
//    'test.json'
];
// copyFolderSync
// #keyword: copyFolderSync
// sourceFolder/1.txt => destinationFolderPath/1.txt
export function copyFolderSync(sourceFolderPath, destinationFolderPath) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const currentFolderPath = process.cwd();
        const destinationFolderFullPath = getFullPath(destinationFolderPath, currentFolderPath);
        process.chdir(sourceFolderPath);
        const paths = yield globby(['**/*']);
        try {
            for (var paths_1 = __asyncValues(paths), paths_1_1; paths_1_1 = yield paths_1.next(), !paths_1_1.done;) {
                const path_ = paths_1_1.value;
                const sourceFilePath = path_;
                const destinationFilePath = path.resolve(destinationFolderFullPath + '/' + path_);
                copyFileSync(sourceFilePath, destinationFilePath);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) yield _a.call(paths_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        process.chdir(currentFolderPath);
    });
}
// copyFileSync
// #keyword: copyFileSync
// This also makes the copy target folder.
export function copyFileSync(sourceFilePath, destinationFilePath) {
    const destinationFolderPath = path.dirname(destinationFilePath);
    fs.mkdirSync(destinationFolderPath, { recursive: true });
    fs.copyFileSync(sourceFilePath, destinationFilePath);
}
// getFullPath
// #keyword: JavaScript (js) library getFullPath
// If "basePath" is current directory, you can call "path.resolve"
// If the variable has full path and litteral relative path, write `${___FullPath}/relative_path}`
export function getFullPath(relativePath, basePath) {
    var fullPath = '';
    const slashRelativePath = relativePath.replace(/\\/g, '/');
    const colonSlashIndex = slashRelativePath.indexOf(':/');
    const slashFirstIndex = slashRelativePath.indexOf('/');
    const withProtocol = (colonSlashIndex + 1 === slashFirstIndex); // e.g.) C:/, http://
    if (relativePath.substr(0, 1) === '/') {
        fullPath = relativePath;
    }
    else if (relativePath.substr(0, 1) === '~') {
        fullPath = relativePath.replace('~', getHomePath());
    }
    else if (withProtocol) {
        fullPath = relativePath;
    }
    else {
        fullPath = path.join(basePath, relativePath);
    }
    return fullPath;
}
// getHomePath
// #keyword: getHomePath
export function getHomePath() {
    if (process.env.HOME) {
        return process.env.HOME;
    }
    else if (process.env.USERPROFILE) {
        return process.env.USERPROFILE;
    }
    else {
        throw new Error('unexpected');
    }
}
// StandardInputBuffer
class StandardInputBuffer {
    constructor() {
        this.inputBuffer = [];
        this.inputResolver = undefined;
    }
    delayedConstructor() {
        this.readlines = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.readlines.on('line', (line) => __awaiter(this, void 0, void 0, function* () {
            if (this.inputResolver) {
                this.inputResolver(line); // inputResolver() is resolve() in input()
                this.inputResolver = undefined;
            }
            else {
                this.inputBuffer.push(line);
            }
        }));
        this.readlines.setPrompt('');
        this.readlines.prompt();
    }
    input(guide) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.readlines) {
                this.delayedConstructor();
            }
            return new Promise((resolve, reject) => {
                const nextLine = this.inputBuffer.shift();
                if (nextLine) {
                    console.log(guide + nextLine);
                    resolve(nextLine);
                }
                else {
                    process.stdout.write(guide);
                    this.inputResolver = resolve;
                }
            });
        });
    }
    close() {
        if (this.readlines) {
            this.readlines.close();
        }
    }
}
// InputOption
class InputOption {
    constructor(inputLines) {
        this.inputLines = inputLines;
        this.nextLineIndex = 0;
        this.nextParameterIndex = 2;
    }
}
// inputOption
const inputOption = new InputOption(inputDefault);
// input
// Example: const name = await input('What is your name? ');
export function input(guide) {
    return __awaiter(this, void 0, void 0, function* () {
        // Input emulation
        if (inputOption.inputLines) {
            if (inputOption.nextLineIndex < inputOption.inputLines.length) {
                const value = inputOption.inputLines[inputOption.nextLineIndex];
                inputOption.nextLineIndex += 1;
                console.log(guide + value);
                return value;
            }
        }
        // Read the starting process parameters
        while (inputOption.nextParameterIndex < process.argv.length) {
            const value = process.argv[inputOption.nextParameterIndex];
            inputOption.nextParameterIndex += 1;
            if (value.substr(0, 1) !== '-') {
                console.log(guide + value);
                return value;
            }
            if (value !== '--test') {
                inputOption.nextParameterIndex += 1;
            }
        }
        // input
        return InputObject.input(guide);
    });
}
const InputObject = new StandardInputBuffer();
export function getInputObject() {
    return InputObject;
}
// inputPath
// Example: const name = await input('What is your name? ');
export function inputPath(guide) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = yield input(guide);
        if (key.endsWith('()')) {
            return key;
        }
        else {
            return pathResolve(key);
        }
    });
}
// inputSkip
export function inputSkip(count) {
    inputOption.nextParameterIndex += count;
}
// pathResolve
export function pathResolve(path_) {
    // '/c/home' format to current OS format
    if (path_.length >= 3) {
        if (path_[0] === '/' && path_[2] === '/') {
            path_ = path_[1] + ':' + path_.substr(2);
        }
    }
    // Replace separators to OS format
    path_ = path.resolve(path_);
    return path_;
}
// checkNotInGitWorking
export function checkNotInGitWorking() {
    var path_ = process.cwd();
    if (!path_.includes('extract_git_branches')) {
        throw new Error('This is not in project folder.');
    }
    while (path_.includes('extract_git_branches')) {
        path_ = path.dirname(path_);
    }
    while (path_ !== '/') {
        if (fs.existsSync(`${path_}/.git`)) {
            throw new Error('This test is not supported with git submodule.');
        }
        path_ = path.dirname(path_);
    }
}
// getTestWorkFolderFullPath
export function getTestWorkFolderFullPath() {
    var path_ = process.cwd();
    if (!path_.includes('extract_git_branches')) {
        throw new Error('This is not in project folder.');
    }
    while (path_.includes('extract_git_branches')) {
        path_ = path.dirname(path_);
    }
    return `${path_}/_test_of_extract_git_branches`;
}
// getSnapshot
export function getSnapshot(label) {
    if (!(label in snapshots)) {
        throw new Error(`not found snapshot label "${label}" in "__Project__/src/__snapshots__/main.test.ts.snap" file.`);
    }
    const snapshot = snapshots[label];
    return snapshot.substr(2, snapshot.length - 4).replace('\\"', '"');
}
// pp
// Debug print.
// #keyword: pp
// Example:
//    pp(var);
// Example:
//    var d = pp(var);
//    d = d;  // Set break point here and watch the variable d
// Example:
//    try {
//
//        await main();
//    } finally {
//        var d = pp('');
//        d = [];  // Set break point here and watch the variable d
//    }
export function pp(message) {
    if (typeof message === 'object') {
        message = JSON.stringify(message);
    }
    debugOut.push(message.toString());
    return debugOut;
}
export const debugOut = [];
// cc
// Through counter.
// #keyword: cc
// Example:
//   cc();
// Example:
//   var c = cc().debugOut;  // Set break point here and watch the variable c
// Example:
//   if ( cc(2).isTarget )
//   var d = pp('');  // Set break point here and watch the variable d
export function cc(targetCount = 9999999, label = '0') {
    if (!(label in gCount)) {
        gCount[label] = 0;
    }
    gCount[label] += 1;
    pp(`${label}:countThrough[${label}] = ${gCount[label]}`);
    const isTarget = (gCount[label] === targetCount);
    if (isTarget) {
        pp('    **** It is before the target! ****');
    }
    return { isTarget, debugOut };
}
const gCount = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFDekIsT0FBTyxLQUFLLElBQUksTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNoQyxPQUFPLEtBQUssUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUNyQyxJQUFJO0lBQ0EsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Q0FDaEU7QUFBQyxPQUFPLENBQUMsRUFBRTtDQUNYO0FBRUQsTUFBTSxZQUFZLEdBQWE7QUFDL0IsaUJBQWlCO0NBQ2hCLENBQUM7QUFHRixpQkFBaUI7QUFDakIsMkJBQTJCO0FBQzNCLG9EQUFvRDtBQUNwRCxNQUFNLFVBQWlCLGNBQWMsQ0FBQyxnQkFBd0IsRUFBRSxxQkFBNkI7OztRQUN6RixNQUFPLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN6QyxNQUFPLHlCQUF5QixHQUFHLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3pGLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVoQyxNQUFPLEtBQUssR0FBYSxNQUFNLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O1lBQ2hELEtBQTBCLElBQUEsVUFBQSxjQUFBLEtBQUssQ0FBQSxXQUFBO2dCQUFwQixNQUFNLEtBQUssa0JBQUEsQ0FBQTtnQkFDbEIsTUFBTyxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixNQUFPLG1CQUFtQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLEdBQUUsR0FBRyxHQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUVqRixZQUFZLENBQUMsY0FBYyxF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QUUsQ0FBRSxHQUFHLEtBQUssaUJBQWlCLEtBQUssT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBRSxDQUFDO0lBQzNELE1BQU0sUUFBUSxHQUFHLENBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVcsQ0FBRSxDQUFDO0lBRW5ELElBQUksUUFBUSxFQUFFO1FBQ1YsRUFBRSxDQUFFLHdDQUF3QyxDQUFFLENBQUM7S0FDbEQ7SUFDRCxPQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDO0FBQ25DLENBQUM7QUFDRCxNQUFPLE1BQU0sR0FBNkIsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZ2xvYmJ5IH0gZnJvbSAnZ2xvYmJ5JztcclxuaW1wb3J0ICogYXMgcmVhZGxpbmUgZnJvbSAncmVhZGxpbmUnO1xyXG50cnkge1xyXG4gICAgdmFyIHNuYXBzaG90cyA9IHJlcXVpcmUoXCIuL19fc25hcHNob3RzX18vbWFpbi50ZXN0LnRzLnNuYXBcIik7XHJcbn0gY2F0Y2ggKGUpIHtcclxufVxyXG5cclxuY29uc3QgaW5wdXREZWZhdWx0OiBzdHJpbmdbXSA9IFtcclxuLy8gICAgJ3Rlc3QuanNvbidcclxuXTtcclxuXHJcblxyXG4vLyBjb3B5Rm9sZGVyU3luY1xyXG4vLyAja2V5d29yZDogY29weUZvbGRlclN5bmNcclxuLy8gc291cmNlRm9sZGVyLzEudHh0ID0+IGRlc3RpbmF0aW9uRm9sZGVyUGF0aC8xLnR4dFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gIGNvcHlGb2xkZXJTeW5jKHNvdXJjZUZvbGRlclBhdGg6IHN0cmluZywgZGVzdGluYXRpb25Gb2xkZXJQYXRoOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0ICBjdXJyZW50Rm9sZGVyUGF0aCA9IHByb2Nlc3MuY3dkKCk7XHJcbiAgICBjb25zdCAgZGVzdGluYXRpb25Gb2xkZXJGdWxsUGF0aCA9IGdldEZ1bGxQYXRoKGRlc3RpbmF0aW9uRm9sZGVyUGF0aCwgY3VycmVudEZvbGRlclBhdGgpO1xyXG4gICAgcHJvY2Vzcy5jaGRpcihzb3VyY2VGb2xkZXJQYXRoKTtcclxuXHJcbiAgICBjb25zdCAgcGF0aHM6IHN0cmluZ1tdID0gYXdhaXQgZ2xvYmJ5KFsnKiovKiddKTtcclxuICAgIGZvciBhd2FpdCAoY29uc3QgcGF0aF8gb2YgcGF0aHMpIHtcclxuICAgICAgICBjb25zdCAgc291cmNlRmlsZVBhdGggPSBwYXRoXztcclxuICAgICAgICBjb25zdCAgZGVzdGluYXRpb25GaWxlUGF0aCA9IHBhdGgucmVzb2x2ZShkZXN0aW5hdGlvbkZvbGRlckZ1bGxQYXRoICsnLycrIHBhdGhfKTtcclxuXHJcbiAgICAgICAgY29weUZpbGVTeW5jKHNvdXJjZUZpbGVQYXRoLCAgZGVzdGluYXRpb25GaWxlUGF0aCk7XHJcbiAgICB9XHJcbiAgICBwcm9jZXNzLmNoZGlyKGN1cnJlbnRGb2xkZXJQYXRoKTtcclxufVxyXG5cclxuLy8gY29weUZpbGVTeW5jXHJcbi8vICNrZXl3b3JkOiBjb3B5RmlsZVN5bmNcclxuLy8gVGhpcyBhbHNvIG1ha2VzIHRoZSBjb3B5IHRhcmdldCBmb2xkZXIuXHJcbmV4cG9ydCBmdW5jdGlvbiAgY29weUZpbGVTeW5jKHNvdXJjZUZpbGVQYXRoOiBzdHJpbmcsIGRlc3RpbmF0aW9uRmlsZVBhdGg6IHN0cmluZykge1xyXG5cdGNvbnN0ICBkZXN0aW5hdGlvbkZvbGRlclBhdGggPSBwYXRoLmRpcm5hbWUoZGVzdGluYXRpb25GaWxlUGF0aCk7XHJcblx0ZnMubWtkaXJTeW5jKGRlc3RpbmF0aW9uRm9sZGVyUGF0aCwge3JlY3Vyc2l2ZTogdHJ1ZX0pO1xyXG5cclxuXHRmcy5jb3B5RmlsZVN5bmMoc291cmNlRmlsZVBhdGgsIGRlc3RpbmF0aW9uRmlsZVBhdGgpO1xyXG59XHJcblxyXG4vLyBnZXRGdWxsUGF0aFxyXG4vLyAja2V5d29yZDogSmF2YVNjcmlwdCAoanMpIGxpYnJhcnkgZ2V0RnVsbFBhdGhcclxuLy8gSWYgXCJiYXNlUGF0aFwiIGlzIGN1cnJlbnQgZGlyZWN0b3J5LCB5b3UgY2FuIGNhbGwgXCJwYXRoLnJlc29sdmVcIlxyXG4vLyBJZiB0aGUgdmFyaWFibGUgaGFzIGZ1bGwgcGF0aCBhbmQgbGl0dGVyYWwgcmVsYXRpdmUgcGF0aCwgd3JpdGUgYCR7X19fRnVsbFBhdGh9L3JlbGF0aXZlX3BhdGh9YFxyXG5leHBvcnQgZnVuY3Rpb24gIGdldEZ1bGxQYXRoKHJlbGF0aXZlUGF0aDogc3RyaW5nLCBiYXNlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHZhciAgICBmdWxsUGF0aCA9ICcnO1xyXG4gICAgY29uc3QgIHNsYXNoUmVsYXRpdmVQYXRoID0gcmVsYXRpdmVQYXRoLnJlcGxhY2UoL1xcXFwvZywnLycpO1xyXG4gICAgY29uc3QgIGNvbG9uU2xhc2hJbmRleCA9IHNsYXNoUmVsYXRpdmVQYXRoLmluZGV4T2YoJzovJyk7XHJcbiAgICBjb25zdCAgc2xhc2hGaXJzdEluZGV4ID0gc2xhc2hSZWxhdGl2ZVBhdGguaW5kZXhPZignLycpO1xyXG4gICAgY29uc3QgIHdpdGhQcm90b2NvbCA9IChjb2xvblNsYXNoSW5kZXggKyAxID09PSBzbGFzaEZpcnN0SW5kZXgpOyAgLy8gZS5nLikgQzovLCBodHRwOi8vXHJcblxyXG4gICAgaWYgKHJlbGF0aXZlUGF0aC5zdWJzdHIoMCwxKSA9PT0gJy8nKSB7XHJcbiAgICAgICAgZnVsbFBhdGggPSByZWxhdGl2ZVBhdGg7XHJcbiAgICB9IGVsc2UgaWYgKHJlbGF0aXZlUGF0aC5zdWJzdHIoMCwxKSA9PT0gJ34nKSB7XHJcbiAgICAgICAgZnVsbFBhdGggPSByZWxhdGl2ZVBhdGgucmVwbGFjZSgnficsIGdldEhvbWVQYXRoKCkgKTtcclxuICAgIH0gZWxzZSBpZiAod2l0aFByb3RvY29sKSB7XHJcbiAgICAgICAgZnVsbFBhdGggPSByZWxhdGl2ZVBhdGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZ1bGxQYXRoID0gcGF0aC5qb2luKGJhc2VQYXRoLCByZWxhdGl2ZVBhdGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICBmdWxsUGF0aDtcclxufVxyXG5cclxuLy8gZ2V0SG9tZVBhdGhcclxuLy8gI2tleXdvcmQ6IGdldEhvbWVQYXRoXHJcbmV4cG9ydCBmdW5jdGlvbiAgZ2V0SG9tZVBhdGgoKTogc3RyaW5nIHtcclxuICAgIGlmIChwcm9jZXNzLmVudi5IT01FKSB7XHJcbiAgICAgICAgcmV0dXJuICBwcm9jZXNzLmVudi5IT01FO1xyXG4gICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5VU0VSUFJPRklMRSkge1xyXG4gICAgICAgIHJldHVybiAgcHJvY2Vzcy5lbnYuVVNFUlBST0ZJTEU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBTdGFuZGFyZElucHV0QnVmZmVyXHJcbmNsYXNzICBTdGFuZGFyZElucHV0QnVmZmVyIHtcclxuICAgIHJlYWRsaW5lczogcmVhZGxpbmUuSW50ZXJmYWNlIHwgdW5kZWZpbmVkO1xyXG4gICAgaW5wdXRCdWZmZXI6IHN0cmluZ1tdID0gW107XHJcbiAgICBpbnB1dFJlc29sdmVyPzogKGFuc3dlcjpzdHJpbmcpPT52b2lkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIGRlbGF5ZWRDb25zdHJ1Y3RvcigpIHsgIC8vIEl0IGlzIG5vdCBjb25zdHJ1Y3RvciwgYmVjYXVzZSBcImNyZWF0ZUludGVyZmFjZVwiIHN0b3BzIHRoZSBwcm9ncmFtLCBpZiBzdGRpbiB3YXMgbm90IHVzZWQuXHJcbiAgICAgICAgdGhpcy5yZWFkbGluZXMgPSByZWFkbGluZS5jcmVhdGVJbnRlcmZhY2Uoe1xyXG4gICAgICAgICAgICBpbnB1dDogcHJvY2Vzcy5zdGRpbixcclxuICAgICAgICAgICAgb3V0cHV0OiBwcm9jZXNzLnN0ZG91dFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVhZGxpbmVzLm9uKCdsaW5lJywgYXN5bmMgKGxpbmU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFJlc29sdmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0UmVzb2x2ZXIobGluZSk7ICAvLyBpbnB1dFJlc29sdmVyKCkgaXMgcmVzb2x2ZSgpIGluIGlucHV0KClcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRSZXNvbHZlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRCdWZmZXIucHVzaChsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJlYWRsaW5lcy5zZXRQcm9tcHQoJycpO1xyXG4gICAgICAgIHRoaXMucmVhZGxpbmVzLnByb21wdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jICBpbnB1dChndWlkZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBpZiAoIXRoaXMucmVhZGxpbmVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsYXllZENvbnN0cnVjdG9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gIG5ldyBQcm9taXNlKFxyXG4gICAgICAgICAgICAocmVzb2x2ZTogKGFuc3dlcjpzdHJpbmcpPT52b2lkLCAgcmVqZWN0OiAoYW5zd2VyOnN0cmluZyk9PnZvaWQgKSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgIG5leHRMaW5lID0gdGhpcy5pbnB1dEJ1ZmZlci5zaGlmdCgpO1xyXG4gICAgICAgICAgICBpZiAobmV4dExpbmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGd1aWRlICsgbmV4dExpbmUpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShuZXh0TGluZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShndWlkZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0UmVzb2x2ZXIgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZGxpbmVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVhZGxpbmVzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBJbnB1dE9wdGlvblxyXG5jbGFzcyBJbnB1dE9wdGlvbiB7XHJcbiAgICBpbnB1dExpbmVzOiBzdHJpbmdbXTtcclxuICAgIG5leHRMaW5lSW5kZXg6IG51bWJlcjtcclxuICAgIG5leHRQYXJhbWV0ZXJJbmRleDogbnVtYmVyOyAgLy8gVGhlIGluZGV4IG9mIHRoZSBzdGFydGluZyBwcm9jZXNzIHBhcmFtZXRlcnNcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dExpbmVzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRMaW5lcyA9IGlucHV0TGluZXM7XHJcbiAgICAgICAgdGhpcy5uZXh0TGluZUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLm5leHRQYXJhbWV0ZXJJbmRleCA9IDI7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGlucHV0T3B0aW9uXHJcbmNvbnN0IGlucHV0T3B0aW9uID0gbmV3IElucHV0T3B0aW9uKGlucHV0RGVmYXVsdCk7XHJcblxyXG4vLyBpbnB1dFxyXG4vLyBFeGFtcGxlOiBjb25zdCBuYW1lID0gYXdhaXQgaW5wdXQoJ1doYXQgaXMgeW91ciBuYW1lPyAnKTtcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uICBpbnB1dCggZ3VpZGU6IHN0cmluZyApOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgLy8gSW5wdXQgZW11bGF0aW9uXHJcbiAgICBpZiAoaW5wdXRPcHRpb24uaW5wdXRMaW5lcykge1xyXG4gICAgICAgIGlmIChpbnB1dE9wdGlvbi5uZXh0TGluZUluZGV4IDwgaW5wdXRPcHRpb24uaW5wdXRMaW5lcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgIHZhbHVlID0gaW5wdXRPcHRpb24uaW5wdXRMaW5lc1tpbnB1dE9wdGlvbi5uZXh0TGluZUluZGV4XTtcclxuICAgICAgICAgICAgaW5wdXRPcHRpb24ubmV4dExpbmVJbmRleCArPSAxO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhndWlkZSArIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAgdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlYWQgdGhlIHN0YXJ0aW5nIHByb2Nlc3MgcGFyYW1ldGVyc1xyXG4gICAgd2hpbGUgKGlucHV0T3B0aW9uLm5leHRQYXJhbWV0ZXJJbmRleCA8IHByb2Nlc3MuYXJndi5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCAgdmFsdWUgPSBwcm9jZXNzLmFyZ3ZbaW5wdXRPcHRpb24ubmV4dFBhcmFtZXRlckluZGV4XTtcclxuICAgICAgICBpbnB1dE9wdGlvbi5uZXh0UGFyYW1ldGVySW5kZXggKz0gMTtcclxuICAgICAgICBpZiAodmFsdWUuc3Vic3RyKDAsMSkgIT09ICctJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhndWlkZSArIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAgdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJy0tdGVzdCcpIHtcclxuICAgICAgICAgICAgaW5wdXRPcHRpb24ubmV4dFBhcmFtZXRlckluZGV4ICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlucHV0XHJcbiAgICByZXR1cm4gIElucHV0T2JqZWN0LmlucHV0KGd1aWRlKTtcclxufVxyXG5jb25zdCAgSW5wdXRPYmplY3QgPSBuZXcgU3RhbmRhcmRJbnB1dEJ1ZmZlcigpO1xyXG5leHBvcnQgZnVuY3Rpb24gIGdldElucHV0T2JqZWN0KCk6IFN0YW5kYXJkSW5wdXRCdWZmZXIge1xyXG4gICAgcmV0dXJuICBJbnB1dE9iamVjdDtcclxufVxyXG5cclxuLy8gaW5wdXRQYXRoXHJcbi8vIEV4YW1wbGU6IGNvbnN0IG5hbWUgPSBhd2FpdCBpbnB1dCgnV2hhdCBpcyB5b3VyIG5hbWU/ICcpO1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gIGlucHV0UGF0aCggZ3VpZGU6IHN0cmluZyApIHtcclxuICAgIGNvbnN0ICBrZXkgPSBhd2FpdCBpbnB1dChndWlkZSk7XHJcbiAgICBpZiAoa2V5LmVuZHNXaXRoKCcoKScpKSB7XHJcbiAgICAgICAgcmV0dXJuICBrZXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAgcGF0aFJlc29sdmUoa2V5KTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gaW5wdXRTa2lwXHJcbmV4cG9ydCBmdW5jdGlvbiAgaW5wdXRTa2lwKGNvdW50OiBudW1iZXIpIHtcclxuICAgIGlucHV0T3B0aW9uLm5leHRQYXJhbWV0ZXJJbmRleCArPSBjb3VudDtcclxufVxyXG5cclxuLy8gcGF0aFJlc29sdmVcclxuZXhwb3J0IGZ1bmN0aW9uICBwYXRoUmVzb2x2ZShwYXRoXzogc3RyaW5nKSB7XHJcblxyXG4gICAgLy8gJy9jL2hvbWUnIGZvcm1hdCB0byBjdXJyZW50IE9TIGZvcm1hdFxyXG4gICAgaWYgKHBhdGhfLmxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgaWYgKHBhdGhfWzBdID09PSAnLycgICYmICBwYXRoX1syXSA9PT0gJy8nKSB7XHJcbiAgICAgICAgICAgIHBhdGhfID0gcGF0aF9bMV0gKyc6JysgcGF0aF8uc3Vic3RyKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXBsYWNlIHNlcGFyYXRvcnMgdG8gT1MgZm9ybWF0XHJcbiAgICBwYXRoXyA9IHBhdGgucmVzb2x2ZShwYXRoXyk7XHJcblxyXG4gICAgcmV0dXJuIHBhdGhfXHJcbn1cclxuXHJcbi8vIGNoZWNrTm90SW5HaXRXb3JraW5nXHJcbmV4cG9ydCBmdW5jdGlvbiAgY2hlY2tOb3RJbkdpdFdvcmtpbmcoKSB7XHJcbiAgICB2YXIgIHBhdGhfID0gcHJvY2Vzcy5jd2QoKTtcclxuXHJcbiAgICBpZiAoICEgcGF0aF8uaW5jbHVkZXMoJ2V4dHJhY3RfZ2l0X2JyYW5jaGVzJykpIHtcclxuICAgICAgICB0aHJvdyAgbmV3IEVycm9yKCdUaGlzIGlzIG5vdCBpbiBwcm9qZWN0IGZvbGRlci4nKVxyXG4gICAgfVxyXG4gICAgd2hpbGUgKHBhdGhfLmluY2x1ZGVzKCdleHRyYWN0X2dpdF9icmFuY2hlcycpKSB7XHJcbiAgICAgICAgcGF0aF8gPSBwYXRoLmRpcm5hbWUocGF0aF8pO1xyXG4gICAgfVxyXG4gICAgd2hpbGUgKHBhdGhfICE9PSAnLycpIHtcclxuXHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoYCR7cGF0aF99Ly5naXRgKSkge1xyXG4gICAgICAgICAgICB0aHJvdyAgbmV3IEVycm9yKCdUaGlzIHRlc3QgaXMgbm90IHN1cHBvcnRlZCB3aXRoIGdpdCBzdWJtb2R1bGUuJylcclxuICAgICAgICB9XHJcbiAgICAgICAgcGF0aF8gPSBwYXRoLmRpcm5hbWUocGF0aF8pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBnZXRUZXN0V29ya0ZvbGRlckZ1bGxQYXRoXHJcbmV4cG9ydCBmdW5jdGlvbiAgZ2V0VGVzdFdvcmtGb2xkZXJGdWxsUGF0aCgpOiBzdHJpbmcge1xyXG4gICAgdmFyICBwYXRoXyA9IHByb2Nlc3MuY3dkKCk7XHJcblxyXG4gICAgaWYgKCAhIHBhdGhfLmluY2x1ZGVzKCdleHRyYWN0X2dpdF9icmFuY2hlcycpKSB7XHJcbiAgICAgICAgdGhyb3cgIG5ldyBFcnJvcignVGhpcyBpcyBub3QgaW4gcHJvamVjdCBmb2xkZXIuJylcclxuICAgIH1cclxuICAgIHdoaWxlIChwYXRoXy5pbmNsdWRlcygnZXh0cmFjdF9naXRfYnJhbmNoZXMnKSkge1xyXG4gICAgICAgIHBhdGhfID0gcGF0aC5kaXJuYW1lKHBhdGhfKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIGAke3BhdGhffS9fdGVzdF9vZl9leHRyYWN0X2dpdF9icmFuY2hlc2A7XHJcbn1cclxuXHJcbi8vIGdldFNuYXBzaG90XHJcbmV4cG9ydCBmdW5jdGlvbiAgZ2V0U25hcHNob3QobGFiZWw6IHN0cmluZykge1xyXG4gICAgaWYgKCAhIChsYWJlbCBpbiBzbmFwc2hvdHMpKSB7XHJcbiAgICAgICAgdGhyb3cgIG5ldyBFcnJvcihgbm90IGZvdW5kIHNuYXBzaG90IGxhYmVsIFwiJHtsYWJlbH1cIiBpbiBcIl9fUHJvamVjdF9fL3NyYy9fX3NuYXBzaG90c19fL21haW4udGVzdC50cy5zbmFwXCIgZmlsZS5gKVxyXG4gICAgfVxyXG4gICAgY29uc3QgIHNuYXBzaG90ID0gc25hcHNob3RzW2xhYmVsXTtcclxuICAgIHJldHVybiAgc25hcHNob3Quc3Vic3RyKDIsIHNuYXBzaG90Lmxlbmd0aCAtIDQpLnJlcGxhY2UoJ1xcXFxcIicsICdcIicpO1xyXG59XHJcblxyXG4vLyBwcFxyXG4vLyBEZWJ1ZyBwcmludC5cclxuLy8gI2tleXdvcmQ6IHBwXHJcbi8vIEV4YW1wbGU6XHJcbi8vICAgIHBwKHZhcik7XHJcbi8vIEV4YW1wbGU6XHJcbi8vICAgIHZhciBkID0gcHAodmFyKTtcclxuLy8gICAgZCA9IGQ7ICAvLyBTZXQgYnJlYWsgcG9pbnQgaGVyZSBhbmQgd2F0Y2ggdGhlIHZhcmlhYmxlIGRcclxuLy8gRXhhbXBsZTpcclxuLy8gICAgdHJ5IHtcclxuLy9cclxuLy8gICAgICAgIGF3YWl0IG1haW4oKTtcclxuLy8gICAgfSBmaW5hbGx5IHtcclxuLy8gICAgICAgIHZhciBkID0gcHAoJycpO1xyXG4vLyAgICAgICAgZCA9IFtdOyAgLy8gU2V0IGJyZWFrIHBvaW50IGhlcmUgYW5kIHdhdGNoIHRoZSB2YXJpYWJsZSBkXHJcbi8vICAgIH1cclxuZXhwb3J0IGZ1bmN0aW9uICBwcChtZXNzYWdlOiBhbnkpIHtcclxuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBkZWJ1Z091dC5wdXNoKG1lc3NhZ2UudG9TdHJpbmcoKSk7XHJcbiAgICByZXR1cm4gZGVidWdPdXQ7XHJcbn1cclxuZXhwb3J0IGNvbnN0ICBkZWJ1Z091dDogc3RyaW5nW10gPSBbXTtcclxuXHJcbi8vIGNjXHJcbi8vIFRocm91Z2ggY291bnRlci5cclxuLy8gI2tleXdvcmQ6IGNjXHJcbi8vIEV4YW1wbGU6XHJcbi8vICAgY2MoKTtcclxuLy8gRXhhbXBsZTpcclxuLy8gICB2YXIgYyA9IGNjKCkuZGVidWdPdXQ7ICAvLyBTZXQgYnJlYWsgcG9pbnQgaGVyZSBhbmQgd2F0Y2ggdGhlIHZhcmlhYmxlIGNcclxuLy8gRXhhbXBsZTpcclxuLy8gICBpZiAoIGNjKDIpLmlzVGFyZ2V0IClcclxuLy8gICB2YXIgZCA9IHBwKCcnKTsgIC8vIFNldCBicmVhayBwb2ludCBoZXJlIGFuZCB3YXRjaCB0aGUgdmFyaWFibGUgZFxyXG5leHBvcnQgZnVuY3Rpb24gIGNjKCB0YXJnZXRDb3VudDogbnVtYmVyID0gOTk5OTk5OSwgbGFiZWw6IHN0cmluZyA9ICcwJyApIHtcclxuICAgIGlmICghKGxhYmVsIGluIGdDb3VudCkpIHtcclxuICAgICAgICBnQ291bnRbbGFiZWxdID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnQ291bnRbbGFiZWxdICs9IDE7XHJcbiAgICBwcCggYCR7bGFiZWx9OmNvdW50VGhyb3VnaFske2xhYmVsfV0gPSAke2dDb3VudFtsYWJlbF19YCApO1xyXG4gICAgY29uc3QgaXNUYXJnZXQgPSAoIGdDb3VudFtsYWJlbF0gPT09IHRhcmdldENvdW50ICk7XHJcblxyXG4gICAgaWYgKGlzVGFyZ2V0KSB7XHJcbiAgICAgICAgcHAoICcgICAgKioqKiBJdCBpcyBiZWZvcmUgdGhlIHRhcmdldCEgKioqKicgKTtcclxuICAgIH1cclxuICAgIHJldHVybiAgeyBpc1RhcmdldCwgZGVidWdPdXQgfTtcclxufVxyXG5jb25zdCAgZ0NvdW50OiB7W25hbWU6IHN0cmluZ106IG51bWJlcn0gPSB7fTtcclxuIl19