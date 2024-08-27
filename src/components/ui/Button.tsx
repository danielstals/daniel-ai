import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const styleOptions = cva('flex h-[35px] rounded-md active:scale-[0.85] transition duration-200 items-center justify-center', {
	variants: {
		variant: {
			primary: ['bg-primary', 'hover:bg-foreground', 'text-white'],
			transparent: ['bg-transparent', 'hover:bg-background/30'],
		},
		isDisabled: {
			true: ['bg-primary/50', 'disabled:pointer-events-none'],
		},
		buttonType: {
			onlyText: ['px-4'],
			onlyIcon: ['w-[35px]'],
		},
	},
	defaultVariants: {
		variant: 'primary',
		buttonType: 'onlyText',
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
