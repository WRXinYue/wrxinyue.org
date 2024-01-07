import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto/routes'
import p5 from 'p5'

import 'uno.css'
import 'animate.css'
import './style.css'
import 'splitting/dist/splitting.css'
import 'splitting/dist/splitting-cells.css'

window.p5 = p5

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
  },
  ({ app, router, routes, isClient, initialState }) => {},
)
