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

const Index = () => {
  useEffect(() => {
    setSeoMeta("home");
  }, []);

  return (
    <>
      <main className="min-h-screen bg-background">
        <Navbar />
        <HeroSection />
        <LogoMarquee />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <BeforeAfterSection />
        <TestimonialsSection />
        <AboutPreview />
        <ProductSuite />
        <DifferentiatorsSection />
        <BenefitsSection />
        <CaseStudiesSection />
        <ComparisonTable />
        <BlogSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
