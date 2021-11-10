var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as child_process from 'child_process';
const scriptPath = '../build/app.js';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield callChildProccess(`node ${scriptPath}`);
    });
}
// callChildProccess
function callChildProccess(commandLine, option) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolveFunction, rejectFunction) => __awaiter(this, void 0, void 0, function* () {
            const returnValue = new ProcessReturns();
            try {
                const childProcess = child_process.exec(commandLine, 
                // on close the "childProcess" (2)
                (error, stdout, stderr) => {
                    returnValue.stdout = stdout;
                    returnValue.stderr = stderr;
                    resolveFunction(returnValue);
                });
                if (option && childProcess.stdin) {
                    if (option.inputLines) {
                        yield new Promise(resolve => setTimeout(resolve, 300));
                        for (const inputLine of option.inputLines) {
                            console.log(inputLine);
                            childProcess.stdin.write(inputLine + "\n");
                            yield new Promise(resolve => setTimeout(resolve, 200));
                        }
                    }
                    childProcess.stdin.end();
                }
                // on close the "childProcess" (1)
                childProcess.on('close', (exitCode) => {
                    returnValue.exitCode = exitCode;
                });
                childProcess.on('exit', (exitCode) => {
                    returnValue.exitCode = exitCode;
                });
            }
            catch (e) {
                throw Error(`Error in the command line ${commandLine}`);
            }
        }));
    });
}
// ProcessOption
class ProcessOption {
}
// ProcessReturns
class ProcessReturns {
    constructor() {
        this.exitCode = 0;
        this.stdout = '';
        this.stderr = '';
    }
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXBwX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxLQUFLLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFFL0MsTUFBTyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7QUFFdEMsU0FBZ0IsSUFBSTs7UUFDbkIsTUFBTSxpQkFBaUIsQ0FBQyxRQUFRLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDL0MsQ0FBQztDQUFBO0FBRUQsb0JBQW9CO0FBQ3BCLFNBQWdCLGlCQUFpQixDQUFDLFdBQW1CLEVBQUcsTUFBc0I7O1FBQzdFLE9BQVMsSUFBSSxPQUFPLENBQUUsQ0FBTyxlQUFlLEVBQUUsY0FBYyxFQUFFLEVBQUU7WUFDL0QsTUFBTyxXQUFXLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztZQUMxQyxJQUFJO2dCQUNILE1BQU8sWUFBWSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUUsV0FBVztnQkFFcEQsa0NBQWtDO2dCQUNsQyxDQUFDLEtBQXlDLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxFQUFFO29CQUM3RSxXQUFXLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztvQkFDNUIsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQzVCLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUNELENBQUM7Z0JBQ0YsSUFBSSxNQUFNLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRTtvQkFFakMsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO3dCQUN0QixNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUN2RCxLQUFLLE1BQU0sU0FBUyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7NEJBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ3ZCLFlBQVksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQzs0QkFDM0MsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQzt5QkFDdkQ7cUJBQ0Q7b0JBQ0QsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztpQkFDekI7Z0JBRUQsa0NBQWtDO2dCQUNsQyxZQUFZLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQWdCLEVBQUUsRUFBRTtvQkFDN0MsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7Z0JBQ2pDLENBQUMsQ0FBQyxDQUFDO2dCQUNILFlBQVksQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBZ0IsRUFBRSxFQUFFO29CQUM1QyxXQUFXLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztnQkFDakMsQ0FBQyxDQUFDLENBQUM7YUFDSDtZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNYLE1BQU0sS0FBSyxDQUFDLDZCQUE2QixXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQ3hEO1FBQ0YsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FBQTtBQUVELGdCQUFnQjtBQUNoQixNQUFNLGFBQWE7Q0FFbEI7QUFFRCxpQkFBaUI7QUFDakIsTUFBTSxjQUFjO0lBQXBCO1FBQ0MsYUFBUSxHQUFXLENBQUMsQ0FBQztRQUNyQixXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQ3BCLFdBQU0sR0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztDQUFBO0FBRUQsSUFBSSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjaGlsZF9wcm9jZXNzIGZyb20gJ2NoaWxkX3Byb2Nlc3MnO1xyXG5cclxuY29uc3QgIHNjcmlwdFBhdGggPSAnLi4vYnVpbGQvYXBwLmpzJztcclxuXHJcbmFzeW5jIGZ1bmN0aW9uICBtYWluKCkge1xyXG5cdGF3YWl0IGNhbGxDaGlsZFByb2NjZXNzKGBub2RlICR7c2NyaXB0UGF0aH1gKTtcclxufVxyXG5cclxuLy8gY2FsbENoaWxkUHJvY2Nlc3NcclxuYXN5bmMgZnVuY3Rpb24gIGNhbGxDaGlsZFByb2NjZXNzKGNvbW1hbmRMaW5lOiBzdHJpbmcsICBvcHRpb24/OiBQcm9jZXNzT3B0aW9uKTogUHJvbWlzZTxQcm9jZXNzUmV0dXJucz4ge1xyXG5cdHJldHVybiAgIG5ldyBQcm9taXNlKCBhc3luYyAocmVzb2x2ZUZ1bmN0aW9uLCByZWplY3RGdW5jdGlvbikgPT4ge1xyXG5cdFx0Y29uc3QgIHJldHVyblZhbHVlID0gbmV3IFByb2Nlc3NSZXR1cm5zKCk7XHJcblx0XHR0cnkge1xyXG5cdFx0XHRjb25zdCAgY2hpbGRQcm9jZXNzID0gY2hpbGRfcHJvY2Vzcy5leGVjKCBjb21tYW5kTGluZSxcclxuXHJcblx0XHRcdFx0Ly8gb24gY2xvc2UgdGhlIFwiY2hpbGRQcm9jZXNzXCIgKDIpXHJcblx0XHRcdFx0KGVycm9yOiBjaGlsZF9wcm9jZXNzLkV4ZWNFeGNlcHRpb24gfCBudWxsLCBzdGRvdXQ6IHN0cmluZywgc3RkZXJyOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHRcdHJldHVyblZhbHVlLnN0ZG91dCA9IHN0ZG91dDtcclxuXHRcdFx0XHRcdHJldHVyblZhbHVlLnN0ZGVyciA9IHN0ZGVycjtcclxuXHRcdFx0XHRcdHJlc29sdmVGdW5jdGlvbihyZXR1cm5WYWx1ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHQpO1xyXG5cdFx0XHRpZiAob3B0aW9uICYmIGNoaWxkUHJvY2Vzcy5zdGRpbikge1xyXG5cclxuXHRcdFx0XHRpZiAob3B0aW9uLmlucHV0TGluZXMpIHtcclxuXHRcdFx0XHRcdGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAzMDApKTtcclxuXHRcdFx0XHRcdGZvciAoY29uc3QgaW5wdXRMaW5lIG9mIG9wdGlvbi5pbnB1dExpbmVzKSB7XHJcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKGlucHV0TGluZSk7XHJcblx0XHRcdFx0XHRcdGNoaWxkUHJvY2Vzcy5zdGRpbi53cml0ZShpbnB1dExpbmUgKyBcIlxcblwiKTtcclxuXHRcdFx0XHRcdFx0YXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMCkpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjaGlsZFByb2Nlc3Muc3RkaW4uZW5kKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdC8vIG9uIGNsb3NlIHRoZSBcImNoaWxkUHJvY2Vzc1wiICgxKVxyXG5cdFx0XHRjaGlsZFByb2Nlc3Mub24oJ2Nsb3NlJywgKGV4aXRDb2RlOiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHRyZXR1cm5WYWx1ZS5leGl0Q29kZSA9IGV4aXRDb2RlO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0Y2hpbGRQcm9jZXNzLm9uKCdleGl0JywgKGV4aXRDb2RlOiBudW1iZXIpID0+IHtcclxuXHRcdFx0XHRyZXR1cm5WYWx1ZS5leGl0Q29kZSA9IGV4aXRDb2RlO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0dGhyb3cgRXJyb3IoYEVycm9yIGluIHRoZSBjb21tYW5kIGxpbmUgJHtjb21tYW5kTGluZX1gKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuLy8gUHJvY2Vzc09wdGlvblxyXG5jbGFzcyBQcm9jZXNzT3B0aW9uIHtcclxuXHRpbnB1dExpbmVzPzogc3RyaW5nW107XHJcbn1cclxuXHJcbi8vIFByb2Nlc3NSZXR1cm5zXHJcbmNsYXNzIFByb2Nlc3NSZXR1cm5zIHtcclxuXHRleGl0Q29kZTogbnVtYmVyID0gMDtcclxuXHRzdGRvdXQ6IHN0cmluZyA9ICcnO1xyXG5cdHN0ZGVycjogc3RyaW5nID0gJyc7XHJcbn1cclxuXHJcbm1haW4oKTsiXX0=