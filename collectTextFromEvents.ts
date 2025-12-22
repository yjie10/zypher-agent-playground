export async function collectTextFromEvents(
  events: AsyncIterable<{ type: string; content?: string }>
): Promise<string> {
  let result = '';

  for await (const event of events) {
    if (event.type === 'text' && event.content) {
      result += event.content;
    }
    if (event.type === 'completed') {
      break;
    }
  }

  return result.trim();
}
