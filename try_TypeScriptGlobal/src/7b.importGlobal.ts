import  '@src/7c.importGlobal'

declare global {export const  gDefaultLength: number} (globalThis as any).
gDefaultLength = 100;

export class  SetBuffer {
    static  gDefaultLength(x: number) {
        (globalThis as any).gDefaultLength = x;
    }
}
