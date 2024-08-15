import { CiLaptop, CiMail, CiUser } from 'react-icons/ci';
import { PromptButton } from '../ui/PromptButton';

export function PromptSuggestions() {
	return (
		<div className="flex">
			<PromptButton
				className="mr-4"
				text="Geef me een samenvatting van je profiel."
				icon={<CiUser size={24} className="text-neutral-mid" />}
			/>
			<PromptButton
				className="mr-4"
				text="In welke technologieen ben je thuis?"
				icon={<CiLaptop size={24} className="text-neutral-mid" />}
			/>
			<PromptButton text="Hoe kan ik je bereiken?" icon={<CiMail size={24} />} />
		</div>
	);
}
