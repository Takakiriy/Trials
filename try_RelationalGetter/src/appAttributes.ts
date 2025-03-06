// This sample using attributes will allow non-navigable data to be expressed in code.
export function  runAttributesSample() {
    console.log("Attributes:");

    // {"name":"John","point":110}
    console.log(`    ${JSON.stringify({
        name: "John",
        point: getUser("John").point,
    })}`);

    // {"name":"Mark","point":120}
    console.log(`    ${JSON.stringify({
        name: "Mark",
        point: getUser("Mark").point,
    })}`);
}

function  getUser(name: string): User {
    const  input = getInputParameters(name);
    return  {name: name, point: input.userPointRecord.point};
}

function  getInputParameters(name: string): InputRecords {
    const  userRecord = getUserRecord(name)
    return  {
        userRecord: userRecord,
        userPointRecord: getPointRecord(userRecord.id),
    };
}

interface  User {
    name: string;
    point: number;
}

interface  InputRecords {
    userRecord: UserRecord;
    userPointRecord: PointRecord;
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
    records[1] = {userId: 1, point: 110};
    records[2] = {userId: 2, point: 120};
    return  records[userId];
}
