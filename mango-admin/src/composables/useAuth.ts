// src/composables/useAuth.ts
import { ref } from 'vue'
import { authApi } from '@/api/auth.api'
import { router } from '@/router'

const isAuthenticated = ref(false)
const isCheckingAuth = ref(true)

export function useAuth() {
    async function checkAuth() {
        try {
            const { isAdmin } = await authApi.me()
            isAuthenticated.value = isAdmin
        } catch {
            isAuthenticated.value = false
        } finally {
            isCheckingAuth.value = false
        }
    }

    async function login(email: string, password: string) {
        await authApi.login({ email, password })
        isAuthenticated.value = true
    }

    async function logout() {
        await authApi.logout()
        isAuthenticated.value = false
        router.push('/login')
    }

    return { isAuthenticated, isCheckingAuth, checkAuth, login, logout }
}