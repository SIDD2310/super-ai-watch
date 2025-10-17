import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Agent } from '@/types/agent';
import { useToast } from '@/hooks/use-toast';

interface DiagnosisResult {
  analysis: string;
  timestamp: string;
  model: string;
  analysisType: string;
}

export const useAISupervisor = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const diagnoseIssue = async (agent: Agent, incident: any): Promise<DiagnosisResult | null> => {
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('supervisor-diagnose', {
        body: {
          agentData: {
            name: agent.name,
            successRate: agent.successRate,
            latency: agent.avgResponseTime,
            lastIssue: agent.lastIssue,
            lastUpdated: agent.lastUpdated,
          },
          incidentData: {
            agentName: agent.name,
            status: agent.status,
            error: incident?.error || 'Performance degradation detected',
            description: incident?.description,
            rootCause: incident?.rootCause,
          },
          analysisType: 'diagnose',
        },
      });

      if (error) throw error;

      return data as DiagnosisResult;
    } catch (error) {
      console.error('Diagnosis error:', error);
      toast({
        title: 'Analysis Failed',
        description: 'Could not complete AI diagnosis. Using fallback diagnostics.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const suggestFix = async (agent: Agent, incident: any): Promise<DiagnosisResult | null> => {
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('supervisor-diagnose', {
        body: {
          agentData: {
            name: agent.name,
            successRate: agent.successRate,
          },
          incidentData: {
            agentName: agent.name,
            description: incident?.description || 'Performance issue',
            rootCause: incident?.rootCause,
          },
          analysisType: 'suggest-fix',
        },
      });

      if (error) throw error;

      return data as DiagnosisResult;
    } catch (error) {
      console.error('Fix suggestion error:', error);
      toast({
        title: 'Fix Generation Failed',
        description: 'Could not generate automated fix. Manual intervention may be required.',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const performHealthCheck = async (agent: Agent): Promise<DiagnosisResult | null> => {
    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('supervisor-diagnose', {
        body: {
          agentData: {
            name: agent.name,
            successRate: agent.successRate,
            latency: agent.avgResponseTime,
            totalRequests: agent.totalRequests,
            lastUpdated: agent.lastUpdated,
          },
          analysisType: 'health-check',
        },
      });

      if (error) throw error;

      return data as DiagnosisResult;
    } catch (error) {
      console.error('Health check error:', error);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    diagnoseIssue,
    suggestFix,
    performHealthCheck,
    isAnalyzing,
  };
};
