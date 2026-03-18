import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/Howitwork";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/Faq";
import Features from "@/components/landing/Features";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

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
      <Features/>
      <HowItWorks />
      <Pricing />
      <FAQ />
      <ContactSection />
      <Footer />
    </main>
  );
}
