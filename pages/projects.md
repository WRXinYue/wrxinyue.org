---
title: Projects
display: Projects
description: List of projects that I am proud of
plum: true
wrapperClass: 'text-center'
projects:
  Front end:
    - name: 'valaxy-theme-sakura'
      link: 'https://github.com/WRXinYue/valaxy-theme-sakura'
      desc: 'Porting the Sakura theme to WordPress for an anime blog'
      icon: 'i-mdi-flower-poppy saturate-0'
---

<!-- @layout-full-width -->

<ListProjects :projects="frontmatter.projects" />
