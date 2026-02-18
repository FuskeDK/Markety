import { motion } from "framer-motion";
import { User, FileText, Shield, Calendar } from "lucide-react";

const items = [
  {
    icon: User,
    title: "One dedicated contact",
    desc: "You talk to the same person every time. Someone who knows your account, your goals, and your market. Not a different rep each week.",
  },
  {
    icon: FileText,
    title: "Weekly reports, always",
    desc: "Every Monday you get a clear summary: what ran, what it cost, how many leads came in, and what we're doing next. No fluff, just the numbers.",
  },
  {
    icon: Shield,
    title: "You own everything",
    desc: "Every campaign, page, and email list lives in your own accounts. We build it, you keep it. Leave any time and take it all with you.",
  },
  {
    icon: Calendar,
    title: "No long term contracts",
    desc: "We work month to month. We'd rather keep your business because results are good. Not because you're locked into an annual deal.",
  },
];

const DifferentiatorsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-deep mb-4">What you get</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Built to be easy to work with
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            No black boxes, no surprises. Just a straightforward setup where you always know what's happening.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl icon-bg flex items-center justify-center mb-4 mx-auto">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorsSection;
