import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-lg"
        >
          {/* Big 404 */}
          <p className="text-[160px] md:text-[200px] font-extrabold leading-none text-muted/40 tabular-nums select-none mb-6">
            404
          </p>

          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
            This page doesn't exist
          </h1>
          <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
            The page you're looking for may have been moved, deleted, or never existed. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" className="rounded-full px-8 font-bold" asChild>
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <Button variant="heroOutline" size="lg" className="rounded-full px-8" asChild>
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
