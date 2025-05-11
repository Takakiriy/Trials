import { SetBuffer } from "@src/7b.importGlobal"

export function  main() {
    console.log(`global variable gDefaultLength: ${gDefaultLength}`);
    SetBuffer.gDefaultLength(120);
    console.log(`global variable gDefaultLength: ${gDefaultLength}`);

    console.log(`global variable gDefaultTimeOut: ${gDefaultTimeOut}`);
}

main();
