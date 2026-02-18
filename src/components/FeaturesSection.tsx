import { motion } from "framer-motion";
import { Target, BarChart3, Zap, Mail, Users, Globe } from "lucide-react";

const features = [
  {
    icon: Mail,
    title: "Email Marketing",
    description: "We write and send emails that follow up with your leads automatically until they're ready to talk. No manual chasing.",
    featured: true,
  },
  {
    icon: Target,
    title: "Running Ads",
    description: "We set up and manage your ads on Google, Meta, and LinkedIn. Targeting the buyers most likely to convert.",
  },
  {
    icon: Globe,
    title: "Landing Pages",
    description: "Simple, focused pages built around one goal: turning ad clicks into leads your sales team can actually work with.",
  },
  {
    icon: Users,
    title: "Lead Tracking",
    description: "Every lead is scored and sent to the right person on your team with full context on where they came from.",
  },
  {
    icon: Zap,
    title: "Sales Funnels",
    description: "We build the full path from first ad to booked meeting, designed around how your team actually sells.",
  },
  {
    icon: BarChart3,
    title: "Ad Copy",
    description: "We write your ads, emails, and page content. Clear, direct language that gets people to take the next step.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-deep mb-4">What we handle</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Everything your pipeline needs, handled
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            From running ads to writing follow ups. We take care of it so your team can sell.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Featured card */}
          {(() => {
            const FeaturedIcon = features[0].icon;
            return (
              <motion.div
                variants={item}
                className="bg-card border-2 border-purple-deep/20 rounded-2xl p-8 md:p-10 mb-4"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl icon-bg flex items-center justify-center shrink-0">
                    <FeaturedIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    {/*} <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-deep bg-purple-light rounded-full px-2.5 py-1 mb-2">
                      Most popular
                    </div> */}
                    <h3 className="text-xl font-bold text-foreground mb-2">{features[0].title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{features[0].description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })()}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.slice(1).map((feature) => (
              <motion.div
                key={feature.title}
                variants={item}
                className="bg-card border border-border rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl icon-bg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
