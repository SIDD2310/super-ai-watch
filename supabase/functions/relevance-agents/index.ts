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
    const RELEVANCE_AUTH_TOKEN = Deno.env.get('RELEVANCE_AI_AUTH_TOKEN');
    const REGION = 'f1db6c';
    const PROJECT_ID = '3c82701f-db14-499e-a72e-b9be9178ab18';

    if (!RELEVANCE_AUTH_TOKEN) {
      throw new Error('RELEVANCE_AI_AUTH_TOKEN is not configured');
    }

    const { action } = await req.json();

    // List agents - Unfortunately Relevance AI REST API doesn't have a list endpoint
    // We'll return empty array and suggest using the Python SDK or manually providing agent IDs
    if (action === 'list-agents') {
      console.log('Note: Relevance AI REST API does not support listing agents');
      console.log('You need to use the Python SDK or manually provide agent IDs');
      
      return new Response(JSON.stringify({ 
        agents: [],
        message: 'Relevance AI REST API does not support listing agents. Please use the Python SDK or provide agent IDs manually.'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Trigger an agent
    if (action === 'trigger-agent') {
      const { agentId, params } = await req.json();
      
      const response = await fetch(`https://api-${REGION}.stack.tryrelevance.com/latest/agents/trigger`, {
        method: 'POST',
        headers: {
          'Authorization': RELEVANCE_AUTH_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            role: 'user',
            content: params?.message || 'Hello',
          },
          agent_id: agentId,
          project: PROJECT_ID,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Relevance AI trigger error:', response.status, errorText);
        throw new Error(`Relevance AI trigger error: ${response.status}`);
      }

      const result = await response.json();
      
      return new Response(JSON.stringify({ result }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get agent conversation history
    if (action === 'agent-history') {
      const { conversationId } = await req.json();
      
      const response = await fetch(`https://api-${REGION}.stack.tryrelevance.com/latest/conversations/${conversationId}`, {
        method: 'GET',
        headers: {
          'Authorization': RELEVANCE_AUTH_TOKEN,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Relevance AI history error:', response.status, errorText);
        throw new Error(`Relevance AI history error: ${response.status}`);
      }

      const conversations = await response.json();
      
      return new Response(JSON.stringify({ conversations }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    throw new Error('Invalid action');

  } catch (error) {
    console.error('Error in relevance-agents function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
