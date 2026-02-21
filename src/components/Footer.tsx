import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const Footer = () => {
  const { isDark, toggle } = useTheme();

  return (
    <footer className="border-t border-border py-14 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/Markety.png" alt="Markety" className="h-11 w-auto" />
            <span className="text-lg font-bold text-foreground">Markety</span>
          </div>

          <div className="flex items-center gap-8">
            <a href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms & Conditions</a>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Markety. All rights reserved.
            </p>
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
