'use client';

import { useEffect, useRef, useState } from 'react';
import PersonaToggle, { PERSONAS } from './PersonaToggle';

function MessageBubble({ message, personaConfig }) {
  const isUser = message.role === 'user';
  const firstName = personaConfig.label.split(' ')[0];

  return (
    <div className={`flex animate-fade-in ${isUser ? 'justify-end' : 'justify-start gap-2.5'}`}>
      {!isUser && (
        <div
          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold mt-1 ${personaConfig.avatar}`}
          aria-hidden
        >
          {firstName[0]}
        </div>
      )}
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-lg ${
          isUser
            ? 'bg-zinc-800 text-zinc-50 border border-zinc-700 rounded-br-md'
            : `${personaConfig.bubble} rounded-bl-md ${personaConfig.glow}`
        }`}
      >
        {!isUser && (
          <p className="text-xs font-semibold mb-1.5 text-zinc-400">
            {firstName}
          </p>
        )}
        {message.content}
      </div>
    </div>
  );
}

export default function ChatInterface() {
  const [persona, setPersona] = useState('hitesh');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const personaConfig = PERSONAS[persona];
  const firstName = personaConfig.label.split(' ')[0];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  function handlePersonaChange(next) {
    if (next === persona) return;
    setPersona(next);
    setMessages([]);
    setError(null);
    setInput('');
  }

  function handleNewChat() {
    setMessages([]);
    setError(null);
    setInput('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { role: 'user', content: text };
    const nextMessages = [...messages, userMessage];

    setInput('');
    setMessages(nextMessages);
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ persona, messages: nextMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? 'Request failed');
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ]);
    } catch (err) {
      setError(err.message);
      setMessages((prev) => prev.slice(0, -1));
      setInput(text);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full md:my-4 md:h-[calc(100dvh-2rem)] md:rounded-2xl md:border md:border-zinc-800 md:shadow-2xl md:shadow-black/60 md:overflow-hidden">
      <header className="shrink-0 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur px-4 py-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-medium">
              AI Mentor Chat
            </p>
            <h1 className="text-xl font-bold text-zinc-50 mt-0.5">Persona Chat</h1>
            <p className={`text-xs mt-2 px-2.5 py-1 rounded-full inline-block border ${personaConfig.accentLight}`}>
              {personaConfig.tagline}
            </p>
          </div>
          <button
            type="button"
            onClick={handleNewChat}
            disabled={loading || messages.length === 0}
            className="text-xs text-zinc-400 hover:text-zinc-100 border border-zinc-700 hover:border-zinc-600 rounded-lg px-3 py-1.5 transition-colors disabled:opacity-40"
          >
            New chat
          </button>
        </div>
        <PersonaToggle
          persona={persona}
          onChange={handlePersonaChange}
          disabled={loading}
        />
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-black min-h-0">
        {messages.length === 0 && (
          <div className="text-center py-16 px-6">
            <div className={`inline-flex w-14 h-14 rounded-2xl border items-center justify-center text-2xl font-bold mb-4 ${personaConfig.avatar}`}>
              {firstName[0]}
            </div>
            <p className="font-semibold text-zinc-200 mb-2">
              Chat with {personaConfig.label}
            </p>
            <p className="text-zinc-500 text-sm max-w-xs mx-auto leading-relaxed">
              Ask about careers, system design, AI, or building products.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {['Will AI take my job?', 'Monolith or microservices?', 'How do I stay updated?'].map((hint) => (
                <button
                  key={hint}
                  type="button"
                  onClick={() => setInput(hint)}
                  className="text-xs text-zinc-400 border border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:text-zinc-200 rounded-full px-3 py-1.5 transition-colors"
                >
                  {hint}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble
            key={`${msg.role}-${i}`}
            message={msg}
            personaConfig={personaConfig}
          />
        ))}

        {loading && (
          <div className="flex justify-start gap-2.5 animate-fade-in">
            <div className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold ${personaConfig.avatar}`}>
              {firstName[0]}
            </div>
            <div className={`rounded-2xl rounded-bl-md px-4 py-3 text-sm ${personaConfig.bubble}`}>
              <span className="inline-flex gap-1.5">
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-red-300 bg-red-950/50 border border-red-900/60 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`shrink-0 border-t border-zinc-800 bg-zinc-950/90 backdrop-blur px-4 py-3 flex gap-2 focus-within:ring-2 ${personaConfig.accentRing} ring-inset transition-shadow`}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${firstName}...`}
          disabled={loading}
          className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={`rounded-xl px-5 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-40 ${personaConfig.accent}`}
        >
          Send
        </button>
      </form>
    </div>
  );
}
