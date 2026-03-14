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
          // Download the external module and import it via a blob URL. This
          // avoids bundler/TS server issues with literal external import
          // specifiers and doesn't require ts-ignore comments.
          const resp = await fetch(url);
          if (!resp.ok) continue;
          const src = await resp.text();
          const blob = new Blob([src], { type: "application/javascript" });
          const blobUrl = URL.createObjectURL(blob);
          try {
            mod = await import(/* @vite-ignore */ blobUrl);
            if (mod) {
              URL.revokeObjectURL(blobUrl);
              break;
            }
          } finally {
            // ensure we revoke if import failed or succeeded
            try {
                URL.revokeObjectURL(blobUrl);
              } catch (e) {
                void e;
              }
          }
        } catch (e) {
          void e; // ignore and try next
        }
      }
    }

    const imported = mod as { default?: LenisConstructor; Lenis?: LenisConstructor } | undefined;
    const LenisCtor = (imported?.Lenis ?? imported?.default ?? (mod as unknown)) as unknown as LenisConstructor;

    if (typeof LenisCtor !== "function") {
      console.warn("initSmoothScrolling: lenis constructor not found on imported module", { mod });
      return;
    }

    try {
      const lenis = new LenisCtor({
        duration: 1.2,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        autoRaf: true, // let Lenis manage its own RAF
      });

      const win = window as unknown as { lenisVersion?: unknown };
      console.info("initSmoothScrolling: lenis initialized", { version: win.lenisVersion ?? null });
      window.__lenis = lenis;
    } catch (err2) {
      console.warn("initSmoothScrolling: failed to construct Lenis", err2);
    }
  } catch (err: unknown) {
    // Loading is optional — fail gracefully
    console.warn("initSmoothScrolling: failed to load lenis:", err);
  }
}

export default initSmoothScrolling;
