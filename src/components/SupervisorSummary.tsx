import { Card } from './ui/card';
import { Activity, CheckCircle2, Clock, TrendingUp } from 'lucide-react';

interface SupervisorSummaryProps {
  monitoringCount: number;
  resolvedToday: number;
  pendingApprovals: number;
  healthScore: number;
  autonomyMode: string;
  totalRequests?: number;
  avgResponseTime?: number;
}

export const SupervisorSummary = ({
  monitoringCount,
  resolvedToday,
  pendingApprovals,
  healthScore,
  autonomyMode,
  totalRequests = 0,
  avgResponseTime = 0,
}: SupervisorSummaryProps) => {
  return (
    <Card className="p-6 bg-gradient-glow border-accent/30">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-accent/20 rounded-lg">
          <Activity className="w-6 h-6 text-accent animate-pulse-glow" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">AI Supervisor</h3>
          <p className="text-xs text-muted-foreground">System Orchestrator</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-3 bg-muted/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground">Current Workload</span>
          </div>
          <p className="text-sm font-semibold text-foreground">
            Monitoring {monitoringCount} agents
          </p>
        </div>

        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-xs text-muted-foreground">Resolved Today</span>
          </div>
          <p className="text-sm font-semibold text-green-400">
            {resolvedToday} incidents fixed
          </p>
        </div>

        {pendingApprovals > 0 && (
          <div className="p-3 bg-warning/10 rounded-lg border border-warning/30">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-warning" />
              <span className="text-xs text-muted-foreground">Pending Approvals</span>
            </div>
            <p className="text-sm font-semibold text-warning">
              {pendingApprovals} waiting for review
            </p>
          </div>
        )}

        <div className="p-3 bg-accent/10 rounded-lg border border-accent/30">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground">System Health Score</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-accent">{healthScore.toFixed(1)}</p>
            <span className="text-sm text-muted-foreground">/ 10</span>
          </div>
        </div>

        <div className="pt-3 border-t border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Total Requests</span>
            <span className="text-sm font-semibold text-foreground">
              {totalRequests.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Avg Response Time</span>
            <span className="text-sm font-semibold text-foreground">{avgResponseTime}ms</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Autonomy Level</span>
            <span className="text-sm font-semibold text-accent">{autonomyMode}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-3 bg-accent/5 rounded-lg border border-accent/20">
        <p className="text-xs text-muted-foreground italic">
          "All systems nominal. Monitoring {monitoringCount} agents for anomalies and ready to intervene when needed."
        </p>
      </div>
    </Card>
  );
};
