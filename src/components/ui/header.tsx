import { ModeToggle } from './mode-toggle';

export interface IHeaderProps {
	title: string;
}

export function Header({ title }: IHeaderProps) {
	return (
		<header className='mb-6 flex justify-between'>
			<h1 className='text-2xl font-semibold text-foreground'>{title}</h1>
			<ModeToggle />
		</header>
	);
}
