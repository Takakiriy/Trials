declare global {export const  gCurrentPower: number} (globalThis as any).
gCurrentPower = 1;

export class  SetLifter {
    static  gCurrentPower(x: number) {
        (globalThis as any).gCurrentPower = x;
    }
}

function  main() {
    liftUp();  // gCurrentPower == 1
    sub();
    liftUp();  // gCurrentPower == 1
}

function  sub() {
    const  oldPower = gCurrentPower;

    SetLifter.gCurrentPower(2);
    liftUp();  // gCurrentPower == 2

    SetLifter.gCurrentPower(oldPower);  // このように、戻す処理が必要になる
}

function  liftUp() {
    console.log(`liftUp: ${gCurrentPower}`);
}

main();
