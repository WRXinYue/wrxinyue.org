import type { ThemeUserConfig } from 'valaxy-theme-antfu'
import type { Banner, NavItem, NavbarOptions } from 'valaxy-theme-sakura'

interface MyThemeConfig {
  banner?: Banner
  nav?: NavItem[]
  navOptions?: Partial<NavbarOptions>
  footer?: Footer
  scrollDamping?: boolean
}

export type ThemeConfig = ThemeUserConfig & MyThemeConfig

export * from './post'
