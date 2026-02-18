import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, User } from "lucide-react";

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

const SPEED = 0.6;

const TestimonialsSection = () => {
  // ── Mobile state ──
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(i => (i + 1) % testimonials.length);
  const t = testimonials[current];

  // Touch swipe
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) next();
    else if (delta > 50) prev();
  };

  // ── Desktop scroll + drag ──
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isHovering = useRef(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Start at the middle copy so we can scroll both ways
    const oneSetWidth = el.scrollWidth / 3;
    el.scrollLeft = oneSetWidth;

    const frame = () => {
      if (!isHovering.current && !drag.current.active) {
        el.scrollLeft += SPEED;
        // Seamless loop: stay within [oneSetWidth, 2*oneSetWidth)
        if (el.scrollLeft >= oneSetWidth * 2) el.scrollLeft -= oneSetWidth;
        if (el.scrollLeft < oneSetWidth) el.scrollLeft += oneSetWidth;
      }
      rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);

    const onEnter = () => { isHovering.current = true; };
    const onLeave = () => { isHovering.current = false; };

    const onMouseDown = (e: MouseEvent) => {
      drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft };
      el.style.cursor = "grabbing";
      e.preventDefault();
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!drag.current.active) return;
      const delta = drag.current.startX - e.clientX;
      el.scrollLeft = drag.current.startScroll + delta;
      // Keep within the three-copy range
      const total = el.scrollWidth;
      if (el.scrollLeft < 0) el.scrollLeft += oneSetWidth;
      if (el.scrollLeft >= total - oneSetWidth) el.scrollLeft -= oneSetWidth;
    };
    const onMouseUp = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      el.style.cursor = "grab";

      // Snap to nearest card center
      const CARD_TOTAL = 424; // 400px card + 12px margin each side
      const containerWidth = el.clientWidth;
      const viewportCenter = el.scrollLeft + containerWidth / 2;
      const nearestIndex = Math.round((viewportCenter - 212) / CARD_TOTAL);
      const targetScroll = nearestIndex * CARD_TOTAL + 212 - containerWidth / 2;
      el.scrollTo({ left: Math.max(0, targetScroll), behavior: "smooth" });

      // After snap animation completes, normalize position
      setTimeout(() => {
        while (el.scrollLeft >= oneSetWidth * 2) el.scrollLeft -= oneSetWidth;
        while (el.scrollLeft < oneSetWidth) el.scrollLeft += oneSetWidth;
      }, 420);
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <section className="py-24">
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

      {/* Mobile: swipeable single card + arrows */}
      <div
        className="md:hidden container mx-auto px-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex gap-0.5 mb-4">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm text-foreground leading-relaxed mb-6">"{t.quote}"</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full icon-bg flex items-center justify-center shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}, {t.company}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 px-1">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-muted-foreground">{current + 1} / {testimonials.length}</span>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Desktop: drag-to-scroll */}
      <div className="hidden md:block relative">
        <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll no-scrollbar cursor-grab select-none"
        >
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
                <div className="w-10 h-10 rounded-full icon-bg flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-white" />
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
