import {defineStore} from 'pinia';

import axios from '../http-common';
import {router} from '@/router';

const baseUrlApi = `${import.meta.env.VITE_API_URL}`;
const baseUrl = `${import.meta.env.VITE_URL}`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email, password) {
            await axios.get(`${baseUrl}/sanctum/csrf-cookie`).then(async () => {
                return await axios.post(`${baseUrlApi}/login`, {email, password});
            });
        },
        async register(param) {
            await axios.get(`${baseUrl}/sanctum/csrf-cookie`).then(async () => {
                return await axios.post(`${baseUrlApi}/register`, param);
            });
        },
        async updateState() {
            // update pinia state
            const response = await axios.get(`${baseUrlApi}/me`);
            this.user = response.data.data;

            // store user info in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(response.data.data));
        },
        async logout() {
            await axios.post(`${baseUrlApi}/logout`);
            this.user = null;
            localStorage.removeItem('user');
            router.push('/account/login');
        }
    }
});
