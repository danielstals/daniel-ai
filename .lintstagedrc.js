import path from 'path';

const buildEslintCommand = (filenames) =>
	`eslint --fix ${filenames.map((f) => path.relative(process.cwd(), f)).join(' ')}`;

const config = {
	'*.{ts,tsx}': [buildEslintCommand, "bash -c 'pnpm check-types'"],
};

export default config;
