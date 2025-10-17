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
  version: string;
  lastUpdated: Date;
  totalRequests: number;
  avgResponseTime: number;
  recentActivity: ActivityLog[];
  performanceHistory: PerformanceData[];
  configuration: AgentConfig;
}

export interface ActivityLog {
  timestamp: Date;
  action: string;
  status: 'success' | 'warning' | 'error';
  details: string;
}

export interface PerformanceData {
  timestamp: Date;
  successRate: number;
  responseTime: number;
  requests: number;
}

export interface AgentConfig {
  model: string;
  temperature: number;
  maxTokens: number;
  knowledgeBase: string;
  lastSync: Date;
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
