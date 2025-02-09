import type { ThemeUserConfig as AntfuThemeUserConfig } from 'valaxy-theme-antfu'
import type { Banner, NavbarOptions, NavItem, ThemeUserConfig as SakuraThemeUserConfig } from 'valaxy-theme-sakura'

interface MyThemeConfig {
  banner?: Banner
  nav?: NavItem[]
  navOptions?: Partial<NavbarOptions>
  footer?: Footer
  scrollDamping?: boolean
}

export type ThemeConfig = AntfuThemeUserConfig & SakuraThemeUserConfig & MyThemeConfig

export * from './post'
