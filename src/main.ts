import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto/routes'
import PrimeVue from 'primevue/config'
import { onCLS, onFID, onLCP } from 'web-vitals'
import App from './App.vue'
import { usePerformanceStore } from '~/stores/performance'

import 'uno.css'
import 'animate.css'
import './style.css'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import 'primevue/resources/themes/aura-dark-green/theme.css'
import 'primeicons/primeicons.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(PrimeVue)

const performanceStore = usePerformanceStore()

onLCP(lcp => performanceStore.setLCP(lcp))
onFID(fid => performanceStore.setFID(fid))
onCLS(cls => performanceStore.setCLS(cls))

app.mount('#app')
