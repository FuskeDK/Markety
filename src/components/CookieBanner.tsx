import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "markety-cookie-consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-sm z-50"
        >
          <div className="bg-card border border-border rounded-2xl p-5 shadow-lg">
            <div className="flex items-start gap-3 mb-4">
              <Cookie className="w-5 h-5 text-purple-deep shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-bold text-foreground mb-1">We use cookies</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We use cookies to improve your experience on our site. By continuing, you agree to our{" "}
                  <Link to="/privacy" className="underline text-purple-deep hover:text-purple-mid transition-colors">
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link to="/terms" className="underline text-purple-deep hover:text-purple-mid transition-colors">
                    Terms
                  </Link>
                  .
                </p>
              </div>
              <button
                onClick={decline}
                aria-label="Dismiss"
                className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="hero" className="rounded-full flex-1 text-xs" onClick={accept}>
                Accept all
              </Button>
              <Button size="sm" variant="outline" className="rounded-full flex-1 text-xs" onClick={decline}>
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
