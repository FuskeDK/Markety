import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
createRoot(document.getElementById("root")!).render(<App />);
(window as unknown as Window).__revealAll = () => {
	document.querySelectorAll(".reveal").forEach((el) => el.classList.add("revealed"));
};
