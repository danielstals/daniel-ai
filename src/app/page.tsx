'use client';

import { PromptSuggestions } from '@/components/layouts/PromptSuggestions';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

export default function Home() {
	const [prompt, setPrompt] = useState<string>('');

	function handleSetPrompt(e: React.ChangeEvent<HTMLInputElement>) {
		e.preventDefault();
		setPrompt(e.target.value);
	}

	function handleSetSuggestedPrompt(suggestedPrompt: string) {
		setPrompt(suggestedPrompt);
	}

	return (
		<div className='flex flex-col self-center w-full max-w-[800px]'>
			<h2 className='block mb-3 text-2xl font-semibold md:text-3xl'>
				Hi, ik ben Daniel Stals
				<br />
				Wat zou je graag willen weten?
			</h2>

			<span className='block mb-5 text-base font-light text-neutral-mid'>
				Gebruik een van de standaard vragen of formuleer zelf een vraag
			</span>

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
					isDisabled={!prompt}
					className='absolute items-center justify-center -translate-y-1/2 right-3 top-1/2'
					icon={<FaArrowRight color='white' />}
				/>
			</div>
		</div>
	);
}
