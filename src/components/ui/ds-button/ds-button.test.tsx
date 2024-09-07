import { rtlRender, screen } from '@/testing/test-utils';

import { DsButton } from './ds-button';

describe('DsButton', () => {
	it('renders the button', () => {
		rtlRender(
			<DsButton title='Test title' text='Click me'>
				Test DsButton
			</DsButton>,
		);
		const buttonElement = screen.getByRole('button', { name: 'Test DsButton' });
		expect(buttonElement).toBeInTheDocument();
	});

	it('should get the right class name when variant is primary', () => {
		rtlRender(
			<DsButton variant='primary' text='Click me'>
				Test DsButton
			</DsButton>,
		);
		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toHaveClass('bg-primary');
	});

	it('should get the right class name when variant is transparent', () => {
		rtlRender(
			<DsButton variant='transparent' text='Click me'>
				Test DsButton
			</DsButton>,
		);
		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toHaveClass('bg-transparent');
	});

	it('should be disabled when disabled is true and have the right class name', () => {
		rtlRender(
			<DsButton disabled text='Click me'>
				Test DsButton
			</DsButton>,
		);
		const buttonElement = screen.getByRole('button');
		expect(buttonElement).toBeDisabled();
		expect(buttonElement).toHaveClass('disabled:pointer-events-none');
	});
});
