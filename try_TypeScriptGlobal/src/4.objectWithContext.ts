export function  main() {
    const  service0 = new Service();
    const  service1 = new Service({power: 110, time: 44, activeUser: user1});
    const  service2 = new Service({power: 140, time: 66, activeUser: user2});

    service0.process();
    service1.process();
    service2.process();
    service0.process();
    service1.process();
    service2.process();
}

class  Service {
    power: number;
    time: number;
    activeUser: User;

    constructor(parameters: Parameters = gDefaultParameters) {
        this.power = parameters.power || gDefaultPower;
        this.time = parameters.time || gDefaultTime;
        this.activeUser = parameters.activeUser || gDefaultActiveUser;
    }

    process() {
        console.log(`${this.activeUser.name} のデータを処理中 power: ${this.power}, time: ${this.time} ...`);
    }
}

interface  Parameters {
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

const  user0: User = {
    name: 'user0',
};

declare global {export const  gDefaultPower: number} (globalThis as any).
gDefaultPower = 100;

declare global {export const  gDefaultTime: number} (globalThis as any).
gDefaultTime = 33;

declare global {export const  gDefaultActiveUser: User} (globalThis as any).
gDefaultActiveUser = user0;

declare global {export const  gDefaultParameters: Parameters} (globalThis as any).
gDefaultParameters = {
    power: gDefaultPower,
    time: gDefaultTime,
    activeUser: gDefaultActiveUser,
};

main();
