import { createApp } from 'vue'
import App from './App.vue'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto/routes'

import 'uno.css'
import 'animate.css'
import './style.css'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

const app = createApp(App)
app.use(router)

app.mount('#app')
