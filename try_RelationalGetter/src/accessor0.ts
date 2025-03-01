// object literal - firstName
// 定義
interface  UserData {
    firstName: string;
    lastName: string;
}

// 使用例
const  user = {
    firstName: 'John',
    lastName: 'Doe',
};

// 使用例
function  main0() {
    console.log(user.firstName);  // "John"
}
main0();
