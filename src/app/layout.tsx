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
		<html lang='en' suppressHydrationWarning>
			<body className={`${inter.className} antialiased`}>
				<Providers>
					<main className='flex flex-col h-screen py-8 sm:py-12 px-6 sm:px-12 md:px-24'>
						<Header title='Daniel.ai' />

						<div className='flex flex-col pb-8'>{children}</div>

						<Toaster />
					</main>
				</Providers>
			</body>
		</html>
	);
}
