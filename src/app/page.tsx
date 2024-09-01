import { ChatContainer } from '@/components/layouts/ChatContainer';
import { ragChat } from '@/lib/ai/rag-chat';
import { cookies } from 'next/headers';

export default async function Home() {
	const sessionCookie = cookies().get('sessionId')?.value || '';

	const initialMessages = await ragChat.history.getMessages({ sessionId: sessionCookie, amount: 10 });

	return (
		<div className='flex flex-col flex-grow justify-center max-sm:overflow-y-hidden w-full max-w-[800px] self-center'>
			<h2 className='block mb-3 font-semibold text-foreground text-md sm:text-2xl md:text-3xl'>
				Hi, ik ben Daniel Stals
				<br />
				Wat zou je graag willen weten?
			</h2>

			<span className='block mb-5 text-sm font-light text-foreground/70 sm:text-base'>
				Gebruik een van de standaard vragen of formuleer zelf een vraag
			</span>

			<ChatContainer sessionId={sessionCookie} initialMessages={initialMessages} />
		</div>
	);
}
