let initted = false;

export async function initSmoothScrolling(): Promise<void> {
  if (typeof window === "undefined" || initted) return;
  initted = true;
  try {
    let mod: any;
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
    const Lenis = (mod as any).Lenis || (mod as any).default || mod;

    const lenis = new Lenis({
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
    (window as any).__lenis = lenis;
  } catch (err) {
    // Loading is optional — fail gracefully
    // eslint-disable-next-line no-console
    console.warn("initSmoothScrolling: failed to load lenis:", err);
  }
}

export default initSmoothScrolling;
