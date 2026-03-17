import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import { IntegrationsSection } from "@/components/landing/IntegrationsSection";
import {
  StatsSection,
  PricingSection,
  FAQSection,
  CTASection,
  Footer,
} from "@/components/landing/sections";

export const metadata: Metadata = {
  title: "GitHub24 — Real-time GitHub Activity Monitor",
  description:
    "Monitor GitHub repos in real-time. Get instant Telegram notifications for stars, forks, issues, and pull requests. Deep analytics and contributor outreach — all for free.",
};

export default function LandingPage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
