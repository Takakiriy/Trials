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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2Qyw2QkFBK0I7QUFDL0IsMkJBQTZCO0FBRTdCLFNBQVUsaUJBQWlCLENBQUMsQ0FBMkI7SUFDbkQsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLG1CQUFtQixFQUFFO1FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzFCO0FBQ0wsQ0FBQztBQUNELFNBQWdCLFFBQVE7Ozs7OztvQkFDcEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDO3lCQUM3RCxZQUFZLENBQUMsaUJBQWlCLENBQUM7eUJBQy9CLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQzt5QkFDMUIsTUFBTSxDQUFDLFlBQVksQ0FBQzt5QkFDcEIsTUFBTSxDQUFDLG1CQUFtQixDQUFDO3lCQUMzQixNQUFNLENBQUMsYUFBYSxDQUFDO3lCQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUV6QixXQUF3QyxFQUF0QixLQUFBLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUF0QixjQUFzQixFQUF0QixJQUFzQixFQUFFO3dCQUEvQixHQUFHO3dCQUNWLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQ25DO29CQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7b0JBRTdELHFCQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FDYixPQUFLLENBQUEsQ0FBRSxVQUFDLENBQUM7NEJBQ04sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRTtnQ0FDMUIsTUFBTSxDQUFDLENBQUM7NkJBQ1g7aUNBQU07Z0NBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBRSxZQUFVLENBQUMsQ0FBQyxPQUFTLENBQUUsQ0FBQztnQ0FDckMsSUFBTyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQ0FDN0IsUUFBUSxDQUFDLFVBQVUsQ0FBRSxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFFLENBQUM7Z0NBRWpELE9BQU8sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFO2lDQUNuRDs2QkFDSjt3QkFDTCxDQUFDLENBQUMsQ0FDRCxTQUFPLENBQUEsQ0FBQzs0QkFDTCxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7d0JBQ2pDLENBQUMsQ0FBQyxFQUFBOztvQkFoQk4sU0FnQk0sQ0FBQzs7Ozs7Q0FDVjtBQUNELFFBQVEsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY29tbWFuZGVyIGZyb20gJ2NvbW1hbmRlcic7XHJcbmltcG9ydCAqIGFzIG1haW4gZnJvbSAnLi9tYWluJztcclxuaW1wb3J0ICogYXMgbGliIGZyb20gJy4vbGliJztcclxuXHJcbmZ1bmN0aW9uICBleGl0RnJvbUNvbW1hbmRlcihlOiBjb21tYW5kZXIuQ29tbWFuZGVyRXJyb3IpIHtcclxuICAgIGlmIChlLmNvZGUgIT09ICdjb21tYW5kZXIudmVyc2lvbicpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlLm1lc3NhZ2UpO1xyXG4gICAgfVxyXG59XHJcbmFzeW5jIGZ1bmN0aW9uICBjYWxsTWFpbigpIHtcclxuICAgIGNvbW1hbmRlci5wcm9ncmFtLnZlcnNpb24oJzAuMS4xJykuZXhpdE92ZXJyaWRlKGV4aXRGcm9tQ29tbWFuZGVyKVxyXG4gICAgICAgIC5leGl0T3ZlcnJpZGUoZXhpdEZyb21Db21tYW5kZXIpXHJcbiAgICAgICAgLm9wdGlvbihcIi1sLCAtLWxvY2FsZSA8cz5cIilcclxuICAgICAgICAub3B0aW9uKFwiLXQsIC0tdGVzdFwiKVxyXG4gICAgICAgIC5vcHRpb24oXCItYywgLS1jb21tYW5kIDxzPlwiKVxyXG4gICAgICAgIC5vcHRpb24oXCItaSwgLS1pbnB1dFwiKVxyXG4gICAgICAgIC5wYXJzZShwcm9jZXNzLmFyZ3YpO1xyXG5cclxuICAgIGZvciAoY29uc3QgYXJnIG9mIGNvbW1hbmRlci5wcm9ncmFtLmFyZ3MpIHtcclxuICAgICAgICBtYWluLnByb2dyYW1Bcmd1bWVudHMucHVzaChhcmcpO1xyXG4gICAgfVxyXG4gICAgT2JqZWN0LmFzc2lnbihtYWluLnByb2dyYW1PcHRpb25zLCBjb21tYW5kZXIucHJvZ3JhbS5vcHRzKCkpO1xyXG5cclxuICAgIGF3YWl0ICBtYWluLm1haW4oKVxyXG4gICAgICAgIC5jYXRjaCggKGUpPT57XHJcbiAgICAgICAgICAgIGlmIChtYWluLnByb2dyYW1PcHRpb25zLnRlc3QpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coIGBFUlJPUjogJHtlLm1lc3NhZ2V9YCApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgIHRpbWVPdmVyID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRpbWVPdmVyLnNldFNlY29uZHMoIHRpbWVPdmVyLmdldFNlY29uZHMoKSArIDEgKTtcclxuXHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSA8IHRpbWVPdmVyLmdldFRpbWUoKSkge1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuZmluYWxseSgoKT0+e1xyXG4gICAgICAgICAgICBsaWIuZ2V0SW5wdXRPYmplY3QoKS5jbG9zZSgpO1xyXG4gICAgICAgIH0pO1xyXG59XHJcbmNhbGxNYWluKCk7XHJcbiJdfQ==