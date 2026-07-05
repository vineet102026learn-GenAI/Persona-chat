import { NextResponse } from 'next/server';
import { createChatCompletion } from '@/lib/chat';
import { VALID_PERSONAS } from '@/lib/loadPrompt';

export async function POST(request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY is not configured on the server.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { persona, messages } = body;

    if (!persona || !VALID_PERSONAS.includes(persona)) {
      return NextResponse.json(
        { error: 'Invalid persona. Use "hitesh" or "piyush".' },
        { status: 400 }
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'messages must be a non-empty array.' },
        { status: 400 }
      );
    }

    const sanitized = messages.filter(
      (m) =>
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim()
    );

    if (sanitized.length === 0) {
      return NextResponse.json(
        { error: 'No valid messages provided.' },
        { status: 400 }
      );
    }

    const { reply, usage, messageCount } = await createChatCompletion(
      persona,
      sanitized
    );

    return NextResponse.json({
      reply,
      usage,
      meta: { messageCount },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error.message ?? 'Failed to generate response.' },
      { status: 500 }
    );
  }
}
