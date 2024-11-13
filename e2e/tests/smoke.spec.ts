import { expect, test } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const isUnderConstruction = process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === 'true';

import { MOCK_INITIAL_MESSAGES } from '../mock-data';

test.describe('Smoke test suite', () => {
	if (isUnderConstruction) {
		test('should display "Under construction.." message', async ({ page }) => {
			await page.goto('/');
			await expect(page.locator('body')).toContainText('Under construction..');
		});
	} else {
		test.beforeEach(async ({ page }) => {
			console.log(`Running: ${test.info().title}`);
			await page.route('*/**/api/initial-messages', async (route) => {
				await route.fulfill({ json: MOCK_INITIAL_MESSAGES });
			});
			await page.goto('/');
		});

		test('should navigate to the about page', async ({ page }) => {
			await expect(page.locator('h2')).toContainText('Hi, ik ben Daniel Stals!');
		});

		test('dark or light mode should be toggled when theme toggle button is clicked', async ({ page }) => {
			const themeToggleButton = page.getByRole('button', { name: /toggle theme/i });
			const htmlElement = page.locator('html');
			await themeToggleButton.click();
			await expect(htmlElement).toHaveClass(/dark/);
			await themeToggleButton.click();
			await expect(htmlElement).toHaveClass(/light/);
		});

		test('chat window should open when input is focussed', async ({ page }) => {
			const formElement = page.getByRole('form', { name: /chat/i });
			await formElement.click();
			await expect(formElement).toHaveClass(/sm:h-\[400px\]/);
		});

		test('clicking a prompt suggestion should update chat input', async ({ page }) => {
			const promptSuggestionButtons = page.getByTestId('prompt-button');
			const firstPromptText = await promptSuggestionButtons.first().innerText();
			await promptSuggestionButtons.first().click();
			await expect(page.getByRole('textbox', { name: /chat-input/i })).toHaveValue(firstPromptText);
		});

		test('chat message should appear when user submits a message', async ({ page }) => {
			// Fill the chat input
			const chatInput = page.getByRole('textbox', { name: /chat-input/i });
			const promptSubmission = 'E2E test prompt submission';
			await chatInput.fill(promptSubmission);
			// Mock the chat API response
			await page.route('*/**/api/chat', async (route) => {
				await route.fulfill({
					body: `0:"${promptSubmission}"`, // Mocked completed streaming response
					headers: { 'Content-Type': 'text/plain' },
				});
			});
			// Submit the chat input
			await page.getByTestId('submit-prompt').click();
			await expect(page.getByTestId('chat-message-assistant').filter({ hasText: promptSubmission })).toBeVisible();
		});
	}
});
