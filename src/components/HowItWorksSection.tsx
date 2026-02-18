import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "We learn your business",
    desc: "A 30 minute call where we understand your customers, your sales process, and what a qualified lead looks like for you. No generic playbooks.",
  },
  {
    number: "02",
    title: "We build your system",
    desc: "Landing pages, email sequences, and ad campaigns all set up inside your own accounts. You own everything from day one.",
  },
  {
    number: "03",
    title: "We go live and improve",
    desc: "Campaigns launch and we immediately start testing. Every week we analyse what's working, cut what isn't, and put more behind what drives results.",
  },
  {
    number: "04",
    title: "Leads arrive, you close",
    desc: "Your sales team gets a steady stream of people who are already interested and fully qualified. You focus on conversations. We handle everything before that.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-muted/40">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-deep mb-4">How it works</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            From first call to full pipeline
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Four steps and you're live. No months of onboarding, no complicated handoffs.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 flex gap-6 items-start hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-6xl font-extrabold shrink-0 leading-none select-none text-purple-deep opacity-25">
                {step.number}
              </p>
              <div className="pt-1">
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
