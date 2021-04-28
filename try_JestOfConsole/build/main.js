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
exports.__esModule = true;
exports.programOptions = exports.stdout = exports.callMainFromJest = exports.InputObject = exports.main = void 0;
var path = require("path"); // or path = require("path")
var readline = require("readline");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!('command' in exports.programOptions)) return [3 /*break*/, 1];
                    if (exports.programOptions.command === 'stdout') {
                        println('ABC');
                        println('DE');
                    }
                    return [3 /*break*/, 4];
                case 1:
                    if (!('input' in exports.programOptions)) return [3 /*break*/, 3];
                    return [4 /*yield*/, input('input>')];
                case 2:
                    key = _a.sent();
                    println(key);
                    return [3 /*break*/, 4];
                case 3:
                    println('main');
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.main = main;
function add(a, b) {
    return a + b;
}
// println
function println(message) {
    if (withJest) {
        exports.stdout += message.toString() + '\n';
    }
    else {
        console.log(message);
    }
}
// StandardInputBuffer
var StandardInputBuffer = /** @class */ (function () {
    function StandardInputBuffer() {
        var _this = this;
        this.inputBuffer = [];
        this.inputResolver = undefined;
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
    }
    StandardInputBuffer.prototype.input = function (guide) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
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
        this.readlines.close();
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
    testBaseFolder +`change_set_.yaml`,
    String.raw `file`,
    testBaseFolder +`change_set_setting.yaml`,
    String.raw `Changed`,
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
            return [2 /*return*/, exports.InputObject.input(guide)];
        });
    });
}
exports.InputObject = new StandardInputBuffer();
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
                    return [2 /*return*/, pathResolve(key)];
            }
        });
    });
}
// pathResolve
function pathResolve(path_) {
    // '/c/home' format to current OS format
    if (path_.length >= 3) {
        if (path_[0] === '/' && path_[2] === '/') {
            path_ = path_[1] + ':' + path_.substr(2);
        }
    }
    // Change separators to OS format
    path_ = path.resolve(path_);
    return path_;
}
// callMainFromJest
function callMainFromJest(options) {
    withJest = true;
    exports.stdout = '';
    if (options) {
        exports.programOptions = options;
    }
    else {
        exports.programOptions = {};
    }
    main();
}
exports.callMainFromJest = callMainFromJest;
var withJest = false;
exports.stdout = '';
exports.programOptions = {};
var templateObject_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyQkFBNkIsQ0FBRSw0QkFBNEI7QUFFM0QsbUNBQXFDO0FBRXJDLFNBQXVCLElBQUk7Ozs7Ozt5QkFDbkIsQ0FBQSxTQUFTLElBQUksc0JBQWMsQ0FBQSxFQUEzQix3QkFBMkI7b0JBQzNCLElBQUksc0JBQWMsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO3dCQUNyQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ2YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNqQjs7O3lCQUNNLENBQUEsT0FBTyxJQUFJLHNCQUFjLENBQUEsRUFBekIsd0JBQXlCO29CQUNuQixxQkFBTSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUE7O29CQUEzQixHQUFHLEdBQUcsU0FBcUI7b0JBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O29CQUViLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7O0NBRXZCO0FBWkQsb0JBWUM7QUFFRCxTQUFVLEdBQUcsQ0FBQyxDQUFTLEVBQUUsQ0FBUztJQUM5QixPQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEIsQ0FBQztBQUVELFVBQVU7QUFDVixTQUFVLE9BQU8sQ0FBQyxPQUFZO0lBQzdCLElBQUksUUFBUSxFQUFFO1FBQ2IsY0FBTSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDcEM7U0FBTTtRQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDckI7QUFDRixDQUFDO0FBRUQsc0JBQXNCO0FBQ3RCO0lBS0M7UUFBQSxpQkFnQkM7UUFuQkQsZ0JBQVcsR0FBYSxFQUFFLENBQUM7UUFDM0Isa0JBQWEsR0FBMkIsU0FBUyxDQUFDO1FBR2pE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O0lBQ2hFLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDaEIsY0FBTSxHQUFHLEVBQUUsQ0FBQztJQUNaLElBQUksT0FBTyxFQUFFO1FBQ1Qsc0JBQWMsR0FBRyxPQUFPLENBQUM7S0FDNUI7U0FBTTtRQUNILHNCQUFjLEdBQUcsRUFBRSxDQUFDO0tBQ3ZCO0lBRUQsSUFBSSxFQUFFLENBQUM7QUFDWCxDQUFDO0FBVkQsNENBVUM7QUFFRCxJQUFLLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDVixRQUFBLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDWixRQUFBLGNBQWMsR0FBMkIsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiOyAgLy8gb3IgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpXHJcbmltcG9ydCAqIGFzIGNvbW1hbmRlciBmcm9tICdjb21tYW5kZXInO1xyXG5pbXBvcnQgKiBhcyByZWFkbGluZSBmcm9tICdyZWFkbGluZSc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gIG1haW4oKSB7XHJcbiAgICBpZiAoJ2NvbW1hbmQnIGluIHByb2dyYW1PcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKHByb2dyYW1PcHRpb25zLmNvbW1hbmQgPT09ICdzdGRvdXQnKSB7XHJcbiAgICAgICAgICAgIHByaW50bG4oJ0FCQycpO1xyXG4gICAgICAgICAgICBwcmludGxuKCdERScpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoJ2lucHV0JyBpbiBwcm9ncmFtT3B0aW9ucykge1xyXG4gICAgICAgIGNvbnN0ICBrZXkgPSBhd2FpdCBpbnB1dCgnaW5wdXQ+JylcclxuICAgICAgICBwcmludGxuKGtleSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHByaW50bG4oJ21haW4nKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gIGFkZChhOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gIGEgKyBiO1xyXG59XHJcblxyXG4vLyBwcmludGxuXHJcbmZ1bmN0aW9uICBwcmludGxuKG1lc3NhZ2U6IGFueSkge1xyXG5cdGlmICh3aXRoSmVzdCkge1xyXG5cdFx0c3Rkb3V0ICs9IG1lc3NhZ2UudG9TdHJpbmcoKSArICdcXG4nO1xyXG5cdH0gZWxzZSB7XHJcblx0XHRjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vIFN0YW5kYXJkSW5wdXRCdWZmZXJcclxuY2xhc3MgIFN0YW5kYXJkSW5wdXRCdWZmZXIge1xyXG5cdHJlYWRsaW5lczogcmVhZGxpbmUuSW50ZXJmYWNlO1xyXG5cdGlucHV0QnVmZmVyOiBzdHJpbmdbXSA9IFtdO1xyXG5cdGlucHV0UmVzb2x2ZXI/OiAoYW5zd2VyOnN0cmluZyk9PnZvaWQgPSB1bmRlZmluZWQ7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5yZWFkbGluZXMgPSByZWFkbGluZS5jcmVhdGVJbnRlcmZhY2Uoe1xyXG5cdFx0XHRpbnB1dDogcHJvY2Vzcy5zdGRpbixcclxuXHRcdFx0b3V0cHV0OiBwcm9jZXNzLnN0ZG91dFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnJlYWRsaW5lcy5vbignbGluZScsIGFzeW5jIChsaW5lOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0aWYgKHRoaXMuaW5wdXRSZXNvbHZlcikge1xyXG5cdFx0XHRcdHRoaXMuaW5wdXRSZXNvbHZlcihsaW5lKTtcclxuXHRcdFx0XHR0aGlzLmlucHV0UmVzb2x2ZXIgPSB1bmRlZmluZWQ7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhpcy5pbnB1dEJ1ZmZlci5wdXNoKGxpbmUpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlYWRsaW5lcy5zZXRQcm9tcHQoJycpO1xyXG5cdFx0dGhpcy5yZWFkbGluZXMucHJvbXB0KCk7XHJcblx0fVxyXG5cclxuXHRhc3luYyAgaW5wdXQoZ3VpZGU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0XHRyZXR1cm4gIG5ldyBQcm9taXNlKFxyXG5cdFx0XHQocmVzb2x2ZTogKGFuc3dlcjpzdHJpbmcpPT52b2lkLCAgcmVqZWN0OiAoYW5zd2VyOnN0cmluZyk9PnZvaWQgKSA9PlxyXG5cdFx0e1xyXG5cdFx0XHRjb25zdCAgbmV4dExpbmUgPSB0aGlzLmlucHV0QnVmZmVyLnNoaWZ0KCk7XHJcblx0XHRcdGlmIChuZXh0TGluZSkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKGd1aWRlICsgbmV4dExpbmUpO1xyXG5cdFx0XHRcdHJlc29sdmUobmV4dExpbmUpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHByb2Nlc3Muc3Rkb3V0LndyaXRlKGd1aWRlKTtcclxuXHRcdFx0XHR0aGlzLmlucHV0UmVzb2x2ZXIgPSByZXNvbHZlO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGNsb3NlKCkge1xyXG5cdFx0dGhpcy5yZWFkbGluZXMuY2xvc2UoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vIElucHV0T3B0aW9uXHJcbmNsYXNzIElucHV0T3B0aW9uIHtcclxuXHRpbnB1dExpbmVzOiBzdHJpbmdbXTtcclxuXHRuZXh0TGluZUluZGV4OiBudW1iZXI7XHJcblx0bmV4dFBhcmFtZXRlckluZGV4OiBudW1iZXI7ICAvLyBUaGUgaW5kZXggb2YgdGhlIHN0YXJ0aW5nIHByb2Nlc3MgcGFyYW1ldGVyc1xyXG5cclxuXHRjb25zdHJ1Y3RvcihpbnB1dExpbmVzOiBzdHJpbmdbXSkge1xyXG5cdFx0dGhpcy5pbnB1dExpbmVzID0gaW5wdXRMaW5lcztcclxuXHRcdHRoaXMubmV4dExpbmVJbmRleCA9IDA7XHJcblx0XHR0aGlzLm5leHRQYXJhbWV0ZXJJbmRleCA9IDI7XHJcblx0fVxyXG59XHJcblxyXG5jb25zdCAgdGVzdEJhc2VGb2xkZXIgPSBTdHJpbmcucmF3IGBSOlxcaG9tZVxcbWVtX2NhY2hlXFxNeURvY1xcc3JjXFxUeXBlU2NyaXB0XFx0eXBybVxcdGVzdF9kYXRhYCsnXFxcXCc7XHJcblxyXG4vLyBpbnB1dE9wdGlvblxyXG5jb25zdCBpbnB1dE9wdGlvbiA9IG5ldyBJbnB1dE9wdGlvbihbXHJcbi8qXHJcblx0dGVzdEJhc2VGb2xkZXIgK2BjaGFuZ2Vfc2V0Xy55YW1sYCxcclxuXHRTdHJpbmcucmF3IGBmaWxlYCxcclxuXHR0ZXN0QmFzZUZvbGRlciArYGNoYW5nZV9zZXRfc2V0dGluZy55YW1sYCxcclxuXHRTdHJpbmcucmF3IGBDaGFuZ2VkYCxcclxuKi9cclxuXSk7XHJcblxyXG4vLyBpbnB1dFxyXG4vLyBFeGFtcGxlOiBjb25zdCBuYW1lID0gYXdhaXQgaW5wdXQoJ1doYXQgaXMgeW91ciBuYW1lPyAnKTtcclxuYXN5bmMgZnVuY3Rpb24gIGlucHV0KCBndWlkZTogc3RyaW5nICk6IFByb21pc2U8c3RyaW5nPiB7XHJcblx0Ly8gSW5wdXQgZW11bGF0aW9uXHJcblx0aWYgKGlucHV0T3B0aW9uLmlucHV0TGluZXMpIHtcclxuXHRcdGlmIChpbnB1dE9wdGlvbi5uZXh0TGluZUluZGV4IDwgaW5wdXRPcHRpb24uaW5wdXRMaW5lcy5sZW5ndGgpIHtcclxuXHRcdFx0Y29uc3QgIHZhbHVlID0gaW5wdXRPcHRpb24uaW5wdXRMaW5lc1tpbnB1dE9wdGlvbi5uZXh0TGluZUluZGV4XTtcclxuXHRcdFx0aW5wdXRPcHRpb24ubmV4dExpbmVJbmRleCArPSAxO1xyXG5cdFx0XHRjb25zb2xlLmxvZyhndWlkZSArIHZhbHVlKTtcclxuXHJcblx0XHRcdHJldHVybiAgdmFsdWU7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBSZWFkIHRoZSBzdGFydGluZyBwcm9jZXNzIHBhcmFtZXRlcnNcclxuXHR3aGlsZSAoaW5wdXRPcHRpb24ubmV4dFBhcmFtZXRlckluZGV4IDwgcHJvY2Vzcy5hcmd2Lmxlbmd0aCkge1xyXG5cdFx0Y29uc3QgIHZhbHVlID0gcHJvY2Vzcy5hcmd2W2lucHV0T3B0aW9uLm5leHRQYXJhbWV0ZXJJbmRleF07XHJcblx0XHRpbnB1dE9wdGlvbi5uZXh0UGFyYW1ldGVySW5kZXggKz0gMTtcclxuXHRcdGlmICh2YWx1ZS5zdWJzdHIoMCwxKSAhPT0gJy0nKSB7XHJcblx0XHRcdGNvbnNvbGUubG9nKGd1aWRlICsgdmFsdWUpO1xyXG5cclxuXHRcdFx0cmV0dXJuICB2YWx1ZTtcclxuXHRcdH1cclxuXHRcdGlmICh2YWx1ZSAhPT0gJy0tdGVzdCcpIHtcclxuXHRcdFx0aW5wdXRPcHRpb24ubmV4dFBhcmFtZXRlckluZGV4ICs9IDE7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBpbnB1dFxyXG5cdHJldHVybiAgSW5wdXRPYmplY3QuaW5wdXQoZ3VpZGUpO1xyXG59XHJcbmV4cG9ydCBjb25zdCAgSW5wdXRPYmplY3QgPSBuZXcgU3RhbmRhcmRJbnB1dEJ1ZmZlcigpO1xyXG5cclxuLy8gaW5wdXRQYXRoXHJcbi8vIEV4YW1wbGU6IGNvbnN0IG5hbWUgPSBhd2FpdCBpbnB1dCgnV2hhdCBpcyB5b3VyIG5hbWU/ICcpO1xyXG5hc3luYyBmdW5jdGlvbiAgaW5wdXRQYXRoKCBndWlkZTogc3RyaW5nICkge1xyXG5cdGNvbnN0ICBrZXkgPSBhd2FpdCBpbnB1dChndWlkZSk7XHJcblx0cmV0dXJuICBwYXRoUmVzb2x2ZShrZXkpO1xyXG59XHJcblxyXG4vLyBwYXRoUmVzb2x2ZVxyXG5mdW5jdGlvbiAgcGF0aFJlc29sdmUocGF0aF86IHN0cmluZykge1xyXG5cclxuXHQvLyAnL2MvaG9tZScgZm9ybWF0IHRvIGN1cnJlbnQgT1MgZm9ybWF0XHJcblx0aWYgKHBhdGhfLmxlbmd0aCA+PSAzKSB7XHJcblx0XHRpZiAocGF0aF9bMF0gPT09ICcvJyAgJiYgIHBhdGhfWzJdID09PSAnLycpIHtcclxuXHRcdFx0cGF0aF8gPSBwYXRoX1sxXSArJzonKyBwYXRoXy5zdWJzdHIoMik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvLyBDaGFuZ2Ugc2VwYXJhdG9ycyB0byBPUyBmb3JtYXRcclxuXHRwYXRoXyA9IHBhdGgucmVzb2x2ZShwYXRoXyk7XHJcblxyXG5cdHJldHVybiBwYXRoX1xyXG59XHJcblxyXG4vLyBjYWxsTWFpbkZyb21KZXN0XHJcbmV4cG9ydCBmdW5jdGlvbiAgY2FsbE1haW5Gcm9tSmVzdChvcHRpb25zPzoge1tuYW1lOiBzdHJpbmddOiBzdHJpbmd9KSB7XHJcbiAgICB3aXRoSmVzdCA9IHRydWU7XHJcbiAgICBzdGRvdXQgPSAnJztcclxuICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgcHJvZ3JhbU9wdGlvbnMgPSBvcHRpb25zO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9ncmFtT3B0aW9ucyA9IHt9O1xyXG4gICAgfVxyXG5cclxuICAgIG1haW4oKTtcclxufVxyXG5cclxudmFyICB3aXRoSmVzdCA9IGZhbHNlO1xyXG5leHBvcnQgdmFyICBzdGRvdXQgPSAnJztcclxuZXhwb3J0IHZhciAgcHJvZ3JhbU9wdGlvbnM6IGNvbW1hbmRlci5PcHRpb25WYWx1ZXMgPSB7fTtcclxuIl19