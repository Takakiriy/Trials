"use strict";
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
exports.__esModule = true;
var fs = require("fs");
var child_process = require("child_process");
var path = require("path");
var scriptPath = "../build/app.js";
var testFolderPath = "test_data" + path.sep;
var debug = false;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!debug) return [3 /*break*/, 3];
                    return [4 /*yield*/, TestOfFirst()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, TestOfOptions()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, TestOfOptions()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    console.log('Pass');
                    return [2 /*return*/];
            }
        });
    });
}
// TestOfFirst
function TestOfFirst() {
    return __awaiter(this, void 0, void 0, function () {
        var returns, answer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("TestCase: TestOfFirst");
                    return [4 /*yield*/, callChildProccess("node " + scriptPath + " --test --locale en-US", { inputLines: [
                                "exit"
                            ] })];
                case 1:
                    // Test Main
                    returns = _a.sent();
                    answer = fs.readFileSync(testFolderPath + "1_first_1_ok_1_answer.txt")
                        .toString().substr(cutBOM);
                    // Check
                    if (returns.stdout !== answer) {
                        printDifferentPaths("_output.txt", '1_first_1_ok_1_answer.txt');
                        fs.writeFileSync(testFolderPath + "_output.txt", returns.stdout);
                        throw new Error();
                    }
                    return [2 /*return*/];
            }
        });
    });
}
// TestOfOptions
function TestOfOptions() {
    return __awaiter(this, void 0, void 0, function () {
        var returns, fileNameHeads, _i, fileNameHeads_1, fileNameHead, options, options, answer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fileNameHeads = [
                        "2_options_1_command",
                        "2_options_2_input",
                    ];
                    _i = 0, fileNameHeads_1 = fileNameHeads;
                    _a.label = 1;
                case 1:
                    if (!(_i < fileNameHeads_1.length)) return [3 /*break*/, 4];
                    fileNameHead = fileNameHeads_1[_i];
                    console.log("TestCase: TestOfOptions >> " + fileNameHead);
                    if (fileNameHead === '2_options_1_command') {
                        options = '--command  stdout';
                    }
                    else {
                        options = '--input';
                    }
                    return [4 /*yield*/, callChildProccess("node " + scriptPath + " --test " + options, { inputLines: [
                                "Input"
                            ] })];
                case 2:
                    // Test Main
                    returns = _a.sent();
                    answer = fs.readFileSync(testFolderPath + fileNameHead + "_1_answer.txt")
                        .toString().substr(cutBOM);
                    // Check
                    if (returns.stdout !== answer) {
                        printDifferentPaths("_output.txt", fileNameHead + '_1_answer.txt');
                        fs.writeFileSync(testFolderPath + "_output.txt", returns.stdout);
                        throw new Error();
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// deleteFile
function deleteFile(path) {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}
// getFullPath
function getFullPath(relativePath, basePath) {
    var fullPath = '';
    if (relativePath.substr(0, 1) === '/') {
        fullPath = relativePath;
    }
    else {
        fullPath = path.join(basePath, relativePath);
    }
    return fullPath;
}
// printDifferentPaths
function printDifferentPaths(path1, path2) {
    console.log("Error: different between the following files");
    console.log("  Path1: " + (testFolderFullPath + path1));
    console.log("  Path2: " + (testFolderFullPath + path2));
}
// diffStrings
function diffStrings(result, answer) {
    var resultFilePath = '_output.txt';
    var answerFilePath = '_answer.txt';
    fs.writeFileSync(testFolderFullPath + resultFilePath, result);
    fs.writeFileSync(testFolderFullPath + answerFilePath, answer);
    printDifferentPaths(resultFilePath, answerFilePath);
}
// callChildProccess
function callChildProccess(commandLine, option) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolveFunction, rejectFunction) { return __awaiter(_this, void 0, void 0, function () {
                    var returnValue, childProcess, _i, _a, inputLine, e_1;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                returnValue = new ProcessReturns();
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 8, , 9]);
                                childProcess = child_process.exec(commandLine, 
                                // on close the "childProcess" (2)
                                function (error, stdout, stderr) {
                                    returnValue.stdout = stdout;
                                    returnValue.stderr = stderr;
                                    resolveFunction(returnValue);
                                });
                                if (!(option && childProcess.stdin)) return [3 /*break*/, 7];
                                if (!option.inputLines) return [3 /*break*/, 6];
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 300); })];
                            case 2:
                                _b.sent();
                                _i = 0, _a = option.inputLines;
                                _b.label = 3;
                            case 3:
                                if (!(_i < _a.length)) return [3 /*break*/, 6];
                                inputLine = _a[_i];
                                console.log(inputLine);
                                childProcess.stdin.write(inputLine + "\n");
                                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 200); })];
                            case 4:
                                _b.sent();
                                _b.label = 5;
                            case 5:
                                _i++;
                                return [3 /*break*/, 3];
                            case 6:
                                childProcess.stdin.end();
                                _b.label = 7;
                            case 7:
                                // on close the "childProcess" (1)
                                childProcess.on('close', function (exitCode) {
                                    returnValue.exitCode = exitCode;
                                });
                                childProcess.on('exit', function (exitCode) {
                                    returnValue.exitCode = exitCode;
                                });
                                return [3 /*break*/, 9];
                            case 8:
                                e_1 = _b.sent();
                                throw Error("Error in the command line " + commandLine);
                            case 9: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
// ProcessOption
var ProcessOption = /** @class */ (function () {
    function ProcessOption() {
    }
    return ProcessOption;
}());
// ProcessReturns
var ProcessReturns = /** @class */ (function () {
    function ProcessReturns() {
        this.exitCode = 0;
        this.stdout = '';
        this.stderr = '';
    }
    return ProcessReturns;
}());
var testFolderFullPath = getFullPath("../src/" + testFolderPath, process.cwd());
var cutBOM = 1;
var notFound = -1;
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1QkFBeUI7QUFDekIsNkNBQStDO0FBQy9DLDJCQUE2QjtBQUU3QixJQUFPLFVBQVUsR0FBSSxpQkFBaUIsQ0FBQztBQUN2QyxJQUFPLGNBQWMsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUUvQyxJQUFPLEtBQUssR0FBRyxLQUFLLENBQUM7QUFFckIsU0FBZ0IsSUFBSTs7Ozs7eUJBQ1osQ0FBQyxLQUFLLEVBQU4sd0JBQU07b0JBQ04scUJBQU0sV0FBVyxFQUFFLEVBQUE7O29CQUFuQixTQUFtQixDQUFDO29CQUNwQixxQkFBTSxhQUFhLEVBQUUsRUFBQTs7b0JBQXJCLFNBQXFCLENBQUM7O3dCQUV0QixxQkFBTSxhQUFhLEVBQUUsRUFBQTs7b0JBQXJCLFNBQXFCLENBQUM7OztvQkFFN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Q0FDcEI7QUFFRCxjQUFjO0FBQ2QsU0FBZ0IsV0FBVzs7Ozs7O29CQUd2QixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7b0JBRzNCLHFCQUFNLGlCQUFpQixDQUFDLFVBQVEsVUFBVSwyQkFBd0IsRUFDeEUsRUFBQyxVQUFVLEVBQUU7Z0NBQ1QsTUFBTTs2QkFDVCxFQUFDLENBQ0wsRUFBQTs7b0JBTEQsWUFBWTtvQkFDWixPQUFPLEdBQUcsU0FJVCxDQUFDO29CQUNLLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsR0FBRywyQkFBMkIsQ0FBQzt5QkFDeEUsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUUvQixRQUFRO29CQUNSLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxNQUFN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T0FBQSxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUF4QixDQUF3QixDQUFDLEVBQUE7O2dDQUF0RCxTQUFzRCxDQUFDOzs7Z0NBSGhDLElBQWlCLENBQUE7OztnQ0FNMUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7O2dDQUcxQixrQ0FBa0M7Z0NBQ2xDLFlBQVksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQUMsUUFBZ0I7b0NBQ3pDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dDQUNqQyxDQUFDLENBQUMsQ0FBQztnQ0FDSCxZQUFZLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLFFBQWdCO29DQUN4QyxXQUFXLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQ0FDakMsQ0FBQyxDQUFDLENBQUM7Ozs7Z0NBRUgsTUFBTSxLQUFLLENBQUMsK0JBQTZCLFdBQWEsQ0FBQyxDQUFDOzs7O3FCQUV6RCxDQUFDLEVBQUM7OztDQUNIO0FBRUQsZ0JBQWdCO0FBQ2hCO0lBQUE7SUFFQSxDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUVELGlCQUFpQjtBQUNqQjtJQUFBO1FBQ0MsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLFdBQU0sR0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUFELHFCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFFRCxJQUFPLGtCQUFrQixHQUFHLFdBQVcsQ0FBRSxZQUFVLGNBQWdCLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDcEYsSUFBTyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLElBQU8sUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JCLElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xyXG5pbXBvcnQgKiBhcyBjaGlsZF9wcm9jZXNzIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuY29uc3QgIHNjcmlwdFBhdGggPSAgYC4uL2J1aWxkL2FwcC5qc2A7XHJcbmNvbnN0ICB0ZXN0Rm9sZGVyUGF0aCA9IGB0ZXN0X2RhdGFgICsgcGF0aC5zZXA7XHJcblxyXG5jb25zdCAgZGVidWcgPSBmYWxzZTtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uICBtYWluKCkge1xyXG4gICAgaWYgKCFkZWJ1Zykge1xyXG4gICAgICAgIGF3YWl0IFRlc3RPZkZpcnN0KCk7XHJcbiAgICAgICAgYXdhaXQgVGVzdE9mT3B0aW9ucygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhd2FpdCBUZXN0T2ZPcHRpb25zKCk7XHJcbiAgICB9XHJcblx0Y29uc29sZS5sb2coJ1Bhc3MnKTtcclxufVxyXG5cclxuLy8gVGVzdE9mRmlyc3RcclxuYXN5bmMgZnVuY3Rpb24gIFRlc3RPZkZpcnN0KCkge1xyXG5cdGxldCAgcmV0dXJuczogUHJvY2Vzc1JldHVybnM7XHJcblxyXG4gICAgY29uc29sZS5sb2coYFRlc3RDYXNlOiBUZXN0T2ZGaXJzdGApO1xyXG5cclxuICAgIC8vIFRlc3QgTWFpblxyXG4gICAgcmV0dXJucyA9IGF3YWl0IGNhbGxDaGlsZFByb2NjZXNzKGBub2RlICR7c2NyaXB0UGF0aH0gLS10ZXN0IC0tbG9jYWxlIGVuLVVTYCxcclxuICAgICAgICB7aW5wdXRMaW5lczogW1xyXG4gICAgICAgICAgICBcImV4aXRcIlxyXG4gICAgICAgIF19XHJcbiAgICApO1xyXG4gICAgY29uc3QgIGFuc3dlciA9IGZzLnJlYWRGaWxlU3luYyh0ZXN0Rm9sZGVyUGF0aCArIFwiMV9maXJzdF8xX29rXzFfYW5zd2VyLnR4dFwiKVxyXG4gICAgICAgIC50b1N0cmluZygpLnN1YnN0cihjdXRCT00pO1xyXG5cclxuICAgIC8vIENoZWNrXHJcbiAgICBpZiAocmV0dXJucy5zdGRvdXQgIT09IGFuc3dlcikge1xyXG4gICAgICAgIHByaW50RGlmZmVyZW50UGF0aHMoYF9vdXRwdXQudHh0YCwgJzFfZmlyc3RfMV9va18xX2Fuc3dlci50eHQnKTtcclxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHRlc3RGb2xkZXJQYXRoICsgXCJfb3V0cHV0LnR4dFwiLCByZXR1cm5zLnN0ZG91dCk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFRlc3RPZk9wdGlvbnNcclxuYXN5bmMgZnVuY3Rpb24gIFRlc3RPZk9wdGlvbnMoKSB7XHJcblx0bGV0ICByZXR1cm5zOiBQcm9jZXNzUmV0dXJucztcclxuXHJcblx0Y29uc3QgZmlsZU5hbWVIZWFkcyA9IFtcclxuXHRcdFwiMl9vcHRpb25zXzFfY29tbWFuZFwiLFxyXG5cdFx0XCIyX29wdGlvbnNfMl9pbnB1dFwiLFxyXG5cdF07XHJcblx0Zm9yIChjb25zdCBmaWxlTmFtZUhlYWQgb2YgZmlsZU5hbWVIZWFkcykge1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKGBUZXN0Q2FzZTogVGVzdE9mT3B0aW9ucyA+PiAke2ZpbGVOYW1lSGVhZH1gKTtcclxuICAgICAgICBpZiAoZmlsZU5hbWVIZWFkID09PSAnMl9vcHRpb25zXzFfY29tbWFuZCcpIHtcclxuICAgICAgICAgICAgdmFyICBvcHRpb25zID0gJy0tY29tbWFuZCAgc3Rkb3V0JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgIG9wdGlvbnMgPSAnLS1pbnB1dCc7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdC8vIFRlc3QgTWFpblxyXG5cdFx0cmV0dXJucyA9IGF3YWl0IGNhbGxDaGlsZFByb2NjZXNzKGBub2RlICR7c2NyaXB0UGF0aH0gLS10ZXN0ICR7b3B0aW9uc31gLFxyXG5cdFx0XHR7aW5wdXRMaW5lczogW1xyXG5cdFx0XHRcdFwiSW5wdXRcIlxyXG5cdFx0XHRdfVxyXG5cdFx0KTtcclxuXHRcdGNvbnN0ICBhbnN3ZXIgPSBmcy5yZWFkRmlsZVN5bmModGVzdEZvbGRlclBhdGggKyBmaWxlTmFtZUhlYWQgKyBcIl8xX2Fuc3dlci50eHRcIilcclxuXHRcdFx0LnRvU3RyaW5nKCkuc3Vic3RyKGN1dEJPTSk7XHJcblxyXG5cdFx0Ly8gQ2hlY2tcclxuXHRcdGlmIChyZXR1cm5zLnN0ZG91dCAhPT0gYW5zd2VyKSB7XHJcblx0XHRcdHByaW50RGlmZmVyZW50UGF0aHMoYF9vdXRwdXQudHh0YCwgZmlsZU5hbWVIZWFkICsgJ18xX2Fuc3dlci50eHQnKTtcclxuXHRcdFx0ZnMud3JpdGVGaWxlU3luYyh0ZXN0Rm9sZGVyUGF0aCArIFwiX291dHB1dC50eHRcIiwgcmV0dXJucy5zdGRvdXQpO1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8vIGRlbGV0ZUZpbGVcclxuZnVuY3Rpb24gIGRlbGV0ZUZpbGUocGF0aDogc3RyaW5nKSB7XHJcbiAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoKSkge1xyXG4gICAgICAgIGZzLnVubGlua1N5bmMocGF0aCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGdldEZ1bGxQYXRoXHJcbmZ1bmN0aW9uICBnZXRGdWxsUGF0aChyZWxhdGl2ZVBhdGg6IHN0cmluZywgYmFzZVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0dmFyICBmdWxsUGF0aCA9ICcnO1xyXG5cdGlmIChyZWxhdGl2ZVBhdGguc3Vic3RyKDAsMSkgPT09ICcvJykge1xyXG5cdFx0ZnVsbFBhdGggPSByZWxhdGl2ZVBhdGg7XHJcblx0fSBlbHNlIHtcclxuXHRcdGZ1bGxQYXRoID0gcGF0aC5qb2luKGJhc2VQYXRoLCByZWxhdGl2ZVBhdGgpO1xyXG5cdH1cclxuXHRyZXR1cm4gIGZ1bGxQYXRoO1xyXG59XHJcblxyXG4vLyBwcmludERpZmZlcmVudFBhdGhzXHJcbmZ1bmN0aW9uICBwcmludERpZmZlcmVudFBhdGhzKHBhdGgxOiBzdHJpbmcsIHBhdGgyOiBzdHJpbmcpIHtcclxuXHRjb25zb2xlLmxvZyhgRXJyb3I6IGRpZmZlcmVudCBiZXR3ZWVuIHRoZSBmb2xsb3dpbmcgZmlsZXNgKTtcclxuXHRjb25zb2xlLmxvZyhgICBQYXRoMTogJHt0ZXN0Rm9sZGVyRnVsbFBhdGggKyBwYXRoMX1gKTtcclxuXHRjb25zb2xlLmxvZyhgICBQYXRoMjogJHt0ZXN0Rm9sZGVyRnVsbFBhdGggKyBwYXRoMn1gKTtcclxufVxyXG5cclxuLy8gZGlmZlN0cmluZ3NcclxuZnVuY3Rpb24gIGRpZmZTdHJpbmdzKHJlc3VsdDogc3RyaW5nLCBhbnN3ZXI6IHN0cmluZykge1xyXG5cdGNvbnN0ICByZXN1bHRGaWxlUGF0aCA9ICdfb3V0cHV0LnR4dCc7XHJcblx0Y29uc3QgIGFuc3dlckZpbGVQYXRoID0gJ19hbnN3ZXIudHh0JztcclxuXHJcblx0ZnMud3JpdGVGaWxlU3luYyh0ZXN0Rm9sZGVyRnVsbFBhdGggKyByZXN1bHRGaWxlUGF0aCwgcmVzdWx0KTtcclxuXHRmcy53cml0ZUZpbGVTeW5jKHRlc3RGb2xkZXJGdWxsUGF0aCArIGFuc3dlckZpbGVQYXRoLCBhbnN3ZXIpO1xyXG5cclxuXHRwcmludERpZmZlcmVudFBhdGhzKHJlc3VsdEZpbGVQYXRoLCBhbnN3ZXJGaWxlUGF0aCk7XHJcbn1cclxuXHJcbi8vIGNhbGxDaGlsZFByb2NjZXNzXHJcbmFzeW5jIGZ1bmN0aW9uICBjYWxsQ2hpbGRQcm9jY2Vzcyhjb21tYW5kTGluZTogc3RyaW5nLCAgb3B0aW9uPzogUHJvY2Vzc09wdGlvbik6IFByb21pc2U8UHJvY2Vzc1JldHVybnM+IHtcclxuXHRyZXR1cm4gICBuZXcgUHJvbWlzZSggYXN5bmMgKHJlc29sdmVGdW5jdGlvbiwgcmVqZWN0RnVuY3Rpb24pID0+IHtcclxuXHRcdGNvbnN0ICByZXR1cm5WYWx1ZSA9IG5ldyBQcm9jZXNzUmV0dXJucygpO1xyXG5cdFx0dHJ5IHtcclxuXHRcdFx0Y29uc3QgIGNoaWxkUHJvY2VzcyA9IGNoaWxkX3Byb2Nlc3MuZXhlYyggY29tbWFuZExpbmUsXHJcblxyXG5cdFx0XHRcdC8vIG9uIGNsb3NlIHRoZSBcImNoaWxkUHJvY2Vzc1wiICgyKVxyXG5cdFx0XHRcdChlcnJvcjogY2hpbGRfcHJvY2Vzcy5FeGVjRXhjZXB0aW9uIHwgbnVsbCwgc3Rkb3V0OiBzdHJpbmcsIHN0ZGVycjogc3RyaW5nKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm5WYWx1ZS5zdGRvdXQgPSBzdGRvdXQ7XHJcblx0XHRcdFx0XHRyZXR1cm5WYWx1ZS5zdGRlcnIgPSBzdGRlcnI7XHJcblx0XHRcdFx0XHRyZXNvbHZlRnVuY3Rpb24ocmV0dXJuVmFsdWUpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0KTtcclxuXHRcdFx0aWYgKG9wdGlvbiAmJiBjaGlsZFByb2Nlc3Muc3RkaW4pIHtcclxuXHJcblx0XHRcdFx0aWYgKG9wdGlvbi5pbnB1dExpbmVzKSB7XHJcblx0XHRcdFx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMzAwKSk7XHJcblx0XHRcdFx0XHRmb3IgKGNvbnN0IGlucHV0TGluZSBvZiBvcHRpb24uaW5wdXRMaW5lcykge1xyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZyhpbnB1dExpbmUpO1xyXG5cdFx0XHRcdFx0XHRjaGlsZFByb2Nlc3Muc3RkaW4ud3JpdGUoaW5wdXRMaW5lICsgXCJcXG5cIik7XHJcblx0XHRcdFx0XHRcdGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAyMDApKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2hpbGRQcm9jZXNzLnN0ZGluLmVuZCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBvbiBjbG9zZSB0aGUgXCJjaGlsZFByb2Nlc3NcIiAoMSlcclxuXHRcdFx0Y2hpbGRQcm9jZXNzLm9uKCdjbG9zZScsIChleGl0Q29kZTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuVmFsdWUuZXhpdENvZGUgPSBleGl0Q29kZTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGNoaWxkUHJvY2Vzcy5vbignZXhpdCcsIChleGl0Q29kZTogbnVtYmVyKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuVmFsdWUuZXhpdENvZGUgPSBleGl0Q29kZTtcclxuXHRcdFx0fSk7XHJcblx0XHR9IGNhdGNoIChlKSB7XHJcblx0XHRcdHRocm93IEVycm9yKGBFcnJvciBpbiB0aGUgY29tbWFuZCBsaW5lICR7Y29tbWFuZExpbmV9YCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbi8vIFByb2Nlc3NPcHRpb25cclxuY2xhc3MgUHJvY2Vzc09wdGlvbiB7XHJcblx0aW5wdXRMaW5lcz86IHN0cmluZ1tdO1xyXG59XHJcblxyXG4vLyBQcm9jZXNzUmV0dXJuc1xyXG5jbGFzcyBQcm9jZXNzUmV0dXJucyB7XHJcblx0ZXhpdENvZGU6IG51bWJlciA9IDA7XHJcblx0c3Rkb3V0OiBzdHJpbmcgPSAnJztcclxuXHRzdGRlcnI6IHN0cmluZyA9ICcnO1xyXG59XHJcblxyXG5jb25zdCAgdGVzdEZvbGRlckZ1bGxQYXRoID0gZ2V0RnVsbFBhdGgoIGAuLi9zcmMvJHt0ZXN0Rm9sZGVyUGF0aH1gLCBwcm9jZXNzLmN3ZCgpKTtcclxuY29uc3QgIGN1dEJPTSA9IDE7XHJcbmNvbnN0ICBub3RGb3VuZCA9IC0xO1xyXG5tYWluKCk7XHJcbiJdfQ==