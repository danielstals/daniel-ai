import Image from 'next/image';

import underConstructionPlaceholder from '../../../public/images/placeholder.svg';

export default function UnderConstruction() {
	return (
		<div className='flex size-full flex-col items-center justify-center self-center'>
			<h2 className='text-3xl font-semibold text-foreground'>Under construction..</h2>

			<div className='relative w-full max-w-[400px]'>
				<Image
					src={underConstructionPlaceholder}
					width={500}
					height={500}
					style={{ width: '100%', height: 'auto' }}
					alt='Under construction placeholder'
					priority
				/>
			</div>
		</div>
	);
}
