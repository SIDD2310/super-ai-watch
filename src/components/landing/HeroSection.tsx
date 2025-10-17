import { Button } from '@/components/ui/button';
import { Sparkles, Play, ArrowRight } from 'lucide-react';
import { AICore } from './AICore';
import { useNavigate } from 'react-router-dom';

export const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToSimulation = () => {
    const simulation = document.getElementById('simulation');
    simulation?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/8 to-background" />
      
      {/* Multiple layered glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/8 rounded-full blur-[150px] animate-pulse-glow" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple/8 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent rounded-full blur-sm animate-float opacity-30" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple rounded-full blur-sm animate-float opacity-40" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-accent rounded-full blur-sm animate-float opacity-25" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-purple rounded-full blur-sm animate-float opacity-35" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glassmorphism-strong shadow-glow hover-glow transition-all">
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Next-gen AI Operations</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-extrabold leading-[1.1] tracking-tight">
              <span className="glow-text-cyan block mb-2">SuperAI</span>
              <span className="text-foreground block mb-2">The AI that</span>
              <span className="gradient-text block">Supervises AI</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-lg leading-relaxed font-light">
              Meet the world's first <span className="text-accent font-medium">self-healing AI orchestration layer</span>.
              It monitors, diagnoses, and repairs your AI agents — automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow-strong hover-lift group text-base px-8 py-6"
                onClick={goToDashboard}
              >
                <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                Try the Dashboard
              </Button>
              
              <Button 
                size="lg" 
                className="bg-purple hover:bg-purple/90 text-purple-foreground shadow-purple hover-lift group text-base px-8 py-6"
                onClick={scrollToSimulation}
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                See Live Demo
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-accent/40 text-foreground hover:bg-accent/15 hover:border-accent hover:shadow-glow transition-all text-base px-8 py-6"
              >
                Technical Docs
              </Button>
            </div>
          </div>
          
          {/* Right: AI Core Animation */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative animate-scale-in">
              <AICore />
              <div className="absolute -inset-8 bg-gradient-radial-glow rounded-full opacity-50 blur-2xl" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-7 h-11 rounded-full border-2 border-accent/60 flex items-start justify-center p-2 shadow-glow">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse shadow-glow" />
        </div>
      </div>
    </section>
  );
};
