import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { leadsCountQueryConfig } from "./hooks/useLeadsCount";
import CookieBanner from "@/components/CookieBanner";
import ScrollToTop from "@/components/ScrollToTop";

const Index    = lazy(() => import("./pages/Index"));
const About    = lazy(() => import("./pages/About"));
const Contact  = lazy(() => import("./pages/Contact"));
const Privacy  = lazy(() => import("./pages/Privacy"));
const Terms     = lazy(() => import("./pages/Terms"));
const NotFound  = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();
queryClient.prefetchQuery(leadsCountQueryConfig);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/"        element={<Index />} />
            <Route path="/about"   element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms"      element={<Terms />} />
            <Route path="*"        element={<NotFound />} />
          </Routes>
        </Suspense>
        <CookieBanner />
        <ScrollToTop />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
