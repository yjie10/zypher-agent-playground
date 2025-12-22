import { readLines } from 'https://deno.land/std@0.224.0/io/read_lines.ts';
import { eachValueFrom } from 'rxjs-for-await';

import { agent } from './agent.ts';
import { collectTextFromEvents } from './collectTextFromEvents.ts';

console.log(
  "🌟 Welcome to zypher-agent-playground! To get started, enter your prompt below. Type 'exit' to quit."
);

for await (const line of readLines(Deno.stdin)) {
  const input = line.trim();
  if (input.toLowerCase() === 'exit') {
    console.log('👋 See you next time!');
    break;
  }

  const event$ = agent.runTask(input, 'gpt-4o-mini');

  const output = await collectTextFromEvents(eachValueFrom(event$));

  console.log('\n📝 Result:\n');
  console.log(output);
  console.log('\n------------------------------\n');
}
