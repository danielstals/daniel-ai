'use server';

import { cookies, headers } from 'next/headers';

async function getSessionId(): Promise<string> {
	// Get the list of headers and cookies
	const headerList = await headers();
	const setCookieHeader = headerList.get('set-cookie');
	const cookieStore = await cookies();
	const cookie = cookieStore.get('sessionId');

	// If the sessionId is present in the cookies, return it
	if (cookie?.value) return cookie.value;

	// If not found in cookies, try to extract it from the Set-Cookie header
	if (setCookieHeader) {
		const match = setCookieHeader.match(/sessionid=([^;]+);?/i);
		if (match) return match[1];
	}

	// If sessionId is not found, return an empty string
	return '';
}

export default getSessionId;
