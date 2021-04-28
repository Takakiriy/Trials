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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1QkFBeUI7QUFDekIsNkNBQStDO0FBQy9DLDJCQUE2QjtBQUU3QixJQUFPLFVBQVUsR0FBSSxpQkFBaUIsQ0FBQztBQUN2QyxJQUFPLGNBQWMsR0FBRyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUUvQyxJQUFPLEtBQUssR0FBRyxLQUFLLENBQUM7QUFFckIsU0FBZ0IsSUFBSTs7Ozs7eUJBQ1osQ0FBQyxLQUFLLEVBQU4sd0JBQU07b0JBQ04scUJBQU0sV0FBVyxFQUFFLEVBQUE7O29CQUFuQixTQUFtQixDQUFDO29CQUNwQixxQkFBTSxhQUFhLEVBQUUsRUFBQTs7b0JBQXJCLFNBQXFCLENBQUM7b0JBQ3RCLHFCQUFNLFlBQVksRUFBRSxFQUFBOztvQkFBcEIsU0FBb0IsQ0FBQzs7d0JBRXJCLHFCQUFNLFlBQVksRUFBRSxFQUFBOztvQkFBcEIsU0FBb0IsQ0FBQzs7O29CQUU1QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7OztDQUNwQjtBQUVELGNBQWM7QUFDZCxTQUFnQixXQUFXOzs7Ozs7b0JBR3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFHM0IscUJBQU0saUJBQWlCLENBQUMsVUFBUSxVQUFVLDJCQUF3QixFQUN4RSxFQUFDLFVBQVUsRUFBRTtnQ0FDVCxNQUFNOzZCQUNULEVBQUMsQ0FDTCxFQUFBOztvQkFMRCxZQUFZO29CQUNaLE9BQU8sR0FBRyxTQUlULENBQUM7b0JBQ0ssTUFBTSxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsY0FBYyxHQUFHLDJCQUEyQixDQUFDO3lCQUN4RSxRQUFRLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7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QyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dDQUNqQyxDQUFDLENBQUMsQ0FBQzs7OztnQ0FFSCxNQUFNLEtBQUssQ0FBQywrQkFBNkIsV0FBYSxDQUFDLENBQUM7Ozs7cUJBRXpELENBQUMsRUFBQzs7O0NBQ0g7QUFFRCxnQkFBZ0I7QUFDaEI7SUFBQTtJQUVBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRUQsaUJBQWlCO0FBQ2pCO0lBQUE7UUFDQyxhQUFRLEdBQVcsQ0FBQyxDQUFDO1FBQ3JCLFdBQU0sR0FBVyxFQUFFLENBQUM7UUFDcEIsV0FBTSxHQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUVELElBQU8sa0JBQWtCLEdBQUcsV0FBVyxDQUFFLFlBQVUsY0FBZ0IsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUNwRixJQUFPLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDbEIsSUFBTyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDckIsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCAqIGFzIGNoaWxkX3Byb2Nlc3MgZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5jb25zdCAgc2NyaXB0UGF0aCA9ICBgLi4vYnVpbGQvYXBwLmpzYDtcclxuY29uc3QgIHRlc3RGb2xkZXJQYXRoID0gYHRlc3RfZGF0YWAgKyBwYXRoLnNlcDtcclxuXHJcbmNvbnN0ICBkZWJ1ZyA9IGZhbHNlO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gIG1haW4oKSB7XHJcbiAgICBpZiAoIWRlYnVnKSB7XHJcbiAgICAgICAgYXdhaXQgVGVzdE9mRmlyc3QoKTtcclxuICAgICAgICBhd2FpdCBUZXN0T2ZPcHRpb25zKCk7XHJcbiAgICAgICAgYXdhaXQgVGVzdE9mTG9jYWxlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGF3YWl0IFRlc3RPZkxvY2FsZSgpO1xyXG4gICAgfVxyXG5cdGNvbnNvbGUubG9nKCdQYXNzJyk7XHJcbn1cclxuXHJcbi8vIFRlc3RPZkZpcnN0XHJcbmFzeW5jIGZ1bmN0aW9uICBUZXN0T2ZGaXJzdCgpIHtcclxuXHRsZXQgIHJldHVybnM6IFByb2Nlc3NSZXR1cm5zO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBUZXN0Q2FzZTogVGVzdE9mRmlyc3RgKTtcclxuXHJcbiAgICAvLyBUZXN0IE1haW5cclxuICAgIHJldHVybnMgPSBhd2FpdCBjYWxsQ2hpbGRQcm9jY2Vzcyhgbm9kZSAke3NjcmlwdFBhdGh9IC0tdGVzdCAtLWxvY2FsZSBlbi1VU2AsXHJcbiAgICAgICAge2lucHV0TGluZXM6IFtcclxuICAgICAgICAgICAgXCJleGl0XCJcclxuICAgICAgICBdfVxyXG4gICAgKTtcclxuICAgIGNvbnN0ICBhbnN3ZXIgPSBmcy5yZWFkRmlsZVN5bmModGVzdEZvbGRlclBhdGggKyBcIjFfZmlyc3RfMV9va18xX2Fuc3dlci50eHRcIilcclxuICAgICAgICAudG9TdHJpbmcoKS5zdWJzdHIoY3V0Qk9NKTtcclxuXHJcbiAgICAvLyBDaGVja1xyXG4gICAgaWYgKHJldHVybnMuc3Rkb3V0ICE9PSBhbnN3ZXIpIHtcclxuICAgICAgICBwcmludERpZmZlcmVudFBhdGhzKGBfb3V0cHV0LnR4dGAsICcxX2ZpcnN0XzFfb2tfMV9hbnN3ZXIudHh0Jyk7XHJcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyh0ZXN0Rm9sZGVyUGF0aCArIFwiX291dHB1dC50eHRcIiwgcmV0dXJucy5zdGRvdXQpO1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBUZXN0T2ZPcHRpb25zXHJcbmFzeW5jIGZ1bmN0aW9uICBUZXN0T2ZPcHRpb25zKCkge1xyXG5cdGxldCAgcmV0dXJuczogUHJvY2Vzc1JldHVybnM7XHJcblxyXG5cdGNvbnN0IGZpbGVOYW1lSGVhZHMgPSBbXHJcblx0XHRcIjJfb3B0aW9uc18xX2NvbW1hbmRcIixcclxuXHRcdFwiMl9vcHRpb25zXzJfaW5wdXRcIixcclxuXHRdO1xyXG5cdGZvciAoY29uc3QgZmlsZU5hbWVIZWFkIG9mIGZpbGVOYW1lSGVhZHMpIHtcclxuXHJcblx0XHRjb25zb2xlLmxvZyhgVGVzdENhc2U6IFRlc3RPZk9wdGlvbnMgPj4gJHtmaWxlTmFtZUhlYWR9YCk7XHJcbiAgICAgICAgaWYgKGZpbGVOYW1lSGVhZCA9PT0gJzJfb3B0aW9uc18xX2NvbW1hbmQnKSB7XHJcbiAgICAgICAgICAgIHZhciAgb3B0aW9ucyA9ICdBICBCICAtLWNvbW1hbmQgc3Rkb3V0JztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgIG9wdGlvbnMgPSAnLS1pbnB1dCc7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdC8vIFRlc3QgTWFpblxyXG5cdFx0cmV0dXJucyA9IGF3YWl0IGNhbGxDaGlsZFByb2NjZXNzKGBub2RlICR7c2NyaXB0UGF0aH0gLS10ZXN0ICR7b3B0aW9uc31gLFxyXG5cdFx0XHR7aW5wdXRMaW5lczogW1xyXG5cdFx0XHRcdFwiSW5wdXRcIlxyXG5cdFx0XHRdfVxyXG5cdFx0KTtcclxuXHRcdGNvbnN0ICBhbnN3ZXIgPSBmcy5yZWFkRmlsZVN5bmModGVzdEZvbGRlclBhdGggKyBmaWxlTmFtZUhlYWQgKyBcIl8xX2Fuc3dlci50eHRcIilcclxuXHRcdFx0LnRvU3RyaW5nKCkuc3Vic3RyKGN1dEJPTSk7XHJcblxyXG5cdFx0Ly8gQ2hlY2tcclxuXHRcdGlmIChyZXR1cm5zLnN0ZG91dCAhPT0gYW5zd2VyKSB7XHJcblx0XHRcdHByaW50RGlmZmVyZW50UGF0aHMoYF9vdXRwdXQudHh0YCwgZmlsZU5hbWVIZWFkICsgJ18xX2Fuc3dlci50eHQnKTtcclxuXHRcdFx0ZnMud3JpdGVGaWxlU3luYyh0ZXN0Rm9sZGVyUGF0aCArIFwiX291dHB1dC50eHRcIiwgcmV0dXJucy5zdGRvdXQpO1xyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8vIFRlc3RPZkxvY2FsZVxyXG5hc3luYyBmdW5jdGlvbiAgVGVzdE9mTG9jYWxlKCkge1xyXG5cdGxldCAgcmV0dXJuczogUHJvY2Vzc1JldHVybnM7XHJcblxyXG4gICAgY29uc29sZS5sb2coYFRlc3RDYXNlOiBUZXN0T2ZMb2NhbGUgPj4gZGVmYXVsdGApO1xyXG4gICAgcmV0dXJucyA9IGF3YWl0IGNhbGxDaGlsZFByb2NjZXNzKGBub2RlICR7c2NyaXB0UGF0aH0gLS1jb21tYW5kICBzaG93LWxvY2FsZWApO1xyXG5cdGNvbnN0ICBkZWZhdWx0TG9jYWxlID0gSW50bC5OdW1iZXJGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS5sb2NhbGU7XHJcbiAgICBpZiAocmV0dXJucy5zdGRvdXQgIT09IGRlZmF1bHRMb2NhbGUgKydcXG4nKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc29sZS5sb2coYFRlc3RDYXNlOiBUZXN0T2ZMb2NhbGUgPj4gZnItRlJgKTtcclxuICAgIHJldHVybnMgPSBhd2FpdCBjYWxsQ2hpbGRQcm9jY2Vzcyhgbm9kZSAke3NjcmlwdFBhdGh9IC0tY29tbWFuZCAgc2hvdy1sb2NhbGUgLS1sb2NhbGUgZnItRlJgKTtcclxuICAgIGlmIChyZXR1cm5zLnN0ZG91dCAhPT0gJ2ZyLUZSXFxuJykge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcigpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBkZWxldGVGaWxlXHJcbmZ1bmN0aW9uICBkZWxldGVGaWxlKHBhdGg6IHN0cmluZykge1xyXG4gICAgaWYgKGZzLmV4aXN0c1N5bmMocGF0aCkpIHtcclxuICAgICAgICBmcy51bmxpbmtTeW5jKHBhdGgpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBnZXRGdWxsUGF0aFxyXG5mdW5jdGlvbiAgZ2V0RnVsbFBhdGgocmVsYXRpdmVQYXRoOiBzdHJpbmcsIGJhc2VQYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdHZhciAgZnVsbFBhdGggPSAnJztcclxuXHRpZiAocmVsYXRpdmVQYXRoLnN1YnN0cigwLDEpID09PSAnLycpIHtcclxuXHRcdGZ1bGxQYXRoID0gcmVsYXRpdmVQYXRoO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRmdWxsUGF0aCA9IHBhdGguam9pbihiYXNlUGF0aCwgcmVsYXRpdmVQYXRoKTtcclxuXHR9XHJcblx0cmV0dXJuICBmdWxsUGF0aDtcclxufVxyXG5cclxuLy8gcHJpbnREaWZmZXJlbnRQYXRoc1xyXG5mdW5jdGlvbiAgcHJpbnREaWZmZXJlbnRQYXRocyhwYXRoMTogc3RyaW5nLCBwYXRoMjogc3RyaW5nKSB7XHJcblx0Y29uc29sZS5sb2coYEVycm9yOiBkaWZmZXJlbnQgYmV0d2VlbiB0aGUgZm9sbG93aW5nIGZpbGVzYCk7XHJcblx0Y29uc29sZS5sb2coYCAgUGF0aDE6ICR7dGVzdEZvbGRlckZ1bGxQYXRoICsgcGF0aDF9YCk7XHJcblx0Y29uc29sZS5sb2coYCAgUGF0aDI6ICR7dGVzdEZvbGRlckZ1bGxQYXRoICsgcGF0aDJ9YCk7XHJcbn1cclxuXHJcbi8vIGRpZmZTdHJpbmdzXHJcbmZ1bmN0aW9uICBkaWZmU3RyaW5ncyhyZXN1bHQ6IHN0cmluZywgYW5zd2VyOiBzdHJpbmcpIHtcclxuXHRjb25zdCAgcmVzdWx0RmlsZVBhdGggPSAnX291dHB1dC50eHQnO1xyXG5cdGNvbnN0ICBhbnN3ZXJGaWxlUGF0aCA9ICdfYW5zd2VyLnR4dCc7XHJcblxyXG5cdGZzLndyaXRlRmlsZVN5bmModGVzdEZvbGRlckZ1bGxQYXRoICsgcmVzdWx0RmlsZVBhdGgsIHJlc3VsdCk7XHJcblx0ZnMud3JpdGVGaWxlU3luYyh0ZXN0Rm9sZGVyRnVsbFBhdGggKyBhbnN3ZXJGaWxlUGF0aCwgYW5zd2VyKTtcclxuXHJcblx0cHJpbnREaWZmZXJlbnRQYXRocyhyZXN1bHRGaWxlUGF0aCwgYW5zd2VyRmlsZVBhdGgpO1xyXG59XHJcblxyXG4vLyBjYWxsQ2hpbGRQcm9jY2Vzc1xyXG5hc3luYyBmdW5jdGlvbiAgY2FsbENoaWxkUHJvY2Nlc3MoY29tbWFuZExpbmU6IHN0cmluZywgIG9wdGlvbj86IFByb2Nlc3NPcHRpb24pOiBQcm9taXNlPFByb2Nlc3NSZXR1cm5zPiB7XHJcblx0cmV0dXJuICAgbmV3IFByb21pc2UoIGFzeW5jIChyZXNvbHZlRnVuY3Rpb24sIHJlamVjdEZ1bmN0aW9uKSA9PiB7XHJcblx0XHRjb25zdCAgcmV0dXJuVmFsdWUgPSBuZXcgUHJvY2Vzc1JldHVybnMoKTtcclxuXHRcdHRyeSB7XHJcblx0XHRcdGNvbnN0ICBjaGlsZFByb2Nlc3MgPSBjaGlsZF9wcm9jZXNzLmV4ZWMoIGNvbW1hbmRMaW5lLFxyXG5cclxuXHRcdFx0XHQvLyBvbiBjbG9zZSB0aGUgXCJjaGlsZFByb2Nlc3NcIiAoMilcclxuXHRcdFx0XHQoZXJyb3I6IGNoaWxkX3Byb2Nlc3MuRXhlY0V4Y2VwdGlvbiB8IG51bGwsIHN0ZG91dDogc3RyaW5nLCBzdGRlcnI6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuVmFsdWUuc3Rkb3V0ID0gc3Rkb3V0O1xyXG5cdFx0XHRcdFx0cmV0dXJuVmFsdWUuc3RkZXJyID0gc3RkZXJyO1xyXG5cdFx0XHRcdFx0cmVzb2x2ZUZ1bmN0aW9uKHJldHVyblZhbHVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdCk7XHJcblx0XHRcdGlmIChvcHRpb24gJiYgY2hpbGRQcm9jZXNzLnN0ZGluKSB7XHJcblxyXG5cdFx0XHRcdGlmIChvcHRpb24uaW5wdXRMaW5lcykge1xyXG5cdFx0XHRcdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDMwMCkpO1xyXG5cdFx0XHRcdFx0Zm9yIChjb25zdCBpbnB1dExpbmUgb2Ygb3B0aW9uLmlucHV0TGluZXMpIHtcclxuXHRcdFx0XHRcdFx0Y29uc29sZS5sb2coaW5wdXRMaW5lKTtcclxuXHRcdFx0XHRcdFx0Y2hpbGRQcm9jZXNzLnN0ZGluLndyaXRlKGlucHV0TGluZSArIFwiXFxuXCIpO1xyXG5cdFx0XHRcdFx0XHRhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjAwKSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNoaWxkUHJvY2Vzcy5zdGRpbi5lbmQoKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Ly8gb24gY2xvc2UgdGhlIFwiY2hpbGRQcm9jZXNzXCIgKDEpXHJcblx0XHRcdGNoaWxkUHJvY2Vzcy5vbignY2xvc2UnLCAoZXhpdENvZGU6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdHJldHVyblZhbHVlLmV4aXRDb2RlID0gZXhpdENvZGU7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRjaGlsZFByb2Nlc3Mub24oJ2V4aXQnLCAoZXhpdENvZGU6IG51bWJlcikgPT4ge1xyXG5cdFx0XHRcdHJldHVyblZhbHVlLmV4aXRDb2RlID0gZXhpdENvZGU7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSBjYXRjaCAoZSkge1xyXG5cdFx0XHR0aHJvdyBFcnJvcihgRXJyb3IgaW4gdGhlIGNvbW1hbmQgbGluZSAke2NvbW1hbmRMaW5lfWApO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vLyBQcm9jZXNzT3B0aW9uXHJcbmNsYXNzIFByb2Nlc3NPcHRpb24ge1xyXG5cdGlucHV0TGluZXM/OiBzdHJpbmdbXTtcclxufVxyXG5cclxuLy8gUHJvY2Vzc1JldHVybnNcclxuY2xhc3MgUHJvY2Vzc1JldHVybnMge1xyXG5cdGV4aXRDb2RlOiBudW1iZXIgPSAwO1xyXG5cdHN0ZG91dDogc3RyaW5nID0gJyc7XHJcblx0c3RkZXJyOiBzdHJpbmcgPSAnJztcclxufVxyXG5cclxuY29uc3QgIHRlc3RGb2xkZXJGdWxsUGF0aCA9IGdldEZ1bGxQYXRoKCBgLi4vc3JjLyR7dGVzdEZvbGRlclBhdGh9YCwgcHJvY2Vzcy5jd2QoKSk7XHJcbmNvbnN0ICBjdXRCT00gPSAxO1xyXG5jb25zdCAgbm90Rm91bmQgPSAtMTtcclxubWFpbigpO1xyXG4iXX0=