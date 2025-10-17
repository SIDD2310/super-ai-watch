import { Activity, Search, Wrench } from 'lucide-react';
const steps = [{
  icon: Activity,
  title: 'Monitor',
  description: 'Real-time metrics across every agent — uptime, cost, accuracy, and sentiment.',
  color: 'text-accent',
  bgColor: 'bg-accent/10',
  borderColor: 'border-accent/30'
}, {
  icon: Search,
  title: 'Diagnose',
  description: 'Detects performance drift, outdated contexts, or broken APIs. Explains issues in plain English.',
  color: 'text-purple-400',
  bgColor: 'bg-purple-400/10',
  borderColor: 'border-purple-400/30',
  example: '"Refund policy file outdated"'
}, {
  icon: Wrench,
  title: 'Self-Heal',
  description: 'Applies verified "logic patches," tests fixes, and rolls back safely if needed.',
  color: 'text-accent',
  bgColor: 'bg-accent/10',
  borderColor: 'border-accent/30'
}];
export const HowItWorksSection = () => {
  return <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three steps to autonomous AI operations
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => {
          const Icon = step.icon;
          return <div key={step.title} className="group relative">
                <div className={`
                  glassmorphism rounded-2xl p-8 h-full
                  border ${step.borderColor}
                  hover:shadow-glow transition-all duration-500
                  hover:scale-105
                `}>
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-background border border-accent flex items-center justify-center shadow-glow">
                    <span className="text-2xl font-bold gradient-text">{index + 1}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl ${step.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  
                  {step.example && <div className="mt-6 p-3 bg-background/50 rounded-lg border border-accent/20">
                      <p className="text-sm font-mono text-accent">{step.example}</p>
                    </div>}
                </div>
                
                {/* Connector arrow */}
                {index < steps.length - 1 && <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-accent/50 to-transparent" />}
              </div>;
        })}
        </div>
        
        {/* Animated log example */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="glassmorphism rounded-2xl p-8 border-accent/30">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
              Supervisor Log
            </h4>
            
            <div className="space-y-3 font-mono text-sm">
              <div className="flex items-start gap-3 animate-slide-up">
                <span className="text-warning">⚠</span>
                <span className="text-muted-foreground"> Drift Detected in Chat Agent</span>
              </div>
              
              <div className="flex items-start gap-3 animate-slide-up" style={{
              animationDelay: '0.2s'
            }}>
                <span className="text-accent">🔍</span>
                <span className="text-muted-foreground">Root Cause: Outdated policy file</span>
              </div>
              
              <div className="flex items-start gap-3 animate-slide-up" style={{
              animationDelay: '0.4s'
            }}>
                <span className="text-purple-400">🧩</span>
                <span className="text-muted-foreground">Fix Applied: Source refreshed and validated (10/10 correct)</span>
              </div>
              
              <div className="flex items-start gap-3 animate-slide-up" style={{
              animationDelay: '0.6s'
            }}>
                <span className="text-success">✅</span>
                <span className="text-success">Status: Recovered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};