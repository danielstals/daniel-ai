import { Message } from 'ai/react';

import { CHAT_AVATAR_IMG_ALT } from '@/lib/constants/constants';
import { rtlRender, screen } from '@/testing/test-utils';

import { ChatMessage } from './chat-message';

jest.mock('@/components/ui/lottie-animation/lottie-animation', () => ({
	LottieAnimation: () => <div role='img' data-testid='mocked-lottie-animation' />,
}));

jest.mock('react-markdown', () => {
	// Define ReactMarkdown as a functional component
	const ReactMarkdown = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
	return { __esModule: true, default: ReactMarkdown };
});

describe('ChatMessage', () => {
	let dummyMessage: Message;

	beforeEach(() => {
		dummyMessage = {
			id: '1',
			role: 'assistant',
			content: 'Message from assistant',
		};
	});

	it('should render the avatar image when role is assistant', () => {
		rtlRender(<ChatMessage message={dummyMessage} />);
		const imageElement = screen.queryByRole('img', { name: CHAT_AVATAR_IMG_ALT });
		expect(imageElement).toBeInTheDocument();
	});

	it('should not render the avatar image when role is user', () => {
		dummyMessage = {
			id: '1',
			role: 'user',
			content: 'Message from user',
		};
		rtlRender(<ChatMessage message={dummyMessage} />);
		const imageElement = screen.queryByRole('img', { name: CHAT_AVATAR_IMG_ALT });
		expect(imageElement).not.toBeInTheDocument();
	});

	it('should render the LottieAnimation component when isLoading is true', () => {
		rtlRender(<ChatMessage message={dummyMessage} isLoading />);
		const lottieAnimationElement = screen.queryByTestId('mocked-lottie-animation');
		expect(lottieAnimationElement).toBeInTheDocument();
	});

	it('Should not render the LottieAnimation component when isLoading is false', () => {
		rtlRender(<ChatMessage message={dummyMessage} />);
		const lottieAnimationElement = screen.queryByTestId('mocked-lottie-animation');
		expect(lottieAnimationElement).not.toBeInTheDocument();
	});

	it('should have a background color of red when variant is destructive', () => {
		rtlRender(<ChatMessage message={dummyMessage} variant='destructive' />);
		const messageElement = screen.queryByTestId('message-row');
		expect(messageElement).toHaveClass('bg-red-500');
	});
});
