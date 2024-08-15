import { cva, VariantProps } from 'class-variance-authority';
import React, { cloneElement, forwardRef } from 'react';

const styleOptions = cva(
	'group flex flex-col justify-between h-[150px] bg-white rounded-md text-left p-3 border-solid border border-neutral-light hover:border-primary transition duration-200',
	{
		variants: {
			variant: {
				primary: ['bg-white'],
			},
		},
		defaultVariants: {
			variant: 'primary',
		},
	}
);

interface IPromptButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof styleOptions> {
	text: string;
	icon: JSX.Element;
	isDisabled?: boolean;
}

export const PromptButton = forwardRef<HTMLButtonElement, IPromptButtonProps>(function PromptButton(
	{ text, icon, className, onClick, isDisabled, ...inputParams }: IPromptButtonProps,
	ref
) {
	return (
		<button onClick={onClick} className={styleOptions({ className })} disabled={isDisabled} ref={ref} {...inputParams}>
			<span className='text-sm transition duration-200 group-hover:text-primary'>{text}</span>
			{cloneElement(icon, { className: 'text-neutral-mid transition duration-200 group-hover:text-primary' })}
		</button>
	);
});
