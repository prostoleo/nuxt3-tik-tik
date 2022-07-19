import {
	singleUserQuery,
	userCreatedPostsQuery,
	userLikedPostsQuery,
} from '~~/utils/queries';
import { useSanityClient } from '~~/utils/sanityClient';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);

		const { profileId } = body;

		const config = useRuntimeConfig();

		const query = singleUserQuery(profileId);
		const userVideosQuery = userCreatedPostsQuery(profileId);
		const userLikedVideosQuery = userLikedPostsQuery(profileId);

		const sanityClient = useSanityClient(config);

		/* const user = await sanityClient.fetch(query);
		const userVideos = await sanityClient.fetch(userVideosQuery);
		const userLikedVideos = await sanityClient.fetch(userLikedVideosQuery); */
		const [user, userVideos, userLikedVideos] = await Promise.all([
			sanityClient.fetch(query),
			sanityClient.fetch(userVideosQuery),
			sanityClient.fetch(userLikedVideosQuery),
		]);

		return {
			body: {
				// a: 1,
				// b: true,
				profileId,
				user: user[0],
				userVideos,
				userLikedVideos,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			// statusCode: 500,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			// isBase64Encoded: false,
			body: error,
		};
	}
});
