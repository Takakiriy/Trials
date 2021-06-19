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
exports.getTestWorkFolderFullPath = exports.checkNotInGitWorking = exports.pathResolve = exports.inputSkip = exports.inputPath = exports.getInputObject = exports.input = exports.getHomePath = exports.getFullPath = exports.copyFileSync = exports.copyFolderSync = void 0;
var fs = require("fs");
var path = require("path");
var globby = require("globby");
var readline = require("readline");
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
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGliLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2xpYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVCQUF5QjtBQUN6QiwyQkFBNkI7QUFDN0IsK0JBQWlDO0FBQ2pDLG1DQUFxQztBQUVyQyxpQkFBaUI7QUFDakIsMkJBQTJCO0FBQzNCLG9EQUFvRDtBQUNwRCxTQUF1QixjQUFjLENBQUMsZ0JBQXdCLEVBQUUscUJBQTZCOzs7Ozs7O29CQUNsRixpQkFBaUIsR0FBRyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUM7b0JBQ2xDLHlCQUF5QixHQUFHLFdBQVcsQ0FBQyxxQkFBcUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO29CQUN6RixPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBRVAscUJBQU0sTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBQTs7b0JBQXhDLEtBQUssR0FBYSxTQUFzQjs7OztvQkFDckIsVUFBQSxjQUFBLEtBQUssQ0FBQTs7Ozs7b0JBQWQsS0FBSyxrQkFBQSxDQUFBO29CQUNYLGNBQWMsR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLG1CQUFtQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMseUJBQXlCLEdBQUUsR0FBRyxHQUFFLEtBQUssQ0FBQyxDQUFDO29CQUVqRixZQUFZLENBQUMsY0FBYyxFQUFHLG1CQUFtQixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvQkFFdkQsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOzs7OztDQUNwQztBQWJELHdDQWFDO0FBRUQsZUFBZTtBQUNmLHlCQUF5QjtBQUN6QiwwQ0FBMEM7QUFDMUMsU0FBaUIsWUFBWSxDQUFDLGNBQXNCLEVBQUUsbUJBQTJCO0lBQ2hGLElBQU8scUJBQXFCLEdBQUcsSUFBSSxDQUFDLE9BQU8s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S0FBSyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQzNDLE1BQU8sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtLQUNyRDtJQUNELE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQzNDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxLQUFLLEtBQUssR0FBRyxFQUFFO1FBRWxCLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBSSxLQUFLLFVBQU8sQ0FBQyxFQUFFO1lBQ2hDLE1BQU8sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQTtTQUNyRTtRQUNELEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQy9CO0FBQ0wsQ0FBQztBQWhCRCxvREFnQkM7QUFFRCw0QkFBNEI7QUFDNUIsU0FBaUIseUJBQXlCO0lBQ3RDLElBQUssS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUUzQixJQUFLLENBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQzNDLE1BQU8sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQTtLQUNyRDtJQUNELE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO1FBQzNDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQy9CO0lBRUQsT0FBVyxLQUFLLG1DQUFnQyxDQUFDO0FBQ3JELENBQUM7QUFYRCw4REFXQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIGdsb2JieSBmcm9tICdnbG9iYnknO1xyXG5pbXBvcnQgKiBhcyByZWFkbGluZSBmcm9tICdyZWFkbGluZSc7XHJcblxyXG4vLyBjb3B5Rm9sZGVyU3luY1xyXG4vLyAja2V5d29yZDogY29weUZvbGRlclN5bmNcclxuLy8gc291cmNlRm9sZGVyLzEudHh0ID0+IGRlc3RpbmF0aW9uRm9sZGVyUGF0aC8xLnR4dFxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gIGNvcHlGb2xkZXJTeW5jKHNvdXJjZUZvbGRlclBhdGg6IHN0cmluZywgZGVzdGluYXRpb25Gb2xkZXJQYXRoOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0ICBjdXJyZW50Rm9sZGVyUGF0aCA9IHByb2Nlc3MuY3dkKCk7XHJcbiAgICBjb25zdCAgZGVzdGluYXRpb25Gb2xkZXJGdWxsUGF0aCA9IGdldEZ1bGxQYXRoKGRlc3RpbmF0aW9uRm9sZGVyUGF0aCwgY3VycmVudEZvbGRlclBhdGgpO1xyXG4gICAgcHJvY2Vzcy5jaGRpcihzb3VyY2VGb2xkZXJQYXRoKTtcclxuXHJcbiAgICBjb25zdCAgcGF0aHM6IHN0cmluZ1tdID0gYXdhaXQgZ2xvYmJ5KFsnKiovKiddKTtcclxuICAgIGZvciBhd2FpdCAoY29uc3QgcGF0aF8gb2YgcGF0aHMpIHtcclxuICAgICAgICBjb25zdCAgc291cmNlRmlsZVBhdGggPSBwYXRoXztcclxuICAgICAgICBjb25zdCAgZGVzdGluYXRpb25GaWxlUGF0aCA9IHBhdGgucmVzb2x2ZShkZXN0aW5hdGlvbkZvbGRlckZ1bGxQYXRoICsnLycrIHBhdGhfKTtcclxuXHJcbiAgICAgICAgY29weUZpbGVTeW5jKHNvdXJjZUZpbGVQYXRoLCAgZGVzdGluYXRpb25GaWxlUGF0aCk7XHJcbiAgICB9XHJcbiAgICBwcm9jZXNzLmNoZGlyKGN1cnJlbnRGb2xkZXJQYXRoKTtcclxufVxyXG5cclxuLy8gY29weUZpbGVTeW5jXHJcbi8vICNrZXl3b3JkOiBjb3B5RmlsZVN5bmNcclxuLy8gVGhpcyBhbHNvIG1ha2VzIHRoZSBjb3B5IHRhcmdldCBmb2xkZXIuXHJcbmV4cG9ydCBmdW5jdGlvbiAgY29weUZpbGVTeW5jKHNvdXJjZUZpbGVQYXRoOiBzdHJpbmcsIGRlc3RpbmF0aW9uRmlsZVBhdGg6IHN0cmluZykge1xyXG5cdGNvbnN0ICBkZXN0aW5hdGlvbkZvbGRlclBhdGggPSBwYXRoLmRpcm5hbWUoZGVzdGluYXRpb25GaWxlUGF0aCk7XHJcblx0ZnMubWtkaXJTeW5jKGRlc3RpbmF0aW9uRm9sZGVyUGF0aCwge3JlY3Vyc2l2ZTogdHJ1ZX0pO1xyXG5cclxuXHRmcy5jb3B5RmlsZVN5bmMoc291cmNlRmlsZVBhdGgsIGRlc3RpbmF0aW9uRmlsZVBhdGgpO1xyXG59XHJcblxyXG4vLyBnZXRGdWxsUGF0aFxyXG4vLyAja2V5d29yZDogSmF2YVNjcmlwdCAoanMpIGxpYnJhcnkgZ2V0RnVsbFBhdGhcclxuLy8gSWYgXCJiYXNlUGF0aFwiIGlzIGN1cnJlbnQgZGlyZWN0b3J5LCB5b3UgY2FuIGNhbGwgXCJwYXRoLnJlc29sdmVcIlxyXG4vLyBJZiB0aGUgdmFyaWFibGUgaGFzIGZ1bGwgcGF0aCBhbmQgbGl0dGVyYWwgcmVsYXRpdmUgcGF0aCwgd3JpdGUgYCR7X19fRnVsbFBhdGh9L3JlbGF0aXZlX3BhdGh9YFxyXG5leHBvcnQgZnVuY3Rpb24gIGdldEZ1bGxQYXRoKHJlbGF0aXZlUGF0aDogc3RyaW5nLCBiYXNlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHZhciAgICBmdWxsUGF0aCA9ICcnO1xyXG4gICAgY29uc3QgIHNsYXNoUmVsYXRpdmVQYXRoID0gcmVsYXRpdmVQYXRoLnJlcGxhY2UoL1xcXFwvZywnLycpO1xyXG4gICAgY29uc3QgIGNvbG9uU2xhc2hJbmRleCA9IHNsYXNoUmVsYXRpdmVQYXRoLmluZGV4T2YoJzovJyk7XHJcbiAgICBjb25zdCAgc2xhc2hGaXJzdEluZGV4ID0gc2xhc2hSZWxhdGl2ZVBhdGguaW5kZXhPZignLycpO1xyXG4gICAgY29uc3QgIHdpdGhQcm90b2NvbCA9IChjb2xvblNsYXNoSW5kZXggKyAxID09PSBzbGFzaEZpcnN0SW5kZXgpOyAgLy8gZS5nLikgQzovLCBodHRwOi8vXHJcblxyXG4gICAgaWYgKHJlbGF0aXZlUGF0aC5zdWJzdHIoMCwxKSA9PT0gJy8nKSB7XHJcbiAgICAgICAgZnVsbFBhdGggPSByZWxhdGl2ZVBhdGg7XHJcbiAgICB9IGVsc2UgaWYgKHJlbGF0aXZlUGF0aC5zdWJzdHIoMCwxKSA9PT0gJ34nKSB7XHJcbiAgICAgICAgZnVsbFBhdGggPSByZWxhdGl2ZVBhdGgucmVwbGFjZSgnficsIGdldEhvbWVQYXRoKCkgKTtcclxuICAgIH0gZWxzZSBpZiAod2l0aFByb3RvY29sKSB7XHJcbiAgICAgICAgZnVsbFBhdGggPSByZWxhdGl2ZVBhdGg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGZ1bGxQYXRoID0gcGF0aC5qb2luKGJhc2VQYXRoLCByZWxhdGl2ZVBhdGgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuICBmdWxsUGF0aDtcclxufVxyXG5cclxuLy8gZ2V0SG9tZVBhdGhcclxuLy8gI2tleXdvcmQ6IGdldEhvbWVQYXRoXHJcbmV4cG9ydCBmdW5jdGlvbiAgZ2V0SG9tZVBhdGgoKTogc3RyaW5nIHtcclxuICAgIGlmIChwcm9jZXNzLmVudi5IT01FKSB7XHJcbiAgICAgICAgcmV0dXJuICBwcm9jZXNzLmVudi5IT01FO1xyXG4gICAgfSBlbHNlIGlmIChwcm9jZXNzLmVudi5VU0VSUFJPRklMRSkge1xyXG4gICAgICAgIHJldHVybiAgcHJvY2Vzcy5lbnYuVVNFUlBST0ZJTEU7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5leHBlY3RlZCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBTdGFuZGFyZElucHV0QnVmZmVyXHJcbmNsYXNzICBTdGFuZGFyZElucHV0QnVmZmVyIHtcclxuICAgIHJlYWRsaW5lczogcmVhZGxpbmUuSW50ZXJmYWNlIHwgdW5kZWZpbmVkO1xyXG4gICAgaW5wdXRCdWZmZXI6IHN0cmluZ1tdID0gW107XHJcbiAgICBpbnB1dFJlc29sdmVyPzogKGFuc3dlcjpzdHJpbmcpPT52b2lkID0gdW5kZWZpbmVkO1xyXG5cclxuICAgIGRlbGF5ZWRDb25zdHJ1Y3RvcigpIHsgIC8vIEl0IGlzIG5vdCBjb25zdHJ1Y3RvciwgYmVjYXVzZSBcImNyZWF0ZUludGVyZmFjZVwiIHN0b3BzIHRoZSBwcm9ncmFtLCBpZiBzdGRpbiB3YXMgbm90IHVzZWQuXHJcbiAgICAgICAgdGhpcy5yZWFkbGluZXMgPSByZWFkbGluZS5jcmVhdGVJbnRlcmZhY2Uoe1xyXG4gICAgICAgICAgICBpbnB1dDogcHJvY2Vzcy5zdGRpbixcclxuICAgICAgICAgICAgb3V0cHV0OiBwcm9jZXNzLnN0ZG91dFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVhZGxpbmVzLm9uKCdsaW5lJywgYXN5bmMgKGxpbmU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pbnB1dFJlc29sdmVyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0UmVzb2x2ZXIobGluZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0UmVzb2x2ZXIgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlucHV0QnVmZmVyLnB1c2gobGluZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWFkbGluZXMuc2V0UHJvbXB0KCcnKTtcclxuICAgICAgICB0aGlzLnJlYWRsaW5lcy5wcm9tcHQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyAgaW5wdXQoZ3VpZGU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlYWRsaW5lcykge1xyXG4gICAgICAgICAgICB0aGlzLmRlbGF5ZWRDb25zdHJ1Y3RvcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuICBuZXcgUHJvbWlzZShcclxuICAgICAgICAgICAgKHJlc29sdmU6IChhbnN3ZXI6c3RyaW5nKT0+dm9pZCwgIHJlamVjdDogKGFuc3dlcjpzdHJpbmcpPT52b2lkICkgPT5cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnN0ICBuZXh0TGluZSA9IHRoaXMuaW5wdXRCdWZmZXIuc2hpZnQoKTtcclxuICAgICAgICAgICAgaWYgKG5leHRMaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhndWlkZSArIG5leHRMaW5lKTtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUobmV4dExpbmUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoZ3VpZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbnB1dFJlc29sdmVyID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWRsaW5lcykge1xyXG4gICAgICAgICAgICB0aGlzLnJlYWRsaW5lcy5jbG9zZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gSW5wdXRPcHRpb25cclxuY2xhc3MgSW5wdXRPcHRpb24ge1xyXG4gICAgaW5wdXRMaW5lczogc3RyaW5nW107XHJcbiAgICBuZXh0TGluZUluZGV4OiBudW1iZXI7XHJcbiAgICBuZXh0UGFyYW1ldGVySW5kZXg6IG51bWJlcjsgIC8vIFRoZSBpbmRleCBvZiB0aGUgc3RhcnRpbmcgcHJvY2VzcyBwYXJhbWV0ZXJzXHJcblxyXG4gICAgY29uc3RydWN0b3IoaW5wdXRMaW5lczogc3RyaW5nW10pIHtcclxuICAgICAgICB0aGlzLmlucHV0TGluZXMgPSBpbnB1dExpbmVzO1xyXG4gICAgICAgIHRoaXMubmV4dExpbmVJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5uZXh0UGFyYW1ldGVySW5kZXggPSAyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCAgdGVzdEJhc2VGb2xkZXIgPSBTdHJpbmcucmF3IGBSOlxcaG9tZVxcbWVtX2NhY2hlXFxNeURvY1xcc3JjXFxUeXBlU2NyaXB0XFx0eXBybVxcdGVzdF9kYXRhYCsnXFxcXCc7XHJcblxyXG4vLyBpbnB1dE9wdGlvblxyXG5jb25zdCBpbnB1dE9wdGlvbiA9IG5ldyBJbnB1dE9wdGlvbihbXHJcbi8qXHJcbiAgICB0ZXN0QmFzZUZvbGRlciArYF9fX18ueWFtbGAsXHJcbiAgICBTdHJpbmcucmF3IGBmaWxlYCxcclxuKi9cclxuXSk7XHJcblxyXG4vLyBpbnB1dFxyXG4vLyBFeGFtcGxlOiBjb25zdCBuYW1lID0gYXdhaXQgaW5wdXQoJ1doYXQgaXMgeW91ciBuYW1lPyAnKTtcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uICBpbnB1dCggZ3VpZGU6IHN0cmluZyApOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgLy8gSW5wdXQgZW11bGF0aW9uXHJcbiAgICBpZiAoaW5wdXRPcHRpb24uaW5wdXRMaW5lcykge1xyXG4gICAgICAgIGlmIChpbnB1dE9wdGlvbi5uZXh0TGluZUluZGV4IDwgaW5wdXRPcHRpb24uaW5wdXRMaW5lcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgIHZhbHVlID0gaW5wdXRPcHRpb24uaW5wdXRMaW5lc1tpbnB1dE9wdGlvbi5uZXh0TGluZUluZGV4XTtcclxuICAgICAgICAgICAgaW5wdXRPcHRpb24ubmV4dExpbmVJbmRleCArPSAxO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhndWlkZSArIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAgdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlYWQgdGhlIHN0YXJ0aW5nIHByb2Nlc3MgcGFyYW1ldGVyc1xyXG4gICAgd2hpbGUgKGlucHV0T3B0aW9uLm5leHRQYXJhbWV0ZXJJbmRleCA8IHByb2Nlc3MuYXJndi5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCAgdmFsdWUgPSBwcm9jZXNzLmFyZ3ZbaW5wdXRPcHRpb24ubmV4dFBhcmFtZXRlckluZGV4XTtcclxuICAgICAgICBpbnB1dE9wdGlvbi5uZXh0UGFyYW1ldGVySW5kZXggKz0gMTtcclxuICAgICAgICBpZiAodmFsdWUuc3Vic3RyKDAsMSkgIT09ICctJykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhndWlkZSArIHZhbHVlKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiAgdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWx1ZSAhPT0gJy0tdGVzdCcpIHtcclxuICAgICAgICAgICAgaW5wdXRPcHRpb24ubmV4dFBhcmFtZXRlckluZGV4ICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGlucHV0XHJcbiAgICByZXR1cm4gIElucHV0T2JqZWN0LmlucHV0KGd1aWRlKTtcclxufVxyXG5jb25zdCAgSW5wdXRPYmplY3QgPSBuZXcgU3RhbmRhcmRJbnB1dEJ1ZmZlcigpO1xyXG5leHBvcnQgZnVuY3Rpb24gIGdldElucHV0T2JqZWN0KCk6IFN0YW5kYXJkSW5wdXRCdWZmZXIge1xyXG4gICAgcmV0dXJuICBJbnB1dE9iamVjdDtcclxufVxyXG5cclxuLy8gaW5wdXRQYXRoXHJcbi8vIEV4YW1wbGU6IGNvbnN0IG5hbWUgPSBhd2FpdCBpbnB1dCgnV2hhdCBpcyB5b3VyIG5hbWU/ICcpO1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gIGlucHV0UGF0aCggZ3VpZGU6IHN0cmluZyApIHtcclxuICAgIGNvbnN0ICBrZXkgPSBhd2FpdCBpbnB1dChndWlkZSk7XHJcbiAgICBpZiAoa2V5LmVuZHNXaXRoKCcoKScpKSB7XHJcbiAgICAgICAgcmV0dXJuICBrZXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAgcGF0aFJlc29sdmUoa2V5KTtcclxuICAgIH1cclxufVxyXG5cclxuLy8gaW5wdXRTa2lwXHJcbmV4cG9ydCBmdW5jdGlvbiAgaW5wdXRTa2lwKGNvdW50OiBudW1iZXIpIHtcclxuICAgIGlucHV0T3B0aW9uLm5leHRQYXJhbWV0ZXJJbmRleCArPSBjb3VudDtcclxufVxyXG5cclxuLy8gcGF0aFJlc29sdmVcclxuZXhwb3J0IGZ1bmN0aW9uICBwYXRoUmVzb2x2ZShwYXRoXzogc3RyaW5nKSB7XHJcblxyXG4gICAgLy8gJy9jL2hvbWUnIGZvcm1hdCB0byBjdXJyZW50IE9TIGZvcm1hdFxyXG4gICAgaWYgKHBhdGhfLmxlbmd0aCA+PSAzKSB7XHJcbiAgICAgICAgaWYgKHBhdGhfWzBdID09PSAnLycgICYmICBwYXRoX1syXSA9PT0gJy8nKSB7XHJcbiAgICAgICAgICAgIHBhdGhfID0gcGF0aF9bMV0gKyc6JysgcGF0aF8uc3Vic3RyKDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXBsYWNlIHNlcGFyYXRvcnMgdG8gT1MgZm9ybWF0XHJcbiAgICBwYXRoXyA9IHBhdGgucmVzb2x2ZShwYXRoXyk7XHJcblxyXG4gICAgcmV0dXJuIHBhdGhfXHJcbn1cclxuXHJcbi8vIGNoZWNrTm90SW5HaXRXb3JraW5nXHJcbmV4cG9ydCBmdW5jdGlvbiAgY2hlY2tOb3RJbkdpdFdvcmtpbmcoKSB7XHJcbiAgICB2YXIgIHBhdGhfID0gcHJvY2Vzcy5jd2QoKTtcclxuXHJcbiAgICBpZiAoICEgcGF0aF8uaW5jbHVkZXMoJ2V4dHJhY3RfZ2l0X2JyYW5jaGVzJykpIHtcclxuICAgICAgICB0aHJvdyAgbmV3IEVycm9yKCdUaGlzIGlzIG5vdCBpbiBwcm9qZWN0IGZvbGRlci4nKVxyXG4gICAgfVxyXG4gICAgd2hpbGUgKHBhdGhfLmluY2x1ZGVzKCdleHRyYWN0X2dpdF9icmFuY2hlcycpKSB7XHJcbiAgICAgICAgcGF0aF8gPSBwYXRoLmRpcm5hbWUocGF0aF8pO1xyXG4gICAgfVxyXG4gICAgd2hpbGUgKHBhdGhfICE9PSAnLycpIHtcclxuXHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoYCR7cGF0aF99Ly5naXRgKSkge1xyXG4gICAgICAgICAgICB0aHJvdyAgbmV3IEVycm9yKCdUaGlzIHRlc3QgaXMgbm90IHN1cHBvcnRlZCB3aXRoIGdpdCBzdWJtb2R1bGUuJylcclxuICAgICAgICB9XHJcbiAgICAgICAgcGF0aF8gPSBwYXRoLmRpcm5hbWUocGF0aF8pO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBnZXRUZXN0V29ya0ZvbGRlckZ1bGxQYXRoXHJcbmV4cG9ydCBmdW5jdGlvbiAgZ2V0VGVzdFdvcmtGb2xkZXJGdWxsUGF0aCgpOiBzdHJpbmcge1xyXG4gICAgdmFyICBwYXRoXyA9IHByb2Nlc3MuY3dkKCk7XHJcblxyXG4gICAgaWYgKCAhIHBhdGhfLmluY2x1ZGVzKCdleHRyYWN0X2dpdF9icmFuY2hlcycpKSB7XHJcbiAgICAgICAgdGhyb3cgIG5ldyBFcnJvcignVGhpcyBpcyBub3QgaW4gcHJvamVjdCBmb2xkZXIuJylcclxuICAgIH1cclxuICAgIHdoaWxlIChwYXRoXy5pbmNsdWRlcygnZXh0cmFjdF9naXRfYnJhbmNoZXMnKSkge1xyXG4gICAgICAgIHBhdGhfID0gcGF0aC5kaXJuYW1lKHBhdGhfKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gIGAke3BhdGhffS9fdGVzdF9vZl9leHRyYWN0X2dpdF9icmFuY2hlc2A7XHJcbn1cclxuIl19