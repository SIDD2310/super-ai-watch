import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { agentData, incidentData, analysisType = 'diagnose' } = await req.json();
    
    const grokApiKey = Deno.env.get('Grok_api_key');
    if (!grokApiKey) {
      throw new Error('Grok API key not configured');
    }

    // Build context for Grok based on the data
    let userPrompt = '';
    
    if (analysisType === 'diagnose' && incidentData) {
      userPrompt = `Analyze this AI agent incident and provide root-cause diagnosis:

Agent: ${incidentData.agentName}
Status: ${incidentData.status}
Error: ${incidentData.error}
Metrics: Success Rate ${agentData?.successRate}%, Latency ${agentData?.latency}ms
Last Issue: ${agentData?.lastIssue}

Provide:
1. Root cause analysis (2-3 sentences)
2. Specific fix recommendation
3. Risk assessment (low/medium/high)
4. Estimated recovery time`;
    } else if (analysisType === 'suggest-fix' && incidentData) {
      userPrompt = `Generate a specific fix for this AI agent issue:

Agent: ${incidentData.agentName}
Problem: ${incidentData.description}
Root Cause: ${incidentData.rootCause || 'Unknown'}

Provide a detailed, actionable fix with:
1. Exact steps to resolve
2. Code/config changes needed
3. Validation approach
4. Rollback plan if fix fails`;
    } else if (analysisType === 'health-check' && agentData) {
      userPrompt = `Analyze this AI agent's health metrics:

Agent: ${agentData.name}
Success Rate: ${agentData.successRate}%
Average Latency: ${agentData.latency}ms
Total Requests: ${agentData.totalRequests || 'N/A'}
Last Updated: ${agentData.lastUpdated}

Identify:
1. Any degradation patterns
2. Performance anomalies
3. Proactive recommendations
4. Priority level (low/medium/high)`;
    }

    console.log('Calling Grok API for analysis:', analysisType);

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${grokApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-2-1212',
        messages: [
          {
            role: 'system',
            content: `You are SuperAI, an expert AI operations supervisor. You monitor AI agents, diagnose issues, and suggest fixes. 
            
Your analysis should be:
- Technical yet clear
- Actionable and specific
- Risk-aware and cautious
- Focused on automated recovery

Always structure your responses clearly with numbered points.`
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Grok API error:', response.status, errorText);
      throw new Error(`Grok API error: ${response.status}`);
    }

    const data = await response.json();
    const analysis = data.choices[0].message.content;

    console.log('Grok analysis complete');

    return new Response(
      JSON.stringify({ 
        analysis,
        timestamp: new Date().toISOString(),
        model: 'grok-2-1212',
        analysisType 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in supervisor-diagnose function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        fallback: 'AI supervisor analysis temporarily unavailable. Using basic diagnostics.'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
