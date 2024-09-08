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

import { fireEvent, screen } from '@testing-library/react';
import { useChat } from 'ai/react';
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
	it('should render', () => {
		rtlRender(<ChatContainer sessionId='sessionId' initialMessages={[]} />);
		expect(screen.getByRole('textbox', { name: /chat-input/i })).toBeInTheDocument();
	});

	it('should open chat when input is focused', () => {
		rtlRender(<ChatContainer sessionId='sessionId' initialMessages={[]} />);
		const input = screen.getByRole('textbox', { name: /chat-input/i });
		fireEvent.focus(input);
		expect(screen.getByRole('form', { name: 'chat' })).toHaveClass('max-sm:flex-grow sm:h-[400px]');
	});

	it('should handle input change', () => {
		rtlRender(<ChatContainer sessionId='sessionId' initialMessages={[]} />);

		const input = screen.getByRole('textbox', { name: /chat-input/i });
		fireEvent.change(input, { target: { value: 'Hello' } });

		expect(input).toHaveValue('Hello');
		expect(jest.mocked(useChat).mock.results[0].value.handleInputChange).toHaveBeenCalledTimes(1);
	});

	it('should submit the form when the input field has a value', () => {
		rtlRender(<ChatContainer sessionId='sessionId' initialMessages={[]} />);

		const form = screen.getByRole('form', { name: /chat/i });
		const input = screen.getByRole('textbox', { name: /chat-input/i });

		fireEvent.change(input, { target: { value: 'Hello' } });
		fireEvent.submit(form);

		expect(mockHandleSubmit).toHaveBeenCalled();
	});
});
