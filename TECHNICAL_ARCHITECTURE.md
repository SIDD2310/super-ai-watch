# SuperAI Technical Architecture

## Executive Summary

SuperAI is an enterprise-grade AI Agent Operations Platform that provides real-time monitoring, diagnostics, and self-healing capabilities for AI agents. The platform leverages a modern web stack with React/TypeScript on the frontend and Lovable Cloud (Supabase) on the backend, integrated with advanced AI systems including Grok (x.ai API) for intelligent diagnostics and Relevance AI for agent orchestration.

**Key Capabilities:**
- Real-time AI agent monitoring and health tracking
- Intelligent incident detection and root cause analysis
- AI-powered supervisor for diagnostics and fix suggestions
- Self-healing agent capabilities
- Comprehensive analytics and performance metrics
- Live activity feed and terminal logs

---

## System Architecture Overview

<lov-mermaid>
graph TB
    subgraph "Frontend Layer"
        UI[React UI Components]
        State[TanStack Query State]
        Hooks[Custom React Hooks]
        RT[Realtime Subscriptions]
    end
    
    subgraph "Lovable Cloud Backend"
        EF[Edge Functions]
        DB[(PostgreSQL Database)]
        Auth[Supabase Auth]
        Storage[File Storage]
    end
    
    subgraph "AI Integration Layer"
        Grok[Grok AI - x.ai API]
        Relevance[Relevance AI]
    end
    
    subgraph "External Systems"
        Agents[AI Agents Being Monitored]
    end
    
    UI --> State
    State --> Hooks
    Hooks --> EF
    UI --> RT
    RT --> DB
    EF --> DB
    EF --> Auth
    EF --> Grok
    EF --> Relevance
    Agents --> DB
    
    style UI fill:#667eea
    style EF fill:#764ba2
    style Grok fill:#f093fb
    style Relevance fill:#4facfe
</lov-mermaid>

---

## Frontend Architecture

### Technology Stack
- **Framework:** React 18.3.1 with TypeScript
- **Build Tool:** Vite
- **Styling:** TailwindCSS with custom design tokens
- **UI Components:** Radix UI primitives + custom shadcn/ui components
- **State Management:** TanStack React Query v5
- **Routing:** React Router DOM v6
- **Real-time:** Supabase Realtime subscriptions
- **Charts:** Recharts for analytics visualization

### Design System

The application uses a semantic token-based design system defined in `src/index.css` and `tailwind.config.ts`:

```css
/* Core semantic tokens */
--primary: [hsl values]
--secondary: [hsl values]
--accent: [hsl values]
--background: [hsl values]
--foreground: [hsl values]
```

**Design Principles:**
- All colors use HSL format for consistent theming
- Semantic tokens used throughout (no direct colors in components)
- Light/dark mode support via CSS variables
- Radix UI component variants for consistent UX

### Component Architecture

<lov-mermaid>
graph TD
    App[App.tsx - Root]
    App --> Landing[Landing Page]
    App --> Dashboard[Dashboard - Index]
    App --> Agents[Agents Page]
    App --> Incidents[Incidents Page]
    App --> Analytics[Analytics Page]
    App --> Create[Create Agent]
    App --> Settings[Settings]
    
    Dashboard --> AgentCard[Agent Card]
    Dashboard --> SupervisorSummary[Supervisor Summary]
    Dashboard --> SupervisorFeed[Supervisor Feed]
    Dashboard --> SystemHealthBar[System Health Bar]
    
    Agents --> AgentDetailsModal[Agent Details Modal]
    Agents --> StatusBadge[Status Badge]
    
    Incidents --> IncidentModal[Incident Modal]
    Incidents --> LogTerminal[Log Terminal]
    
    Analytics --> AnalyticsTab[Analytics Tab]
    
    style App fill:#667eea
    style Dashboard fill:#764ba2
    style Agents fill:#f093fb
</lov-mermaid>

### Key Components

#### Core Pages
- **`Landing.tsx`**: Marketing landing page with hero, features, architecture, and team sections
- **`Index.tsx`**: Main dashboard with agent overview, supervisor feed, and system health
- **`Agents.tsx`**: Agent management with search, filtering, and detail views
- **`Incidents.tsx`**: Incident tracking with severity-based filtering and diagnostics
- **`Analytics.tsx`**: Performance metrics and analytics visualization
- **`CreateAgent.tsx`**: Agent creation wizard
- **`Settings.tsx`**: System configuration and preferences

#### UI Components
- **`AgentCard.tsx`**: Displays agent status, metrics, and quick actions
- **`AgentDetailsModal.tsx`**: Full agent details with performance history and configuration
- **`IncidentModal.tsx`**: Detailed incident view with AI diagnosis and fix suggestions
- **`SupervisorFeed.tsx`**: Real-time activity feed showing supervisor actions
- **`LogTerminal.tsx`**: Terminal-style log viewer with syntax highlighting
- **`StatusBadge.tsx`**: Visual status indicators (healthy, warning, failed)
- **`SystemHealthBar.tsx`**: Overall system health visualization

### Custom Hooks

#### `useAISupervisor.tsx`
Provides AI-powered diagnostics and analysis capabilities:

```typescript
interface DiagnosisResult {
  analysis: string;
  timestamp: string;
  model: string;
  analysisType: string;
}

const {
  diagnoseIssue,      // Analyze incidents and identify root causes
  suggestFix,         // Generate step-by-step fix recommendations
  performHealthCheck, // Evaluate agent health and performance
  isAnalyzing        // Loading state
} = useAISupervisor();
```

**Edge Function:** `supervisor-diagnose`

#### `useRelevanceAgents.tsx`
Manages integration with Relevance AI for agent orchestration:

```typescript
interface RelevanceAgent {
  agent_id: string;
  name: string;
  description: string;
  // ... additional properties
}

const {
  agents,        // List of available Relevance AI agents
  isLoading,     // Loading state
  fetchAgents,   // Refresh agent list
  triggerAgent   // Execute agent with parameters
} = useRelevanceAgents();
```

**Edge Function:** `relevance-agents`
**Note:** REST API limitations - listing agents not supported, returns empty array

---

## Backend Architecture

### Lovable Cloud (Supabase Infrastructure)

**Project ID:** `wdszzbnxphldaqotenye`

### Database Schema

Currently uses mock data architecture with these core types:

```typescript
// Agent Type
interface Agent {
  id: string;
  name: string;
  icon: string;
  uptime: number;              // Percentage
  successRate: number;         // Percentage
  lastIssue: string;
  status: 'healthy' | 'warning' | 'failed';
  description: string;
  version: string;
  lastUpdated: Date;
  totalRequests: number;
  avgResponseTime: number;     // Milliseconds
  recentActivity: ActivityLog[];
  performanceHistory: PerformanceData[];
  configuration: AgentConfig;
}

// Incident Type
interface Incident {
  id: string;
  agentId: string;
  agentName: string;
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  rootCause: string;
  impact: string;
  confidence: number;          // Percentage
  detectedAt: Date;
  proposedFix: {
    steps: string[];
    estimatedTime: string;
  };
  logs: LogEntry[];
}

// Metrics Type
interface Metrics {
  totalAgents: number;
  incidentsResolved: number;
  avgMTTD: number;             // Mean Time to Detect (minutes)
  avgMTTR: number;             // Mean Time to Repair (minutes)
  costSaved: number;           // USD
}
```

**Future Schema (Production):**
When transitioning from mock data to production database:

```sql
-- Agents table
CREATE TABLE public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT,
  status TEXT CHECK (status IN ('healthy', 'warning', 'failed')),
  uptime NUMERIC,
  success_rate NUMERIC,
  description TEXT,
  version TEXT,
  total_requests INTEGER DEFAULT 0,
  avg_response_time INTEGER,
  configuration JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Incidents table
CREATE TABLE public.incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id),
  severity TEXT CHECK (severity IN ('low', 'medium', 'high')),
  title TEXT NOT NULL,
  description TEXT,
  root_cause TEXT,
  impact TEXT,
  confidence NUMERIC,
  proposed_fix JSONB,
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  status TEXT DEFAULT 'open'
);

-- Activity logs table
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id),
  action TEXT NOT NULL,
  status TEXT CHECK (status IN ('success', 'warning', 'error')),
  details TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Performance data table
CREATE TABLE public.performance_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id),
  success_rate NUMERIC,
  response_time INTEGER,
  requests INTEGER,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

### Edge Functions (Serverless Backend)

#### 1. `supervisor-diagnose`
**Purpose:** AI-powered incident diagnosis and fix recommendations using Grok API

**Endpoint:** `POST /functions/v1/supervisor-diagnose`

**Configuration:**
```toml
[functions.supervisor-diagnose]
verify_jwt = false
```

**Request:**
```typescript
{
  agentData: Agent;
  incidentData?: Incident;
  analysisType: 'diagnose' | 'suggest-fix' | 'health-check';
}
```

**Response:**
```typescript
{
  analysis: string;      // AI-generated analysis
  timestamp: string;
  model: string;         // "grok-beta"
  analysisType: string;
}
```

**AI Prompts:**

- **Diagnose:** "Analyze this AI agent incident and identify the root cause..."
- **Suggest Fix:** "Based on this agent's incident, provide a step-by-step fix..."
- **Health Check:** "Perform a comprehensive health check on this AI agent..."

**External API:** x.ai Grok API
- **Endpoint:** `https://api.x.ai/v1/chat/completions`
- **Model:** `grok-beta`
- **Auth:** Bearer token via `Grok_api_key` secret

**Error Handling:**
- Invalid API key detection
- 400/500 error responses with detailed logging
- CORS support for web app integration

#### 2. `relevance-agents`
**Purpose:** Integration with Relevance AI for agent orchestration

**Endpoint:** `POST /functions/v1/relevance-agents`

**Configuration:**
```toml
[functions.relevance-agents]
verify_jwt = false
```

**Actions:**

1. **List Agents** (Currently Limited)
```typescript
{ action: 'list-agents' }
// Returns: { agents: [], message: "REST API limitation" }
```
*Note:* Relevance AI REST API doesn't support listing agents. Use Python SDK or manual agent IDs.

2. **Trigger Agent**
```typescript
{
  action: 'trigger-agent',
  agentId: string,
  params: {
    message?: string;
  }
}
```

3. **Agent History**
```typescript
{
  action: 'agent-history',
  conversationId: string
}
```

**External API:** Relevance AI
- **Base URL:** `https://api-${REGION}.stack.tryrelevance.com/latest`
- **Auth:** Bearer token via `RELEVANCE_AI_AUTH_TOKEN` secret
- **Project:** Configured via environment

### Secrets Management

Configured via Lovable Cloud secrets:

| Secret Name | Purpose | Used By |
|-------------|---------|---------|
| `Grok_api_key` | Grok AI API authentication | `supervisor-diagnose` |
| `RELEVANCE_AI_AUTH_TOKEN` | Relevance AI authentication | `relevance-agents` |
| `SUPABASE_URL` | Database URL | Auto-configured |
| `SUPABASE_ANON_KEY` | Public API key | Auto-configured |
| `SUPABASE_SERVICE_ROLE_KEY` | Admin API key | Edge functions |
| `SUPABASE_PUBLISHABLE_KEY` | Client API key | Frontend |

---

## AI Integration Layer

### Grok AI (x.ai API)

**Purpose:** Intelligent supervisor for diagnostics, analysis, and recommendations

**Capabilities:**
- Root cause analysis of agent failures
- Step-by-step fix generation
- Health check assessments
- Natural language incident explanations

**Integration Pattern:**
```typescript
// Frontend → Edge Function → Grok API
const { diagnoseIssue } = useAISupervisor();
const diagnosis = await diagnoseIssue(agent, incident);
// Returns AI-generated analysis
```

**Model:** `grok-beta`
**Temperature:** 0.7 (balanced creativity/accuracy)
**Max Tokens:** 500

### Relevance AI

**Purpose:** AI agent orchestration and management platform

**Current Integration Status:**
- Edge function implemented
- REST API limitations identified
- Trigger and history endpoints functional
- List agents not available via REST (Python SDK required)

**Use Cases:**
- Agent execution and orchestration
- Conversation management
- Multi-agent workflows

---

## Data Flow & Communication

<lov-mermaid>
sequenceDiagram
    participant User
    participant UI as React UI
    participant Hook as useAISupervisor Hook
    participant EF as Edge Function
    participant Grok as Grok AI API
    participant DB as Database
    
    User->>UI: Views incident
    UI->>Hook: diagnoseIssue(agent, incident)
    Hook->>EF: POST /supervisor-diagnose
    Note over EF: Constructs AI prompt based on analysisType
    EF->>Grok: POST /chat/completions
    Grok-->>EF: AI analysis response
    EF->>DB: (Future) Log diagnosis
    EF-->>Hook: DiagnosisResult
    Hook-->>UI: Update UI with analysis
    UI-->>User: Display AI diagnosis
</lov-mermaid>

### Request Flow Patterns

#### 1. Real-time Agent Monitoring
```
Agents → Database → Realtime Subscriptions → UI Updates
```

#### 2. Incident Diagnosis
```
User Action → useAISupervisor Hook → supervisor-diagnose Edge Function → Grok API → Response to UI
```

#### 3. Agent Triggering
```
User Action → useRelevanceAgents Hook → relevance-agents Edge Function → Relevance AI API → Response to UI
```

---

## Security & Authentication

### Current Implementation
- **Edge Functions:** Public access (`verify_jwt = false`)
- **CORS:** Enabled for all origins (`Access-Control-Allow-Origin: *`)
- **API Keys:** Stored as Supabase secrets, not exposed to frontend

### Production Security Roadmap

#### Row Level Security (RLS)
```sql
-- Enable RLS on agents table
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all agents
CREATE POLICY "Agents are viewable by authenticated users"
ON public.agents FOR SELECT
TO authenticated
USING (true);

-- Policy: Only admins can modify agents
CREATE POLICY "Agents are modifiable by admins"
ON public.agents FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin');
```

#### Authentication
- Supabase Auth with email/password
- OAuth providers (Google, GitHub)
- JWT-based session management
- Auto-confirm email signups for development

#### API Security
- Enable JWT verification for edge functions
- Rate limiting on sensitive endpoints
- Input validation and sanitization
- Secrets rotation policy

---

## Monitoring & Observability

### Real-time Monitoring

#### Supervisor Feed
Displays live activity from the AI supervisor:
```typescript
interface SupervisorActivity {
  timestamp: Date;
  agent: string;
  action: string;
  status: 'success' | 'warning' | 'error';
  details: string;
}
```

**Features:**
- Auto-scrolling terminal-style feed
- Color-coded status indicators
- Timestamp formatting
- Action categorization

#### System Health Bar
Visualizes overall platform health:
- Total active agents
- Incidents resolved count
- Average MTTD (Mean Time to Detect)
- Average MTTR (Mean Time to Repair)
- Cost savings calculation

### Metrics & Analytics

**Performance Metrics:**
- Agent uptime percentage
- Success rate tracking
- Response time averages
- Request volume trends

**Incident Metrics:**
- Detection time
- Resolution time
- Severity distribution
- Root cause categories

**Cost Metrics:**
- Cost per agent per day
- Total operational savings
- ROI calculations

---

## Deployment & Scaling

### Current Deployment
- **Frontend:** Lovable preview/production deployment
- **Backend:** Lovable Cloud (Supabase)
- **Edge Functions:** Auto-deployed with code changes
- **Database:** PostgreSQL (Supabase-managed)

### Production Deployment Strategy

#### Frontend Deployment
```bash
# Build optimized production bundle
npm run build

# Deploy to Lovable production
# Automatic via Lovable platform
```

**Optimization:**
- Code splitting via Vite
- Lazy loading for routes
- Image optimization
- Minification and tree-shaking

#### Edge Function Deployment
- Auto-deployed on code push
- No manual deployment needed
- Version control via Git
- Instant rollback capability

#### Database Scaling
- Automatic read replicas (Supabase)
- Connection pooling (PgBouncer)
- Vertical scaling for growing workloads
- Horizontal scaling via read replicas

### Performance Optimization

#### Frontend
- React.lazy() for code splitting
- TanStack Query caching strategy
- Debounced search inputs
- Virtualized lists for large datasets

#### Backend
- Database indexing on frequently queried fields
- Query optimization with proper JOINs
- Edge function response caching
- CDN for static assets

---

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.3.1 | UI framework |
| TypeScript | Latest | Type safety |
| Vite | Latest | Build tool |
| TailwindCSS | Latest | Styling |
| Radix UI | Latest | UI primitives |
| TanStack Query | 5.83.0 | State management |
| React Router | 6.30.1 | Routing |
| Recharts | 2.15.4 | Charts |
| Lucide React | 0.462.0 | Icons |
| Sonner | 1.7.4 | Toast notifications |

### Backend
| Technology | Purpose |
|------------|---------|
| Supabase | Backend platform |
| PostgreSQL | Database |
| Deno | Edge function runtime |
| PostgREST | Auto-generated REST API |

### AI & External Services
| Service | Purpose | API |
|---------|---------|-----|
| Grok (x.ai) | AI diagnostics | REST API |
| Relevance AI | Agent orchestration | REST API |

### Development Tools
| Tool | Purpose |
|------|---------|
| ESLint | Linting |
| TypeScript | Type checking |
| Bun | Package manager |
| Git | Version control |

---

## API Reference

### Edge Functions

#### `supervisor-diagnose`

**Endpoint:** `POST https://wdszzbnxphldaqotenye.supabase.co/functions/v1/supervisor-diagnose`

**Request Body:**
```typescript
{
  agentData: {
    id: string;
    name: string;
    status: 'healthy' | 'warning' | 'failed';
    uptime: number;
    successRate: number;
    // ... other Agent fields
  },
  incidentData?: {
    id: string;
    title: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    // ... other Incident fields
  },
  analysisType: 'diagnose' | 'suggest-fix' | 'health-check'
}
```

**Response:**
```typescript
{
  analysis: string;
  timestamp: string;
  model: 'grok-beta';
  analysisType: string;
}
```

**Error Response:**
```typescript
{
  error: string;
}
```

#### `relevance-agents`

**Endpoint:** `POST https://wdszzbnxphldaqotenye.supabase.co/functions/v1/relevance-agents`

**List Agents:**
```typescript
// Request
{ action: 'list-agents' }

// Response
{
  agents: [],
  message: 'Relevance AI REST API does not support listing agents...'
}
```

**Trigger Agent:**
```typescript
// Request
{
  action: 'trigger-agent',
  agentId: string,
  params: {
    message?: string;
  }
}

// Response
{
  conversation_id: string;
  output: any;
  // ... agent response
}
```

**Agent History:**
```typescript
// Request
{
  action: 'agent-history',
  conversationId: string
}

// Response
{
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
}
```

---

## Future Enhancements

### Short-term (1-3 months)

1. **Database Migration from Mock Data**
   - Implement full PostgreSQL schema
   - Create RLS policies for data security
   - Set up realtime subscriptions
   - Migrate to production data models

2. **Authentication System**
   - Implement Supabase Auth
   - Add role-based access control (RBAC)
   - Create user profiles and permissions
   - Enable SSO/OAuth providers

3. **Relevance AI Full Integration**
   - Implement Python SDK bridge
   - Enable agent listing functionality
   - Add multi-agent orchestration
   - Create agent templates library

4. **Enhanced Monitoring**
   - Real-time agent health dashboards
   - Custom alert rules engine
   - Webhook notifications
   - Slack/Discord integrations

### Medium-term (3-6 months)

1. **Advanced AI Capabilities**
   - Multi-model support (GPT-5, Claude, Gemini)
   - Model selection based on task complexity
   - Fine-tuned models for specific agent types
   - Automated A/B testing of AI responses

2. **Self-Healing Automation**
   - Automated incident remediation
   - Rollback mechanisms
   - Circuit breakers for failing agents
   - Auto-scaling based on load

3. **Analytics & Reporting**
   - Custom report builder
   - Export to PDF/CSV
   - Executive dashboards
   - Predictive analytics with ML

4. **Agent Marketplace**
   - Pre-built agent templates
   - Community-contributed agents
   - Agent versioning and deployment
   - Testing and staging environments

### Long-term (6-12 months)

1. **Multi-tenancy**
   - Organization management
   - Team collaboration features
   - Resource quotas and billing
   - Isolated environments

2. **Advanced Observability**
   - Distributed tracing
   - APM (Application Performance Monitoring)
   - Custom metrics and dashboards
   - Log aggregation and analysis

3. **AI Model Training**
   - Custom model fine-tuning
   - Feedback loop for improvement
   - Transfer learning from agent interactions
   - Domain-specific model adaptation

4. **Enterprise Features**
   - On-premise deployment option
   - Advanced compliance (SOC 2, GDPR)
   - SLA management
   - Dedicated support

---

## Architecture Decision Records (ADRs)

### ADR-001: Mock Data vs. Database
**Status:** Pending migration  
**Context:** Currently using mock data for rapid prototyping  
**Decision:** Migrate to PostgreSQL for production  
**Consequences:** Enables persistence, scalability, and multi-user support

### ADR-002: Edge Functions vs. Server
**Status:** Accepted  
**Context:** Need serverless backend for AI integrations  
**Decision:** Use Supabase Edge Functions (Deno)  
**Consequences:** Automatic scaling, no server management, pay-per-use

### ADR-003: Grok vs. Other AI Models
**Status:** Accepted  
**Context:** Need intelligent diagnostics for agent supervision  
**Decision:** Use Grok (x.ai) for reasoning capabilities  
**Consequences:** Advanced reasoning, competitive pricing, x.ai ecosystem

### ADR-004: Public Edge Functions
**Status:** Temporary  
**Context:** Development speed vs. security  
**Decision:** Public functions for MVP, add auth later  
**Consequences:** Faster iteration, security implementation deferred

---

## Glossary

| Term | Definition |
|------|------------|
| **Agent** | An AI-powered entity that performs automated tasks |
| **Incident** | A detected failure or anomaly in agent behavior |
| **MTTD** | Mean Time to Detect - average time to identify incidents |
| **MTTR** | Mean Time to Repair - average time to resolve incidents |
| **RLS** | Row Level Security - database-level access control |
| **Edge Function** | Serverless function running close to users |
| **Supervisor** | AI system that monitors and diagnoses agents |
| **Self-Healing** | Automated incident detection and remediation |

---

## Contributing

### Development Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run type-check

# Build for production
npm run build
```

### Code Style
- TypeScript strict mode
- ESLint configuration
- Semantic token-based styling
- Component composition over props drilling

### Testing Strategy (Future)
- Unit tests with Vitest
- Integration tests for edge functions
- E2E tests with Playwright
- Visual regression testing

---

## Support & Resources

- **Documentation:** [Internal Wiki]
- **Issue Tracker:** [GitHub Issues]
- **Discussions:** [GitHub Discussions]
- **Supabase Docs:** https://supabase.com/docs
- **Grok API Docs:** https://docs.x.ai/
- **Relevance AI Docs:** https://relevanceai.com/docs

---

**Last Updated:** 2025-10-17  
**Version:** 1.0.0  
**Maintained By:** SuperAI Development Team
