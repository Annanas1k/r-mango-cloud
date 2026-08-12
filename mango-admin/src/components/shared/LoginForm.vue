<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ref } from "vue"
import { useRouter } from "vue-router"
import { cn } from "@/lib/utils"
import { useAuth } from "@/composables/useAuth"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Loader2 } from "@lucide/vue"

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

const userlogin = ref("")
const password = ref("")
const errorMessage = ref("")
const isLoading = ref(false)

const { login } = useAuth()
const router = useRouter()

async function handleSubmit() {
  errorMessage.value = ""
  isLoading.value = true

  try {
    await login(userlogin.value, password.value)
    router.push("/")
  } catch {
    errorMessage.value = "Something went wrong. Please try again."
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <form :class="cn('flex flex-col gap-6', props.class)" @submit.prevent="handleSubmit">
    <FieldGroup>
      <div class="flex flex-col items-center gap-1 text-center">
        <h1 class="text-2xl font-bold">
          Login to your admin account
        </h1>
      </div>
      <Field>
        <FieldLabel for="userlogin">
          Login
        </FieldLabel>
        <Input
          id="userlogin"
          v-model="userlogin"
          type="userlogin"
          placeholder="m@example.com"
          autocomplete="username"
          required
        />
      </Field>
      <Field>
        <div class="flex items-center">
          <FieldLabel for="password">
            Password
          </FieldLabel>
          <a
            href="#"
            class="ml-auto text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
        />
      </Field>
      <p v-if="errorMessage" class="text-destructive text-sm text-center">
        {{ errorMessage }}
      </p>
      <Field>
        <Button type="submit" :disabled="isLoading">
          <Loader2 v-if="isLoading" class="mr-2 size-4 animate-spin" />
          {{ isLoading ? "Logging in..." : "Login" }}
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>