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
      {/* Central Core - Enhanced */}
      <div className="relative z-10">
        <div className="w-36 h-36 rounded-full glassmorphism-strong shadow-glow-strong flex items-center justify-center border-2 border-accent/40">
          <Zap className="w-20 h-20 text-accent animate-pulse-glow drop-shadow-[0_0_20px_rgba(0,255,255,0.6)]" />
        </div>
        <div className="absolute inset-0 rounded-full bg-accent/25 animate-ping" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/20 to-purple/20 blur-xl" />
      </div>
      
      {/* Orbiting Agents - Enhanced */}
      {agents.map((agent, index) => {
        const Icon = agent.icon;
        const angle = (index * 360) / agents.length;
        const isActive = index === activeAgent;
        
        return (
          <div
            key={agent.label}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `rotate(${angle}deg) translateX(200px) rotate(-${angle}deg)`,
              transitionDuration: '0.6s',
            }}
          >
            <div
              className={`
                w-18 h-18 rounded-2xl glassmorphism-strong flex items-center justify-center
                transition-all duration-700 border-2
                ${isActive 
                  ? 'shadow-glow-strong scale-[1.35] border-accent/60 rotate-12' 
                  : 'shadow-glow scale-100 border-accent/20 rotate-0'
                }
              `}
            >
              <Icon className={`
                w-9 h-9 ${agent.color} transition-all duration-500
                ${isActive ? 'animate-pulse-glow drop-shadow-[0_0_15px_currentColor]' : ''}
              `} />
            </div>
            
            {/* Enhanced connection line */}
            <div className="absolute top-1/2 left-1/2 w-[200px] h-[3px] origin-left -translate-y-1/2">
              <div
                className={`
                  h-full bg-gradient-to-r from-accent/60 via-accent/40 to-transparent
                  ${isActive ? 'opacity-100 shadow-glow' : 'opacity-15'}
                  transition-all duration-700
                `}
                style={{ transform: `rotate(${180 + angle}deg)` }}
              />
            </div>
            
            {/* Agent label on hover */}
            {isActive && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-background/90 border border-accent/40 rounded-full text-xs font-medium text-accent whitespace-nowrap animate-slide-down">
                {agent.label}
              </div>
            )}
          </div>
        );
      })}
      
      {/* Enhanced pulsing rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[320px] h-[320px] rounded-full border-2 border-accent/25 animate-pulse-glow" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[380px] h-[380px] rounded-full border border-accent/15 animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[440px] h-[440px] rounded-full border border-purple/10 animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>
      
      {/* Rotating gradient overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-rotate-slow" />
      </div>
    </div>
  );
};
