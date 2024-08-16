import { ChatContainer } from '@/components/layouts/ChatContainer';

export default function Home() {
	return (
		<div className='flex flex-col self-center w-full max-w-[800px]'>
			<h2 className='text-foreground block mb-3 text-2xl font-semibold md:text-3xl'>
				Hi, ik ben Daniel Stals
				<br />
				Wat zou je graag willen weten?
			</h2>

			<span className='text-foreground/70 block mb-5 text-base font-light text-foreground'>
				Gebruik een van de standaard vragen of formuleer zelf een vraag
			</span>

			<ChatContainer />
		</div>
	);
}
