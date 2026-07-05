import OpenAI from 'openai';
import { buildMessages } from './buildMessages.js';
import { loadPrompt } from './loadPrompt.js';

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

function buildRequestOptions(prompt) {
  return {
    model: prompt.model ?? 'gpt-5.4-nano',
    temperature: prompt.temperature ?? 0.7,
    ...(prompt.max_tokens != null && {
      max_completion_tokens: prompt.max_tokens,
    }),
    ...(prompt.frequency_penalty != null && {
      frequency_penalty: prompt.frequency_penalty,
    }),
    ...(prompt.presence_penalty != null && {
      presence_penalty: prompt.presence_penalty,
    }),
  };
}

export async function createChatCompletion(persona, chatHistory) {
  const prompt = await loadPrompt(persona);
  const messages = buildMessages(prompt, chatHistory);

  const completion = await getOpenAI().chat.completions.create({
    ...buildRequestOptions(prompt),
    messages,
  });

  const reply = completion.choices[0]?.message?.content ?? '';
  const usage = completion.usage;

  return { reply, usage, messageCount: messages.length };
}
