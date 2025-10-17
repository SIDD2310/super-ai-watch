import { Agent, Incident, Metrics, ActivityLog } from '@/types/agent';

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
    timestamp: new Date(Date.now() - index * 300000)
  }));
};

const generatePerformanceHistory = (successRate: number) => {
  return Array.from({ length: 24 }, (_, i) => ({
    timestamp: new Date(Date.now() - (23 - i) * 3600000),
    successRate: successRate + (Math.random() * 10 - 5),
    responseTime: 200 + Math.random() * 100,
    requests: Math.floor(Math.random() * 500 + 100)
  }));
};

export const allAgents: Agent[] = [
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
      lastSync: new Date(Date.now() - 604800000)
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
      lastSync: new Date(Date.now() - 1209600000)
    }
  },
  {
    id: 'email-assistant',
    name: 'Email Assistant',
    icon: '📧',
    uptime: 98.3,
    successRate: 93,
    lastIssue: '-',
    status: 'healthy',
    description: 'Automated email response and routing',
    version: 'v2.1.4',
    lastUpdated: new Date(Date.now() - 129600000),
    totalRequests: 19234,
    avgResponseTime: 201,
    recentActivity: generateRecentActivity('email-assistant', 'healthy'),
    performanceHistory: generatePerformanceHistory(93),
    configuration: {
      model: 'gpt-4',
      temperature: 0.6,
      maxTokens: 1800,
      knowledgeBase: 'email_templates_v4.pdf',
      lastSync: new Date(Date.now() - 259200000)
    }
  },
  {
    id: 'research-agent',
    name: 'Research Agent',
    icon: '🔬',
    uptime: 96.8,
    successRate: 88,
    lastIssue: 'Source Citation Error',
    status: 'warning',
    description: 'Market research and competitive analysis',
    version: 'v1.3.8',
    lastUpdated: new Date(Date.now() - 345600000),
    totalRequests: 7892,
    avgResponseTime: 512,
    recentActivity: generateRecentActivity('research-agent', 'warning'),
    performanceHistory: generatePerformanceHistory(88),
    configuration: {
      model: 'gpt-4-turbo',
      temperature: 0.5,
      maxTokens: 3500,
      knowledgeBase: 'research_sources_v2.pdf',
      lastSync: new Date(Date.now() - 518400000)
    }
  },
  {
    id: 'code-reviewer',
    name: 'Code Reviewer',
    icon: '💻',
    uptime: 99.5,
    successRate: 95,
    lastIssue: '-',
    status: 'healthy',
    description: 'Automated code review and quality checks',
    version: 'v4.2.0',
    lastUpdated: new Date(Date.now() - 21600000),
    totalRequests: 15678,
    avgResponseTime: 334,
    recentActivity: generateRecentActivity('code-reviewer', 'healthy'),
    performanceHistory: generatePerformanceHistory(95),
    configuration: {
      model: 'gpt-4-turbo',
      temperature: 0.2,
      maxTokens: 4000,
      knowledgeBase: 'coding_standards_v6.pdf',
      lastSync: new Date(Date.now() - 86400000)
    }
  }
];

export const supervisorFeed: ActivityLog[] = [
  {
    timestamp: new Date(Date.now() - 180000),
    action: 'Supervisor detected policy drift in Chat Agent',
    status: 'warning',
    details: 'Negative feedback increased by 34%'
  },
  {
    timestamp: new Date(Date.now() - 120000),
    action: 'Diagnosis complete: outdated refund_policy_v1 file',
    status: 'warning',
    details: 'Confidence: 95%'
  },
  {
    timestamp: new Date(Date.now() - 60000),
    action: 'Auto-generated patch applied',
    status: 'success',
    details: 'Validation passed (100%)'
  },
  {
    timestamp: new Date(Date.now() - 30000),
    action: 'Alex approved deployment to production',
    status: 'success',
    details: 'Chat Agent restored to healthy state'
  },
  {
    timestamp: new Date(Date.now() - 300000),
    action: 'LinkedIn API timeout detected in Sales Navigator',
    status: 'warning',
    details: 'Implementing retry logic'
  },
  {
    timestamp: new Date(Date.now() - 420000),
    action: 'Knowledge Summariser compliance drift warning',
    status: 'error',
    details: 'Outdated compliance documentation'
  }
];

export const allIncidents: Incident[] = [
  {
    id: 'inc-001',
    agentId: 'chat-agent',
    agentName: 'Chat Agent',
    severity: 'high',
    title: 'Outdated Knowledge Base',
    description: 'Spike detected in negative feedback (↑ 34%) and drop in response accuracy (↓ 22%)',
    rootCause: 'Outdated policy context file. Chat Agent using refund_policy_v1.pdf instead of refund_policy_v2.pdf',
    impact: 'Customer misinformation, negative sentiment rise, potential compliance issues',
    confidence: 95,
    detectedAt: new Date(Date.now() - 180000),
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
        timestamp: new Date(Date.now() - 180000),
        message: 'Fetching recent Chat Agent interactions...',
        type: 'warning'
      },
      {
        timestamp: new Date(Date.now() - 170000),
        message: 'Comparing context embeddings against policy update file...',
        type: 'warning'
      },
      {
        timestamp: new Date(Date.now() - 160000),
        message: 'Found mismatch: refund_policy_v2.pdf not synced',
        type: 'warning'
      },
      {
        timestamp: new Date(Date.now() - 150000),
        message: 'Diagnosis: Outdated policy context file',
        type: 'error'
      }
    ]
  },
  {
    id: 'inc-002',
    agentId: 'sales-navigator',
    agentName: 'Sales Navigator',
    severity: 'medium',
    title: 'LinkedIn API Timeout',
    description: 'Intermittent API timeouts affecting lead enrichment',
    rootCause: 'Rate limit exceeded on LinkedIn API endpoint',
    impact: 'Delayed prospect data, 12% reduction in lead quality score',
    confidence: 88,
    detectedAt: new Date(Date.now() - 300000),
    proposedFix: {
      steps: [
        'Implement exponential backoff retry logic',
        'Cache recent prospect data for 24 hours',
        'Add rate limit monitoring dashboard',
        'Request increased API quota from LinkedIn'
      ],
      estimatedTime: '15 minutes'
    },
    logs: [
      {
        timestamp: new Date(Date.now() - 300000),
        message: 'API timeout detected on LinkedIn endpoint',
        type: 'error'
      },
      {
        timestamp: new Date(Date.now() - 290000),
        message: 'Rate limit headers indicate quota exceeded',
        type: 'warning'
      },
      {
        timestamp: new Date(Date.now() - 280000),
        message: 'Implementing retry logic with backoff',
        type: 'warning'
      }
    ]
  },
  {
    id: 'inc-003',
    agentId: 'knowledge-summariser',
    agentName: 'Knowledge Summariser',
    severity: 'high',
    title: 'Compliance Drift Detected',
    description: 'Agent responses drifting from regulatory compliance standards',
    rootCause: 'Outdated compliance_docs_v5.pdf, missing recent regulatory updates',
    impact: 'Potential regulatory violations, 20% drop in compliance score',
    confidence: 92,
    detectedAt: new Date(Date.now() - 420000),
    proposedFix: {
      steps: [
        'Update knowledge base with compliance_docs_v7.pdf',
        'Retrain agent with latest regulatory guidelines',
        'Run compliance audit on recent outputs',
        'Implement monthly compliance sync schedule'
      ],
      estimatedTime: '25 minutes'
    },
    logs: [
      {
        timestamp: new Date(Date.now() - 420000),
        message: 'Compliance drift detected in summarization outputs',
        type: 'error'
      },
      {
        timestamp: new Date(Date.now() - 410000),
        message: 'Knowledge base last updated 14 days ago',
        type: 'warning'
      },
      {
        timestamp: new Date(Date.now() - 400000),
        message: 'New regulatory docs available: compliance_docs_v7.pdf',
        type: 'warning'
      }
    ]
  }
];

export const mockMetrics: Metrics = {
  totalAgents: 8,
  incidentsResolved: 3,
  avgMTTD: 3.2,
  avgMTTR: 7.8,
  costSaved: 3200
};
