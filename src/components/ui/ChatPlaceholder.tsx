import Image from 'next/image';
import Link from 'next/link';
import avatar from '../../../public/images/avatar.jpg';

export function ChatPlaceholder() {
	return (
		<div className='flex flex-col items-center flex-grow justify-center gap-3 text-center sm:mx-8 transition duration-200'>
			<Image alt='avatar' src={avatar} width={120} height={120} className='rounded-full max-sm:w-[50px] max-sm:h-[50px]' />
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
