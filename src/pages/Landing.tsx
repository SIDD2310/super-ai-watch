import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { ProblemVisionSection } from '@/components/landing/ProblemVisionSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { LiveSimulation } from '@/components/landing/LiveSimulation';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { ImpactSection } from '@/components/landing/ImpactSection';
import { ArchitectureSection } from '@/components/landing/ArchitectureSection';
import { TeamSection } from '@/components/landing/TeamSection';
import { Footer } from '@/components/landing/Footer';

const Landing = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 overflow-hidden">
      <HeroSection />
      <ProblemVisionSection />
      <HowItWorksSection />
      <LiveSimulation />
      <FeaturesSection />
      <ImpactSection />
      <ArchitectureSection />
      <TeamSection />
      <Footer />
    </div>
  );
};

export default Landing;
