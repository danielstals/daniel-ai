'use client';

import { cn } from '@/lib/utils';
import { Message } from 'ai/react';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import avatar from '../../../public/images/avatar.jpg';

const chatMessageVariants = cva('flex items-center', {
	variants: {
		variant: {
			destructive: 'bg-red-500 text-background',
		},
	},
});

export interface ChatMessageProps extends VariantProps<typeof chatMessageVariants> {
	message: Message;
	className?: string;
}

export function ChatMessage({ message: { role, content }, variant, className }: ChatMessageProps): JSX.Element {
	const isAiMessage = role === 'assistant';

	return (
		<div className={cn(isAiMessage ? 'justify-start' : 'justify-end', 'mb-3', chatMessageVariants({ className }))}>
			{isAiMessage && (
				<Image
					alt='daniel-avatar'
					src={avatar}
					width={40}
					height={40}
					className='rounded-full flex-none mr-2 w-[35px] h-[35px] sm:w-[40px] sm:h-[40px]'
					priority
				/>
			)}
			<div
				className={cn(
					'rounded-md border px-3 py-2',
					isAiMessage ? 'bg-background text-foreground' : 'bg-primary dark:bg-slate-500 text-background',
					chatMessageVariants({ variant })
				)}
			>
				<ReactMarkdown
					className='text-sm'
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
