'use client';

import { cn } from '@/lib/utils';
import { Message } from 'ai/react';
import { Bot } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
	message: Message;
}

export function ChatMessage({ message: { role, content } }: ChatMessageProps): JSX.Element {
	const isAiMessage = role === 'assistant';

	return (
		<div className={cn('mb-3 flex items-center', isAiMessage ? 'justify-start' : 'justify-end')}>
			{isAiMessage && <Bot className='flex-none mr-2' />}
			<div
				className={cn(
					'rounded-md border px-3 py-2',
					isAiMessage ? 'bg-background text-foreground' : 'bg-primary dark:bg-slate-500 text-background'
				)}
			>
				<ReactMarkdown
					className='text-sm sm:text-base'
					components={{
						a: ({ node, ref, ...props }) => (
							<Link target='_blank' {...props} href={props.href ?? ''} className='text-primary hover:underline' />
						),
						p: ({ node, ...props }) => <p {...props} className='mt-3 first:mt-0' />,
						ul: ({ node, ...props }) => <ul {...props} className='mt-3 list-disc list-inside first:mt-0' />,
						li: ({ node, ...props }) => <li {...props} className='mt-1' />,
					}}
				>
					{content}
				</ReactMarkdown>
			</div>
		</div>
	);
}
