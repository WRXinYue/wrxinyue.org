<script setup>
import 'github-markdown-css/github-markdown-light.css'

import axios from 'axios'
import { marked } from 'marked'
import Typed from 'typed.js'

const githubMarkdown = ref('')
const hitokoto = ref('')

onMounted(async () => {
  const response = await useGithubMarkdown('https://api.github.com/repos/WRXinYue/WRXinYue/readme')
  githubMarkdown.value = response

  const request = await axios.get('https://v1.hitokoto.cn/?c=h')
  hitokoto.value = request.data.hitokoto

  const typed = new Typed('#nav-typed', {
    strings: [hitokoto.value],
    typeSpeed: 50,
  })
})

const useGithubMarkdown = async (url) => {
  let html = ''
  const cacheLifetime = 60 * 60 * 1000 * 12

  const cacheData = localStorage.getItem('readmeData')
  const cacheTime = localStorage.getItem('readmeTime')
  const currentTime = new Date().getTime()

  if (cacheData && cacheTime && currentTime - cacheTime < cacheLifetime) {
    html = marked.parse(cacheData)
  } else {
    const request = await axios.get(url)
    const markdownRequest = await axios.get(request.data.download_url)
    html = marked.parse(markdownRequest.data, { mangle: false, headerIds: false })
    localStorage.setItem('readmeData', html)
    localStorage.setItem('readmeTime', new Date().getTime().toString())
  }

  return html
}
</script>

<template>
  <div class="page">
    <div
      class="h-22rem bg-top bg-cover flex items-center justify-center bg-local"
      style="background-image: url(https://tuapi.eees.cc/api.php?category=dongman&type=302&px=pc)"
    >
      <span id="nav-typed" class="top-30 text-4xl text-light-50 font-bold leading-normal"></span>
    </div>

    <div class="flex justify-center">
      <div class="article-container">
        <article class="markdown-body rounded-2" v-html="githubMarkdown"></article>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: about
meta:
  enterClass: animate__animated animate__fadeInBottomRight
  leaveClass: animate__animated animate__fadeOutLeft
</route>

<style scoped>
.markdown-body code,
.markdown-body tt {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  white-space: break-spaces;
  background-color: var(--bgColor-neutral-muted, var(--color-neutral-muted));
  border-radius: 6px;
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}

.markdown-body pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
}

:deep(.typed-cursor--blink) {
  font-size: 2.25rem;
  line-height: 2.5rem;
  color: #fff;
}
</style>
