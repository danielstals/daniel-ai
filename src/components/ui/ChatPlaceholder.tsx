import { Bot } from 'lucide-react';
import Link from 'next/link';

export function ChatPlaceholder() {
	return (
		<div className='flex flex-col items-center flex-grow justify-center gap-3 text-center mx-8 transition duration-200'>
			<Bot />
			<p className='font-medium text-foreground text-md sm:text-lg'>Stuur een bericht om de AI chat te starten!</p>
			<p className='text-sm text-foreground sm:text-md'>
				Je kunt de chatbot vragen stellen over mijn werk, projecten, technologieën, ervaringen, enzovoort. Probeer het eens!
			</p>
			<p className='text-sm text-muted-foreground'>
				Je mag natuurlijk ook gewoon mijn{' '}
				<Link className='text-primary hover:underline' target='_blank' href='https://www.linkedin.com/in/danielstals/'>
					LinkedIn profiel
				</Link>{' '}
				bezoeken.
			</p>
		</div>
	);
}
