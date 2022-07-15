import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: 'en',
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{
					hid: 'description',
					name: 'description',
					content: ``,
				},
				{ name: 'format-detection', content: 'telephone=no' },
				{
					property: 'og:title',
					content: 'TikTik | video social network',
				},
				{
					property: 'og:description',
					content: 'TikTik | video social network',
				},
				{ property: 'og:type', content: 'website' },
				/*  {
          property: 'og:image',
          content: '/prostoleo-dev-portfolio-screenshot.jpg',
        },
        {
          property: 'og:url',
          content: 'https://prostoleo-dev.live',
        },
        {
          name: 'theme-color',
          content: '#92E8FC',
        },
        {
          name: 'color-scheme',
          content: 'light',
        }, */
			],
			link: [
				{
					href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
					rel: 'stylesheet',
					// preload: true,
				},
				{
					href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.0/font/bootstrap-icons.css',
					rel: 'stylesheet',
					preload: true,
				},
				/* {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon.png',
        },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: true,
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
          rel: 'preload',
          as: 'style',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
          media: 'print',
          onload: "this.media='all'",
        },
        {
          rel: 'preload',
          href: '/hero-bg.png',
        }, */
			],
			script: [
				{
					type: 'module',
					src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
				},
				{
					nomodule: true,
					src: 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js',
				},
			],
		},
	},

	css: [
		'@mdi/font/css/materialdesignicons.css',
		'~/assets/css/globals.css',
		// '',
	],

	typescript: {
		typeCheck: true,
	},

	modules: ['@nuxtjs/sanity'],
	buildModules: ['nuxt-windicss', '@pinia/nuxt'],

	runtimeConfig: {
		secretKey: '', // variable that can only be accessed on the server side
		public: {
			SANITY_ID: process.env.SANITY_ID, // variable that can also be accessed on the client side
			// SANITY_DATASET: process.env.SANITY_DATASET, // variable that can also be accessed on the client side
			SANITY_PUBLIC_TOKEN: process.env.SANITY_PUBLIC_TOKEN,
		},
	},

	sanity: {
		projectId: process.env.SANITY_ID,
		dataset: 'production',
		useCdn: true,
		token: process.env.SANITY_PUBLIC_TOKEN,
		globalHelper: true,
	},

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					// additionalData: '',
				},
			},
		},
	},
});
