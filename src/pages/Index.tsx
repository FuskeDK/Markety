import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LogoMarquee from "@/components/LogoMarquee";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutPreview from "@/components/AboutPreview";
import ProductSuite from "@/components/ProductSuite";
import DifferentiatorsSection from "@/components/DifferentiatorsSection";
import BenefitsSection from "@/components/BenefitsSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ComparisonTable from "@/components/ComparisonTable";
import BlogSection from "@/components/BlogSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { setSeoMeta } from "@/lib/seo";
import RevealOnScroll from "@/components/ui/reveal-on-scroll";

const Index = () => {
  useEffect(() => {
    setSeoMeta("home");
  }, []);

  return (
    <>
      <main className="min-h-screen bg-background">
        <Navbar />
        <RevealOnScroll>
          <HeroSection />
        </RevealOnScroll>

        <RevealOnScroll delay={80}>
          <LogoMarquee />
        </RevealOnScroll>

        <RevealOnScroll delay={120}>
          <StatsSection />
        </RevealOnScroll>

        <RevealOnScroll delay={160}>
          <FeaturesSection />
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <HowItWorksSection />
        </RevealOnScroll>

        <RevealOnScroll delay={220}>
          <BeforeAfterSection />
        </RevealOnScroll>

        <RevealOnScroll delay={240}>
          <TestimonialsSection />
        </RevealOnScroll>

        <RevealOnScroll delay={260}>
          <AboutPreview />
        </RevealOnScroll>

        <RevealOnScroll delay={280}>
          <ProductSuite />
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <DifferentiatorsSection />
        </RevealOnScroll>

        <RevealOnScroll delay={320}>
          <BenefitsSection />
        </RevealOnScroll>

        <RevealOnScroll delay={340}>
          <CaseStudiesSection />
        </RevealOnScroll>

        <RevealOnScroll delay={360}>
          <ComparisonTable />
        </RevealOnScroll>

        <RevealOnScroll delay={380}>
          <BlogSection />
        </RevealOnScroll>

        <RevealOnScroll delay={400}>
          <FAQSection />
        </RevealOnScroll>

        <RevealOnScroll delay={420}>
          <CTASection />
        </RevealOnScroll>
      </main>
      <Footer />
    </>
  );
};

export default Index;
