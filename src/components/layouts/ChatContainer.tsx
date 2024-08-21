'use client';

import { sendPrompt } from '@/lib/ai';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { useToast } from '../ui/use-toast';
import { PromptSuggestions } from './PromptSuggestions';

import { continueConversation } from '@/app/actions';
import { CoreMessage } from 'ai';
import { readStreamableValue } from 'ai/rsc';

export function ChatContainer(): JSX.Element {
	const { toast } = useToast();

	const [messages, setMessages] = useState<CoreMessage[]>([]);
	const [input, setInput] = useState('');

	useEffect(() => {
		console.log('messages', messages);
	}, [messages]);

	function setSuggestedPromptHandler(suggestedPrompt: string): void {
		setInput(suggestedPrompt);
	}

	async function sendPromptHandler(): Promise<void> {
		const result = await sendPrompt(input);
		console.log('result', result);

		// toast({ title: 'New toast message', description: 'You have a new message.' });
	}

	async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();
		const newMessages: CoreMessage[] = [...messages, { content: input, role: 'user' }];

		setMessages(newMessages);
		setInput('');

		const result = await continueConversation(newMessages);

		for await (const content of readStreamableValue(result)) {
			setMessages([
				...newMessages,
				{
					role: 'assistant',
					content: content as string,
				},
			]);
		}
	}

	return (
		<>
			<PromptSuggestions className='mb-5' onClick={setSuggestedPromptHandler} />

			<div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
				{messages.map((m, i) => (
					<div key={i} className='whitespace-pre-wrap'>
						{m.role === 'user' ? 'User: ' : 'AI: '}
						{m.content as string}
					</div>
				))}
			</div>

			<form className='relative w-full rounded-md shadow' onSubmit={onSubmitHandler}>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
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
