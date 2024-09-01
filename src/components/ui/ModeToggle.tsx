'use client';

import { useTheme } from 'next-themes';
import { LuMoon, LuSun } from 'react-icons/lu';
import { DsButton } from './DsButton';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<DsButton
			className='flex justify-center items-center'
			variant='transparent'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			<LuSun size={24} className='text-foreground dark:hidden' />
			<LuMoon size={24} className='text-foreground hidden dark:block' />
			<span className='sr-only'>Toggle theme</span>
		</DsButton>
	);
}
