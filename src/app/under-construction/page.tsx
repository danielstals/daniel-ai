'use client';

import { LazyLottie } from '@/components/ui/lazy-lottie/lazy-lottie';

export default function UnderConstruction() {
	return (
		<div className='flex size-full flex-col items-center justify-center self-center'>
			<h2 className='text-3xl font-semibold text-foreground'>Under construction</h2>

			<div className='relative w-full max-w-[400px]'>
				<LazyLottie getAnimationData={() => fetch('/animations/under-construction.json').then((res) => res.json())} loop id='empty-box' />
			</div>
		</div>
	);
}
