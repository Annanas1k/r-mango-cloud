<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


    const userLogin = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const isLoading = ref(false)

    const {login} = useAuth()
    const router = useRouter()

    async function handleSubmit(){
        errorMessage.value = ''
        isLoading.value = true

        try{
            await login(userLogin.value, password.value)
            router.push('/')
        }catch{
            errorMessage.value = 'somthing was wrong'
        } finally {
            isLoading.value = false
        }
    }
</script>

<template>
 <div class="flex items-center justify-center h-screen bg-surface-50 dark:bg-surface-900">
        <form
            @submit.prevent="handleSubmit"
            class="flex flex-col gap-4 w-80 p-6 rounded-lg bg-white dark:bg-surface-800 shadow"
        >
            <h1 class="text-xl font-semibold text-center">Mango Admin</h1>

            <div class="flex flex-col gap-2">
                <label for="Login">Login</label>
                <InputText id="email" v-model="userLogin" type="login" autocomplete="username" required />
            </div>

            <div class="flex flex-col gap-2">
                <label for="password">Parolă</label>
                <Password
                    id="password"
                    v-model="password"
                    :feedback="false"
                    toggleMask
                    autocomplete="current-password"
                    inputClass="w-full"
                    required
                />
            </div>

            <Message v-if="errorMessage" severity="error" :closable="false">
                {{ errorMessage }}
            </Message>

            <Button type="submit" label="Login" :loading="isLoading" />
        </form>
    </div>
</template>