import { rtlRender, screen } from '@/testing/test-utils';

import { Header } from './header';

jest.mock('../mode-toggle/mode-toggle', () => ({
	ModeToggle: () => <div>ModeToggle</div>,
}));

describe('Header', () => {
	it('should render correctly', () => {
		rtlRender(<Header title='Test title' />);
		expect(screen.getByRole('heading')).toHaveTextContent('Test title');
	});

	it('should render the ModeToggle component', () => {
		rtlRender(<Header title='Test title' />);
		expect(screen.getByText('ModeToggle')).toBeInTheDocument();
	});
});
