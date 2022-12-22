import { createRouter, createWebHistory } from 'vue-router';  //所有會用到的vue組件都要在這邊import
import Home from '../views/Home.vue'; 
import login_success from '../views/login_success.vue'


const routes = [             //所有會用到的組件都必須在這邊宣告他的路徑
    {
        path: '/',
        name: 'home',
        component: Home, 
    },
    {
        path: '/login_success',
        name: 'login_success',
        component: login_success, 
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;