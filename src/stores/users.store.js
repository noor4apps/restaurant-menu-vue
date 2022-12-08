import { defineStore } from 'pinia';

import axios from '../http-common';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useUsersStore = defineStore({
    id: 'users',
    state: () => ({
        users: {},
        user: {}
    }),
    actions: {
        async add(user) {
            await axios.post(`${baseUrl}`, user);
        },
        async getAll() {
            this.users = { loading: true };
            try {
                const response = await axios.get(baseUrl);
                this.users = response.data.data;
            } catch (error) {
                this.users = { error };
            }
        },
        async getById(id) {
            this.user = { loading: true };
            try {
                const response = await axios.get(`${baseUrl}/${id}`);
                this.user = response.data.data;
            } catch (error) {
                this.user = { error };
            }
        },
        async update(id, params) {
            return await axios.put(`${baseUrl}/${id}`, params);
        },
        async delete(id) {
            // add isDeleting prop to user being deleted
            this.users.find(x => x.id === id).isDeleting = true;

            return await axios.delete(`${baseUrl}/${id}`);
        }
    }
});
