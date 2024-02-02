import 'animate.css'
import 'floating-vue/dist/style.css'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'
import 'markdown-it-github-alerts/styles/github-colors-light.css'
import 'markdown-it-github-alerts/styles/github-colors-dark-class.css'
import 'markdown-it-github-alerts/styles/github-base.css'
import 'primevue/resources/themes/aura-dark-green/theme.css'
import 'shikiji-twoslash/style-rich.css'
import 'primeicons/primeicons.css'
import './styles/main.css'
import './styles/prose.css'
import './styles/markdown.css'
import './style.css'

import 'uno.css'

import autoRoutes from 'pages-generated'
import NProgress from 'nprogress'
import { ViteSSG } from 'vite-ssg'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js'
import { setupRouterScroller } from 'vue-router-better-scroller'
import FloatingVue from 'floating-vue'

import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { onCLS, onFID, onLCP } from 'web-vitals'
import App from './App.vue'
import { usePerformanceStore } from '~/stores/performance'

const pinia = createPinia()

const routes = autoRoutes.map((i) => {
  return {
    ...i,
    alias: i.path.endsWith('/')
      ? `${i.path}index.html`
      : `${i.path}.html`,
  }
})

export const createApp = ViteSSG(
  App,
  { routes },
  ({ router, app, isClient }) => {
    dayjs.extend(LocalizedFormat)

    app.use(pinia)
    app.use(PrimeVue)
    app.use(FloatingVue)

    if (isClient) {
      const performanceStore = usePerformanceStore()

      onLCP(lcp => performanceStore.setLCP(lcp))
      onFID(fid => performanceStore.setFID(fid))
      onCLS(cls => performanceStore.setCLS(cls))
    }

    if (isClient) {
      const html = document.querySelector('html')!
      setupRouterScroller(router, {
        selectors: {
          html(ctx) {
            if (ctx.savedPosition?.top)
              html.classList.add('no-sliding')
            else
              html.classList.remove('no-sliding')
            return true
          },
        },
        behavior: 'auto',
      })

      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  },
)
