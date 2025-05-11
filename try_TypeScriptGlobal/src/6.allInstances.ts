export function  main() {
    liftUp();   // デフォルト値を使う
    liftUp(0);  // index (0) がグローバルでなければ、gCurrentLifters がグローバルでも良い
    liftUp(1);  // 並列動作もできる
    liftUp();
    liftUp(0);
    liftUp(1);
}

const  gCurrentLifters = [
    {power: 110, time: 444},  // gCurrentLifters[0]
    {power: 140, time: 666},  // gCurrentLifters[1]
    {power: 100, time: 333},  // gCurrentLifters[2]
];

function  liftUp(index: number = defaultLifterIndex) {
    const  lifter = gCurrentLifters[index];
    console.log(`liftUp power: ${lifter.power}, time: ${lifter.time}`);
}

const  defaultLifterIndex = 2;

main();
