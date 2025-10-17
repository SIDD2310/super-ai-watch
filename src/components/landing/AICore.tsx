import { useEffect, useState } from 'react';
import { Bot, Database, MessageSquare, BarChart, FileText, Users, Brain, Zap } from 'lucide-react';

const agents = [
  { icon: MessageSquare, label: 'Chat', color: 'text-accent', delay: 0 },
  { icon: BarChart, label: 'Sales', color: 'text-purple-400', delay: 0.5 },
  { icon: FileText, label: 'Minutes', color: 'text-accent', delay: 1 },
  { icon: Users, label: 'Onboarding', color: 'text-purple-400', delay: 1.5 },
  { icon: Database, label: 'Knowledge', color: 'text-accent', delay: 2 },
  { icon: Brain, label: 'Analytics', color: 'text-purple-400', delay: 2.5 },
];

export const AICore = () => {
  const [activeAgent, setActiveAgent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agents.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center">
      {/* Central Core */}
      <div className="relative z-10">
        <div className="w-32 h-32 rounded-full glassmorphism shadow-glow-strong flex items-center justify-center">
          <Zap className="w-16 h-16 text-accent animate-pulse-glow" />
        </div>
        <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
      </div>
      
      {/* Orbiting Agents */}
      {agents.map((agent, index) => {
        const Icon = agent.icon;
        const angle = (index * 360) / agents.length;
        const isActive = index === activeAgent;
        
        return (
          <div
            key={agent.label}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `rotate(${angle}deg) translateX(180px) rotate(-${angle}deg)`,
              transitionDuration: '0.5s',
            }}
          >
            <div
              className={`
                w-16 h-16 rounded-xl glassmorphism flex items-center justify-center
                transition-all duration-500
                ${isActive ? 'shadow-glow-strong scale-125' : 'shadow-glow scale-100'}
              `}
            >
              <Icon className={`w-8 h-8 ${agent.color} ${isActive ? 'animate-pulse-glow' : ''}`} />
            </div>
            
            {/* Connection line */}
            <div className="absolute top-1/2 left-1/2 w-[180px] h-[2px] origin-left -translate-y-1/2">
              <div
                className={`
                  h-full bg-gradient-to-r from-accent/50 to-transparent
                  ${isActive ? 'opacity-100' : 'opacity-20'}
                  transition-opacity duration-500
                `}
                style={{ transform: `rotate(${180 + angle}deg)` }}
              />
            </div>
          </div>
        );
      })}
      
      {/* Pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[300px] h-[300px] rounded-full border border-accent/20 animate-pulse-glow" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[350px] h-[350px] rounded-full border border-accent/10 animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};
