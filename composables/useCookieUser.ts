// import { IPost } from '~~/models/models';

import { IUser } from '~~/store/user';
// import { useUserStore } from '~~/store/user';

export function useCookieUser() {
	const config = useRuntimeConfig();
	// const userStore = useUserStore();
	// console.log('useCookie: ', useCookie);

	const userCookie = useCookie(config.public.USER_KEY);
	// console.log('userCookie.value: ', userCookie.value);
	userCookie.value = userCookie.value || null;

	/* const userCookie = useCookie(config.public.USER_KEY);
	userCookie.value = userCookie.value || null;
  
	function setUserCookie(newVal: IUser) {
		userCookie.value = JSON.stringify(newVal);
	} */

	/* const userCookie = useState('userCookie', () =>
		useCookie(config.public.USER_KEY)
	); */
	// userCookie.value = userCookie.value || null;
	// userCookie.value = userCookie.value || null;

	const getUserCookie = computed(() => {
		// console.log('userCookie.value : ', userCookie.value);
		// return userCookie.value ? JSON.parse(userCookie.value) : null;

		return userCookie.value;
	});

	function setUserCookie(newVal) {
		console.log('newVal: ', newVal);
		// userCookie.value = JSON.stringify(newVal);
		userCookie.value = newVal;
	}

	function clearUserCookie() {
		userCookie.value = null;
	}

	// const userCookie = ref(null);

	// onMounted(() => {});
	return {
		// userCookie,
		getUserCookie,
		setUserCookie,
		clearUserCookie,
		// clear,
	};
}
