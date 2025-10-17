import { Agent, Incident, Metrics } from '@/types/agent';

export const mockAgents: Agent[] = [
  {
    id: 'chat-agent',
    name: 'Chat Agent',
    icon: '🗣️',
    uptime: 99.2,
    successRate: 84,
    lastIssue: 'Negative Feedback Spike',
    status: 'failed',
    description: 'Customer support chat assistant'
  },
  {
    id: 'sales-navigator',
    name: 'Sales Navigator',
    icon: '📊',
    uptime: 97.5,
    successRate: 91,
    lastIssue: 'LinkedIn API Timeout',
    status: 'warning',
    description: 'Sales prospecting and lead generation'
  },
  {
    id: 'onboarding-agent',
    name: 'Onboarding Agent',
    icon: '💼',
    uptime: 99.9,
    successRate: 97,
    lastIssue: '-',
    status: 'healthy',
    description: 'New employee onboarding automation'
  },
  {
    id: 'minutes-agent',
    name: 'Minutes Agent',
    icon: '📝',
    uptime: 98.7,
    successRate: 89,
    lastIssue: 'Missing Action Items',
    status: 'warning',
    description: 'Meeting notes and action item extraction'
  },
  {
    id: 'knowledge-summariser',
    name: 'Knowledge Summariser',
    icon: '📚',
    uptime: 95.4,
    successRate: 80,
    lastIssue: 'Compliance Drift Detected',
    status: 'failed',
    description: 'Document analysis and summarization'
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
