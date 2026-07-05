# Context Management

How this app maintains conversation context efficiently.

## The problem

OpenAI has **no server-side memory**. Every API call must include the full conversation the model should see. Naively sending everything causes:

- High token cost (~450 tokens of persona re-sent every turn)
- Quadratic growth in long chats
- Slower responses

## Our approach

Implemented in `lib/buildMessages.js`:

```javascript
buildMessages(personaConfig, chatHistory, {
  maxRecentPairs: 6,           // sliding window
  dropFewShotsAfterTurn1: true // token savings
})
```

### Message assembly

```
Turn 1:
  [ system ] + [ few-shots ] + [ user message ]

Turn 2+:
  [ system ] + [ last 6 user/assistant pairs ]
```

Few-shot examples are **only included on the first user turn**. After that, the persona is maintained by the system prompt + live chat history.

### Sliding window

After turn 1, only the **last 6 message pairs** (12 messages) are kept. Older messages are dropped from the API request but remain visible in the UI until the user starts a new chat.

This prevents unbounded token growth in long sessions.

## Client vs server state

| Layer | What it stores |
|-------|----------------|
| **Browser (React state)** | Full chat history for display |
| **API request** | Trimmed history via `buildMessages()` |
| **Server** | Nothing persisted — stateless between requests |

Each `POST /api/chat` is independent. The client sends `{ persona, messages }` and the server builds the optimal context window.

## Persona switching

When the user switches Hitesh ↔ Piyush:

- Chat history is **cleared** on the client
- Next API call starts fresh with the new persona's system + few-shots
- Prevents cross-persona context bleed

## Token estimates

| Scenario | Approx. input tokens |
|----------|------------------------|
| Turn 1 (with few-shots) | ~450–470 |
| Turn 2+ (system only) | ~280–350 |
| Turn 10 (with sliding window) | ~350–450 (capped) |

Output capped at **70 tokens** per reply via `max_completion_tokens`.

## API flow

```
Client                    Server                     OpenAI
  │                         │                          │
  │ POST /api/chat          │                          │
  │ { persona, messages }   │                          │
  │────────────────────────>│                          │
  │                         │ loadPrompt(persona)      │
  │                         │ buildMessages(...)       │
  │                         │─────────────────────────>│
  │                         │<─────────────────────────│
  │ { reply, usage }        │                          │
  │<────────────────────────│                          │
```

## Future improvements

- Summarize old messages instead of dropping them
- Persist chat history to localStorage
- Stream responses token-by-token
- Log token usage in UI for debugging

## Code references

- `lib/buildMessages.js` — context assembly logic
- `lib/chat.js` — OpenAI integration
- `app/api/chat/route.js` — API endpoint
- `components/ChatInterface.jsx` — client state + persona switch
