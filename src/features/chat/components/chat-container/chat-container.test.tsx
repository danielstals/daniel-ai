const mockHandleSubmit = jest.fn();

jest.mock('ai/react', () => ({
	useChat: jest.fn(() => {
		const [input, setInput] = React.useState('');
		const handleInputChange = jest.fn((event) => setInput(event.target.value));

		return {
			input,
			setInput,
			handleInputChange,
			handleSubmit: mockHandleSubmit,
			messages: [],
			setMessages: jest.fn(),
			isLoading: false,
			error: null,
		};
	}),
}));

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { screen } from '@testing-library/react';
import React from 'react';

import { rtlRender } from '@/testing/test-utils';

import { ChatContainer } from './chat-container';

jest.mock('@/app/actions/delete-history', () => ({
	deleteHistory: jest.fn(),
}));

jest.mock('@/components/ui/chat-placeholder/chat-placeholder', () => ({
	ChatPlaceholder: () => <div>ChatPlaceholder</div>,
}));

jest.mock('@/components/ui/ds-button/ds-button', () => ({
	DsButton: () => <div>DsButton</div>,
}));

jest.mock('@/features/chat/components/chat-message/chat-message', () => ({
	ChatMessage: () => <div>ChatMessage</div>,
}));

jest.mock('@/features/chat/components/prompt-suggestions/prompt-suggestions', () => ({
	PromptSuggestions: () => <div>PromptSuggestions</div>,
}));

jest.mock('lucide-react', () => ({
	Trash: () => <div>Trash</div>,
}));

describe('ChatContainer', () => {
	const queryClient = new QueryClient();

	it('should render', () => {
		rtlRender(
			<QueryClientProvider client={queryClient}>
				<ChatContainer sessionId='sessionId' />
			</QueryClientProvider>,
		);
		expect(screen.getByRole('textbox', { name: /chat-input/i })).toBeInTheDocument();
	});

	// TODO: Fix this test
	// it('should handle input change', () => {
	// 	rtlRender(
	// 		<QueryClientProvider client={queryClient}>
	// 			<ChatContainer sessionId='sessionId' />
	// 		</QueryClientProvider>,
	// 	);

	// 	const input = screen.getByRole('textbox', { name: /chat-input/i });
	// 	fireEvent.change(input, { target: { value: 'Hello' } });

	// 	expect(input).toHaveValue('Hello');
	// 	expect(jest.mocked(useChat).mock.results[0].value.handleInputChange).toHaveBeenCalledTimes(1);
	// });

	// it('should submit the form when the input field has a value', () => {
	// 	rtlRender(
	// 		<QueryClientProvider client={queryClient}>
	// 			<ChatContainer sessionId='sessionId' />
	// 		</QueryClientProvider>,
	// 	);

	// 	const form = screen.getByRole('form', { name: /chat/i });
	// 	const input = screen.getByRole('textbox', { name: /chat-input/i });

	// 	fireEvent.change(input, { target: { value: 'Hello' } });
	// 	fireEvent.submit(form);

	// 	expect(mockHandleSubmit).toHaveBeenCalled();
	// });
});
