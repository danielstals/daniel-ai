import { cookies, headers } from 'next/headers';

import { ChatLayout } from '@/components/layouts/chat-layout';
import { ChatContainer } from '@/features/chat/components/chat-container';
import { ragChat } from '@/lib/ai/rag-chat';

export default async function Home() {
	// Retrieve sessionId either from cookies or Set-Cookie header
	const sessionId = getSessionId();
	const initialMessages = await fetchInitialMessages(sessionId);

	return (
		<div className='flex w-full max-w-[800px] grow flex-col self-center pt-[20px] max-sm:overflow-y-hidden'>
			<h2 className='mb-3 block text-lg font-semibold text-foreground sm:text-2xl md:text-3xl'>
				Hi, ik ben Daniel Stals
				<br />
				Wat zou je graag willen weten?
			</h2>

			<span className='mb-5 block text-sm font-light text-foreground/70 sm:text-base'>
				Gebruik een van de standaard vragen of formuleer zelf een vraag
			</span>

			<ChatLayout>
				<ChatContainer sessionId={sessionId} initialMessages={initialMessages} />
			</ChatLayout>
		</div>
	);
}

/**
 * Retrieves the session ID from cookies or the Set-Cookie header.
 * @returns {string} The session ID.
 */
function getSessionId(): string {
	const headerList = headers();
	const setCookieHeader = headerList.get('set-cookie');
	const cookie = cookies().get('sessionId');

	// Use sessionId from cookies if available; otherwise, parse from Set-Cookie header
	if (cookie?.value) return cookie.value;

	if (setCookieHeader) {
		const match = setCookieHeader.match(/sessionid=([^;]+);/i);
		if (match) return match[1];
	}

	// Return an empty string if sessionId is not found
	return '';
}

/**
 * Fetches initial messages for the given session ID.
 * @param {string} sessionId - The session ID.
 * @returns {Promise<Message[]>} The initial messages.
 */
async function fetchInitialMessages(sessionId: string) {
	try {
		return await ragChat.history.getMessages({ sessionId, amount: 10 });
	} catch (error) {
		console.error('Error fetching initial messages:', error);
		return [];
	}
}
