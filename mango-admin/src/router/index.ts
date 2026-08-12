import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";
import { useAuth } from "@/composables/useAuth.ts";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: LoginPage
        },
        {
            path: '/',
            component: DashboardLayout,
            meta: { requiresAuth: true },
            children: [
            ],
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFoundPage,
        },
    ]
})

router.beforeEach(async (to) => {
    const { isAuthenticated, isCheckingAuth, checkAuth } = useAuth()

    if (isCheckingAuth.value) {
        await checkAuth()
    }

    if (to.meta.requiresAuth && !isAuthenticated.value) {
        return '/login'
    }

    if (to.path === '/login' && isAuthenticated.value) {
        return '/'
    }
})