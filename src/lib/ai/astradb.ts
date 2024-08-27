import { DataAPIClient } from '@datastax/astra-db-ts';
import { AstraDBVectorStore, AstraLibArgs } from '@langchain/community/vectorstores/astradb';
import { OpenAIEmbeddings } from '@langchain/openai';
import { VECTOR_DIMENSION } from '../constants';

const endpoint = (process.env.ASTRA_DB_API_ENDPOINT as string) || '';
const token = (process.env.ASTRA_DB_APPLICATION_TOKEN as string) || '';
const collection = (process.env.ASTRA_DB_COLLECTION as string) || '';

if (!endpoint || !token || !collection) {
	throw new Error('ASTRA_DB_API_ENDPOINT and ASTRA_DB_APPLICATION_TOKEN and ASTRA_DB_COLLECTION must be set');
}

export async function getVectorStore(): Promise<AstraDBVectorStore> {
	const astraConfig: AstraLibArgs = {
		token,
		endpoint,
		collection,
		collectionOptions: {
			vector: {
				dimension: VECTOR_DIMENSION, // The dimension of the vectors
				metric: 'cosine', // The metric used to compare vectors
			},
		},
	};

	try {
		const vectorStore = await AstraDBVectorStore.fromExistingIndex(
			new OpenAIEmbeddings({ modelName: 'text-embedding-ada-002' }),
			astraConfig
		);
		return vectorStore;
	} catch (error) {
		console.error('Error occurred while creating vector store:', JSON.stringify(error, null, 2));
		throw error;
	}
}

export async function getEmbeddingsCollection() {
	const client = new DataAPIClient(token);
	const db = client.db(endpoint);
	try {
		const collectionInstance = await db.collection(collection);
		return collectionInstance;
	} catch (error) {
		console.error('Error occurred while getting collection:', JSON.stringify(error, null, 2));
		throw error;
	}
}
