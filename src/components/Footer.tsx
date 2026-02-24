const Footer = () => {
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

          <p className="text-sm text-muted-foreground">
            © 2026 Markety. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
