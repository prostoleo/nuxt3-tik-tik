import { useSanityClient } from '~~/utils/sanityClient';
import { v4 as uuidv4 } from 'uuid';
import { ICommentData } from '~~/models/models';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		const postId = event.context.params.id;
		const { commentData } = body;
		console.log('commentData: ', commentData);
		const { comment, userId } = commentData as ICommentData;
		const config = useRuntimeConfig();

		const sanityClient = useSanityClient(config);

		const data = await sanityClient
			.patch(postId)
			.setIfMissing({ comments: [] })
			.insert('after', 'comments[-1]', [
				{
					comment,
					_key: uuidv4(),
					postedBy: { _type: 'postedBy', _ref: userId },
				},
			])
			.commit();

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
