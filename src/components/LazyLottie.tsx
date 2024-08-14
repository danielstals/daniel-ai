import type { LottieComponentProps } from 'lottie-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const LazyLottieComponent = dynamic(() => import('lottie-react'), {
	ssr: false,
	//   loading: ({ height, width }) => <Skeleton height={height} width={width} />,
});

interface LottieProps<T extends Record<string, unknown>> {
	getAnimationData: () => Promise<T>;
	id: string;
}

export function LazyLottie<T extends Record<string, unknown>>({
	getAnimationData,
	id,
	...props
}: LottieProps<T> & Omit<LottieComponentProps, 'animationData'>) {
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		let isMounted = true;

		getAnimationData().then((animationData) => {
			if (isMounted) {
				setData(animationData);
			}
		});

		return () => {
			isMounted = false;
		};
	}, [getAnimationData]);

	if (!data) {
		return;
	}

	return <LazyLottieComponent animationData={data} {...props} />;
}
