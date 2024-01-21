import { createRouter, createWebHistory, RouteRecordRaw, RouterOptions } from 'vue-router';
import { routes } from 'src/pages';
const routerHistory = createWebHistory();

const routerOptions: RouterOptions = {
    history: routerHistory,
    routes,
}

const router = createRouter(routerOptions);


// router.beforeEach((to, from, next) => {
//     const userStore = useUserStore();
//     console.log(2)
//     if (!userStore.currentUser) {
//         if (to.name === 'login' || to.name === 'registration') {
//             next();
//         }
//
//     } else {
//         next();
//     }
// });

export default router;