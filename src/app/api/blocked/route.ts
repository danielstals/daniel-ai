export const runtime = 'nodejs';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
	return new Response('Gedraag je!', { status: 429 });
}
