import { usePageList } from 'valaxy'
import { computed } from 'vue'

const pageList = usePageList()
const video = import.meta.glob('./demos/*.mp4', { eager: true, query: '?url', import: 'default' })

const posts = computed(() => pageList.value.filter(i =>
  i.path?.startsWith('/demos')
  && i.path !== '/demos'
  && !i.path?.endsWith('.html')
  && i.date
  && (!i.hide || i.hide === 'index'),
))

export const demoItems = posts.value.map((post) => ({
  link: post.link,
  date: post.path,
  excerpt: post.excerpt,
  video: video[`.${post.path}.mp4`] as string,
}))
  .filter(item => item.date !== 'index')
  .sort((a, b) => b.date!.localeCompare(a.date!))

console.log(demoItems);
