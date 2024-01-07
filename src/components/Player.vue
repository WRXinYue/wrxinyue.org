<template>
  <div class="flex w-full h-100vh justify-center items-center overflow-hidden">
    <!-- <PlayButton @click="initAudio()" class="absolute" /> -->
    <div ref="canvasWrapper"></div>

    <div
      class="h-100vh w-60 md:w-100 lg:w-140 absolute left-0 bg-white flex"
      :class="active ? 'animate__animated animate__slideInLeft' : 'animate__animated animate__slideOutLeft'"
    >
      <div class="w-full" id="aplayer" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave"></div>
    </div>
  </div>
</template>

<script setup>
import 'p5/lib/addons/p5.sound'

const canvasWrapper = ref(null)
const active = ref(true)

let ap
let p
let song
var img
var fft
var particles = []
var audioContextStarted = false

const onMouseEnter = () => {
  active.value = true
}

const onMouseLeave = () => {
  active.value = false
}

const checkMousePosition = (event) => {
  console.log(event.clientX)
  if (event.clientX <= 30) {
    active.value = true
  }
}

// const initAudio = () => {
//   if (!audioContextStarted) {
//     audioContextStarted = true
//     if (p.getAudioContext().state !== 'running') {
//       p.getAudioContext().resume()
//     }
//     p.mouseClicked = () => mouseClicked()
//   }
// }

const preload = () => {
  img = p.loadImage('wallhaven-jxl31y.png')
}

const setup = () => {
  p.createCanvas(p.windowWidth, p.windowHeight)
  p.angleMode(p.DEGREES)
  p.imageMode(p.CENTER)
  p.rectMode(p.CENTER)
  fft = new p5.FFT(0.3)

  img.filter(p.BLUR, 12)
}

const draw = () => {
  p.background(0)

  p.translate(p.width / 2, p.height / 2)

  fft.analyze()
  p.amp = fft.getEnergy(20, 200)

  p.push()
  if (p.amp > 230) {
    p.rotate(p.random(-0.5, 0.5))
  }

  p.image(img, 0, 0, p.width + 100, p.height + 100)
  p.pop()

  var alpha = p.map(p.amp, 0, 255, 180, 150)
  p.fill(0, alpha)
  p.noStroke()
  p.rect(0, 0, p.width, p.height)

  p.stroke(255)
  p.strokeWeight(3)
  p.noFill()

  var wave = fft.waveform()

  for (var t = -1; t <= 1; t += 2) {
    p.beginShape()
    for (var i = 0; i <= 180; i += 0.5) {
      var index = p.floor(p.map(i, 0, 180, 0, wave.length - 1))

      var r = p.map(wave[index], -1, 1, 150, 350)

      var x = r * p.sin(i) * t
      var y = r * p.cos(i)
      p.vertex(x, y)
    }
    p.endShape()
  }

  const particle = new Particle()
  particles.push(particle)

  for (var i = particles.length - 1; i >= 0; i--) {
    if (!particles[i].edges()) {
      particles[i].update(p.amp > 230)
      particles[i].show()
    } else {
      particles.splice(i, 1)
    }
  }
}

const mouseClicked = () => {
  if (ap.paused) {
    song.pause()
    p.noLoop()
  } else {
    song.play()
    p.loop()
  }
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(250)
    this.vel = p.createVector(0, 0)
    this.acc = this.pos.copy().mult(p.random(0.0001, 0.00001))

    this.w = p.random(3, 5)

    this.color = [p.random(200, 255), p.random(200, 255), p.random(200, 255)]
  }
  update(cond) {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    if (cond) {
      this.pos.add(this.vel)
      this.pos.add(this.vel)
      this.pos.add(this.vel)
    }
  }
  edges() {
    if (
      this.pos.x < -p.width / 2 ||
      this.pos.x > p.width / 2 ||
      this.pos.y < -p.height / 2 ||
      this.pos.y > p.height / 2
    ) {
      return true
    } else {
      return false
    }
  }
  show() {
    p.noStroke()
    p.fill(this.color)
    p.ellipse(this.pos.x, this.pos.y, this.w)
  }
}

import 'aplayer/dist/APlayer.min.css'
import APlayer from 'aplayer'
import axios from 'axios'

const audioList = ref([])
const currentTrack = ref()

const fetchAudioList = async (url) => {
  const cacheKey = 'audioListCache'
  const cacheTimeKey = 'audioListCacheTime'
  const cacheDuration = 86400000 // 24 hours in milliseconds

  try {
    // Check if cache exists and is valid
    const cachedData = localStorage.getItem(cacheKey)
    const cachedTime = localStorage.getItem(cacheTimeKey)
    const now = new Date().getTime()

    if (cachedData && cachedTime && now - cachedTime < cacheDuration) {
      // Use cached data
      audioList.value = JSON.parse(cachedData)
    } else {
      // Fetch new data and update cache
      const response = await axios.get(url)
      const formattedData = response.data.map((song) => ({
        name: song.name,
        artist: song.artist,
        url: song.url,
        pic: song.pic,
        lrc: song.lrc,
      }))
      audioList.value = formattedData

      // Update cache
      localStorage.setItem(cacheKey, JSON.stringify(formattedData))
      localStorage.setItem(cacheTimeKey, now.toString())
    }
  } catch (error) {
    console.error('Error fetching audio list:', error)
  }
}

const syncPlay = () => {
  if (song.isLoaded()) {
    song.play()
    ap.play()
  }
}

const syncPause = () => {
  if (ap.paused) {
    song.pause()
    ap.pause()
  }
}

onMounted(async () => {
  await fetchAudioList('https://api.injahow.cn/meting/?server=tencent&type=playlist&id=4063308541')

  ap = new APlayer({
    container: document.getElementById('aplayer'),
    mini: false,
    autoplay: false,
    theme: '#FADFA3',
    loop: 'all',
    order: 'random',
    preload: 'auto',
    volume: 0,
    mutex: true,
    listFolded: false,
    listMaxHeight: 90,
    lrcType: 3,
    audio: audioList.value,
  })
  ap.volume(0) // Prevent users from manually adjusting parameters

  ap.on('play', function () {
    if (song && song.isLoaded()) {
      const currentTrack = ap.list.audios[ap.list.index]
      console.log('当前播放的音乐 URL:', currentTrack.url)
      syncPlay() // 同步播放
    }
  })

  ap.on('pause', function () {
    syncPause() // 同步暂停
  })

  // 当APlayer切换曲目时
  ap.on('listswitch', function (e) {
    if (song) {
      song.pause()
    }
    const track = ap.list.audios[e.index]
    song = p.loadSound(track.url, function () {
      // 如果APlayer正在播放，同步播放新曲目
      if (!ap.paused) {
        syncPlay()
      }
    })
  })

  new p5((_p) => {
    p = _p
    p.preload = () => preload()
    p.setup = () => setup()
    p.draw = () => draw()
  }, canvasWrapper.value)

  window.addEventListener('mousemove', checkMousePosition)
})

onUnmounted(() => {
  p.remove()
  window.removeEventListener('mousemove', checkMousePosition)
})
</script>

<style scoped>
/* 隐藏aplayer默认音量调节 */
:deep(.aplayer-volume-wrap) {
  display: none !important;
}
:deep(.n-drawer-body-content-wrapper) {
  padding: 0 !important;
  display: flex;
}
</style>
