import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import initSmoothScrolling from "./lib/initSmoothScroll";

createRoot(document.getElementById("root")!).render(<App />);

// Lazy-initialize smooth scrolling (Lenis) on first user interaction or idle.
// This avoids adding the library to the critical path while still providing
// a noticeably smoother inertial scroll experience when the user first
// interacts with the page.
function setupLazySmoothScroll() {
	const trigger = () => {
		initSmoothScrolling();
		cleanup();
	};

	const cleanup = () => {
		document.removeEventListener("wheel", trigger);
		document.removeEventListener("touchstart", trigger);
		document.removeEventListener("pointerdown", trigger);
		document.removeEventListener("keydown", trigger);
	};

	document.addEventListener("wheel", trigger, { passive: true, once: true } as AddEventListenerOptions);
	document.addEventListener("touchstart", trigger, { passive: true, once: true } as AddEventListenerOptions);
	document.addEventListener("pointerdown", trigger, { passive: true, once: true } as AddEventListenerOptions);
	document.addEventListener("keydown", trigger, { once: true } as AddEventListenerOptions);

	if (typeof window !== "undefined" && "requestIdleCallback" in window && typeof window.requestIdleCallback === "function") {
				(window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout?: number }) => void }).requestIdleCallback(() => initSmoothScrolling(), { timeout: 500 });
	} else {
		// Fallback to a small timeout so it loads soon after interactive.
				setTimeout(() => initSmoothScrolling(), 500);
	}
}

setupLazySmoothScroll();

// Expose dev helpers so you can force-init Lenis or reveal elements from the console.
// Usage: `window.__initLenis()` or `window.__revealAll()`
(window as unknown as Window).__initLenis = initSmoothScrolling;
(window as unknown as Window).__revealAll = () => {
	document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
};
