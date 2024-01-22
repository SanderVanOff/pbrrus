import Routing from './index.vue';
import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'main',
        component: () => import('./main'),
    },
    {
        path: '/poker-session/:id',
        name: 'poker-session',
        component: () => import('./poker-session'),
    },
    {
        path: '/registration',
        name: 'registration',
        component: () => import('./registration'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./login'),
    },
    {
        path: '/team/:id',
        name: 'team',
        component: () => import('./team'),
    }
];

export { Routing }