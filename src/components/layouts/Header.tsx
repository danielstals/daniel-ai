import { ModeToggle } from '../ui/ModeToggle';

export interface IHeaderProps {
	title: string;
}

export function Header({ title }: IHeaderProps) {
	return (
		<header className='flex justify-between mb-6'>
			<h1 className='text-2xl font-semibold text-foreground'>{title}</h1>
			<ModeToggle />
		</header>
	);
}
