import { NextResponse } from 'next/server';

import getSessionId from '@/app/actions/get-session-id';
import { ragChat } from '@/lib/ai/rag-chat';

export async function GET() {
	const sessionId = getSessionId();

	if (!sessionId) {
		return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
	}

	try {
		const messages = await ragChat.history.getMessages({ sessionId, amount: 10 });
		return NextResponse.json(messages);
	} catch (error) {
		console.error('Error fetching initial messages:', error);
		return NextResponse.json({ error: 'Er ging iets mis met het ophalen van je chathistorie' }, { status: 500 });
	}
}
