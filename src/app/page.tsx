import { Header } from '@/components/Header';

export default function Home() {
	return (
		<main className="flex flex-col w-screen h-screen py-8 sm:py-12 px-6 sm:px-12 md:px-24">
			<Header title="Daniel.ai" />

			<div className="flex flex-col self-center w-full max-w-[800px]">
				<h2 className="block text-2xl md:text-3xl font-semibold mb-3">
					Hi, ik ben Daniel Stals
					<br />
					Wat zou je graag willen weten?
				</h2>

				<span className="block text-base text-neutral-mid">Gebruik een van de standaard vragen of formuleer zelf een vraag</span>
			</div>
		</main>
	);
}
