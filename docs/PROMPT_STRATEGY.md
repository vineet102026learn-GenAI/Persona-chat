# Prompt Engineering Strategy

## Overview

Each persona is defined in `prompts/{persona}.json` with three layers:

```
┌─────────────────────────────────┐
│  1. System prompt               │  Role, rules, output constraints
├─────────────────────────────────┤
│  2. Few-shot examples           │  Style anchoring (user/assistant pairs)
├─────────────────────────────────┤
│  3. Live chat history           │  Runtime user/assistant messages
└─────────────────────────────────┘
```

## System prompt structure

Both personas use the same skeleton:

1. **Role** — who the AI is
2. **Rules & Personality** — tone, vocabulary, teaching style
3. **Chatbot Output (strict)** — length and format constraints that override everything

Strict output rules prevent essay-length replies:

- Max 2–3 short lines (~30–50 words)
- WhatsApp chat energy, not blog posts
- No markdown headers or numbered lists
- Never repeat sentences

## Few-shot prompting

Few-shot examples teach the model *how* to respond, not just *what* to say.

| Persona | Examples | Purpose |
|---------|----------|---------|
| Hitesh | AI tools tracking, AI trend, job fear | Hinglish mentor, build-first mindset |
| Piyush | Junior dev, Monolith vs Microservices, AI jobs, future-ready | Production advice, technical clarity |

Examples are kept **short** (2–3 lines) so the model mimics brevity, not length.

## Model parameters

| Parameter | Value | Why |
|-----------|-------|-----|
| `model` | gpt-5.4-nano | Fast, cost-effective for chat |
| `temperature` | 0.6 | Consistent persona, some natural variation |
| `max_tokens` | 70 | Hard cap on reply length |
| `frequency_penalty` | 0.5 | Reduces repeated phrases in chat |

## Iterations we tried

| Version | Problem | Fix |
|---------|---------|-----|
| v1 | Long essay replies with ## headers | Added strict 2–3 line output rules |
| v2 | Literal "Why:" labels in every reply | Removed "Start with Why" phrasing |
| v3 | Repeated sentences at end of replies | Added `frequency_penalty: 0.5` |
| v4 | Cut-off mid-sentence | Tuned `max_tokens` to 70 (was 60) |
| v5 | Both personas sounded similar | Distinct few-shots + vocabulary lists |

## Persona-specific rules

**Hitesh only:**
- Phrases: hill n relax, lollipop dete h, try kro
- Focus: VPS, building, community, pseudo-code over syntax

**Piyush only:**
- Ban words: "trade-off", "trade off"
- Focus: production ownership, monolith-first, latency/throughput language
- No "Why:" or "What to do next:" section labels

## Why prompt JSON files?

- **Maintainable** — edit persona without touching code
- **Testable** — same prompts used in CLI playground and web app
- **Versionable** — track prompt changes in git

## Files

- `prompts/hitesh.json` — Hitesh Choudhary persona
- `prompts/piyush.json` — Piyush Garg persona
- `lib/buildMessages.js` — assembles layers at runtime
- `lib/chat.js` — sends to OpenAI
