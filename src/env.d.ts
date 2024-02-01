/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '~icons/*' {
  import type { FunctionalComponent, SVGAttributes } from 'vue'

  const component: FunctionalComponent<SVGAttributes>
  export default component
}

declare module '*.md' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface ImportMetaEnv {
  readonly VITE_BASE: string
  readonly VITE_API_BASEURL: string
  readonly VITE_APP_TITLE: string
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare interface Window {
  // extend the window
}
