import { Button } from '@/components/ui/button';
import { Sparkles, Play } from 'lucide-react';
import { AICore } from './AICore';

export const HeroSection = () => {
  const scrollToSimulation = () => {
    const simulation = document.getElementById('simulation');
    simulation?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      {/* Radial glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] animate-pulse-glow" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Copy */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Next-gen AI Operations</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
              <span className="glow-text-cyan">SuperAI</span>
              <br />
              <span className="text-foreground">The AI that</span>
              <br />
              <span className="gradient-text">Supervises AI</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Meet the world's first self-healing AI orchestration layer.
              It monitors, diagnoses, and repairs your AI agents — automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow-strong group"
                onClick={scrollToSimulation}
              >
                <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                See Live Demo
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-accent/50 text-foreground hover:bg-accent/10 hover:border-accent"
              >
                View Technical Overview
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground pt-4">
              Trusted by the next generation of AI Ops engineers
            </p>
          </div>
          
          {/* Right: AI Core Animation */}
          <div className="flex items-center justify-center">
            <AICore />
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-accent/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
