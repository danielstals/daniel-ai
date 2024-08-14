import { Header } from '@/components/Header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
		<html lang="en">
			<body className={`${inter.className} antialiased`}>
				<main className="flex flex-col w-screen h-screen py-8 sm:py-12 px-6 sm:px-12 md:px-24">
					<Header title="Daniel.ai" />

					{children}
				</main>
			</body>
		</html>
	);
}
