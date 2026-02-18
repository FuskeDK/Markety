import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Users, TrendingUp, BarChart3, Heart, Eye, Lightbulb, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border) / 0.9) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border) / 0.9) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 58% 48% at 50% 38%, transparent 0%, transparent 58%, black 88%)',
          WebkitMaskImage: 'radial-gradient(ellipse 58% 48% at 50% 38%, transparent 0%, transparent 58%, black 88%)',
        }} />
        <div className="absolute top-0 left-0 right-0 h-[500px] pointer-events-none" style={{
          background: `linear-gradient(to bottom, transparent 60%, hsl(var(--background)) 100%)`
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-600 mb-6">About Markety</p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6">
              The team behind your next pipeline
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Marketers, media buyers, and campaign strategists focused on one thing: getting businesses more of the right leads.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-600 mb-4">How we got here</p>
              <h2 className="text-3xl font-extrabold text-foreground">
                We started because we kept seeing the same problem.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4 text-muted-foreground leading-relaxed"
            >
              <p>
                Companies were spending money on ads and content but had no system to turn attention into revenue. Budgets got burned. Sales teams waited around. Nobody could point to what was working.
              </p>
              <p>
                We started Markety to fix that. We handle the campaigns, the funnels, the follow ups. The whole machine. Our clients get a steady flow of qualified prospects without building an in house team.
              </p>
              <p>
                We work with B2B and B2C companies across a range of industries. The common thread: they want more of the right leads, at a cost that makes sense.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Built for results", desc: "We launched in 2026 with one focus: building campaign systems that actually deliver leads at a cost that makes sense." },
              { title: "Built around teamwork", desc: "Our strategists, writers, and media buyers work on each account together. Not in separate silos." },
              { title: "We stay current", desc: "Platforms change fast. We run weekly tests across channels so our playbooks stay relevant." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8"
              >
                <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-600 mb-4">What we stand for</p>
            <h2 className="text-3xl font-extrabold text-foreground">
              The principles behind every campaign
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Heart, title: "Ownership", desc: "We treat your ad budget like it's ours. Every dollar matters, and we optimize like our own business depends on it." },
              { icon: Eye, title: "Honesty", desc: "If a campaign isn't performing, we tell you before you have to ask. No spin, no burying bad numbers in a PDF." },
              { icon: Lightbulb, title: "Curiosity", desc: "We run experiments every week. New creatives, new audiences, new channels. What works gets scaled, what doesn't gets cut." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-purple-light flex items-center justify-center mb-5 mx-auto">
                  <item.icon className="w-7 h-7 text-purple-deep" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What sets us apart */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-600 mb-4">How we're different</p>
            <h2 className="text-3xl font-extrabold text-foreground">
              Why clients stay with us
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Target, title: "We know who to target", desc: "Every campaign starts with your ideal buyer profile. We don't run broad ads and hope for the best." },
              { icon: Users, title: "You get a real team", desc: "Not a junior account manager. You work with strategists, writers, and buyers who know your account." },
              { icon: TrendingUp, title: "We get paid on results", desc: "Our fees are tied to what we deliver. If the leads don't come in, we don't get paid." },
              { icon: BarChart3, title: "You see everything", desc: "Live dashboards, no hidden metrics. You always know what's running and what it costs." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 flex gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-light flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-purple-deep" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Interested in working together?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              We keep our client list small so we can focus. If you think there's a fit, reach out and let's talk.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="rounded-full text-base px-10 py-6 font-bold"
              onClick={() => navigate('/contact', { state: { scrollToForm: true } })}
            >
              Get in touch
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
