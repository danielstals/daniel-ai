import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
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
	return NextResponse.next();
}

export const config = {
	matcher: '/:path*',
};
