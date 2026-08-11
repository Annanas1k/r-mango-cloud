<!-- App.vue -->
<script setup lang="ts">
import { Button } from 'primevue';
import { ref } from 'vue'
const visible = ref(false)
</script>

<template>
    <div class="p-6 flex flex-col gap-4">
        <Button label="Deschide dialog" icon="pi pi-external-link" @click="visible = true" />
        <Dialog v-model:visible="visible" header="Test" modal>
            <p>PrimeVue + Tailwind + TS funcționează.</p>
        </Dialog>
        <Button >sdauhrfdui</Button>
    </div>
</template>