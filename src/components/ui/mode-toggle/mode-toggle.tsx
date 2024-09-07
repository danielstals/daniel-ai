'use client';

import { useTheme } from 'next-themes';
import { LuMoon, LuSun } from 'react-icons/lu';

import { DsButton } from '../ds-button/ds-button';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<DsButton
			className='flex items-center justify-center'
			variant='transparent'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			<LuSun size={24} className='text-foreground dark:hidden' />
			<LuMoon size={24} className='hidden text-foreground dark:block' />
			<span className='sr-only'>Toggle theme</span>
		</DsButton>
	);
}
