import path from 'path';

const buildEslintCommand = (filenames) =>
	`next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(' --file ')}`;

const config = {
	'*.{ts,tsx}': [buildEslintCommand, "bash -c 'pnpm check-types'"],
};

export default config;
