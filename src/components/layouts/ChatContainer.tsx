'use client';

import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { useToast } from '../ui/use-toast';
import { PromptSuggestions } from './PromptSuggestions';

export function ChatContainer(): JSX.Element {
	const { toast } = useToast();

	const [prompt, setPrompt] = useState<string>('');

	function handleSetPrompt(e: React.ChangeEvent<HTMLInputElement>): void {
		e.preventDefault();
		setPrompt(e.target.value);
	}

	function handleSetSuggestedPrompt(suggestedPrompt: string): void {
		setPrompt(suggestedPrompt);
	}

	async function handleSendPrompt(): Promise<void> {
		// const result = await sendPrompt(prompt);
		// console.log('result', result);

		toast({ title: 'New toast message', description: 'You have a new message.' });
	}

	return (
		<>
			<PromptSuggestions className='mb-5' onClick={handleSetSuggestedPrompt} />

			<div className='relative'>
				<input
					value={prompt}
					onChange={handleSetPrompt}
					className='w-full p-4 rounded-md shadow outline-none focus:border-primary'
					type='text'
					placeholder='Stel me een vraag...'
				/>

				<Button
					onClick={handleSendPrompt}
					isDisabled={!prompt}
					className='absolute items-center justify-center -translate-y-1/2 right-3 top-1/2'
				>
					<FaArrowRight color='white' />
				</Button>
			</div>
		</>
	);
}
