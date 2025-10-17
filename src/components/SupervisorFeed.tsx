import { ActivityLog } from '@/types/agent';
import { Card } from './ui/card';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface SupervisorFeedProps {
  activities: ActivityLog[];
}

export const SupervisorFeed = ({ activities }: SupervisorFeedProps) => {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [activities]);

  const getStatusColor = (status: ActivityLog['status']) => {
    switch (status) {
      case 'error': return 'text-destructive';
      case 'warning': return 'text-warning';
      case 'success': return 'text-green-400';
      default: return 'text-accent';
    }
  };

  const getStatusIcon = (status: ActivityLog['status']) => {
    switch (status) {
      case 'error': return '🔴';
      case 'warning': return '🟠';
      case 'success': return '🟢';
      default: return '🔵';
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow" />
        <h3 className="text-lg font-semibold text-foreground">Supervisor Activity Feed</h3>
        <span className="text-xs text-muted-foreground ml-auto">Live Updates</span>
      </div>
      
      <div 
        ref={feedRef}
        className="space-y-3 max-h-96 overflow-y-auto pr-2 scan-lines"
      >
        {activities.map((activity, index) => (
          <div 
            key={index}
            className={cn(
              "p-3 rounded-lg border transition-all hover:scale-[1.01] animate-fade-in",
              activity.status === 'error' && "bg-destructive/10 border-destructive/30",
              activity.status === 'warning' && "bg-warning/10 border-warning/30",
              activity.status === 'success' && "bg-green-500/10 border-green-500/30"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg">{getStatusIcon(activity.status)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={cn("text-sm font-medium", getStatusColor(activity.status))}>
                    {activity.action}
                  </p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
