import { cookies } from 'next/headers';

import { ChatLayout } from '@/components/layouts/chat-layout';
import { ChatContainer } from '@/features/chat/components/chat-container';
import { ragChat } from '@/lib/ai/rag-chat';

export default async function Home() {
	const sessionCookie = cookies().get('sessionId')?.value || '';

	const initialMessages = await ragChat.history.getMessages({ sessionId: sessionCookie, amount: 10 });

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
				<ChatContainer sessionId={sessionCookie} initialMessages={initialMessages} />
			</ChatLayout>
		</div>
	);
}
