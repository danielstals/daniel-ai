import { rtlRender, screen } from '@/testing/test-utils';

import { PromptButton } from './prompt-button';

describe('PromptButton', () => {
	function renderPromptButton(props: Parameters<typeof PromptButton>[0]): ReturnType<typeof rtlRender> {
		return rtlRender(<PromptButton {...props} />);
	}

	test('renders button with text and icon', () => {
		renderPromptButton({ text: 'Click me', icon: <span>Icon</span> });

		expect(screen.getByText('Click me')).toBeInTheDocument();
		expect(screen.getByText('Icon')).toBeInTheDocument();
	});

	it('should get the right class name when variant is primary', () => {
		renderPromptButton({ text: 'Click me', icon: <span>Icon</span>, variant: 'primary' });

		expect(screen.getByRole('button')).toHaveClass('bg-background');
	});

	it('should be disabled when isDisabled is true', () => {
		renderPromptButton({ text: 'Click me', icon: <span>Icon</span>, isDisabled: true });

		expect(screen.getByRole('button')).toBeDisabled();
	});
});
