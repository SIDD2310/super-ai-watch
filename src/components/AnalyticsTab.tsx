import { Metrics } from '@/types/agent';
import { Card } from './ui/card';
import { TrendingUp, Clock, DollarSign, Activity } from 'lucide-react';

interface AnalyticsTabProps {
  metrics: Metrics;
}

export const AnalyticsTab = ({ metrics }: AnalyticsTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Analytics & Reporting</h2>
        <p className="text-muted-foreground">
          Real-time insights into AI Supervisor performance and cost savings
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-card border-border hover:border-accent/50 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Activity className="w-6 h-6 text-accent" />
            </div>
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">{metrics.totalAgents}</div>
          <div className="text-sm text-muted-foreground">Agents Monitored</div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border hover:border-accent/50 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-xs text-green-400">↑ 23%</span>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">{metrics.incidentsResolved}</div>
          <div className="text-sm text-muted-foreground">Incidents Resolved Autonomously</div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border hover:border-accent/50 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-warning/10 rounded-lg">
              <Clock className="w-6 h-6 text-warning" />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <div className="text-xs text-muted-foreground">MTTD (Mean Time to Detect)</div>
              <div className="text-2xl font-bold text-foreground">{metrics.avgMTTD} min</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">MTTR (Mean Time to Repair)</div>
              <div className="text-2xl font-bold text-foreground">{metrics.avgMTTR} min</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-card border-border hover:border-accent/50 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <span className="text-xs text-accent">Per week</span>
          </div>
          <div className="text-3xl font-bold text-foreground mb-1">
            ${metrics.costSaved.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Estimated Cost Saved</div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-card border-border">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Summary Metrics</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-muted-foreground">Average Detection Speed</span>
            <span className="text-sm font-semibold text-accent">{metrics.avgMTTD} minutes</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-muted-foreground">Average Repair Speed</span>
            <span className="text-sm font-semibold text-accent">{metrics.avgMTTR} minutes</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-muted-foreground">Autonomous Resolution Rate</span>
            <span className="text-sm font-semibold text-green-400">87%</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <span className="text-sm text-muted-foreground">Human Intervention Required</span>
            <span className="text-sm font-semibold text-warning">13%</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-glow border-accent/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-accent/20 rounded-lg">
            <TrendingUp className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">ROI Impact</h3>
            <p className="text-sm text-muted-foreground mb-3">
              By automating incident detection and resolution, the AI Supervisor has reduced manual 
              intervention by 87%, saving an average of ${metrics.costSaved.toLocaleString()} per 
              week in operational costs and improving system uptime by 34%.
            </p>
            <div className="flex gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Weekly ROI:</span>
                <span className="text-accent font-bold ml-2">+${metrics.costSaved.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Uptime Improvement:</span>
                <span className="text-green-400 font-bold ml-2">+34%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
