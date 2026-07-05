import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const PROMPTS_DIR = resolve(process.cwd(), 'prompts');

export async function loadPrompt(persona) {
  const path = resolve(PROMPTS_DIR, `${persona}.json`);
  const raw = await readFile(path, 'utf-8');
  return JSON.parse(raw);
}

export const VALID_PERSONAS = ['hitesh', 'piyush'];
