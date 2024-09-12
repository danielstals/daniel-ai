import { ChatLayout } from '@/components/layouts/chat-layout/chat-layout';
import { ChatContainer } from '@/features/chat/components/chat-container/chat-container';

import getSessionId from './actions/get-session-id';

export default async function Home() {
	// Retrieve sessionId either from cookies or Set-Cookie header
	const sessionId = getSessionId();

	return (
		<div className='flex w-full max-w-[800px] grow flex-col self-center pt-[20px] max-sm:overflow-y-hidden'>
			<h2 className='mb-3 block text-lg font-semibold text-foreground sm:text-2xl md:text-3xl'>
				Hi, ik ben Daniel Stals!
				<br />
				Wat zou je graag willen weten?
			</h2>

			<span className='mb-5 block text-sm font-light text-foreground/70 sm:text-base'>
				Gebruik een van de standaard vragen of formuleer zelf een vraag
			</span>

			<ChatLayout>
				<ChatContainer sessionId={sessionId} />
			</ChatLayout>
		</div>
	);
}
