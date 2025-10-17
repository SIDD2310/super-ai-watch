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
    <div className="min-h-screen bg-background mesh-gradient overflow-hidden relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[150px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[180px] animate-float-delayed" />
      </div>
      
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
