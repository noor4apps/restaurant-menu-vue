import { defineStore } from 'pinia';
import axios from '../http-common';

const baseUrl = `${import.meta.env.VITE_API_URL}/items`;

export const useItemsStore = defineStore({
    id: 'items',
    state: () => ({
        items: {},
        item: {}
    }),
    actions: {
        async add(item) {
            return await axios.post(`${baseUrl}`, item);
        },
        async getAll() {
            this.items = { loading: true };
            try {
                const response = await axios.get(baseUrl);
                this.items = response.data.data;
            } catch (error) {
                this.items = { error };
            }
        },
        async getById(id) {
            this.item = { loading: true };
            try {
                const response = await axios.get(`${baseUrl}/${id}`);
                this.item = response.data.data;
            } catch (error) {
                this.item = { error };
            }
        },
        async create() {
            this.items = { loading: true };
            try {
                const response = await axios.get(`${baseUrl}/create`);
                this.items = response.data.data;
            } catch (error) {
                this.items = { error };
            }
        },
        async update(id, params) {
            return await axios.put(`${baseUrl}/${id}`, params);
        },
        async delete(id) {
            // add isDeleting prop to item being deleted
            this.items.find(x => x.id === id).isDeleting = true;

            return await axios.delete(`${baseUrl}/${id}`);
        }
    }
});
