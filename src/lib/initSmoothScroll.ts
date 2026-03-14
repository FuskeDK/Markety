import type { Lenis as LenisInstance, LenisOptions } from "lenis";

let initted = false;

type LenisConstructor = new (options?: LenisOptions) => LenisInstance;

export async function initSmoothScrolling(): Promise<void> {
  if (typeof window === "undefined" || initted) return;
  initted = true;

  try {
    let mod: unknown;
    try {
      mod = await import("lenis");
    } catch (err) {
      // Fallback to CDN if package not installed — use variable imports so
      // TypeScript won't try to resolve literal URL module specifiers.
      const fallbackUrls = [
        "https://cdn.jsdelivr.net/npm/lenis@latest/dist/lenis.mjs",
        "https://cdn.skypack.dev/lenis",
      ];
      for (const url of fallbackUrls) {
        try {
          // @vite-ignore: prevent Vite from pre-bundling this dynamic URL import
             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
             // @ts-ignore - external URL import may not have types
          mod = await import(/* @vite-ignore */ url);
          if (mod) break;
        } catch {
          // ignore and try next
        }
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
