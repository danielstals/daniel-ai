import { RatelimitResponse, RatelimitUpstashError } from '@upstash/rag-chat';
import { aiUseChatAdapter } from '@upstash/rag-chat/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import { ragChat } from '@/lib/ai/rag-chat';
import { getTimeDifferenceStrUntilUnixTimestamp } from '@/utils/format';

export const POST = async (req: NextRequest) => {
	const { messages, sessionId } = await req.json();

	const lastMessage = messages[messages.length - 1].content;

	try {
		const response = await ragChat.chat(lastMessage, {
			streaming: true,
			sessionId,
			ratelimitSessionId: sessionId,
			similarityThreshold: 0.5,
			topK: 10,
		});

		return aiUseChatAdapter(response);
	} catch (error) {
		console.error(error);
		if (error instanceof RatelimitUpstashError) {
			const unixResetTime: number | undefined = (error.cause as RatelimitResponse)?.resetTime;
			const formattedTimeLeft: string | null | undefined = unixResetTime
				? getTimeDifferenceStrUntilUnixTimestamp(unixResetTime)
				: undefined;

			return NextResponse.json(
				{
					name: 'ERR:USER_RATELIMITED',
					status: 429,
					message: `Je hebt teveel berichten in korte tijd gestuurd! ${formattedTimeLeft}`,
				},
				{ status: 429 },
			);
		}

		return NextResponse.json({ name: 'ERR:CHAT_UNKNOWN', status: 500, message: 'Er ging iets mis' }, { status: 500 });
	}
};
