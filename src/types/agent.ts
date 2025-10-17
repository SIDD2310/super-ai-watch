export type AgentStatus = 'healthy' | 'warning' | 'failed';

export interface Agent {
  id: string;
  name: string;
  icon: string;
  uptime: number;
  successRate: number;
  lastIssue: string;
  status: AgentStatus;
  description: string;
}

export interface Incident {
  id: string;
  agentId: string;
  agentName: string;
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  rootCause: string;
  impact: string;
  confidence: number;
  detectedAt: Date;
  proposedFix: {
    steps: string[];
    estimatedTime: string;
  };
  logs: LogEntry[];
}

export interface LogEntry {
  timestamp: Date;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

export interface Metrics {
  totalAgents: number;
  incidentsResolved: number;
  avgMTTD: number; // Mean Time to Detect (minutes)
  avgMTTR: number; // Mean Time to Repair (minutes)
  costSaved: number;
}
