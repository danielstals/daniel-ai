import { rtlRender, screen } from '@/testing/test-utils';

import { DsButton } from './ds-button';

describe('DsButton', () => {
	function renderDsButton(props?: Partial<Parameters<typeof DsButton>[0]>): ReturnType<typeof rtlRender> {
		return rtlRender(
			<DsButton title='Test title' text='Click me' {...props}>
				Test DsButton
			</DsButton>,
		);
	}

	it('renders the button', () => {
		renderDsButton();

		expect(screen.getByRole('button', { name: 'Test DsButton' })).toBeInTheDocument();
	});

	it('should get the right class name when variant is primary', () => {
		renderDsButton({ variant: 'primary' });

		expect(screen.getByRole('button')).toHaveClass('bg-primary');
	});

	it('should get the right class name when variant is transparent', () => {
		renderDsButton({ variant: 'transparent' });

		expect(screen.getByRole('button')).toHaveClass('bg-transparent');
	});

	it('should be disabled when disabled is true and have the right class name', () => {
		renderDsButton({ disabled: true });

		const buttonElement = screen.getByRole('button');

		expect(buttonElement).toBeDisabled();
		expect(buttonElement).toHaveClass('disabled:pointer-events-none');
	});
});
