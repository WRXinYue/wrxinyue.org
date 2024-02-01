import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

import IconsResolver from 'unplugin-icons/resolver'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VitePWA } from 'vite-plugin-pwa'
import UnoCSS from 'unocss/vite'
import VueMacros from 'unplugin-vue-macros/vite'

// https://github.com/posva/unplugin-vue-router
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/` },
    ],
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
          'vue-router/auto': ['useLink'],
        },
        VueRouterAutoImports,
      ],
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        IconsResolver({
          componentPrefix: '',
        }),
      ],
    }),

    VueRouter({
      extensions: ['.vue', '.md'],
      dts: 'src/components.d.ts',
    }),

    UnoCSS(),

    VitePWA({
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'WRXinYue Home',
        short_name: 'home',
        description: 'My personal page',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-32x32.svg',
            type: 'image/svg+xml',
            sizes: '32x32',
          },
          {
            src: 'pwa-192x192.svg',
            type: 'image/svg+xml',
            sizes: '192x192',
          },
          {
            src: 'pwa-512x512.svg',
            type: 'image/svg+xml',
            sizes: '512x512',
            purpose: 'any',
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
            urlPattern: /https:\/\/wrxinyue.s3.bitiful.net\/.*.mp4/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'external-mp4-files',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 缓存 30 天
              },
              cacheableResponse: {
                statuses: [0, 200, 206],
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
