import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { LogTerminal } from '@/components/LogTerminal';

const simulationLogs = [
  { timestamp: new Date('2025-01-15T14:03:12'), type: 'warning' as const, message: 'Performance drift detected in Chat Agent' },
  { timestamp: new Date('2025-01-15T14:03:15'), type: 'info' as const, message: 'Running diagnostic analysis...' },
  { timestamp: new Date('2025-01-15T14:03:18'), type: 'info' as const, message: 'Root cause identified: refund_policy_v1.txt outdated' },
  { timestamp: new Date('2025-01-15T14:03:20'), type: 'info' as const, message: 'Fetching latest policy from source...' },
  { timestamp: new Date('2025-01-15T14:03:23'), type: 'info' as const, message: 'Applying knowledge refresh patch...' },
  { timestamp: new Date('2025-01-15T14:03:26'), type: 'info' as const, message: 'Running validation tests (10/10 passed)' },
  { timestamp: new Date('2025-01-15T14:03:28'), type: 'success' as const, message: '✓ System recovered - accuracy restored to 97%' },
];

export const LiveSimulation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const startSimulation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setIsComplete(false);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setCurrentStep(step);
      
      if (step >= simulationLogs.length) {
        clearInterval(interval);
        setIsPlaying(false);
        setIsComplete(true);
      }
    }, 800);
  };

  return (
    <section id="simulation" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple/8 to-transparent" />
      
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple/5 rounded-full blur-[150px] animate-pulse-glow" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism border border-accent/20">
            <Play className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Interactive Demo</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold">
            See SuperAI <span className="gradient-text text-5xl lg:text-7xl">in Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience how the Supervisor <span className="text-accent font-semibold">detects and resolves issues autonomously</span> in real-time
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Enhanced Status Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className={`
              glassmorphism-strong rounded-2xl p-8 border-2 transition-all duration-700 hover-lift
              ${currentStep === 0 ? 'border-warning/60 shadow-glow-strong scale-105' : currentStep > 0 && currentStep < simulationLogs.length ? 'border-accent/50' : 'border-border/50'}
            `}>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative">
                  {currentStep === 0 ? (
                    <AlertCircle className="w-10 h-10 text-warning animate-pulse-glow drop-shadow-[0_0_15px_currentColor]" />
                  ) : currentStep > 0 && currentStep < simulationLogs.length ? (
                    <Loader2 className="w-10 h-10 text-accent animate-spin drop-shadow-[0_0_15px_currentColor]" />
                  ) : (
                    <CheckCircle className="w-10 h-10 text-muted-foreground/40" />
                  )}
                  {currentStep === 0 && (
                    <div className="absolute inset-0 w-10 h-10 bg-warning/20 rounded-full blur-lg animate-pulse-glow" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-lg block">Detection</span>
                  <span className="text-sm text-muted-foreground">AI monitoring active</span>
                </div>
              </div>
            </div>
            
            <div className={`
              glassmorphism-strong rounded-2xl p-8 border-2 transition-all duration-700 hover-lift
              ${currentStep > 0 && currentStep < 6 ? 'border-accent/60 shadow-glow-strong scale-105' : currentStep >= 6 ? 'border-success/60' : 'border-border/50'}
            `}>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative">
                  {currentStep > 0 && currentStep < 6 ? (
                    <Loader2 className="w-10 h-10 text-accent animate-spin drop-shadow-[0_0_15px_currentColor]" />
                  ) : currentStep >= 6 ? (
                    <CheckCircle className="w-10 h-10 text-success animate-pulse-glow drop-shadow-[0_0_15px_currentColor]" />
                  ) : (
                    <CheckCircle className="w-10 h-10 text-muted-foreground/40" />
                  )}
                  {currentStep > 0 && currentStep < 6 && (
                    <div className="absolute inset-0 w-10 h-10 bg-accent/20 rounded-full blur-lg animate-pulse-glow" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-lg block">Diagnosis</span>
                  <span className="text-sm text-muted-foreground">Root cause analysis</span>
                </div>
              </div>
            </div>
            
            <div className={`
              glassmorphism-strong rounded-2xl p-8 border-2 transition-all duration-700 hover-lift
              ${isComplete ? 'border-success/60 shadow-glow-strong scale-105' : 'border-border/50'}
            `}>
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative">
                  {isComplete ? (
                    <CheckCircle className="w-10 h-10 text-success animate-pulse-glow drop-shadow-[0_0_15px_currentColor]" />
                  ) : (
                    <CheckCircle className="w-10 h-10 text-muted-foreground/40" />
                  )}
                  {isComplete && (
                    <div className="absolute inset-0 w-10 h-10 bg-success/20 rounded-full blur-lg animate-pulse-glow" />
                  )}
                </div>
                <div>
                  <span className="font-bold text-lg block">Recovery</span>
                  <span className="text-sm text-muted-foreground">Auto-remediation</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Terminal */}
          <div className="glassmorphism-strong rounded-3xl p-10 border-2 border-accent/30 shadow-elevation hover-lift">
            <LogTerminal 
              logs={simulationLogs.slice(0, currentStep)}
            />
          </div>
          
          {/* Enhanced Play Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={startSimulation}
              disabled={isPlaying}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow-strong hover-lift group text-base px-10 py-7 text-lg font-semibold"
            >
              <Play className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" />
              {isComplete ? 'Replay Scenario' : isPlaying ? 'Running...' : 'Play Scenario'}
            </Button>
          </div>
          
          {/* Enhanced Success message */}
          {isComplete && (
            <div className="text-center space-y-6 animate-slide-up">
              <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl glassmorphism-strong border-2 border-success/60 shadow-glow-strong">
                <CheckCircle className="w-8 h-8 text-success animate-pulse-glow" />
                <span className="text-xl font-bold text-success">System Fully Recovered</span>
              </div>
              <p className="text-lg text-muted-foreground">
                Chat Agent restored to optimal performance in <span className="text-accent font-bold text-xl">28 seconds</span>
              </p>
              <div className="flex justify-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">97%</div>
                  <div className="text-sm text-muted-foreground">Accuracy restored</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">0</div>
                  <div className="text-sm text-muted-foreground">Downtime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple">10/10</div>
                  <div className="text-sm text-muted-foreground">Tests passed</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
