'use server';

import { ragChat } from '@/lib/ai/rag-chat';

export async function deleteHistory({ sessionId }: { sessionId: string }): Promise<void> {
	try {
		await ragChat.history.deleteMessages({ sessionId });
	} catch (error) {
		console.error(error);
		throw new Error('Er ging iets mis met het verwijderen van de chat historie. Probeer het opnieuw.');
	}
}
