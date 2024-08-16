import { HumanMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';

export async function sendPrompt(prompt: string) {
	const model = new ChatOpenAI({
		model: 'gpt-4o-mini',
		temperature: 0,
	});

	const result = await model.invoke([new HumanMessage({ content: prompt })]);
	return result;
}
