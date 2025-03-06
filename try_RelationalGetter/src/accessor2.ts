// メモ化した getter - accessTime getter
// 定義例
interface  UserData {
    firstName: string;
    lastName: string;
}
class  User implements UserData {
    // プロパティ一覧：firstName, lastName, fullName, accessTime
    firstName: string = "";
    lastName: string = "";
    get  fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    get  accessTime(): Date {
        if (this._accessTime === undefined) {

            const  accessTime = new Date();
            this._accessTime = accessTime;
        }
        return  this._accessTime;
    }
    clearMemo(): void {
        this._accessTime = undefined;
    }
    _accessTime?: Date;
    constructor(data: UserData) {
        Object.assign(this, data);
    }
}

// 使用例
import * as readline from "readline";
const stdio = readline.createInterface({input: process.stdin, output: process.stdout});

function  main2() {
    const  user = new User({
        firstName: 'John',
        lastName: 'Doe',
    });

    console.log(user.firstName);  // "John"
    console.log(user.fullName);   // "John Doe"
    console.log(`Now:  ${user.accessTime}`);
    stdio.question('Push Enter key to continue...', (input: any) => {
        console.log(`Now?: ${user.accessTime}`);  // Not +n msec, because _accessTime is not overwritten.
        user.clearMemo()
        console.log(`Now:  ${user.accessTime}`);
        stdio.close();
    });
}
main2();
