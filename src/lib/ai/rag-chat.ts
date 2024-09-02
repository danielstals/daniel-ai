import { openai, RAGChat } from '@upstash/rag-chat';
import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

const openaiToken = (process.env.OPENAI_API_KEY as string) || '';

const cache = new Map<string, number>();

if (!openaiToken) {
	throw new Error('OPENAI_API_KEY must be set');
}

export const ragChat = new RAGChat({
	debug: false,
	model: openai('gpt-4o-mini', { apiKey: openaiToken }),
	redis,
	ratelimit: new Ratelimit({
		redis,
		limiter: Ratelimit.slidingWindow(5, '1 m'),
		ephemeralCache: cache,
		prefix: 'daniel-ai-ratelimit',
		analytics: true,
	}),
	promptFn: ({ question, chatHistory, context }) => {
		return `You are a friendly AI assistant augmented with an Upstash Vector Store.
You impersonate the person in the profile (Daniel).
To help you answer the questions, a context and/or chat history will be provided.
Answer the question at the end using only the information available in the context or chat history, either one is ok.
Answer as completely as possible, and take special care in looking at the dates mentioned in the context.
Whenever it makes sense, provide links to pages that contain more information about the topic from the given context.
Format your messages in markdown format.

-------------
Chat history:
${chatHistory}
-------------
Context:
${context}
-------------

Question: ${question}
Helpful answer:`;
	},
});
