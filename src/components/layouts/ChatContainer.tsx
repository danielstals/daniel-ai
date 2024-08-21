'use client';

import { useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { useToast } from '../ui/use-toast';
import { PromptSuggestions } from './PromptSuggestions';

import { Message, useChat } from 'ai/react';

export function ChatContainer(): JSX.Element {
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		maxToolRoundtrips: 2,
	});

	const { toast } = useToast();

	// const [messages, setMessages] = useState<CoreMessage[]>([]);
	// const [input, setInput] = useState('');

	useEffect(() => {
		console.log('messages', messages);
	}, [messages]);

	function setSuggestedPromptHandler(suggestedPrompt: string): void {
		// setInput(suggestedPrompt);
	}

	async function sendPromptHandler(): Promise<void> {
		// const result = await sendPrompt(input);
		// console.log('result', result);
	}

	// async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>): Promise<void> {
	// 	e.preventDefault();
	// 	const newMessages: CoreMessage[] = [...messages, { content: input, role: 'user' }];

	// 	setMessages(newMessages);
	// 	setInput('');

	// 	const result = await continueConversation(newMessages);

	// 	for await (const content of readStreamableValue(result)) {
	// 		setMessages([
	// 			...newMessages,
	// 			{
	// 				role: 'assistant',
	// 				content: content as string,
	// 			},
	// 		]);
	// 	}
	// }

	return (
		<>
			<PromptSuggestions className='mb-5' onClick={setSuggestedPromptHandler} />

			<div className='space-y-4'>
				{messages.map((m: Message) => (
					<div key={m.id} className='whitespace-pre-wrap'>
						<div>
							<div className='font-bold'>{m.role}</div>
							<p>
								{m.content.length > 0 ? (
									m.content
								) : (
									<span className='italic font-light'>{'calling tool: ' + m?.toolInvocations?.[0].toolName}</span>
								)}
							</p>
						</div>
					</div>
				))}
			</div>

			<form className='relative w-full rounded-md shadow' onSubmit={handleSubmit}>
				<input
					value={input}
					onChange={handleInputChange}
					className='w-full p-4 rounded-md outline-none focus:border-primary'
					type='text'
					placeholder='Stel me een vraag...'
				/>

				<Button isDisabled={!input} className='absolute items-center justify-center -translate-y-1/2 right-3 top-1/2'>
					<FaArrowRight color='white' />
				</Button>
			</form>
		</>
	);
}
