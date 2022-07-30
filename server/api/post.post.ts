import { useSanityClient } from '~~/utils/sanityClient';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		const { post } = body;
		const config = useRuntimeConfig();

		// const sanity = useSanity();
		// sanity.client.createIfNotExists;
		/* console.log(
			'sanity.client.createIfNotExists: ',
			sanity.client.createIfNotExists
		); */

		const sanityClient = useSanityClient(config);

		const res = await sanityClient.create(post);
		// console.log('res: ', res);
		// .then(() => res.status(200).json('Login success')))
		return {
			statusCode: 201,
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
