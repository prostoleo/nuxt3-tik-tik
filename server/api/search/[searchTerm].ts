import { useSanityClient } from '~~/utils/sanityClient';
import { v4 as uuidv4 } from 'uuid';
import { ICommentData } from '~~/models/models';
import { searchPostsQuery } from '~~/utils/queries';

export default defineEventHandler(async (event) => {
	const body = await useBody(event);
	console.log('event: ', event);
	if (event.req.method === 'POST') {
		try {
			const searchTerm = event.context.params.searchTerm;
			const config = useRuntimeConfig();

			const videosQuery = searchPostsQuery(searchTerm);

			const sanityClient = useSanityClient(config);

			const data = await sanityClient.fetch(videosQuery);
			// console.log('data: ', data);

			return {
				statusCode: 200,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				isBase64Encoded: false,
				body: {
					videos: data,
				},
			};
		} catch (error) {
			console.log(error);
			return {
				statusCode: 500,
				headers: {
					'Content-Type': 'application/json; charset=utf-8',
				},
				isBase64Encoded: false,
				body: error,
			};
		}
	}
});
