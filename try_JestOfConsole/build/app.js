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
var lib = require("./lib");
function exitFromCommander(e) {
    if (e.code !== 'commander.version') {
        console.log(e.message);
    }
}
function callMain() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, arg;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    commander.program.version('0.1.1').exitOverride(exitFromCommander)
                        .exitOverride(exitFromCommander)
                        .option("-l, --locale <s>")
                        .option("-t, --test")
                        .option("-c, --command <s>")
                        .option("-i, --input")
                        .parse(process.argv);
                    for (_i = 0, _a = commander.program.args; _i < _a.length; _i++) {
                        arg = _a[_i];
                        main.programArguments.push(arg);
                    }
                    Object.assign(main.programOptions, commander.program.opts());
                    return [4 /*yield*/, main.main()["catch"](function (e) {
                            if (main.programOptions.test) {
                                throw e;
                            }
                            else {
                                console.log("ERROR: " + e.message);
                                var timeOver = new Date();
                                timeOver.setSeconds(timeOver.getSeconds() + 1);
                                while ((new Date()).getTime() < timeOver.getTime()) {
                                }
                            }
                        })["finally"](function () {
                            lib.getInputObject().close();
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
callMain();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2Qyw2QkFBK0I7QUFDL0IsMkJBQTZCO0FBRTdCLFNBQVUsaUJBQWlCLENBQUMsQ0FBMkI7SUFDbkQsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLG1CQUFtQixFQUFFO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZCO0FBQ0YsQ0FBQztBQUNELFNBQWdCLFFBQVE7Ozs7OztvQkFDdkIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDO3lCQUMxRCxZQUFZLENBQUMsaUJBQWlCLENBQUM7eUJBQ3JDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzt5QkFDMUIsTUFBTSxDQUFDLFlBQVksQ0FBQzt5QkFDcEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDO3lCQUMzQixNQUFNLENBQUMsYUFBYSxDQUFDO3lCQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUV0QixXQUF3QyxFQUF0QixLQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUF0QixjQUFzQixFQUF0QixJQUFzQixFQUFFO3dCQUEvQixHQUFHO3dCQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2hDO29CQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBRTdELHFCQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FDaEIsT0FBSyxDQUFBLENBQUUsVUFBQyxDQUFDOzRCQUNULElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7Z0NBQzdCLE1BQU0sQ0FBQyxDQUFDOzZCQUNSO2lDQUFNO2dDQUVOLE9BQU8sQ0FBQyxHQUFHLENBQUUsWUFBVSxDQUFDLENBQUMsT0FBUyxDQUFFLENBQUM7Z0NBQ3JDLElBQU8sUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0NBQzdCLFFBQVEsQ0FBQyxVQUFVLENBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBRSxDQUFDO2dDQUVqRCxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtpQ0FDbkQ7NkJBQ0Q7d0JBQ0YsQ0FBQyxDQUFDLENBQ0QsU0FBTyxDQUFBLENBQUM7NEJBQ1IsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO3dCQUM5QixDQUFDLENBQUMsRUFBQTs7b0JBaEJILFNBZ0JHLENBQUM7Ozs7O0NBQ0o7QUFDRCxRQUFRLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNvbW1hbmRlciBmcm9tICdjb21tYW5kZXInO1xyXG5pbXBvcnQgKiBhcyBtYWluIGZyb20gJy4vbWFpbic7XHJcbmltcG9ydCAqIGFzIGxpYiBmcm9tICcuL2xpYic7XHJcblxyXG5mdW5jdGlvbiAgZXhpdEZyb21Db21tYW5kZXIoZTogY29tbWFuZGVyLkNvbW1hbmRlckVycm9yKSB7XHJcbiAgICBpZiAoZS5jb2RlICE9PSAnY29tbWFuZGVyLnZlcnNpb24nKSB7XHJcblx0XHRjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG5cdH1cclxufVxyXG5hc3luYyBmdW5jdGlvbiAgY2FsbE1haW4oKSB7XHJcblx0Y29tbWFuZGVyLnByb2dyYW0udmVyc2lvbignMC4xLjEnKS5leGl0T3ZlcnJpZGUoZXhpdEZyb21Db21tYW5kZXIpXHJcbiAgICAgICAgLmV4aXRPdmVycmlkZShleGl0RnJvbUNvbW1hbmRlcilcclxuXHRcdC5vcHRpb24oXCItbCwgLS1sb2NhbGUgPHM+XCIpXHJcblx0XHQub3B0aW9uKFwiLXQsIC0tdGVzdFwiKVxyXG5cdFx0Lm9wdGlvbihcIi1jLCAtLWNvbW1hbmQgPHM+XCIpXHJcblx0XHQub3B0aW9uKFwiLWksIC0taW5wdXRcIilcclxuXHRcdC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xyXG5cclxuXHRmb3IgKGNvbnN0IGFyZyBvZiBjb21tYW5kZXIucHJvZ3JhbS5hcmdzKSB7XHJcblx0XHRtYWluLnByb2dyYW1Bcmd1bWVudHMucHVzaChhcmcpO1xyXG5cdH1cclxuXHRPYmplY3QuYXNzaWduKG1haW4ucHJvZ3JhbU9wdGlvbnMsIGNvbW1hbmRlci5wcm9ncmFtLm9wdHMoKSk7XHJcblxyXG5cdGF3YWl0ICBtYWluLm1haW4oKVxyXG5cdFx0LmNhdGNoKCAoZSk9PntcclxuXHRcdFx0aWYgKG1haW4ucHJvZ3JhbU9wdGlvbnMudGVzdCkge1xyXG5cdFx0XHRcdHRocm93IGU7XHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCBgRVJST1I6ICR7ZS5tZXNzYWdlfWAgKTtcclxuXHRcdFx0XHRjb25zdCAgdGltZU92ZXIgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHRcdHRpbWVPdmVyLnNldFNlY29uZHMoIHRpbWVPdmVyLmdldFNlY29uZHMoKSArIDEgKTtcclxuXHJcblx0XHRcdFx0d2hpbGUgKChuZXcgRGF0ZSgpKS5nZXRUaW1lKCkgPCB0aW1lT3Zlci5nZXRUaW1lKCkpIHtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHQuZmluYWxseSgoKT0+e1xyXG5cdFx0XHRsaWIuZ2V0SW5wdXRPYmplY3QoKS5jbG9zZSgpO1xyXG5cdFx0fSk7XHJcbn1cclxuY2FsbE1haW4oKTtcclxuIl19