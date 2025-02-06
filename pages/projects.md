---
title: Projects
display: Projects
description: List of projects that I am proud of
plum: true
wrapperClass: 'text-center'
projects:
  Front end:
    - name: valaxy-theme-sakura
      link: https://github.com/WRXinYue/valaxy-theme-sakura
      desc: Porting the Sakura theme to WordPress for an anime blog
      # icon: i-mdi-flower-poppy saturate-0
    - name: valaxy
      link: https://github.com/YunYouJun/valaxy
      desc: Next Generation Static Blog Framework (Beta)
    - name: valaxy-theme-antfu
      link: https://github.com/WRXinYue/valaxy-theme-antfu
      desc: The Valaxy ported version of antfu.me
    - name: valaxy-theme-oceanus
      link: https://github.com/WRXinYue/valaxy-theme-antfu
      desc: One of Valaxy's documentation topics
    - name: valaxy-addon-live2d
      link: https://github.com/valaxyjs/valaxy-addon-live2d
      desc: Cute live2d mascot component.
    - name: valaxy-addon-git-log
      link: https://github.com/valaxyjs/valaxy-addon-git-log
      desc: Integrates git logs into your page of Valaxy site.
    - name: valaxy-addon-hitokoto
      link: https://github.com/valaxyjs/valaxy-addon-hitokoto
      desc: Hitokoto Composition API for Valaxy.
    - name: valaxy-addon-vercount
      link: https://github.com/valaxyjs/valaxy-addon-vercount
      desc: A Vercount API based counting plugin for Valaxy, serving as an alternative to Busuanzi counting.
    - name: valaxy-addon-meting
      link: https://github.com/YunYouJun/valaxy/tree/main/packages/valaxy-addon-meting
      desc: Global music player based on APlayer and MetingJS.
    - name: valaxy-addon-components
      link: https://github.com/YunYouJun/valaxy/tree/main/packages/valaxy-addon-components
      desc: Common Components for Valaxy.
    - name: misskey-hub
      link: https://github.com/misskey-dev/misskey-hub
      desc: Website for Misskey.
---

<!-- @layout-full-width -->

<AntfuListProjects :projects="frontmatter.projects" />
