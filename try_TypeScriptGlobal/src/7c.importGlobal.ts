declare global {export const  gDefaultTimeOut: number} (globalThis as any).
gDefaultTimeOut = 500;

export {}  // 1つも export が無いときに必要
