import path from 'node:path'
import { defineConfig, type PluginOption } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import Vue from '@vitejs/plugin-vue'

import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { VitePWA } from 'vite-plugin-pwa'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'

// https://github.com/posva/unplugin-vue-router
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        {
          // add any other imports you were relying on
          'vue-router/auto': ['useLink'],
        },
        VueRouterAutoImports,
      ],
      eslintrc: {
        enabled: true,
      },
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),

    VueRouter({
      extensions: ['.vue', '.md'],
      dts: 'src/components.d.ts',
    }),

    UnoCSS(),

    eslintPlugin(),

    visualizer({ open: true }) as PluginOption,

    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'WRXinYue Home',
        short_name: 'home',
        description: 'My personal page',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon.ico',
            sizes: '64x64',
            type: 'image/x-icon',
          },
        ],
        screenshots: [
          {
            src: 'unknown.png',
            type: 'image/png',
            sizes: '3840x2160',
            form_factor: 'wide',
          },
          {
            src: 'unknown.png',
            type: 'image/png',
            sizes: '3840x2160',
            // 'form_factor' 未设置或设置为非 'wide'
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: new RegExp('https://wrxinyue.s3.bitiful.net/.*.mp4'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'external-mp4-files',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 缓存 30 天
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],

  build: {
    chunkSizeWarningLimit: 2000,
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    assetsInlineLimit: 5000,
  },
})
