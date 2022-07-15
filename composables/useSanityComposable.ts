import { IPost } from '~~/models/models';

export async function useSanityAsyncData(
	key: string,
	query: string
): Promise<IPost[]> {
	const sanity = useSanity();
	const { data } = await useAsyncData(key, () => sanity.fetch(query));

	return data.value;
}
