import { PromptSuggestions } from '@/components/layouts/PromptSuggestions';

export default function Home() {
	return (
		<div className="flex flex-col self-center w-full max-w-[800px]">
			<h2 className="block text-2xl md:text-3xl font-semibold mb-3">
				Hi, ik ben Daniel Stals
				<br />
				Wat zou je graag willen weten?
			</h2>

			<span className="block text-base font-light text-neutral-mid mb-5">
				Gebruik een van de standaard vragen of formuleer zelf een vraag
			</span>

			<PromptSuggestions />
		</div>
	);
}
