// object literal - firstName
// 定義例
interface  UserData {
    firstName: string;
    lastName: string;
}

const  user = {
    firstName: "John",
    lastName: "Doe",
};

// 使用例
function  main0() {
    console.log(user.firstName);  // "John"
}
main0();

// エラーのサンプル。コメントアウトを外せば、エラーを再現できます。
// interface  UserData {
//     firstName: string;
//     lastName: string;
//     get  fullName(): string {  // エラー。interface の中に getter は書けません
//         return `${this.firstName} ${this.lastName}`;
//     }
// }
