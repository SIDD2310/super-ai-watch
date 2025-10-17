import { useState, useEffect } from 'react';
import { AgentCard } from '@/components/AgentCard';
import { AgentDetailsModal } from '@/components/AgentDetailsModal';
import { IncidentModal } from '@/components/IncidentModal';
import { SelfHealingModal } from '@/components/SelfHealingModal';
import { AnalyticsTab } from '@/components/AnalyticsTab';
import { mockAgents, mockIncident, mockMetrics } from '@/data/mockData';
import { Agent } from '@/types/agent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Activity, BarChart3, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [agents, setAgents] = useState(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<typeof mockIncident | null>(null);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [showHealingModal, setShowHealingModal] = useState(false);
  const { toast } = useToast();

  // Simulate periodic incident detection
  useEffect(() => {
    const timer = setTimeout(() => {
      // Trigger incident after 3 seconds
      setSelectedIncident(mockIncident);
      setShowIncidentModal(true);
      toast({
        title: '🚨 Incident Detected',
        description: 'Chat Agent showing degraded performance. Click to review.',
        variant: 'destructive',
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowDetailsModal(true);
  };

  const handleViewIncident = () => {
    setShowDetailsModal(false);
    setSelectedIncident(mockIncident);
    setShowIncidentModal(true);
  };

  const handleApprovefix = () => {
    setShowIncidentModal(false);
    setShowHealingModal(true);
    toast({
      title: '✅ Fix Approved',
      description: 'Supervisor AI is now executing the self-healing procedure.',
    });
  };

  const handleHealingComplete = () => {
    setShowHealingModal(false);
    // Update agent status to healthy
    setAgents(prev =>
      prev.map(agent =>
        agent.id === 'chat-agent'
          ? { ...agent, status: 'healthy' as const, successRate: 97, lastIssue: '-' }
          : agent
      )
    );
    toast({
      title: '🎉 System Restored',
      description: 'Chat Agent is now operating at optimal performance.',
    });
  };

  const handleReplayIncident = () => {
    setAgents(mockAgents);
    setSelectedIncident(mockIncident);
    setShowIncidentModal(true);
    toast({
      title: '🔄 Replaying Incident',
      description: 'Simulating Chat Agent failure scenario.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-accent animate-pulse-glow" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    SuperAI
                    <span className="text-accent ml-2 text-sm font-normal">Supervisor Dashboard</span>
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Meta-Agent Monitoring & Self-Healing System
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleReplayIncident}
                className="border-accent/30 text-accent hover:bg-accent/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Replay Incident
              </Button>
              <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-glow" />
                <span className="text-sm font-medium text-green-400">System Operational</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <Activity className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 bg-gradient-card rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">Total Agents</div>
                <div className="text-3xl font-bold text-foreground">{agents.length}</div>
              </div>
              <div className="p-6 bg-gradient-card rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">Healthy Agents</div>
                <div className="text-3xl font-bold text-green-400">
                  {agents.filter(a => a.status === 'healthy').length}
                </div>
              </div>
              <div className="p-6 bg-gradient-card rounded-lg border border-border">
                <div className="text-sm text-muted-foreground mb-1">Issues Detected</div>
                <div className="text-3xl font-bold text-destructive">
                  {agents.filter(a => a.status === 'failed').length}
                </div>
              </div>
            </div>

            {/* Agent Cards */}
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">Agent Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map(agent => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onClick={() => handleAgentClick(agent)}
                    hasAlert={agent.status === 'failed' && agent.id === 'chat-agent'}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab metrics={mockMetrics} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Modals */}
      <AgentDetailsModal
        agent={selectedAgent}
        open={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onViewIncident={selectedAgent?.status === 'failed' && selectedAgent?.id === 'chat-agent' ? handleViewIncident : undefined}
      />

      <IncidentModal
        incident={selectedIncident}
        open={showIncidentModal}
        onClose={() => setShowIncidentModal(false)}
        onApprove={handleApprovefix}
      />

      <SelfHealingModal
        open={showHealingModal}
        onClose={handleHealingComplete}
        agentName={mockIncident.agentName}
      />
    </div>
  );
};

export default Index;
