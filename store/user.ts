import { defineStore } from 'pinia';
// import types from '@pinia/nuxt';
import { googleLogout, decodeCredential } from 'vue3-google-login';
// import axios from 'axios';
import { useCookieUser } from '~~/composables/useCookieUser';

// Generated by https://quicktype.io

export interface IGoogleResponse {
	clientId: string;
	credential: string;
	select_by: string;
}

// Generated by https://quicktype.io

export interface IUserData {
	iss: string;
	nbf: number;
	aud: string;
	sub: string;
	email: string;
	email_verified: boolean;
	azp: string;
	name: string;
	picture: string;
	given_name: string;
	family_name: string;
	iat: number;
	exp: number;
	jti: string;
}

export interface IUser {
	_id: string;
	_type: 'user';
	userName: string;
	image: string;
}

const LS_USER_KEY = `tiktik-user`;

export const useUserStore = defineStore('user', {
	// id: 'user',
	state: () => ({
		// userCookie: userCookie,
		// JSON.parse(localStorage.getItem(LS_USER_KEY)) ??
		user: null as IUser | null,
		allUsers: [] as IUser[] | [],
		//  JSON.parse(localStorage.getItem(LS_USER_KEY)) ? true :
		isLogin: false,
	}),
	getters: {
		getUser: (state) => {
			// console.log(useFetch);
			// autocompletion! ✨
			// if (!state.isLogin) return null;

			return state.user;
		},

		getAllUsers: (state) => {
			return state.allUsers;
		},
	},
	actions: {
		async createOrGetUser(response: IGoogleResponse): Promise<IUser> {
			// console.log('response: ', response);

			const userData: IUserData = decodeCredential(response.credential);
			// console.log('userData: ', userData);

			const { name, picture, sub } = userData;

			const user: IUser = {
				_id: sub,
				_type: 'user',
				userName: name,
				image: picture,
			};

			// this.user = user;
			this.setUser(user);

			// await axios.post(`http://localhost:3333`, user);
			return this.user;
		},

		setUser(user: IUser | null) {
			if (!user) return;

			this.user = user;
		},

		clearUser() {
			this.user = null;
			this.setIsLoginFalse();
		},

		setUserFromCookieUser(user: IUser | null) {
			if (!user) return;

			this.setUser(user);
			this.setIsLoginTrue();
		},

		setIsLoginTrue() {
			this.isLogin = true;
		},

		setIsLoginFalse() {
			this.isLogin = false;
		},

		handleError(error: any) {
			console.log(error);
		},
		// any amount of arguments, return a promise or not
		/*  addTodo(text) {
      // you can directly mutate the state
      this.todos.push({ text, id: this.nextId++, isFinished: false })
    }, */
		async fetchAllUsers() {
			try {
				const { data, error, pending, refresh } = await useFetch(`/api/users`, {
					method: 'GET',
					/* body: {
						user: rawUser,
					}, */
				});

				if (error.value) {
					throw new Error(error.value);
				}

				this.allUsers = data.value.body;

				return data;
			} catch (error) {
				console.log('error: ', error);
				throw error;
			}
		},
	},
});
