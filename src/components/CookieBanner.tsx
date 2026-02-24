import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const STORAGE_KEY = "markety-cookie-consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  const dismiss = (value: "accepted" | "declined") => {
    localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-lg"
        >
          <div className="bg-foreground text-background rounded-2xl px-5 py-4 flex items-center justify-between gap-4 shadow-xl">
            <p className="text-sm leading-snug">
              This site uses cookies.{" "}
              <Link to="/privacy" className="underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity">
                Privacy Policy
              </Link>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => dismiss("declined")}
                className="text-xs opacity-50 hover:opacity-80 transition-opacity px-1"
              >
                No thanks
              </button>
              <button
                onClick={() => dismiss("accepted")}
                className="text-xs font-semibold bg-background text-foreground rounded-full px-4 py-1.5 hover:opacity-90 transition-opacity"
              >
                Got it
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
