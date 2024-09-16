import { LINKEDIN_URL } from '@/lib/constants/constants';
import { rtlRender, screen } from '@/testing/test-utils';

import { ChatPlaceholder } from './chat-placeholder';

describe('ChatPlaceholder', () => {
	function renderChatPlaceholder(): ReturnType<typeof rtlRender> {
		return rtlRender(<ChatPlaceholder />);
	}

	it('should render the image correctly', () => {
		renderChatPlaceholder();

		expect(screen.getByRole('img')).toBeInTheDocument();
	});

	it('should render the LinkedIn link with the correct URL', () => {
		renderChatPlaceholder();

		expect(screen.getByTestId('link-mock')).toHaveAttribute('href', LINKEDIN_URL);
	});
});
