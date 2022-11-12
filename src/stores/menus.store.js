import { defineStore } from 'pinia';
import axios from '../http-common';

const baseUrl = `${import.meta.env.VITE_API_URL}/menus`;

export const useMenusStore = defineStore({
    id: 'menus',
    state: () => ({
        menus: {},
        menu: {}
    }),
    actions: {
        async add(menu) {
            return await axios.post(`${baseUrl}`, menu);
        },
        async getAll() {
            this.menus = { loading: true };
            try {
                const response = await axios.get(baseUrl);
                this.menus = response.data.data;
            } catch (error) {
                this.menus = { error };
            }
        },
        async getById(id) {
            this.menu = { loading: true };
            try {
                const response = await axios.get(`${baseUrl}/${id}`);
                this.menu = response.data.data;
            } catch (error) {
                this.menu = { error };
            }
        },
        async create() {
            this.menus = { loading: true };
            try {
                const response = await axios.get(`${baseUrl}/create`);
                this.menus = response.data.data;
            } catch (error) {
                this.menus = { error };
            }
        },
        async update(id, params) {
            return await axios.put(`${baseUrl}/${id}`, params);
        },
        async delete(id) {
            return await axios.delete(`${baseUrl}/${id}`).then((response) => {

                // add isDeleting prop to menu being deleted
                this.menus.find(x => x.id === id).isDeleting = true;

                // remove menu from list after deleted
                this.menus = this.menus.filter(x => x.id !== id);

                return response;
            }, (error) => {
                console.log(error);
            });
        }
    }
});
