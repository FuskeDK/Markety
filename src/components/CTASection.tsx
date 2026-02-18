import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-deep mb-4">Ready to grow?</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Let's see if we're a good fit
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            We keep our client list small so every account gets real attention. Reach out and we'll walk you through it.
          </p>
          <Button
            variant="hero"
            size="lg"
            className="rounded-full text-base px-10 py-6 font-bold"
            onClick={() => navigate('/contact', { state: { scrollToForm: true } })}
          >
            Contact us
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
