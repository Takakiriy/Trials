import type { InterfaceA } from '@src/8a.circularDependency';
export {}

declare global {export const  gVariableA: InterfaceA} (globalThis as any).
gVariableA = {nameA: 'A'};
