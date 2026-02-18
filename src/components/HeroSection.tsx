import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-40 pb-28 overflow-hidden">
      {/* Grid background */}
      <div className="absolute top-0 left-0 right-0 h-[680px] pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--border) / 0.9) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--border) / 0.9) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 58% 52% at 50% 43%, transparent 0%, transparent 60%, black 88%)',
        WebkitMaskImage: 'radial-gradient(ellipse 58% 52% at 50% 43%, transparent 0%, transparent 60%, black 88%)',
      }} />
      {/* Bottom fade */}
      <div className="absolute top-0 left-0 right-0 h-[680px] pointer-events-none" style={{
        background: `linear-gradient(to bottom, transparent 60%, hsl(var(--background)) 100%)`
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto"
        >
          {/* Social proof pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full badge-pill px-4 py-1.5 text-xs font-semibold mb-6"
          >
            Trusted by 0+ companies worldwide
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground mb-6">
            We generate leads.
            <br />You close deals.
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Markety handles your ad campaigns, funnels, and follow ups so your sales team always has someone to talk to.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="hero"
              size="lg"
              className="rounded-full text-base px-8 py-6 min-w-[180px] font-bold"
              onClick={() => navigate("/contact", { state: { scrollToForm: true } })}
            >
              Work with us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              className="rounded-full text-base px-8 py-6 min-w-[180px]"
              onClick={() => navigate("/about")}
            >
              Learn more
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
