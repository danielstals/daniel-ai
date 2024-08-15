export interface IHeaderProps {
	title: string;
}

export function Header({ title }: IHeaderProps) {
	return (
		<header className="mb-6 sm:mb-12 md:mb-24">
			<h1 className="font-semibold text-2xl">{title}</h1>
		</header>
	);
}
