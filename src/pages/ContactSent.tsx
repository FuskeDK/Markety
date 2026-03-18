import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { setSeoMeta } from "@/lib/seo";

const ContactSent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setSeoMeta("contact");
  }, []);

  const state = (location.state || {}) as {
    name?: string;
    email?: string;
    message?: string;
    currentDate?: string;
    token?: string;
    form_url?: string;
    companyName?: string;
    cvr?: string;
    companyDescription?: string;
    goals?: string;
    service?: string;
  };

  return (
    <>
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="relative pt-28 pb-12 md:pt-40 md:pb-20 overflow-hidden">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto text-center"
            >
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-purple-600 mb-4">Message sent</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4">Thanks, your message is on its way</h1>
              <p className="text-muted-foreground mb-6">We've forwarded your message to the right specialist. You'll receive an email shortly with a short form requesting more information about your company.</p>
            </motion.div>

            <div className="max-w-2xl mx-auto mt-8 bg-card border border-border rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-3">Your submission</h2>
              <div className="text-sm text-muted-foreground space-y-2">
                <p><strong>Name:</strong> {state.name ?? "-"}</p>
                <p><strong>Email:</strong> {state.email ?? "-"}</p>
                <div>
                  <p className="font-semibold mt-2">Message</p>
                  <p className="whitespace-pre-wrap bg-muted p-3 rounded-md mt-1 text-sm">{state.message ?? "-"}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-2"><strong>Sent:</strong> {state.currentDate ?? "-"}</p>

                {state.form_url && (
                  <div className="mt-3">
                    <p className="font-semibold">Complete the company info form</p>
                    <a className="text-purple-deep underline break-words" href={state.form_url} target="_blank" rel="noopener noreferrer">{state.form_url}</a>
                    <p className="text-xs text-muted-foreground mt-2">This link is unique to you - please do not share it.</p>
                  </div>
                )}

                {state.companyName && (
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-sm font-semibold mb-2">Company details (submitted)</p>
                    <p><strong>Company name:</strong> {state.companyName}</p>
                    <p><strong>CVR:</strong> {state.cvr ?? "-"}</p>
                    <div className="mt-2">
                      <p className="font-semibold">Description</p>
                      <p className="whitespace-pre-wrap bg-muted p-3 rounded-md mt-1 text-sm">{state.companyDescription ?? "-"}</p>
                    </div>
                    <p className="mt-2"><strong>Goals:</strong> {state.goals ?? "-"}</p>
                    <p className="mt-1"><strong>Service requested:</strong> {state.service ?? "-"}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="max-w-2xl mx-auto mt-6 flex flex-col sm:flex-row gap-4">
              <Button
                variant="hero"
                size="sm"
                className="rounded-full px-5 w-full sm:w-auto"
                onClick={() => navigate("/contact")}
              >
                Send another message
              </Button>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground w-full sm:w-auto" onClick={() => navigate("/")}>Back to home</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactSent;
