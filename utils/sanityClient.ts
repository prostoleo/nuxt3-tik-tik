import sanityClient from '@sanity/client';
// import { useRuntimeConfig } from '#app';

// const config = useRuntimeConfig();

export function useSanityClient(config: any) {
	return sanityClient({
		projectId: config.public.SANITY_ID,
		dataset: 'production',
		// apiVersion: '2022-03-10',
		useCdn: true,
		token: config.public.SANITY_PUBLIC_TOKEN,
	});
}

/* export const clientSanity = sanityClient({
	projectId: process.env.SANITY_ID,
	dataset: 'production',
	// apiVersion: '2022-03-10',
	useCdn: true,
	token: process.env.SANITY_PUBLIC_TOKEN,
}); */
