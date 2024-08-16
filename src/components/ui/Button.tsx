import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const styleOptions = cva('flex h-[35px] rounded-md transition duration-200', {
	variants: {
		variant: {
			primary: ['bg-primary', 'hover:bg-foreground'],
			transparent: ['bg-transparent', 'hover:bg-background/30'],
		},
		isDisabled: {
			true: ['bg-primary/50', 'disabled:pointer-events-none'],
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
	children: React.ReactNode;
	text?: string;
	icon?: JSX.Element;
	isDisabled?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, IButtonProps>(function PromptButton(
	{ children, text, icon, className, isDisabled, onClick, variant, ...inputParams }: IButtonProps,
	ref
) {
	return (
		<button onClick={onClick} className={styleOptions({ className, variant, isDisabled })} disabled={isDisabled} ref={ref} {...inputParams}>
			{children}
		</button>
	);
});
