import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';

import { Header } from '@/components/ui/header';
import { Toaster } from '@/components/ui/toaster';

import Providers from './providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Daniel.ai',
	description: 'Chat with my AI assistant about my professional profile!',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className='h-full' lang='en' suppressHydrationWarning>
			<body className={`${inter.className} m-0 h-full antialiased`}>
				<Providers>
					<main className='flex h-full flex-col overflow-y-hidden px-6 py-8 sm:px-12 sm:pb-6 sm:pt-8 md:px-24'>
						<Header title='Daniel.ai' />

						{children}

						<Toaster />
					</main>
				</Providers>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
