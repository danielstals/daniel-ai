import { cva } from 'class-variance-authority';
import { CiLaptop, CiMail, CiUser } from 'react-icons/ci';
import { PromptButton } from '../ui/PromptButton';

const styleOptions = cva('max-w-[650px] grid grid-cols-1 md:grid-cols-3 gap-4');

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
			{suggestedPrompts.map((prompt: IPromptSuggestion, index: number) => (
				<PromptButton onClick={() => onClick(prompt.text)} key={index} text={prompt.text} icon={prompt.icon} />
			))}
		</div>
	);
}
