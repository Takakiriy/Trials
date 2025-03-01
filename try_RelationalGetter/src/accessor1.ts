// getter の基本 - fullName
// 定義
interface  UserData {
    firstName: string;
    lastName: string;
}
class  User implements UserData {
    firstName: string = "";
    lastName: string = "";
    get  fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    constructor(data: UserData) {
        Object.assign(this, data);
    }
}

// 使用例
function  main1() {
    const  user = new User({
        firstName: 'John',
        lastName: 'Doe',
    });

    console.log(user.firstName);  // "John"
    console.log(user.fullName);   // "John Doe"
}
main1();
