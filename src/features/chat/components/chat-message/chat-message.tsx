'use client';

import { Message } from 'ai/react';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import dotDotDot from '@/lib/animations/dot-dot-dot.json';
import { CHAT_AVATAR_IMG_ALT } from '@/lib/constants/constants';
import { cn } from '@/utils/cn';

import avatar from '../../../../../public/images/avatar.jpg';
import { LottieAnimation } from '../../../../components/ui/lottie-animation/lottie-animation';

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
	isLoading?: boolean;
}

export function ChatMessage({ message: { role, content }, variant, className, isLoading }: ChatMessageProps): JSX.Element {
	const isAiMessage = role === 'assistant';

	return (
		<div className={cn(isAiMessage ? 'justify-start' : 'justify-end', 'mb-3 translate-z-0', chatMessageVariants({ className }))}>
			{isAiMessage && (
				<Image
					alt={CHAT_AVATAR_IMG_ALT}
					src={avatar}
					width={40}
					height={40}
					className='mr-2 size-[35px] flex-none rounded-full sm:size-[40px]'
					priority
				/>
			)}
			<div
				data-testid='message-row'
				className={cn(
					'rounded-md border px-3 py-2',
					isAiMessage ? 'bg-background text-foreground' : 'bg-primary dark:bg-slate-500 text-background',
					chatMessageVariants({ variant }),
				)}
			>
				<ReactMarkdown
					// eslint-disable-next-line tailwindcss/no-custom-classname
					className='markdown-custom text-sm'
					components={{
						a: ({ ...props }) => <Link target='_blank' {...props} href={props.href ?? ''} className='text-primary hover:underline' />,
						p: ({ ...props }) => <p {...props} className='mt-3 inline-block first:mt-0' />,
						ul: ({ ...props }) => <ul {...props} className='mt-3 list-inside list-disc first:mt-0' />,
						li: ({ ...props }) => <li {...props} className='mt-1' />,
						hr: ({ ...props }) => <hr {...props} className='hidden' />,
					}}
				>
					{content}
				</ReactMarkdown>

				{isLoading && (
					<div className='h-[15px] w-[40px] translate-y-[3px]'>
						<LottieAnimation height={60} animationData={dotDotDot} />
					</div>
				)}
			</div>
		</div>
	);
}
