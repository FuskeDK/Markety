import type { Lenis as LenisInstance, LenisOptions } from "lenis";

let initted = false;

type LenisConstructor = new (options?: LenisOptions) => LenisInstance;

declare global {
  interface Window {
    __lenis?: LenisInstance;
    requestIdleCallback?: (cb: () => void, opts?: { timeout?: number }) => void;
  }
}

export async function initSmoothScrolling(): Promise<void> {
  if (typeof window === "undefined" || initted) return;
  initted = true;

  try {
    let mod: unknown;
    try {
      mod = await import("lenis");
    } catch (err) {
      // Fallback to CDN if package not installed
      try {
        mod = await import("https://cdn.jsdelivr.net/npm/lenis@latest/dist/lenis.mjs");
      } catch (err2) {
        // Try skypack as a last resort
        mod = await import("https://cdn.skypack.dev/lenis");
      }
    }

    const imported = mod as { default?: LenisConstructor; Lenis?: LenisConstructor } | undefined;
    const LenisCtor = (imported?.Lenis ?? imported?.default ?? (mod as unknown)) as unknown as LenisConstructor;

    const lenis = new LenisCtor({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    window.__lenis = lenis;
  } catch (err: unknown) {
    // Loading is optional — fail gracefully
    console.warn("initSmoothScrolling: failed to load lenis:", err);
  }
}

export default initSmoothScrolling;
