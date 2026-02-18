import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function CountUpNumber({
  end,
  format,
  duration = 2000,
}: {
  end: number;
  format: (n: number) => string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let rafId: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(end * eased);
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, end, duration]);

  return <span ref={ref}>{format(count)}</span>;
}

const stats = [
  { format: (n: number) => `$${(n / 100).toFixed(2)}`, end: 420, label: "Avg. cost per qualified lead" },
  { format: (n: number) => `${Math.round(n)}+`, end: 0, label: "Companies using Markety" },
  { format: (n: number) => `${Math.round(n)}K+`, end: 0, label: "Leads delivered this year" },
];

const StatsSection = () => {
  return (
    <section className="py-16 border-y border-border bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-extrabold text-purple-deep mb-2 tabular-nums">
                <CountUpNumber end={stat.end} format={stat.format} />
              </p>
              <div className="w-8 h-0.5 bg-purple-deep rounded-full mx-auto mb-2 opacity-40" />
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
