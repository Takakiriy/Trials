// This sample using getters will allow navigable data to be expressed in code.
export function  runGettersSample() {
    console.log("Getters:");

    // {"name":"John","point":210}
    console.log(`    ${JSON.stringify({
        name: "John",
        point: getUser("John").point,
    })}`);

    // {"name":"Mark","point":220}
    console.log(`    ${JSON.stringify({
        name: "Mark",
        point: getUser("Mark").point,
    })}`);
}

function  getUser(name: string): User {
    return  new User({name: name});
}

interface  UserData {
    name: string;
}
class  User implements UserData {
    name: string = "";
    get  point(): number {
        return  this.userPointRecord.point;
    }
    get  userPointRecord(): PointRecord {
        return  getPointRecord(this.userRecord.id);
    }
    get  userRecord(): UserRecord {
        return  getUserRecord(this.name);
    }
    constructor(data: UserData) {
        Object.assign(this, data);
    }
}

// ------------------------
// Database
interface  UserRecord {
    id: number;
    name: string;
}

interface  PointRecord {
    userId: number;
    point: number;
}

function  getUserRecord(name: string): UserRecord {
    const  records: {[name: string]: UserRecord} = {}
    records["John"] = {id: 1, name: "John"};
    records["Mark"] = {id: 2, name: "Mark"};
    return  records[name];
}

function  getPointRecord(userId: number): PointRecord {
    const  records: {[userId: number]: PointRecord} = {}
    records[1] = {userId: 1, point: 210};
    records[2] = {userId: 2, point: 220};
    return  records[userId];
}
