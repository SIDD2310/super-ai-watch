import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ProblemVisionSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            AI agents are growing fast —<br />
            <span className="gradient-text">but they break silently</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Problem State */}
          <div className="glassmorphism rounded-2xl p-8 space-y-6 border-destructive/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-destructive">Without SuperAI</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm font-mono text-destructive">⚠️ Agent timeout</p>
                <p className="text-xs text-muted-foreground mt-1">Unknown cause - 2 hours ago</p>
              </div>
              
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm font-mono text-destructive">⚠️ Policy outdated</p>
                <p className="text-xs text-muted-foreground mt-1">Degraded accuracy - unnoticed</p>
              </div>
              
              <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <p className="text-sm font-mono text-destructive">⚠️ API failure</p>
                <p className="text-xs text-muted-foreground mt-1">Manual intervention needed</p>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm pt-4">
              Each silent failure costs time, trust, and money. Manual debugging takes hours.
            </p>
          </div>
          
          {/* Solution State */}
          <div className="glassmorphism rounded-2xl p-8 space-y-6 border-accent/30 shadow-glow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-accent">With SuperAI</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <p className="text-sm font-mono text-accent">✓ Issue detected instantly</p>
                <p className="text-xs text-muted-foreground mt-1">Root cause identified in 12s</p>
              </div>
              
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <p className="text-sm font-mono text-accent">✓ Policy auto-refreshed</p>
                <p className="text-xs text-muted-foreground mt-1">Validated & deployed - no human needed</p>
              </div>
              
              <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
                <p className="text-sm font-mono text-accent">✓ System self-healed</p>
                <p className="text-xs text-muted-foreground mt-1">Back to 100% - zero downtime</p>
              </div>
            </div>
            
            <p className="text-muted-foreground text-sm pt-4">
              SuperAI ensures <span className="text-accent font-semibold">visibility, accountability, and control</span> — so your agents never go dark again.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
