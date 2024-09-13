import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

const styleOptions = cva('flex h-[35px] items-center justify-center rounded-md transition duration-200 active:scale-[0.85]', {
	variants: {
		variant: {
			primary: ['bg-primary', 'hover:bg-foreground', 'text-white'],
			transparent: ['bg-transparent', 'hover:bg-background/30'],
		},
		isDisabled: {
			true: ['opacity-50', 'disabled:pointer-events-none'],
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

export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof styleOptions> {
	children: React.ReactNode;
	text?: string;
	icon?: JSX.Element;
}

export const DsButton = forwardRef<HTMLButtonElement, IButtonProps>(function PromptButton(
	{ children, className, disabled, onClick, variant, ...inputParams }: IButtonProps,
	ref,
) {
	return (
		<button
			onClick={onClick}
			className={styleOptions({ className, variant, isDisabled: disabled })}
			disabled={disabled}
			ref={ref}
			{...inputParams}
		>
			{children}
		</button>
	);
});
