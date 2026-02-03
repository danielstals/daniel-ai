import { Ratelimit } from '@upstash/ratelimit';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { redis } from './lib/ai/redis';

const ratelimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.fixedWindow(10, '10 s'),
	ephemeralCache: new Map(),
	prefix: 'ip-ratelimit',
	analytics: false,
	enableProtection: true,
});

// Helper: Check if the site is under construction
const isUnderConstruction = () => process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === 'true';

// Helper: Handle under-construction redirection
const handleUnderConstructionRedirect = (req: NextRequest): NextResponse | null => {
	const url = req.nextUrl.clone();
	if (isUnderConstruction()) {
		if (
			url.pathname !== '/under-construction' &&
			!url.pathname.startsWith('/api') &&
			!url.pathname.startsWith('/animations') &&
			!url.pathname.startsWith('/_next')
		) {
			url.pathname = '/under-construction';
			return NextResponse.redirect(url);
		}
	} else if (!isUnderConstruction() && url.pathname === '/under-construction') {
		url.pathname = '/';
		return NextResponse.redirect(url);
	}
	return null;
};

// Helper: Handle rate limiting
const handleRateLimiting = async (req: NextRequest): Promise<NextResponse | null> => {
	if (req.nextUrl.pathname.startsWith('/api')) {
		const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || '127.0.0.1';
		try {
			const { success, limit, remaining } = await ratelimit.limit(ip);

			if (!success) {
				return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
			}

			const res = NextResponse.next();
			res.headers.set('X-RateLimit-Limit', limit.toString());
			res.headers.set('X-RateLimit-Remaining', remaining.toString());
			return res;
		} catch (error) {
			console.error('Rate limiting failed:', error);
			return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
		}
	}
	return null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function middleware(req: NextRequest, context: NextFetchEvent) {
	let response;

	// Handle under construction logic
	response = handleUnderConstructionRedirect(req);
	if (response) return response;

	// Handle rate limiting
	response = await handleRateLimiting(req);
	if (response) return response;

	// Ensure sessionId cookie
	const res = NextResponse.next();
	const sessionId = req.cookies.get('sessionId');
	if (!sessionId) {
		res.cookies.set('sessionId', crypto.randomUUID(), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			path: '/',
		});
	}

	return res;
}

export const config = {
	matcher: '/:path*',
};
