import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';

import { deleteHistory } from '@/app/actions/delete-history';
import { useToast } from '@/hooks/use-toast/use-toast';

import { useDeleteHistory } from './use-delete-history';

jest.mock('@/hooks/use-toast/use-toast');
jest.mock('@/app/actions/delete-history', () => ({
	deleteHistory: jest.fn(),
}));

describe('useDeleteHistory', () => {
	const mockDeleteHistory = deleteHistory as jest.MockedFunction<typeof deleteHistory>;
	const mockToast = jest.fn();

	const createWrapper = () => {
		const queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
			},
		});
		const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);
		return Wrapper;
	};

	beforeEach(() => {
		jest.clearAllMocks();
		(useToast as jest.Mock).mockReturnValue({
			toast: mockToast,
		});
	});

	it('should delete history successfully and update the query data', async () => {
		mockDeleteHistory.mockResolvedValueOnce(undefined);
		const sessionId = 'session-123';
		const { result } = renderHook(() => useDeleteHistory({ sessionId }), { wrapper: createWrapper() });

		act(() => {
			result.current.mutate();
		});

		await waitFor(() => expect(result.current.isSuccess).toBe(true));
		expect(mockDeleteHistory).toHaveBeenCalledWith({ sessionId });
	});

	it('should handle deletion failure and show a toast', async () => {
		const errorMessage = 'Deletion failed';
		mockDeleteHistory.mockRejectedValueOnce(new Error(errorMessage));
		const sessionId = 'session-123';
		const { result } = renderHook(() => useDeleteHistory({ sessionId }), { wrapper: createWrapper() });

		act(() => {
			result.current.mutate();
		});

		await waitFor(() => expect(result.current.isError).toBe(true));
		expect(mockDeleteHistory).toHaveBeenCalledWith({ sessionId });
		expect(mockToast).toHaveBeenCalledWith({
			title: 'Oeps!',
			variant: 'destructive',
			description: errorMessage,
		});
	});
});
