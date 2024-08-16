import { ModeToggle } from '../ui/ModeToggle';

export interface IHeaderProps {
	title: string;
}

export function Header({ title }: IHeaderProps) {
	return (
		<header className='flex justify-between mb-6 sm:mb-12 md:mb-24'>
			<h1 className='text-foreground font-semibold text-2xl'>{title}</h1>
			<ModeToggle />
		</header>
	);
}
