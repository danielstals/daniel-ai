import Lottie from 'lottie-react';

interface LottieAnimationProps {
	animationData: object;
	loop?: boolean;
	autoplay?: boolean;
	width?: string | number;
	height?: string | number;
}

export function LottieAnimation({ animationData, loop = true, autoplay = true, width = 300, height = 300 }: LottieAnimationProps) {
	return (
		<div className='flex size-full items-center justify-center overflow-hidden'>
			<Lottie autoplay={autoplay} loop={loop} animationData={animationData} style={{ width, height, flexShrink: 0 }} />
		</div>
	);
}
