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
exports.programOptions = exports.programArguments = exports.stdout = exports.callMainFromJest = exports.println = exports.cc = exports.debugOut = exports.pp = exports.main = void 0;
var lib = require("./lib");
// main
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    locale = Intl.NumberFormat().resolvedOptions().locale;
                    if ('locale' in exports.programOptions) {
                        locale = exports.programOptions.locale;
                    }
                    if (!('command' in exports.programOptions)) return [3 /*break*/, 1];
                    if (exports.programOptions.command === 'stdout') {
                        console.log('ABC');
                        console.log('DE');
                        console.log(exports.programArguments);
                    }
                    else if (exports.programOptions.command === 'show-locale') {
                        console.log(locale);
                    }
                    return [3 /*break*/, 4];
                case 1:
                    if (!('input' in exports.programOptions)) return [3 /*break*/, 3];
                    return [4 /*yield*/, lib.input('input>')];
                case 2:
                    key = _a.sent();
                    console.log(key);
                    return [3 /*break*/, 4];
                case 3:
                    console.log('main');
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
// getStdOut
// Example:
//    var d = getStdOut();  // Set break point here and watch the variable d
function getStdOut() {
    return exports.stdout.split('\n');
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
// println
// #keyword: println, console.log, consoleLog
// Output any text to standard output.
function println(message, delayedExpanding) {
    if (delayedExpanding === void 0) { delayedExpanding = false; }
    if (typeof message === 'object' && !delayedExpanding) {
        message = JSON.stringify(message);
    }
    if (withJest && !delayedExpanding) {
        exports.stdout += message.toString() + '\n';
        pp(message.toString());
    }
    else {
        consoleLog(message);
    }
}
exports.println = println;
var consoleLog = console.log;
console.log = println;
// callMainFromJest
// #keyword: callMainFromJest
function callMainFromJest(parameters, options) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    withJest = true;
                    exports.stdout = '';
                    if (parameters) {
                        exports.programArguments = parameters;
                    }
                    else {
                        exports.programArguments = [];
                    }
                    if (options) {
                        exports.programOptions = options;
                    }
                    else {
                        exports.programOptions = {};
                    }
                    return [4 /*yield*/, main()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.callMainFromJest = callMainFromJest;
var locale = '';
var withJest = false;
exports.stdout = '';
exports.programArguments = [];
exports.programOptions = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDJCQUE2QjtBQUU3QixPQUFPO0FBQ1AsU0FBdUIsSUFBSTs7Ozs7O29CQUN2QixNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDLE1BQU0sQ0FBQztvQkFDdEQsSUFBSSxRQUFRLElBQUksc0JBQWMsRUFBRTt3QkFDNUIsTUFBTSxHQUFHLHNCQUFjLENBQUMsTUFBTSxDQUFDO3FCQUNsQzt5QkFFRyxDQUFBLFNBQVMsSUFBSSxzQkFBYyxDQUFBLEVBQTNCLHdCQUEyQjtvQkFDM0IsSUFBSSxzQkFBYyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7d0JBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQWdCLENBQUMsQ0FBQztxQkFDakM7eUJBQU0sSUFBSSxzQkFBYyxDQUFDLE9BQU8sS0FBSyxhQUFhLEVBQUU7d0JBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ3ZCOzs7eUJBQ00sQ0FBQSxPQUFPLElBQUksc0JBQWMsQ0FBQSxFQUF6Qix3QkFBeUI7b0JBQ25CLHFCQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUE7O29CQUEvQixHQUFHLEdBQUcsU0FBeUI7b0JBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7OztvQkFFakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7O0NBRTNCO0FBcEJELG9CQW9CQztBQUVELFNBQVUsR0FBRyxDQUFDLENBQVMsRUFBRSxD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LEdBQUcsRUFBRSxDQUFDO29CQUNaLElBQUksVUFBVSxFQUFFO3dCQUNaLHdCQUFnQixHQUFHLFVBQVUsQ0FBQztxQkFDakM7eUJBQU07d0JBQ0gsd0JBQWdCLEdBQUcsRUFBRSxDQUFDO3FCQUN6QjtvQkFDRCxJQUFJLE9BQU8sRUFBRTt3QkFDVCxzQkFBYyxHQUFHLE9BQU8sQ0FBQztxQkFDNUI7eUJBQU07d0JBQ0gsc0JBQWMsR0FBRyxFQUFFLENBQUM7cUJBQ3ZCO29CQUVELHFCQUFNLElBQUksRUFBRSxFQUFBOztvQkFBWixTQUFZLENBQUM7Ozs7O0NBQ2hCO0FBZkQsNENBZUM7QUFFRCxJQUFPLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbkIsSUFBTyxRQUFRLEdBQUcsS0FBSyxDQUFDO0FBQ1osUUFBQSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ1osUUFBQSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7QUFDaEMsUUFBQSxjQUFjLEdBQXlCLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjsgIC8vIG9yIHBhdGggPSByZXF1aXJlKFwicGF0aFwiKVxyXG5pbXBvcnQgKiBhcyByZWFkbGluZSBmcm9tICdyZWFkbGluZSc7XHJcbmltcG9ydCAqIGFzIGxpYiBmcm9tIFwiLi9saWJcIjtcclxuXHJcbi8vIG1haW5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uICBtYWluKCkge1xyXG4gICAgbG9jYWxlID0gSW50bC5OdW1iZXJGb3JtYXQoKS5yZXNvbHZlZE9wdGlvbnMoKS5sb2NhbGU7XHJcbiAgICBpZiAoJ2xvY2FsZScgaW4gcHJvZ3JhbU9wdGlvbnMpIHtcclxuICAgICAgICBsb2NhbGUgPSBwcm9ncmFtT3B0aW9ucy5sb2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCdjb21tYW5kJyBpbiBwcm9ncmFtT3B0aW9ucykge1xyXG4gICAgICAgIGlmIChwcm9ncmFtT3B0aW9ucy5jb21tYW5kID09PSAnc3Rkb3V0Jykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQUJDJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdERScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcm9ncmFtQXJndW1lbnRzKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHByb2dyYW1PcHRpb25zLmNvbW1hbmQgPT09ICdzaG93LWxvY2FsZScpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobG9jYWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKCdpbnB1dCcgaW4gcHJvZ3JhbU9wdGlvbnMpIHtcclxuICAgICAgICBjb25zdCAga2V5ID0gYXdhaXQgbGliLmlucHV0KCdpbnB1dD4nKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKGtleSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdtYWluJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uICBhZGQoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuICBhICsgYjtcclxufVxyXG5cclxuXHJcbi8vIGdldFN0ZE91dFxyXG4vLyBFeGFtcGxlOlxyXG4vLyAgICB2YXIgZCA9IGdldFN0ZE91dCgpOyAgLy8gU2V0IGJyZWFrIHBvaW50IGhlcmUgYW5kIHdhdGNoIHRoZSB2YXJpYWJsZSBkXHJcbmZ1bmN0aW9uICBnZXRTdGRPdXQoKTogc3RyaW5nW10ge1xyXG4gICAgcmV0dXJuICBzdGRvdXQuc3BsaXQoJ1xcbicpO1xyXG59XHJcblxyXG4vLyBwcFxyXG4vLyBEZWJ1ZyBwcmludC5cclxuLy8gI2tleXdvcmQ6IHBwXHJcbi8vIEV4YW1wbGU6XHJcbi8vICAgIHBwKHZhcik7XHJcbi8vIEV4YW1wbGU6XHJcbi8vICAgIHZhciBkID0gcHAodmFyKTtcclxuLy8gICAgZCA9IGQ7ICAvLyBTZXQgYnJlYWsgcG9pbnQgaGVyZSBhbmQgd2F0Y2ggdGhlIHZhcmlhYmxlIGRcclxuLy8gRXhhbXBsZTpcclxuLy8gICAgdHJ5IHtcclxuLy9cclxuLy8gICAgICAgIGF3YWl0IG1haW4oKTtcclxuLy8gICAgfSBmaW5hbGx5IHtcclxuLy8gICAgICAgIHZhciBkID0gcHAoJycpO1xyXG4vLyAgICAgICAgZCA9IFtdOyAgLy8gU2V0IGJyZWFrIHBvaW50IGhlcmUgYW5kIHdhdGNoIHRoZSB2YXJpYWJsZSBkXHJcbi8vICAgIH1cclxuZXhwb3J0IGZ1bmN0aW9uICBwcChtZXNzYWdlOiBhbnkpIHtcclxuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkobWVzc2FnZSk7XHJcbiAgICB9XHJcbiAgICBkZWJ1Z091dC5wdXNoKG1lc3NhZ2UudG9TdHJpbmcoKSk7XHJcbiAgICByZXR1cm4gZGVidWdPdXQ7XHJcbn1cclxuZXhwb3J0IGNvbnN0ICBkZWJ1Z091dDogc3RyaW5nW10gPSBbXTtcclxuXHJcbi8vIGNjXHJcbi8vIFRocm91Z2ggY291bnRlci5cclxuLy8gI2tleXdvcmQ6IGNjXHJcbi8vIEV4YW1wbGU6XHJcbi8vICAgY2MoKTtcclxuLy8gRXhhbXBsZTpcclxuLy8gICB2YXIgYyA9IGNjKCkuZGVidWdPdXQ7ICAvLyBTZXQgYnJlYWsgcG9pbnQgaGVyZSBhbmQgd2F0Y2ggdGhlIHZhcmlhYmxlIGNcclxuLy8gRXhhbXBsZTpcclxuLy8gICBpZiAoIGNjKDIpLmlzVGFyZ2V0IClcclxuLy8gICB2YXIgZCA9IHBwKCcnKTsgIC8vIFNldCBicmVhayBwb2ludCBoZXJlIGFuZCB3YXRjaCB0aGUgdmFyaWFibGUgZFxyXG5leHBvcnQgZnVuY3Rpb24gIGNjKCB0YXJnZXRDb3VudDogbnVtYmVyID0gOTk5OTk5OSwgbGFiZWw6IHN0cmluZyA9ICcwJyApIHtcclxuICAgIGlmICghKGxhYmVsIGluIGdDb3VudCkpIHtcclxuICAgICAgICBnQ291bnRbbGFiZWxdID0gMDtcclxuICAgIH1cclxuXHJcbiAgICBnQ291bnRbbGFiZWxdICs9IDE7XHJcbiAgICBwcCggYCR7bGFiZWx9OmNvdW50VGhyb3VnaFske2xhYmVsfV0gPSAke2dDb3VudFtsYWJlbF19YCApO1xyXG4gICAgY29uc3QgaXNUYXJnZXQgPSAoIGdDb3VudFtsYWJlbF0gPT09IHRhcmdldENvdW50ICk7XHJcblxyXG4gICAgaWYgKGlzVGFyZ2V0KSB7XHJcbiAgICAgICAgcHAoICcgICAgKioqKiBJdCBpcyBiZWZvcmUgdGhlIHRhcmdldCEgKioqKicgKTtcclxuICAgIH1cclxuICAgIHJldHVybiAgeyBpc1RhcmdldCwgZGVidWdPdXQgfTtcclxufVxyXG5jb25zdCAgZ0NvdW50OiB7W25hbWU6IHN0cmluZ106IG51bWJlcn0gPSB7fTtcclxuXHJcbi8vIHByaW50bG5cclxuLy8gI2tleXdvcmQ6IHByaW50bG4sIGNvbnNvbGUubG9nLCBjb25zb2xlTG9nXHJcbi8vIE91dHB1dCBhbnkgdGV4dCB0byBzdGFuZGFyZCBvdXRwdXQuXHJcbmV4cG9ydCBmdW5jdGlvbiAgcHJpbnRsbihtZXNzYWdlOiBhbnksIGRlbGF5ZWRFeHBhbmRpbmc6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0JyAmJiAhZGVsYXllZEV4cGFuZGluZykge1xyXG4gICAgICAgIG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeShtZXNzYWdlKTtcclxuICAgIH1cclxuICAgIGlmICh3aXRoSmVzdCAmJiAhZGVsYXllZEV4cGFuZGluZykge1xyXG4gICAgICAgIHN0ZG91dCArPSBtZXNzYWdlLnRvU3RyaW5nKCkgKyAnXFxuJztcclxuICAgICAgICBwcChtZXNzYWdlLnRvU3RyaW5nKCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlTG9nKG1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0ICBjb25zb2xlTG9nID0gY29uc29sZS5sb2c7XHJcbmNvbnNvbGUubG9nID0gcHJpbnRsbjtcclxuXHJcbi8vIGNhbGxNYWluRnJvbUplc3RcclxuLy8gI2tleXdvcmQ6IGNhbGxNYWluRnJvbUplc3RcclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uICBjYWxsTWFpbkZyb21KZXN0KHBhcmFtZXRlcnM/OiBzdHJpbmdbXSwgb3B0aW9ucz86IHtbbmFtZTogc3RyaW5nXTogc3RyaW5nfSkge1xyXG4gICAgd2l0aEplc3QgPSB0cnVlO1xyXG4gICAgc3Rkb3V0ID0gJyc7XHJcbiAgICBpZiAocGFyYW1ldGVycykge1xyXG4gICAgICAgIHByb2dyYW1Bcmd1bWVudHMgPSBwYXJhbWV0ZXJzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBwcm9ncmFtQXJndW1lbnRzID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICAgIHByb2dyYW1PcHRpb25zID0gb3B0aW9ucztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcHJvZ3JhbU9wdGlvbnMgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBhd2FpdCBtYWluKCk7XHJcbn1cclxuXHJcbnZhciAgICBsb2NhbGUgPSAnJztcclxudmFyICAgIHdpdGhKZXN0ID0gZmFsc2U7XHJcbmV4cG9ydCB2YXIgIHN0ZG91dCA9ICcnO1xyXG5leHBvcnQgdmFyICBwcm9ncmFtQXJndW1lbnRzOiBzdHJpbmdbXSA9IFtdO1xyXG5leHBvcnQgdmFyICBwcm9ncmFtT3B0aW9uczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcclxuIl19