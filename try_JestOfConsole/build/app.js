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
        var _i, _a, arg;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    commander.program.version('0.1.1').exitOverride(exitFromCommander)
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
                                timeOver.setSeconds(timeOver.getSeconds() + 5);
                                while ((new Date()).getTime() < timeOver.getTime()) {
                                }
                            }
                        })["finally"](function () {
                            main.InputObject.close();
                        })];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
callMain();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2Qyw2QkFBK0I7QUFFL0IsU0FBVSxpQkFBaUIsQ0FBQyxDQUEyQjtJQUN0RCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBQ0QsU0FBZ0IsUUFBUTs7Ozs7O29CQUN2QixTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUM7eUJBQ2hFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzt5QkFDMUIsTUFBTSxDQUFDLFlBQVksQ0FBQzt5QkFDcEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDO3lCQUMzQixNQUFNLENBQUMsYUFBYSxDQUFDO3lCQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUV0QixXQUF3QyxFQUF0QixLQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUF0QixjQUFzQixFQUF0QixJQUFzQixFQUFFO3dCQUEvQixHQUFHO3dCQUNiLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ2hDO29CQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBRTdELHFCQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FDaEIsT0FBSyxDQUFBLENBQUUsVUFBQyxDQUFDOzRCQUNULElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUU7Z0NBQzdCLE1BQU0sQ0FBQyxDQUFDOzZCQUNSO2lDQUFNO2dDQUVOLE9BQU8sQ0FBQyxHQUFHLENBQUUsWUFBVSxDQUFDLENBQUMsT0FBUyxDQUFFLENBQUM7Z0NBQ3JDLElBQU8sUUFBUSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0NBQzdCLFFBQVEsQ0FBQyxVQUFVLENBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBRSxDQUFDO2dDQUVqRCxPQUFPLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQUUsRUFBRTtpQ0FDbkQ7NkJBQ0Q7d0JBQ0YsQ0FBQyxDQUFDLENBQ0QsU0FBTyxDQUFBLENBQUM7NEJBQ1IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt3QkFDMUIsQ0FBQyxDQUFDLEVBQUE7O29CQWhCSCxTQWdCRyxDQUFDOzs7OztDQUNKO0FBQ0QsUUFBUSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjb21tYW5kZXIgZnJvbSAnY29tbWFuZGVyJztcclxuaW1wb3J0ICogYXMgbWFpbiBmcm9tICcuL21haW4nO1xyXG5cclxuZnVuY3Rpb24gIGV4aXRGcm9tQ29tbWFuZGVyKGU6IGNvbW1hbmRlci5Db21tYW5kZXJFcnJvcikge1xyXG5cdGNvbnNvbGUubG9nKGUubWVzc2FnZSk7XHJcbn1cclxuYXN5bmMgZnVuY3Rpb24gIGNhbGxNYWluKCkge1xyXG5cdGNvbW1hbmRlci5wcm9ncmFtLnZlcnNpb24oJzAuMS4xJykuZXhpdE92ZXJyaWRlKGV4aXRGcm9tQ29tbWFuZGVyKVxyXG5cdFx0Lm9wdGlvbihcIi1sLCAtLWxvY2FsZSA8cz5cIilcclxuXHRcdC5vcHRpb24oXCItdCwgLS10ZXN0XCIpXHJcblx0XHQub3B0aW9uKFwiLWMsIC0tY29tbWFuZCA8cz5cIilcclxuXHRcdC5vcHRpb24oXCItaSwgLS1pbnB1dFwiKVxyXG5cdFx0LnBhcnNlKHByb2Nlc3MuYXJndik7XHJcblxyXG5cdGZvciAoY29uc3QgYXJnIG9mIGNvbW1hbmRlci5wcm9ncmFtLmFyZ3MpIHtcclxuXHRcdG1haW4ucHJvZ3JhbUFyZ3VtZW50cy5wdXNoKGFyZyk7XHJcblx0fVxyXG5cdE9iamVjdC5hc3NpZ24obWFpbi5wcm9ncmFtT3B0aW9ucywgY29tbWFuZGVyLnByb2dyYW0ub3B0cygpKTtcclxuXHJcblx0YXdhaXQgIG1haW4ubWFpbigpXHJcblx0XHQuY2F0Y2goIChlKT0+e1xyXG5cdFx0XHRpZiAobWFpbi5wcm9ncmFtT3B0aW9ucy50ZXN0KSB7XHJcblx0XHRcdFx0dGhyb3cgZTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Y29uc29sZS5sb2coIGBFUlJPUjogJHtlLm1lc3NhZ2V9YCApO1xyXG5cdFx0XHRcdGNvbnN0ICB0aW1lT3ZlciA9IG5ldyBEYXRlKCk7XHJcblx0XHRcdFx0dGltZU92ZXIuc2V0U2Vjb25kcyggdGltZU92ZXIuZ2V0U2Vjb25kcygpICsgNSApO1xyXG5cclxuXHRcdFx0XHR3aGlsZSAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSA8IHRpbWVPdmVyLmdldFRpbWUoKSkge1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdC5maW5hbGx5KCgpPT57XHJcblx0XHRcdG1haW4uSW5wdXRPYmplY3QuY2xvc2UoKTtcclxuXHRcdH0pO1xyXG59XHJcbmNhbGxNYWluKCk7XHJcbiJdfQ==