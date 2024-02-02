import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
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
    presetUno(),
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
})
