import { useState, useEffect } from 'react';
import { AgentCard } from '@/components/AgentCard';
import { AgentDetailsModal } from '@/components/AgentDetailsModal';
import { IncidentModal } from '@/components/IncidentModal';
import { SelfHealingModal } from '@/components/SelfHealingModal';
import { SystemHealthBar } from '@/components/SystemHealthBar';
import { SupervisorFeed } from '@/components/SupervisorFeed';
import { SupervisorSummary } from '@/components/SupervisorSummary';
import { allAgents, supervisorFeed, allIncidents } from '@/data/extendedMockData';
import { Agent } from '@/types/agent';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [agents, setAgents] = useState(allAgents);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<typeof allIncidents[0] | null>(null);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [showHealingModal, setShowHealingModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedIncident(allIncidents[0]);
      setShowIncidentModal(true);
      toast({
        title: '🚨 Incident Detected',
        description: 'Chat Agent showing degraded performance.',
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
            <h2 className="text-xl font-semibold text-foreground mb-4">Agent Health Grid</h2>
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
          </div>

          <div>
            <SupervisorSummary
              monitoringCount={agents.length}
              resolvedToday={3}
              pendingApprovals={1}
              healthScore={8.7}
              autonomyMode="Semi-Autonomous"
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
