export const runtime = 'nodejs';

export const dynamic = 'force-dynamic';

export async function GET() {
	return new Response('Gedraag je!', { status: 429 });
}
