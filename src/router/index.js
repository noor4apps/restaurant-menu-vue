import { createRouter, createWebHistory } from 'vue-router';

import { useAlertStore } from '@/stores';
import { HomeView } from '@/views';
import itemsRoutes from './items.routes';
import menusRoutes from './menus.routes';



export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: HomeView },
        { ...itemsRoutes },
        { ...menusRoutes },
        // catch all redirect to home page
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
});

router.beforeEach(async (to) => {
    // clear alert on route change
    const alertStore = useAlertStore();
    alertStore.clear();
});
