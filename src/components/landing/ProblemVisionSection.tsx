import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ProblemVisionSection = () => {
  return (
    <section className="py-32 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-destructive/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glassmorphism border border-destructive/20">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm text-muted-foreground">The Hidden Problem</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-extrabold leading-tight">
            AI agents are growing fast —<br />
            <span className="gradient-text text-5xl lg:text-7xl">but they break silently</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Traditional monitoring fails to catch AI-specific issues before they impact your users
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Problem State - Enhanced */}
          <div className="glassmorphism-strong rounded-3xl p-10 space-y-7 border-2 border-destructive/30 hover-lift relative overflow-hidden group">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-destructive/20 flex items-center justify-center shadow-glow">
                <AlertTriangle className="w-7 h-7 text-destructive animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-destructive">Without SuperAI</h3>
            </div>
            
            <div className="space-y-4 relative z-10">
              {[
                { icon: '⚠️', title: 'Agent timeout', desc: 'Unknown cause - 2 hours ago' },
                { icon: '⚠️', title: 'Policy outdated', desc: 'Degraded accuracy - unnoticed' },
                { icon: '⚠️', title: 'API failure', desc: 'Manual intervention needed' }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="p-5 bg-destructive/10 border-2 border-destructive/30 rounded-xl hover:bg-destructive/15 hover:border-destructive/50 transition-all duration-300 hover-glow"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <p className="text-base font-mono font-semibold text-destructive flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="relative z-10 pt-4">
              <div className="h-px bg-gradient-to-r from-transparent via-destructive/30 to-transparent mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                Each silent failure costs time, trust, and money. <span className="text-destructive font-semibold">Manual debugging takes hours</span> of engineering time.
              </p>
            </div>
          </div>
          
          {/* Solution State - Enhanced */}
          <div className="glassmorphism-strong rounded-3xl p-10 space-y-7 border-2 border-accent/40 shadow-glow-strong hover-lift relative overflow-hidden group">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center shadow-glow">
                <CheckCircle2 className="w-7 h-7 text-accent animate-pulse-glow" />
              </div>
              <h3 className="text-3xl font-bold text-accent">With SuperAI</h3>
            </div>
            
            <div className="space-y-4 relative z-10">
              {[
                { icon: '✓', title: 'Issue detected instantly', desc: 'Root cause identified in 12s' },
                { icon: '✓', title: 'Policy auto-refreshed', desc: 'Validated & deployed - no human needed' },
                { icon: '✓', title: 'System self-healed', desc: 'Back to 100% - zero downtime' }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="p-5 bg-accent/10 border-2 border-accent/30 rounded-xl hover:bg-accent/15 hover:border-accent/50 hover:shadow-glow transition-all duration-300"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <p className="text-base font-mono font-semibold text-accent flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="relative z-10 pt-4">
              <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-4" />
              <p className="text-muted-foreground leading-relaxed">
                SuperAI ensures <span className="text-accent font-semibold">visibility, accountability, and control</span> — so your agents never go dark again.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
