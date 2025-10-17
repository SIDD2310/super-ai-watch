import { TrendingUp, Clock, DollarSign, Zap } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    value: '99.7%',
    label: 'uptime maintained',
    color: 'text-accent',
  },
  {
    icon: Clock,
    value: '3×',
    label: 'faster incident resolution',
    color: 'text-purple-400',
  },
  {
    icon: DollarSign,
    value: '$4,300',
    label: 'saved per week in debugging',
    color: 'text-accent',
  },
  {
    icon: Zap,
    value: '0',
    label: 'human interventions in 7 days',
    color: 'text-purple-400',
  },
];

export const ImpactSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1000px] h-[1000px] bg-gradient-to-r from-accent/20 via-purple-500/20 to-accent/20 rounded-full blur-[150px]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            The Future of <span className="gradient-text">AI Reliability</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            
            return (
              <div
                key={metric.label}
                className="text-center space-y-4 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full glassmorphism flex items-center justify-center group-hover:shadow-glow-strong transition-all duration-500">
                    <Icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </div>
                
                <div className={`text-6xl font-bold ${metric.color} glow-text-cyan`}>
                  {metric.value}
                </div>
                
                <div className="text-lg text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-2xl text-foreground max-w-3xl mx-auto leading-relaxed">
            <span className="gradient-text font-semibold">SuperAI</span> transforms AI operations from{' '}
            <span className="text-muted-foreground">reactive firefighting</span> to{' '}
            <span className="text-accent font-semibold">proactive orchestration</span>
          </p>
        </div>
      </div>
    </section>
  );
};
