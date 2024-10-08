import { computed } from 'vue'
import { useConfig } from 'valaxy'
import type { ThemeConfig } from '../types'

export function useThemeConfig<T = ThemeConfig>() {
  const config = useConfig<T>()
  return computed(() => config!.value.themeConfig)
}
