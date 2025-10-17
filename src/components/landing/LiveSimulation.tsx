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
    <section id="simulation" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            See SuperAI <span className="gradient-text">in Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience how the Supervisor detects and resolves issues autonomously
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className={`
              glassmorphism rounded-xl p-6 border transition-all duration-500
              ${currentStep === 0 ? 'border-warning/50 shadow-glow' : currentStep > 0 && currentStep < simulationLogs.length ? 'border-accent/50' : 'border-border'}
            `}>
              <div className="flex items-center gap-3">
                {currentStep === 0 ? (
                  <AlertCircle className="w-6 h-6 text-warning animate-pulse-glow" />
                ) : currentStep > 0 && currentStep < simulationLogs.length ? (
                  <Loader2 className="w-6 h-6 text-accent animate-spin" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-muted" />
                )}
                <span className="font-semibold">Detection</span>
              </div>
            </div>
            
            <div className={`
              glassmorphism rounded-xl p-6 border transition-all duration-500
              ${currentStep > 0 && currentStep < 6 ? 'border-accent/50 shadow-glow' : currentStep >= 6 ? 'border-success/50' : 'border-border'}
            `}>
              <div className="flex items-center gap-3">
                {currentStep > 0 && currentStep < 6 ? (
                  <Loader2 className="w-6 h-6 text-accent animate-spin" />
                ) : currentStep >= 6 ? (
                  <CheckCircle className="w-6 h-6 text-success animate-pulse-glow" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-muted" />
                )}
                <span className="font-semibold">Diagnosis</span>
              </div>
            </div>
            
            <div className={`
              glassmorphism rounded-xl p-6 border transition-all duration-500
              ${isComplete ? 'border-success/50 shadow-glow' : 'border-border'}
            `}>
              <div className="flex items-center gap-3">
                {isComplete ? (
                  <CheckCircle className="w-6 h-6 text-success animate-pulse-glow" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-muted" />
                )}
                <span className="font-semibold">Recovery</span>
              </div>
            </div>
          </div>
          
          {/* Terminal */}
          <div className="glassmorphism rounded-2xl p-8 border-accent/30">
            <LogTerminal 
              logs={simulationLogs.slice(0, currentStep)}
            />
          </div>
          
          {/* Play Button */}
          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={startSimulation}
              disabled={isPlaying}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow-strong"
            >
              <Play className="w-5 h-5 mr-2" />
              {isComplete ? 'Replay Scenario' : isPlaying ? 'Running...' : 'Play Scenario'}
            </Button>
          </div>
          
          {/* Success message */}
          {isComplete && (
            <div className="text-center space-y-4 animate-slide-up">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glassmorphism border-success/50 shadow-glow">
                <CheckCircle className="w-6 h-6 text-success" />
                <span className="text-lg font-semibold text-success">System Recovered</span>
              </div>
              <p className="text-muted-foreground">
                Chat Agent restored to optimal performance in <span className="text-accent font-semibold">28 seconds</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
