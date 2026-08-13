import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index.ts'
import { createPinia } from 'pinia'
import './style.css'
import { i18n } from './i18n/index.ts'

const app = createApp(App)
app.use(createPinia())
app.use(i18n)
app.use(router)


app.mount('#app')