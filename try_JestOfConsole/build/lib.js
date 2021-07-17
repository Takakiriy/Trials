"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
exports.cc = exports.debugOut = exports.pp = exports.getSnapshot = exports.getTestWorkFolderFullPath = exports.checkNotInGitWorking = exports.pathResolve = exports.inputSkip = exports.inputPath = exports.getInputObject = exports.input = exports.getHomePath = exports.getFullPath = exports.copyFileSync = exports.copyFolderSync = void 0;
var fs = require("fs");
var path = require("path");
var globby = require("globby");
var readline = require("readline");
try {
    var snapshots = require("./__snapshots__/main.test.ts.snap");
}
catch (e) {
}
// copyFolderSync
// #keyword: copyFolderSync
// sourceFolder/1.txt => destinationFolderPath/1.txt
function copyFolderSync(sourceFolderPath, destinationFolderPath) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var currentFolderPath, destinationFolderFullPath, paths, paths_1, paths_1_1, path_, sourceFilePath, destinationFilePath, e_1_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    currentFolderPath = process.cwd();
                    destinationFolderFullPath = getFullPath(destinationFolderPath, currentFolderPath);
                    process.chdir(sourceFolderPath);
                    return [4 /*yield*/, globby(['**/*'])];
                case 1:
                    paths = _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, 8, 13]);
                    paths_1 = __asyncValues(paths);
                    _b.label = 3;
                case 3: return [4 /*yield*/, paths_1.next()];
                case 4:
                    if (!(paths_1_1 = _b.sent(), !paths_1_1.done)) return [3 /*break*/, 6];
                    path_ = paths_1_1.value;
                    sourceFilePath = path_;
                    destinationFilePath = path.resolve(destinationFolderFullPath + '/' + path_);
                    copyFileSync(sourceFilePath, destinationFilePath);
                    _b.label = 5;
                case 5: return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 13];
                case 7:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 13];
                case 8:
                    _b.trys.push([8, , 11, 12]);
                    if (!(paths_1_1 && !paths_1_1.done && (_a = paths_1["return"]))) return [3 /*break*/, 10];
                    return [4 /*yield*/, _a.call(paths_1)];
                case 9:
                    _b.sent();
                    _b.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 12: return [7 /*endfinally*/];
                case 13:
                    process.chdir(currentFolderPath);
                    return [2 /*return*/];
            }
        });
    });
}
exports.copyFolderSync = copyFolderSync;
// copyFileSync
// #keyword: copyFileSync
// This also makes the copy target folder.
function copyFileSync(sourceFilePath, destinationFilePath) {
    var destinationFolderPath = path.dirname(destinationFilePath);
    fs.mkdirSync(destinationFolderPath, { recursive: true });
    fs.copyFileSync(sourceFilePath, destinationFilePath);
}
exports.copyFileSync = copyFileSync;
// getFullPath
// #keyword: JavaScript (js) library getFullPath
// If "basePath" is current directory, you can call "path.resolve"
// If the variable has full path and litteral relative path, write `${___FullPath}/relative_path}`
function getFullPath(relativePath, basePath) {
    var fullPath = '';
    var slashRelativePath = relativePath.replace(/\\/g, '/');
    var colonSlashIndex = slashRelativePath.indexOf(':/');
    var slashFirstIndex = slashRelativePath.indexOf('/');
    var withProtocol = (colonSlashIndex + 1 === slashFirstIndex); // e.g.) C:/, http://
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
exports.getFullPath = getFullPath;
// getHomePath
// #keyword: getHomePath
function getHomePath() {
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
exports.getHomePath = getHomePath;
// StandardInputBuffer
var StandardInputBuffer = /** @class */ (function () {
    function StandardInputBuffer() {
        this.inputBuffer = [];
        this.inputResolver = undefined;
    }
    StandardInputBuffer.prototype.delayedConstructor = function () {
        var _this = this;
        this.readlines = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.readlines.on('line', function (line) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.inputResolver) {
                    this.inputResolver(line);
                    this.inputResolver = undefined;
                }
                else {
                    this.inputBuffer.push(line);
                }
                return [2 /*return*/];
            });
        }); });
        this.readlines.setPrompt('');
        this.readlines.prompt();
    };
    StandardInputBuffer.prototype.input = function (guide) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.readlines) {
                    this.delayedConstructor();
                }
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var nextLine = _this.inputBuffer.shift();
                        if (nextLine) {
                            console.log(guide + nextLine);
                            resolve(nextLine);
                        }
                        else {
                            process.stdout.write(guide);
                            _this.inputResolver = resolve;
                        }
                    })];
            });
        });
    };
    StandardInputBuffer.prototype.close = function () {
        if (this.readlines) {
            this.readlines.close();
        }
    };
    return StandardInputBuffer;
}());
// InputOption
var InputOption = /** @class */ (function () {
    function InputOption(inputLines) {
        this.inputLines = inputLines;
        this.nextLineIndex = 0;
        this.nextParameterIndex = 2;
    }
    return InputOption;
}());
var testBaseFolder = String.raw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["R:homemem_cacheMyDocsrcTypeScript\typrm\test_data"], ["R:\\home\\mem_cache\\MyDoc\\src\\TypeScript\\typrm\\test_data"]))) + '\\';
// inputOption
var inputOption = new InputOption([
/*
    testBaseFolder +`____.yaml`,
    String.raw `file`,
*/
]);
// input
// Example: const name = await input('What is your name? ');
function input(guide) {
    return __awaiter(this, void 0, void 0, function () {
        var value, value;
        return __generator(this, function (_a) {
            // Input emulation
            if (inputOption.inputLines) {
                if (inputOption.nextLineIndex < inputOption.inputLines.length) {
                    value = inputOption.inputLines[inputOption.nextLineIndex];
                    inputOption.nextLineIndex += 1;
                    console.log(guide + value);
                    return [2 /*return*/, value];
                }
            }
            // Read the starting process parameters
            while (inputOption.nextParameterIndex < process.argv.length) {
                value = process.argv[inputOption.nextParameterIndex];
                inputOption.nextParameterIndex += 1;
                if (value.substr(0, 1) !== '-') {
                    console.log(guide + value);
                    return [2 /*return*/, value];
                }
                if (value !== '--test') {
                    inputOption.nextParameterIndex += 1;
                }
            }
            // input
            return [2 /*return*/, InputObject.input(guide)];
        });
    });
}
exports.input = input;
var InputObject = new StandardInputBuffer();
function getInputObject() {
    return InputObject;
}
exports.getInputObject = getInputObject;
// inputPath
// Example: const name = await input('What is your name? ');
function inputPath(guide) {
    return __awaiter(this, void 0, void 0, function () {
        var key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, input(guide)];
                case 1:
                    key = _a.sent();
                    if (key.endsWith('()')) {
                        return [2 /*return*/, key];
                    }
                    else {
                        return [2 /*return*/, pathResolve(key)];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.inputPath = inputPath;
// inputSkip
function inputSkip(count) {
    inputOption.nextParameterIndex += count;
}
exports.inputSkip = inputSkip;
// pathResolve
function pathResolve(path_) {
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
exports.pathResolve = pathResolve;
// checkNotInGitWorking
function checkNotInGitWorking() {
    var path_ = process.cwd();
    if (!path_.includes('extract_git_branches')) {
        throw new Error('This is not in project folder.');
    }
    while (path_.includes('extract_git_branches')) {
        path_ = path.dirname(path_);
    }
    while (path_ !== '/') {
        if (fs.existsSync(path_ + "/.git")) {
            throw new Error('This test is not supported with git submodule.');
        }
        path_ = path.dirname(path_);
    }
}
exports.checkNotInGitWorking = checkNotInGitWorking;
// getTestWorkFolderFullPath
function getTestWorkFolderFullPath() {
    var path_ = process.cwd();
    if (!path_.includes('extract_git_branches')) {
        throw new Error('This is not in project folder.');
    }
    while (path_.includes('extract_git_branches')) {
        path_ = path.dirname(path_);
    }
    return path_ + "/_test_of_extract_git_branches";
}
exports.getTestWorkFolderFullPath = getTestWorkFolderFullPath;
// getSnapshot
function getSnapshot(label) {
    if (!(label in snapshots)) {
        throw new Error("not found snapshot label \"" + label + "\" in \"__Project__/src/__snapshots__/main.test.ts.snap\" file.");
    }
    var snapshot = snapshots[label];
    return snapshot.substr(2, snapshot.length - 4).replace('\\"', '"');
}
exports.getSnapshot = getSnapshot;
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
function pp(message) {
    if (typeof message === 'object') {
        message = JSON.stringify(message);
    }
    exports.debugOut.push(message.toString());
    return exports.debugOut;
}
exports.pp = pp;
exports.debugOut = [];
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
function cc(targetCount, label) {
    if (targetCount === void 0) { targetCount = 9999999; }
    if (label === void 0) { label = '0'; }
    if (!(label in gCount)) {
        gCount[label] = 0;
    }
    gCount[label] += 1;
    pp(label + ":countThrough[" + label + "] = " + gCount[label]);
    var isTarget = (gCount[label] === targetCount);
    if (isTarget) {
        pp('    **** It is before the target! ****');
    }
    return { isTarget: isTarget, debugOut: exports.debugOut };
}
exports.cc = cc;
var gCount = {};
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVCQUF5QjtBQUN6QiwyQkFBNkI7QUFDN0IsK0JBQWlDO0FBQ2pDLG1DQUFxQztBQUNyQyxJQUFJO0lBQ0EsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7Q0FDaEU7QUFBQyxPQUFPLENBQUMsRUFBRTtDQUNYO0FBRUQsaUJBQWlCO0FBQ2pCLDJCQUEyQjtBQUMzQixvREFBb0Q7QUFDcEQsU0FBdUIsY0FBYyxDQUFDLGdCQUF3QixFQUFFLHFCQUE2Qjs7Ozs7OztvQkFDbEYsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUNsQyx5QkFBeUIsR0FBRyxXQUFXLENBQUMscUJBQXFCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztvQkFDekYsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUVQLHFCQUFNLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUE7O29CQUF4QyxLQUFLLEdBQWEsU0FBc0I7Ozs7b0JBQ3JCLFVBQUEsY0FBQSxLQUFLLENBQUE7Ozs7O29CQUFkLEtBQUssa0JBQUEsQ0FBQTtvQkFDWCxjQUFjLEdBQUcsS0FBSyxDQUFDO29CQUN2QixtQkFBbUIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLHlCQUF5QixHQUFFLEdBQUcsR0FBRSxLQUFLLENBQUMsQ0FBQztvQkFFakYsWUFBWSxDQUFDLGNBQWMsRUFBRyxtQkFBbUIsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0JBRXZELE9BQU8sQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQzs7Ozs7Q0FDcEM7QUFiRCx3Q0FhQztBQUVELGVBQWU7QUFDZix5QkFBeUI7QUFD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Q0FBQyxFQUFFO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDckI7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLEVBQUUsQ0FBSyxLQUFLLHNCQUFpQixLQUFLLFlBQU8sTUFBTSxDQUFDLEtBQUssQ0FBRyxDQUFFLENBQUM7SUFDM0QsSUFBTSxRQUFRLEdBQUcsQ0FBRSxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssV0FBVyxDQUFFLENBQUM7SUFFbkQsSUFBSSxRQUFRLEVBQUU7UUFDVixFQUFFLENBQUUsd0NBQXdDLENBQUUsQ0FBQztLQUNsRDtJQUNELE9BQVEsRUFBRSxRQUFRLFVBQUEsRUFBRSxRQUFRLGtCQUFBLEVBQUUsQ0FBQztBQUNuQyxDQUFDO0FBYkQsZ0JBYUM7QUFDRCxJQUFPLE1BQU0sR0FBNkIsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgZ2xvYmJ5IGZyb20gJ2dsb2JieSc7XHJcbmltcG9ydCAqIGFzIHJlYWRsaW5lIGZyb20gJ3JlYWRsaW5lJztcclxudHJ5IHtcclxuICAgIHZhciBzbmFwc2hvdHMgPSByZXF1aXJlKFwiLi9fX3NuYXBzaG90c19fL21haW4udGVzdC50cy5zbmFwXCIpO1xyXG59IGNhdGNoIChlKSB7XHJcbn1cclxuXHJcbi8vIGNvcHlGb2xkZXJTeW5jXHJcbi8vICNrZXl3b3JkOiBjb3B5Rm9sZGVyU3luY1xyXG4vLyBzb3VyY2VGb2xkZXIvMS50eHQgPT4gZGVzdGluYXRpb25Gb2xkZXJQYXRoLzEudHh0XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiAgY29weUZvbGRlclN5bmMoc291cmNlRm9sZGVyUGF0aDogc3RyaW5nLCBkZXN0aW5hdGlvbkZvbGRlclBhdGg6IHN0cmluZykge1xyXG4gICAgY29uc3QgIGN1cnJlbnRGb2xkZXJQYXRoID0gcHJvY2Vzcy5jd2QoKTtcclxuICAgIGNvbnN0ICBkZXN0aW5hdGlvbkZvbGRlckZ1bGxQYXRoID0gZ2V0RnVsbFBhdGgoZGVzdGluYXRpb25Gb2xkZXJQYXRoLCBjdXJyZW50Rm9sZGVyUGF0aCk7XHJcbiAgICBwcm9jZXNzLmNoZGlyKHNvdXJjZUZvbGRlclBhdGgpO1xyXG5cclxuICAgIGNvbnN0ICBwYXRoczogc3RyaW5nW10gPSBhd2FpdCBnbG9iYnkoWycqKi8qJ10pO1xyXG4gICAgZm9yIGF3YWl0IChjb25zdCBwYXRoXyBvZiBwYXRocykge1xyXG4gICAgICAgIGNvbnN0ICBzb3VyY2VGaWxlUGF0aCA9IHBhdGhfO1xyXG4gICAgICAgIGNvbnN0ICBkZXN0aW5hdGlvbkZpbGVQYXRoID0gcGF0aC5yZXNvbHZlKGRlc3RpbmF0aW9uRm9sZGVyRnVsbFBhdGggKycvJysgcGF0aF8pO1xyXG5cclxuICAgICAgICBjb3B5RmlsZVN5bmMoc291cmNlRmlsZVBhdGgsICBkZXN0aW5hdGlvbkZpbGVQYXRoKTtcclxuICAgIH1cclxuICAgIHByb2Nlc3MuY2hkaXIoY3VycmVudEZvbGRlclBhdGgpO1xyXG59XHJcblxyXG4vLyBjb3B5RmlsZVN5bmNcclxuLy8gI2tleXdvcmQ6IGNvcHlGaWxlU3luY1xyXG4vLyBUaGlzIGFsc28gbWFrZXMgdGhlIGNvcHkgdGFyZ2V0IGZvbGRlci5cclxuZXhwb3J0IGZ1bmN0aW9uICBjb3B5RmlsZVN5bmMoc291cmNlRmlsZVBhdGg6IHN0cmluZywgZGVzdGluYXRpb25GaWxlUGF0aDogc3RyaW5nKSB7XHJcblx0Y29uc3QgIGRlc3RpbmF0aW9uRm9sZGVyUGF0aCA9IHBhdGguZGlybmFtZShkZXN0aW5hdGlvbkZpbGVQYXRoKTtcclxuXHRmcy5ta2RpclN5bmMoZGVzdGluYXRpb25Gb2xkZXJQYXRoLCB7cmVjdXJzaXZlOiB0cnVlfSk7XHJcblxyXG5cdGZzLmNvcHlGaWxlU3luYyhzb3VyY2VGaWxlUGF0aCwgZGVzdGluYXRpb25GaWxlUGF0aCk7XHJcbn1cclxuXHJcbi8vIGdldEZ1bGxQYXRoXHJcbi8vICNrZXl3b3JkOiBKYXZhU2NyaXB0IChqcykgbGlicmFyeSBnZXRGdWxsUGF0aFxyXG4vLyBJZiBcImJhc2VQYXRoXCIgaXMgY3VycmVudCBkaXJlY3RvcnksIHlvdSBjYW4gY2FsbCBcInBhdGgucmVzb2x2ZVwiXHJcbi8vIElmIHRoZSB2YXJpYWJsZSBoYXMgZnVsbCBwYXRoIGFuZCBsaXR0ZXJhbCByZWxhdGl2ZSBwYXRoLCB3cml0ZSBgJHtfX19GdWxsUGF0aH0vcmVsYXRpdmVfcGF0aH1gXHJcbmV4cG9ydCBmdW5jdGlvbiAgZ2V0RnVsbFBhdGgocmVsYXRpdmVQYXRoOiBzdHJpbmcsIGJhc2VQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgdmFyICAgIGZ1bGxQYXRoID0gJyc7XHJcbiAgICBjb25zdCAgc2xhc2hSZWxhdGl2ZVBhdGggPSByZWxhdGl2ZVBhdGgucmVwbGFjZSgvXFxcXC9nLCcvJyk7XHJcbiAgICBjb25zdCAgY29sb25TbGFzaEluZGV4ID0gc2xhc2hSZWxhdGl2ZVBhdGguaW5kZXhPZignOi8nKTtcclxuICAgIGNvbnN0ICBzbGFzaEZpcnN0SW5kZXggPSBzbGFzaFJlbGF0aXZlUGF0aC5pbmRleE9mKCcvJyk7XHJcbiAgICBjb25zdCAgd2l0aFByb3RvY29sID0gKGNvbG9uU2xhc2hJbmRleCArIDEgPT09IHNsYXNoRmlyc3RJbmRleCk7ICAvLyBlLmcuKSBDOi8sIGh0dHA6Ly9cclxuXHJcbiAgICBpZiAocmVsYXRpdmVQYXRoLnN1YnN0cigwLDEpID09PSAnLycpIHtcclxuICAgICAgICBmdWxsUGF0aCA9IHJlbGF0aXZlUGF0aDtcclxuICAgIH0gZWxzZSBpZiAocmVsYXRpdmVQYXRoLnN1YnN0cigwLDEpID09PSAnficpIHtcclxuICAgICAgICBmdWxsUGF0aCA9IHJlbGF0aXZlUGF0aC5yZXBsYWNlKCd+JywgZ2V0SG9tZVBhdGgoKSApO1xyXG4gICAgfSBlbHNlIGlmICh3aXRoUHJvdG9jb2wpIHtcclxuICAgICAgICBmdWxsUGF0aCA9IHJlbGF0aXZlUGF0aDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZnVsbFBhdGggPSBwYXRoLmpvaW4oYmFzZVBhdGgsIHJlbGF0aXZlUGF0aCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gIGZ1bGxQYXRoO1xyXG59XHJcblxyXG4vLyBnZXRIb21lUGF0aFxyXG4vLyAja2V5d29yZDogZ2V0SG9tZVBhdGhcclxuZXhwb3J0IGZ1bmN0aW9uICBnZXRIb21lUGF0aCgpOiBzdHJpbmcge1xyXG4gICAgaWYgKHByb2Nlc3MuZW52LkhPTUUpIHtcclxuICAgICAgICByZXR1cm4gIHByb2Nlc3MuZW52LkhPTUU7XHJcbiAgICB9IGVsc2UgaWYgKHByb2Nlc3MuZW52LlVTRVJQUk9GSUxFKSB7XHJcbiAgICAgICAgcmV0dXJuICBwcm9jZXNzLmVudi5VU0VSUFJPRklMRTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmV4cGVjdGVkJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFN0YW5kYXJkSW5wdXRCdWZmZXJcclxuY2xhc3MgIFN0YW5kYXJkSW5wdXRCdWZmZXIge1xyXG4gICAgcmVhZGxpbmVzOiByZWFkbGluZS5JbnRlcmZhY2UgfCB1bmRlZmluZWQ7XHJcbiAgICBpbnB1dEJ1ZmZlcjogc3RyaW5nW10gPSBbXTtcclxuICAgIGlucHV0UmVzb2x2ZXI/OiAoYW5zd2VyOnN0cmluZyk9PnZvaWQgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgZGVsYXllZENvbnN0cnVjdG9yKCkgeyAgLy8gSXQgaXMgbm90IGNvbnN0cnVjdG9yLCBiZWNhdXNlIFwiY3JlYXRlSW50ZXJmYWNlXCIgc3RvcHMgdGhlIHByb2dyYW0sIGlmIHN0ZGluIHdhcyBub3QgdXNlZC5cclxuICAgICAgICB0aGlzLnJlYWRsaW5lcyA9IHJlYWRsaW5lLmNyZWF0ZUludGVyZmFjZSh7XHJcbiAgICAgICAgICAgIGlucHV0OiBwcm9jZXNzLnN0ZGluLFxyXG4gICAgICAgICAgICBvdXRwdXQ6IHByb2Nlc3Muc3Rkb3V0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZWFkbGluZXMub24oJ2xpbmUnLCBhc3luYyAobGluZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlucHV0UmVzb2x2ZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRSZXNvbHZlcihsaW5lKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRSZXNvbHZlciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5wdXRCdWZmZXIucHVzaChsaW5lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnJlYWRsaW5lcy5zZXRQcm9tcHQoJycpO1xyXG4gICAgICAgIHRoaXMucmVhZGxpbmVzLnByb21wdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jICBpbnB1dChndWlkZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICBpZiAoIXRoaXMucmVhZGxpbmVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVsYXllZENvbnN0cnVjdG9yKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gIG5ldyBQcm9taXNlKFxyXG4gICAgICAgICAgICAocmVzb2x2ZTogKGFuc3dlcjpzdHJpbmcpPT52b2lkLCAgcmVqZWN0OiAoYW5zd2VyOnN0cmluZyk9PnZvaWQgKSA9PlxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc3QgIG5leHRMaW5lID0gdGhpcy5pbnB1dEJ1ZmZlci5zaGlmdCgpO1xyXG4gICAgICAgICAgICBpZiAobmV4dExpbmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGd1aWRlICsgbmV4dExpbmUpO1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShuZXh0TGluZSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShndWlkZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0UmVzb2x2ZXIgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY2xvc2UoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVhZGxpbmVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVhZGxpbmVzLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBJbnB1dE9wdGlvblxyXG5jbGFzcyBJbnB1dE9wdGlvbiB7XHJcbiAgICBpbnB1dExpbmVzOiBzdHJpbmdbXTtcclxuICAgIG5leHRMaW5lSW5kZXg6IG51bWJlcjtcclxuICAgIG5leHRQYXJhbWV0ZXJJbmRleDogbnVtYmVyOyAgLy8gVGhlIGluZGV4IG9mIHRoZSBzdGFydGluZyBwcm9jZXNzIHBhcmFtZXRlcnNcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpbnB1dExpbmVzOiBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuaW5wdXRMaW5lcyA9IGlucHV0TGluZXM7XHJcbiAgICAgICAgdGhpcy5uZXh0TGluZUluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLm5leHRQYXJhbWV0ZXJJbmRleCA9IDI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbnN0ICB0ZXN0QmFzZUZvbGRlciA9IFN0cmluZy5yYXcgYFI6XFxob21lXFxtZW1fY2FjaGVcXE15RG9jXFxzcmNcXFR5cGVTY3JpcHRcXHR5cHJtXFx0ZXN0X2RhdGFgKydcXFxcJztcclxuXHJcbi8vIGlucHV0T3B0aW9uXHJcbmNvbnN0IGlucHV0T3B0aW9uID0gbmV3IElucHV0T3B0aW9uKFtcclxuLypcclxuICAgIHRlc3RCYXNlRm9sZGVyICtgX19fXy55YW1sYCxcclxuICAgIFN0cmluZy5yYXcgYGZpbGVgLFxyXG4qL1xyXG5dKTtcclxuXHJcbi8vIGlucHV0XHJcbi8vIEV4YW1wbGU6IGNvbnN0IG5hbWUgPSBhd2FpdCBpbnB1dCgnV2hhdCBpcyB5b3VyIG5hbWU/ICcpO1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gIGlucHV0KCBndWlkZTogc3RyaW5nICk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAvLyBJbnB1dCBlbXVsYXRpb25cclxuICAgIGlmIChpbnB1dE9wdGlvbi5pbnB1dExpbmVzKSB7XHJcbiAgICAgICAgaWYgKGlucHV0T3B0aW9uLm5leHRMaW5lSW5kZXggPCBpbnB1dE9wdGlvbi5pbnB1dExpbmVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCAgdmFsdWUgPSBpbnB1dE9wdGlvbi5pbnB1dExpbmVzW2lucHV0T3B0aW9uLm5leHRMaW5lSW5kZXhdO1xyXG4gICAgICAgICAgICBpbnB1dE9wdGlvbi5uZXh0TGluZUluZGV4ICs9IDE7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGd1aWRlICsgdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVhZCB0aGUgc3RhcnRpbmcgcHJvY2VzcyBwYXJhbWV0ZXJzXHJcbiAgICB3aGlsZSAoaW5wdXRPcHRpb24ubmV4dFBhcmFtZXRlckluZGV4IDwgcHJvY2Vzcy5hcmd2Lmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0ICB2YWx1ZSA9IHByb2Nlc3MuYXJndltpbnB1dE9wdGlvbi5uZXh0UGFyYW1ldGVySW5kZXhdO1xyXG4gICAgICAgIGlucHV0T3B0aW9uLm5leHRQYXJhbWV0ZXJJbmRleCArPSAxO1xyXG4gICAgICAgIGlmICh2YWx1ZS5zdWJzdHIoMCwxKSAhPT0gJy0nKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGd1aWRlICsgdmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlICE9PSAnLS10ZXN0Jykge1xyXG4gICAgICAgICAgICBpbnB1dE9wdGlvbi5uZXh0UGFyYW1ldGVySW5kZXggKz0gMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaW5wdXRcclxuICAgIHJldHVybiAgSW5wdXRPYmplY3QuaW5wdXQoZ3VpZGUpO1xyXG59XHJcbmNvbnN0ICBJbnB1dE9iamVjdCA9IG5ldyBTdGFuZGFyZElucHV0QnVmZmVyKCk7XHJcbmV4cG9ydCBmdW5jdGlvbiAgZ2V0SW5wdXRPYmplY3QoKTogU3RhbmRhcmRJbnB1dEJ1ZmZlciB7XHJcbiAgICByZXR1cm4gIElucHV0T2JqZWN0O1xyXG59XHJcblxyXG4vLyBpbnB1dFBhdGhcclxuLy8gRXhhbXBsZTogY29uc3QgbmFtZSA9IGF3YWl0IGlucHV0KCdXaGF0IGlzIHlvdXIgbmFtZT8gJyk7XHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiAgaW5wdXRQYXRoKCBndWlkZTogc3RyaW5nICkge1xyXG4gICAgY29uc3QgIGtleSA9IGF3YWl0IGlucHV0KGd1aWRlKTtcclxuICAgIGlmIChrZXkuZW5kc1dpdGgoJygpJykpIHtcclxuICAgICAgICByZXR1cm4gIGtleTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuICBwYXRoUmVzb2x2ZShrZXkpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBpbnB1dFNraXBcclxuZXhwb3J0IGZ1bmN0aW9uICBpbnB1dFNraXAoY291bnQ6IG51bWJlcikge1xyXG4gICAgaW5wdXRPcHRpb24ubmV4dFBhcmFtZXRlckluZGV4ICs9IGNvdW50O1xyXG59XHJcblxyXG4vLyBwYXRoUmVzb2x2ZVxyXG5leHBvcnQgZnVuY3Rpb24gIHBhdGhSZXNvbHZlKHBhdGhfOiBzdHJpbmcpIHtcclxuXHJcbiAgICAvLyAnL2MvaG9tZScgZm9ybWF0IHRvIGN1cnJlbnQgT1MgZm9ybWF0XHJcbiAgICBpZiAocGF0aF8ubGVuZ3RoID49IDMpIHtcclxuICAgICAgICBpZiAocGF0aF9bMF0gPT09ICcvJyAgJiYgIHBhdGhfWzJdID09PSAnLycpIHtcclxuICAgICAgICAgICAgcGF0aF8gPSBwYXRoX1sxXSArJzonKyBwYXRoXy5zdWJzdHIoMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlcGxhY2Ugc2VwYXJhdG9ycyB0byBPUyBmb3JtYXRcclxuICAgIHBhdGhfID0gcGF0aC5yZXNvbHZlKHBhdGhfKTtcclxuXHJcbiAgICByZXR1cm4gcGF0aF9cclxufVxyXG5cclxuLy8gY2hlY2tOb3RJbkdpdFdvcmtpbmdcclxuZXhwb3J0IGZ1bmN0aW9uICBjaGVja05vdEluR2l0V29ya2luZygpIHtcclxuICAgIHZhciAgcGF0aF8gPSBwcm9jZXNzLmN3ZCgpO1xyXG5cclxuICAgIGlmICggISBwYXRoXy5pbmNsdWRlcygnZXh0cmFjdF9naXRfYnJhbmNoZXMnKSkge1xyXG4gICAgICAgIHRocm93ICBuZXcgRXJyb3IoJ1RoaXMgaXMgbm90IGluIHByb2plY3QgZm9sZGVyLicpXHJcbiAgICB9XHJcbiAgICB3aGlsZSAocGF0aF8uaW5jbHVkZXMoJ2V4dHJhY3RfZ2l0X2JyYW5jaGVzJykpIHtcclxuICAgICAgICBwYXRoXyA9IHBhdGguZGlybmFtZShwYXRoXyk7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAocGF0aF8gIT09ICcvJykge1xyXG5cclxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhgJHtwYXRoX30vLmdpdGApKSB7XHJcbiAgICAgICAgICAgIHRocm93ICBuZXcgRXJyb3IoJ1RoaXMgdGVzdCBpcyBub3Qgc3VwcG9ydGVkIHdpdGggZ2l0IHN1Ym1vZHVsZS4nKVxyXG4gICAgICAgIH1cclxuICAgICAgICBwYXRoXyA9IHBhdGguZGlybmFtZShwYXRoXyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGdldFRlc3RXb3JrRm9sZGVyRnVsbFBhdGhcclxuZXhwb3J0IGZ1bmN0aW9uICBnZXRUZXN0V29ya0ZvbGRlckZ1bGxQYXRoKCk6IHN0cmluZyB7XHJcbiAgICB2YXIgIHBhdGhfID0gcHJvY2Vzcy5jd2QoKTtcclxuXHJcbiAgICBpZiAoICEgcGF0aF8uaW5jbHVkZXMoJ2V4dHJhY3RfZ2l0X2JyYW5jaGVzJykpIHtcclxuICAgICAgICB0aHJvdyAgbmV3IEVycm9yKCdUaGlzIGlzIG5vdCBpbiBwcm9qZWN0IGZvbGRlci4nKVxyXG4gICAgfVxyXG4gICAgd2hpbGUgKHBhdGhfLmluY2x1ZGVzKCdleHRyYWN0X2dpdF9icmFuY2hlcycpKSB7XHJcbiAgICAgICAgcGF0aF8gPSBwYXRoLmRpcm5hbWUocGF0aF8pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAgYCR7cGF0aF99L190ZXN0X29mX2V4dHJhY3RfZ2l0X2JyYW5jaGVzYDtcclxufVxyXG5cclxuLy8gZ2V0U25hcHNob3RcclxuZXhwb3J0IGZ1bmN0aW9uICBnZXRTbmFwc2hvdChsYWJlbDogc3RyaW5nKSB7XHJcbiAgICBpZiAoICEgKGxhYmVsIGluIHNuYXBzaG90cykpIHtcclxuICAgICAgICB0aHJvdyAgbmV3IEVycm9yKGBub3QgZm91bmQgc25hcHNob3QgbGFiZWwgXCIke2xhYmVsfVwiIGluIFwiX19Qcm9qZWN0X18vc3JjL19fc25hcHNob3RzX18vbWFpbi50ZXN0LnRzLnNuYXBcIiBmaWxlLmApXHJcbiAgICB9XHJcbiAgICBjb25zdCAgc25hcHNob3QgPSBzbmFwc2hvdHNbbGFiZWxdO1xyXG4gICAgcmV0dXJuICBzbmFwc2hvdC5zdWJzdHIoMiwgc25hcHNob3QubGVuZ3RoIC0gNCkucmVwbGFjZSgnXFxcXFwiJywgJ1wiJyk7XHJcbn1cclxuXHJcbi8vIHBwXHJcbi8vIERlYnVnIHByaW50LlxyXG4vLyAja2V5d29yZDogcHBcclxuLy8gRXhhbXBsZTpcclxuLy8gICAgcHAodmFyKTtcclxuLy8gRXhhbXBsZTpcclxuLy8gICAgdmFyIGQgPSBwcCh2YXIpO1xyXG4vLyAgICBkID0gZDsgIC8vIFNldCBicmVhayBwb2ludCBoZXJlIGFuZCB3YXRjaCB0aGUgdmFyaWFibGUgZFxyXG4vLyBFeGFtcGxlOlxyXG4vLyAgICB0cnkge1xyXG4vL1xyXG4vLyAgICAgICAgYXdhaXQgbWFpbigpO1xyXG4vLyAgICB9IGZpbmFsbHkge1xyXG4vLyAgICAgICAgdmFyIGQgPSBwcCgnJyk7XHJcbi8vICAgICAgICBkID0gW107ICAvLyBTZXQgYnJlYWsgcG9pbnQgaGVyZSBhbmQgd2F0Y2ggdGhlIHZhcmlhYmxlIGRcclxuLy8gICAgfVxyXG5leHBvcnQgZnVuY3Rpb24gIHBwKG1lc3NhZ2U6IGFueSkge1xyXG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGRlYnVnT3V0LnB1c2gobWVzc2FnZS50b1N0cmluZygpKTtcclxuICAgIHJldHVybiBkZWJ1Z091dDtcclxufVxyXG5leHBvcnQgY29uc3QgIGRlYnVnT3V0OiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuLy8gY2NcclxuLy8gVGhyb3VnaCBjb3VudGVyLlxyXG4vLyAja2V5d29yZDogY2NcclxuLy8gRXhhbXBsZTpcclxuLy8gICBjYygpO1xyXG4vLyBFeGFtcGxlOlxyXG4vLyAgIHZhciBjID0gY2MoKS5kZWJ1Z091dDsgIC8vIFNldCBicmVhayBwb2ludCBoZXJlIGFuZCB3YXRjaCB0aGUgdmFyaWFibGUgY1xyXG4vLyBFeGFtcGxlOlxyXG4vLyAgIGlmICggY2MoMikuaXNUYXJnZXQgKVxyXG4vLyAgIHZhciBkID0gcHAoJycpOyAgLy8gU2V0IGJyZWFrIHBvaW50IGhlcmUgYW5kIHdhdGNoIHRoZSB2YXJpYWJsZSBkXHJcbmV4cG9ydCBmdW5jdGlvbiAgY2MoIHRhcmdldENvdW50OiBudW1iZXIgPSA5OTk5OTk5LCBsYWJlbDogc3RyaW5nID0gJzAnICkge1xyXG4gICAgaWYgKCEobGFiZWwgaW4gZ0NvdW50KSkge1xyXG4gICAgICAgIGdDb3VudFtsYWJlbF0gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdDb3VudFtsYWJlbF0gKz0gMTtcclxuICAgIHBwKCBgJHtsYWJlbH06Y291bnRUaHJvdWdoWyR7bGFiZWx9XSA9ICR7Z0NvdW50W2xhYmVsXX1gICk7XHJcbiAgICBjb25zdCBpc1RhcmdldCA9ICggZ0NvdW50W2xhYmVsXSA9PT0gdGFyZ2V0Q291bnQgKTtcclxuXHJcbiAgICBpZiAoaXNUYXJnZXQpIHtcclxuICAgICAgICBwcCggJyAgICAqKioqIEl0IGlzIGJlZm9yZSB0aGUgdGFyZ2V0ISAqKioqJyApO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICB7IGlzVGFyZ2V0LCBkZWJ1Z091dCB9O1xyXG59XHJcbmNvbnN0ICBnQ291bnQ6IHtbbmFtZTogc3RyaW5nXTogbnVtYmVyfSA9IHt9O1xyXG4iXX0=