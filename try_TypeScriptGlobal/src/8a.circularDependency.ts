import { InterfaceB } from '@src/8b.circularDependency';  // import type と同じ動作をします
import '@src/8b.circularDependency';  // InterfaceB が interface であるために、上記 import が import type の動きをするときは、これを書いてグローバル変数の初期化が必要

// -----

export interface  InterfaceA {
    nameA: string;
}

export function  mainA() {
    console.log(`8b: gVariableA: "${gVariableA.nameA}", gVariableAB: "${gVariableAB.nameA}", gVariableB: "${gVariableB.nameB}"`);

    const  a: InterfaceA = {nameA: 'A'};
    const  b: InterfaceB = {nameB: 'B'};
    console.log(`8a: nameA: "${a.nameA}", nameB: "${b.nameB}"`);
}

const  commandParameter1 = process.argv[2];
if (commandParameter1 === 'a') {
    console.log('Start 8a');
    mainA();
}
