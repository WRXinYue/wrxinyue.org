import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    ['page', { position: 'absolute', width: '100%' }],
    ['theme-border-b', { 'border-bottom': '1px solid rgba(255, 255, 255, 0.1)' }],
    ['theme-text', { color: '#4b4b4b' }],
    ['theme-about', { width: 'calc(50% - 35px)' }],
    ['theme-pr-color', { color: '#fff' }],
    [
      'theme-section-title',
      {
        position: 'relative',
        margin: '0',
        color: 'var(--pr-color)',
        'margin-bottom': '60px',
        'line-height': '0.8',
        'font-size': '70px',
        'text-align': 'center',
        'text-transform': 'uppercase',
      },
    ],
    ['theme-stroke', { color: 'transparent', '-webkit-text-stroke': '1px var(--pr-color)' }],
  ],
})
