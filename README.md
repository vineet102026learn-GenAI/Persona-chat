# Persona Chat

AI-powered website that simulates conversations with **Hitesh Choudhary** or **Piyush Garg** using OpenAI. Each persona responds in a distinct mentoring style—Hinglish, practical advice, and short WhatsApp-style replies.

## Live demo

> Add your Vercel URL here after deployment: `https://your-app.vercel.app`

## Features

- Switch between **Hitesh Choudhary** and **Piyush Garg** personas
- Multi-turn chat with context management
- Few-shot prompt engineering per persona
- Token-efficient context (few-shots dropped after turn 1, sliding window)
- API key kept server-side only

## Tech stack

- **Next.js** (App Router) — frontend + API routes
- **OpenAI API** — LLM responses
- **Tailwind CSS** — UI styling
- **Vercel** — deployment (free Hobby tier)

## Setup

### Prerequisites

- Node.js 18+
- OpenAI API key ([platform.openai.com](https://platform.openai.com))

### Install & run locally

```bash
git clone <your-repo-url>
cd persona-chat
npm install
cp .env.example .env.local
```

Add your API key to `.env.local`:

```
OPENAI_API_KEY=sk-...
```

Start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Usage

1. Pick **Hitesh** or **Piyush** at the top
2. Type a question and press **Send**
3. Switch persona anytime — chat history resets
4. Click **New chat** to start fresh with the same persona

## Project structure

```
persona-chat/
├── app/
│   ├── api/chat/route.js   # Backend — OpenAI integration
│   ├── page.js             # Chat page
│   └── layout.js
├── components/
│   ├── ChatInterface.jsx   # Main chat UI
│   └── PersonaToggle.jsx   # Hitesh / Piyush switcher
├── lib/
│   ├── loadPrompt.js       # Load persona JSON
│   ├── buildMessages.js    # Context management
│   └── chat.js             # OpenAI call
├── prompts/
│   ├── hitesh.json         # Hitesh persona prompt
│   └── piyush.json         # Piyush persona prompt
└── docs/                   # Assignment documentation
```

## Deploy to Vercel (free)

1. Push this repo to **public GitHub**
2. Go to [vercel.com](https://vercel.com) → Import project
3. Add environment variable: `OPENAI_API_KEY`
4. Deploy — you get a live URL

No payment required for Vercel Hobby plan (personal projects).

## Documentation

| File | Description |
|------|-------------|
| [docs/PERSONA_RESEARCH.md](docs/PERSONA_RESEARCH.md) | How persona data was collected |
| [docs/PROMPT_STRATEGY.md](docs/PROMPT_STRATEGY.md) | Prompt engineering approach |
| [docs/CONTEXT_MANAGEMENT.md](docs/CONTEXT_MANAGEMENT.md) | How chat context is managed |
| [docs/SAMPLE_CONVERSATIONS.md](docs/SAMPLE_CONVERSATIONS.md) | Example chats for both personas |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | ESLint |

## License

MIT
