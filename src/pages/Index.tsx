import { useState, useEffect } from 'react';
import { AgentCard } from '@/components/AgentCard';
import { AgentDetailsModal } from '@/components/AgentDetailsModal';
import { IncidentModal } from '@/components/IncidentModal';
import { SelfHealingModal } from '@/components/SelfHealingModal';
import { SystemHealthBar } from '@/components/SystemHealthBar';
import { SupervisorFeed } from '@/components/SupervisorFeed';
import { SupervisorSummary } from '@/components/SupervisorSummary';
import { allAgents as mockAgents, supervisorFeed, allIncidents } from '@/data/extendedMockData';
import { Agent } from '@/types/agent';
import { useToast } from '@/hooks/use-toast';
import { useRelevanceAgents } from '@/hooks/useRelevanceAgents';
import { useAgents } from '@/hooks/useAgents';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { agents: relevanceAgents, isLoading: relevanceLoading } = useRelevanceAgents();
  const { agents: dbAgents, isLoading: dbLoading, updateAgent } = useAgents();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<typeof allIncidents[0] | null>(null);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [showHealingModal, setShowHealingModal] = useState(false);
  const { toast } = useToast();

  const isLoading = relevanceLoading || dbLoading;

  // Merge database agents with mock agents, prioritizing database agents
  useEffect(() => {
    const mergedAgents: Agent[] = [];
    const seenIds = new Set<string>();

    // Add database agents first
    dbAgents.forEach(agent => {
      mergedAgents.push(agent);
      seenIds.add(agent.id);
    });

    // Add Relevance AI agents if not already in database
    relevanceAgents.forEach(agent => {
      if (!seenIds.has(agent.id)) {
        mergedAgents.push(agent);
        seenIds.add(agent.id);
      }
    });

    // Add mock agents if not already in database or Relevance
    mockAgents.forEach(agent => {
      if (!seenIds.has(agent.id)) {
        mergedAgents.push(agent);
      }
    });

    setAgents(mergedAgents);
  }, [dbAgents, relevanceAgents]);

  // Show incident modal only once per session
  useEffect(() => {
    const hasSeenIncident = sessionStorage.getItem('hasSeenIncidentModal');
    
    if (!hasSeenIncident) {
      const timer = setTimeout(() => {
        setSelectedIncident(allIncidents[0]);
        setShowIncidentModal(true);
        sessionStorage.setItem('hasSeenIncidentModal', 'true');
        toast({
          title: '🚨 Incident Detected',
          description: 'Chat Agent showing degraded performance.',
          variant: 'destructive',
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowDetailsModal(true);
  };

  const handleViewIncident = () => {
    setShowDetailsModal(false);
    setSelectedIncident(allIncidents[0]);
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

  const handleHealingComplete = async () => {
    setShowHealingModal(false);
    
    // Find the chat agent and update in database
    const chatAgent = agents.find(a => a.name.toLowerCase().includes('chat'));
    if (chatAgent) {
      await updateAgent(chatAgent.id, {
        status: 'healthy',
        successRate: 97,
        lastIssue: '-',
        uptime: 99.8,
      });
    }
    
    toast({
      title: '🎉 System Restored',
      description: 'Chat Agent is now operating at optimal performance.',
    });
  };


  const activeAgents = agents.filter(a => a.status !== 'failed').length;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-6 py-8">
        <SystemHealthBar
          uptime={99.4}
          activeAgents={activeAgents}
          totalAgents={agents.length}
          ongoingIncidents={agents.filter(a => a.status === 'failed').length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Agent Health Grid
              {isLoading && <span className="text-sm text-muted-foreground ml-2">(Loading Relevance AI agents...)</span>}
            </h2>
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agents.slice(0, 6).map(agent => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onClick={() => handleAgentClick(agent)}
                    hasAlert={agent.status === 'failed'}
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <SupervisorSummary
              monitoringCount={agents.length}
              resolvedToday={3}
              pendingApprovals={agents.filter(a => a.status === 'failed').length}
              healthScore={8.7}
              autonomyMode="Semi-Autonomous"
              totalRequests={agents.reduce((sum, a) => sum + (a.totalRequests || 0), 0)}
              avgResponseTime={
                agents.length > 0
                  ? Math.round(
                      agents.reduce((sum, a) => sum + (a.avgResponseTime || 0), 0) / agents.length
                    )
                  : 0
              }
            />
          </div>
        </div>

        <SupervisorFeed activities={supervisorFeed} />
      </main>

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
        agentName={allIncidents[0]?.agentName || 'Agent'}
      />
    </div>
  );
};

export default Index;
