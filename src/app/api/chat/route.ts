import { getVectorStore } from '@/lib/ai/astradb';
import { SYSTEM_HISTORY_PROMPT_TEMPLATE, SYSTEM_PROMPT_TEMPLATE } from '@/lib/constants';
import { AIMessage, HumanMessage } from '@langchain/core/messages';
import {
	ChatPromptTemplate,
	HumanMessagePromptTemplate,
	MessagesPlaceholder,
	PromptTemplate,
	SystemMessagePromptTemplate,
} from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { LangChainStream, StreamingTextResponse, Message as VercelChatMessage } from 'ai';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { createHistoryAwareRetriever } from 'langchain/chains/history_aware_retriever';
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(req: Request) {
	try {
		const { messages }: { messages: VercelChatMessage[] } = await req.json();

		const chatHistory = messages
			.slice(0, -1)
			.map((m: VercelChatMessage) => (m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content)));

		const currentMessageContent: string = messages[messages.length - 1].content;

		const { stream, handlers } = LangChainStream();

		const chatModel = new ChatOpenAI({
			modelName: 'gpt-4o-mini',
			streaming: true,
			callbacks: [handlers],
			verbose: true,
		});

		const rephrasingModel = new ChatOpenAI({
			modelName: 'gpt-4o-mini',
			verbose: true,
		});

		const rephrasePrompt = ChatPromptTemplate.fromMessages([
			new MessagesPlaceholder('chat_history'),
			HumanMessagePromptTemplate.fromTemplate('{input}'),
			HumanMessagePromptTemplate.fromTemplate(SYSTEM_HISTORY_PROMPT_TEMPLATE),
		]);

		const retriever = (await getVectorStore()).asRetriever();

		const historyAwareRetrieverChain = await createHistoryAwareRetriever({
			llm: rephrasingModel,
			retriever,
			rephrasePrompt,
		});

		const promptTemplate = ChatPromptTemplate.fromMessages([
			SystemMessagePromptTemplate.fromTemplate(SYSTEM_PROMPT_TEMPLATE),
			new MessagesPlaceholder('chat_history'),
			HumanMessagePromptTemplate.fromTemplate('{input}'),
		]);

		const combineDocsChain = await createStuffDocumentsChain({
			llm: chatModel,
			prompt: promptTemplate,
			documentPrompt: PromptTemplate.fromTemplate('Work experience: {page_content}\nWorked there from: {from}\nWorked there until: {to}'),
			documentSeparator: '\n--------\n',
		});

		const retrievalChain = await createRetrievalChain({
			combineDocsChain,
			retriever: historyAwareRetrieverChain,
		});

		retrievalChain.invoke({
			input: currentMessageContent,
			chat_history: chatHistory,
		});

		return new StreamingTextResponse(stream);
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: 'Internal server error ' }, { status: 500 });
	}
}
