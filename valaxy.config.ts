import { defineValaxyConfig } from 'valaxy'
import { addonHitokoto } from 'valaxy-addon-hitokoto'
import { ValaxyThemesResolver } from 'valaxy-addon-components'
import type { ThemeConfig } from './types'

export default defineValaxyConfig<ThemeConfig>({
  theme: 'antfu',

  themeConfig: {
    banner: {
      title: '',
      motto: '',
      urls: [
        'https://wrxinyue-images.s3.bitiful.net/pc-wallpaper/wallhaven-3lgk6y.png',
        'https://wrxinyue.s3.bitiful.net/pc-wallpaper/wallpaper_Industrial space station.mp4',
        'https://wrxinyue.s3.bitiful.net/pc-wallpaper/wallpaper_Miko fox (Ver.1.2).mp4',
        'https://wrxinyue.s3.bitiful.net/pc-wallpaper/蝴蝶忍.mp4',
        // mobileImages
        // 'https://wrxinyue.s3.bitiful.net/mobile-wallpaper/babata/640 (1).jpeg',
        // 'https://wrxinyue.s3.bitiful.net/mobile-wallpaper/babata/640 (2).jpeg',
        // 'https://wrxinyue.s3.bitiful.net/mobile-wallpaper/babata/640 (3).jpeg',
        // 'https://wrxinyue.s3.bitiful.net/mobile-wallpaper/babata/640 (4).jpeg',
        // 'https://wrxinyue.s3.bitiful.net/mobile-wallpaper/babata/640 (5).jpeg',
        // 'https://wrxinyue.s3.bitiful.net/mobile-wallpaper/babata/640 (6).jpeg',
        // 'https://wrxinyue.s3.bitiful.net/mobile-wallpaper/babata/640 (7).jpeg',
        // 'https://wrxinyue.s3.bitiful.net/mobile-wallpaper/babata/640.jpeg',
      ],
    },

    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Blog',
        link: '/posts',
      },
      {
        text: 'Projects',
        link: '/projects',
      },
      {
        text: 'Talks',
        link: '/talks',
      },
      {
        text: 'Notes',
        link: '/notes',
      },
      {
        text: 'Demos',
        link: '/demos',
      },
      {
        text: 'About',
        link: '/about',
      },
    ],

    navOptions: {
      showMarker: true,
    },

    subNav: [
      {
        text: 'Blog',
        link: '/posts',
      },
      {
        text: 'Talks',
        link: '/talks',
      },
      {
        text: 'Notes',
        link: '/notes',
      },
    ],

    scrollDamping: true,

    // footer: {
    //   since: 2024,
    // },

    footer: {
      since: 2024,

      icon: {
        img: '/favicon.ico',
        animated: true,
        url: 'https://wrxinyue.org',
        title: 'WRXinYue',
      },
    },
  },
  addons: [
    addonHitokoto({}),
  ],
  components: {
    resolvers: [ValaxyThemesResolver({ themes: ['sakura'] })],
  },
})
