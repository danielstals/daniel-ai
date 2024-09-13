import { QueryClient, QueryClientProvider, useQuery, UseQueryResult } from '@tanstack/react-query';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Message } from 'ai';
import { useChat } from 'ai/react';

import { IButtonProps } from '@/components/ui/ds-button/ds-button';
import { rtlRender } from '@/testing/test-utils';

import { useDeleteHistory } from '../../hooks/use-delete-history/use-delete-history';
import { ChatMessageProps } from '../chat-message/chat-message';

import { Chat } from './chat';

jest.mock('../../hooks/use-delete-history/use-delete-history');
const mockUseDeleteHistory = useDeleteHistory as jest.MockedFunction<typeof useDeleteHistory>;

jest.mock('ai/react', () => ({
	useChat: jest.fn(),
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
	ChatMessage: ({ message }: ChatMessageProps) => <div>{message.content}</div>,
}));

jest.mock('@/features/chat/components/prompt-suggestions/prompt-suggestions', () => ({
	PromptSuggestions: () => <div>PromptSuggestions</div>,
}));

jest.mock('lucide-react', () => ({
	Trash: () => <div>Trash</div>,
}));

jest.mock('@tanstack/react-query', () => {
	const originalModule = jest.requireActual('@tanstack/react-query');
	return {
		__esModule: true,
		...originalModule,
		useQuery: jest.fn(),
	};
});

const mockUseChat = useChat as jest.MockedFunction<typeof useChat>;
const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;

describe('Chat component', () => {
	const queryClient = new QueryClient();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should call deleteHistoryMutate when delete button is clicked', async () => {
		const deleteHistoryMutate = jest.fn();
		const mockMessages = [
			{
				id: '1',
				role: 'user',
				content: 'Test message',
			},
		];

		mockUseDeleteHistory.mockReturnValue({
			mutate: deleteHistoryMutate,
		} as unknown as ReturnType<typeof useDeleteHistory>);

		mockUseChat.mockReturnValue({
			messages: mockMessages,
			setMessages: jest.fn(),
		} as unknown as ReturnType<typeof useChat>);

		mockUseQuery.mockReturnValue({
			data: [],
		} as unknown as UseQueryResult<Message[], unknown>);

		rtlRender(
			<QueryClientProvider client={queryClient}>
				<Chat sessionId='test-session-id' />
			</QueryClientProvider>,
		);

		await waitFor(() => expect(mockUseQuery).toHaveBeenCalled());

		const deleteButton = screen.getByRole('button', { name: /reset de chat/i });

		expect(deleteButton).toBeEnabled();
		fireEvent.click(deleteButton);

		expect(deleteHistoryMutate).toHaveBeenCalled();

		const mockSetMessages = mockUseChat.mock.results[0].value.setMessages;
		expect(mockSetMessages).toHaveBeenCalledWith([]);
	});

	it('should render initial messages', async () => {
		const initialMessages: Message[] = [
			{ id: '1', role: 'user', content: 'Hello' },
			{ id: '2', role: 'assistant', content: 'Hi there!' },
		];
		mockUseQuery.mockReturnValue({
			data: initialMessages,
		} as unknown as UseQueryResult<Message[], unknown>);

		mockUseChat.mockReturnValue({
			messages: initialMessages,
		} as unknown as ReturnType<typeof useChat>);

		rtlRender(
			<QueryClientProvider client={queryClient}>
				<Chat sessionId='test-session-id' />
			</QueryClientProvider>,
		);

		await screen.findByText('Hello');
		expect(screen.getByText('Hi there!')).toBeInTheDocument();
	});

	it('should display a loading spinner when messages are loading', () => {
		mockUseQuery.mockReturnValue({
			data: undefined,
			isFetching: true,
		} as unknown as UseQueryResult<Message[], unknown>);

		mockUseChat.mockReturnValue({
			messages: [],
		} as unknown as ReturnType<typeof useChat>);

		rtlRender(
			<QueryClientProvider client={queryClient}>
				<Chat sessionId='test-session-id' />
			</QueryClientProvider>,
		);

		expect(screen.getByTestId('spinner')).toBeInTheDocument();
	});

	it('should display an error message when useChat returns an error', () => {
		const errorMessage = 'An error occurred';

		mockUseQuery.mockReturnValue({
			isFetching: false,
		} as unknown as UseQueryResult<Message[], unknown>);

		mockUseChat.mockReturnValue({
			messages: [],
			error: new Error(JSON.stringify({ message: errorMessage })),
		} as unknown as ReturnType<typeof useChat>);

		rtlRender(
			<QueryClientProvider client={queryClient}>
				<Chat sessionId='test-session-id' />
			</QueryClientProvider>,
		);

		expect(screen.getByText(errorMessage)).toBeInTheDocument();
	});
});
