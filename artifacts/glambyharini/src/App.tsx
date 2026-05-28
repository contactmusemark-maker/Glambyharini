import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import VideoShowcase from "@/components/VideoShowcase";
import Testimonials from "@/components/Testimonials";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BridalQuiz from "@/components/BridalQuiz";
import GiftVoucher from "@/components/GiftVoucher";
import LoyaltyBadge from "@/components/LoyaltyBadge";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import VideoReel from "@/components/VideoReel";
import BlogsAndTips from "@/components/BlogsAndTips";
import Booking from "@/components/Booking";
import FAQ from "@/components/FAQ";
import ServiceArea from "@/components/ServiceArea";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import SplashScreen from "@/components/SplashScreen";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="relative min-h-screen bg-background w-full overflow-hidden text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Gallery />
        <VideoShowcase />
        <Testimonials />
        <BeforeAfterSlider />
        <BridalQuiz />
        <GiftVoucher />
        <LoyaltyBadge />
        <AvailabilityCalendar />
        <VideoReel />
        <BlogsAndTips />
        <Booking />
        <FAQ />
        <ServiceArea />
        <InstagramSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SplashScreen onDone={() => setSplashDone(true)} />
        <Home />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
