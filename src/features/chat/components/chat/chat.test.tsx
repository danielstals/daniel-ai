import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Message, useChat } from 'ai/react';

import { deleteHistory } from '@/app/actions/delete-history';
import { IButtonProps } from '@/components/ui/ds-button/ds-button';
import { rtlRender } from '@/testing/test-utils';

import { Chat } from './chat';

// Mock external dependencies
jest.mock('ai/react', () => ({
	useChat: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
	...jest.requireActual('@tanstack/react-query'),
	useQueryClient: jest.fn(),
}));

jest.mock('@/app/actions/delete-history', () => ({
	deleteHistory: jest.fn(),
}));

jest.mock('@/components/ui/ds-button/ds-button', () => ({
	DsButton: (props: IButtonProps) => <button {...props}>{props.children}</button>,
}));

jest.mock('@/components/ui/chat-placeholder/chat-placeholder', () => ({
	ChatPlaceholder: () => <div>ChatPlaceholder</div>,
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

describe('Chat', () => {
	// Initialise a new instance of React Query's QueryClient.
	// This queryClient is provided to the QueryClientProvider when rendering the Chat component in tests.
	const queryClient = new QueryClient();

	// Mock state and functions provided by useChat hook and useQueryClient.
	let mockInput = '';
	let mockSetInput = jest.fn();
	let mockHandleInputChange = jest.fn();
	let mockHandleSubmit = jest.fn();
	let mockMessages: Message[] = [];
	let mockSetMessages = jest.fn();
	let mockInvalidateQueries: jest.Mock;

	//  Reset and configure mocks to ensure a consistent starting state before each test case.
	beforeEach(() => {
		mockSetInput = jest.fn((value: string) => {
			mockInput = value;
		});

		mockHandleInputChange = jest.fn((event: React.ChangeEvent<HTMLInputElement>) => {
			mockSetInput(event.target.value);
		});

		mockHandleSubmit = jest.fn();
		mockSetMessages = jest.fn();
		mockInvalidateQueries = jest.fn();

		// TS needs to know that these are Jest mock functions to allow us to use mock-specific methods.
		// We can do this by casting the functions as a jest.Mock.

		// Mock useChat to return controlled values
		(useChat as jest.Mock).mockImplementation(() => ({
			input: mockInput,
			setInput: mockSetInput,
			handleInputChange: mockHandleInputChange,
			handleSubmit: mockHandleSubmit,
			messages: mockMessages,
			setMessages: mockSetMessages,
			isLoading: false,
			error: null,
		}));

		// Mock useQueryClient to provide invalidateQueries function
		(useQueryClient as jest.Mock).mockReturnValue({
			invalidateQueries: mockInvalidateQueries,
		});
	});

	// Reset mocks and state between tests
	afterEach(() => {
		jest.clearAllMocks();
		mockInput = '';
		mockMessages = [];
	});

	it('should render', () => {
		rtlRender(
			<QueryClientProvider client={queryClient}>
				<Chat sessionId='sessionId' />
			</QueryClientProvider>,
		);
		expect(screen.getByRole('textbox', { name: /chat-input/i })).toBeInTheDocument();
	});

	it('should handle input change', () => {
		rtlRender(
			<QueryClientProvider client={queryClient}>
				<Chat sessionId='sessionId' />
			</QueryClientProvider>,
		);

		const inputElement = screen.getByRole('textbox', { name: /chat-input/i });
		fireEvent.change(inputElement, { target: { value: 'Hello' } });

		expect(mockHandleInputChange).toHaveBeenCalledTimes(1);
		expect(mockSetInput).toHaveBeenCalledWith('Hello');
		expect(mockInput).toBe('Hello');
	});

	it('should submit the form when the input field has a value', () => {
		mockInput = 'Hello';

		rtlRender(
			<QueryClientProvider client={queryClient}>
				<Chat sessionId='sessionId' />
			</QueryClientProvider>,
		);

		const form = screen.getByRole('form', { name: /chat/i });
		fireEvent.submit(form);

		expect(mockHandleSubmit).toHaveBeenCalled();
	});

	it('should delete history when delete button is clicked', async () => {
		// Set initial messages to simulate existing chat history
		mockMessages = [
			{ id: '1', role: 'user', content: 'Hello' },
			{ id: '2', role: 'assistant', content: 'Hi there!' },
		];

		// Mock deleteHistory to resolve immediately.
		// We simulate a successful call where the Promise resolves without any data.
		(deleteHistory as jest.Mock).mockResolvedValueOnce(undefined);

		rtlRender(
			<QueryClientProvider client={queryClient}>
				<Chat sessionId='test-session' />
			</QueryClientProvider>,
		);

		// Find the delete button
		const deleteButton = screen.getByRole('button', { name: /reset de chat/i });

		// Simulate clicking the delete button
		fireEvent.click(deleteButton);

		// Wait for setMessages to be called asynchronously
		await waitFor(() => {
			// Assert that setMessages was called with an empty array
			expect(mockSetMessages).toHaveBeenCalledWith([]);
		});

		// Assert that deleteHistory was called with the correct sessionId
		expect(deleteHistory).toHaveBeenCalledWith({ sessionId: 'test-session' });

		// Assert that invalidateQueries was called
		expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ['initial-messages'], exact: true });
	});
});
