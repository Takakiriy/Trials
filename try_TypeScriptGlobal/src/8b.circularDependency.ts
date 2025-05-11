import type { InterfaceA } from '@src/8a.circularDependency';
import '@src/8aConst.circularDependency';  // 共有部分を import します

declare global {export const  gVariableAB: InterfaceA} (globalThis as any).
gVariableAB = gVariableA;

// -----

declare global {export const  gVariableB: InterfaceB} (globalThis as any).
gVariableB = {nameB: 'B'};

export interface  InterfaceB {
    nameB: string;
}

export function  mainB() {
    console.log(`8b: gVariableA: "${gVariableA.nameA}", gVariableAB: "${gVariableAB.nameA}", gVariableB: "${gVariableB.nameB}"`);

    const  a: InterfaceA = {nameA: 'AA'};
    const  b: InterfaceB = {nameB: 'BB'};
    console.log(`8b: nameA: "${a.nameA}", nameB: "${b.nameB}"`);
}

const  commandParameter1 = process.argv[2];
if (commandParameter1 === 'b') {
    console.log('Start 8b');
    mainB();
}
