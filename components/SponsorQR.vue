<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)

const items = [
  { src: '/sponsor/alipay.png', alt: 'Alipay QR Code', caption: '支付宝 · Alipay' },
  { src: '/sponsor/wechat-pay.jpg', alt: 'WeChat Pay QR Code', caption: '微信支付 · WeChat Pay' },
]
</script>

<template>
  <div flex="~ col items-center" class="my-2">
    <button
      type="button"
      flex="~ gap-1 items-center"
      class="border-none bg-transparent p-0 cursor-pointer op75 hover:op100 transition-opacity"
      @click="open = !open"
    >
      <span
        i-carbon-chevron-down
        class="chevron"
        :class="{ open }"
      />
      <span text-sm>支付宝 / 微信支付</span>
    </button>

    <div class="panel" :class="{ open }">
      <div class="panel-inner">
        <div flex="~ gap-6 wrap justify-center">
          <figure
            v-for="item in items"
            :key="item.src"
            m-0 flex="~ col items-center" w-44
          >
            <img
              :src="item.src"
              :alt="item.alt"
              block w-full rounded-lg shadow-md
            >
            <figcaption mt-2 text-sm op75>
              {{ item.caption }}
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chevron {
  transition: transform 0.25s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.panel {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  width: 100%;
  transition:
    grid-template-rows 0.3s ease,
    opacity 0.25s ease;
}

.panel.open {
  grid-template-rows: 1fr;
  opacity: 1;
}

.panel-inner {
  overflow: hidden;
  min-height: 0;
  padding-top: 0.75rem;
}
</style>
