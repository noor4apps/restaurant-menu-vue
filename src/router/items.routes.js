import { Layout, List, AddEdit } from '@/views/items';

export default {
    path: '/items',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit }
    ]
};
