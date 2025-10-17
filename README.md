# SuperAI - The AI that Supervises AI

<div align="center">

![SuperAI Logo](https://img.shields.io/badge/SuperAI-Next--Gen_AI_Operations-00D9FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMgMkw0IDEybDkgMTBsOC0xMEwxMyAyeiIgZmlsbD0iIzAwRDlGRiIvPjwvc3ZnPg==)

**Meet the world's first self-healing AI orchestration layer**

[Live Demo](https://lovable.dev/projects/04eff7ca-5d0a-44e2-a56c-87c40a1a6c69) • [Documentation](#documentation) • [Features](#features) • [Tech Stack](#tech-stack)

</div>

---

## 📖 Overview

SuperAI is a next-generation AI operations platform that monitors, diagnoses, and automatically repairs AI agents in real-time. Built for the modern AI-first enterprise, SuperAI ensures your AI agents never go dark with autonomous health monitoring, intelligent diagnostics, and self-healing capabilities.

### The Problem

AI agents are growing fast, but they break silently:
- 🔴 **Silent Failures** - Agent timeouts and degraded performance go unnoticed
- ⏱️ **Manual Debugging** - Hours wasted troubleshooting AI-specific issues
- 💸 **Revenue Impact** - Undetected failures cost time, trust, and money

### The Solution

SuperAI provides:
- ✅ **Instant Detection** - AI-powered monitoring detects issues in seconds
- 🔍 **Root Cause Analysis** - Automated diagnosis identifies the exact problem
- 🔧 **Self-Healing** - Autonomous remediation with zero downtime
- 📊 **Full Visibility** - Real-time dashboards and performance analytics

---

## ✨ Features

### 🤖 AI Agent Management
- **Agent Health Grid** - Visual dashboard showing real-time status of all AI agents
- **Performance Monitoring** - Track success rates, response times, and uptime
- **Agent Configuration** - Manage models, data sources, and response styles
- **Custom Metrics** - Define and track custom KPIs for each agent

### 🚨 Intelligent Incident Management
- **Automatic Detection** - ML-powered anomaly detection for AI-specific issues
- **Root Cause Analysis** - Deep diagnostics to identify exact failure points
- **Proposed Fixes** - AI-generated remediation plans with confidence scores
- **Incident Timeline** - Complete audit trail of detection, diagnosis, and recovery

### 🔄 Self-Healing Automation
- **Auto-Remediation** - Execute approved fixes without human intervention
- **Validation Testing** - Run comprehensive tests before deploying fixes
- **Rollback Support** - Automatic rollback if fixes don't resolve issues
- **Semi-Autonomous Mode** - Human-in-the-loop for critical decisions

### 📊 Analytics & Insights
- **Performance Trends** - Historical charts showing agent health over time
- **System Health Score** - Overall platform health rating (0-10)
- **Activity Feed** - Real-time supervisor actions and system events
- **Custom Reports** - Generate detailed reports on agent performance

### 🎬 Interactive Demo
- **Live Simulation** - See self-healing in action with realistic scenarios
- **Step-by-Step Walkthrough** - Understand detection, diagnosis, and recovery phases
- **Real-Time Logs** - Watch the supervisor AI work through issues

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible component library
- **React Router** - Client-side routing
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend & Infrastructure
- **Lovable Cloud** - Managed backend platform
- **Supabase** - PostgreSQL database with real-time capabilities
- **Edge Functions** - Serverless backend logic
- **Row Level Security** - Database-level security policies

### AI & Integrations
- **Relevance AI** - External AI agent integration
- **Lovable AI Gateway** - Multi-model AI capabilities
- **Custom Diagnostics** - Proprietary AI analysis engine

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**

The `.env` file is auto-configured by Lovable Cloud and includes:
```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-publishable-key>
VITE_SUPABASE_PROJECT_ID=<your-project-id>
```

4. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**
Navigate to `http://localhost:8080` to see the application

---

## 📁 Project Structure

```
superai/
├── src/
│   ├── components/          # React components
│   │   ├── landing/        # Landing page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ProblemVisionSection.tsx
│   │   │   ├── LiveSimulation.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── ImpactSection.tsx
│   │   │   ├── ArchitectureSection.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   └── Footer.tsx
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AgentCard.tsx   # Agent status card
│   │   ├── AgentDetailsModal.tsx
│   │   ├── IncidentModal.tsx
│   │   ├── SelfHealingModal.tsx
│   │   ├── LogTerminal.tsx
│   │   ├── Navigation.tsx
│   │   ├── StatusBadge.tsx
│   │   └── SupervisorFeed.tsx
│   ├── pages/              # Page components
│   │   ├── Landing.tsx     # Landing page
│   │   ├── Index.tsx       # Dashboard (main app)
│   │   ├── Agents.tsx      # Agents management
│   │   ├── Analytics.tsx   # Analytics view
│   │   ├── Incidents.tsx   # Incidents list
│   │   ├── Settings.tsx    # Settings page
│   │   └── CreateAgent.tsx # Create new agent
│   ├── hooks/              # Custom React hooks
│   │   ├── useAgents.tsx   # Agent CRUD operations
│   │   ├── useRelevanceAgents.tsx
│   │   └── useAISupervisor.tsx
│   ├── data/               # Mock data
│   │   ├── mockData.ts
│   │   └── extendedMockData.ts
│   ├── types/              # TypeScript types
│   │   └── agent.ts
│   ├── integrations/       # External integrations
│   │   └── supabase/
│   │       ├── client.ts   # Supabase client
│   │       └── types.ts    # Auto-generated types
│   ├── lib/                # Utility functions
│   │   └── utils.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles & design system
├── supabase/
│   ├── functions/          # Edge Functions
│   │   ├── relevance-agents/
│   │   └── supervisor-diagnose/
│   └── config.toml         # Supabase configuration
├── public/                 # Static assets
├── index.html              # HTML template
├── tailwind.config.ts      # Tailwind configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Dependencies
```

---

## 🗄️ Database Schema

### Tables

#### `agents`
Stores AI agent configurations and metadata
```sql
- id (uuid, primary key)
- name (text, not null)
- icon (text)
- status (text) - 'healthy' | 'warning' | 'failed'
- description (text, not null)
- category (text)
- model (text)
- data_source (text)
- response_style (text)
- success_rate (numeric)
- uptime (numeric)
- avg_response_time (integer)
- total_requests (integer)
- last_issue (text)
- version (text)
- goal_metric (text)
- alert_sensitivity (text)
- owner (text)
- fix_permissions (text)
- self_monitoring (boolean)
- configuration (jsonb)
- created_at (timestamp)
- updated_at (timestamp)
```

#### `incidents`
Tracks detected issues and their resolution
```sql
- id (uuid, primary key)
- agent_id (uuid)
- agent_name (text, not null)
- title (text, not null)
- description (text)
- severity (text) - 'low' | 'medium' | 'high' | 'critical'
- status (text) - 'open' | 'resolving' | 'resolved'
- impact (text)
- root_cause (text)
- proposed_fix (jsonb)
- confidence (numeric)
- logs (jsonb)
- detected_at (timestamp)
- resolved_at (timestamp)
```

#### `performance_data`
Historical performance metrics for agents
```sql
- id (uuid, primary key)
- agent_id (uuid)
- success_rate (numeric)
- response_time (integer)
- requests (integer)
- timestamp (timestamp)
```

#### `activity_logs`
Audit trail of supervisor actions
```sql
- id (uuid, primary key)
- agent_id (uuid)
- action (text, not null)
- status (text) - 'success' | 'failed' | 'pending'
- details (text)
- timestamp (timestamp)
```

### Edge Functions

#### `relevance-agents`
Fetches and synchronizes agents from Relevance AI platform

#### `supervisor-diagnose`
AI-powered diagnostic analysis for incident root cause identification

---

## 🎨 Design System

SuperAI uses a comprehensive design system with semantic tokens:

### Color Palette
- **Primary** - Midnight Blue (`hsl(220 85% 16%)`)
- **Accent** - Electric Cyan (`hsl(185 100% 52%)`)
- **Purple** - Neon Purple (`hsl(280 95% 62%)`)
- **Success** - Green (`hsl(142 76% 48%)`)
- **Warning** - Amber (`hsl(38 95% 52%)`)
- **Destructive** - Red (`hsl(0 88% 62%)`)

### Visual Effects
- **Glassmorphism** - Frosted glass UI elements
- **Glow Effects** - Cyan and purple neon glows
- **Animations** - Smooth transitions and micro-interactions
- **Gradients** - Multi-layer gradient overlays
- **Shadows** - Cinematic elevation shadows

### Typography
- **Headings** - Large, bold, with gradient text effects
- **Body** - Clean, readable with proper hierarchy
- **Mono** - Terminal-style for logs and code

---

## 🔐 Security

### Database Security
- **Row Level Security (RLS)** enabled on all tables
- **Public read access** for demonstration purposes
- **Authenticated writes** for production environments

### Environment Variables
- All sensitive keys stored in Supabase secrets
- No hardcoded credentials in source code
- Automatic injection via Lovable Cloud

### API Security
- Edge Functions use service role keys
- CORS configured for allowed origins
- Rate limiting on external API calls

---

## 🚢 Deployment

### Deploy with Lovable (Recommended)

1. Open your [Lovable Project](https://lovable.dev/projects/04eff7ca-5d0a-44e2-a56c-87c40a1a6c69)
2. Click **Share → Publish**
3. Your app is live! 🎉

### Deploy Manually

The app can be deployed to any static hosting provider:

**Vercel**
```bash
npm run build
vercel --prod
```

**Netlify**
```bash
npm run build
netlify deploy --prod --dir=dist
```

**Custom Domain**
Navigate to Project > Settings > Domains in Lovable to connect your domain.

---

## 🧪 Development

### Running Tests
```bash
npm run test
```

### Code Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

### Building for Production
```bash
npm run build
```

---

## 📚 Documentation

### Key Concepts

**Agent** - An AI system being monitored (chatbot, analytics engine, etc.)

**Supervisor** - The AI that monitors and manages other agents

**Incident** - A detected issue with an agent requiring attention

**Self-Healing** - Automated remediation without human intervention

**Performance History** - Time-series data showing agent health trends

### API Reference

#### Supabase Queries

**Fetch all agents**
```typescript
const { data: agents } = await supabase
  .from('agents')
  .select('*')
  .order('created_at', { ascending: false });
```

**Create incident**
```typescript
const { data: incident } = await supabase
  .from('incidents')
  .insert({
    agent_id: 'uuid',
    agent_name: 'Chat Agent',
    title: 'High error rate detected',
    severity: 'high',
    status: 'open'
  })
  .select()
  .single();
```

**Update agent status**
```typescript
const { data } = await supabase
  .from('agents')
  .update({ status: 'healthy', success_rate: 97 })
  .eq('id', agentId);
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Coding Standards
- Use TypeScript for type safety
- Follow the existing component structure
- Use semantic variable names
- Add comments for complex logic
- Ensure responsive design
- Test on multiple browsers

---

## 🐛 Troubleshooting

### Common Issues

**Build Errors**
- Ensure Node.js version is 18+
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run type-check`

**Database Connection Issues**
- Verify `.env` file has correct Supabase credentials
- Check network connectivity to Supabase
- Ensure RLS policies are configured correctly

**Agent Not Updating**
- Check browser console for errors
- Verify agent ID is valid UUID format
- Ensure database permissions are correct

For more help, see the [Lovable Troubleshooting Guide](https://docs.lovable.dev/tips-tricks/troubleshooting).

---

## 🗺️ Roadmap

- [ ] Real-time WebSocket updates for live agent monitoring
- [ ] Advanced ML models for predictive failure detection
- [ ] Multi-tenant support with organization management
- [ ] Custom alert channels (Slack, PagerDuty, etc.)
- [ ] Agent marketplace for pre-built configurations
- [ ] API endpoints for third-party integrations
- [ ] Mobile app for on-the-go monitoring
- [ ] Advanced cost tracking and optimization

---

## 📄 License

This project is built with [Lovable](https://lovable.dev) and is available for demonstration and educational purposes.

---

## 🙏 Acknowledgments

- **Lovable** - For the amazing development platform
- **Supabase** - For the backend infrastructure
- **shadcn/ui** - For the beautiful component library
- **Tailwind CSS** - For the utility-first styling system
- **Relevance AI** - For agent integration capabilities

---

## 📞 Support & Contact

- **Documentation**: [docs.lovable.dev](https://docs.lovable.dev)
- **Community**: [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- **Project URL**: [SuperAI on Lovable](https://lovable.dev/projects/04eff7ca-5d0a-44e2-a56c-87c40a1a6c69)

---

<div align="center">

**Built with ❤️ using [Lovable](https://lovable.dev)**

[⬆ Back to Top](#superai---the-ai-that-supervises-ai)

</div>
