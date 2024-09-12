import { ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

type LayoutProps = {
	children: ReactNode;
};

export function ChatLayout({ children }: LayoutProps): JSX.Element {
	return (
		<Suspense
			fallback={
				<div className='flex size-full items-center justify-center'>
					<h3>Loading chat..</h3>
				</div>
			}
		>
			<ErrorBoundary key='chat' fallback={<div>Something went wrong!</div>}>
				<div className='flex flex-col overflow-y-hidden max-sm:grow'>{children}</div>
			</ErrorBoundary>
		</Suspense>
	);
}
