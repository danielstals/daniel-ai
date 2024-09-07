import { LINKEDIN_URL } from '@/lib/constants/constants';
import { rtlRender, screen } from '@/testing/test-utils';

import { ChatPlaceholder } from './chat-placeholder';

describe('ChatPlaceholder', () => {
	it('should render the image correctly', () => {
		rtlRender(<ChatPlaceholder />);

		const imageElement = screen.getByRole('img');
		expect(imageElement).toBeInTheDocument();
	});

	it('should render the LinkedIn link with the correct URL', () => {
		// Render the component
		rtlRender(<ChatPlaceholder />);

		// Check if the mocked component is used
		const linkElement = screen.getByTestId('link-mock');
		expect(linkElement).toBeInTheDocument();

		// Check if the link has the correct href
		expect(linkElement).toHaveAttribute('href', LINKEDIN_URL);
	});
});
