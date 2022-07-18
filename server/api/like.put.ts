import { useSanityClient } from '~~/utils/sanityClient';
import { v4 as uuidv4 } from 'uuid';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		const { likeData } = body;
		const { userId, postId, like } = likeData;
		const config = useRuntimeConfig();
		// console.log('likeData: ', likeData);

		const sanityClient = useSanityClient(config);

		const data = like
			? await sanityClient
					.patch(postId)
					.setIfMissing({ likes: [] })
					.insert('after', 'likes[-1]', [
						{
							_key: uuidv4(),
							_ref: userId,
						},
					])
					.commit()
			: await sanityClient
					.patch(postId)
					.unset([`likes[_ref=="${userId}"]`])
					.commit();
		// console.log('res: ', res);
		// .then(() => res.status(200).json('Login success')))
		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			isBase64Encoded: false,
			body: data,
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
});
