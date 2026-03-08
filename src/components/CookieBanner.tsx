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
          <div className="bg-foreground text-background rounded-2xl px-5 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xl">
              <p className="text-sm leading-snug mb-3 md:mb-0 flex-1">
                This site uses cookies.{" "}
                <Link to="/privacy" className="underline underline-offset-2 opacity-70 hover:opacity-100 transition-opacity">
                  Privacy Policy
                </Link>
              </p>
              <div className="flex flex-col md:flex-row items-center gap-2 shrink-0 w-full md:w-auto">
                <button
                  onClick={() => dismiss("declined")}
                  className="text-xs opacity-50 hover:opacity-80 transition-opacity px-1 w-full md:w-auto text-center"
                >
                  No thanks
                </button>
                <button
                  onClick={() => dismiss("accepted")}
                  className="text-xs font-semibold bg-background text-foreground rounded-full px-4 py-2 hover:opacity-90 transition-opacity w-full md:w-auto text-center"
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
