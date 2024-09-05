import { Ratelimit } from '@upstash/ratelimit';
import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { redis } from './lib/ai/redis';

const ratelimit = new Ratelimit({
	redis: redis,
	limiter: Ratelimit.fixedWindow(10, '10 s'),
	ephemeralCache: new Map(),
	prefix: 'ip-ratelimit',
	analytics: true,
	enableProtection: true,
});

export async function middleware(req: NextRequest, context: NextFetchEvent) {
	const url = req.nextUrl.clone();
	const isUnderConstruction = process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === 'true';
	let res;

	// Check if the site is under construction
	if (isUnderConstruction) {
		if (
			url.pathname !== '/under-construction' &&
			!url.pathname.startsWith('/api') &&
			!url.pathname.startsWith('/animations') &&
			!url.pathname.startsWith('/_next')
		) {
			url.pathname = '/under-construction';
			return NextResponse.redirect(url); // Stop further execution
		}
	}

	// Handle rate limiting for API routes
	if (url.pathname.startsWith('/api')) {
		const ip = req.ip || '127.0.0.1';

		try {
			const { success, pending, limit, remaining } = await ratelimit.limit(ip);
			// we use context.waitUntil since analytics: true.
			// see https://upstash.com/docs/oss/sdks/ts/ratelimit/gettingstarted#serverless-environments
			context.waitUntil(pending);

			if (!success) {
				return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
			}

			// Successful request, proceed normally
			res = NextResponse.next();

			// Set rate limiting headers
			res.headers.set('X-RateLimit-Success', success.toString());
			res.headers.set('X-RateLimit-Limit', limit.toString());
			res.headers.set('X-RateLimit-Remaining', remaining.toString());
		} catch (error) {
			console.error('Rate limiting failed:', error);
			return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
		}
	} else {
		// Non-API routes proceed without rate limiting
		res = NextResponse.next();
	}

	// Ensure the cookie is set for all routes
	const cookie = req.cookies.get('sessionId');
	if (!cookie) {
		res.cookies.set('sessionId', crypto.randomUUID(), {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});
	}

	return res;
}

export const config = {
	matcher: '/:path*',
};
