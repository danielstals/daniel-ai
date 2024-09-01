import { Header } from '@/components/layouts/Header';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Daniel.ai',
	description: 'Chat with my AI assistant about my professional profile!',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className='h-full' lang='en' suppressHydrationWarning>
			<body className={`${inter.className} antialiased h-full m-0`}>
				<Providers>
					<main className='flex flex-col h-full px-6 py-8 overflow-y-hidden sm:pt-8 sm:pb-6 sm:px-12 md:px-24'>
						<Header title='Daniel.ai' />

						{children}

						<Toaster />
					</main>
				</Providers>
			</body>
		</html>
	);
}
