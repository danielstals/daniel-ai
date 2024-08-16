'use client';

import { useTheme } from 'next-themes';
import { LuMoon, LuSun } from 'react-icons/lu';
import { Button } from './Button';

export function ModeToggle() {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			className='flex justify-center items-center'
			variant='transparent'
			onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
		>
			<LuSun size={24} className='text-foreground dark:hidden' />
			<LuMoon size={24} className='text-foreground hidden dark:block' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
