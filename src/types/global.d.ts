import type { Lenis as LenisInstance } from "lenis";

export {};

declare global {
  interface Window {
    __lenis?: LenisInstance;
    requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => void;
  }
}
