<template>
  <template v-if="inline">
    <slot></slot>
  </template>
  <template v-else-if="mounted">
    <Teleport :to="appendTo">
      <slot></slot>
    </Teleport>
  </template>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { DomHandler } from 'primevue/utils'

const props = defineProps({
  appendTo: {
    type: [String, Object],
    default: 'body',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const mounted = ref(false)

onMounted(() => {
  mounted.value = DomHandler.isClient()
})

const inline = computed(() => {
  return props.disabled || props.appendTo === 'self'
})
</script>
