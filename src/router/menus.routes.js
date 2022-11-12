import { Layout, List, AddEdit } from '@/views/menus';

export default {
    path: '/menus',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ]
};
