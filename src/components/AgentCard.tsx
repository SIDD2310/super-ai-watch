import { Agent } from '@/types/agent';
import { StatusBadge } from './StatusBadge';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

export const AgentCard = ({ agent, onClick }: AgentCardProps) => {
  const isHealthy = agent.status === 'healthy';
  
  return (
    <Card 
      className={cn(
        'p-6 bg-gradient-card border-border hover:border-accent/50 transition-all cursor-pointer group',
        'hover:shadow-glow',
        !isHealthy && 'border-destructive/30'
      )}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{agent.icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
              {agent.name}
            </h3>
            <p className="text-sm text-muted-foreground">{agent.description}</p>
          </div>
        </div>
        <StatusBadge status={agent.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-muted-foreground mb-1">Uptime</div>
          <div className="text-2xl font-bold text-foreground">{agent.uptime}%</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground mb-1">Success Rate</div>
          <div className="text-2xl font-bold text-foreground">{agent.successRate}%</div>
        </div>
      </div>

      {agent.lastIssue !== '-' && (
        <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border">
          <div className="text-xs text-muted-foreground mb-1">Last Issue</div>
          <div className="text-sm font-medium text-warning">{agent.lastIssue}</div>
        </div>
      )}
    </Card>
  );
};
