import { cva, VariantProps } from 'class-variance-authority';
import { cloneElement, forwardRef } from 'react';

const styleOptions = cva('flex h-[35px] rounded-md transition duration-200', {
	variants: {
		variant: {
			primary: ['bg-primary', 'hover:bg-neutral-dark'],
		},
		isDisabled: {
			true: ['bg-neutral-light', 'disabled:pointer-events-none'],
		},
		buttonType: {
			onlyIcon: ['w-[35px]'],
		},
	},
	defaultVariants: {
		variant: 'primary',
		buttonType: 'onlyIcon',
	},
});

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof styleOptions> {
	text?: string;
	icon?: JSX.Element;
	isDisabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(function PromptButton(
	{ text, icon, className, isDisabled, onClick, ...inputParams }: IButtonProps,
	ref
) {
	return (
		<button onClick={onClick} className={styleOptions({ className, isDisabled })} disabled={isDisabled} ref={ref} {...inputParams}>
			{icon && cloneElement(icon, { color: 'white' })}
		</button>
	);
});
