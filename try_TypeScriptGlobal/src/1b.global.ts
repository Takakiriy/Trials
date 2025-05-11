declare global {export const  gDefaultSize: number} (globalThis as any).
gDefaultSize = 100;

export class  SetBuffer {
    static  gDefaultSize(x: number) {
        (globalThis as any).gDefaultSize = x;
    }
}
