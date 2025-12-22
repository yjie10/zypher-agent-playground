import {
  OpenAIModelProvider,
  createZypherContext,
  ZypherAgent,
} from '@zypher/agent';

// Helper function to safely get environment variables
function getRequiredEnv(name: string): string {
  const value = Deno.env.get(name);
  if (!value) {
    throw new Error(`Environment variable ${name} is not set`);
  }
  return value;
}

// Initialize the agent execution context
const zypherContext = await createZypherContext(Deno.cwd());

// Create the agent with preferred LLM provider
export const agent = new ZypherAgent(
  zypherContext,
  new OpenAIModelProvider({
    apiKey: getRequiredEnv('OPENAI_API_KEY'),
    reasoningEffort: 'low',
  })
);
