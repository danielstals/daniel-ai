import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './e2e',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: `http://127.0.0.1:${PORT}`,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'off',
		timezoneId: 'Europe/Amsterdam',
	},

	/* Configure projects for major browsers */
	projects: [
		{ name: 'setup', testMatch: /.*\.setup\.ts/ },
		{
			name: 'chromium',
			testMatch: /.*\.spec\.ts/,
			use: {
				...devices['Desktop Chrome'],
			},
			dependencies: ['setup'],
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: `pnpm start --port ${PORT}`,
		url: `http://127.0.0.1:${PORT}`,
		timeout: 20 * 1000,
		reuseExistingServer: !process.env.CI, // reuse server to speed up tests
	},
});
