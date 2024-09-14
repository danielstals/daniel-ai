import { Message } from 'ai/react';

import { CHAT_AVATAR_IMG_ALT } from '@/lib/constants/constants';
import { rtlRender, screen } from '@/testing/test-utils';

import { ChatMessage } from './chat-message';

jest.mock('react-markdown', () => {
	const ReactMarkdown = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
	return { __esModule: true, default: ReactMarkdown };
});

describe('ChatMessage', () => {
	let dummyMessage: Message;

	function renderChatMessage(props: Parameters<typeof ChatMessage>[0]): ReturnType<typeof rtlRender> {
		return rtlRender(<ChatMessage {...props} />);
	}

	beforeEach(() => {
		dummyMessage = {
			id: '1',
			role: 'assistant',
			content: 'Message from assistant',
		};
	});

	it('should render the avatar image when role is assistant', () => {
		renderChatMessage({ message: dummyMessage });

		expect(screen.getByRole('img', { name: CHAT_AVATAR_IMG_ALT })).toBeInTheDocument();
	});

	it('should not render the avatar image when role is user', () => {
		dummyMessage = {
			id: '1',
			role: 'user',
			content: 'Message from user',
		};
		renderChatMessage({ message: dummyMessage });

		expect(screen.queryByRole('img', { name: CHAT_AVATAR_IMG_ALT })).not.toBeInTheDocument();
	});

	it('should have a background color of red when variant is destructive', () => {
		renderChatMessage({ message: dummyMessage, variant: 'destructive' });

		expect(screen.queryByTestId('message-row')).toHaveClass('bg-red-500');
	});
});
