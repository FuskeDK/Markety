declare module 'lenis' {
  interface LenisOptions {
    duration?: number;
    easing?: (t: number) => number;
    smoothWheel?: boolean;
    smoothTouch?: boolean;
    wheelMultiplier?: number;
    touchMultiplier?: number;
  }

  class Lenis {
    constructor(options?: LenisOptions);
    raf(time?: number): void;
    on(event: string, cb: (...args: any[]) => void): void;
    off(event: string, cb?: (...args: any[]) => void): void;
    destroy(): void;
  }

  export { Lenis };
  export default Lenis;
}
