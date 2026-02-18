import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Settings } from "lucide-react";

const benefits = [
  {
    icon: DollarSign,
    title: "No retainers, no fluff",
    description: "You pay for the leads we deliver, period. If the numbers don't work, you keep your money.",
  },
  {
    icon: TrendingUp,
    title: "Scales when you're ready",
    description: "Once we dial in what works, we put more behind it. Higher spend, same cost per lead, bigger pipeline.",
  },
  {
    icon: Settings,
    title: "We run the whole operation",
    description: "Ads, pages, emails, reporting. Your team doesn't lift a finger. We manage every piece of the pipeline.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-card-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-400 mb-4">Our model</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-background mb-3">
            Built around your results
          </h2>
          <p className="text-background/50 max-w-lg mx-auto">
            We don't charge retainers. Our pricing is tied directly to the leads we deliver.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-background/10 rounded-2xl p-8 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-background/10 flex items-center justify-center mb-5 mx-auto">
                <benefit.icon className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-background mb-2">{benefit.title}</h3>
              <p className="text-sm text-background/50 leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
