import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Markety cut our cost per lead by 60% in the first month. We went from chasing cold contacts to having a full calendar of qualified demos.",
    name: "Anna Reyes",
    role: "Head of Growth",
    company: "BrightPath",
  },
  {
    quote: "The automation workflows save our team 20+ hours a week. We're generating triple the leads with the same headcount.",
    name: "Marcus Cole",
    role: "Marketing Director",
    company: "ScaleUp Co",
  },
  {
    quote: "We can finally see which campaigns drive revenue and which ones don't. No more guessing.",
    name: "Sophie Laurent",
    role: "VP of Marketing",
    company: "Nexus Digital",
  },
  {
    quote: "Our sales team went from 15 demos a month to 60. Markety's lead scoring means we only talk to prospects who are ready to buy.",
    name: "David Chen",
    role: "Sales Lead",
    company: "Vantage",
  },
  {
    quote: "Setting up campaigns across multiple channels used to take days. With Markety, we launch in hours and tweak as we go.",
    name: "Priya Patel",
    role: "Demand Gen Manager",
    company: "CloudNine",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-deep mb-4">Client feedback</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Hear it from the people we work with
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-sm text-muted-foreground ml-2">5.0 from 200+ clients</span>
          </div>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="shrink-0 w-[400px] mx-3 bg-card border border-border rounded-2xl p-7"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-foreground leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full icon-bg flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
