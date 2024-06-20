import { basename, dirname } from 'node:path'
import { presetAttributify, presetIcons, presetWebFonts, transformerDirectives } from 'unocss'
import fs from 'fs-extra'
import { defineValaxyConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-sakura'
import anchor from 'markdown-it-anchor'
// @ts-expect-error missing types
import LinkAttributes from 'markdown-it-link-attributes'
import MarkdownItGitHubAlerts from 'markdown-it-github-alerts'
import Shiki from '@shikijs/markdown-it'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import sharp from 'sharp'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import { slugify } from './scripts/slugify'

const promises: Promise<any>[] = []

export default defineValaxyConfig<ThemeUserConfig>({
  theme: 'sakura',

  themeConfig: {
    favicon: false,

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

    navbar: [
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

    scrollDamping: true,

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
  markdown: {
    // Waiting for Valaxy support
    // theme: {
    //   light: 'vitesse-light',
    //   dark: 'vitesse-dark',
    // },
    // codeTransformers: [
    //   transformerTwoslash({
    //     explicitTrigger: true,
    //     renderer: rendererRich(),
    //   }),
    // ],
    wrapperClasses: (id, code) => code.includes('@layout-full-width')
      ? ''
      : 'prose m-auto slide-enter-content',
    headEnabled: true,
    exportFrontmatter: false,
    exposeFrontmatter: false,
    exposeExcerpt: false,
    markdownItOptions: {
      quotes: '""\'\'',
    },
    async markdownItSetup(md) {
      md.use(await Shiki({
        themes: {
          dark: 'vitesse-dark',
          light: 'vitesse-light',
        },
        defaultColor: false,
        cssVariablePrefix: '--s-',
        transformers: [
          transformerTwoslash({
            explicitTrigger: true,
            renderer: rendererRich(),
          }),
        ],
      }))

      md.use(anchor, {
        slugify,
        permalink: anchor.permalink.linkInsideHeader({
          symbol: '#',
          renderAttrs: () => ({ 'aria-hidden': 'true' }),
        }),
      })

      md.use(LinkAttributes, {
        matcher: (link: string) => /^https?:\/\//.test(link),
        attrs: {
          target: '_blank',
          rel: 'noopener',
        },
      })

      md.use(TOC, {
        includeLevel: [1, 2, 3, 4],
        slugify,
        containerHeaderHtml: '<div class="table-of-contents-anchor"><div class="i-ri-menu-2-fill" /></div>',
      })

      md.use(MarkdownItGitHubAlerts)
    },
    frontmatterPreprocess(frontmatter, options, id, defaults) {
      (() => {
        if (!id.endsWith('.md'))
          return
        const route = basename(id, '.md')
        if (route === 'index' || frontmatter.image || !frontmatter.title)
          return
        const path = `og/${route}.png`
        promises.push(
          fs.existsSync(`${id.slice(0, -3)}.png`)
            ? fs.copy(`${id.slice(0, -3)}.png`, `public/${path}`)
            : generateOg(frontmatter.title!.replace(/\s-\s.*$/, '').trim(), `public/${path}`),
        )
        frontmatter.image = `https://wrxinyue.org/${path}`
      })()
      const head = defaults(frontmatter, options)
      return { head, frontmatter }
    },
  },
  unocss: {
    shortcuts: [
      {
        'bg-base': 'bg-white dark:bg-black',
        'border-base': 'border-[#8884]',
      },
      [/^btn-(\w+)$/, ([_, color]) => `op50 px2.5 py1 transition-all duration-200 ease-out no-underline! hover:(op100 text-${color} bg-${color}/10) border border-base! rounded`],
    ],
    rules: [
      [/^slide-enter-(\d+)$/, ([_, n]) => ({
        '--enter-stage': n,
      })],
      ['theme-border-b', { 'border-bottom': '1px solid rgba(255, 255, 255, 0.1)' }],
      ['theme-text', { color: '#4b4b4b' }],
      ['theme-about', { width: 'calc(50% - 35px)' }],
      ['theme-pr-color', { color: '#fff' }],
      [
        'theme-section-title',
        {
          'position': 'relative',
          'margin': '0',
          'color': 'var(--pr-color)',
          'margin-bottom': '60px',
          'line-height': '0.8',
          'font-size': '70px',
          'text-align': 'center',
          'text-transform': 'uppercase',
        },
      ],
      ['theme-stroke', { 'color': 'transparent', '-webkit-text-stroke': '1px var(--pr-color)' }],
    ],
    presets: [
      presetIcons({
        extraProperties: {
          'display': 'inline-block',
          'height': '1.2em',
          'width': '1.2em',
          'vertical-align': 'text-bottom',
        },
      }),
      presetAttributify(),
      presetWebFonts({
        fonts: {
          sans: 'Inter:400,600,800',
          mono: 'DM Mono:400,600',
        },
      }),
    ],
    transformers: [
      transformerDirectives(),
    ],
    safelist: [
      'i-ri-menu-2-fill',
    ],
  },
})

const ogSVg = fs.readFileSync('./scripts/og-template.svg', 'utf-8')

async function generateOg(title: string, output: string) {
  if (fs.existsSync(output))
    return

  await fs.mkdir(dirname(output), { recursive: true })
  // breakline every 25 chars
  const lines = title.trim().split(/(.{0,25})(?:\s|$)/g).filter(Boolean)

  const data: Record<string, string> = {
    line1: lines[0],
    line2: lines[1],
    line3: lines[2],
  }
  const svg = ogSVg.replace(/\{\{([^}]+)\}\}/g, (_: any, name: string | number) => data[name] || '')

  // eslint-disable-next-line no-console
  console.log(`Generating ${output}`)
  try {
    // eslint-disable-next-line node/prefer-global/buffer
    await sharp(Buffer.from(svg))
      .resize(1200 * 1.1, 630 * 1.1)
      .png()
      .toFile(output)
  }
  catch (e) {
    console.error('Failed to generate og image', e)
  }
}
