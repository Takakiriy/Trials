export function  main() {
    const  userService1 = new UserService({
        activeUser: user1,
        partner: user2,
        lifterIndex: 0,
    });
    const  userService2 = new UserService({
        activeUser: user2,
        partner: user1,
        lifterIndex: 1,
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
        liftUp(this.context.lifterIndex);
    }
}

interface  ServiceContext {
    activeUser: User;
    partner: User;
    lifterIndex: number;
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

const  gCurrentLifters = [
    {power: 2, time: 30},  // gCurrentLifters[0]
    {power: 3, time: 10},  // gCurrentLifters[1]
    {power: 0, time: 0},   // gCurrentLifters[2]
];

function  liftUp(index: number) {
    const  lifter = gCurrentLifters[index];
    console.log(`liftUp: ${lifter.power}, ${lifter.time}`);
}

main();
