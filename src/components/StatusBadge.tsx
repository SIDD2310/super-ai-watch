import { AgentStatus } from '@/types/agent';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: AgentStatus;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const statusConfig = {
    healthy: {
      color: 'bg-green-500',
      text: 'Healthy',
      icon: '🟢',
      pulse: true
    },
    warning: {
      color: 'bg-yellow-500',
      text: 'Warning',
      icon: '🟠',
      pulse: true
    },
    failed: {
      color: 'bg-red-500',
      text: 'Failed',
      icon: '🔴',
      pulse: true
    }
  };

  const config = statusConfig[status];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className={cn(
        'w-2 h-2 rounded-full',
        config.color,
        config.pulse && 'animate-pulse-glow'
      )} />
      <span className="text-sm font-medium">{config.text}</span>
    </div>
  );
};
