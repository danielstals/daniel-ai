'use client';

import { useQuery } from '@tanstack/react-query';
import { ChatRequestOptions, Message } from 'ai';
import { useChat } from 'ai/react';
import { Trash } from 'lucide-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { deleteHistory } from '@/app/actions/delete-history';
import { ChatPlaceholder } from '@/components/ui/chat-placeholder/chat-placeholder';
import { DsButton } from '@/components/ui/ds-button/ds-button';
import { Spinner } from '@/components/ui/spinner/spinner';
import { ChatError } from '@/features/chat/types/chat.types';
import { cn } from '@/utils/cn';

import { ChatMessage } from '../chat-message/chat-message';
import { PromptSuggestions } from '../prompt-suggestions/prompt-suggestions';

type ChatContainerProps = {
	sessionId: string;
};

async function fetchInitialMessages(): Promise<Message[]> {
	const response = await fetch('/api/initial-messages');
	if (!response.ok) throw new Error('Failed to fetch messages');
	return response.json();
}

export function ChatContainer({ sessionId }: ChatContainerProps) {
	const { data: initialMessages, isLoading: messagesLoading } = useQuery({
		queryKey: ['initialMessages'],
		queryFn: () => fetchInitialMessages(),
		staleTime: Infinity,
	});

	const { input, setInput, handleInputChange, handleSubmit, messages, setMessages, isLoading, error } = useChat({
		body: { sessionId },
		initialMessages,
	});

	const [isOpen, setIsOpen] = useState<boolean>(true);
	const [chatError, setChatError] = useState<ChatError | null>(null);

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
		chatRequestOptions?: ChatRequestOptions,
	): void {
		event?.preventDefault?.();

		if (!isOpen && input.length) {
			setIsOpen(true);
		}

		if (!isLoading && input.length) {
			handleSubmit(event, chatRequestOptions);
		}
	}

	async function deleteHistoryHandler(e: MouseEvent): Promise<void> {
		e.preventDefault();
		setMessages([]);

		try {
			await deleteHistory({ sessionId });
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		if (!isOpen && input.length) {
			setIsOpen(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [input]);

	useEffect(() => {
		if (error) {
			const chatError: ChatError = JSON.parse(error.message);
			setChatError(chatError);
		} else {
			setChatError(null);
		}
	}, [error]);

	useEffect(() => {
		if (scrollRef?.current) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}
	}, [isLoading]);

	return (
		<>
			<PromptSuggestions className='mb-5' onClick={setSuggestedPromptHandler} />

			<form
				aria-label='chat'
				className={cn(
					'flex flex-col bg-background w-full overflow-hidden rounded-md shadow transition-height duration-200',
					isOpen ? 'max-sm:flex-grow sm:h-[400px]' : 'h-[60px]',
				)}
				onSubmit={submitHandler}
			>
				{messagesLoading ? (
					<Spinner />
				) : (
					<div
						className={cn(
							'flex flex-col-reverse flex-grow p-5 rounded-tl-md rounded-tr-md overflow-y-auto !overflow-anchor-auto rounded-none',
							isOpen ? 'visible border-b border-b-solid' : 'hidden',
						)}
						ref={scrollRef}
					>
						{!error && messages.length === 0 && isOpen && <ChatPlaceholder />}

						<div>
							{messages?.map((message: Message, index: number) => <ChatMessage key={index} message={message} />)}
							{isLoading && lastMessageIsUser && (
								<ChatMessage
									message={{
										id: 'loading',
										role: 'assistant',
										content: 'Even geduld a.u.b..',
									}}
									isLoading={isLoading && lastMessageIsUser}
								/>
							)}
							{chatError && (
								<ChatMessage
									message={{
										id: 'error',
										role: 'assistant',
										content: chatError.message,
									}}
									variant='destructive'
								/>
							)}
						</div>
					</div>
				)}

				<div className={cn('flex items-center px-1 sm:px-2 sm:pl-0 bg-background z-[5]', isOpen ? 'h-auto' : 'h-[60px]')}>
					<DsButton
						variant='transparent'
						type='button'
						title='Reset de chat'
						className='h-auto items-center justify-center hover:text-primary max-sm:px-2'
						onClick={deleteHistoryHandler}
						disabled={!messages.length || isLoading}
					>
						<Trash size={18} />
					</DsButton>
					<input
						aria-label='chat-input'
						data-testid='chat-input'
						value={input}
						onChange={handleInputChange}
						onFocus={() => setIsOpen(true)}
						className='w-full rounded-b-md px-0 py-4 text-sm outline-none focus:border-primary sm:px-4'
						type='text'
						placeholder='Stel me een vraag...'
						ref={inputRef}
					/>

					<DsButton
						type='submit'
						title='Stuur je vraag'
						disabled={!input || isLoading}
						className='items-center justify-center max-sm:bg-transparent max-sm:px-2 sm:ml-3'
					>
						<FaArrowRight className='text-background dark:text-foreground max-sm:text-foreground' />
					</DsButton>
				</div>
			</form>
		</>
	);
}
