import { cva, VariantProps } from 'class-variance-authority';
import React, { cloneElement, forwardRef } from 'react';

const styleOptions = cva(
	'group flex flex-col justify-between rounded-md border border-solid bg-background p-3 text-left transition duration-200 hover:border-primary sm:h-[120px]',
	{
		variants: {
			variant: {
				primary: ['bg-background'],
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	},
);

interface IPromptButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof styleOptions> {
	text: string;
	icon: JSX.Element;
	isDisabled?: boolean;
}

export const PromptButton = forwardRef<HTMLButtonElement, IPromptButtonProps>(function PromptButton(
	{ text, icon, className, onClick, isDisabled, variant, ...inputParams }: IPromptButtonProps,
	ref,
) {
	return (
		<button onClick={onClick} className={styleOptions({ variant, className })} disabled={isDisabled} ref={ref} {...inputParams}>
			<span className='pb-2 text-sm transition duration-200 group-hover:text-primary'>{text}</span>
			{cloneElement(icon, { className: 'text-foreground transition duration-200 group-hover:text-primary max-sm:self-center' })}
		</button>
	);
});
