import { Card } from './ui/card';
import { cn } from '@/lib/utils';

interface SystemHealthBarProps {
  uptime: number;
  activeAgents: number;
  totalAgents: number;
  ongoingIncidents: number;
}

export const SystemHealthBar = ({ uptime, activeAgents, totalAgents, ongoingIncidents }: SystemHealthBarProps) => {
  return (
    <Card className="p-6 bg-gradient-card border-accent/30 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-500/10 rounded-lg">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-glow" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">System Uptime</div>
            <div className="text-2xl font-bold text-green-400">{uptime}%</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-lg">
            <div className="w-3 h-3 bg-accent rounded-full" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Active Agents</div>
            <div className="text-2xl font-bold text-foreground">
              {activeAgents} / {totalAgents}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className={cn(
            "p-3 rounded-lg",
            ongoingIncidents > 0 ? "bg-destructive/10" : "bg-muted/20"
          )}>
            <div className={cn(
              "w-3 h-3 rounded-full",
              ongoingIncidents > 0 ? "bg-destructive animate-pulse-glow" : "bg-muted-foreground"
            )} />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Ongoing Incidents</div>
            <div className={cn(
              "text-2xl font-bold",
              ongoingIncidents > 0 ? "text-destructive" : "text-muted-foreground"
            )}>
              {ongoingIncidents}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-accent/10 rounded-lg">
            <div className="text-xl">🤖</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">System Health</div>
            <div className="text-2xl font-bold text-accent">
              {((activeAgents / totalAgents) * 10).toFixed(1)} / 10
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
