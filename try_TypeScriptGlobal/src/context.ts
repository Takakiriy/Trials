export function  main() {
    const  userService1 = new UserService({
        activeUser: user1,
        partner: user2,
    });
    const  userService2 = new UserService({
        activeUser: user2,
        partner: user1,
    });

    userService1.process();
    userService2.process();
    userService1.process();
    userService2.process();
}

class  UserService {
    context: ServiceContext;

    constructor(context: ServiceContext) {
        this.context = context;
    }

    process() {
        const user = this.context.activeUser;
        console.log(`${user.name} のデータを処理中...`);
    }
}

interface  ServiceContext {
    activeUser: User;
    partner: User;
}

interface  User {
    name: string;
}

const  user1: User = {
    name: 'user1',
};

const  user2: User = {
    name: 'user2',
};

main();
