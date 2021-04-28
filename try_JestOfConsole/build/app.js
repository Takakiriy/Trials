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
var commander = require("commander");
var main = require("./main");
function exitFromCommander(e) {
    console.log(e.message);
}
function callMain() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    commander.program.version('0.1.1').exitOverride(exitFromCommander)
                        .option("-l, --locale <s>")
                        .option("-t, --test")
                        .option("-c, --command <s>")
                        .option("-i, --input")
                        .parse(process.argv);
                    locale = Intl.NumberFormat().resolvedOptions().locale;
                    if (programOptions.locale) {
                        locale = programOptions.locale;
                    }
                    Object.assign(main.programOptions, commander.program.opts());
                    return [4 /*yield*/, main.main()["catch"](function (e) {
                            if (programOptions.test) {
                                throw e;
                            }
                            else {
                                console.log("ERROR: " + e.message);
                                var timeOver = new Date();
                                timeOver.setSeconds(timeOver.getSeconds() + 5);
                                while ((new Date()).getTime() < timeOver.getTime()) {
                                }
                            }
                        })["finally"](function () {
                            main.InputObject.close();
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
var locale;
var programOptions = commander.program.opts();
callMain();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2Qyw2QkFBK0I7QUFFL0IsU0FBVSxpQkFBaUIsQ0FBQyxDQUEyQjtJQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBQ0QsU0FBZ0IsUUFBUTs7Ozs7b0JBQ3ZCLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQzt5QkFDaEUsTUFBTSxDQUFDLGtCQUFrQixDQUFDO3lCQUMxQixNQUFNLENBQUMsWUFBWSxDQUFDO3lCQUNwQixNQUFNLENBQUMsbUJBQW1CLENBQUM7eUJBQzNCLE1BQU0sQ0FBQyxhQUFhLENBQUM7eUJBQ3JCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRXRCLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxDQUFDO29CQUN0RCxJQUFJLGNBQWMsQ0FBQyxNQUFNLEVBQUU7d0JBQzFCLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO3FCQUMvQjtvQkFDRCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO29CQUU3RCxxQkFBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQ2hCLE9BQUssQ0FBQSxDQUFFLFVBQUMsQ0FBQzs0QkFDVCxJQUFJLGNBQWMsQ0FBQyxJQUFJLEVBQUU7Z0NBQ3hCLE1BQU0sQ0FBQyxDQUFDOzZCQUNSO2lDQUFNO2dDQUVOLE9BQU8sQ0FBQyxHQUFHLENBQUUsWUFBVSxDQUFDLENBQUMsT0FBUyxDQUFFLENBQUM7Z0NBQ3JDLElBQU8sUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0NBQzdCLFFBQVEsQ0FBQyxVQUFVLENBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBRSxDQUFDO2dDQUVqRCxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtpQ0FDbkQ7NkJBQ0Q7d0JBQ0YsQ0FBQyxDQUFDLENBQ0QsU0FBTyxDQUFBLENBQUM7NEJBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDMUIsQ0FBQyxDQUFDLEVBQUE7O29CQWhCSCxTQWdCRyxDQUFDOzs7OztDQUNKO0FBRUQsSUFBTyxNQUFjLENBQUM7QUFDdEIsSUFBTyxjQUFjLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNqRCxRQUFRLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvbW1hbmRlciBmcm9tICdjb21tYW5kZXInO1xyXG5pbXBvcnQgKiBhcyBtYWluIGZyb20gJy4vbWFpbic7XHJcblxyXG5mdW5jdGlvbiAgZXhpdEZyb21Db21tYW5kZXIoZTogY29tbWFuZGVyLkNvbW1hbmRlckVycm9yKSB7XHJcblx0Y29uc29sZS5sb2coZS5tZXNzYWdlKTtcclxufVxyXG5hc3luYyBmdW5jdGlvbiAgY2FsbE1haW4oKSB7XHJcblx0Y29tbWFuZGVyLnByb2dyYW0udmVyc2lvbignMC4xLjEnKS5leGl0T3ZlcnJpZGUoZXhpdEZyb21Db21tYW5kZXIpXHJcblx0XHQub3B0aW9uKFwiLWwsIC0tbG9jYWxlIDxzPlwiKVxyXG5cdFx0Lm9wdGlvbihcIi10LCAtLXRlc3RcIilcclxuXHRcdC5vcHRpb24oXCItYywgLS1jb21tYW5kIDxzPlwiKVxyXG5cdFx0Lm9wdGlvbihcIi1pLCAtLWlucHV0XCIpXHJcblx0XHQucGFyc2UocHJvY2Vzcy5hcmd2KTtcclxuXHRcclxuXHRsb2NhbGUgPSBJbnRsLk51bWJlckZvcm1hdCgpLnJlc29sdmVkT3B0aW9ucygpLmxvY2FsZTtcclxuXHRpZiAocHJvZ3JhbU9wdGlvbnMubG9jYWxlKSB7XHJcblx0XHRsb2NhbGUgPSBwcm9ncmFtT3B0aW9ucy5sb2NhbGU7XHJcblx0fVxyXG5cdE9iamVjdC5hc3NpZ24obWFpbi5wcm9ncmFtT3B0aW9ucywgY29tbWFuZGVyLnByb2dyYW0ub3B0cygpKTtcclxuXHJcblx0YXdhaXQgIG1haW4ubWFpbigpXHJcblx0XHQuY2F0Y2goIChlKT0+e1xyXG5cdFx0XHRpZiAocHJvZ3JhbU9wdGlvbnMudGVzdCkge1xyXG5cdFx0XHRcdHRocm93IGU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCBgRVJST1I6ICR7ZS5tZXNzYWdlfWAgKTtcclxuXHRcdFx0XHRjb25zdCAgdGltZU92ZXIgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHRcdHRpbWVPdmVyLnNldFNlY29uZHMoIHRpbWVPdmVyLmdldFNlY29uZHMoKSArIDUgKTtcclxuXHJcblx0XHRcdFx0d2hpbGUgKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgPCB0aW1lT3Zlci5nZXRUaW1lKCkpIHtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHQuZmluYWxseSgoKT0+e1xyXG5cdFx0XHRtYWluLklucHV0T2JqZWN0LmNsb3NlKCk7XHJcblx0XHR9KTtcclxufVxyXG5cclxubGV0ICAgIGxvY2FsZTogc3RyaW5nO1xyXG5jb25zdCAgcHJvZ3JhbU9wdGlvbnMgPSBjb21tYW5kZXIucHJvZ3JhbS5vcHRzKCk7XHJcbmNhbGxNYWluKCk7XHJcbiJdfQ==