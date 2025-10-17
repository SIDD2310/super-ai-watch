import { useState } from 'react';
import { Zap, MessageSquare, BarChart, FileText, Users, Database, Brain } from 'lucide-react';

const agents = [
  { id: 'chat', name: 'Chat Agent', icon: MessageSquare, status: 'Policy context refreshed', position: 'top-0 left-1/4' },
  { id: 'sales', name: 'Sales Assistant', icon: BarChart, status: 'Operating normally', position: 'top-1/4 right-0' },
  { id: 'minutes', name: 'Meeting Summarizer', icon: FileText, status: 'Operating normally', position: 'bottom-1/4 right-0' },
  { id: 'hr', name: 'HR Bot', icon: Users, status: 'Operating normally', position: 'bottom-0 left-1/4' },
  { id: 'knowledge', name: 'Knowledge Bot', icon: Database, status: 'Retrained with new source', position: 'top-1/4 left-0' },
  { id: 'analytics', name: 'Analytics Agent', icon: Brain, status: 'Operating normally', position: 'bottom-1/4 left-0' },
];

export const ArchitectureSection = () => {
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold">
            How the Supervisor <span className="gradient-text">Orchestrates</span> the Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Central intelligence coordinating autonomous agent operations
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Central Supervisor */}
            <div className="relative z-20">
              <div className="w-40 h-40 rounded-2xl glassmorphism border-accent shadow-glow-strong flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-16 h-16 text-accent mx-auto mb-2 animate-pulse-glow" />
                  <div className="text-sm font-bold text-accent">AI Supervisor</div>
                </div>
              </div>
            </div>
            
            {/* Orbiting Agents */}
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              const angle = (index * 360) / agents.length;
              const radius = 250;
              const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
              const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;
              
              return (
                <div
                  key={agent.id}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                  onMouseEnter={() => setHoveredAgent(agent.id)}
                  onMouseLeave={() => setHoveredAgent(null)}
                >
                  {/* Connection line */}
                  <svg
                    className="absolute top-1/2 left-1/2 pointer-events-none"
                    style={{
                      width: `${Math.abs(radius)}px`,
                      height: '2px',
                      transform: `translate(-50%, -50%) rotate(${angle + 180}deg)`,
                      transformOrigin: '0 50%',
                    }}
                  >
                    <line
                      x1="0"
                      y1="1"
                      x2={radius}
                      y2="1"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      className={hoveredAgent === agent.id ? 'opacity-100' : 'opacity-30'}
                    />
                    <defs>
                      <linearGradient id="gradient">
                        <stop offset="0%" stopColor="hsl(185 100% 55%)" />
                        <stop offset="100%" stopColor="hsl(185 100% 55% / 0)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Agent card */}
                  <div
                    className={`
                      w-28 h-28 rounded-xl glassmorphism border flex flex-col items-center justify-center
                      transition-all duration-300 cursor-pointer
                      ${hoveredAgent === agent.id ? 'border-accent shadow-glow scale-110' : 'border-accent/30'}
                    `}
                  >
                    <Icon className="w-8 h-8 text-accent mb-2" />
                    <div className="text-xs font-semibold text-center px-2">{agent.name}</div>
                  </div>
                  
                  {/* Tooltip */}
                  {hoveredAgent === agent.id && (
                    <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 w-48 glassmorphism rounded-lg p-3 border-accent/50 shadow-glow animate-fade-in z-30">
                      <div className="text-xs font-semibold text-accent mb-1">{agent.name}</div>
                      <div className="text-xs text-muted-foreground">{agent.status}</div>
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Animated rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[500px] h-[500px] rounded-full border border-accent/10 animate-pulse-glow" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[550px] h-[550px] rounded-full border border-accent/5 animate-pulse-glow" style={{ animationDelay: '1s' }} />
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The Supervisor continuously monitors all agents, detecting anomalies and coordinating
              autonomous repairs across the entire ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
