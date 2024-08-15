'use client';

import { LazyLottie } from '@/components/ui/LazyLottie';

export default function UnderConstruction() {
	return (
		<div className="flex flex-col self-center w-full h-full items-center justify-center">
			<h2 className="text-neutral text-3xl font-semibold">Under construction</h2>

			<div className="relative w-full max-w-[400px]">
				<LazyLottie getAnimationData={() => fetch('/animations/under-construction.json').then((res) => res.json())} loop id="empty-box" />
			</div>
		</div>
	);
}
