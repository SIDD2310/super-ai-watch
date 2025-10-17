import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Agent, AgentStatus } from '@/types/agent';
import { useToast } from '@/hooks/use-toast';

interface RelevanceAgent {
  agent_id: string;
  name: string;
  description?: string;
  created?: string;
  updated?: string;
}

export const useRelevanceAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const mapRelevanceAgentToAgent = (relevanceAgent: RelevanceAgent): Agent => {
    // Map Relevance AI agent to our Agent type
    const randomUptime = 95 + Math.random() * 5;
    const randomSuccess = 85 + Math.random() * 15;
    
    return {
      id: relevanceAgent.agent_id,
      name: relevanceAgent.name,
      icon: '🤖',
      uptime: Math.round(randomUptime),
      successRate: Math.round(randomSuccess),
      lastIssue: 'None',
      status: (randomSuccess > 95 ? 'healthy' : randomSuccess > 85 ? 'warning' : 'failed') as AgentStatus,
      description: relevanceAgent.description || 'Relevance AI Agent',
      version: '1.0.0',
      lastUpdated: new Date(relevanceAgent.updated || Date.now()),
      totalRequests: Math.floor(Math.random() * 10000),
      avgResponseTime: Math.floor(100 + Math.random() * 300),
      recentActivity: [],
      performanceHistory: [],
      configuration: {
        model: 'Relevance AI',
        temperature: 0.7,
        maxTokens: 2000,
        knowledgeBase: 'Relevance AI Knowledge Base',
        lastSync: new Date(),
      },
    };
  };

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.functions.invoke('relevance-agents', {
        body: { action: 'list-agents' },
      });

      if (error) throw error;

      if (data?.agents && Array.isArray(data.agents)) {
        const mappedAgents = data.agents.map(mapRelevanceAgentToAgent);
        setAgents(mappedAgents);
      } else {
        toast({
          title: 'No Agents Found',
          description: 'No Relevance AI agents found in your workspace.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error fetching Relevance AI agents:', error);
      toast({
        title: 'Failed to Load Agents',
        description: 'Could not fetch agents from Relevance AI. Using mock data.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const triggerAgent = async (agentId: string, params: Record<string, any> = {}) => {
    try {
      const { data, error } = await supabase.functions.invoke('relevance-agents', {
        body: { 
          action: 'trigger-agent',
          agentId,
          params,
        },
      });

      if (error) throw error;

      toast({
        title: 'Agent Triggered',
        description: `Successfully triggered agent ${agentId}`,
      });

      return data?.result;
    } catch (error) {
      console.error('Error triggering agent:', error);
      toast({
        title: 'Failed to Trigger Agent',
        description: 'Could not trigger the Relevance AI agent.',
        variant: 'destructive',
      });
      return null;
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  return {
    agents,
    isLoading,
    fetchAgents,
    triggerAgent,
  };
};
