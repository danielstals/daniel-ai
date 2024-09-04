import { useQuery } from '@tanstack/react-query';
import { type LottieComponentProps } from 'lottie-react';
import Image from 'next/image';
import { Suspense, lazy } from 'react';

const LazyLottieComponent = lazy(() => import('lottie-react'));

interface LottieProps<T extends Record<string, unknown>> {
	getAnimationData: () => Promise<T>;
	id: string;
}

export function LazyLottie<T extends Record<string, unknown>>({
	getAnimationData,
	id,
	...props
}: LottieProps<T> & Omit<LottieComponentProps, 'animationData'>) {
	const { data } = useQuery({
		queryKey: [id],
		queryFn: async () => {
			void import('lottie-react'); // Trigger the library lazy load even if the animationData is not ready
			return getAnimationData();
		},
		enabled: typeof window !== 'undefined',
	});

	// Only render the Lottie component if data is available
	if (!data)
		return (
			<Image
				src='/animations/placeholder.svg'
				width={500}
				height={500}
				style={{ width: '100%', height: 'auto' }}
				alt='Under construction placeholder'
				priority
			/>
		);

	return (
		<Suspense
			fallback={
				<Image
					src='/animations/placeholder.svg'
					width={500}
					height={500}
					style={{ width: '100%', height: 'auto' }}
					alt='Under construction placeholder'
					priority
				/>
			}
		>
			<LazyLottieComponent animationData={data} {...props} ref={undefined} />
		</Suspense>
	);
}