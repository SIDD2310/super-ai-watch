-- Create agents table
CREATE TABLE public.agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT DEFAULT '🤖',
  status TEXT CHECK (status IN ('healthy', 'warning', 'failed')) DEFAULT 'healthy',
  uptime NUMERIC DEFAULT 0,
  success_rate NUMERIC DEFAULT 0,
  last_issue TEXT DEFAULT '-',
  description TEXT NOT NULL,
  version TEXT DEFAULT '1.0.0',
  total_requests INTEGER DEFAULT 0,
  avg_response_time INTEGER DEFAULT 0,
  configuration JSONB DEFAULT '{}'::jsonb,
  category TEXT,
  model TEXT,
  data_source TEXT,
  response_style TEXT,
  goal_metric TEXT,
  self_monitoring BOOLEAN DEFAULT true,
  alert_sensitivity TEXT DEFAULT 'medium',
  owner TEXT,
  fix_permissions TEXT DEFAULT 'review',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create incidents table
CREATE TABLE public.incidents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
  agent_name TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high')) DEFAULT 'medium',
  title TEXT NOT NULL,
  description TEXT,
  root_cause TEXT,
  impact TEXT,
  confidence NUMERIC DEFAULT 0,
  proposed_fix JSONB DEFAULT '{}'::jsonb,
  logs JSONB DEFAULT '[]'::jsonb,
  detected_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  status TEXT CHECK (status IN ('open', 'in_progress', 'resolved')) DEFAULT 'open'
);

-- Create activity logs table
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  status TEXT CHECK (status IN ('success', 'warning', 'error')) DEFAULT 'success',
  details TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Create performance data table
CREATE TABLE public.performance_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID REFERENCES public.agents(id) ON DELETE CASCADE,
  success_rate NUMERIC DEFAULT 0,
  response_time INTEGER DEFAULT 0,
  requests INTEGER DEFAULT 0,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_data ENABLE ROW LEVEL SECURITY;

-- Create policies for agents (public read, no auth required for demo)
CREATE POLICY "Agents are viewable by everyone"
ON public.agents FOR SELECT
USING (true);

CREATE POLICY "Agents can be inserted by everyone"
ON public.agents FOR INSERT
WITH CHECK (true);

CREATE POLICY "Agents can be updated by everyone"
ON public.agents FOR UPDATE
USING (true);

CREATE POLICY "Agents can be deleted by everyone"
ON public.agents FOR DELETE
USING (true);

-- Create policies for incidents
CREATE POLICY "Incidents are viewable by everyone"
ON public.incidents FOR SELECT
USING (true);

CREATE POLICY "Incidents can be inserted by everyone"
ON public.incidents FOR INSERT
WITH CHECK (true);

CREATE POLICY "Incidents can be updated by everyone"
ON public.incidents FOR UPDATE
USING (true);

-- Create policies for activity logs
CREATE POLICY "Activity logs are viewable by everyone"
ON public.activity_logs FOR SELECT
USING (true);

CREATE POLICY "Activity logs can be inserted by everyone"
ON public.activity_logs FOR INSERT
WITH CHECK (true);

-- Create policies for performance data
CREATE POLICY "Performance data is viewable by everyone"
ON public.performance_data FOR SELECT
USING (true);

CREATE POLICY "Performance data can be inserted by everyone"
ON public.performance_data FOR INSERT
WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for agents table
CREATE TRIGGER update_agents_updated_at
BEFORE UPDATE ON public.agents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_agents_status ON public.agents(status);
CREATE INDEX idx_agents_created_at ON public.agents(created_at);
CREATE INDEX idx_incidents_agent_id ON public.incidents(agent_id);
CREATE INDEX idx_incidents_status ON public.incidents(status);
CREATE INDEX idx_incidents_detected_at ON public.incidents(detected_at);
CREATE INDEX idx_activity_logs_agent_id ON public.activity_logs(agent_id);
CREATE INDEX idx_activity_logs_timestamp ON public.activity_logs(timestamp);
CREATE INDEX idx_performance_data_agent_id ON public.performance_data(agent_id);
CREATE INDEX idx_performance_data_timestamp ON public.performance_data(timestamp);