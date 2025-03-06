import * as Infra from "./Infra"

export interface  UserData {
    name: string;
}
export class  User implements UserData {
    name: string = "";
    get  point(): number {
        return  this.userPointRecord.point;
    }
    get  userPointRecord(): Infra.PointRecord {
        return  Infra.getPointRecord(this.userRecord.id);
    }
    get  userRecord(): Infra.User {
        return  Infra.getUserRecord(this.name);
    }
    constructor(data: UserData) {
        Object.assign(this, data);
    }
}
