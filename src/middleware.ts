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

	if (process.env.NEXT_PUBLIC_UNDER_CONSTRUCTION === 'true') {
		if (
			url.pathname !== '/under-construction' &&
			!url.pathname.startsWith('/api') &&
			!url.pathname.startsWith('/animations') &&
			!url.pathname.startsWith('/_next')
		) {
			url.pathname = '/under-construction';
			return NextResponse.redirect(url);
		}
	}

	let res;

	if (url.pathname.startsWith('/api')) {
		const ip = req.ip ?? '127.0.0.1';
		const { success, pending, limit, remaining } = await ratelimit.limit(ip);
		// we use context.waitUntil since analytics: true.
		// see https://upstash.com/docs/oss/sdks/ts/ratelimit/gettingstarted#serverless-environments
		context.waitUntil(pending);

		res = success ? NextResponse.next() : NextResponse.redirect(new URL('/api/blocked', req.url));

		res.headers.set('X-RateLimit-Success', success.toString());
		res.headers.set('X-RateLimit-Limit', limit.toString());
		res.headers.set('X-RateLimit-Remaining', remaining.toString());
	} else {
		res = NextResponse.next();
	}

	const cookie = req.cookies.get('sessionId');

	if (!cookie) {
		res.cookies.set('sessionId', crypto.randomUUID());
	}

	return res;
}

export const config = {
	matcher: '/:path*',
};
