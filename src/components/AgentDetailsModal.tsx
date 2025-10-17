import { Agent } from '@/types/agent';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { StatusBadge } from './StatusBadge';
import { Card } from './ui/card';
import { Activity, Clock, Zap, Database, Settings, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AgentDetailsModalProps {
  agent: Agent | null;
  open: boolean;
  onClose: () => void;
  onViewIncident?: () => void;
}

export const AgentDetailsModal = ({ agent, open, onClose, onViewIncident }: AgentDetailsModalProps) => {
  if (!agent) return null;

  const hasIssue = agent.status === 'failed' || agent.status === 'warning';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-card border-accent/30 text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4 text-2xl">
            <span className="text-5xl">{agent.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                {agent.name}
                <StatusBadge status={agent.status} />
              </div>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                {agent.description} • Version {agent.version}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        {hasIssue && onViewIncident && (
          <div 
            className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg cursor-pointer hover:bg-destructive/20 transition-all animate-slide-up"
            onClick={onViewIncident}
          >
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-destructive animate-pulse-glow" />
              <div className="flex-1">
                <h4 className="font-semibold text-destructive">Active Incident Detected</h4>
                <p className="text-sm text-muted-foreground">{agent.lastIssue} - Click to view diagnosis</p>
              </div>
              <span className="text-xs text-accent">View Details →</span>
            </div>
          </div>
        )}

        <Tabs defaultValue="overview" className="mt-4">
          <TabsList className="bg-muted/20 border border-border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Activity className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Clock className="w-4 h-4 mr-2" />
              Activity
            </TabsTrigger>
            <TabsTrigger value="config" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Settings className="w-4 h-4 mr-2" />
              Configuration
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-card border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">Uptime</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{agent.uptime}%</div>
              </Card>
              
              <Card className="p-4 bg-gradient-card border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">Success Rate</span>
                </div>
                {agent.successRate === null || agent.successRate === undefined ? (
                  <div className="text-2xl font-bold text-muted-foreground italic">Unknown</div>
                ) : (
                  <div className={cn(
                    "text-2xl font-bold",
                    agent.successRate >= 90 ? "text-green-400" : "text-warning"
                  )}>
                    {agent.successRate}%
                  </div>
                )}
              </Card>
              
              <Card className="p-4 bg-gradient-card border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">Avg Response</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{agent.avgResponseTime}ms</div>
              </Card>
              
              <Card className="p-4 bg-gradient-card border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-4 h-4 text-accent" />
                  <span className="text-xs text-muted-foreground">Total Requests</span>
                </div>
                <div className="text-2xl font-bold text-foreground">{agent.totalRequests.toLocaleString()}</div>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Performance Trend (24h)</h3>
              {agent.performanceHistory.length > 0 ? (
                <>
                  <div className="h-48 flex items-end gap-1">
                    {agent.performanceHistory.slice(-24).map((data, index) => {
                      const height = (data.successRate / 100) * 100;
                      return (
                        <div
                          key={index}
                          className={cn(
                            "flex-1 rounded-t transition-all hover:opacity-80 cursor-pointer relative group",
                            data.successRate >= 90 ? "bg-green-400" : "bg-warning"
                          )}
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {data.successRate.toFixed(1)}% • {data.requests} req
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-3 text-xs text-muted-foreground">
                    <span>24h ago</span>
                    <span>Now</span>
                  </div>
                </>
              ) : (
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  No performance data available
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Response Time Distribution</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">p50 (median)</span>
                      <span className="text-foreground font-semibold">{agent.avgResponseTime}ms</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: '50%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">p90</span>
                      <span className="text-foreground font-semibold">{Math.floor(agent.avgResponseTime * 1.5)}ms</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">p99</span>
                      <span className="text-foreground font-semibold">{Math.floor(agent.avgResponseTime * 2)}ms</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: '90%' }} />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card border-border">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Request Volume (24h)</h3>
                <div className="space-y-2">
                  {agent.performanceHistory.slice(-6).map((data, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-16">
                        {data.timestamp.getHours()}:00
                      </span>
                      <div className="flex-1 h-6 bg-muted/30 rounded overflow-hidden">
                        <div 
                          className="h-full bg-accent/70 transition-all"
                          style={{ width: `${(data.requests / 500) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-foreground font-semibold w-12">
                        {data.requests}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4 mt-4">
            <Card className="p-6 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Activity</h3>
              <div className="space-y-3">
                {agent.recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "p-3 rounded-lg border transition-all hover:scale-[1.01]",
                      activity.status === 'error' && "bg-destructive/10 border-destructive/30",
                      activity.status === 'warning' && "bg-warning/10 border-warning/30",
                      activity.status === 'success' && "bg-green-500/10 border-green-500/30"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={cn(
                            "w-2 h-2 rounded-full",
                            activity.status === 'error' && "bg-destructive animate-pulse-glow",
                            activity.status === 'warning' && "bg-warning animate-pulse-glow",
                            activity.status === 'success' && "bg-green-400"
                          )} />
                          <span className="font-semibold text-foreground text-sm">
                            {activity.action}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground ml-4">
                          {activity.details}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Configuration Tab */}
          <TabsContent value="config" className="space-y-4 mt-4">
            <Card className="p-6 bg-gradient-card border-border">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Model Configuration</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Model</div>
                  <div className="text-sm font-semibold text-foreground">{agent.configuration.model}</div>
                </div>
                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Temperature</div>
                  <div className="text-sm font-semibold text-foreground">{agent.configuration.temperature}</div>
                </div>
                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Max Tokens</div>
                  <div className="text-sm font-semibold text-foreground">{agent.configuration.maxTokens}</div>
                </div>
                <div className="p-3 bg-muted/20 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Last Updated</div>
                  <div className="text-sm font-semibold text-foreground">
                    {agent.lastUpdated.toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Card>

            <Card className={cn(
              "p-6 border",
              agent.configuration.lastSync < new Date(Date.now() - 604800000)
                ? "bg-warning/10 border-warning/30"
                : "bg-gradient-card border-border"
            )}>
              <h3 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <Database className="w-5 h-5 text-accent" />
                Knowledge Base
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Source File</span>
                  <span className="text-sm font-semibold text-foreground font-mono">
                    {agent.configuration.knowledgeBase}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Sync</span>
                  <span className={cn(
                    "text-sm font-semibold",
                    agent.configuration.lastSync < new Date(Date.now() - 604800000)
                      ? "text-warning"
                      : "text-foreground"
                  )}>
                    {agent.configuration.lastSync.toLocaleString()}
                  </span>
                </div>
                {agent.configuration.lastSync < new Date(Date.now() - 604800000) && (
                  <div className="p-3 bg-warning/20 border border-warning/30 rounded-lg">
                    <p className="text-xs text-foreground">
                      ⚠ Knowledge base hasn't been synced in over 7 days. Consider updating to ensure accuracy.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
