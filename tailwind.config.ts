import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		colors: {
			neutral: {
				DEFAULT: '#232323',
				mid: '#585858',
				dark: '#232323',
			},
		},
	},
	plugins: [],
};
export default config;
