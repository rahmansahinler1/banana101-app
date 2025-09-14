import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import useUserStore from '@/stores/user'

// Initialize Application
const app = createApp(App)
app.use(createPinia())
app.use(router)

// Initialize user data
const userId = window.APP_CONFIG.userId
const userStore = useUserStore()
await userStore.initialize(userId)

// Start the application
app.mount('#app')
