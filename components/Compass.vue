<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  north?: string
  east?: string
  south?: string
  west?: string
}>(), {
  north: 'N',
  east: 'E',
  south: 'S',
  west: 'W',
})

const svgNS = 'http://www.w3.org/2000/svg'
const svg = ref()

onMounted(() => {
  const pointer = document.createElementNS(svgNS, 'polygon')
  pointer.setAttributeNS(null, 'points', '150,0 155,12 145,12')
  pointer.setAttributeNS(null, 'fill', 'red')
  svg.value.appendChild(pointer)

  const c = document.createElementNS(svgNS, 'circle')
  c.setAttributeNS(null, 'cx', '150')
  c.setAttributeNS(null, 'cy', '150')
  c.setAttributeNS(null, 'r', '20')
  c.setAttributeNS(null, 'fill', 'white')
  c.setAttributeNS(null, 'fill-opacity', '0.1')
  svg.value.appendChild(c)

  drawCenterLine('150', '100', '150', '200')
  drawCenterLine('100', '150', '200', '150')

  // 使用传入的方向文本绘制
  drawCardinalDirection('143', '72', props.north)
  drawCardinalDirection('228', '158', props.east)
  drawCardinalDirection('143', '242', props.south)
  drawCardinalDirection('58', '158', props.west)

  for (let i = 0; i < 360; i += 2) {
    let w, y2
    let s = 'grey'

    if (i === 0 || i % 30 === 0) {
      w = 3
      s = 'white'
      y2 = 50
    }
    else {
      w = 1
      y2 = 45
    }

    const l1 = document.createElementNS(svgNS, 'line')
    l1.setAttributeNS(null, 'x1', '150')
    l1.setAttributeNS(null, 'y1', '30')
    l1.setAttributeNS(null, 'x2', '150')
    l1.setAttributeNS(null, 'y2', y2.toString())
    l1.setAttributeNS(null, 'stroke', s)
    l1.setAttributeNS(null, 'stroke-width', w.toString())
    l1.setAttributeNS(null, 'transform', `rotate(${i}, 150, 150)`)
    svg.value.appendChild(l1)

    if (i % 30 === 0) {
      const t1 = document.createElementNS(svgNS, 'text')
      if (i > 100) {
        t1.setAttributeNS(null, 'x', '140')
      }
      else if (i > 0) {
        t1.setAttributeNS(null, 'x', '144')
      }
      else {
        t1.setAttributeNS(null, 'x', '147')
      }
      t1.setAttributeNS(null, 'y', '24')
      t1.setAttributeNS(null, 'font-size', '11px')
      t1.setAttributeNS(null, 'font-family', 'Helvetica')
      t1.setAttributeNS(null, 'fill', 'grey')
      t1.setAttributeNS(null, 'style', 'letter-spacing:1.0')
      t1.setAttributeNS(null, 'transform', `rotate(${i}, 150, 150)`)
      const textNode = document.createTextNode(i.toString())
      t1.appendChild(textNode)
      svg.value.appendChild(t1)
    }
  }

  function drawCenterLine(x1: string, y1: string, x2: string, y2: string) {
    const centreLineHorizontal = document.createElementNS(svgNS, 'line')
    centreLineHorizontal.setAttributeNS(null, 'x1', x1)
    centreLineHorizontal.setAttributeNS(null, 'y1', y1)
    centreLineHorizontal.setAttributeNS(null, 'x2', x2)
    centreLineHorizontal.setAttributeNS(null, 'y2', y2)
    centreLineHorizontal.setAttributeNS(null, 'stroke', 'grey')
    centreLineHorizontal.setAttributeNS(null, 'stroke-width', '1')
    centreLineHorizontal.setAttributeNS(null, 'stroke-opacity', '0.5')
    svg.value.appendChild(centreLineHorizontal)
  }

  function drawCardinalDirection(x: string, y: string, displayText: string) {
    const direction = document.createElementNS(svgNS, 'text')
    direction.setAttributeNS(null, 'x', x)
    direction.setAttributeNS(null, 'y', y)
    direction.setAttributeNS(null, 'font-size', '20px')
    direction.setAttributeNS(null, 'font-family', 'Helvetica')
    direction.setAttributeNS(null, 'fill', 'white')
    const textNode = document.createTextNode(displayText)
    direction.appendChild(textNode)
    svg.value.appendChild(direction)
  }
})
</script>

<template>
  <svg id="compass" ref="svg" class="mx-auto" width="300" height="300" xmlns="http://www.w3.org/2000/svg" />
</template>
