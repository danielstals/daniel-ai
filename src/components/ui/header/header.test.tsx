import { rtlRender, screen } from '@/testing/test-utils';

import { Header } from './header';

jest.mock('../mode-toggle/mode-toggle', () => ({
	ModeToggle: () => <div>ModeToggle</div>,
}));

describe('Header', () => {
	function renderHeader(): ReturnType<typeof rtlRender> {
		return rtlRender(<Header title='Test title' />);
	}

	it('should render correctly', () => {
		renderHeader();

		expect(screen.getByRole('heading')).toHaveTextContent('Test title');
	});

	it('should render the ModeToggle component', () => {
		renderHeader();

		expect(screen.getByText('ModeToggle')).toBeInTheDocument();
	});
});
