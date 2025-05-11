import { SetBuffer } from "./1b.global"
import { defaultSize, setBufferDefaultSize } from "./1c.module";

export function  main() {
    console.log(`global variable gDefaultSize: ${gDefaultSize}`);
    SetBuffer.gDefaultSize(120);
    console.log(`global variable gDefaultSize: ${gDefaultSize}`);

    console.log(`file scope variable defaultSize: ${defaultSize}`);
    setBufferDefaultSize(144);
    console.log(`file scope variable defaultSize: ${defaultSize}`);
}

main();
