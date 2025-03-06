// getter の基本 - fullName getter
// 定義例
interface  UserData {
    firstName: string;
    lastName: string;
}
class  User implements UserData {
    // プロパティ一覧：firstName, lastName, fullName
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


// エラーのサンプル。コメントアウトを外せば、エラーを再現できます。
// const  user2: User = {  // エラー。 fullName getter が不足しているので代入できません
//     firstName: "John",
//     lastName: "Doe",
// }
