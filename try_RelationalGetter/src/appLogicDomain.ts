import { User } from "./EntityDomain";
import * as Infra from "./Infra"

// [
//     {"name":"John","point":210},
//     {"name":"Mark","point":220},
// ]
export function  runLogicsSample() {
    runLogicsByPrimitiveGetter();
    runLogicsByObjectGetter();
    runLogicsByInfraDirect();
}

export function  runLogicsByPrimitiveGetter() {
    console.log("Logics - primitive getter:");
    console.log(`    ${JSON.stringify([{
        name: "John",
        point: new User({name: "John"}).point,
    },{
        name: "Mark",
        point: new User({name: "Mark"}).point,
    }])}`);
}

export function  runLogicsByObjectGetter() {
    console.log("Logics - object getter:");
    console.log(`    ${JSON.stringify([{
        name: "John",
        point: new User({name: "John"}).userPointRecord.point,
    },{
        name: "Mark",
        point: new User({name: "Mark"}).userPointRecord.point,
    }])}`);
}

export function  runLogicsByInfraDirect() {
    console.log("Logics - infra direct:");
    const  johnID = Infra.getUserRecord("John").id;
    const  markID = Infra.getUserRecord("Mark").id;

    console.log(`    ${JSON.stringify([{
        name: "John",
        point: Infra.getPointRecord(johnID).point,
    },{
        name: "Mark",
        point: Infra.getPointRecord(markID).point,
    }])}`);
}
