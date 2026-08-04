import React from "react";
import Navbar from "../components/layout/navbar.jsx";
import Footer from "../components/layout/footer.jsx";
import { HeroSection } from "../components/landing/hero-section.jsx";
import { FeaturesSection } from "../components/landing/features-section.jsx";
import { PricingSection } from "../components/landing/pricing-section.jsx";
import { CTASection } from "../components/landing/cta-section.jsx";
import ThreeParticles from "../components/landing/ThreeParticles.jsx";

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6FE] relative overflow-hidden">
      {/* 3D Particle Mesh Background */}
      <ThreeParticles />

      <Navbar />
      <main className="flex-1 relative z-10">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
