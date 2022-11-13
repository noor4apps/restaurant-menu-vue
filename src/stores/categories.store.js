import { defineStore } from 'pinia';
import axios from "@/http-common";

const baseUrl = `${import.meta.env.VITE_API_URL}/menus-tree`;

export const useCategoriesStore = defineStore({
    id: 'categories',
    state: () => ({
        categories: {},
        category: {}
    }),
    actions: {
        async getCategories() {
            this.categories = { loading: true };
            try {
                const response = await axios.get(baseUrl);
                this.categories = response.data.data;
            } catch (error) {
                this.categories = { error };
            }
        },
    }
});
