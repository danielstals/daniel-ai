/* eslint-disable import/order */
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

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
	// Artifacts folder where screenshots, videos, and traces are stored.
	outputDir: 'test-results/',
	// Run your local dev server before starting the tests:
	// https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
	webServer: {
		command: `pnpm dev --port ${PORT}`,
		url: baseURL,
		timeout: 20 * 1000,
		reuseExistingServer: !process.env.CI, // reuse server to speed up tests
	},

	use: {
		// Use baseURL so to make navigations relative.
		baseURL,

		// Retry a test if its failing with enabled tracing. This allows you to analyze the DOM, console logs, network traffic etc.
		// More information: https://playwright.dev/docs/trace-viewer
		trace: 'retry-with-trace',
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
});
