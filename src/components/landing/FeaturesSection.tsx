import { Brain, Search, Wrench, MessageSquare, BarChart3, Settings } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Autonomous Monitoring',
    description: 'Tracks uptime, cost, and performance across all agents in real-time.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Search,
    title: 'Root-Cause Diagnosis',
    description: 'Uses logs and embeddings to pinpoint underlying issues instantly.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
  {
    icon: Wrench,
    title: 'Self-Healing Logic Patches',
    description: 'Automatically rewrites or refreshes broken logic with verified fixes.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: MessageSquare,
    title: 'Explainable Fixes',
    description: 'Every repair includes a human-readable rationale and validation report.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Visualize system health, uptime, incident trends, and cost savings.',
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  {
    icon: Settings,
    title: 'Agent Builder',
    description: 'Create and configure new agents through an intuitive visual interface.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for reliable AI operations
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={feature.title}
                className="group glassmorphism rounded-2xl p-8 border border-accent/20 hover:border-accent/50 hover:shadow-glow transition-all duration-500 hover:scale-105"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
