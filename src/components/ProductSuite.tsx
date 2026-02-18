import { motion } from "framer-motion";
import { Mail, BarChart3, Globe } from "lucide-react";

const products = [
  {
    icon: Mail,
    title: "Email Marketing",
    desc: "We write and send emails that keep your leads warm and moving. Not spam. Just the right message at the right time, until they're ready to talk.",
  },
  {
    icon: BarChart3,
    title: "Funnel Structure",
    desc: "We build the step by step path that takes someone from first click to booked meeting. Ads, pages, follow ups, all connected and working together.",
  },
  {
    icon: Globe,
    title: "Landing Pages",
    desc: "We create simple, focused pages built for one thing: turning visitors into leads. Clear message, clear next step, nothing to distract them.",
  },
];

const ProductSuite = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-deep mb-4">The setup</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Three services. One complete system.
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            We handle everything under your accounts. You keep the data, the pages, and the results. We just run the whole thing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {products.map((product, i) => (
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl icon-bg flex items-center justify-center mb-5 mx-auto">
                <product.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{product.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSuite;
