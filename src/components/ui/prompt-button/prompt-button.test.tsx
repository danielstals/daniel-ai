import { rtlRender, screen } from '@/testing/test-utils';

import { PromptButton } from './prompt-button';

describe('PromptButton', () => {
	test('renders button with text and icon', () => {
		rtlRender(<PromptButton text='Click me' icon={<span>Icon</span>} />);

		const buttonElement = screen.getByText('Click me');
		const iconElement = screen.getByText('Icon');

		expect(buttonElement).toBeInTheDocument();
		expect(iconElement).toBeInTheDocument();
	});

	it('should get the right class name when variant is primary', () => {
		rtlRender(<PromptButton variant='primary' text='Click me' icon={<span>Icon</span>} />);
		const buttonElement = screen.getByRole('button');

		expect(buttonElement).toHaveClass('bg-background');
	});

	it('should be disabled when isDisabled is true', () => {
		rtlRender(<PromptButton isDisabled text='Click me' icon={<span>Icon</span>} />);
		const buttonElement = screen.getByRole('button');

		expect(buttonElement).toBeDisabled();
	});
});
