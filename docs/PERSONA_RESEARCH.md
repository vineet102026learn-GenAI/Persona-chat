# Persona Research

How we studied Hitesh Choudhary and Piyush Garg to build authentic AI personas.

## Sources

### Hitesh Choudhary

| Source | URL | What we learned |
|--------|-----|-----------------|
| Official site | https://hitesh.ai/ | Focus on building, community, practical tech education |
| YouTube channel | Hitesh Choudhary — programming & AI content | Hinglish delivery, anti-hype tone, "build something" mantra |
| Public talks & posts | Social media, course previews | Phrases like "hill n relax", VPS/infra pragmatism, older-brother mentor vibe |

### Piyush Garg

| Source | URL | What we learned |
|--------|-----|-----------------|
| Official site | https://www.piyushgarg.dev/ | System design educator, production-first mindset |
| YouTube channel | System design & backend tutorials | Technical vocabulary (latency, throughput), "Imagine this..." teaching |
| Public content | Courses, LinkedIn, talks | Monolith-first advice, senior engineer peer tone, actionable paths |

## Style traits captured

### Hitesh Choudhary

| Trait | Real-world signal | Encoded in prompt |
|-------|-------------------|-------------------|
| Hinglish mentor | Mixes Hindi phrases naturally | Vocabulary rules: "bhai", "Simple h ji", "hill n relax" |
| Anti-hype | Calls out theoretical talk vs building | Mindset: build products, ignore naysayers |
| Infra pragmatism | Cheap VPS over fancy cloud bills | Few-shot: AI tools → build your own agent on VPS |
| Older brother tone | Direct, no sugarcoating | Tone rules + short WhatsApp-style replies |

### Piyush Garg

| Trait | Real-world signal | Encoded in prompt |
|-------|-------------------|-------------------|
| Production engineer | Talks about real deployment decisions | "Production-grade", ownership, shipping features |
| System design language | Latency, bottlenecks, scale | Technical vocabulary in system prompt |
| Monolith-first | Advises against early microservices | Few-shot: "Monolith se start karo" |
| Peer mentor | Confident senior engineer, not lecturer | Energetic tone, one actionable path |

## Key differences between personas

| Dimension | Hitesh | Piyush |
|-----------|--------|--------|
| Energy | Grounded older brother | High-energy senior engineer |
| Focus | Building, community, infra cost | Architecture, production, ownership |
| Teaching | Logic & pseudo-code over syntax | Why + what I'd do in production |
| Signature phrases | hill n relax, lollipop dete h | Simple h ji, Imagine this... |
| Advice style | Visionary + practical nudge | One clear recommendation |

## Data preparation

We did **not** scrape or fine-tune on private data. Personas are built via:

1. **Manual review** of public websites, videos, and social posts
2. **Trait extraction** — tone, vocabulary, teaching patterns
3. **Prompt encoding** — system rules + curated few-shot examples
4. **Iteration** — tested replies, shortened outputs, removed repetition

This follows the assignment requirement to use publicly available content for tone recreation.
