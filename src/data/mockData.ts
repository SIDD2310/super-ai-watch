import { Agent, Incident, Metrics } from '@/types/agent';

const generateRecentActivity = (agentId: string, status: Agent['status']) => {
  const baseActivities = [
    { action: 'Processed user query', status: 'success' as 'success' | 'warning' | 'error', details: 'Response time: 245ms' },
    { action: 'Knowledge base sync', status: 'success' as 'success' | 'warning' | 'error', details: 'Synced 147 documents' },
    { action: 'Model inference', status: 'success' as 'success' | 'warning' | 'error', details: 'Tokens used: 1,234' },
  ];

  if (status === 'failed') {
    baseActivities.unshift({
      action: 'Anomaly detected',
      status: 'error' as 'success' | 'warning' | 'error',
      details: 'Negative feedback spike detected'
    });
  }

  return baseActivities.map((activity, index) => ({
    ...activity,
    timestamp: new Date(Date.now() - index * 300000) // 5 min intervals
  }));
};

const generatePerformanceHistory = (successRate: number) => {
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (23 - i) * 3600000), // hourly for 24h
    successRate: successRate + (Math.random() * 10 - 5),
    responseTime: 200 + Math.random() * 100,
    requests: Math.floor(Math.random() * 500 + 100)
  }));
};

export const mockAgents: Agent[] = [
  {
    id: 'chat-agent',
    name: 'Chat Agent',
    icon: '🗣️',
    uptime: 99.2,
    successRate: 84,
    lastIssue: 'Negative Feedback Spike',
    status: 'failed',
    description: 'Customer support chat assistant',
    version: 'v2.3.1',
    lastUpdated: new Date(Date.now() - 86400000),
    totalRequests: 45678,
    avgResponseTime: 245,
    recentActivity: generateRecentActivity('chat-agent', 'failed'),
    performanceHistory: generatePerformanceHistory(84),
    configuration: {
      model: 'gpt-4-turbo',
      temperature: 0.7,
      maxTokens: 2048,
      knowledgeBase: 'refund_policy_v1.pdf',
      lastSync: new Date(Date.now() - 604800000) // 7 days ago
    }
  },
  {
    id: 'sales-navigator',
    name: 'Sales Navigator',
    icon: '📊',
    uptime: 97.5,
    successRate: 91,
    lastIssue: 'LinkedIn API Timeout',
    status: 'warning',
    description: 'Sales prospecting and lead generation',
    version: 'v1.8.2',
    lastUpdated: new Date(Date.now() - 172800000),
    totalRequests: 23456,
    avgResponseTime: 312,
    recentActivity: generateRecentActivity('sales-navigator', 'warning'),
    performanceHistory: generatePerformanceHistory(91),
    configuration: {
      model: 'gpt-4',
      temperature: 0.5,
      maxTokens: 1500,
      knowledgeBase: 'sales_playbook_v3.pdf',
      lastSync: new Date(Date.now() - 172800000)
    }
  },
  {
    id: 'onboarding-agent',
    name: 'Onboarding Agent',
    icon: '💼',
    uptime: 99.9,
    successRate: 97,
    lastIssue: '-',
    status: 'healthy',
    description: 'New employee onboarding automation',
    version: 'v3.1.0',
    lastUpdated: new Date(Date.now() - 43200000),
    totalRequests: 8923,
    avgResponseTime: 189,
    recentActivity: generateRecentActivity('onboarding-agent', 'healthy'),
    performanceHistory: generatePerformanceHistory(97),
    configuration: {
      model: 'gpt-4-turbo',
      temperature: 0.3,
      maxTokens: 3000,
      knowledgeBase: 'onboarding_docs_v2.pdf',
      lastSync: new Date(Date.now() - 43200000)
    }
  },
  {
    id: 'minutes-agent',
    name: 'Minutes Agent',
    icon: '📝',
    uptime: 98.7,
    successRate: 89,
    lastIssue: 'Missing Action Items',
    status: 'warning',
    description: 'Meeting notes and action item extraction',
    version: 'v2.0.5',
    lastUpdated: new Date(Date.now() - 259200000),
    totalRequests: 12345,
    avgResponseTime: 278,
    recentActivity: generateRecentActivity('minutes-agent', 'warning'),
    performanceHistory: generatePerformanceHistory(89),
    configuration: {
      model: 'gpt-4',
      temperature: 0.2,
      maxTokens: 4096,
      knowledgeBase: 'meeting_templates_v1.pdf',
      lastSync: new Date(Date.now() - 259200000)
    }
  },
  {
    id: 'knowledge-summariser',
    name: 'Knowledge Summariser',
    icon: '📚',
    uptime: 95.4,
    successRate: 80,
    lastIssue: 'Compliance Drift Detected',
    status: 'failed',
    description: 'Document analysis and summarization',
    version: 'v1.5.3',
    lastUpdated: new Date(Date.now() - 432000000),
    totalRequests: 34567,
    avgResponseTime: 423,
    recentActivity: generateRecentActivity('knowledge-summariser', 'failed'),
    performanceHistory: generatePerformanceHistory(80),
    configuration: {
      model: 'gpt-4-turbo',
      temperature: 0.4,
      maxTokens: 2500,
      knowledgeBase: 'compliance_docs_v5.pdf',
      lastSync: new Date(Date.now() - 1209600000) // 14 days ago
    }
  }
];

export const mockIncident: Incident = {
  id: 'inc-001',
  agentId: 'chat-agent',
  agentName: 'Chat Agent',
  severity: 'high',
  title: 'Outdated Knowledge Base',
  description: 'Spike detected in negative feedback (↑ 34%) and drop in response accuracy (↓ 22%)',
  rootCause: 'Outdated policy context file. Chat Agent using refund_policy_v1.pdf instead of refund_policy_v2.pdf',
  impact: 'Customer misinformation, negative sentiment rise, potential compliance issues',
  confidence: 95,
  detectedAt: new Date(),
  proposedFix: {
    steps: [
      'Regenerate Chat Agent prompt with updated context',
      'Refresh knowledge source to latest refund_policy_v2.pdf',
      'Run validation tests (10 sample queries)',
      'Monitor feedback metrics for 1 hour'
    ],
    estimatedTime: '8 minutes'
  },
  logs: [
    {
      timestamp: new Date(),
      message: 'Fetching recent Chat Agent interactions...',
      type: 'info'
    },
    {
      timestamp: new Date(),
      message: 'Comparing context embeddings against policy update file...',
      type: 'info'
    },
    {
      timestamp: new Date(),
      message: 'Found mismatch: refund_policy_v2.pdf not synced',
      type: 'warning'
    },
    {
      timestamp: new Date(),
      message: 'Diagnosis: Outdated policy context file',
      type: 'error'
    }
  ]
};

export const mockMetrics: Metrics = {
  totalAgents: 5,
  incidentsResolved: 3,
  avgMTTD: 3.2,
  avgMTTR: 7.8,
  costSaved: 3200
};
