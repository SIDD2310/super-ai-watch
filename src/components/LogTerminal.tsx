import { useEffect, useState } from 'react';
import { LogEntry } from '@/types/agent';
import { cn } from '@/lib/utils';

interface LogTerminalProps {
  logs: LogEntry[];
  autoScroll?: boolean;
}

export const LogTerminal = ({ logs, autoScroll = true }: LogTerminalProps) => {
  const [visibleLogs, setVisibleLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    // Simulate typing effect
    logs.forEach((log, index) => {
      setTimeout(() => {
        setVisibleLogs(prev => [...prev, log]);
      }, index * 500);
    });
  }, [logs]);

  const getLogColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'error': return 'text-destructive';
      case 'warning': return 'text-warning';
      case 'success': return 'text-green-400';
      default: return 'text-accent';
    }
  };

  const getLogPrefix = (type: LogEntry['type']) => {
    switch (type) {
      case 'error': return '✗';
      case 'warning': return '⚠';
      case 'success': return '✓';
      default: return '→';
    }
  };

  return (
    <div className="bg-black/40 rounded-lg p-4 font-mono text-sm border border-accent/20 scan-lines">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-accent/20">
        <div className="w-3 h-3 rounded-full bg-destructive animate-pulse-glow" />
        <div className="w-3 h-3 rounded-full bg-warning animate-pulse-glow" />
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse-glow" />
        <span className="text-accent ml-2 text-xs">Supervisor Log</span>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {visibleLogs.map((log, index) => (
          <div 
            key={index} 
            className={cn(
              'flex items-start gap-3 animate-fade-in',
              getLogColor(log.type)
            )}
          >
            <span className="opacity-50 text-xs">
              {log.timestamp.toLocaleTimeString()}
            </span>
            <span className="font-bold">{getLogPrefix(log.type)}</span>
            <span className="flex-1">{log.message}</span>
          </div>
        ))}
        
        {visibleLogs.length > 0 && (
          <div className="flex items-center gap-2 text-accent/50 text-xs mt-4">
            <span className="w-2 h-2 bg-accent/50 rounded-full animate-pulse" />
            <span>Monitoring...</span>
          </div>
        )}
      </div>
    </div>
  );
};
