export function  main() {
    const  service0 = new Service();
    const  service1 = new Service({power: 110, time: 40, activeUser: user1});
    const  service2 = new Service({power: 140, time: 60, activeUser: user2});

    service0.process();
    service1.process();
    service2.process();
    service0.process();
    service1.process();
    service2.process();
}

class  Service {
    context: Context;

    constructor(context: Context = gContextDefault) {
        this.context = {... context};  // [... ] is shallow copy.
    }

    process() {
        console.log(`${this.context.activeUser.name} のデータを処理中 power: ${this.context.power}, time: ${this.context.time} ...`);
    }
}

interface  Context {
    power: number;
    time: number;
    activeUser: User;
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

declare global {export const  gDefaultUser: User} (globalThis as any).
gDefaultUser = {
    name: 'user0',
};

declare global {export const  gContextDefault: Context} (globalThis as any).
gContextDefault = {power: 100, time: 30, activeUser: gDefaultUser};

main();
