export function  main() {
    liftUp();

    gCurrentLifter.power = 110;
    gCurrentLifter.time = 444;
    liftUp();

    gCurrentLifter.power = 100;
    gCurrentLifter.time = 333;
    liftUp();
}

function  liftUp() {
    const  lifter = gCurrentLifter;
    console.log(`liftUp power: ${lifter.power}, time: ${lifter.time}`);
}

const  gCurrentLifter = {power: 100, time: 333};

main();
