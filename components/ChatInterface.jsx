'use client';

import { useEffect, useRef, useState } from 'react';
import PersonaToggle, { PERSONAS } from './PersonaToggle';

function MessageBubble({ message, personaConfig }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-zinc-900 text-white rounded-br-md'
            : `${personaConfig.bubble} rounded-bl-md`
        }`}
      >
        {!isUser && (
          <p className="text-xs font-semibold mb-1 opacity-70">
            {personaConfig.label.split(' ')[0]}
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
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
      <header className="shrink-0 border-b border-zinc-200 bg-white px-4 py-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-bold text-zinc-900">Persona Chat</h1>
            <p className={`text-xs mt-0.5 px-2 py-0.5 rounded-full inline-block border ${personaConfig.accentLight}`}>
              {personaConfig.tagline}
            </p>
          </div>
          <button
            type="button"
            onClick={handleNewChat}
            disabled={loading || messages.length === 0}
            className="text-xs text-zinc-500 hover:text-zinc-900 border border-zinc-200 rounded-lg px-3 py-1.5 disabled:opacity-40"
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

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-zinc-50 min-h-0">
        {messages.length === 0 && (
          <div className="text-center py-12 text-zinc-400 text-sm">
            <p className="font-medium text-zinc-500 mb-1">
              Chat with {personaConfig.label}
            </p>
            <p>Ask about careers, system design, AI, or building products.</p>
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
          <div className="flex justify-start">
            <div className={`rounded-2xl rounded-bl-md px-4 py-3 text-sm ${personaConfig.bubble}`}>
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:300ms]" />
              </span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-center text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div ref={bottomRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="shrink-0 border-t border-zinc-200 bg-white px-4 py-3 flex gap-2"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message ${personaConfig.label.split(' ')[0]}...`}
          disabled={loading}
          className="flex-1 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-300 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className={`rounded-xl px-5 py-2.5 text-sm font-medium text-white disabled:opacity-40 ${personaConfig.accent}`}
        >
          Send
        </button>
      </form>
    </div>
  );
}
