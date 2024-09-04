'use client';

import { deleteHistory } from '@/app/actions/delete-history';
import { ChatError } from '@/lib/models/chat-error';
import { cn } from '@/lib/utils';
import { ChatRequestOptions, Message } from 'ai';
import { useChat } from 'ai/react';
import { Trash } from 'lucide-react';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { ChatPlaceholder } from '../ui/ChatPlaceholder';
import { DsButton } from '../ui/DsButton';
import { ChatMessage } from './ChatMessage';
import { PromptSuggestions } from './PromptSuggestions';

interface IChatContainerProps {
	sessionId: string;
	initialMessages: Message[];
}

export function ChatContainer({ sessionId, initialMessages }: IChatContainerProps): JSX.Element {
	const { input, setInput, handleInputChange, handleSubmit, messages, setMessages, isLoading, error } = useChat({
		body: { sessionId },
		initialMessages,
	});

	const [isOpen, setIsOpen] = useState<boolean>(() => !!messages.length);
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
		chatRequestOptions?: ChatRequestOptions
	): void {
		event?.preventDefault?.();

		if (!isOpen && input.length) {
			setIsOpen(true);
		}

		if (!isLoading) {
			handleSubmit(event, chatRequestOptions);
		}
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
		if (isOpen && event.key === 'Escape' && !messages.length) {
			setIsOpen(false);
			setInput('');
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
		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}
	}, [isLoading]);

	return (
		<div className='flex flex-col overflow-y-hidden max-sm:flex-grow'>
			<PromptSuggestions className='mb-5' onClick={setSuggestedPromptHandler} />

			<form
				className={cn(
					'flex flex-col bg-background w-full overflow-hidden rounded-md shadow transition-height duration-200',
					isOpen ? 'max-sm:flex-grow sm:h-[400px]' : 'h-[60px]'
				)}
				onSubmit={submitHandler}
			>
				<div
					className={cn(
						'flex flex-col-reverse flex-grow p-5 rounded-tl-md rounded-tr-md overflow-y-auto !overflow-anchor-auto rounded-none',
						isOpen ? 'visible border-b border-b-solid' : 'hidden'
					)}
					ref={scrollRef}
				>
					{!error && messages.length === 0 && isOpen && <ChatPlaceholder />}

					<div>
						{messages?.map((message: Message, index: number) => (
							<ChatMessage key={index} message={message} />
						))}
						{isLoading && lastMessageIsUser && (
							<ChatMessage
								message={{
									id: 'loading',
									role: 'assistant',
									content: 'Even geduld a.u.b',
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

				<div className={cn('flex items-center px-1 sm:px-2 sm:pl-0 bg-background z-[5]', isOpen ? 'h-auto' : 'h-[60px]')}>
					<DsButton
						variant='transparent'
						type='button'
						title='Reset de chat'
						className='items-center justify-center h-auto hover:text-primary max-sm:px-2'
						onClick={deleteHistoryHandler}
						disabled={!messages.length || isLoading}
					>
						<Trash size={18} />
					</DsButton>
					<input
						value={input}
						onChange={handleInputChange}
						onFocus={() => setIsOpen(true)}
						onKeyDown={handleKeyDown}
						className='w-full px-0 py-4 text-sm outline-none sm:px-4 rounded-bl-md rounded-br-md focus:border-primary'
						type='text'
						placeholder='Stel me een vraag...'
						ref={inputRef}
					/>

					<DsButton
						type='submit'
						title='Stuur je vraag'
						disabled={!input || isLoading}
						className='items-center justify-center sm:ml-3 max-sm:bg-transparent max-sm:px-2'
					>
						<FaArrowRight className='max-sm:text-foreground text-background dark:text-foreground' />
					</DsButton>
				</div>
			</form>
		</div>
	);
}
