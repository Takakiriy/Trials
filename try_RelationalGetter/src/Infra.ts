export interface  User {
    id: number;
    name: string;
}

export interface  PointRecord {
    userId: number;
    point: number;
}

export function  getUserRecord(name: string): User {
    const  records: {[name: string]: User} = {}
    records["John"] = {id: 1, name: "John"};
    records["Mark"] = {id: 2, name: "Mark"};
    return  records[name];
}

export function  getPointRecord(userId: number): PointRecord {
    const  records: {[userId: number]: PointRecord} = {}
    records[1] = {userId: 1, point: 210};
    records[2] = {userId: 2, point: 220};
    return  records[userId];
}
