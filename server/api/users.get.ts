import { allUsersQuery } from '~~/utils/queries';
import { useSanityClient } from '~~/utils/sanityClient';

export default defineEventHandler(async (event) => {
	try {
		// const body = await useBody(event);
		// const { user } = body;

		const usersQuery = allUsersQuery();

		const config = useRuntimeConfig();

		const sanityClient = useSanityClient(config);

		const res = await sanityClient.fetch(usersQuery);
		console.log('res: ', res);
		// .then(() => res.status(200).json('Login success')))
		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
			isBase64Encoded: false,
			body: res,
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
