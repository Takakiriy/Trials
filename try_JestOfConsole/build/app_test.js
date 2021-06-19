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
var lib = require("./lib");
var scriptPath = "../build/app.js";
var testFolderPath = "test_data" + path.sep;
var debug = false;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!debug) return [3 /*break*/, 4];
                    return [4 /*yield*/, TestOfFirst()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, TestOfOptions()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, TestOfLocale()];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, TestOfLocale()];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
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
                                "exit()"
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
                        options = 'A  B  --command stdout';
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
// TestOfLocale
function TestOfLocale() {
    return __awaiter(this, void 0, void 0, function () {
        var returns, defaultLocale;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("TestCase: TestOfLocale >> default");
                    return [4 /*yield*/, callChildProccess("node " + scriptPath + " --command  show-locale")];
                case 1:
                    returns = _a.sent();
                    defaultLocale = Intl.NumberFormat().resolvedOptions().locale;
                    if (returns.stdout !== defaultLocale + '\n') {
                        throw new Error();
                    }
                    console.log("TestCase: TestOfLocale >> fr-FR");
                    return [4 /*yield*/, callChildProccess("node " + scriptPath + " --command  show-locale --locale fr-FR")];
                case 2:
                    returns = _a.sent();
                    if (returns.stdout !== 'fr-FR\n') {
                        throw new Error();
                    }
                    return [2 /*return*/];
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
var testFolderFullPath = lib.getFullPath("../src/" + testFolderPath, process.cwd());
var cutBOM = 1;
var notFound = -1;
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1QkFBeUI7QUFDekIsNkNBQStDO0FBQy9DLDJCQUE2QjtBQUM3QiwyQkFBNkI7QUFFN0IsSUFBTyxVQUFVLEdBQUksaUJBQWlCLENBQUM7QUFDdkMsSUFBTyxjQUFjLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7QUFFL0MsSUFBTyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBRXJCLFNBQWdCLElBQUk7Ozs7O3lCQUNaLENBQUMsS0FBSyxFQUFOLHdCQUFNO29CQUNOLHFCQUFNLFdBQVcsRUFBRSxFQUFBOztvQkFBbkIsU0FBbUIsQ0FBQztvQkFDcEIscUJBQU0sYUFBYSxFQUFFLEVBQUE7O29CQUFyQixTQUFxQixDQUFDO29CQUN0QixxQkFBTSxZQUFZLEVBQUUsRUFBQTs7b0JBQXBCLFNBQW9CLENBQUM7O3dCQUVyQixxQkFBTSxZQUFZLEVBQUUsRUFBQTs7b0JBQXBCLFNBQW9CLENBQUM7OztvQkFFNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Q0FDcEI7QUFFRCxjQUFjO0FBQ2QsU0FBZ0IsV0FBVzs7Ozs7O29CQUd2QixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7b0JBRzNCLHFCQUFNLGlCQUFpQixDQUFDLFVBQVEsVUFBVSwyQkFBd0IsRUFDeEUsRUFBQyxVQUFVLEVBQUU7Z0NBQ1QsUUFBUTs2QkFDWCxFQUFDLENBQ0wsRUFBQTs7b0JBTEQsWUFBWTtvQkFDWixPQUFPLEdBQUcsU0FJVCxDQUFDO29CQUNLLE1BQU0sR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLGNBQWMsR0FBRywyQkFBMkIsQ0FBQzt5QkFDeEUsUUFBUSxFQUFFLENBQUMsTUFBTSxDQUFDLE1B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LEdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBRUQsSUFBTyxrQkFBa0IsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFFLFlBQVUsY0FBZ0IsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUN4RixJQUFPLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDbEIsSUFBTyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDckIsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIGNoaWxkX3Byb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCAqIGFzIGxpYiBmcm9tICcuL2xpYic7XHJcblxyXG5jb25zdCAgc2NyaXB0UGF0aCA9ICBgLi4vYnVpbGQvYXBwLmpzYDtcclxuY29uc3QgIHRlc3RGb2xkZXJQYXRoID0gYHRlc3RfZGF0YWAgKyBwYXRoLnNlcDtcclxuXHJcbmNvbnN0ICBkZWJ1ZyA9IGZhbHNlO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gIG1haW4oKSB7XHJcbiAgICBpZiAoIWRlYnVnKSB7XHJcbiAgICAgICAgYXdhaXQgVGVzdE9mRmlyc3QoKTtcclxuICAgICAgICBhd2FpdCBUZXN0T2ZPcHRpb25zKCk7XHJcbiAgICAgICAgYXdhaXQgVGVzdE9mTG9jYWxlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF3YWl0IFRlc3RPZkxvY2FsZSgpO1xyXG4gICAgfVxyXG5cdGNvbnNvbGUubG9nKCdQYXNzJyk7XHJcbn1cclxuXHJcbi8vIFRlc3RPZkZpcnN0XHJcbmFzeW5jIGZ1bmN0aW9uICBUZXN0T2ZGaXJzdCgpIHtcclxuXHRsZXQgIHJldHVybnM6IFByb2Nlc3NSZXR1cm5zO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBUZXN0Q2FzZTogVGVzdE9mRmlyc3RgKTtcclxuXHJcbiAgICAvLyBUZXN0IE1haW5cclxuICAgIHJldHVybnMgPSBhd2FpdCBjYWxsQ2hpbGRQcm9jY2Vzcyhgbm9kZSAke3NjcmlwdFBhdGh9IC0tdGVzdCAtLWxvY2FsZSBlbi1VU2AsXHJcbiAgICAgICAge2lucHV0TGluZXM6IFtcclxuICAgICAgICAgICAgXCJleGl0KClcIlxyXG4gICAgICAgIF19XHJcbiAgICApO1xyXG4gICAgY29uc3QgIGFuc3dlciA9IGZzLnJlYWRGaWxlU3luYyh0ZXN0Rm9sZGVyUGF0aCArIFwiMV9maXJzdF8xX29rXzFfYW5zd2VyLnR4dFwiKVxyXG4gICAgICAgIC50b1N0cmluZygpLnN1YnN0cihjdXRCT00pO1xyXG5cclxuICAgIC8vIENoZWNrXHJcbiAgICBpZiAocmV0dXJucy5zdGRvdXQgIT09IGFuc3dlcikge1xyXG4gICAgICAgIHByaW50RGlmZmVyZW50UGF0aHMoYF9vdXRwdXQudHh0YCwgJzFfZmlyc3RfMV9va18xX2Fuc3dlci50eHQnKTtcclxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKHRlc3RGb2xkZXJQYXRoICsgXCJfb3V0cHV0LnR4dFwiLCByZXR1cm5zLnN0ZG91dCk7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFRlc3RPZk9wdGlvbnNcclxuYXN5bmMgZnVuY3Rpb24gIFRlc3RPZk9wdGlvbnMoKSB7XHJcblx0bGV0ICByZXR1cm5zOiBQcm9jZXNzUmV0dXJucztcclxuXHJcblx0Y29uc3QgZmlsZU5hbWVIZWFkcyA9IFtcclxuXHRcdFwiMl9vcHRpb25zXzFfY29tbWFuZFwiLFxyXG5cdFx0XCIyX29wdGlvbnNfMl9pbnB1dFwiLFxyXG5cdF07XHJcblx0Zm9yIChjb25zdCBmaWxlTmFtZUhlYWQgb2YgZmlsZU5hbWVIZWFkcykge1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKGBUZXN0Q2FzZTogVGVzdE9mT3B0aW9ucyA+PiAke2ZpbGVOYW1lSGVhZH1gKTtcclxuICAgICAgICBpZiAoZmlsZU5hbWVIZWFkID09PSAnMl9vcHRpb25zXzFfY29tbWFuZCcpIHtcclxuICAgICAgICAgICAgdmFyICBvcHRpb25zID0gJ0EgIEIgIC0tY29tbWFuZCBzdGRvdXQnO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciAgb3B0aW9ucyA9ICctLWlucHV0JztcclxuICAgICAgICB9XHJcblxyXG5cdFx0Ly8gVGVzdCBNYWluXHJcblx0XHRyZXR1cm5zID0gYXdhaXQgY2FsbENoaWxkUHJvY2Nlc3MoYG5vZGUgJHtzY3JpcHRQYXRofSAtLXRlc3QgJHtvcHRpb25zfWAsXHJcblx0XHRcdHtpbnB1dExpbmVzOiBbXHJcblx0XHRcdFx0XCJJbnB1dFwiXHJcblx0XHRcdF19XHJcblx0XHQpO1xyXG5cdFx0Y29uc3QgIGFuc3dlciA9IGZzLnJlYWRGaWxlU3luYyh0ZXN0Rm9sZGVyUGF0aCArIGZpbGVOYW1lSGVhZCArIFwiXzFfYW5zd2VyLnR4dFwiKVxyXG5cdFx0XHQudG9TdHJpbmcoKS5zdWJzdHIoY3V0Qk9NKTtcclxuXHJcblx0XHQvLyBDaGVja1xyXG5cdFx0aWYgKHJldHVybnMuc3Rkb3V0ICE9PSBhbnN3ZXIpIHtcclxuXHRcdFx0cHJpbnREaWZmZXJlbnRQYXRocyhgX291dHB1dC50eHRgLCBmaWxlTmFtZUhlYWQgKyAnXzFfYW5zd2VyLnR4dCcpO1xyXG5cdFx0XHRmcy53cml0ZUZpbGVTeW5jKHRlc3RGb2xkZXJQYXRoICsgXCJfb3V0cHV0LnR4dFwiLCByZXR1cm5zLnN0ZG91dCk7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcigpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLy8gVGVzdE9mTG9jYWxlXHJcbmFzeW5jIGZ1bmN0aW9uICBUZXN0T2ZMb2NhbGUoKSB7XHJcblx0bGV0ICByZXR1cm5zOiBQcm9jZXNzUmV0dXJucztcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgVGVzdENhc2U6IFRlc3RPZkxvY2FsZSA+PiBkZWZhdWx0YCk7XHJcbiAgICByZXR1cm5zID0gYXdhaXQgY2FsbENoaWxkUHJvY2Nlc3MoYG5vZGUgJHtzY3JpcHRQYXRofSAtLWNvbW1hbmQgIHNob3ctbG9jYWxlYCk7XHJcblx0Y29uc3QgIGRlZmF1bHRMb2NhbGUgPSBJbnRsLk51bWJlckZvcm1hdCgpLnJlc29sdmVkT3B0aW9ucygpLmxvY2FsZTtcclxuICAgIGlmIChyZXR1cm5zLnN0ZG91dCAhPT0gZGVmYXVsdExvY2FsZSArJ1xcbicpIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhgVGVzdENhc2U6IFRlc3RPZkxvY2FsZSA+PiBmci1GUmApO1xyXG4gICAgcmV0dXJucyA9IGF3YWl0IGNhbGxDaGlsZFByb2NjZXNzKGBub2RlICR7c2NyaXB0UGF0aH0gLS1jb21tYW5kICBzaG93LWxvY2FsZSAtLWxvY2FsZSBmci1GUmApO1xyXG4gICAgaWYgKHJldHVybnMuc3Rkb3V0ICE9PSAnZnItRlJcXG4nKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGRlbGV0ZUZpbGVcclxuZnVuY3Rpb24gIGRlbGV0ZUZpbGUocGF0aDogc3RyaW5nKSB7XHJcbiAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoKSkge1xyXG4gICAgICAgIGZzLnVubGlua1N5bmMocGF0aCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIHByaW50RGlmZmVyZW50UGF0aHNcclxuZnVuY3Rpb24gIHByaW50RGlmZmVyZW50UGF0aHMocGF0aDE6IHN0cmluZywgcGF0aDI6IHN0cmluZykge1xyXG5cdGNvbnNvbGUubG9nKGBFcnJvcjogZGlmZmVyZW50IGJldHdlZW4gdGhlIGZvbGxvd2luZyBmaWxlc2ApO1xyXG5cdGNvbnNvbGUubG9nKGAgIFBhdGgxOiAke3Rlc3RGb2xkZXJGdWxsUGF0aCArIHBhdGgxfWApO1xyXG5cdGNvbnNvbGUubG9nKGAgIFBhdGgyOiAke3Rlc3RGb2xkZXJGdWxsUGF0aCArIHBhdGgyfWApO1xyXG59XHJcblxyXG4vLyBkaWZmU3RyaW5nc1xyXG5mdW5jdGlvbiAgZGlmZlN0cmluZ3MocmVzdWx0OiBzdHJpbmcsIGFuc3dlcjogc3RyaW5nKSB7XHJcblx0Y29uc3QgIHJlc3VsdEZpbGVQYXRoID0gJ19vdXRwdXQudHh0JztcclxuXHRjb25zdCAgYW5zd2VyRmlsZVBhdGggPSAnX2Fuc3dlci50eHQnO1xyXG5cclxuXHRmcy53cml0ZUZpbGVTeW5jKHRlc3RGb2xkZXJGdWxsUGF0aCArIHJlc3VsdEZpbGVQYXRoLCByZXN1bHQpO1xyXG5cdGZzLndyaXRlRmlsZVN5bmModGVzdEZvbGRlckZ1bGxQYXRoICsgYW5zd2VyRmlsZVBhdGgsIGFuc3dlcik7XHJcblxyXG5cdHByaW50RGlmZmVyZW50UGF0aHMocmVzdWx0RmlsZVBhdGgsIGFuc3dlckZpbGVQYXRoKTtcclxufVxyXG5cclxuLy8gY2FsbENoaWxkUHJvY2Nlc3NcclxuYXN5bmMgZnVuY3Rpb24gIGNhbGxDaGlsZFByb2NjZXNzKGNvbW1hbmRMaW5lOiBzdHJpbmcsICBvcHRpb24/OiBQcm9jZXNzT3B0aW9uKTogUHJvbWlzZTxQcm9jZXNzUmV0dXJucz4ge1xyXG5cdHJldHVybiAgIG5ldyBQcm9taXNlKCBhc3luYyAocmVzb2x2ZUZ1bmN0aW9uLCByZWplY3RGdW5jdGlvbikgPT4ge1xyXG5cdFx0Y29uc3QgIHJldHVyblZhbHVlID0gbmV3IFByb2Nlc3NSZXR1cm5zKCk7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCAgY2hpbGRQcm9jZXNzID0gY2hpbGRfcHJvY2Vzcy5leGVjKCBjb21tYW5kTGluZSxcclxuXHJcblx0XHRcdFx0Ly8gb24gY2xvc2UgdGhlIFwiY2hpbGRQcm9jZXNzXCIgKDIpXHJcblx0XHRcdFx0KGVycm9yOiBjaGlsZF9wcm9jZXNzLkV4ZWNFeGNlcHRpb24gfCBudWxsLCBzdGRvdXQ6IHN0cmluZywgc3RkZXJyOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRcdHJldHVyblZhbHVlLnN0ZG91dCA9IHN0ZG91dDtcclxuXHRcdFx0XHRcdHJldHVyblZhbHVlLnN0ZGVyciA9IHN0ZGVycjtcclxuXHRcdFx0XHRcdHJlc29sdmVGdW5jdGlvbihyZXR1cm5WYWx1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAob3B0aW9uICYmIGNoaWxkUHJvY2Vzcy5zdGRpbikge1xyXG5cclxuXHRcdFx0XHRpZiAob3B0aW9uLmlucHV0TGluZXMpIHtcclxuXHRcdFx0XHRcdGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAzMDApKTtcclxuXHRcdFx0XHRcdGZvciAoY29uc3QgaW5wdXRMaW5lIG9mIG9wdGlvbi5pbnB1dExpbmVzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGlucHV0TGluZSk7XHJcblx0XHRcdFx0XHRcdGNoaWxkUHJvY2Vzcy5zdGRpbi53cml0ZShpbnB1dExpbmUgKyBcIlxcblwiKTtcclxuXHRcdFx0XHRcdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMCkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjaGlsZFByb2Nlc3Muc3RkaW4uZW5kKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIG9uIGNsb3NlIHRoZSBcImNoaWxkUHJvY2Vzc1wiICgxKVxyXG5cdFx0XHRjaGlsZFByb2Nlc3Mub24oJ2Nsb3NlJywgKGV4aXRDb2RlOiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHRyZXR1cm5WYWx1ZS5leGl0Q29kZSA9IGV4aXRDb2RlO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Y2hpbGRQcm9jZXNzLm9uKCdleGl0JywgKGV4aXRDb2RlOiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHRyZXR1cm5WYWx1ZS5leGl0Q29kZSA9IGV4aXRDb2RlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0dGhyb3cgRXJyb3IoYEVycm9yIGluIHRoZSBjb21tYW5kIGxpbmUgJHtjb21tYW5kTGluZX1gKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuLy8gUHJvY2Vzc09wdGlvblxyXG5jbGFzcyBQcm9jZXNzT3B0aW9uIHtcclxuXHRpbnB1dExpbmVzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbi8vIFByb2Nlc3NSZXR1cm5zXHJcbmNsYXNzIFByb2Nlc3NSZXR1cm5zIHtcclxuXHRleGl0Q29kZTogbnVtYmVyID0gMDtcclxuXHRzdGRvdXQ6IHN0cmluZyA9ICcnO1xyXG5cdHN0ZGVycjogc3RyaW5nID0gJyc7XHJcbn1cclxuXHJcbmNvbnN0ICB0ZXN0Rm9sZGVyRnVsbFBhdGggPSBsaWIuZ2V0RnVsbFBhdGgoIGAuLi9zcmMvJHt0ZXN0Rm9sZGVyUGF0aH1gLCBwcm9jZXNzLmN3ZCgpKTtcclxuY29uc3QgIGN1dEJPTSA9IDE7XHJcbmNvbnN0ICBub3RGb3VuZCA9IC0xO1xyXG5tYWluKCk7XHJcbiJdfQ==