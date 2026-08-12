<script setup lang="ts">
import AppSidebar from '@/components/shared/AppSidebar.vue';
// Folosim named import { Button } din folderul componentei
import { Button } from '@/components/ui/button';
import { useAuth } from '@/composables/useAuth';

const { logout } = useAuth();
</script>

<template>
  <AppSidebar />
  <Button @click="logout">shadcn vue</Button>
</template>