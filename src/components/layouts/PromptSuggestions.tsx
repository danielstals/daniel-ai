import { cva } from 'class-variance-authority';
import { CiLaptop, CiMail, CiUser } from 'react-icons/ci';
import { PromptButton } from '../ui/PromptButton';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

const styleOptions = cva('max-w-[650px]');

interface IPromptSuggestionsProps {
	onClick: (suggestedPrompt: string) => void;
	className?: string;
}

interface IPromptSuggestion {
	text: string;
	icon: JSX.Element;
}

const suggestedPrompts: IPromptSuggestion[] = [
	{
		text: 'Geef me een samenvatting van je profiel.',
		icon: <CiUser size={24} className='text-neutral-mid' />,
	},
	{
		text: 'In welke technologieen ben je thuis?',
		icon: <CiLaptop size={24} className='text-neutral-mid' />,
	},
	{
		text: 'Hoe kan ik je bereiken?',
		icon: <CiMail size={24} />,
	},
];

export function PromptSuggestions({ className, onClick }: IPromptSuggestionsProps) {
	return (
		<div className={styleOptions({ className })}>
			{/* Carousel for mobile screens only */}
			<Carousel className='sm:hidden'>
				<CarouselContent>
					{suggestedPrompts.map((prompt: IPromptSuggestion, index: number) => (
						<CarouselItem className='flex' key={index}>
							<PromptButton className='flex-1' onClick={() => onClick(prompt.text)} text={prompt.text} icon={prompt.icon} />
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className='left-2 bottom-2 top-[unset] translate-y-[unset]' />
				<CarouselNext className='right-2 bottom-2 top-[unset] translate-y-[unset]' />
			</Carousel>

			{/* Grid for desktop screens only */}
			<div className='hidden sm:grid grid-cols-3 gap-4'>
				{suggestedPrompts.map((prompt: IPromptSuggestion, index: number) => (
					<PromptButton key={index} onClick={() => onClick(prompt.text)} text={prompt.text} icon={prompt.icon} />
				))}
			</div>
		</div>
	);
}
