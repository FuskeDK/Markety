import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";

function CountUpNumber({
  end,
  start = 0,
  format,
  duration = 2000,
}: {
  end: number;
  start?: number;
  format: (n: number) => string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let rafId: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(start + (end - start) * eased);
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, end, start, duration]);

  return <span ref={ref}>{format(count)}</span>;
}

const points = [
  {
    title: "We learn how your sales team works",
    desc: "Before we launch anything, we sit down with your team and map campaigns to your actual sales process.",
  },
  {
    title: "Every metric is shared with you",
    desc: "Live dashboards showing spend, cost per lead, and pipeline value. Nothing is hidden or locked behind a report.",
  },
  {
    title: "Our pricing reflects what we deliver",
    desc: "No monthly retainers. We charge based on the leads that land in your CRM.",
  },
];

const AboutPreview = () => {
  return (
    <section className="py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-deep mb-4">Why us</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              We plug into your workflow, not the other way around
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Most agencies operate in a black box. We'd rather show you exactly what we're doing, why, and what it costs. Then adjust based on what your sales team is actually seeing.
            </p>

            <div className="space-y-5">
              {points.map((point) => (
                <div key={point.title} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full icon-bg flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{point.title}</p>
                    <p className="text-sm text-muted-foreground">{point.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="bg-card border border-border rounded-2xl overflow-hidden"
          >
            {[
              { end: 2026, start: 2024, format: (n: number) => `${Math.round(n)}`, label: "Year we started" },
              { end: 200, start: 0, format: (n: number) => `${Math.round(n)}+`, label: "Companies we've worked with" },
              { end: 92, start: 0, format: (n: number) => `${Math.round(n)}%`, label: "Client retention rate" },
            ].map((stat, i) => (
              <div key={stat.label} className={`px-8 py-6 ${i !== 0 ? "border-t border-border" : ""}`}>
                <p className="text-4xl font-extrabold text-purple-deep tabular-nums">
                  <CountUpNumber end={stat.end} start={stat.start} format={stat.format} />
                </p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
