interface ITopic {
	name: string;
	type: string;
	icon: string;
}

export const topics: ITopic[] = [
	{
		name: 'coding',
		// type: 'bootstrap-icon',
		// icon: 'bi bi-file-earmark-code-fill',
		type: 'mdi',
		icon: 'mdi-code-braces-box',
	},
	{
		name: 'comedy',
		type: 'mdi',
		icon: 'mdi-emoticon-cool',
	},
	{
		name: 'gaming',
		type: 'mdi',
		icon: 'mdi-gamepad-variant',
	},
	{
		name: 'food',
		// icon: <GiCakeSlice />,
		type: 'mdi',
		icon: 'mdi-food',
	},
	{
		name: 'dance',
		// icon: <GiGalaxy />,
		type: 'mdi',
		icon: 'mdi-dance-pole',
		// icon: 'mdi-dance-pole',
	},
	{
		name: 'beauty',
		type: 'mdi',
		// icon: <GiLipstick />,
		icon: 'mdi-lipstick',
	},
	{
		name: 'animals',
		type: 'mdi',
		icon: 'mdi-paw',
	},
	{
		name: 'sports',
		type: 'mdi',
		icon: 'mdi-medal',
	},
];

export const footerList1: string[] = [
	'About',
	'Newsroom',
	'Store',
	'Contact',
	'Carrers',
	'ByteDance',
	'Creator Directory',
];
export const footerList2: string[] = [
	'TikTok for Good',
	'Advertise',
	'Developers',
	'Transparency',
	'TikTok Rewards',
];
export const footerList3: string[] = [
	'Help',
	'Safety',
	'Terms',
	'Privacy',
	'Creator Portal',
	'Community Guidelines',
];
