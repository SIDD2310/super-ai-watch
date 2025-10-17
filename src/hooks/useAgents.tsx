import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Agent, ActivityLog, PerformanceData, AgentConfig } from '@/types/agent';
import { useToast } from '@/hooks/use-toast';

export const useAgents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform database data to Agent type
      const transformedAgents: Agent[] = (data || []).map((dbAgent) => {
        // Generate mock performance history for the last 24 hours
        const performanceHistory: PerformanceData[] = Array.from({ length: 24 }, (_, i) => ({
          timestamp: new Date(Date.now() - (23 - i) * 60 * 60 * 1000),
          successRate: dbAgent.success_rate 
            ? Number(dbAgent.success_rate) + (Math.random() * 4 - 2)
            : 95 + (Math.random() * 5),
          responseTime: dbAgent.avg_response_time || 120 + Math.floor(Math.random() * 40),
          requests: Math.floor(Math.random() * 300) + 100,
        }));

        // Generate mock recent activity
        const recentActivity: ActivityLog[] = [
          {
            timestamp: new Date(Date.now() - 5 * 60 * 1000),
            action: 'Health Check',
            status: 'success',
            details: 'All systems operational',
          },
          {
            timestamp: new Date(Date.now() - 15 * 60 * 1000),
            action: 'Data Sync',
            status: 'success',
            details: 'Knowledge base synchronized',
          },
        ];

        return {
          id: dbAgent.id,
          name: dbAgent.name,
          icon: dbAgent.icon || '🤖',
          uptime: dbAgent.uptime || 0,
          successRate: dbAgent.success_rate || 0,
          lastIssue: dbAgent.last_issue || '-',
          status: (dbAgent.status as 'healthy' | 'warning' | 'failed') || 'healthy',
          description: dbAgent.description,
          version: dbAgent.version || '1.0.0',
          lastUpdated: new Date(dbAgent.updated_at),
          totalRequests: dbAgent.total_requests || 0,
          avgResponseTime: dbAgent.avg_response_time || 0,
          recentActivity,
          performanceHistory,
          configuration: {
            model: dbAgent.model || '',
            temperature: 0.7,
            maxTokens: 2048,
            knowledgeBase: dbAgent.data_source || '',
            lastSync: new Date(),
          },
        };
      });

      setAgents(transformedAgents);
    } catch (error: any) {
      console.error('Error fetching agents:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch agents',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createAgent = async (agentData: {
    name: string;
    description: string;
    category?: string;
    model?: string;
    data_source?: string;
    response_style?: string;
    goal_metric?: string;
    self_monitoring?: boolean;
    alert_sensitivity?: string;
    owner?: string;
    fix_permissions?: string;
    icon?: string;
  }) => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .insert([
          {
            name: agentData.name,
            description: agentData.description,
            category: agentData.category,
            model: agentData.model,
            data_source: agentData.data_source,
            response_style: agentData.response_style,
            goal_metric: agentData.goal_metric,
            self_monitoring: agentData.self_monitoring ?? true,
            alert_sensitivity: agentData.alert_sensitivity || 'medium',
            owner: agentData.owner,
            fix_permissions: agentData.fix_permissions || 'review',
            icon: agentData.icon || '🤖',
            status: 'healthy',
            uptime: 100,
            success_rate: null, // Unknown until tested
            configuration: {
              model: agentData.model || '',
              temperature: 0.7,
              maxTokens: 2048,
              knowledgeBase: agentData.data_source || '',
              lastSync: new Date().toISOString(),
            },
          },
        ])
        .select()
        .single();

      if (error) throw error;

      toast({
        title: '✅ Agent Created',
        description: `${agentData.name} has been successfully created and is being monitored.`,
      });

      // Refresh agents list
      await fetchAgents();

      return data;
    } catch (error: any) {
      console.error('Error creating agent:', error);
      toast({
        title: 'Error',
        description: 'Failed to create agent',
        variant: 'destructive',
      });
      throw error;
    }
  };

  const updateAgent = async (id: string, updates: Partial<Agent>) => {
    try {
      const { error } = await supabase
        .from('agents')
        .update({
          status: updates.status,
          success_rate: updates.successRate,
          last_issue: updates.lastIssue,
          uptime: updates.uptime,
        })
        .eq('id', id);

      if (error) throw error;

      // Refresh agents list
      await fetchAgents();
    } catch (error: any) {
      console.error('Error updating agent:', error);
      toast({
        title: 'Error',
        description: 'Failed to update agent',
        variant: 'destructive',
      });
    }
  };

  const deleteAgent = async (id: string) => {
    try {
      const { error } = await supabase.from('agents').delete().eq('id', id);

      if (error) throw error;

      toast({
        title: '🗑️ Agent Deleted',
        description: 'Agent has been removed from monitoring.',
      });

      // Refresh agents list
      await fetchAgents();
    } catch (error: any) {
      console.error('Error deleting agent:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete agent',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchAgents();

    // Set up realtime subscription
    const channel = supabase
      .channel('agents-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'agents',
        },
        () => {
          fetchAgents();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    agents,
    isLoading,
    fetchAgents,
    createAgent,
    updateAgent,
    deleteAgent,
  };
};
