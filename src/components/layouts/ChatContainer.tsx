'use client';

import { cn } from '@/lib/utils';
import { ChatRequestOptions, Message } from 'ai';
import { useChat } from 'ai/react';
import { Bot, Trash } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { ChatMessage } from './ChatMessage';
import { PromptSuggestions } from './PromptSuggestions';

export function ChatContainer(): JSX.Element {
	const { input, setInput, handleInputChange, handleSubmit, messages, setMessages, isLoading, error } = useChat({ initialMessages: [] });

	const [isOpen, setIsOpen] = useState<boolean>(() => !!messages.length);

	const lastMessageIsUser = messages[messages.length - 1]?.role === 'user';

	const inputRef = useRef<HTMLInputElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	function setSuggestedPromptHandler(suggestedPrompt: string): void {
		setInput(suggestedPrompt);
		inputRef.current?.focus();

		if (!isOpen) {
			setIsOpen(true);
		}
	}

	function submitHandler(
		event?: {
			preventDefault?: () => void;
		},
		chatRequestOptions?: ChatRequestOptions
	): void {
		event?.preventDefault?.();

		if (!isOpen && input.length) {
			setIsOpen(true);
		}

		handleSubmit(event, chatRequestOptions);
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
		if (isOpen && event.key === 'Escape' && !messages.length) {
			setIsOpen(false);
			setInput('');
		}
	}

	useEffect(() => {
		if (!isOpen && input.length) {
			setIsOpen(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [input]);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}
	}, [messages]);

	return (
		<>
			<PromptSuggestions className='mb-5' onClick={setSuggestedPromptHandler} />

			<form
				className={cn(
					'flex flex-col bg-background overflow-hidden relative w-full rounded-md shadow transition-height duration-200',
					isOpen ? 'h-[400px]' : 'h-[60px]'
				)}
				onSubmit={submitHandler}
				onClick={() => inputRef.current?.focus()}
			>
				{!error && messages.length === 0 && (
					<div
						className={cn(
							'absolute top-24 left-0 right-0 flex flex-col items-center justify-center gap-3 text-center mx-8 transition duration-200',
							isOpen ? 'visible' : 'hidden'
						)}
					>
						<Bot />
						<p className='text-lg font-medium'>Stuur een bericht om de AI chat te starten!</p>
						<p>Je kunt de chatbot vragen stellen over mijn werk, projecten, technologieën, ervaringen, enzovoort. Probeer het eens!</p>
						<p className='text-sm text-muted-foreground'>
							Je mag natuurlijk ook gewoon mijn{' '}
							<Link className='text-primary hover:underline' target='_blank' href='https://www.linkedin.com/in/danielstals/'>
								LinkedIn profiel
							</Link>{' '}
							bezoeken.
						</p>
					</div>
				)}
				<div
					className={cn(
						'flex flex-col flex-1 p-5 rounded-tl-md rounded-tr-md  overflow-auto',
						isOpen ? 'visible border-b border-b-solid' : 'hidden'
					)}
					ref={scrollRef}
				>
					{messages?.map((message: Message, index: number) => (
						<ChatMessage key={index} message={message} />
					))}
					{isLoading && lastMessageIsUser && (
						<ChatMessage
							message={{
								id: 'loading',
								role: 'assistant',
								content: 'Even geduld a.u.b...',
							}}
						/>
					)}
					{error && (
						<ChatMessage
							message={{
								id: 'error',
								role: 'assistant',
								content: 'Er is iets fout gegaan. Probeer het opnieuw.',
							}}
						/>
					)}
				</div>

				<div className={cn('relative flex', isOpen ? 'h-auto' : 'h-[60px]')}>
					<Button
						variant='transparent'
						type='button'
						title='Reset de chat'
						className='h-auto items-center justify-center hover:text-primary'
						onClick={(e) => {
							e.preventDefault();
							setMessages([]);
						}}
					>
						<Trash size={18} />
					</Button>
					<input
						value={input}
						onChange={handleInputChange}
						onFocus={() => setIsOpen(true)}
						onKeyDown={handleKeyDown}
						className='w-full p-4 rounded-bl-md rounded-br-md outline-none focus:border-primary'
						type='text'
						placeholder='Stel me een vraag...'
						ref={inputRef}
					/>

					<Button
						type='submit'
						title='Stuur je vraag'
						isDisabled={!input}
						className='absolute items-center justify-center -translate-y-1/2 right-3 top-1/2'
					>
						<FaArrowRight color='white' />
					</Button>
				</div>
			</form>
		</>
	);
}
